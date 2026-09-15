import { LegalHeading, LegalLayout, LegalSection } from './LegalLayout';

export function TcfPage() {
  return (
    <LegalLayout title="Treating Customers Fairly">
      <LegalHeading>Treating Customers Fairly</LegalHeading>
      <p className="text-gray-600 leading-relaxed">
        AFUM is committed to the fair treatment of customers as a core component of how its product range — Domestic, Commercial, Agri, Hospitality, FlexiFocus, and MyDrive — is designed, distributed, and serviced, across policies underwritten by Bryte Insurance Company Limited and Guardrisk Insurance Company Limited.
      </p>

      <LegalSection title="Outcome 1 — Culture and Governance">
        <p>
          Fair treatment of customers is central to AFUM's culture. The key individual holds accountability for TCF delivery, TCF measures form part of management information reviewed monthly, and product and process decisions are tested against the six outcomes before implementation.
        </p>
      </LegalSection>

      <LegalSection title="Outcome 2 — Products Designed for Identified Needs">
        <p>
          Each product is designed around the identified needs of its own target market — domestic policyholders, commercial enterprises, the agricultural sector, hospitality operators, modular household clients (FlexiFocus), and motor vehicle owners (MyDrive).
        </p>
      </LegalSection>

      <LegalSection title="Outcome 3 — Clear Information Before, During, and After Sale">
        <p>
          Policy wordings, schedules, and client communications are drafted in plain language appropriate to each target market. Cover, exclusions, and premium are disclosed clearly before purchase, and every change is confirmed with its premium effect before processing.
        </p>
      </LegalSection>

      <LegalSection title="Outcome 4 — Suitable Advice">
        <p>
          Products are distributed both directly and through appointed brokers. Where advice is provided, it is given by representatives meeting FAIS fit and proper requirements, recorded in records of advice, and monitored through the competency register and supervision arrangements.
        </p>
      </LegalSection>

      <LegalSection title="Outcome 5 — Products That Perform as Expected">
        <p>
          Claims are administered against defined service standards. Claims outcomes, turnaround times, and repudiation reasons are monitored per product to confirm each product performs in line with the promises made at sale.
        </p>
      </LegalSection>

      <LegalSection title="Outcome 6 — No Unreasonable Post-Sale Barriers">
        <p>
          Clients can amend, claim, complain, or cancel through their broker or AFUM directly. No fees are charged for endorsements or cancellation, cancellations are processed on instruction without obstruction, and the retention process offers alternatives without impeding the client's decision.
        </p>
      </LegalSection>
    </LegalLayout>
  );
}
