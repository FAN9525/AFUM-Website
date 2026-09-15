import { LegalHeading, LegalLayout, LegalSection } from './LegalLayout';

export function PrivacyPolicyPage() {
  return (
    <LegalLayout title="Privacy Policy">
      <LegalHeading>Privacy Policy</LegalHeading>
      <p className="text-gray-600 leading-relaxed">
        Admin Focus Underwriting Managers (Pty) Ltd (FSP 50086)
      </p>
      <p className="text-sm text-gray-500 mt-2">Last updated: September 2026</p>

      <LegalSection title="1. Introduction and scope">
        <p>
          Admin Focus Underwriting Managers (Pty) Ltd ("AFUM", "we", "us") administers its product range on behalf of the insurers that underwrite it. This policy explains how we collect, use, share, and protect personal information in line with the Protection of Personal Information Act 4 of 2013 ("POPIA"). It applies to clients, policyholders, dependants, brokers, and visitors to the Admin Focus website.
        </p>
        <p>
          This policy does not replace our Promotion of Access to Information Act (PAIA) manual, which sets out how you may request access to records we hold and is available on request from our Information Officer.
        </p>
      </LegalSection>

      <LegalSection title="2. Information Officer">
        <p>Fanie Vermaak</p>
        <p>
          <a
            href="mailto:fanie@adminfocus.co.za"
            className="text-burgundy hover:text-burgundy-dark transition-colors"
          >
            fanie@adminfocus.co.za
          </a>
        </p>
      </LegalSection>

      <LegalSection title="3. What personal information we collect">
        <ul className="list-disc pl-5 space-y-2">
          <li>Identity information — full name, ID or passport number, date of birth, contact details</li>
          <li>Policy and underwriting information — property or asset details, address, risk factors, claims history</li>
          <li>Financial information — banking details, payment history, premium collection records</li>
          <li>Claims information — details of the incident, supporting documents, photographs, assessor reports, and, where relevant to a specific claim, special personal information such as health information</li>
          <li>Communication records — correspondence and complaint records</li>
          <li>Technical information — device and browser information collected via the Admin Focus website</li>
        </ul>
        <p>
          Special personal information (as defined in section 26 of POPIA, which includes health information) is only processed where an exception applies — primarily section 32 of POPIA, permitting insurers to process health information for purposes connected to assessing risk, administering policies, and processing claims.
        </p>
      </LegalSection>

      <LegalSection title="4. Why we process your information">
        <ul className="list-disc pl-5 space-y-2">
          <li>To assess insurance risk, quote, and underwrite policies</li>
          <li>To administer your policy, including premium collection and renewals</li>
          <li>To assess and settle claims, including verifying information with brokers, assessors, and insurers</li>
          <li>To register, investigate, and resolve complaints</li>
          <li>To comply with legal and regulatory obligations, including the FAIS Act, the Insurance Act, the Policyholder Protection Rules, and FICA</li>
          <li>To detect and prevent fraud</li>
          <li>To communicate with you about your policy and claims, and, where you have not opted out, relevant products or services</li>
        </ul>
      </LegalSection>

      <LegalSection title="5. The lawful basis for processing">
        <p>
          We only process personal information where at least one applies: you have consented; processing is necessary to conclude or perform our contract with you; processing is required to comply with a legal obligation; processing protects a legitimate interest of yours; or processing pursues our legitimate interests, such as fraud prevention, provided this does not unreasonably infringe your rights.
        </p>
      </LegalSection>

      <LegalSection title="6. Who we share your information with">
        <ul className="list-disc pl-5 space-y-2">
          <li>Bryte Insurance Company Limited or Guardrisk Insurance Company Limited, whichever underwrites your policy</li>
          <li>Your broker, for policy administration, claims support, and complaint handling</li>
          <li>Payment service providers, for premium collection and, where relevant, bank account verification ahead of a claim payout</li>
          <li>Assessors, loss adjusters, and other service providers engaged to investigate a specific claim</li>
          <li>Regulators, including the Financial Sector Conduct Authority and the Information Regulator, where legally required</li>
          <li>Our technology service providers, under written confidentiality and security obligations</li>
        </ul>
        <p>We do not sell personal information to third parties.</p>
      </LegalSection>

      <LegalSection title="7. Cross-border transfers">
        <p>
          Some of our technology service providers may process or store information outside South Africa. Where this occurs, we only transfer personal information where the recipient is subject to a law, binding corporate rules, or a written agreement upholding protections comparable to POPIA, or where another basis under section 72 of POPIA applies.
        </p>
      </LegalSection>

      <LegalSection title="8. How long we keep your information">
        <p>
          We retain personal information for as long as needed for the purposes described in this policy, and thereafter as required by law — including the FAIS Act's record-keeping requirements (generally 5 years), FICA, and prescription periods under the Insurance Act. Claims and complaints records are retained for at least 5 years from finalisation.
        </p>
      </LegalSection>

      <LegalSection title="9. Security safeguards">
        <p>
          We maintain technical and organisational measures appropriate to the risk, including access controls, encryption of sensitive data in transit, restricted internal access on a need-to-know basis, and written confidentiality obligations for all service providers processing personal information on our behalf. If a data breach occurs that is likely to compromise your personal information, we will notify the Information Regulator and affected data subjects as required by section 22 of POPIA.
        </p>
      </LegalSection>

      <LegalSection title="10. Direct marketing">
        <p>
          We will only send direct marketing with your consent, or where you are an existing client and the marketing relates to similar products or services, in line with section 69 of POPIA. You may opt out at any time.
        </p>
      </LegalSection>

      <LegalSection title="11. Your rights as a data subject">
        <ul className="list-disc pl-5 space-y-2">
          <li>To be told what personal information we hold about you and why</li>
          <li>To access the personal information we hold about you</li>
          <li>To request correction of inaccurate or outdated information</li>
          <li>To request deletion of personal information we no longer have a lawful basis to retain</li>
          <li>To object to processing, including direct marketing, in certain circumstances</li>
          <li>To complain to the Information Regulator if you believe we have not complied with POPIA</li>
        </ul>
      </LegalSection>

      <LegalSection title="12. Children's information">
        <p>
          Policies are held by adult policyholders. Where a policy covers a dependant who is a minor, their information is processed with the consent of, and under the instruction of, their parent or legal guardian.
        </p>
      </LegalSection>

      <LegalSection title="13. Complaints to the Information Regulator">
        <p>Information Regulator (South Africa)</p>
        <p>
          <a
            href="https://inforegulator.org.za"
            target="_blank"
            rel="noopener noreferrer"
            className="text-burgundy hover:text-burgundy-dark transition-colors"
          >
            inforegulator.org.za
          </a>
        </p>
        <p>
          <a
            href="mailto:complaints.IR@justice.gov.za"
            className="text-burgundy hover:text-burgundy-dark transition-colors"
          >
            complaints.IR@justice.gov.za
          </a>
        </p>
      </LegalSection>

      <LegalSection title="14. Changes to this policy">
        <p>
          We may update this policy from time to time to reflect changes in our practices or the law. The current version is always available on this website.
        </p>
      </LegalSection>

      <LegalSection title="15. Contact us">
        <p>Admin Focus Underwriting Managers (Pty) Ltd — FSP 50086</p>
        <p>Anglers Loft No 48, Peninsula on Vaal, Oranjeville, 1995</p>
        <p>
          <a
            href="mailto:info@adminfocus.co.za"
            className="text-burgundy hover:text-burgundy-dark transition-colors"
          >
            info@adminfocus.co.za
          </a>
          {' · '}
          <a
            href="https://adminfocus.co.za"
            className="text-burgundy hover:text-burgundy-dark transition-colors"
          >
            adminfocus.co.za
          </a>
        </p>
      </LegalSection>
    </LegalLayout>
  );
}
