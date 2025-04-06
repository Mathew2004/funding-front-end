import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function PaymentSuccess() {
  const router = useRouter();
  const { amount, name } = router.query;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <Head>
        <title>Payment Successful | Thank You</title>
        <meta name="description" content="Your donation was processed successfully" />
      </Head>

      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center">
        <div className="mb-6">
          <svg className="w-20 h-20 mx-auto text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Payment Successful!</h1>
        <p className="text-lg text-gray-600 mb-6">
          Thank you for your generous donation{name ? `, ${name}` : ''}!
        </p>

        {amount && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
            <p className="text-green-800 font-medium">Donation Amount: ${amount}</p>
          </div>
        )}

        <div className="space-y-4">
          <p className="text-gray-600">
            A receipt has been sent to your email. Your support makes a real difference.
          </p>
          
          <div className="pt-4">
            <Link href="/" className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition duration-200">
              Return to Home
            </Link>
          </div>
          
          <p className="text-sm text-gray-500 mt-4">
            Need help? <Link href="/contact" className="text-blue-600 hover:underline">Contact us</Link>
          </p>
        </div>
      </div>
    </div>
  );
}