import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, MessageCircle, ChevronDown } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { useEveChat } from '@/hooks/use-eve-chat';
import type { LeadFormData } from '@/types';

// ── Assistant message renderer ────────────────────────────────────────────────

function AssistantMessage({ content }: { content: string }) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        h1: ({ children }) => (
          <h1 className="text-base font-semibold text-gray-900 mt-4 mb-1 first:mt-0 leading-snug border-b border-gray-200 pb-1">
            {children}
          </h1>
        ),
        h2: ({ children }) => (
          <h2 className="text-sm font-semibold text-gray-900 mt-3 mb-1 first:mt-0 leading-snug">
            {children}
          </h2>
        ),
        h3: ({ children }) => (
          <h3 className="text-sm font-semibold text-gray-700 mt-2 mb-0.5 first:mt-0">
            {children}
          </h3>
        ),
        p: ({ children }) => (
          <p className="mb-2 last:mb-0 leading-relaxed text-gray-800">
            {children}
          </p>
        ),
        ul: ({ children }) => (
          <ul className="list-disc pl-4 mb-2 space-y-0.5 last:mb-0">
            {children}
          </ul>
        ),
        ol: ({ children }) => (
          <ol className="list-decimal pl-4 mb-2 space-y-0.5 last:mb-0">
            {children}
          </ol>
        ),
        li: ({ children }) => (
          <li className="leading-relaxed text-gray-800">{children}</li>
        ),
        strong: ({ children }) => (
          <strong className="font-semibold text-gray-900">{children}</strong>
        ),
        em: ({ children }) => (
          <em className="italic text-gray-700">{children}</em>
        ),
        code: ({ children }) => (
          <code className="bg-gray-200 rounded px-1 py-0.5 text-xs font-mono text-gray-800">
            {children}
          </code>
        ),
        hr: () => <hr className="border-gray-300 my-2" />,
        blockquote: ({ children }) => (
          <blockquote className="border-l-2 border-burgundy pl-3 my-2 text-gray-600 italic">
            {children}
          </blockquote>
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  );
}

const leadSchema = z.object({
  name:  z.string().min(2, 'Please enter your name'),
  email: z.string().email('Please enter a valid email'),
  phone: z.string().min(7, 'Please enter a contact number'),
});

// ── Typing indicator ──────────────────────────────────────────────────────────

function TypingIndicator() {
  return (
    <div className="flex items-center gap-1 px-4 py-3 bg-gray-100 rounded-2xl rounded-bl-sm w-fit">
      {[0, 1, 2].map(i => (
        <motion.div
          key={i}
          className="w-2 h-2 bg-gray-400 rounded-full"
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
        />
      ))}
    </div>
  );
}

// ── Lead capture form ─────────────────────────────────────────────────────────

interface LeadFormProps {
  onSubmit:  (data: LeadFormData) => void;
  onDismiss: () => void;
}

function LeadForm({ onSubmit, onDismiss }: LeadFormProps) {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LeadFormData>({
    resolver: zodResolver(leadSchema),
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="mx-4 mb-4 bg-[#8B1E1E]/5 border border-[#8B1E1E]/20 rounded-xl p-4"
    >
      <p className="text-sm font-semibold text-[#1a1a2e] mb-3" style={{ fontFamily: 'Playfair Display, serif' }}>
        Speak to a partner
      </p>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        <div>
          <input
            {...register('name')}
            placeholder="Your name"
            className="w-full text-sm px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#8B1E1E] focus:ring-1 focus:ring-[#8B1E1E]/30"
          />
          {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name.message}</p>}
        </div>
        <div>
          <input
            {...register('email')}
            type="email"
            placeholder="Email address"
            className="w-full text-sm px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#8B1E1E] focus:ring-1 focus:ring-[#8B1E1E]/30"
          />
          {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>}
        </div>
        <div>
          <input
            {...register('phone')}
            type="tel"
            placeholder="Phone number"
            className="w-full text-sm px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#8B1E1E] focus:ring-1 focus:ring-[#8B1E1E]/30"
          />
          {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone.message}</p>}
        </div>
        <div className="flex gap-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex-1 bg-[#8B1E1E] hover:bg-[#6B1717] text-white text-sm font-medium py-2 rounded-lg transition-colors disabled:opacity-50"
          >
            {isSubmitting ? 'Sending…' : 'Request a callback'}
          </button>
          <button
            type="button"
            onClick={onDismiss}
            className="px-3 py-2 text-gray-400 hover:text-gray-600 text-sm"
          >
            Later
          </button>
        </div>
      </form>
    </motion.div>
  );
}

// ── Main widget ───────────────────────────────────────────────────────────────

interface EveWidgetProps {
  productContext?: string;
  forceOpen?:      boolean;
  onOpenHandled?:  () => void;
}

export function EveWidget({ productContext = '', forceOpen, onOpenHandled }: EveWidgetProps) {
  const [isOpen,        setIsOpen]        = useState(false);
  const [inputValue,    setInputValue]    = useState('');
  const [leadSubmitted, setLeadSubmitted] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef       = useRef<HTMLInputElement>(null);

  const { messages, isLoading, showLeadForm, sendMessage, submitLead, reset } =
    useEveChat({ productContext });

  // Open widget when parent dispatches eve:open event
  useEffect(() => {
    if (forceOpen) {
      setIsOpen(true);
      onOpenHandled?.();
    }
  }, [forceOpen, onOpenHandled]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading, showLeadForm]);

  useEffect(() => {
    if (isOpen) setTimeout(() => inputRef.current?.focus(), 150);
  }, [isOpen]);

  const handleSend = () => {
    if (!inputValue.trim()) return;
    sendMessage(inputValue);
    setInputValue('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleLeadSubmit = async (data: LeadFormData) => {
    await submitLead(data);
    setLeadSubmitted(true);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {/* Chat panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="w-[380px] bg-white rounded-2xl shadow-2xl border border-gray-100 flex flex-col overflow-hidden"
            style={{ height: '520px' }}
          >
            {/* Header */}
            <div className="bg-[#8B1E1E] px-4 py-3 flex items-center justify-between flex-shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                  <span className="text-white text-xs font-bold" style={{ fontFamily: 'Playfair Display, serif' }}>
                    E
                  </span>
                </div>
                <div>
                  <p className="text-white font-semibold text-sm" style={{ fontFamily: 'Playfair Display, serif' }}>
                    EVE
                  </p>
                  <p className="text-white/70 text-xs">Admin Focus Assistant</p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-7 h-7 rounded-full hover:bg-white/20 flex items-center justify-center transition-colors"
                  aria-label="Minimise"
                >
                  <ChevronDown className="w-4 h-4 text-white" />
                </button>
                <button
                  onClick={() => { setIsOpen(false); reset(); }}
                  className="w-7 h-7 rounded-full hover:bg-white/20 flex items-center justify-center transition-colors"
                  aria-label="Close"
                >
                  <X className="w-4 h-4 text-white" />
                </button>
              </div>
            </div>

            {/* Product context badge */}
            {productContext && (
              <div className="px-4 py-2 bg-gray-50 border-b border-gray-100 flex-shrink-0">
                <span className="text-xs text-gray-500">
                  Discussing: <span className="font-medium text-[#8B1E1E]">{productContext}</span>
                </span>
              </div>
            )}

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
              {messages.length === 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-center pt-4"
                >
                  <p className="text-gray-500 text-sm leading-relaxed">
                    Hello — I'm EVE. I can help you understand Admin Focus products,
                    coverage scope, and how our underwriting approach works.
                  </p>
                  <p className="text-gray-400 text-xs mt-2">
                    What would you like to know?
                  </p>
                </motion.div>
              )}

              {messages.map(msg => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                      msg.role === 'user'
                        ? 'bg-[#8B1E1E] text-white rounded-br-sm'
                        : 'bg-gray-100 text-gray-800 rounded-bl-sm max-w-[90%]'
                    }`}
                  >
                    {msg.role === 'assistant'
                      ? <AssistantMessage content={msg.content} />
                      : msg.content}
                  </div>
                </motion.div>
              ))}

              {isLoading && (
                <div className="flex justify-start">
                  <TypingIndicator />
                </div>
              )}

              {showLeadForm && !leadSubmitted && (
                <LeadForm
                  onSubmit={handleLeadSubmit}
                  onDismiss={() => {}}
                />
              )}

              {leadSubmitted && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mx-4 p-4 bg-green-50 border border-green-200 rounded-xl text-sm text-green-800"
                >
                  Thank you — a partner will be in touch shortly.
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="px-4 py-3 border-t border-gray-100 flex-shrink-0">
              <div className="flex items-center gap-2 bg-gray-50 rounded-xl px-3 py-2">
                <input
                  ref={inputRef}
                  value={inputValue}
                  onChange={e => setInputValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask about our products…"
                  disabled={isLoading}
                  className="flex-1 bg-transparent text-sm text-gray-800 placeholder-gray-400 focus:outline-none disabled:opacity-50"
                />
                <button
                  onClick={handleSend}
                  disabled={!inputValue.trim() || isLoading}
                  className="w-8 h-8 bg-[#8B1E1E] hover:bg-[#6B1717] disabled:opacity-40 rounded-lg flex items-center justify-center transition-colors flex-shrink-0"
                  aria-label="Send message"
                >
                  <Send className="w-3.5 h-3.5 text-white" />
                </button>
              </div>
              <p className="text-center text-xs text-gray-400 mt-2">
                EVE provides product information only — not personal financial advice.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating trigger button */}
      <motion.button
        onClick={() => setIsOpen(prev => !prev)}
        className="w-14 h-14 bg-[#8B1E1E] rounded-full shadow-lg flex items-center justify-center"
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Open EVE chat assistant"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0,   opacity: 1 }}
              exit={{ rotate: 90,     opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <X className="w-6 h-6 text-white" />
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ rotate: 90,  opacity: 0 }}
              animate={{ rotate: 0,   opacity: 1 }}
              exit={{ rotate: -90,    opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <MessageCircle className="w-6 h-6 text-white" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}
