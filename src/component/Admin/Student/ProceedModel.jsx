import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../src/components/ui/dialog";
import { Button } from "../../src/components/ui/button";
import { Label } from "../../src/components/ui/label";
import { Input } from "../../src/components/ui/input";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

const schema = z.object({
    address: z.string().min(5, "Address is required"),
    aadhaarNumber: z.string().length(12, "Aadhaar must be 12 digits").regex(/\d+$/, "Only numbers allowed"),
    panNumber: z.string().length(10, "PAN must be 10 characters").regex(/^[A-Z]{5}[0-9]{4}[A-Z]$/, "Invalid PAN format"),
    aadhaarDocument: z.any().refine((file) => file && file.type === "application/pdf", {
        message: "Only PDF files are allowed",
    }),
    panDocument: z.any().refine((file) => file && file.type === "application/pdf", {
        message: "Only PDF files are allowed",
    }),
});

const ProceedModal = () => {
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(true);
    const [formData, setFormData] = useState({
        address: "",
        aadhaarNumber: "",
        panNumber: "",
        aadhaarDocument: null,
        panDocument: null,
        aadhaarFileName: "Click to Upload",
        panFileName: "Click to Upload",
    });
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
        setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
    };

    const handleFileUpload = (e, field) => {
        const file = e.target.files[0];
        setFormData((prevData) => ({
            ...prevData,
            [field]: file,
            [`${field}FileName`]: file ? file.name : "Click to Upload",
        }));
        setErrors((prevErrors) => ({ ...prevErrors, [field]: "" }));
    };

    const handleSubmit = () => {
        try {
            schema.parse(formData);
            navigate("/StudentSelectionPage");
        } catch (error) {
            const formattedErrors = {};
            error.errors.forEach((err) => {
                formattedErrors[err.path[0]] = err.message;
            });
            setErrors(formattedErrors);
        }
    };

    return (
        <div>

            <FaArrowLeftLong
                onClick={() => navigate("/add_student_model")}
                style={{ cursor: "pointer", outline: "none", border: "none" }}
                className="fixed text-3xl z-[999]"
            />
            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                <DialogContent className="sm:max-w-[700px] p-6 rounded-lg">
                    <DialogHeader>
                        <DialogTitle className="block font-semibold text-lg sm:text-3xl mb-4 text-center">Enter Your Details</DialogTitle>
                    </DialogHeader>

                    <div className="grid gap-4">
                        <div>
                            <Label className="block font-semibold text-lg sm:text-xl mb-4">Enter Address</Label>
                            <Input type="text" name="address" value={formData.address} onChange={handleChange} className="w-full border-gray-300 rounded-xl p-3 sm:p-5 focus:ring-4 focus:ring-blue-500 shadow-lg" placeholder="Enter your address" />
                            {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Label className="block font-semibold text-lg sm:text-xl mb-4">Enter Aadhaar Number</Label>
                                <Input type="text" name="aadhaarNumber" value={formData.aadhaarNumber} onChange={handleChange} className="w-full border-gray-300 rounded-xl p-3 sm:p-5 focus:ring-4 focus:ring-blue-500 shadow-lg" placeholder="Aadhaar number (12 digits)" />
                                {errors.aadhaarNumber && <p className="text-red-500 text-sm mt-1">{errors.aadhaarNumber}</p>}
                            </div>
                            <div>
                                <Label className="block font-semibold text-lg sm:text-xl mb-4">Enter PAN No.</Label>
                                <Input type="text" name="panNumber" value={formData.panNumber} onChange={handleChange} className="w-full border-gray-300 rounded-xl p-3 sm:p-5 focus:ring-4 focus:ring-blue-500 shadow-lg" placeholder="PAN number (10 characters)" />
                                {errors.panNumber && <p className="text-red-500 text-sm mt-1">{errors.panNumber}</p>}
                            </div>
                        </div>



                        <div className="grid grid-cols-2 gap-4">
                            {/* Aadhaar Document Upload */}
                            <div>
                                <Label className="block font-semibold text-lg sm:text-xl mb-4">Upload Aadhaar Document</Label>
                                <p className="text-sm">(Upload front and back in PDF)</p>
                                <div className="w-full border border-gray-300 rounded-xl p-3 sm:p-2 shadow-lg cursor-pointer">
                                    <Label htmlFor="aadhaar-upload" className="cursor-pointer ml-2">
                                        {formData.aadhaarDocument ? formData.aadhaarDocument.name : "Click to Upload"}
                                    </Label>
                                    <Input
                                        type="file"
                                        id="aadhaar-upload"
                                        className="hidden"
                                        onChange={(e) => handleFileUpload(e, "aadhaarDocument")}
                                        accept=".pdf"
                                    />
                                </div>
                                {errors.aadhaarDocument && <p className="text-red-500 text-sm mt-1">{errors.aadhaarDocument}</p>}
                            </div>

                            {/* PAN Document Upload */}
                            <div>
                                <Label className="block font-semibold text-lg sm:text-xl mb-4">Upload PAN Document</Label>
                                <p className="text-sm">(Upload front and back in PDF)</p>
                                <div className="w-full border border-gray-300 rounded-xl p-3 sm:p-2 shadow-lg cursor-pointer">
                                    <Label htmlFor="pan-upload" className="cursor-pointer ml-2">
                                        {formData.panDocument ? formData.panDocument.name : "Click to Upload"}
                                    </Label>
                                    <Input
                                        type="file"
                                        id="pan-upload"
                                        className="hidden"
                                        onChange={(e) => handleFileUpload(e, "panDocument")}
                                        accept=".pdf"
                                    />
                                </div>
                                {errors.panDocument && <p className="text-red-500 text-sm mt-1">{errors.panDocument}</p>}
                            </div>
                        </div>


                        <div className="flex justify-center mt-4">
                            <Button onClick={handleSubmit} className="bg-blue-700 hover:bg-blue-600 text-white px-10 py-3 rounded-lg w-full sm:w-[200px] text-lg">Submit</Button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default ProceedModal;
