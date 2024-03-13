import { useEffect, useState } from "react";
import FormLogin from "./form/FormLogin";
import api from "../../../ApiUrl";
import { useNavigate } from "react-router-dom";

import LogoWide from '../../../images/logoWide.png';



export default function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const handleEmailInput = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    props.loading(true);
    const requestData = {
      email: email,
      password: password,
    };

    try {
      const response = await api.post("/Authentications/LoginAsync", requestData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      //
      console.log(response);
      props.loading(true);
      const data = response.data.result;
      const token = data.token;
      const role = data.roles[0];
      const id = data.id;
      localStorage.setItem("token", token);
      localStorage.setItem("role", role);
      localStorage.setItem("id", id);
      props.loading(false);
      props.onLogIn();
    } catch (error) {
      setErrorMsg("An error occurred:", error);
      props.loading(false);
    }
  };

  useEffect(() => {
    const isTokenValid = localStorage.getItem("token");
    if (isTokenValid) {
      navigate(`${import.meta.env.VITE_PUBLIC_URL}/`);
    }
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-gray-900 border-2 rounded-xl shadow-md w-96" dir="rtl">
        {/* <img src={LogoWide} className="w-auto h-20 mx-auto mt-3"/> */}
        <div className="flex flex-col gap-2 p-3 items-center w-full text-white">
          <h1 className="font-medium text-base ">{errorMsg}</h1>
          <h1 className="font-semibold text-2xl">سجل دخول</h1>
          <p className="text-center font-medium text-base">
            الوصول إلى لوحة معلومات هاي ليفل اكاديمي باستخدام بريدك الإلكتروني
            او اسم المستخدم وكلمة المرور
          </p>
        </div>
        <FormLogin
          buttonText="تسجيل الدخول"
          handlePasswordChange={handlePasswordChange}
          handleEmailInput={handleEmailInput}
          handleSubmitLogin={handleLogin}
        />
      </div>
    </div>
  );
}
