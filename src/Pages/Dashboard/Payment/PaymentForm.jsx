import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';

export default function PaymentForm() {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState('');
  const navigate = useNavigate()
  const { parcelId } = useParams();

  const AxiosSecure = useAxiosSecure();

  // -----------------Get the parcel Information--------------------
  const { data: parcelInfo = {}, isLoading } = useQuery({
    queryKey: [
      "parcels", parcelId
    ],
    queryFn: async () => {
      const res = await AxiosSecure.get(`/parcels/${parcelId}`);
      return res;
    }
  })
  if (isLoading) {
    return "Loading........................"
  }
  const amount = parcelInfo.data.delivery_cost;
  const amountInCent = amount * 100;

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');


    if (!stripe || !elements) return;

    const card = elements.getElement(CardElement);
    if (!card) return;

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card,
    });

    if (error) {
      setError(error.message);
      console.log(error.message)
    } else {
      console.log('[PaymentMethod]', paymentMethod);
      setError(" ");
    }
    // -------------------- Payemnt Intent ----------------------
    const res = await AxiosSecure.post("/create-payment-intent", {
      amountInCent,
      parcelId
    });

    console.log(res.data.clientSecret);

    const clientSecret = res.data.clientSecret;
    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
      },
    });

    if (result.error) {
      setError(result.error.message)
    }
    else {
      setError(" ");
      // ------------------- Save Payment History -------------------
      const paymentInfo = {
        email: parcelInfo.data.user_email,
        parcelId,
        amount,
        transactionId: result.paymentIntent.id,
        paymentStatus: result.paymentIntent.status,
        paymentMethod: result.paymentIntent.payment_method_types[0],
      };
      await AxiosSecure.post("/payments", paymentInfo);
      // ------------------- Sweet Alert -------------------
      Swal.fire({
        icon: 'success',
        title: 'Payment Successful!',
        text: `Transaction ID: ${result.paymentIntent.id}`,
        confirmButtonText: 'OK'
      }).then(() => {
        navigate("/dashboard/paymentHistory"); 
      });
    }





  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white shadow-2xl rounded-2xl p-8 border border-gray-100">
      <h2 className="text-2xl font-bold text-gray-900 text-center mb-6">
        Secure Payment
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Stripe Card Element */}
        <div className="p-4 border rounded-lg bg-gray-50 focus-within:ring-2 focus-within:ring-[#CAEB66] transition duration-300">
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: '16px',
                  color: '#000000',
                  '::placeholder': { color: '#a0aec0' },
                },
                invalid: { color: '#fa755a' },
              },
            }}
          />
        </div>

        {/* Error Message */}
        {error && (
          <div className="text-red-600 text-sm bg-red-50 p-2 rounded-md">
            {error}
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={!stripe}
          className='w-full py-3 font-semibold rounded-lg transition duration-300
            bg-[#CAEB66] hover:bg-[#b4d95a] text-black'
        >
          Pay ${amount}
        </button>
      </form>


    </div>
  );
}
