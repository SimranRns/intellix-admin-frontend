import React from "react";
import emoji from '../Student/img/emoji.png'
import { useNavigate } from "react-router-dom";
const SuccessMessage = () => {

  const navigate = useNavigate();

  return (
    <div>
      <div>
        <p
          style={{
            textAlign: "center",
            
            fontSize: "35px",
            fontWeight: "600",
          }}
        >
          Student Added Successfully!!
        </p>
      </div>
      <div style={{ display: "flex", justifyContent: "center" ,marginTop:"75px"}}>
        <img
          style={{ height: "37vh" }}
          src={emoji}
          alt=""
        />
      </div>

      <div className="flex justify-center items-center mt-[10%]">
  <button onClick={() => navigate("/students")}
    className="bg-[#8147e7] 
               rounded-lg min-w-[350px] w-full sm:w-[400px] h-[50px] text-lg 
               flex justify-center items-center"
  >
    Back to Students
  </button>
</div>


    </div>
  );
};

export default SuccessMessage;
