import { useState, useCallback, useRef } from 'react';
import { supabase } from '@/lib/supabase';
import type { EveMessage, IntentTag, LeadFormData } from '@/types';

function generateSessionId(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16);
  });
}

const EDGE_FUNCTION_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/eve-public-chat`;

interface UseEveChatOptions {
  productContext: string;
}

export function useEveChat({ productContext }: UseEveChatOptions) {
  const sessionIdRef               = useRef<string>(generateSessionId());
  const [messages,    setMessages]     = useState<EveMessage[]>([]);
  const [isLoading,   setIsLoading]    = useState(false);
  const [showLeadForm, setShowLeadForm] = useState(false);

  const sendMessage = useCallback(async (text: string) => {
    if (!text.trim() || isLoading) return;

    const userMsg: EveMessage = {
      id:        crypto.randomUUID(),
      role:      'user',
      content:   text.trim(),
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, userMsg]);
    setIsLoading(true);

    try {
      const history = messages.map(m => ({ role: m.role, content: m.content }));

      const res = await fetch(EDGE_FUNCTION_URL, {
        method:  'POST',
        headers: {
          'Content-Type':  'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
        },
        body:    JSON.stringify({
          session_id:      sessionIdRef.current,
          product_context: productContext,
          message:         text.trim(),
          history,
        }),
      });

      if (!res.ok) throw new Error(`Edge function returned ${res.status}`);

      const data = await res.json() as {
        reply:          string;
        intent_tag:     IntentTag;
        show_lead_form: boolean;
      };

      const assistantMsg: EveMessage = {
        id:        crypto.randomUUID(),
        role:      'assistant',
        content:   data.reply,
        timestamp: new Date(),
        intentTag: data.intent_tag,
      };

      setMessages(prev => [...prev, assistantMsg]);
      if (data.show_lead_form) setShowLeadForm(true);

    } catch (err) {
      console.error('EVE chat error:', err);
      const errorMsg: EveMessage = {
        id:        crypto.randomUUID(),
        role:      'assistant',
        content:   "I'm having trouble connecting right now. Please try again in a moment.",
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  }, [messages, isLoading, productContext]);

  const submitLead = useCallback(async (data: LeadFormData) => {
    const { data: conv } = await supabase
      .from('conversations')
      .select('id')
      .eq('session_id', sessionIdRef.current)
      .maybeSingle();

    await supabase.from('leads').insert({
      conversation_id:  conv?.id ?? null,
      name:             data.name,
      email:            data.email,
      phone:            data.phone,
      product_interest: productContext,
    });

    setShowLeadForm(false);
  }, [productContext]);

  const reset = useCallback(() => {
    sessionIdRef.current = generateSessionId();
    setMessages([]);
    setIsLoading(false);
    setShowLeadForm(false);
  }, []);

  return {
    messages,
    isLoading,
    showLeadForm,
    sendMessage,
    submitLead,
    reset,
  };
}
