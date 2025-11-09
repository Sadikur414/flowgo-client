import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js';
import PaymentForm from './PAymentForm';



const stripePromise = loadStripe(import.meta.env.VITE_stripkey);
export default function Payment() {
  return (
    <Elements stripe={stripePromise}>
          <PaymentForm></PaymentForm>
    </Elements>
  )
}
