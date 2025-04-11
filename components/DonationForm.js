import { useState } from "react";
import axios from "axios";
import styles from '../styles/DonateForm.module.css';

function DonateForm() {
  const [formData, setFormData] = useState({ 
    name: "", 
    email: "", 
    phone: "", 
    amount: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await axios.post("/donate", formData);
      console.log(response);
      window.location.href = response.data.url;
    } catch (err) {
        console.log(err);
      setError(err.response?.data?.error || "Payment failed. Please try again.");
      setIsSubmitting(false);
    }
  };

  const amountOptions = [100, 250, 500, 1000];

  return (
    <div className={styles.formContainer}>
      <div className={styles.formCard}>
        <h2 className={styles.formTitle}>Make a Donation</h2>
        
        {error && (
          <div className={styles.errorAlert}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className={styles.donateForm}>
          <div className={styles.formGroup}>
            <label htmlFor="name" className={styles.formLabel}>Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={styles.formInput}
              placeholder="John Doe"
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="email" className={styles.formLabel}>Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={styles.formInput}
              placeholder="your@email.com"
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="phone" className={styles.formLabel}>Phone Number</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className={styles.formInput}
              placeholder="01XXXXXXXXX"
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Donation Amount (Tk)</label>
            <div className={styles.amountOptions}>
              {amountOptions.map((amount) => (
                <button
                  type="button"
                  key={amount}
                  className={`${styles.amountButton} ${
                    parseInt(formData.amount) === amount ? styles.amountButtonActive : ""
                  }`}
                  onClick={() => setFormData({...formData, amount: amount.toString()})}
                >
                  Tk. {amount}
                </button>
              ))}
            </div>
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              className={styles.formInput}
              placeholder="Or enter custom amount"
              min="1"
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="message" className={styles.formLabel}>Message (Optional)</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              className={`${styles.formInput} ${styles.formTextarea}`}
              placeholder="Add a personal message..."
              rows="3"
            />
          </div>

          <button
            type="submit"
            className={styles.submitButton}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Processing...' : 'Donate Now'}
          </button>

          <p className={styles.securityNote}>
            <svg className={styles.lockIcon} viewBox="0 0 24 24">
              <path d="M12 1C8.676 1 6 3.676 6 7v1H4v14h16V8h-2V7c0-3.324-2.676-6-6-6zm0 2c2.276 0 4 1.724 4 4v1H8V7c0-2.276 1.724-4 4-4zm0 10c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2z" />
            </svg>
            Secure & encrypted payment processing
          </p>
        </form>
      </div>
    </div>
  );
}

export default DonateForm;