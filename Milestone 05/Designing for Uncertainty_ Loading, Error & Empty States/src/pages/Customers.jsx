import React from 'react';
import { useCustomers } from '../hooks/useCustomers';
import CustomerRow from '../components/CustomerRow';
import {
  SkeletonCard,
  ErrorMessage,
  EmptyState,
} from "../components/states";

const Customers = () => {
    // Added refetch to the hook destructuring to match the actions required by the guards
    const { data: customers, isLoading, error, refetch } = useCustomers();

    if (isLoading) {
      return <SkeletonCard count={5} />;
    }

    if (error) {
      return (
        <ErrorMessage
          message="We couldn't load your customers. Please refresh the page."
          onRetry={refetch}
        />
      );
    }

    if (!customers || customers.length === 0) {
      return (
        <EmptyState
          title="No customers found"
          message="Customers will appear here after registration."
          actionLabel="Refresh"
          onAction={refetch}
        />
      );
    }

    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold text-gray-800 mb-6 tracking-tight">Customer Management</h1>
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <table className="min-w-full divide-y divide-gray-100">
                    <thead className="bg-gray-50 capitalize">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Customer</th>
                            <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Order History</th>
                            <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Total Value</th>
                            <th className="px-6 py-3 text-right text-xs font-bold text-gray-500 uppercase tracking-wider">Details</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-100">
                        {customers.map(customer => (
                            <CustomerRow key={customer.id} customer={customer} />
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Customers;
