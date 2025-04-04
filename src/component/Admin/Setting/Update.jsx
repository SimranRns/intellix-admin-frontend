import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { Dialog, DialogContent, DialogFooter } from '../../src/components/ui/dialog';
import ThankYouCard from '../Dashboard/ThankYouCard';

// ✅ Define Zod Validation Schema
const formSchema = z.object({
    name: z.string().min(2, { message: "Name must be at least 2 characters." }),
    email: z.string().email({ message: "Enter a valid email address." }),
    phone: z.string().min(10, { message: "Phone number must be at least 10 digits." }),
    city: z.string().min(2, { message: "City name must be at least 2 characters." }),
    state: z.string().min(2, { message: "State name must be at least 2 characters." }),
    pincode: z.string().min(6, { message: "Pincode must be at least 6 digits." }),
});

const Update = () => {
    const [AddConfrom, setAddConfrom] = useState(false)
    
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            phone: "",
            city: "",
            state: "",
            pincode: "",
        },
    });
    const handleConfirm = async () => {
        try {
          await new Promise((resolve) => setTimeout(resolve, 500));
    
          console.log("Data Submitted Successfully!");
    
          setAddConfrom(false);
        } catch (error) {
          console.error("Submission failed:", error);
        }
      };
    const onSubmit = (data) => {
        console.log("Form Data:", data);
    
        // Reset the form fields
        form.reset();
    
        // Open the confirmation dialog
        setAddConfrom(true);
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
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <FormField control={form.control} name="name" render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="block text-gray-700 font-semibold text-lg">Name</FormLabel>
                                        <FormControl>
                                            <div className="relative flex items-center">
                                                <Input className="w-full border-blue-300 rounded-xl pl-12 p-5 focus:ring-4 focus:ring-blue-500 shadow-lg" placeholder="Enter Your Name" type="text" {...field} />
                                                <span className="absolute right-4 text-gray-500">
                                                    <User size={21} />
                                                </span>
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )} />

                                <FormField control={form.control} name="email" render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="block text-gray-700 font-semibold text-lg">Email</FormLabel>
                                        <FormControl>
                                            <div className="relative flex items-center">
                                                <Input className="w-full border-blue-300 rounded-xl pl-12 p-5 focus:ring-4 focus:ring-blue-500 shadow-lg" placeholder="Enter Your Email" type="email" {...field} />
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
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <FormField control={form.control} name="phone" render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="block text-gray-700 font-semibold text-lg">Phone Number</FormLabel>
                                        <FormControl>
                                            <div className="relative flex items-center">
                                                <Input className="w-full border-blue-300 rounded-xl pl-12 p-5 focus:ring-4 focus:ring-blue-500 shadow-lg" placeholder="Enter Your Phone Number" type="tel" {...field} />
                                                <span className="absolute right-4 text-gray-500">
                                                    <Phone size={21} />
                                                </span>
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )} />

                                <FormField control={form.control} name="city" render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="block text-gray-700 font-semibold text-lg">City</FormLabel>
                                        <FormControl>
                                            <div className="relative flex items-center">
                                                <Input className="w-full border-blue-300 rounded-xl pl-12 p-5 focus:ring-4 focus:ring-blue-500 shadow-lg" placeholder="Enter Your City" type="text" {...field} />
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
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <FormField control={form.control} name="state" render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="block text-gray-700 font-semibold text-lg">State</FormLabel>
                                        <FormControl>
                                            <div className="relative flex items-center">
                                                <Input className="w-full border-blue-300 rounded-xl pl-12 p-5 focus:ring-4 focus:ring-blue-500 shadow-lg" placeholder="Enter Your State" type="text" {...field} />
                                                <span className="absolute right-4 text-gray-500">
                                                    <MapPin size={21} />
                                                </span>
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )} />

                                <FormField control={form.control} name="pincode" render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="block text-gray-700 font-semibold text-lg">Pincode</FormLabel>
                                        <FormControl>
                                            <div className="relative flex items-center">
                                                <Input className="w-full border-blue-300 rounded-xl pl-12 p-5 focus:ring-4 focus:ring-blue-500 shadow-lg" placeholder="Enter Your Pincode" type="text" {...field} />
                                                <span className="absolute right-4 text-gray-500">
                                                    <MapPin size={21} />
                                                </span>
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )} />
                            </div>

                            {/* Submit Button */}
                            <CardFooter className="flex justify-center mt-5">
                                <Button type="submit" className="w-full md:w-[300px] mt-8 bg-blue-500 shadow-lg hover:bg-blue-700">
                                    Update
                                </Button>
                            </CardFooter>
                        </form>
                    </Form>
                </CardContent>
            </Card>


            <Dialog open={AddConfrom} onOpenChange={setAddConfrom}>
          <DialogContent
            onPointerDownOutside={(e) => e.preventDefault()}
            onEscapeKeyDown={(e) => e.preventDefault()}
            className="w-full max-w-[90vw] sm:max-w-[400px] p-6 rounded-lg">
            <ThankYouCard />
            {/* Dialog Footer */}
            <DialogFooter className="flex justify-end gap-3">
              <Button
                onClick={() => setAddConfrom(false)}
                variant="outline"
                className="w-full sm:w-auto mt-4 bg-white hover:bg-gray-200 px-5 py-2 rounded-md flex items-center  transition-all"
              >
                Cancel
              </Button>
              <Button
                onClick={handleConfirm} // Handle form submission & dialog close
                className="w-full sm:w-auto mt-4 bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-md flex items-center shadow-md transition-all"
              >
                Confirm
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        </div>
    );
};

export default Update;