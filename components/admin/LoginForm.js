import { useState } from 'react';
import { useRouter } from 'next/router';
import styles from '../../styles/DonateForm.module.css';
import axios from 'axios';

export default function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {            
            const response = await axios.post('/admin/login', {
                email,
                password
            });
            console.log(response.status);

            if (response.status === 200) {
                const data = response.data;
                localStorage.setItem('adminToken', data.token); // Store the token in local storage
               
                router.push('/admin/dashboard');

            } else {
                const data = await response.json();
                setError(data.msg || 'Login failed');
            }
        } catch (err) { 
            console.log(err);
            const errorMessage = err.response?.data?.msg || 'An error occurred. Please try again.';
            setError(errorMessage); 
        } finally {
            setLoading(false);
        }
    };

    return (

        <div className={styles.formContainer}>
            <div className={styles.formCard}>
                <h2 className={styles.formTitle}>Admin Login</h2>

                {error && (
                    <div className={styles.errorAlert}>
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className={styles.donateForm}>
                    <div className={styles.formGroup}>
                        <label htmlFor="name" className={styles.formLabel}>Email</label>
                        <input
                            type="email"
                            id="password"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className={styles.formInput}   
                            placeholder="your@email.com"
                            required
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="email" className={styles.formLabel}>Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={password}
                            placeholder="********"
                            onChange={(e) => setPassword(e.target.value)}
                            className={styles.formInput}
                            required
                        />
                    </div>


                    <button
                        type="submit"
                        className={styles.submitButton}
                        disabled={loading}
                    >
                        {loading ? 'Processing...' : 'Login'}
                    </button>
                </form>
            </div>
        </div>
    );
}