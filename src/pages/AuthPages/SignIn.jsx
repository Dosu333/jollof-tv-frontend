import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getCookie, setCookie } from "../../api/utility";
import { loginApi } from "../../api/api";
import { toast } from "react-toastify";
import { jwtDecode } from "jwt-decode";

const SignIn = () => {
  const [viewPassword, setViewPassword] = useState(false);
  const navigate = useNavigate();

  // const { auth, setAuth } = useAuth();
  let access = getCookie("id1");
  let refresh = getCookie("id2");

  const [credentials, setCredentials] = useState({
    email:"",
    password:""
  })
  const [errorMsg, setErrorMsg] = useState("");

  // const reDirect = () => {
  //   if (access && refresh) {
  //     navigate("/");
  //   }
  //   toast.warning("Logout to visit Login Screen.", {
  //     position: "top-right",
  //     autoClose: 3000,
  //     toastId: "login",
  //     hideProgressBar: true,
  //   });
  // };
  // useEffect(() => {
  //   reDirect();
  // }, [re]);

  const EMAIL_REGEX = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;

  const errorCheck = () => {
    let validEmail = EMAIL_REGEX.test(credentials.email);
    let iserror = false;

    if (credentials.email.length < 3 || !validEmail) {
      setErrorMsg("Kindly input a valid email Address");
  
      iserror = true;
    } else if (credentials.password.length < 6) {
      setErrorMsg("Password Should be at least 6 characters");
      iserror = true;
    }

    if (iserror) {
      return false;
    }
    return true;
  };

  function LogIn() {
    if (errorCheck()) {
      console.log("No error, calling handleSignUp");
      handleSignIn();
    } else {
      toast.error("Fill in all Fields Correctly!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
      });
      console.log("Error", errorMsg);
      console.log("Error found, showing alert");
    }
  }

  const handleSignIn = async () => {
    try {
      const response = await loginApi(credentials);
      const access = response?.access;
      const refresh = response?.refresh;
      const userInfo = jwtDecode(refresh);
      console.log("info", userInfo.email, userInfo.fullname);
      setCookie("id1", access, 3);
      setCookie("id2", refresh, 3);
      const updatedUserDetails = {
        id: "",
        fullname: userInfo.fullname,
        userEmail: userInfo.email,
      };
      // setAuth((prevAuth) => ({ ...prevAuth, user: updatedUserDetails }));
      navigate("/");
    } catch (error) {
      console.error("Error during signup:", error);
    }
  };

  return (
    <section className="grid justify-center bg-[#051724]  h-[100vh]">
      <div className="bg-[#030f18] m-auto w-[90vw] place-content-center border-[#f0cf7b] border-[0.1px] lg:w-[500px] h-auto rounded-lg  px-[30px] flex flex-col md:border border-grey-400 md:pt-[25px] py-[50px] mx-[auto]">
        <div className="flex flex-col items-center">
          <img
            src="https://app.jollofradio.com/assets/jollofradio-horizontal.cc936d7a.png"
            className="w-[100px] cursor-pointer"
            alt="Jollof.M"
          />
          <span className="text-white text-[20px] font-normal text-center md:mt-[15px] mb-10 capitalize">
          Login to Continue
          </span>
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
              value={credentials.email}
              onChange={(e) => {
                setCredentials((pre) => ({
                  ...pre,
                  email: e.target.value,
                }));
              }}
              className="bg-[#0d1921] rounded-sm border-0 focus:ring-transparent focus:border-0 text-white w-full h-[40px] text-md px-2 placeholder:text-[#252f34]"
              placeholder="example@gmail.com"
            />
          </div>

          <div className="flex flex-col py-2 space-y-[10px] relative">
            <label htmlFor="password" className="text-white text-[12px]">
              Password
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
              className="bg-[#0d1921] rounded-sm border-0 focus:ring-transparent focus:border-0 text-white w-full h-[40px] text-md px-2 placeholder:text-[#252f34]"
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
          <div className="flex items-center justify-between pt-0.5 pb-[19px]">
            <Link to={"/signup"} className="text-[#f0cf7b] text-[12px]">
              Don't have an account? Sign up.
            </Link>
            {/* <Link
              to={"/forgotten-password-email"}
              className="text-[#f0cf7b] text-[12px]"
            >
              Forgot Password?
            </Link> */}
          </div>
          <div className="mx-auto mb-[25px]">
            <button
              onClick={() => LogIn()}
              className="bg-[#f0cf7b] py-[13px] px-[57px] font-medium text-[13px] rounded-sm hover:bg-[#a58e55]"
            >
              Sign in
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignIn;
