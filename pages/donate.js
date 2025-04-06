import Head from 'next/head';
import DonateForm from '../components/DonationForm';

export default function DonatePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>Make a Donation | Support Our Cause</title>
        <meta name="description" content="Secure donation form to support our mission" />
      </Head>

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Support Our Cause</h1>
            <p className="text-xl text-gray-600">
              Your generous donation helps us continue our important work
            </p>
          </div>
          <DonateForm />
        </div>
      </main>
    </div>
  );
}