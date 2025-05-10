import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch } from 'react-redux';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../../src/components/ui/card';
import { Input } from '../../src/components/ui/input';
import { Button } from '../../src/components/ui/button';
import { Mail, User, Phone, Eye, EyeOff } from "lucide-react"; // Icons for show/hide
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
import { Update_Admin } from '../../../Redux_store/Api/adminProfile'; // Assuming the action is correctly imported

// Define Zod Validation Schema
const formSchema = z.object({
    full_name: z.string().min(2, { message: "Name must be at least 2 characters." }),
    email: z.string().email({ message: "Enter a valid email address." }),
    m_number: z.string().min(10, { message: "Phone number must be at least 10 digits." }), // Phone should be string
    password: z.string().min(6, { message: "Password must be at least 6 characters." }).nonempty({ message: "Password is required." }),
});

const Update = () => {
    const [AddConfrom, setAddConfrom] = useState(false);
    const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            full_name: "",
            email: "",
            m_number: "",
            password: "",
        },
    });

    const dispatch = useDispatch(); // Initialize the dispatch hook

    const onSubmit = async (data) => {
        // Ensure phone number is a string and valid
        let phone = data.m_number.toString().trim();

        if (phone.length < 10) {
            console.error("Phone number is invalid");
            return;
        }

        // Check if password is provided and valid
        if (!data.password || data.password.length < 6) {
            console.error("Password is required and must be at least 6 characters.");
            return;
        }

        // Prepare data for API request
        const updatedData = {
            id: "9",  // Assuming the ID is static for now, but it can be dynamic if needed
            data: {
                full_name: data.full_name,
                email: data.email,
                password: data.password,
                m_number: phone,
            }
        };

        // Dispatch the update action with the updated data
        try {
            await dispatch(Update_Admin(updatedData)); // Dispatch updated data
            console.log("Data updated successfully!");

            // Open confirmation dialog
            setAddConfrom(true);

            // Reset form fields after successful submission
            form.reset();
        } catch (error) {
            console.error("Error updating admin:", error); // Improved error handling
        }
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
                                <FormField control={form.control} name="full_name" render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="block text-gray-700 font-semibold text-lg">Name</FormLabel>
                                        <FormControl>
                                            <div className="relative flex items-center overflow-hidden">
                                                <Input
                                                    className="w-full border-blue-300 rounded-xl pl-12 p-5 focus:ring-4 focus:ring-blue-500 shadow-lg"
                                                    placeholder="Enter Your Name"
                                                    type="text"
                                                    {...field}
                                                />
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
                                            <div className="relative flex items-center overflow-hidden">
                                                <Input
                                                    className="w-full border-blue-300 rounded-xl pl-12 p-5 focus:ring-4 focus:ring-blue-500 shadow-lg"
                                                    placeholder="Enter Your Email"
                                                    type="email"
                                                    {...field}
                                                />
                                                <span className="absolute right-4 text-gray-500">
                                                    <Mail size={21} />
                                                </span>
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )} />

                                <FormField control={form.control} name="m_number" render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="block text-gray-700 font-semibold text-lg">Phone Number</FormLabel>
                                        <FormControl>
                                            <div className="relative flex items-center overflow-hidden">
                                                <Input
                                                    className="w-full border-blue-300 rounded-xl pl-12 p-5 focus:ring-4 focus:ring-blue-500 shadow-lg"
                                                    placeholder="Enter Your Phone Number"
                                                    type="tel"
                                                    {...field}
                                                />
                                                <span className="absolute right-4 text-gray-500">
                                                    <Phone size={21} />
                                                </span>
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )} />

                                <FormField control={form.control} name="password" render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="block text-gray-700 font-semibold text-lg">Password</FormLabel>
                                        <FormControl>
                                            <div className="relative flex items-center overflow-hidden">
                                                <Input
                                                    className="w-full border-blue-300 rounded-xl pl-12 p-5 focus:ring-4 focus:ring-blue-500 shadow-lg"
                                                    placeholder="Enter Your Password"
                                                    type={showPassword ? "text" : "password"}
                                                    {...field}
                                                />
                                                <span
                                                    className="absolute right-4 cursor-pointer text-gray-500"
                                                    onClick={() => setShowPassword((prev) => !prev)}
                                                >
                                                    {showPassword ? <Eye size={21} /> : <EyeOff size={21} />}
                                                </span>
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )} />

                            </div>


                            <CardFooter className="flex justify-center mt-5">
                                <Button
                                    type="submit"
                                    className="w-full md:w-[300px] mt-8 bg-blue-500 shadow-lg hover:bg-blue-700"
                                    disabled={!form.formState.isValid}  // Disable button if form is invalid
                                >   
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
                    <DialogFooter className="flex justify-end gap-3">
                        <Button
                            onClick={() => setAddConfrom(false)}
                            variant="outline"
                            className="w-full sm:w-auto text-black mt-4 bg-gray-100 hover:text-black hover:bg-gray-200 px-5 py-2 rounded-md flex items-center  transition-all"
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={() => setAddConfrom(false)}
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
