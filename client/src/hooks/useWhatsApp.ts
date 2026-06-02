import { useCallback } from 'react';
import { buildWhatsAppMessage, openWhatsApp } from '../lib/whatsapp';
import type { OrderDetails } from '../types';

export function useWhatsApp() {
  const sendOrder = useCallback((order: OrderDetails) => {
    const message = buildWhatsAppMessage(order);
    openWhatsApp(message);
  }, []);

  return { sendOrder, buildMessage: buildWhatsAppMessage };
}
