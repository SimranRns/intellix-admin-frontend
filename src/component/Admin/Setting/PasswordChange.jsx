import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "../../src/components/ui/card";
import { Input } from "../../src/components/ui/input";
import { Button } from "../../src/components/ui/button";
import { Eye, EyeOff } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../src/components/ui/form";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "../../src/components/ui/dialog";
import ThankYouCard from "../Dashboard/ThankYouCard";

// ✅ Define Validation Schema with Zod
const formSchema = z
  .object({
    password: z.string().min(6, { message: "Password must be at least 6 characters." }),
    confirmPassword: z.string().min(6, { message: "Confirm password must be at least 6 characters." }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

const PasswordChange = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword1, setShowPassword1] = useState(false);
  const [AddConfrom, setAddConfrom] = useState(false)

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  // ✅ Handle Form Submission
  const onSubmit = (data) => {
    console.log("Password Updated:", data);

    // Reset the form fields
    form.reset();

    // Open the confirmation dialog
    setAddConfrom(true);
  };
  const handleConfirm = async () => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));

      console.log("Data Submitted Successfully!");

      setAddConfrom(false);
    } catch (error) {
      console.error("Submission failed:", error);
    }
  };

  return (
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
                className="w-full sm:w-auto text-black mt-4 bg-gray-100 hover:text-black hover:bg-gray-200 px-5 py-2 rounded-md flex items-center  transition-all"
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

export default PasswordChange;
