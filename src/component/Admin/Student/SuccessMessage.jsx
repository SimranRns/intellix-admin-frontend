import React from "react";
import emoji from "../Student/img/emoji.png";
import { useNavigate } from "react-router-dom";
const SuccessMessage = () => {
  const navigate = useNavigate();
 const [AddConfrom, setAddConfrom] = useState(false); //fourth
  return (
    // <div>
    //   <div>
    //     <p
    //       style={{
    //         textAlign: "center",

    //         fontSize: "35px",
    //         fontWeight: "600",
    //       }}
    //     >
    //       Student Added Successfully!!
    //     </p>
    //   </div>
    //   <div
    //     style={{ display: "flex", justifyContent: "center", marginTop: "75px" }}
    //   >
    //     <img style={{ height: "37vh" }} src={emoji} alt="" />
    //   </div>

    //   <div className="flex justify-center items-center mt-[10%]">
    //     <button
    //       onClick={() => navigate("/students")}
    //       className="bg-[#8147e7]
    //            rounded-lg min-w-[350px] w-full sm:w-[400px] h-[50px] text-lg
    //            flex justify-center items-center"
    //     >
    //       Back to Students
    //     </button>
    //   </div>
    // </div>
    <Dialog open={AddConfrom} onOpenChange={setAddConfrom}>
      <DialogContent
        onPointerDownOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => e.preventDefault()}
        className="w-full max-w-[90vw] sm:max-w-[400px] p-6 rounded-lg"
      >
        <ThankYouCard />
        {/* Dialog Footer */}
        <DialogFooter className="flex justify-end gap-3">
          <Button
            onClick={() => setAddConfrom(false)}
            variant="outline"
            className="w-full sm:w-auto mt-4 bg-gray-100 hover:bg-gray-200 hover:text-black px-5 py-2 rounded-md text-black flex items-center transition-all"
          >
            Cancel
          </Button>
          <Button
            onClick={async () => {
              setAddConfrom(false);
              navigate("/students"); // Navigate to the students page
            }} // Handle form submission & dialog close
            className="w-full sm:w-auto mt-4 bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-md flex items-center shadow-md transition-all"
          >
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SuccessMessage;
