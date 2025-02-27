import React, { useState } from 'react';
import Sidebar from '../Dashboard/Sidebar'
import { Disclosure } from '@headlessui/react';
import Header from '../Dashboard/Header';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../../src/components/ui/card';
import { Input } from '../../src/components/ui/input';
import { Button } from '../../src/components/ui/button';
import { Eye, EyeOff } from "lucide-react";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../src/components/ui/form";

const Settings = () => {
  const [tab, setTab] = useState(1);
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm({
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="hidden md:block overflow-y-auto scrollbar-hide">
        <Sidebar />
      </div>

      <div className="flex flex-col flex-1">
        <Header />
        <Disclosure as="nav" className="bg-white shadow">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16 items-center w-full">
              <div className="md:flex md:space-x-4">
                <button
                  onClick={() => setTab(1)}
                  className={`rounded-md px-3 py-2 text-sm font-medium ${tab === 1 ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-blue-500 hover:text-white'}`}
                >
                  View Profile
                </button>
                <button
                  onClick={() => setTab(2)}
                  className={`rounded-md px-3 py-2 text-sm font-medium ${tab === 2 ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-blue-500 hover:text-white'}`}
                >
                  Change Password
                </button>
              </div>
            </div>
          </div>
        </Disclosure>

        {tab === 1 && (
          <div className="p-6">
            <h1 className="text-2xl font-semibold text-gray-800">Profile Page</h1>
            <p className="text-gray-600 mt-2">Customize your preferences here.</p>
          </div>
        )}

        {tab === 2 && (
          <div className="p-6 flex justify-center items-center">
            <Card className="w-full max-w-lg border shadow-xl p-6">
              <CardHeader className="text-center">
                <CardTitle  className="cardTitle">Change Your Password</CardTitle>
                <CardDescription className='text-2sm'>Enter a new password below to update your <br></br> credentials.</CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form>
                    {/* Password Field */}
                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-700 font-semibold text-lg">New Password</FormLabel>
                          <FormControl>
                            <div className="relative flex items-center">
                              <Input
                                className="w-full border border-blue-500 rounded-xl p-5 pr-10 focus:ring-4 focus:ring-blue-500 shadow-lg"
                                type={showPassword ? "text" : "password"}
                                placeholder="Enter New Password"
                                {...field}
                              />
                              <span
                                className="absolute right-3 text-gray-500 cursor-pointer"
                                onClick={() => setShowPassword(!showPassword)}
                              >
                                {showPassword ? <Eye size={21} /> : <EyeOff size={21} />}
                              </span>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Confirm Password Field */}
                    <FormField
                      control={form.control}
                      name="confirmPassword"
                      render={({ field }) => (
                        <FormItem className="mt-4">
                          <FormLabel className="text-gray-700 font-semibold text-lg">Confirm Password</FormLabel>
                          <FormControl>
                            <div className="relative flex items-center">
                              <Input
                                className="w-full border border-blue-300 rounded-xl p-5 pr-10 focus:ring-4 focus:ring-blue-500 shadow-lg"
                                type={showPassword ? "text" : "password"}
                                placeholder="Confirm Password"
                                {...field}
                              />
                              <span
                                className="absolute right-3 text-gray-500 cursor-pointer"
                                onClick={() => setShowPassword(!showPassword)}
                              >
                                {showPassword ? <Eye size={21} /> : <EyeOff size={21} />}
                              </span>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <CardFooter className="flex justify-center mt-5">
                      <Button type="submit" className="w-[300px] bg-blue-500 shadow-lg hover:bg-blue-600">
                        CHANGE PASSWORD
                      </Button>
                    </CardFooter>
                  </form>
                </Form>
              </CardContent>

            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default Settings;
