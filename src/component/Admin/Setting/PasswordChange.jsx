import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../../src/components/ui/card";
import { Input } from "../../src/components/ui/input";
import { Button } from "../../src/components/ui/button";
import { Eye, EyeOff } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../src/components/ui/form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "../../src/components/ui/dialog";
import ThankYouCard from "../Dashboard/ThankYouCard";
import { change_admin_password } from "../../../Redux_store/Api/adminProfile";
import { setAdminToken } from "../../../Redux_store/slices/adminProfileSlice";

// ✅ Zod Validation Schema
const formSchema = z
  .object({
    password: z.string().min(6, "Password must be at least 6 characters."),
    confirmPassword: z
      .string()
      .min(6, "Confirm password must be at least 6 characters."),
    oldPassword: z.string().min(6, "Old password must be at least 6 characters."),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

const PasswordChange = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showOld, setShowOld] = useState(false);

  const [AddConfrom, setAddConfrom] = useState(false);


  const dispatch = useDispatch();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      dispatch(setAdminToken(token));
    }
  }, [dispatch]); // ✅ only once on mount

  const { loading, error, token, passwordChangeSuccess } = useSelector((state) => state.adminProfile);


  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
      oldPassword: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      const payload = {
        current_password: data.oldPassword,
        new_password: data.password,
        confirm_password: data.confirmPassword,
      };

      await dispatch(change_admin_password({ data: payload, token })).unwrap(); // ✅ unwrap for better error handling

      setAddConfrom(true);

      form.reset();
      // dispatch(resetPasswordState());
    } catch (err) {
      console.error("Password change failed:", err);
    }
  };




  const handleConfirm = async () => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    console.log("Password confirmed!");
    setAddConfrom(false);
    dispatch(resetPasswordState());

  };


  return (
    <div className="pt-6 flex justify-center">
      <Card className="w-full sm:max-w-md md:max-w-lg border shadow-xl p-4 sm:p-6">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-gray-600">
            Change Your Password
          </CardTitle>
          <CardDescription className="text-sm sm:text-base">
            Enter a new password below to update your <br /> credentials.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              {/* New Password */}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700 font-semibold text-lg">
                      New Password
                    </FormLabel>
                    <FormControl>
                      <div className="relative flex items-center">
                        <Input
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter New Password"
                          className="w-full border border-blue-300 rounded-xl p-4 sm:p-5 pr-10 focus:ring-4 focus:ring-blue-500 shadow-lg"
                          {...field}
                        />
                        <span
                          className="absolute right-3 text-gray-500 cursor-pointer"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <Eye /> : <EyeOff />}
                        </span>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Confirm Password */}
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem className="mt-4">
                    <FormLabel className="text-gray-700 font-semibold text-lg">
                      Confirm Password
                    </FormLabel>
                    <FormControl>
                      <div className="relative flex items-center">
                        <Input
                          type={showConfirm ? "text" : "password"}
                          placeholder="Confirm Password"
                          className="w-full border border-blue-300 rounded-xl p-4 sm:p-5 pr-10 focus:ring-4 focus:ring-blue-500 shadow-lg"
                          {...field}
                        />
                        <span
                          className="absolute right-3 text-gray-500 cursor-pointer"
                          onClick={() => setShowConfirm(!showConfirm)}
                        >
                          {showConfirm ? <Eye /> : <EyeOff />}
                        </span>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Old Password */}
              <FormField
                control={form.control}
                name="oldPassword"
                render={({ field }) => (
                  <FormItem className="mt-4">
                    <FormLabel className="text-gray-700 font-semibold text-lg">
                      Old Password
                    </FormLabel>
                    <FormControl>
                      <div className="relative flex items-center">
                        <Input
                          type={showOld ? "text" : "password"}
                          placeholder="Old Password"
                          className="w-full border border-blue-300 rounded-xl p-4 sm:p-5 pr-10 focus:ring-4 focus:ring-blue-500 shadow-lg"
                          {...field}
                        />
                        <span
                          className="absolute right-3 text-gray-500 cursor-pointer"
                          onClick={() => setShowOld(!showOld)}
                        >
                          {showOld ? <Eye /> : <EyeOff />}
                        </span>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {error && (
                <p style={{ color: "red" }}>
                  {typeof error === "object" ? error.message : error}
                </p>
              )}


              {passwordChangeSuccess && <p className="text-green-500">{passwordChangeSuccess}</p>}
              {/* Submit */}
              <CardFooter className="flex justify-center mt-5">
                <Button
                  type="submit" disabled={loading}
                  className="w-full sm:w-[300px] bg-blue-500 shadow-lg hover:bg-blue-700"
                >
                  {loading ? 'Updating...' : 'CHANGE PASSWORD'}
                </Button>


              </CardFooter>

            </form>
          </Form>
        </CardContent>
      </Card>

      {/* Confirmation Dialog */}
      <Dialog open={AddConfrom} onOpenChange={setAddConfrom}>
        <DialogContent
          onPointerDownOutside={(e) => e.preventDefault()}
          onEscapeKeyDown={(e) => e.preventDefault()}
          className="w-full max-w-[90vw] sm:max-w-[400px] p-6 rounded-lg"
        >
          <ThankYouCard />
          <DialogFooter className="flex justify-end gap-3">
            <Button
              onClick={() => setAddConfrom(false)}
              variant="outline"
              className="w-full sm:w-auto text-black mt-4 bg-gray-100 hover:text-black hover:bg-gray-200"
            >
              Cancel
            </Button>
            <Button
              onClick={handleConfirm}
              className="w-full sm:w-auto mt-4 bg-blue-500 hover:bg-blue-600 text-white"
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
