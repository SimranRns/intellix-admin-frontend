import { Separator } from '@radix-ui/react-separator';
import AppSidebar from '../../../src/components/ui/app-sidebar';
import { SidebarInset, SidebarProvider } from '../../../src/components/ui/sidebar';
import React, { useEffect, useState } from 'react';
import Header from '../../Dashboard/Header';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../../../src/components/ui/tabs';
import { Button } from '@headlessui/react';
import { ArrowLeft } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { getEmis } from '../../../../Redux_store/Api/EmisApiStore';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../src/components/ui/select';

const Payment_History = () => {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.emis);
  const [activeTab, setActiveTab] = useState('missed');
  const [month, setMonth] = useState(3); // April
  const [year, setYear] = useState(2025);

  useEffect(() => {
    console.log('Dispatching getEmis:', { filter: activeTab, month, year });
    dispatch(getEmis({ filter: activeTab, month, year }));
  }, [activeTab, month, year, dispatch]);

  // Log Redux state for debugging
  console.log('Redux state:', { data, loading, error });

  const goback = () => {
    window.history.back();
  };

  const payments = {
    missed: data?.missed || [],
    upcoming: data?.upcoming || [],
    paid: data?.paid || [],
  };

  const months = [
    { value: 0, label: 'January' },
    { value: 1, label: 'February' },
    { value: 2, label: 'March' },
    { value: 3, label: 'April' },
    { value: 4, label: 'May' },
    { value: 5, label: 'June' },
    { value: 6, label: 'July' },
    { value: 7, label: 'August' },
    { value: 8, label: 'September' },
    { value: 9, label: 'October' },
    { value: 10, label: 'November' },
    { value: 11, label: 'December' },
  ];

  const years = [2023, 2024, 2025, 2026];

  const formatDate = (dateString) => {
    if (!dateString) return 'No Date';
    const date = new Date(dateString);
    return isNaN(date) ? 'Invalid Date' : date.toLocaleDateString();
  };

  return (
    <div className="min-h-screen flex">
      <SidebarProvider style={{ '--sidebar-width': '15rem' }}>
        <AppSidebar />
        <SidebarInset>
          <Header />
          <div className="p-6">
            <div className="flex gap-4 mb-4">
              <Select value={month.toString()} onValueChange={(value) => setMonth(parseInt(value))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Month" />
                </SelectTrigger>
                <SelectContent>
                  {months.map((m) => (
                    <SelectItem key={m.value} value={m.value.toString()}>
                      {m.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={year.toString()} onValueChange={(value) => setYear(parseInt(value))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Year" />
                </SelectTrigger>
                <SelectContent>
                  {years.map((y) => (
                    <SelectItem key={y} value={y.toString()}>
                      {y}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <div className="flex justify-between p-6">
                <Button
                  className="bg-blue-500 text-white rounded-lg flex items-center gap-2 py-2 px-6"
                  onClick={goback}
                >
                  <ArrowLeft />
                  Payment Details
                </Button>
                <TabsList className="h-12 bg-transparent">
                  <TabsTrigger value="missed" className="px-4 py-2 font-semibold">
                    Missed
                  </TabsTrigger>
                  <TabsTrigger value="upcoming" className="px-4 py-2 font-semibold">
                    Upcoming
                  </TabsTrigger>
                  <TabsTrigger value="paid" className="px-4 py-2 font-semibold">
                    Paid
                  </TabsTrigger>
                </TabsList>
              </div>

              {loading && <div className="p-6 text-center">Loading...</div>}
              {error && <div className="p-6 text-center text-red-500">Error: {error}</div>}

              {!loading && !error && (
                <TabsContent value={activeTab} className="p-6 mt-4 rounded-lg">
                  <table className="w-full border-collapse border border-gray-300">
                    <thead>
                      <tr>
                        <th className="p-3 border border-gray-300 text-center font-medium">ID</th>
                        <th className="p-3 border border-gray-300 text-center font-medium">Student ID</th>
                        <th className="p-3 border border-gray-300 text-center font-medium">Total Amount</th>
                        <th className="p-3 border border-gray-300 text-center font-medium">
                          {activeTab === 'missed' ? 'Missed' : activeTab === 'upcoming' ? 'Upcoming' : 'Paid'}
                        </th>
                        <th className="p-3 border border-gray-300 text-center font-medium">Due Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {payments[activeTab].length > 0 ? (
                        payments[activeTab].map((item) => (
                          <tr key={item.id}>
                            <td className="border border-gray-300 p-2 text-center">{item.id}</td>
                            <td className="border border-gray-300 p-2 text-center">{item.student_id}</td>
                            <td className="border border-gray-300 p-2 text-center">₹{item.amount}</td>
                            <td className="border border-gray-300 p-2 text-center">₹{item.amount}</td>
                            <td className="border border-gray-300 p-2 text-center">
                              {formatDate(item.emi_duedate)}
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="5" className="border border-gray-300 p-2 text-center">
                            No {activeTab} payments found
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </TabsContent>
              )}
            </Tabs>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
};

export default Payment_History;