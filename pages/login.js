import Head from 'next/head';
import LoginForm from '../components/admin/LoginForm';

export default function AdminLogin() {
    return (

        <div className="min-h-screen bg-gray-50">
            <Head>
                <title>Admin Login</title>
                <meta name="description" content="Secure donation form to support our mission" />
            </Head>

            <main className="container mx-auto px-4 py-12">
                <div className="max-w-4xl mx-auto">
                    
                    <LoginForm />
                </div>
            </main>
        </div>
    )
}