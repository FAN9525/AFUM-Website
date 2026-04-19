import { useState, useEffect, useRef, useCallback } from 'react';
import type { Session } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase';
import { extractText } from '@/lib/doc-extract';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import {
  UploadCloud,
  FileText,
  Trash2,
  RefreshCw,
  LogOut,
  ShieldCheck,
  ChevronDown,
  ChevronUp,
  Save,
  Inbox,
  X,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Clock,
} from 'lucide-react';

// ── Constants ─────────────────────────────────────────────────────────────────

const PRODUCTS = [
  { slug: 'domestic',    label: 'Domestic' },
  { slug: 'commercial',  label: 'Commercial' },
  { slug: 'agri',        label: 'Agri' },
  { slug: 'hospitality', label: 'Hospitality' },
] as const;

const DOC_TYPES = [
  { value: 'wording',      label: 'Policy Wording' },
  { value: 'limits',       label: 'Schedule of Limits' },
  { value: 'underwriting', label: 'General Underwriting Guidelines' },
] as const;

const ACCEPTED_EXTENSIONS = '.pdf,.docx,.md,.txt';

const INQUIRY_STATUSES = [
  { value: 'pending',   label: 'Pending' },
  { value: 'reviewed',  label: 'Reviewed' },
  { value: 'approved',  label: 'Approved' },
  { value: 'declined',  label: 'Declined' },
] as const;

type ProductSlug   = (typeof PRODUCTS)[number]['slug'];
type DocTypeValue  = (typeof DOC_TYPES)[number]['value'];
type InquiryStatus = (typeof INQUIRY_STATUSES)[number]['value'];

// ── Types ─────────────────────────────────────────────────────────────────────

interface DocSummary {
  source_file:   string;
  doc_type:      DocTypeValue;
  chunk_count:   number;
  latest_upload: string;
}

type QueueItemStatus = 'queued' | 'parsing' | 'ingesting' | 'done' | 'error';

interface QueueItem {
  id:      string;
  file:    File;
  status:  QueueItemStatus;
  message: string;
  chunks?: number;
}

interface PartnershipInquiry {
  id:             string;
  created_at:     string;
  full_name:      string;
  brokerage_name: string;
  email:          string;
  phone:          string;
  message:        string | null;
  status:         InquiryStatus;
  outcome_notes:  string | null;
  reviewed_by:    string | null;
  reviewed_at:    string | null;
}

// ── Edge function helper ──────────────────────────────────────────────────────

async function callEdgeFn(
  token: string,
  body: Record<string, unknown>,
): Promise<{ success: boolean; chunks_inserted?: number; deleted?: number; error?: string }> {
  const url = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/ingest-knowledge-upload`;
  const res = await fetch(url, {
    method:  'POST',
    headers: {
      'Content-Type':  'application/json',
      'apikey':        import.meta.env.VITE_SUPABASE_ANON_KEY as string,
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });
  return res.json();
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-ZA', {
    day:   '2-digit',
    month: 'short',
    year:  'numeric',
  });
}

function docTypeLabel(value: string): string {
  return DOC_TYPES.find(d => d.value === value)?.label ?? value;
}

function docTypeBadgeVariant(value: string): 'default' | 'secondary' | 'outline' {
  if (value === 'wording') return 'default';
  if (value === 'limits')  return 'secondary';
  return 'outline';
}

function inquiryStatusVariant(
  status: InquiryStatus,
): 'default' | 'secondary' | 'outline' | 'destructive' {
  switch (status) {
    case 'approved': return 'default';
    case 'reviewed': return 'secondary';
    case 'declined': return 'destructive';
    default:         return 'outline';
  }
}

function inquiryStatusLabel(status: InquiryStatus): string {
  return INQUIRY_STATUSES.find(s => s.value === status)?.label ?? status;
}

// ── Login Gate (Supabase Auth) ────────────────────────────────────────────────

function LoginGate({ onSession }: { onSession: (s: Session) => void }) {
  const [email,    setEmail]    = useState('');
  const [password, setPassword] = useState('');
  const [error,    setError]    = useState('');
  const [loading,  setLoading]  = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      setError('Please enter your email and password.');
      return;
    }
    setLoading(true);
    setError('');

    const { data, error: authError } = await supabase.auth.signInWithPassword({ email, password });

    if (authError || !data.session) {
      setError(authError?.message ?? 'Sign in failed. Please check your credentials.');
      setLoading(false);
      return;
    }

    onSession(data.session);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-sm shadow-lg">
        <CardHeader className="text-center space-y-2">
          <div className="mx-auto w-12 h-12 rounded-full bg-burgundy flex items-center justify-center">
            <ShieldCheck className="w-6 h-6 text-white" />
          </div>
          <CardTitle className="text-xl">Admin Portal</CardTitle>
          <CardDescription>Sign in with your Admin Focus account.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="login-email">Email</Label>
              <Input
                id="login-email"
                type="email"
                value={email}
                onChange={e => { setEmail(e.target.value); setError(''); }}
                placeholder="you@adminfocus.co.za"
                autoFocus
                autoComplete="email"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="login-password">Password</Label>
              <Input
                id="login-password"
                type="password"
                value={password}
                onChange={e => { setPassword(e.target.value); setError(''); }}
                placeholder="••••••••"
                autoComplete="current-password"
              />
            </div>
            {error && <p className="text-sm text-red-600">{error}</p>}
            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-burgundy hover:bg-burgundy/90 text-white"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Signing in…
                </span>
              ) : 'Sign in'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

// ── Upload zone ───────────────────────────────────────────────────────────────

interface UploadZoneProps {
  onFilesAdded: (files: File[]) => void;
  disabled?:    boolean;
}

function UploadZone({ onFilesAdded, disabled }: UploadZoneProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    if (disabled) return;
    const dropped = Array.from(e.dataTransfer.files);
    if (dropped.length > 0) onFilesAdded(dropped);
  }, [onFilesAdded, disabled]);

  return (
    <div
      role="button"
      tabIndex={0}
      aria-disabled={disabled}
      onDragOver={e => { if (!disabled) { e.preventDefault(); setDragging(true); } }}
      onDragLeave={() => setDragging(false)}
      onDrop={handleDrop}
      onClick={() => !disabled && inputRef.current?.click()}
      onKeyDown={e => { if (!disabled && (e.key === 'Enter' || e.key === ' ')) inputRef.current?.click(); }}
      className={`
        border-2 border-dashed rounded-lg p-6 text-center transition-colors
        ${disabled ? 'opacity-50 cursor-not-allowed border-gray-200'
          : dragging ? 'border-burgundy bg-burgundy/5 cursor-pointer'
          : 'border-gray-200 hover:border-burgundy/50 hover:bg-gray-50 cursor-pointer'}
      `}
    >
      <input
        ref={inputRef}
        type="file"
        accept={ACCEPTED_EXTENSIONS}
        multiple
        className="hidden"
        onChange={e => {
          const picked = Array.from(e.target.files ?? []);
          if (picked.length > 0) onFilesAdded(picked);
          if (inputRef.current) inputRef.current.value = '';
        }}
      />
      <div className="space-y-1.5">
        <UploadCloud className="w-8 h-8 mx-auto text-gray-400" />
        <p className="text-sm font-medium text-gray-600">Drop files or click to browse</p>
        <p className="text-xs text-gray-400">PDF &middot; DOCX &middot; Markdown &middot; TXT &middot; Multiple files allowed</p>
      </div>
    </div>
  );
}

// ── Upload queue item ─────────────────────────────────────────────────────────

function QueueItemRow({
  item,
  onRemove,
}: {
  item:     QueueItem;
  onRemove: () => void;
}) {
  const canRemove = item.status === 'queued' || item.status === 'done' || item.status === 'error';

  const statusIcon = (() => {
    switch (item.status) {
      case 'queued':
        return <Clock className="w-4 h-4 text-gray-400" />;
      case 'parsing':
      case 'ingesting':
        return <Loader2 className="w-4 h-4 text-burgundy animate-spin" />;
      case 'done':
        return <CheckCircle2 className="w-4 h-4 text-green-600" />;
      case 'error':
        return <AlertCircle className="w-4 h-4 text-red-600" />;
    }
  })();

  const rowBg =
    item.status === 'done'  ? 'bg-green-50 border-green-200' :
    item.status === 'error' ? 'bg-red-50 border-red-200'     :
    item.status === 'parsing' || item.status === 'ingesting' ? 'bg-blue-50 border-blue-200' :
    'bg-white border-gray-200';

  return (
    <div className={`border rounded-md px-3 py-2 ${rowBg}`}>
      <div className="flex items-center gap-2.5 text-sm">
        <FileText className="w-4 h-4 text-gray-400 flex-shrink-0" />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="font-medium text-gray-800 truncate">{item.file.name}</span>
            <span className="text-xs text-gray-400 flex-shrink-0">
              {(item.file.size / 1024).toFixed(0)} KB
            </span>
          </div>
          {item.message && (
            <p className="text-xs text-gray-600 mt-0.5 truncate">{item.message}</p>
          )}
        </div>
        <div className="flex items-center gap-1.5 flex-shrink-0">
          {statusIcon}
          {canRemove && (
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6 text-gray-400 hover:text-gray-700"
              onClick={onRemove}
              aria-label={`Remove ${item.file.name}`}
            >
              <X className="w-3.5 h-3.5" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

// ── Product panel ─────────────────────────────────────────────────────────────

interface ProductPanelProps {
  slug:    ProductSlug;
  label:   string;
  session: Session;
}

function ProductPanel({ slug, label, session }: ProductPanelProps) {
  const [docs,       setDocs]       = useState<DocSummary[]>([]);
  const [loading,    setLoading]    = useState(false);
  const [queue,      setQueue]      = useState<QueueItem[]>([]);
  const [docType,    setDocType]    = useState<DocTypeValue>('wording');
  const [processing, setProcessing] = useState(false);

  const loadDocs = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase.rpc('list_knowledge_documents', {
      p_product_slug: slug,
    });
    if (!error && data) setDocs(data as DocSummary[]);
    setLoading(false);
  }, [slug]);

  useEffect(() => { void loadDocs(); }, [loadDocs]);

  const handleFilesAdded = (files: File[]) => {
    const newItems: QueueItem[] = files.map((f, i) => ({
      id:      `${Date.now()}-${i}-${f.name}`,
      file:    f,
      status:  'queued',
      message: '',
    }));
    setQueue(prev => [...prev, ...newItems]);
  };

  const handleRemoveItem = (id: string) => {
    setQueue(prev => prev.filter(it => it.id !== id));
  };

  const handleClearCompleted = () => {
    setQueue(prev => prev.filter(it => it.status !== 'done' && it.status !== 'error'));
  };

  const handleClearAll = () => {
    setQueue([]);
  };

  const updateItem = (id: string, patch: Partial<QueueItem>) => {
    setQueue(prev => prev.map(it => (it.id === id ? { ...it, ...patch } : it)));
  };

  const processItem = async (item: QueueItem): Promise<void> => {
    updateItem(item.id, { status: 'parsing', message: 'Parsing…' });

    let content: string;
    try {
      content = await extractText(item.file);
    } catch (err) {
      updateItem(item.id, {
        status:  'error',
        message: `Parse failed: ${err instanceof Error ? err.message : 'Unknown error'}`,
      });
      return;
    }

    if (!content.trim()) {
      updateItem(item.id, {
        status:  'error',
        message: 'No text could be extracted from the file.',
      });
      return;
    }

    const wordCount = content.trim().split(/\s+/).length;
    updateItem(item.id, {
      status:  'ingesting',
      message: `Ingesting ~${wordCount.toLocaleString()} words…`,
    });

    try {
      const result = await callEdgeFn(session.access_token, {
        action:       'ingest',
        product_slug: slug,
        doc_type:     docType,
        filename:     item.file.name,
        content,
      });

      if (!result.success) {
        updateItem(item.id, {
          status:  'error',
          message: result.error ?? 'Ingestion failed.',
        });
        return;
      }

      updateItem(item.id, {
        status:  'done',
        message: `Done — ${result.chunks_inserted} chunks ingested.`,
        chunks:  result.chunks_inserted,
      });
    } catch (err) {
      updateItem(item.id, {
        status:  'error',
        message: `Network error: ${err instanceof Error ? err.message : 'Unknown error'}`,
      });
    }
  };

  const handleIngestAll = async () => {
    if (processing) return;
    const pending = queue.filter(it => it.status === 'queued');
    if (pending.length === 0) return;

    setProcessing(true);
    for (const item of pending) {
      await processItem(item);
    }
    setProcessing(false);
    void loadDocs();
  };

  const handleDeleteFile = async (filename: string) => {
    const result = await callEdgeFn(session.access_token, {
      action:       'delete_file',
      product_slug: slug,
      filename,
    });
    if (result.success) void loadDocs();
  };

  const handleDeleteProduct = async () => {
    const result = await callEdgeFn(session.access_token, {
      action:       'delete_product',
      product_slug: slug,
    });
    if (result.success) void loadDocs();
  };

  const pendingCount   = queue.filter(it => it.status === 'queued').length;
  const completedCount = queue.filter(it => it.status === 'done').length;
  const errorCount     = queue.filter(it => it.status === 'error').length;
  const hasCompleted   = completedCount > 0 || errorCount > 0;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-3">
          <div>
            <CardTitle className="text-base">{label} — Knowledge Base</CardTitle>
            <CardDescription className="text-xs">
              {docs.length === 0
                ? 'No documents ingested yet.'
                : `${docs.length} document${docs.length !== 1 ? 's' : ''}`}
            </CardDescription>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={loadDocs}
            disabled={loading}
            className="gap-1.5 text-xs"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </CardHeader>
        {docs.length > 0 && (
          <CardContent className="pt-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>File</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead className="text-right">Chunks</TableHead>
                  <TableHead>Uploaded</TableHead>
                  <TableHead className="w-8" />
                </TableRow>
              </TableHeader>
              <TableBody>
                {docs.map(doc => (
                  <TableRow key={`${doc.source_file}-${doc.doc_type}`}>
                    <TableCell className="font-mono text-xs max-w-[200px] truncate">
                      {doc.source_file}
                    </TableCell>
                    <TableCell>
                      <Badge variant={docTypeBadgeVariant(doc.doc_type)} className="text-xs">
                        {docTypeLabel(doc.doc_type)}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right tabular-nums text-sm">
                      {doc.chunk_count.toLocaleString()}
                    </TableCell>
                    <TableCell className="text-sm text-gray-500">
                      {formatDate(doc.latest_upload)}
                    </TableCell>
                    <TableCell>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-7 w-7 text-gray-400 hover:text-red-600"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete document?</AlertDialogTitle>
                            <AlertDialogDescription>
                              This will permanently delete all {doc.chunk_count} chunks from{' '}
                              <strong>{doc.source_file}</strong>. EVE will no longer have access
                              to this content.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              className="bg-red-600 hover:bg-red-700"
                              onClick={() => void handleDeleteFile(doc.source_file)}
                            >
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        )}
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Upload new documents</CardTitle>
          <CardDescription className="text-xs">
            Queue one or more files — they'll be ingested sequentially. Uploading a file with the
            same name replaces its existing chunks.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor={`doctype-${slug}`}>Document type (applies to all files)</Label>
              <Select
                value={docType}
                onValueChange={v => setDocType(v as DocTypeValue)}
                disabled={processing}
              >
                <SelectTrigger id={`doctype-${slug}`}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {DOC_TYPES.map(dt => (
                    <SelectItem key={dt.value} value={dt.value}>
                      {dt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <UploadZone onFilesAdded={handleFilesAdded} disabled={processing} />

          {queue.length > 0 && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <p className="text-xs font-medium text-gray-600">
                  {queue.length} file{queue.length !== 1 ? 's' : ''} in queue
                  {processing && ' — processing…'}
                </p>
                {hasCompleted && !processing && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-7 text-xs text-gray-500 hover:text-gray-700"
                    onClick={handleClearCompleted}
                  >
                    Clear completed
                  </Button>
                )}
              </div>
              <div className="space-y-1.5 max-h-72 overflow-y-auto pr-1">
                {queue.map(item => (
                  <QueueItemRow
                    key={item.id}
                    item={item}
                    onRemove={() => handleRemoveItem(item.id)}
                  />
                ))}
              </div>
              {processing && (
                <Progress
                  className="h-1.5"
                  value={queue.length > 0
                    ? ((completedCount + errorCount) / queue.length) * 100
                    : 0}
                />
              )}
            </div>
          )}

          <div className="flex gap-2">
            <Button
              onClick={() => void handleIngestAll()}
              disabled={pendingCount === 0 || processing}
              className="bg-burgundy hover:bg-burgundy/90 text-white"
            >
              {processing
                ? 'Processing…'
                : pendingCount > 0
                  ? `Ingest ${pendingCount} file${pendingCount !== 1 ? 's' : ''}`
                  : 'Ingest documents'}
            </Button>
            {queue.length > 0 && !processing && (
              <Button variant="outline" onClick={handleClearAll}>
                Clear all
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {docs.length > 0 && (
        <Card className="border-red-200">
          <CardHeader>
            <CardTitle className="text-base text-red-700">Danger zone</CardTitle>
            <CardDescription className="text-xs">
              Destructive actions cannot be undone.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="outline" className="border-red-200 text-red-700 hover:bg-red-50">
                  <Trash2 className="w-4 h-4 mr-2" />
                  Clear all {label} knowledge
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Clear all {label} knowledge?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This will permanently delete all knowledge chunks for the {label} product.
                    EVE will have no information about {label} insurance until new documents are
                    ingested.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    className="bg-red-600 hover:bg-red-700"
                    onClick={() => void handleDeleteProduct()}
                  >
                    Clear all
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

// ── Partnership Inquiries panel ───────────────────────────────────────────────

function InquiriesPanel({ session }: { session: Session }) {
  const [inquiries, setInquiries]   = useState<PartnershipInquiry[]>([]);
  const [loading,   setLoading]     = useState(false);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [saving,    setSaving]      = useState<string | null>(null);

  // Per-row edit state: id → { status, outcome_notes }
  const [edits, setEdits] = useState<
    Record<string, { status: InquiryStatus; outcome_notes: string }>
  >({});

  const loadInquiries = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('partnership_inquiries')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data) {
      setInquiries(data as PartnershipInquiry[]);
      // Seed edit state for any new rows
      setEdits(prev => {
        const next = { ...prev };
        for (const row of data as PartnershipInquiry[]) {
          if (!next[row.id]) {
            next[row.id] = {
              status:        row.status,
              outcome_notes: row.outcome_notes ?? '',
            };
          }
        }
        return next;
      });
    }
    setLoading(false);
  }, []);

  useEffect(() => { void loadInquiries(); }, [loadInquiries]);

  const handleSave = async (id: string) => {
    const edit = edits[id];
    if (!edit) return;
    setSaving(id);

    await supabase
      .from('partnership_inquiries')
      .update({
        status:        edit.status,
        outcome_notes: edit.outcome_notes || null,
        reviewed_by:   session.user.email ?? null,
        reviewed_at:   new Date().toISOString(),
      })
      .eq('id', id);

    setSaving(null);
    void loadInquiries();
  };

  const pendingCount = inquiries.filter(i => i.status === 'pending').length;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-base font-semibold text-gray-900">Partnership Inquiries</h2>
          <p className="text-xs text-gray-500 mt-0.5">
            {inquiries.length} total
            {pendingCount > 0 && ` · ${pendingCount} pending review`}
          </p>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={loadInquiries}
          disabled={loading}
          className="gap-1.5 text-xs"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
          Refresh
        </Button>
      </div>

      {loading && inquiries.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center text-sm text-gray-500">
            Loading inquiries…
          </CardContent>
        </Card>
      ) : inquiries.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <Inbox className="w-10 h-10 mx-auto text-gray-300 mb-3" />
            <p className="text-sm text-gray-500">No inquiries yet.</p>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-28">Date</TableHead>
                <TableHead>Name</TableHead>
                <TableHead className="hidden sm:table-cell">Brokerage</TableHead>
                <TableHead className="hidden md:table-cell">Email</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-8" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {inquiries.map(inquiry => {
                const isExpanded = expandedId === inquiry.id;
                const edit       = edits[inquiry.id];

                return (
                  <>
                    <TableRow
                      key={inquiry.id}
                      className="cursor-pointer hover:bg-gray-50"
                      onClick={() => setExpandedId(isExpanded ? null : inquiry.id)}
                    >
                      <TableCell className="text-sm text-gray-500 whitespace-nowrap">
                        {formatDate(inquiry.created_at)}
                      </TableCell>
                      <TableCell className="font-medium text-sm">{inquiry.full_name}</TableCell>
                      <TableCell className="hidden sm:table-cell text-sm text-gray-600">
                        {inquiry.brokerage_name}
                      </TableCell>
                      <TableCell className="hidden md:table-cell text-sm text-gray-600">
                        <a
                          href={`mailto:${inquiry.email}`}
                          onClick={e => e.stopPropagation()}
                          className="hover:underline text-[#8B1E1E]"
                        >
                          {inquiry.email}
                        </a>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={inquiryStatusVariant(inquiry.status)}
                          className="text-xs capitalize"
                        >
                          {inquiryStatusLabel(inquiry.status)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {isExpanded
                          ? <ChevronUp className="w-4 h-4 text-gray-400" />
                          : <ChevronDown className="w-4 h-4 text-gray-400" />}
                      </TableCell>
                    </TableRow>

                    {isExpanded && edit && (
                      <TableRow key={`${inquiry.id}-detail`} className="bg-gray-50/70">
                        <TableCell colSpan={6} className="p-0">
                          <div className="px-4 py-5 space-y-4">
                            {/* Contact details row */}
                            <div className="grid sm:grid-cols-3 gap-3 text-sm">
                              <div>
                                <span className="text-xs text-gray-500 block">Phone</span>
                                <a
                                  href={`tel:${inquiry.phone}`}
                                  className="font-medium text-[#8B1E1E] hover:underline"
                                >
                                  {inquiry.phone}
                                </a>
                              </div>
                              <div className="sm:hidden">
                                <span className="text-xs text-gray-500 block">Email</span>
                                <a
                                  href={`mailto:${inquiry.email}`}
                                  className="font-medium text-[#8B1E1E] hover:underline"
                                >
                                  {inquiry.email}
                                </a>
                              </div>
                              {inquiry.reviewed_by && (
                                <div>
                                  <span className="text-xs text-gray-500 block">Last reviewed by</span>
                                  <span className="font-medium">{inquiry.reviewed_by}</span>
                                  {inquiry.reviewed_at && (
                                    <span className="text-gray-400 text-xs ml-1">
                                      on {formatDate(inquiry.reviewed_at)}
                                    </span>
                                  )}
                                </div>
                              )}
                            </div>

                            {/* Message */}
                            {inquiry.message && (
                              <div>
                                <span className="text-xs text-gray-500 block mb-1">
                                  Applicant message
                                </span>
                                <p className="text-sm text-gray-700 bg-white border border-gray-200 rounded-md px-3 py-2 whitespace-pre-wrap">
                                  {inquiry.message}
                                </p>
                              </div>
                            )}

                            {/* Editable fields */}
                            <div className="grid sm:grid-cols-2 gap-4">
                              <div className="space-y-1.5">
                                <Label className="text-xs">Status</Label>
                                <Select
                                  value={edit.status}
                                  onValueChange={v =>
                                    setEdits(prev => ({
                                      ...prev,
                                      [inquiry.id]: { ...prev[inquiry.id], status: v as InquiryStatus },
                                    }))
                                  }
                                >
                                  <SelectTrigger className="h-8 text-sm">
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {INQUIRY_STATUSES.map(s => (
                                      <SelectItem key={s.value} value={s.value}>
                                        {s.label}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </div>
                            </div>

                            <div className="space-y-1.5">
                              <Label className="text-xs">Outcome notes</Label>
                              <Textarea
                                value={edit.outcome_notes}
                                onChange={e =>
                                  setEdits(prev => ({
                                    ...prev,
                                    [inquiry.id]: {
                                      ...prev[inquiry.id],
                                      outcome_notes: e.target.value,
                                    },
                                  }))
                                }
                                placeholder="Internal notes about this inquiry…"
                                rows={3}
                                className="text-sm resize-none"
                              />
                            </div>

                            <div className="flex justify-end">
                              <Button
                                size="sm"
                                onClick={() => void handleSave(inquiry.id)}
                                disabled={saving === inquiry.id}
                                className="bg-burgundy hover:bg-burgundy/90 text-white gap-1.5"
                              >
                                {saving === inquiry.id ? (
                                  <span className="flex items-center gap-1.5">
                                    <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    Saving…
                                  </span>
                                ) : (
                                  <>
                                    <Save className="w-3.5 h-3.5" />
                                    Save changes
                                  </>
                                )}
                              </Button>
                            </div>
                          </div>
                        </TableCell>
                      </TableRow>
                    )}
                  </>
                );
              })}
            </TableBody>
          </Table>
        </Card>
      )}
    </div>
  );
}

// ── Main page ─────────────────────────────────────────────────────────────────

export function AdminPage() {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, s) => {
      setSession(s);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <span className="w-6 h-6 border-2 border-burgundy/30 border-t-burgundy rounded-full animate-spin" />
      </div>
    );
  }

  if (!session) return <LoginGate onSession={setSession} />;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-burgundy flex-shrink-0" />
            <div>
              <h1 className="text-base font-semibold text-gray-900 leading-tight">
                Admin Portal
              </h1>
              <p className="text-xs text-gray-500">
                AFUM · {session.user.email}
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleLogout}
            className="gap-1.5 text-gray-500 hover:text-gray-900"
          >
            <LogOut className="w-3.5 h-3.5" />
            Sign out
          </Button>
        </div>
      </header>

      {/* Body */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        <Tabs defaultValue="inquiries">
          <TabsList className="mb-6 bg-white border">
            <TabsTrigger
              value="inquiries"
              className="data-[state=active]:bg-burgundy data-[state=active]:text-white"
            >
              Inquiries
            </TabsTrigger>
            {PRODUCTS.map(p => (
              <TabsTrigger
                key={p.slug}
                value={p.slug}
                className="data-[state=active]:bg-burgundy data-[state=active]:text-white"
              >
                {p.label}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="inquiries">
            <InquiriesPanel session={session} />
          </TabsContent>

          {PRODUCTS.map(p => (
            <TabsContent key={p.slug} value={p.slug}>
              <ProductPanel slug={p.slug} label={p.label} session={session} />
            </TabsContent>
          ))}
        </Tabs>
      </main>
    </div>
  );
}
