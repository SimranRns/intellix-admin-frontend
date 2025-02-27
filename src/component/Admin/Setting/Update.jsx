import React from 'react';
import { useForm } from "react-hook-form";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../../src/components/ui/card';
import { Input } from '../../src/components/ui/input';
import { Button } from '../../src/components/ui/button';
import { Mail, User, Phone, MapPin } from "lucide-react";
import {
    Form,
    FormControl,
    FormField,  
    FormItem,
    FormLabel,
    FormMessage,
} from "../../src/components/ui/form";

const Update = () => {
    const form = useForm(); 

    const onSubmit = (data) => {
        console.log("Form Data:", data);
    };

    return (
        <div className="p-6 flex justify-center items-center">
            <Card className="w-full max-w-4xl border shadow-xl p-6">
                <CardHeader className="text-center">
                    <CardTitle className="text-2xl font-bold text-gray-600">Update Your Profile</CardTitle>
                    <CardDescription className="text-sm">Enter your details below to update your profile.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                            {/* First Row - Name & Email */}
                            <div className="flex gap-6">
                                <FormField control={form.control} name="name" render={({ field }) => (
                                    <FormItem className="w-1/2">
                                        <FormLabel className="block text-gray-700 font-semibold text-lg">Name</FormLabel>
                                        <FormControl>
                                            <div className="relative flex items-center">
                                                <Input className="w-full border-blue-300 rounded-xl pl-12 p-3 focus:ring-4 focus:ring-blue-500 shadow-lg" placeholder="Enter Your Name" type="text" {...field} />
                                                <span className="absolute right-4 text-gray-500">
                                                    <User size={21} />
                                                </span>
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )} />

                                <FormField control={form.control} name="email" render={({ field }) => (
                                    <FormItem className="w-1/2">
                                        <FormLabel className="block text-gray-700 font-semibold text-lg">Email</FormLabel>
                                        <FormControl>
                                            <div className="relative flex items-center">
                                                <Input className="w-full border-blue-300 rounded-xl pl-12 p-3 focus:ring-4 focus:ring-blue-500 shadow-lg" placeholder="Enter Your Email" type="email" {...field} />
                                                <span className="absolute right-4 text-gray-500">
                                                    <Mail size={21} />
                                                </span>
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )} />
                            </div>

                            {/* Second Row - Phone & City */}
                            <div className="flex gap-6">
                                <FormField control={form.control} name="phone" render={({ field }) => (
                                    <FormItem className="w-1/2">
                                        <FormLabel className="block text-gray-700 font-semibold text-lg">Phone Number</FormLabel>
                                        <FormControl>
                                            <div className="relative flex items-center">
                                                <Input className="w-full border-blue-300 rounded-xl pl-12 p-3 focus:ring-4 focus:ring-blue-500 shadow-lg" placeholder="Enter Your Phone Number" type="tel" {...field} />
                                                <span className="absolute right-4 text-gray-500">
                                                    <Phone size={21} />
                                                </span>
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )} />

                                <FormField control={form.control} name="city" render={({ field }) => (
                                    <FormItem className="w-1/2">
                                        <FormLabel className="block text-gray-700 font-semibold text-lg">City</FormLabel>
                                        <FormControl>
                                            <div className="relative flex items-center">
                                                <Input className="w-full border-blue-300 rounded-xl pl-12 p-3 focus:ring-4 focus:ring-blue-500 shadow-lg" placeholder="Enter Your City" type="text" {...field} />
                                                <span className="absolute right-4 text-gray-500">
                                                    <MapPin size={21} />
                                                </span>
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )} />
                            </div>

                            {/* Third Row - State & Pincode */}
                            <div className="flex gap-6">
                                <FormField control={form.control} name="state" render={({ field }) => (
                                    <FormItem className="w-1/2">
                                        <FormLabel className="block text-gray-700 font-semibold text-lg">State</FormLabel>
                                        <FormControl>
                                            <div className="relative flex items-center">
                                                <Input className="w-full border-blue-300 rounded-xl pl-12 p-3 focus:ring-4 focus:ring-blue-500 shadow-lg" placeholder="Enter Your State" type="text" {...field} />
                                                <span className="absolute right-4 text-gray-500">
                                                    <MapPin size={21} />
                                                </span>
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )} />

                                <FormField control={form.control} name="pincode" render={({ field }) => (
                                    <FormItem className="w-1/2">
                                        <FormLabel className="block text-gray-700 font-semibold text-lg">Pincode</FormLabel>
                                        <FormControl>
                                            <div className="relative flex items-center">
                                                <Input className="w-full border-blue-300 rounded-xl pl-12 p-3 focus:ring-4 focus:ring-blue-500 shadow-lg" placeholder="Enter Your Pincode" type="text" {...field} />
                                                <span className="absolute right-4 text-gray-500">
                                                    <MapPin size={21} />
                                                </span>
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )} />
                            </div>

                            <CardFooter className="flex justify-center mt-5">
                                <Button type="submit" className="w-[300px] mt-8 bg-blue-500 shadow-lg hover:bg-blue-700">
                                    Update
                                </Button>
                            </CardFooter>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    );
};

export default Update;
