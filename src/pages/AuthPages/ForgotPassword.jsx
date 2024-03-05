import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  const [viewPassword, setViewPassword] = useState(false);

  return (
    <section className="grid justify-center bg-[#051724]  h-[100vh]">
      <div className="bg-[#030f18] m-auto w-[40vw] place-content-center border-[#f0cf7b] border-[0.1px] lg:w-[500px] h-auto rounded-lg  flex flex-col md:border border-grey-400 md:pt-[25px] py-[50px] px-12 mx-[auto]">
        <div className="flex flex-col items-center">
          <img
            src="https://app.jollofradio.com/assets/jollofradio-horizontal.cc936d7a.png"
            className="w-[100px] cursor-pointer"
            alt="Jollof.M"
          />
          <span className="text-white text-[20px] font-normal text-center md:mt-[15px] mb-10 capitalize">
            Forgotten Password As User
          </span>
        </div>
        <div className="text-[#f0cf7b] py-4">
          Hang on captain! it happens sometimes. let's get you back to your
          account
        </div>
        <div className="flex flex-col pt-0">
          <div className="flex flex-col w-full space-y-[10px] py-2">
            <label htmlFor="username" className="text-white text-[12px]">
              Email Address
            </label>
            <input
              type="text"
              name="username"
              required=""
              className="bg-[#0d1921] rounded-sm border-0 focus:ring-transparent focus:border-0 text-white w-full h-[40px] text-md md:px-4 placeholder:text-[#252f34]"
              placeholder="example@gmail.com"
            />
          </div>

          <div className="flex items-center justify-between pt-0.5 pb-[19px]">
            <Link to={"/signin"} className="text-[#f0cf7b] text-[12px]">
              {" "}
              Remembered Password? Sign In.
            </Link>
          </div>
          <div className="mx-auto mb-[25px]">
            <button className="bg-[#f0cf7b] py-[13px] px-[57px] font-medium text-[13px] rounded-sm hover:bg-[#a58e55]">
              Next
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ForgotPassword;
