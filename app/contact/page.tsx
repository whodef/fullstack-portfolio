import ContactForm from '@/components/ContactForm';

export const metadata = { title: 'Contacts — Tatiana' };

export default function ContactPage() {
  return (
    <section className="container py-20 content-centercontainer py-20 flex flex-col items-center justify-center">
      <h1 className="text-3xl md:text-5xl font-bold mb-8 text-center">Contact me</h1>
      <ContactForm />
    </section>
  );
}
