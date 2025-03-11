import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../src/components/ui/dialog";
import { Button } from "../../src/components/ui/button";
import { Label } from "../../src/components/ui/label";
import { Input } from "../../src/components/ui/input";

const ProceedModal = ({ o, c }) => {
    return (
        <Dialog open={o} onOpenChange={c}>
            <DialogContent className="sm:max-w-[700px] p-6 rounded-lg">
                <DialogHeader>
                    <DialogTitle className="block text-gray-700 font-semibold text-lg sm:text-xl mb-4 ">Enter Your Details</DialogTitle>
                </DialogHeader>

                <div className="grid gap-4">
                  
                    <div>
                        <Label className="block text-gray-700 font-semibold text-lg sm:text-xl mb-4">Enter Address</Label>
                        <Input className="w-full border-gray-300 rounded-xl p-3 sm:p-5 focus:ring-4 focus:ring-blue-500 shadow-lg" placeholder="Enter your address "  />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        
                        <div>
                            <Label className="block text-gray-700 font-semibold text-lg sm:text-xl mb-4">Enter Aadhaar Number</Label>
                            <Input className="w-full border-gray-300 rounded-xl p-3 sm:p-5 focus:ring-4 focus:ring-blue-500 shadow-lg" placeholder="Aadhaar number"  />
                        </div>

                      
                        <div>
                            <Label className="block text-gray-700 font-semibold text-lg sm:text-xl mb-4">Enter Pan No.</Label>
                            <Input className="w-full border-gray-300 rounded-xl p-3 sm:p-5 focus:ring-4 focus:ring-blue-500 shadow-lg" placeholder="Pan number" />
                            {/* <p className="text-red-500 text-sm">PAN card number is invalid.</p> */}
                        </div>
                    </div>

                   
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <Label className="block text-gray-700 font-semibold text-lg sm:text-xl mb-4">Upload Aadhaar photo</Label>
                            <p className="text-gray-500 text-sm">(upload front and back in pdf)</p>
                            <Button className="w-full border-gray-300 rounded-xl p-3 sm:p-5 focus:ring-4 focus:ring-blue-500 shadow-lg" variant="outline" >Upload pdf</Button>
                        </div>
                        <div>
                            <Label className="block text-gray-700 font-semibold text-lg sm:text-xl mb-4">Upload Pan photo</Label>
                            <p className="text-gray-500 text-sm">(upload front and back in pdf)</p>
                            <Button variant="outline" className="w-full border-gray-300 rounded-xl p-3 sm:p-5 focus:ring-4 focus:ring-blue-500 shadow-lg">Upload pdf</Button>
                        </div>
                    </div>

                 
                    <div className="flex justify-center mt-4">
                        <Button className="bg-blue-700 hover:bg-blue-600 text-white px-10 py-3 rounded-lg w-full sm:w-[500px] text-lg">
                            Submit
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default ProceedModal;
