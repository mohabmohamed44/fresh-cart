import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Package, DollarSign, Calendar, RefreshCw } from 'lucide-react';

export default function AllOrders() {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  async function getUserOrders() {
    const token = localStorage.getItem('token');
    if (token) {
      return await axios.get(`https://ecommerce.routemisr.com/api/v1/orders`, {
        headers: {
          token,
        }
      })
      .then((res) => {
        console.log('Orders response:', res.data);
        const ordersData = res.data.data || res.data || [];
        setOrders(ordersData);
        setIsLoading(false);
        toast.success(`Found ${ordersData.length} orders`);
      })
      .catch((err) => {
        console.error('Full error details:', err);
        setError(err);
        setIsLoading(false);
        if (err.response) {
          toast.error(err.response.data.message || 'Failed to fetch orders');
          console.log('Response data:', err.response.data);
          console.log('Response status:', err.response.status);
        } else if (err.request) {
          toast.error('No response from server. Check your connection.');
        } else {
          toast.error(err.message || 'An unexpected error occurred');
        }
      });
    } else {
      setIsLoading(false);
      toast.error('Authentication token not found');
    }
  }

  useEffect(() => {
    getUserOrders();
  }, []);

  // Loading State
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <Package className="animate-bounce text-green-500" size={64} />
          </div>
          <p className="text-xl text-gray-600">Loading your orders...</p>
        </div>
      </div>
    );
  }

  // Error State
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
        <div className="bg-white shadow-lg rounded-lg p-8 text-center">
          <Package className="mx-auto mb-4 text-red-500" size={48} />
          <h2 className="text-2xl font-bold text-red-600 mb-4">
            Error Fetching Orders
          </h2>
          <p className="text-gray-600 mb-4">
            {error.message || 'Unable to retrieve your orders'}
          </p>
          <button
            onClick={getUserOrders}
            className="bg-green-500 text-white px-4 py-2 rounded-lg 
            hover:bg-green-600 transition flex items-center justify-center mx-auto"
          >
            <RefreshCw className="mr-2" size={16} />
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white shadow-xl rounded-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-green-500 text-white p-6 flex justify-between items-center">
            <div className="flex items-center">
              <Package className="mr-4" size={40} />
              <h1 className="text-3xl font-bold">My Orders</h1>
            </div>
          </div>

          {/* Orders Table or Empty State */}
          {!orders || orders.length === 0 ? (
            <div className="text-center py-12">
              <Package className="mx-auto mb-4 text-gray-400" size={48} />
              <p className="text-xl text-gray-600">
                You haven't placed any orders yet
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Products
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Payment Method
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <DollarSign className="inline mr-2" size={16} />
                      Order Price
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Shipping Details
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {orders.map((order, index) => (
                    <tr 
                      key={index} 
                      className="hover:bg-gray-50 transition"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        {order?.cartItems?.map((product) => (
                          <div key={product._id} className='flex items-center mb-2'>
                            <img 
                              src={product.product.imageCover} 
                              alt={product.product.title} 
                              className="w-16 h-16 object-cover mr-4" 
                            />
                            <p className="font-semibold">{product.product.title}</p>
                          </div>
                        ))}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {order?.paymentMethodType || 'N/A'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600 font-semibold">
                        {order?.totalOrderPrice || 0} EGP
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        Delivering to <span className="text-green-600">
                          {order?.shippingAddress?.city || 'Unknown City'}
                        </span>
                        <br />
                        Phone: <span className="text-green-600">
                          {order?.shippingAddress?.phone || 'Not Provided'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}