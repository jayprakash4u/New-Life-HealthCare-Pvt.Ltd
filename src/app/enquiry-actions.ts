'use server';

import { saveEnquiry } from '@/lib/enquiries';

export async function submitEnquiry(
  source: 'Contact' | 'Care enquiry' | 'Visit request',
  _: string,
  form: FormData,
) {
  const field = (key: string) => {
    const value = form.get(key);
    return typeof value === 'string' ? value.trim() : '';
  };
  const name = field('name');
  const phone = field('phone');
  const email = field('email');
  const topic = field('topic');
  const message = field('message');
  if (
    !name ||
    name.length > 100 ||
    topic.length > 160 ||
    message.length > 1500 ||
    (source !== 'Visit request' && !message) ||
    !/^\+?[0-9 ()-]{7,32}$/.test(phone) ||
    phone.replace(/\D/g, '').length < 7 ||
    (email && (email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)))
  ) {
    return 'Check your name, phone number and message, then try again.';
  }
  try {
    await saveEnquiry({ source, name, phone, email, topic, message });
    return source === 'Visit request'
      ? 'Request received. The clinic will call to confirm your appointment.'
      : 'Your request was sent to the clinic.';
  } catch {
    return 'Your request could not be sent. Please try again.';
  }
}
