import React, { useState } from 'react';
import { Disclosure } from '@headlessui/react';
import Header from '../Dashboard/Header';
import { zodResolver } from '@hookform/resolvers/zod';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../../src/components/ui/card';
import { Input } from '../../src/components/ui/input';
import { Eye, EyeOff, Mail, User, Phone, MapPin } from "lucide-react";
import { useForm } from "react-hook-form";
import z from 'zod'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../src/components/ui/form";
import Update from './Update';
import View_profile from './View_profile';
import { SidebarInset, SidebarProvider, SidebarTrigger } from '../../src/components/ui/sidebar';
import AppSidebar from '../../src/components/ui/app-sidebar';
import { Separator } from '@radix-ui/react-dropdown-menu';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '../../src/components/ui/breadcrumb';
import { Button } from '../../src/components/ui/Button';

const FormSchema = z.object({
  password: z.string().min(6, 'Password must be at least 6 characters long'),
  confirmPassword: z.string().min(6, 'Password must be at least 6 characters long'),
});
const Settings = () => {
  const [tab, setTab] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword1, setShowPassword1] = useState(false);

  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      Email: "",
      password: "",
      confirmPassword: "",
      terms: false,
    },
  });
  const onSubmit = (data, event) => {
    event.preventDefault(); // Prevent page refresh
    console.log('Form data:', data);
  };

  return (

    <SidebarProvider style={{ "--sidebar-width": "15rem" }}>
      {/* Pass setActivePage to Sidebar */}
      <AppSidebar />
      <SidebarInset>
        <Header />

        {/* Main Content Section */}
        <main className="flex-1 overflow-auto">
        <div className="flex flex-1 flex-col gap-4   pt-0">
          <div className="grid  shadow-md shadow-blue-300/30">
            <Disclosure as="nav" className=" shadow">
              <div className=" px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center w-full">
                  <div className="md:flex md:space-x-4">
                    <button
                      onClick={() => setTab(1)}
                      className={`rounded-md px-3 py-2 text-sm font-medium ${tab === 1 ? 'bg-blue-600 text-white' : 'text-gray-500 hover:bg-blue-500 hover:text-white'}`}
                    >
                      View Profile
                    </button>
                    <button
                      onClick={() => setTab(2)}
                      className={`rounded-md px-3 py-2 text-sm font-medium ${tab === 2 ? 'bg-blue-600 text-white' : 'text-gray-500 hover:bg-blue-500 hover:text-white'}`}
                    >
                      Change Password
                    </button>
                    <button
                      onClick={() => setTab(3)}
                      className={`rounded-md px-2 py-2 text-sm font-medium ${tab === 3 ? 'bg-blue-600 text-white' : 'text-gray-500 hover:bg-blue-500 hover:text-white'}`}
                    >
                      Upadte Profile
                    </button>
                  </div>
                </div>
              </div>
            </Disclosure>

          </div>
          <div className="min-h-[100vh] flex-1 rounded-xl md:min-h-min">
            {tab === 1 && (
              <div className="pt-6">
                <View_profile />
              </div>
            )}

            {tab === 2 && (
              <div className="pt-6 flex justify-center">
                <Card className="w-full sm:max-w-md md:max-w-lg border shadow-xl p-4 sm:p-6">
                  <CardHeader className="text-center">
                    <CardTitle className="text-2xl font-bold text-gray-600">Change Your Password</CardTitle>
                    <CardDescription className="text-sm sm:text-base">
                      Enter a new password below to update your <br /> credentials.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Form {...form}>
                      <form onSubmit={form.handleSubmit(onSubmit)}>
                        {/* New Password Field */}
                        <FormField
                          control={form.control}
                          name="password"
                          render={({ field }) => (
                          <FormItem>
                              <FormLabel className="text-gray-700 font-semibold text-lg">New Password</FormLabel>
                              <FormControl>
                                <div className="relative flex items-center">
                                  <Input
                                    className="w-full border border-blue-300 rounded-xl p-4 sm:p-5 pr-10 focus:ring-4 focus:ring-blue-500 shadow-lg"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Enter New Password"
                                    {...field}
                                    required
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
                                    className="w-full border border-blue-300 rounded-xl p-4 sm:p-5 pr-10 focus:ring-4 focus:ring-blue-500 shadow-lg"
                                    type={showPassword1 ? "text" : "password"}
                                    placeholder="Confirm Password"
                                    {...field}
                                    required
                                  />
                                  <span
                                    className="absolute right-3 text-gray-500 cursor-pointer"
                                    onClick={() => setShowPassword1(!showPassword1)}
                                  >
                                    {showPassword1 ? <Eye size={21} /> : <EyeOff size={21} />}
                                  </span>
                                </div>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        {/* Submit Button */}
                        <CardFooter className="flex justify-center mt-5">
                          <Button type="submit" className="w-full sm:w-[300px] bg-blue-500 shadow-lg hover:bg-blue-700">
                            CHANGE PASSWORD
                          </Button>
                        </CardFooter>
                      </form>
                    </Form>
                  </CardContent>
                </Card>
              </div>

            )}
            {tab === 3 && (

              <Update />
            )}
          </div>

        </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}

export default Settings;
