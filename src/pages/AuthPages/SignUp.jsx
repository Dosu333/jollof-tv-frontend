import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signupApi } from "../../api/api";
import { toast } from "react-toastify";

const SignUp = () => {
  const [viewPassword, setViewPassword] = useState(false);
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
    first_name: "",
    last_name: "",
    phone: "",
    country: "",
    state: "",
    city: "",
    checkbox: false,
  });

  const [errorMsg, setErrorMsg] = useState("");
  const [errorType, setErrorType] = useState("");

  const handleFirstNameChange = (e) => {
    setErrorMsg("");
    setErrorType("");
    setFirstName(e.target.value);
  };

  const handleLastNameChange = (e) => {
    setErrorMsg("");
    setErrorType("");
    setLastName(e.target.value);
  };

  const EMAIL_REGEX = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;

  const errorCheck = () => {
    let validEmail = EMAIL_REGEX.test(credentials.email);
    let iserror = false;

    if ((credentials.first_name.length || credentials.last_name.length) < 3) {
      setErrorMsg("Kindly Fill in all fields");
      setErrorType("all");
      iserror = true;
    } else if (credentials.email.length < 3 || !validEmail) {
      setErrorMsg("Kindly input a valid email Address");
      setErrorType("email");
      iserror = true;
    } else if (credentials.password.length < 6) {
      setErrorMsg("Password Should be at least 6 characters");
      setErrorType("password");
      iserror = true;
    } else if (!credentials.checkbox) {
      toast.error("Kindly accept our Terms and Conditions!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        toastId: "sign",
      });
      iserror = true;
    }

    if (iserror) {
      return false;
    }
    return true;
  };
  //SignUp User
  function SignUp() {
    if (errorCheck()) {
      console.log("No error, calling handleSignUp");
      handleSignUp();
    } else {
      toast.error("Fill in all Fields Correctly!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        toastId: "sign",
      });
      console.log("Error", errorMsg);
      console.log("Error found, showing alert");
    }
  }

  const handleSignUp = async () => {
    try {
      const response = await signupApi(credentials);
      console.log(response);
      if (response.success) {
        navigate("/signin");
        console.log("SignUp successful");
      } else {
        console.warn("SignUp failed");
      }
    } catch (error) {
      console.error("Error during signup:", error);
    }
  };
  return (
    <section className="grid justify-center bg-[#051724]  h-auto py-20">
      <div className="bg-[#030f18] m-auto w-[40vw] place-content-center border-[#f0cf7b] border-[0.1px] lg:w-[500px] h-auto rounded-lg  px-[30px] flex flex-col md:border border-grey-400 md:pt-[25px] py-[50px] mx-[auto]">
        <div className="flex flex-col items-center">
          <img
            src="https://app.jollofradio.com/assets/jollofradio-horizontal.cc936d7a.png"
            className="w-[100px] cursor-pointer"
            alt="Jollof.M"
          />
          <span className="text-white text-[20px] font-normal text-center md:mt-[15px] mb-10 capitalize">
            Sign Up as user
          </span>
        </div>
        <div className="flex flex-col pt-0">
          {/* First and Last Name  */}
          <div className="flex gap-4">
            <div className="flex flex-col w-full space-y-[12px]">
              <label htmlFor="username" className="text-white text-[12px]">
                First Name<span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                required=""
                value={credentials.first_name}
                onChange={(e) => {
                  setCredentials((pre) => ({
                    ...pre,
                    first_name: e.target.value,
                  }));
                }}
                placeholder="First Name"
                className="bg-[#0d1921] rounded-sm border-0 focus:ring-transparent focus:border-0 text-white w-full h-[40px] text-md md:px-4 placeholder:text-[#252f34]"
              />
            </div>

            <div className="flex flex-col w-full space-y-[14px]">
              <label htmlFor="username" className="text-white text-[12px]">
                Last Name <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                required=""
                value={credentials.last_name}
                onChange={(e) => {
                  setCredentials((pre) => ({
                    ...pre,
                    last_name: e.target.value,
                  }));
                }}
                placeholder="Last Name"
                className="bg-[#0d1921] rounded-sm border-0 focus:ring-transparent focus:border-0 text-white w-full h-[40px] text-md md:px-4 placeholder:text-[#252f34]"
              />
            </div>
          </div>
          {/* First and Last Name  */}
          {/* Email Address  */}
          <div className="flex flex-col w-full space-y-[10px] py-2">
            <label htmlFor="username" className="text-white text-[12px]">
              Email Address <span className="text-red-600">*</span>
            </label>
            <input
              type="email"
              name="email"
              required=""
              value={credentials.email}
              onChange={(e) => {
                setCredentials((pre) => ({
                  ...pre,
                  email: e.target.value,
                }));
              }}
              className="bg-[#0d1921] rounded-sm border-0 focus:ring-transparent focus:border-0 text-white w-full h-[40px] text-md md:px-4 placeholder:text-[#252f34]"
              placeholder="example@gmail.com"
            />
          </div>
          {/* Email Address  */}
          {/* Telephone */}
          <div className="flex flex-col w-full space-y-[10px] py-2">
            <label htmlFor="username" className="text-white text-[12px]">
              Phone Number
            </label>
            <input
              type="tel"
              name="phone"
              required=""
              value={credentials.phone}
              onChange={(e) => {
                setCredentials((pre) => ({
                  ...pre,
                  phone: e.target.value,
                }));
              }}
              className="bg-[#0d1921] rounded-sm border-0 focus:ring-transparent focus:border-0 text-white w-full h-[40px] text-md md:px-4 placeholder:text-[#252f34]"
              placeholder="example@gmail.com"
            />
          </div>
          {/* Telephone */}
          {/* Country - State - City */}
          <div className="flex gap-4">
            <div className="flex flex-col w-full space-y-[12px]">
              <label htmlFor="username" className="text-white text-[12px]">
                Country
              </label>
              <input
                type="text"
                required=""
                placeholder="Country"
                value={credentials.country}
                onChange={(e) => {
                  setCredentials((pre) => ({
                    ...pre,
                    country: e.target.value,
                  }));
                }}
                className="bg-[#0d1921] rounded-sm border-0 focus:ring-transparent focus:border-0 text-white w-full h-[40px] text-md md:px-4 placeholder:text-[#252f34]"
              />
            </div>
            <div className="flex flex-col w-full space-y-[12px]">
              <label htmlFor="username" className="text-white text-[12px]">
                State
              </label>
              <input
                type="text"
                required=""
                placeholder="State"
                value={credentials.state}
                onChange={(e) => {
                  setCredentials((pre) => ({
                    ...pre,
                    state: e.target.value,
                  }));
                }}
                className="bg-[#0d1921] rounded-sm border-0 focus:ring-transparent focus:border-0 text-white w-full h-[40px] text-md md:px-4 placeholder:text-[#252f34]"
              />
            </div>

            <div className="flex flex-col w-full space-y-[14px]">
              <label htmlFor="username" className="text-white text-[12px]">
                City
              </label>
              <input
                type="text"
                required=""
                placeholder="City"
                value={credentials.city}
                onChange={(e) => {
                  setCredentials((pre) => ({
                    ...pre,
                    city: e.target.value,
                  }));
                }}
                className="bg-[#0d1921] rounded-sm border-0 focus:ring-transparent focus:border-0 text-white w-full h-[40px] text-md md:px-4 placeholder:text-[#252f34]"
              />
            </div>
          </div>
          {/* Country - State - City */}

          {/* Password */}
          <div className="flex flex-col py-2 space-y-[10px] relative">
            <label htmlFor="password" className="text-white text-[12px]">
              Password <span className="text-red-600">*</span>
            </label>
            <input
              type={viewPassword ? "text" : "password"}
              name="password"
              required=""
              value={credentials.password}
              onChange={(e) => {
                setCredentials((pre) => ({
                  ...pre,
                  password: e.target.value,
                }));
              }}
              className="bg-[#0d1921] rounded-sm border-0 focus:ring-transparent focus:border-0 text-white w-full h-[40px] text-md md:px-4 placeholder:text-[#252f34]"
              placeholder="XXXXXXX"
            />
            <div className="absolute right-0 top-[50%] transform translate-y-[-50%] h-[30px] text-[#ffffff46] text-[20px] pr-[10px] flex flex-cols items-center">
              <FontAwesomeIcon
                onClick={() => setViewPassword(!viewPassword)}
                icon={viewPassword ? faEye : faEyeSlash}
                size={"xs"}
                className="cursor-pointer"
              />
            </div>
          </div>
          {/* Password */}
          <div className="flex items-center justify-between pt-1 pb-[19px]">
            <Link to={"/signin"} className="text-[#f0cf7b] text-[12px]">
              {" "}
              Already have an account? Sign in.
            </Link>
          </div>
          <div className="flex gap-3 py-5">
            <input
              type="checkbox"
              className="h-10"
              checked={credentials.checkbox}
              onChange={(e) => {
                setCredentials((pre) => ({
                  ...pre,
                  checkbox: e.target.checked,
                }));
              }}
            />
            <span className="text-white">
              I hereby accept to the privacy polices and also the terms and
              conditions of JollofRadio
            </span>
          </div>
          <div className="mx-auto mb-[25px]">
            <button
              onClick={() => SignUp()}
              className="bg-[#f0cf7b] py-[13px] px-[57px] font-medium text-[13px] rounded-sm hover:bg-[#a58e55]"
            >
              Sign Up
            </button>
          </div>
          {/* <div className="flex flex-col items-center justify-center">
            <span className="text-white text-[15px] mb-[20px]">or</span>
            <button
              type="button"
              onClick={() => alert("Coming Soon")}
              className="flex space-x-4 items-center text-white border border-white w-full justify-center py-[10px] rounded-full transition ease-in-out bg-transparent hover:bg-[#ffffff44]"
            >
              <img
                src="https://app.jollofradio.com/images/svg/google.svg"
                className="h-[20px] w-[20px]"
                height="0"
                width="0"
                alt="Google"
              />
              <span>Continue with Google</span>
            </button>
          </div> */}
        </div>
      </div>
    </section>
  );
};

export default SignUp;
