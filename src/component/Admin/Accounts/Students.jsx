import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Use useNavigate instead of useRouter
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../src/components/ui/card";
import { Button } from "../../src/components/ui/button";
import { CreditCard, CheckCircle, Clock, XCircle } from "lucide-react";

const Students = () => {
  const navigate = useNavigate(); // Use navigate for routing

  const [amounts, setAmounts] = useState({
    total: 0,
    received: 0,
    upcoming: 0,
    missed: 0
  });

  useEffect(() => {
    const finalValues = {
      total: 5000,
      received: 3000,
      upcoming: 1500,
      missed: 500
    };

    const duration = 2000;

    Object.keys(finalValues).forEach((key) => {
      let start = 0;
      const end = finalValues[key];
      const stepTime = Math.abs(Math.floor(duration / (end - start)));

      const timer = setInterval(() => {
        start += 50;
        if (start >= end) {
          start = end;
          clearInterval(timer);
        }
        setAmounts((prev) => ({ ...prev, [key]: start }));
      }, stepTime);

      return () => clearInterval(timer);
    });
  }, []);

  const cardData = [
    { title: "Received", value: amounts.received, color: "text-green-600", icon: <CheckCircle className="w-6 h-6 text-green-600" />, link: "/received" },
    { title: "Upcoming", value: amounts.upcoming, color: "text-yellow-600", icon: <Clock className="w-6 h-6 text-yellow-600" />, link: "/upcoming" },
    { title: "Missed", value: amounts.missed, color: "text-red-600", icon: <XCircle className="w-6 h-6 text-red-600" />, link: "/missed" }
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
            <span className="text-3xl font-bold text-blue-600">
              ₹ {amounts.total.toLocaleString()}
            </span>
          </CardContent>
          <CardFooter className="flex justify-center">
            <CardDescription className="text-gray-700 font-bold dark:text-gray-500">Updated Amount</CardDescription>
          </CardFooter>
        </Card>
      </div>

      {/* 3 Cards Below in a Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-8xl">
        {cardData.map((card, index) => (
          <div key={index} className="w-full">
            <Card className="w-full p-4 shadow-lg rounded-2xl bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700">
              <CardHeader className="flex items-center justify-between">
                <CardTitle className="text-xl font-bold text-center">{card.title}</CardTitle>
                {card.icon}
              </CardHeader>
              <CardContent className="flex items-center justify-center">
                <span className={`text-3xl font-bold ${card.color}`}>
                  ₹ {card.value.toLocaleString()}
                </span>
              </CardContent>
              <CardFooter className="flex flex-col items-center space-y-2">
                <CardDescription className="text-gray-700 font-bold dark:text-gray-500">Updated Amount</CardDescription>
                <Button 
                  className="w-full  bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md transition"
                  onClick={() => navigate(card.link)} // Navigate to the respective page
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
