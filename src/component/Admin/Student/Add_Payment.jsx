import React, { useState, useRef, useEffect } from "react";
import { CalendarIcon, } from "lucide-react";
import { format } from "date-fns";
import { Button } from "../../src/components/ui/Button";
import { z } from "zod";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../../src/components/ui/dialog"
import { Input } from "../../src/components/ui/input"
import { Checkbox } from "../../src/components/ui/checkbox";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";




// Zod Schema
const baseSchema = {
    grandTotal: z.string().min(1, "Grand Total is required"),
    discount: z
        .string()
        .min(1, "Discount amount is required")
        .refine((val) => !isNaN(Number(val)) && Number(val) >= 0, {
            message: "Discount must be a valid number",
        }),
};

const emiSchema = z.object({
    ...baseSchema,
    paymentType: z.literal("Pay in EMIs"),
    emiCount: z.string().min(1, "EMI Count is required"),
    startDate: z.string().refine((val) => val !== "", {
        message: "Start date is required",
    }),
    endDate: z.string().refine((val) => val !== "", {
        message: "End date is required",
    }),
});

const oneShotSchema = z.object({
    ...baseSchema,
    paymentType: z.literal("Pay in One Shot"),
    dueDate: z.string().refine((val) => val !== "", {
        message: "Due date is required",
    }),
    remark: z
        .string()
        .min(3, "Remark must be at least 3 characters")
        .max(100, "Remark must be under 100 characters"),

});

const PaymentSchema = z.discriminatedUnion("paymentType", [emiSchema, oneShotSchema]);
const Add_Payment = () => {
    const dueInputRef = useRef(null);
    const startInputRef = useRef(null);
    const endInputRef = useRef(null);

    const [date, setDate] = useState(null); // Define date state
    const [startDate, setStartDate] = useState(new Date("2025-03-04"));
    const [endDate, setEndDate] = useState(new Date("2025-03-04"));
    const [paymentType, setPaymentType] = useState("emi");

    const [selected, setSelected] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [deletedialog, setdeletedialog] = useState(false);
    const inputRef = useRef(null)




    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(PaymentSchema),
        defaultValues: {
            grandTotal: "",
            discount: "",
            paymentType: "Pay in EMIs",
            emiCount: "",
            startDate: "",
            endDate: "",
            dueDate: "",
            remark: "",
        },
    });


    useEffect(() => {
        setValue("paymentType", selected);
    }, [selected]);

    useEffect(() => {
        setValue("startDate", startDate);
        setValue("endDate", endDate);
    }, [startDate, endDate]);

    // const handleCheckboxChange = (type) => {
    //   setSelected(type);
    // };

    const onSubmit = (data) => {
        console.log("Validated Data:", data);
        form.reset();
    };



    return (
        <div>
            <Dialog>
                <DialogTrigger asChild>
                    <Button
                        variant="outline"
                        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-xl text-base font-medium"
                    >
                        + Add Payment
                    </Button>
                </DialogTrigger>

                <DialogContent
                    className="sm:max-w-[600px] p-6 rounded-xl"
                    onPointerDownOutside={(e) => e.preventDefault()}
                    onEscapeKeyDown={(e) => e.preventDefault()}
                >
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <DialogHeader>
                            <DialogTitle className="text-2xl sm:text-3xl font-semibold text-center mb-4">
                                Setup Payment
                            </DialogTitle>
                        </DialogHeader>

                        <div className="space-y-6">
                            {/* Grand Total */}
                            <div>
                                <label className="block text-xl font-medium mb-2">Grand Total:</label>
                                <Input type="number" placeholder="₹" className="w-full h-14 text-lg" {...register("grandTotal")} />
                                <p className="text-red-500 text-sm mt-1">{errors.grandTotal?.message}</p>
                            </div>

                            {/* Payment Option Selector */}
                            {/* Payment Option Selector */}
                            <div className="flex gap-4">
                                {["Pay in EMIs", "Pay in One Shot"].map((type) => (
                                    <div
                                        key={type}
                                        className={`flex items-center gap-2 px-4 py-3 border rounded-md cursor-pointer ${selected === type ? "border-blue-500" : ""
                                            }`}
                                    >
                                        <Checkbox
                                            id={type}
                                            checked={selected === type}
                                            onCheckedChange={() => {
                                                setSelected(type);
                                            }}
                                        />
                                        <label
                                            htmlFor={type}
                                            className="text-base font-medium cursor-pointer"
                                            onClick={() => setSelected(type)}
                                        >
                                            {type}
                                        </label>
                                    </div>
                                ))}
                            </div>


                            {/* Conditional Sections */}
                            {selected === "Pay in EMIs" ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* Discount */}
                                    <div>
                                        <label className="block text-lg font-medium mb-1">Discount Amount</label>
                                        <Input
                                            type="number"
                                            placeholder="Enter Amount"
                                            {...register("discount")}
                                        />
                                        <p className="text-red-500 text-sm mt-1">{errors.discount?.message}</p>
                                    </div>
                                    {/* EMI Count */}
                                    <div>
                                        <label className="block text-lg font-medium mb-1">EMI Count *</label>
                                        <Input type="number" placeholder="Number of EMIs" {...register("emiCount")} />
                                        <p className="text-red-500 text-sm mt-1">{errors.emiCount?.message}</p>
                                    </div>

                                    {/* Start and End Date */}
                                    <div>
                                        <label className="block text-lg font-medium mb-1">Start Date *</label>
                                        <Button
                                            variant="outline"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                startInputRef.current?.showPicker();
                                            }}
                                            className="w-full justify-between"
                                        >
                                            {watch("startDate") ? format(new Date(watch("startDate")), "dd/MM/yyyy") : "Pick a date"}
                                            <CalendarIcon className="w-5 h-5 ml-2" />
                                        </Button>
                                        <Input
                                            type="date"
                                            ref={startInputRef}
                                            className="absolute opacity-0 -z-10"
                                            onChange={(e) => setValue("startDate", e.target.value, { shouldValidate: true })}
                                        />
                                        <p className="text-red-500 text-sm mt-1">{errors.startDate?.message}</p>
                                    </div>

                                    {/* End Date */}
                                    <div>
                                        <label className="block text-lg font-medium mb-1">End Date *</label>
                                        <Button
                                            variant="outline"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                endInputRef.current?.showPicker();
                                            }}
                                            className="w-full justify-between"
                                        >
                                            {watch("endDate") ? format(new Date(watch("endDate")), "dd/MM/yyyy") : "Pick a date"}
                                            <CalendarIcon className="w-5 h-5 ml-2" />
                                        </Button>
                                        <Input
                                            type="date"
                                            ref={endInputRef}
                                            className="absolute opacity-0 -z-10"
                                            onChange={(e) => setValue("endDate", e.target.value, { shouldValidate: true })}
                                        />
                                        <p className="text-red-500 text-sm mt-1">{errors.endDate?.message}</p>
                                    </div>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* Discount */}
                                    <div>
                                        <label className="block text-lg font-medium mb-1">Discount Amount</label>
                                        <Input
                                            type="number"
                                            placeholder="Enter Amount"
                                            {...register("discount")}
                                        />
                                        <p className="text-red-500 text-sm mt-1">{errors.discount?.message}</p>
                                    </div>


                                    {/* Due Date */}
                                    <div>
                                        <label className="block text-lg font-medium mb-1">Due Date *</label>
                                        <Button
                                            variant="outline"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                dueInputRef.current?.showPicker();
                                            }}
                                            className="w-full justify-between"
                                        >
                                            {watch("dueDate") ? format(new Date(watch("dueDate")), "dd/MM/yyyy") : "Pick a date"}
                                            <CalendarIcon className="w-5 h-5 ml-2" />
                                        </Button>
                                        <Input
                                            type="date"
                                            ref={dueInputRef}
                                            className="absolute opacity-0 -z-10"
                                            onChange={(e) => setValue("dueDate", e.target.value, { shouldValidate: true })}
                                        />
                                        <p className="text-red-500 text-sm mt-1">{errors.dueDate?.message}</p>
                                    </div>

                                    {/* Remark */}
                                    <div className="md:col-span-2">
                                        <label className="block text-lg font-medium mb-1">Remark</label>
                                        <Input
                                            type="text"
                                            placeholder="Course Fee"
                                            {...register("remark")}
                                        />
                                        <p className="text-red-500 text-sm mt-1">{errors.remark?.message}</p>
                                    </div>
                                </div>
                            )}
                        </div>

                        <DialogFooter>
                            <Button type="submit" className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold py-3 rounded-xl">
                                Proceed To Payment
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default Add_Payment
