import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { LegalHeading, LegalLayout, LegalSection } from './LegalLayout';

const workflow = [
  {
    step: '1',
    title: 'Submission',
    actor: 'Client',
    timing: 'Immediate',
    detail: 'Complaint received by AFUM directly or via your broker.',
  },
  {
    step: '2',
    title: 'Acknowledgement',
    actor: 'AFUM',
    timing: '24 hours',
    detail: 'AFUM acknowledges receipt and confirms understanding of the complaint.',
  },
  {
    step: '3',
    title: 'Investigation',
    actor: 'AFUM',
    timing: 'Within 7 working days of registration',
    detail: 'AFUM investigates as UMA; may request further information from the client or broker.',
  },
  {
    step: '4',
    title: 'Resolution',
    actor: 'AFUM',
    timing: 'Within 7 working days',
    detail: "Where AFUM can resolve the matter within its mandate, the outcome is communicated in writing.",
  },
  {
    step: '5',
    title: 'Escalation to insurer',
    actor: 'AFUM → Insurer',
    timing: 'Within 5 business days of that determination',
    detail:
      "Where AFUM cannot resolve the matter (e.g. disputed liability, indemnity, or policy interpretation), the complaint is escalated to whichever insurer underwrites your policy — Bryte Insurance Company Limited or Guardrisk Insurance Company Limited — together with AFUM's full investigation file.",
  },
  {
    step: '6',
    title: 'Insurer decision',
    actor: 'Insurer',
    timing: 'Within 15 business days of escalation',
    detail:
      'The insurer reviews and issues a final internal decision, communicated to you via AFUM (and your broker, where applicable).',
  },
  {
    step: '7',
    title: 'External escalation',
    actor: 'Client',
    timing: 'No prescribed limit; internal process must be exhausted first',
    detail:
      "If still unresolved, or you're dissatisfied with the outcome, refer the matter externally (see below).",
  },
];

export function ComplaintsPage() {
  return (
    <LegalLayout title="Complaints">
      <LegalHeading>We want to know if something's wrong.</LegalHeading>
      <p className="text-gray-600 leading-relaxed">
        Complaints are free to lodge. Every complaint is acknowledged and investigated.
      </p>

      <LegalSection title="How to submit a complaint">
        <ol className="list-decimal pl-5 space-y-3">
          <li>
            Email us at{' '}
            <a
              href="mailto:complaints@adminfocus.co.za"
              className="text-burgundy hover:text-burgundy-dark transition-colors"
            >
              complaints@adminfocus.co.za
            </a>{' '}
            or call us with your policy number and a description of the issue.
          </li>
          <li>If you have a broker, you can also lodge the complaint through them.</li>
          <li>We'll acknowledge receipt within 24 hours.</li>
        </ol>
      </LegalSection>

      <LegalSection title="The complaints workflow">
        <ol className="space-y-4 list-none pl-0">
          {workflow.map((item) => (
            <li
              key={item.step}
              className="rounded-[var(--radius)] border border-border bg-card p-5"
            >
              <div className="flex items-start gap-4">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-burgundy text-white text-sm font-medium">
                  {item.step}
                </span>
                <div>
                  <h3 className="font-heading font-medium text-[#1a1a2e] text-lg">
                    {item.title}
                  </h3>
                  <p className="text-sm text-burgundy mt-1">
                    {item.actor} — {item.timing}
                  </p>
                  <p className="mt-2">{item.detail}</p>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </LegalSection>

      <LegalSection title="Where to escalate externally">
        <div className="rounded-[var(--radius)] border border-border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="whitespace-normal text-[#1a1a2e]">
                  Nature of complaint
                </TableHead>
                <TableHead className="whitespace-normal text-[#1a1a2e]">
                  External body
                </TableHead>
                <TableHead className="whitespace-normal text-[#1a1a2e]">
                  Contact
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="whitespace-normal align-top">
                  Claim rejection, settlement amount, delay, or general service
                </TableCell>
                <TableCell className="whitespace-normal align-top">
                  National Financial Ombud Scheme (NFO) – Non-Life Insurance Division
                </TableCell>
                <TableCell className="whitespace-normal align-top">
                  <a
                    href="https://www.nfosa.co.za"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-burgundy hover:text-burgundy-dark transition-colors"
                  >
                    www.nfosa.co.za
                  </a>
                  {' | '}
                  <a
                    href="tel:0860800900"
                    className="text-burgundy hover:text-burgundy-dark transition-colors"
                  >
                    0860 800 900
                  </a>
                  {' | '}
                  <a
                    href="mailto:info@nfosa.co.za"
                    className="text-burgundy hover:text-burgundy-dark transition-colors"
                  >
                    info@nfosa.co.za
                  </a>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="whitespace-normal align-top">
                  Financial advice, product suitability, disclosure, or broker/intermediary conduct
                </TableCell>
                <TableCell className="whitespace-normal align-top">
                  Ombud for Financial Services Providers (FAIS Ombud)
                </TableCell>
                <TableCell className="whitespace-normal align-top">
                  <a
                    href="tel:0127625000"
                    className="text-burgundy hover:text-burgundy-dark transition-colors"
                  >
                    012 762 5000
                  </a>
                  {' | '}
                  <a
                    href="mailto:info@faisombud.co.za"
                    className="text-burgundy hover:text-burgundy-dark transition-colors"
                  >
                    info@faisombud.co.za
                  </a>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="whitespace-normal align-top">
                  Concern about how AFUM or the NFO handled the complaint process itself
                </TableCell>
                <TableCell className="whitespace-normal align-top">
                  Financial Sector Conduct Authority (FSCA)
                </TableCell>
                <TableCell className="whitespace-normal align-top">
                  <a
                    href="https://www.fsca.co.za"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-burgundy hover:text-burgundy-dark transition-colors"
                  >
                    www.fsca.co.za
                  </a>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
        <p>
          Note: the NFO absorbed the former Ombudsman for Short-Term Insurance in March 2024, but the FAIS Ombud remains a separate scheme for advice and conduct complaints — some complaints may need to go to both.
        </p>
      </LegalSection>

      <p className="mt-12 text-sm text-gray-500 leading-relaxed border-t border-border pt-6">
        Admin Focus Underwriting Managers (Pty) Ltd is an authorised Financial Services Provider, FSP 50086. AFUM administers policies underwritten by Bryte Insurance Company Limited and Guardrisk Insurance Company Limited, licensed non-life insurers and authorised FSPs. AFUM subscribes to the Treating Customers Fairly (TCF) principles. If you have a complaint, contact us first; unresolved matters may be referred to the National Financial Ombud Scheme or the FSCA.
      </p>
    </LegalLayout>
  );
}
