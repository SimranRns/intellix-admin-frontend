// import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../src/components/ui/dialog";
// import { Button } from "../../src/components/ui/button";
// import { Label } from "../../src/components/ui/label";
// import { Input } from "../../src/components/ui/input";
// import { useNavigate } from "react-router-dom";

// const ProceedModal = ({ o, c }) => {

//     const handleChange = (e) => {
//         const { name, value } = e.target;
      
//         let regex;
      
//         if (name === "address") {
//           regex = /^[A-Za-z0-9\s,.-]+$/; // Address ke liye alphabets, numbers, spaces, comma, dot, hyphen allowed
//         } else {
//           regex = /^[A-Za-z\s]+$/; // Name aur School ke liye sirf alphabets aur spaces allowed
//         }
      
//         if (value === "" || regex.test(value)) {
//           setFormData((prevData) => ({ ...prevData, [name]: value }));
//         }
//       };

      


//     const navigate = useNavigate();
//     return (
//         <Dialog open={o} onOpenChange={c}>
//             <DialogContent className="sm:max-w-[700px] p-6 rounded-lg">
//                 <DialogHeader>
//                     <DialogTitle className="block text-gray-700 font-semibold text-lg sm:text-xl mb-4 ">Enter Your Details</DialogTitle>
//                 </DialogHeader>

//                 <div className="grid gap-4">

//                    <div>
//   <Label className="block text-gray-700 font-semibold text-lg sm:text-xl mb-4">
//     Enter Address
//   </Label>
//   <Input
//     type="text"
//     name="address"
//     value={formData.address}
//     onChange={handleChange}
//     className="w-full border-gray-300 rounded-xl p-3 sm:p-5 focus:ring-4 focus:ring-blue-500 shadow-lg"
//     placeholder="Enter your address"
//   />
// </div>


//                     <div className="grid grid-cols-2 gap-4">

//                         <div>
//                             <Label className="block text-gray-700 font-semibold text-lg sm:text-xl mb-4">Enter Aadhaar Number</Label>
//                             <Input className="w-full border-gray-300 rounded-xl p-3 sm:p-5 focus:ring-4 focus:ring-blue-500 shadow-lg" placeholder="Aadhaar number" />
//                         </div>


//                         <div>
//                             <Label className="block text-gray-700 font-semibold text-lg sm:text-xl mb-4">Enter Pan No.</Label>
//                             <Input className="w-full border-gray-300 rounded-xl p-3 sm:p-5 focus:ring-4 focus:ring-blue-500 shadow-lg" placeholder="Pan number" />
//                             {/* <p className="text-red-500 text-sm">PAN card number is invalid.</p> */}
//                         </div>
//                     </div>


//                     <div className="grid grid-cols-2 gap-4">
//                         <div>
//                             <Label className="block text-gray-700 font-semibold text-lg sm:text-xl mb-4">
//                                 Upload Aadhaar Document
//                             </Label>
//                             <p className="text-gray-500 text-sm">(upload front and back in pdf)</p>
//                             <div className="w-full border border-gray-300 rounded-xl p-3 sm:p-2 focus:ring-4 focus:ring-blue-500 shadow-lg cursor-pointer">
//                                 <Label htmlFor="file-upload" className="cursor-pointer text-gray-500 ml-2">
//                                     Click to Upload
//                                 </Label>
//                                 <Input type="file" id="file-upload" className="hidden" />
//                             </div>
//                         </div>

//                         {/* <div>
//                             <Label className="block text-gray-700 font-semibold text-lg sm:text-xl mb-4">Upload Pan photo</Label>
//                             <p className="text-gray-500 text-sm">(upload front and back in pdf)</p>
//                             <Button variant="outline" className="w-full border-gray-300 rounded-xl p-3 sm:p-5 focus:ring-4 focus:ring-blue-500 shadow-lg">Upload pdf</Button>
//                         </div> */}

//                         <div>
//                             <Label className="block text-gray-700 font-semibold text-lg sm:text-xl mb-4">
//                                 Upload Pan Photo
//                             </Label>
//                             <p className="text-gray-500 text-sm">(upload front and back in pdf)</p>
//                             <div className="w-full border border-gray-300 rounded-xl p-3 sm:p-2 focus:ring-4 focus:ring-blue-500 shadow-lg cursor-pointer">
//                                 <Label htmlFor="pan-upload" className="cursor-pointer text-gray-500 ml-2">
//                                     Upload PDF
//                                 </Label>
//                                 <Input type="file" id="pan-upload" className="hidden" />
//                             </div>
//                         </div>

//                     </div>


//                     <div className="flex justify-center mt-4">
//                         <Button onClick={() => navigate("/add_student_model2")} className="bg-blue-700 hover:bg-blue-600 text-white px-10 py-3 rounded-lg w-full sm:w-[500px] text-lg">
//                             Submit
//                         </Button>
//                     </div>
//                 </div>
//             </DialogContent>
//         </Dialog>
//     );
// };

// export default ProceedModal;



import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../src/components/ui/dialog";
import { Button } from "../../src/components/ui/button";
import { Label } from "../../src/components/ui/label";
import { Input } from "../../src/components/ui/input";
import { useNavigate } from "react-router-dom";

const ProceedModal = ({ o, c }) => {
    const navigate = useNavigate();

    // ✅ Form state
    const [formData, setFormData] = useState({
        address: "",
        aadhaarNumber: "",
        panNumber: "",
        aadhaarDocument: null,
        panDocument: null
    });

    // ✅ Address change handler (Alphabets, numbers, spaces, comma, dot, hyphen allowed)
    const handleChangeAddress = (e) => {
        const { name, value } = e.target;
        const regex = /^[A-Za-z0-9\s,.-]+$/;
        if (value === "" || regex.test(value)) {
            setFormData((prevData) => ({ ...prevData, [name]: value }));
        }
    };

    // ✅ Aadhaar Number change handler (Only numbers, exactly 12 digits)
    const handleChangeAadhaar = (e) => {
        const { name, value } = e.target;
        const regex = /^[0-9]{0,12}$/; // 0-12 digits allowed
        if (value === "" || regex.test(value)) {
            setFormData((prevData) => ({ ...prevData, [name]: value }));
        }
    };

    // ✅ PAN Number change handler (Alphanumeric, 10 characters)
    const handleChangePan = (e) => {
        const { name, value } = e.target;
        const regex = /^[A-Z0-9]{0,10}$/i; // 0-10 characters allowed
        if (value === "" || regex.test(value)) {
            setFormData((prevData) => ({ ...prevData, [name]: value.toUpperCase() })); // Convert to uppercase
        }
    };

    // ✅ Aadhaar Document Upload Handler
    const handleAadhaarUpload = (e) => {
        const file = e.target.files[0];
        setFormData((prevData) => ({ ...prevData, aadhaarDocument: file }));
    };

    // ✅ PAN Document Upload Handler
    const handlePanUpload = (e) => {
        const file = e.target.files[0];
        setFormData((prevData) => ({ ...prevData, panDocument: file }));
    };

    return (
        <Dialog open={o} onOpenChange={c}>
            <DialogContent className="sm:max-w-[700px] p-6 rounded-lg">
                <DialogHeader>
                    <DialogTitle className="block text-gray-700 font-semibold text-lg sm:text-xl mb-4">
                        Enter Your Details
                    </DialogTitle>
                </DialogHeader>

                <div className="grid gap-4">
                    {/* Address Field */}
                    <div>
                        <Label className="block text-gray-700 font-semibold text-lg sm:text-xl mb-4">
                            Enter Address
                        </Label>
                        <Input
                            type="text"
                            name="address"
                            value={formData.address}
                            onChange={handleChangeAddress}
                            className="w-full border-gray-300 rounded-xl p-3 sm:p-5 focus:ring-4 focus:ring-blue-500 shadow-lg"
                            placeholder="Enter your address"
                        />
                    </div>

                    {/* Aadhaar and PAN Number Fields */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <Label className="block text-gray-700 font-semibold text-lg sm:text-xl mb-4">
                                Enter Aadhaar Number
                            </Label>
                            <Input
                                type="text"
                                name="aadhaarNumber"
                                value={formData.aadhaarNumber}
                                onChange={handleChangeAadhaar}
                                className="w-full border-gray-300 rounded-xl p-3 sm:p-5 focus:ring-4 focus:ring-blue-500 shadow-lg"
                                placeholder="Aadhaar number (12 digits)"
                            />
                        </div>

                        <div>
                            <Label className="block text-gray-700 font-semibold text-lg sm:text-xl mb-4">
                                Enter PAN No.
                            </Label>
                            <Input
                                type="text"
                                name="panNumber"
                                value={formData.panNumber}
                                onChange={handleChangePan}
                                className="w-full border-gray-300 rounded-xl p-3 sm:p-5 focus:ring-4 focus:ring-blue-500 shadow-lg"
                                placeholder="PAN number (10 characters)"
                            />
                        </div>
                    </div>

                    {/* Document Upload Fields */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <Label className="block text-gray-700 font-semibold text-lg sm:text-xl mb-4">
                                Upload Aadhaar Document
                            </Label>
                            <p className="text-gray-500 text-sm">(Upload front and back in PDF)</p>
                            <div className="w-full border border-gray-300 rounded-xl p-3 sm:p-2 focus:ring-4 focus:ring-blue-500 shadow-lg cursor-pointer">
                                <Label htmlFor="aadhaar-upload" className="cursor-pointer text-gray-500 ml-2">
                                    Click to Upload
                                </Label>
                                <Input
                                    type="file"
                                    id="aadhaar-upload"
                                    className="hidden"
                                    onChange={handleAadhaarUpload}
                                    accept=".pdf"
                                />
                            </div>
                        </div>

                        <div>
                            <Label className="block text-gray-700 font-semibold text-lg sm:text-xl mb-4">
                                Upload PAN Photo
                            </Label>
                            <p className="text-gray-500 text-sm">(Upload front and back in PDF)</p>
                            <div className="w-full border border-gray-300 rounded-xl p-3 sm:p-2 focus:ring-4 focus:ring-blue-500 shadow-lg cursor-pointer">
                                <Label htmlFor="pan-upload" className="cursor-pointer text-gray-500 ml-2">
                                    Upload PDF
                                </Label>
                                <Input
                                    type="file"
                                    id="pan-upload"
                                    className="hidden"
                                    onChange={handlePanUpload}
                                    accept=".pdf"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-center mt-4">
                        <Button
                            onClick={() => navigate("/add_student_model2")}
                            className="bg-blue-700 hover:bg-blue-600 text-white px-10 py-3 rounded-lg w-full sm:w-[500px] text-lg"
                        >
                            Submit
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default ProceedModal;
