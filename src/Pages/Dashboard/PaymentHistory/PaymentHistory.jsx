import React from 'react';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../Shared/Loading';

export default function PaymentHistory() {
    const { user } = useAuth();
    const AxiosSecure = useAxiosSecure();

    const { data: paymentInfo = [], isLoading } = useQuery({
        queryKey: ["payments", user.email],
        queryFn: async () => {
            const res = await AxiosSecure.get(`/payments?email=${user.email}`);
            return res.data; // get only the array
        }
    });
    console.log(paymentInfo)

    if (isLoading) return <Loading></Loading>;

    return (
        <div className="max-w-5xl mx-auto mt-10 p-4">
            <h2 className="text-2xl font-bold mb-6">Payment History</h2>
            <div className="overflow-x-auto">
                <table className="min-w-full border border-gray-200">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="px-4 py-2 border">Amount ($)</th>
                            <th className="px-4 py-2 border">Date</th>
                            <th className="px-4 py-2 border">Status</th>
                            <th className="px-4 py-2 border">Payment Method</th>
                            <th className="px-4 py-2 border">Transaction ID</th>
                        </tr>
                    </thead>
                    <tbody>
                        {paymentInfo.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="text-center py-4">No payments found</td>
                            </tr>
                        ) : (
                            paymentInfo.map((payment) => (
                                <tr key={payment._id} className="text-center">
                                    <td className="px-4 py-2 border">{payment.amount}</td>
                                    <td className="px-4 py-2 border">
                                        {new Date(payment.date).toLocaleString()}
                                    </td>
                                    <td className="px-4 py-2 border">{payment.payment_status}</td>
                                    <td className="px-4 py-2 border">{payment.paymentMethod}</td>
                                    <td className="px-4 py-2 border">{payment.transactionId}</td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
