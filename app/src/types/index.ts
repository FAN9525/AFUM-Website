export type IntentTag = 'info' | 'advice' | 'competitor' | 'claim' | 'lead';

export interface Product {
  logo:        string;
  title:       string;
  shortTitle:  string;
  description: string;
  features:    string[];
  details:     string;
}

export interface EveMessage {
  id:        string;
  role:      'user' | 'assistant';
  content:   string;
  timestamp: Date;
  intentTag?: IntentTag;
}

export interface ChatSession {
  sessionId:      string;
  productContext: string;
  messages:       EveMessage[];
  isLoading:      boolean;
  showLeadForm:   boolean;
}

export interface LeadFormData {
  name:  string;
  email: string;
  phone: string;
}
