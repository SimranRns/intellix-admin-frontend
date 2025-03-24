import { z } from "zod";

export const schema = z.object({

    name: z
        .string()
        .min(3, "Name must be at least 3 characters long")
        .regex(/^[A-Za-z\s]+$/, "Only alphabets (A-Z, a-z) and spaces are allowed"),

    school: z.string()
        .min(3, "School name must be at least 3 characters long")
        .regex(/^[A-Za-z\s]+$/, "Only alphabets are allowed"),

    email: z.string().email("Enter a valid email"),

    gender: z.string().min(1, "Gender selection is required"),

    contact: z.string()
        .length(10, "Contact number must be exactly 10 digits")
        .regex(/^[0-9]+$/, "Only numbers are allowed"),

    category: z.string().min(1, "Category selection is required"),

    serialNo: z.string().min(1, "Serial number is required"),

    dob: z.string().min(1, "Date of Birth is required"),
});

export const zodSchema = z.object({
    fatherName: z.string().min(2, "Father's name is required").regex(/^[A-Za-z\s]+$/, "Only alphabets allowed"),
    motherName: z.string().min(2, "Mother's name is required").regex(/^[A-Za-z\s]+$/, "Only alphabets allowed"),
    guardianAadhaar: z.string().length(12, "Aadhaar must be 12 digits").regex(/^\d+$/, "Only numbers allowed"),
    guardianBankAccount: z.string().min(8, "Account number must be at least 8 digits").regex(/^\d+$/, "Only numbers allowed"),
    ifscCode: z.string().length(11, "IFSC must be 11 characters").regex(/^[A-Z0-9]+$/, "Invalid IFSC format"),
    guardianPan: z.any().refine((file) => file && file.type === "application/pdf", {
        message: "Only PDF files are allowed",
    }),
});

export const validationSchema = z.object({
    selectedCourse: z.string().min(1, { message: "Course selection is required" }),
    selectedBatch: z.string().min(1, { message: "Batch selection is required" }),

});
