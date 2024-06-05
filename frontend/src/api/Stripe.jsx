import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from '../components/checkoutForm/CheckoutForm';
import { useState, useEffect } from 'react';

const publisherKey = import.meta.env.VITE_STRIPE_PUBLISHER_KEY;

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(publisherKey);

export default function App({ amount, currency, mode, t }) {
  const [clientSecret, setClientSecret] = useState(null);
  const [loadingError, setLoadingError] = useState(null);

  useEffect(() => {
    const fetchClientSecret = async () => {
      try {
        // Fetch the client secret from your server
        const response = await fetch('your_server_endpoint_to_fetch_client_secret');
        const data = await response.json();
        setClientSecret(data.clientSecret); // Assuming your server returns the client secret
      } catch (error) {
        setLoadingError(error.message);
      }
    };

    // fetchClientSecret();

    return () => {
      // Cleanup function if needed
    };
  }, []);

  if (loadingError) {
    return <div>Error: {loadingError}</div>;
  }

  const options = {
    mode,
    amount,
    currency,
    // clientSecret,
  };

  return (
    <Elements stripe={stripePromise} options={options}>
      <CheckoutForm t={t} options={options} />
    </Elements>
  );
}
