import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../../src/components/ui/card';
import { Button } from '../../src/components/ui/button';
import { CreditCard, CheckCircle, Clock, XCircle, Loader2 } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { getEmis } from '../../../Redux_store/api/EmisApiStore';

const Students = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data, loading, error } = useSelector((state) => state.emis);

  // Calculate grand total
  const grandTotal =
    (data.summary.totalMissedFees || 0) +
    (data.summary.totalCollectedFees || 0) +
    (data.summary.totalUpcomingFees || 0);

  // Fetch EMI data for all filters
  useEffect(() => {
    // Fetch data for missed, paid, and upcoming to populate summary
    ['missed', 'paid', 'upcoming'].forEach((filter) => {
      dispatch(getEmis({ filter, month: 3, year: 2025 })); // Adjust month/year as needed
    });
  }, [dispatch]);

  const cardData = [
    {
      title: 'Received',
      value: data.summary.totalCollectedFees || 0,
      color: 'text-green-600',
      icon: <CheckCircle className="w-6 h-6 text-green-600" />,
      link: '/student-payment-history/paid', // Aligned with StudentHeader
    },
    {
      title: 'Upcoming',
      value: data.summary.totalUpcomingFees || 0,
      color: 'text-yellow-600',
      icon: <Clock className="w-6 h-6 text-yellow-600" />,
      link: '/student-payment-history/upcoming',
    },
    {
      title: 'Missed',
      value: data.summary.totalMissedFees || 0,
      color: 'text-red-600',
      icon: <XCircle className="w-6 h-6 text-red-600" />,
      link: '/student-payment-history/missed',
    },
  ];

  return (
    <div className="flex flex-col items-center min-h-screen p-4 space-y-6">
      {/* Total Amount Card (Upper) */}
      <div className="w-full">
        <Card className="w-full p-4 shadow-lg rounded-2xl bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700">
          <CardHeader className="flex items-center justify-between">
            <CardTitle className="text-xl font-bold text-center">Total Amount</CardTitle>
            <CreditCard className="w-8 h-8 text-blue-600" />
          </CardHeader>
          <CardContent className="flex items-center justify-center">
            {loading ? (
              <Loader2 className="animate-spin w-8 h-8 text-blue-600" />
            ) : error ? (
              <span className="text-red-500">Error: {error}</span>
            ) : (
              <span className="text-3xl font-bold text-blue-600">
                ₹ {grandTotal.toLocaleString()}
              </span>
            )}
          </CardContent>
          <CardFooter className="flex justify-center">
            <CardDescription className="text-gray-700 font-bold dark:text-gray-500">
              Updated Amount
            </CardDescription>
          </CardFooter>
        </Card>
      </div>

      {/* 3 Cards Below in a Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-8xl">
        {cardData.map((card, index) => (
          <div key={index} className="w-full">
            <Card className="w-full p-4 shadow-lg rounded-2xl bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700">
              <CardHeader className="flex items-center justify-between">
                <CardTitle className="text-xl font-bold text-center">{card.title}</CardTitle>
                {card.icon}
              </CardHeader>
              <CardContent className="flex items-center justify-center">
                {loading ? (
                  <Loader2 className="animate-spin w-8 h-8" style={{ color: card.color }} />
                ) : error ? (
                  <span className="text-red-500">Error: {error}</span>
                ) : (
                  <span className={`text-3xl font-bold ${card.color}`}>
                    ₹ {card.value.toLocaleString()}
                  </span>
                )}
              </CardContent>
              <CardFooter className="flex flex-col items-center space-y-2">
                <CardDescription className="text-gray-700 font-bold dark:text-gray-500">
                  Updated Amount
                </CardDescription>
                <Button
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md transition"
                  onClick={() => navigate("/Missed")}
                  disabled={loading}
                >
                  More Details
                </Button>
              </CardFooter>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Students;