import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../src/components/ui/dialog";
import { Button } from "../../src/components/ui/button";
import { Label } from "../../src/components/ui/label";
import { Input } from "../../src/components/ui/input";
import { useNavigate } from "react-router-dom";
import { FaArrowLeftLong } from "react-icons/fa6";

const ProceedModal = ({ o, c }) => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        address: "",
        aadhaarNumber: "",
        panNumber: "",
        aadhaarDocument: null,
        panDocument: null
    });
// const navigate = useNavigate()
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
        setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
    };

    const handleFileUpload = (e, field) => {
        const file = e.target.files[0];
        if (file && file.type === "application/pdf") {
            setFormData((prevData) => ({ ...prevData, [field]: file }));
            setErrors((prevErrors) => ({ ...prevErrors, [field]: "" }));
        } else {
            setErrors((prevErrors) => ({ ...prevErrors, [field]: "Only PDF files are allowed!" }));
        }
    };

    const handleSubmit = () => {
        let newErrors = {};

        if (!formData.address.trim()) {
            newErrors.address = "Address is required!";
        }
        if (!formData.aadhaarNumber || formData.aadhaarNumber.length !== 12) {
            newErrors.aadhaarNumber = "Aadhaar number must be 12 digits!";
        }
        if (!formData.panNumber || formData.panNumber.length !== 10) {
            newErrors.panNumber = "PAN number must be 10 characters!";
        }
        if (!formData.aadhaarDocument) {
            newErrors.aadhaarDocument = "Aadhaar document is required!";
        }
        if (!formData.panDocument) {
            newErrors.panDocument = "PAN document is required!";
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }
navigate("/add_student_model2")
      
    };

    return (
      <div>
        <FaArrowLeftLong
        onClick={() => navigate("/add_student_model")}
        style={{ cursor: "pointer" }}
        className="fixed text-3xl z-[9999]  p-2 rounded-full shadow-lg"
      />
          <Dialog open={o} onOpenChange={c}>
            
            <DialogContent className="sm:max-w-[700px] p-6 rounded-lg">
                <DialogHeader>
                    <DialogTitle className="block  font-semibold text-lg sm:text-3xl mb-4 text-center">
                        Enter Your Details
                    </DialogTitle>
                </DialogHeader>

                <div className="grid gap-4">
                    <div>
                        <Label className="block font-semibold text-lg sm:text-xl mb-4">
                            Enter Address
                        </Label>
                        <Input
                            type="text"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            className="w-full border-gray-300 rounded-xl p-3 sm:p-5 focus:ring-4 focus:ring-blue-500 shadow-lg"
                            placeholder="Enter your address"
                        />
                        {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <Label className="block  font-semibold text-lg sm:text-xl mb-4">
                                Enter Aadhaar Number
                            </Label>
                            <Input
                                type="text"
                                name="aadhaarNumber"
                                value={formData.aadhaarNumber}
                                onChange={handleChange}
                                className="w-full border-gray-300 rounded-xl p-3 sm:p-5 focus:ring-4 focus:ring-blue-500 shadow-lg"
                                placeholder="Aadhaar number (12 digits)"
                            />
                            {errors.aadhaarNumber && <p className="text-red-500 text-sm mt-1">{errors.aadhaarNumber}</p>}
                        </div>

                        <div>
                            <Label className="block  font-semibold text-lg sm:text-xl mb-4">
                                Enter PAN No.
                            </Label>
                            <Input
                                type="text"
                                name="panNumber"
                                value={formData.panNumber}
                                onChange={handleChange}
                                className="w-full border-gray-300 rounded-xl p-3 sm:p-5 focus:ring-4 focus:ring-blue-500 shadow-lg"
                                placeholder="PAN number (10 characters)"
                            />
                            {errors.panNumber && <p className="text-red-500 text-sm mt-1">{errors.panNumber}</p>}
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      
                        <div>
    <Label className="block font-semibold text-lg sm:text-xl mb-4">
        Upload Aadhaar Document
    </Label>
    <p className="text-sm">(Upload front and back in PDF)</p>
    <div className="w-full border border-gray-300 rounded-xl p-3 sm:p-2 focus:ring-4 focus:ring-blue-500 shadow-lg cursor-pointer">
        <Label htmlFor="aadhaar-upload" className="cursor-pointer ml-2">
            {formData.aadhaarFileName || "Click to Upload"}
        </Label>
        <Input
            type="file"
            id="aadhaar-upload"
            className="hidden"
            onChange={(e) => {
                handleFileUpload(e, "aadhaarDocument");
                setFormData((prev) => ({
                    ...prev,
                    aadhaarFileName: e.target.files[0]?.name || "",
                }));
            }}
            accept=".pdf"
        />
    </div>
    {errors.aadhaarDocument && <p className="text-red-500 text-sm mt-1">{errors.aadhaarDocument}</p>}
</div>

<div>
    <Label className="block font-semibold text-lg sm:text-xl mb-4">
        Upload PAN Photo
    </Label>
    <p className="text-sm">(Upload front and back in PDF)</p>
    <div className="w-full border border-gray-300 rounded-xl p-3 sm:p-2 focus:ring-4 focus:ring-blue-500 shadow-lg cursor-pointer">
        <Label htmlFor="pan-upload" className="cursor-pointer ml-2">
            {formData.panFileName || "Upload PDF"}
        </Label>
        <Input
            type="file"
            id="pan-upload"
            className="hidden"
            onChange={(e) => {
                handleFileUpload(e, "panDocument");
                setFormData((prev) => ({
                    ...prev,
                    panFileName: e.target.files[0]?.name || "",
                }));
            }}
            accept=".pdf"
        />
    </div>
    {errors.panDocument && <p className="text-red-500 text-sm mt-1">{errors.panDocument}</p>}
</div>

                    </div>

                    <div className="flex justify-center mt-4">
                        <Button onClick={handleSubmit} className="bg-blue-700 hover:bg-blue-600 text-white px-10 py-3 rounded-lg w-full sm:w-[500px] text-lg">
                            Submit
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
      </div>
    );
};

export default ProceedModal;
