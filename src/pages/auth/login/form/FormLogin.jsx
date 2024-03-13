import { Eye, EyeClosed } from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function FormLogin({
  buttonText,
  handlePasswordChange,
  handleEmailInput,
  handleSubmitLogin,
}) {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [showPass, setShowPass] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Perform validation checks
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (
      !isValidEmail(formData.email) &&
      !isValidUsername(formData.email)
    ) {
      newErrors.email = "Invalid email format";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      // Reset errors
      setErrors({});
      // Validation successful, submit the form
      // onButtonClicked(formData);
    }
    handleSubmitLogin(e);
  };

  // Helper function to validate email format
  const isValidEmail = (email) => {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(email);
  };

  const isValidUsername = (username) => {
    const usernamePattern = /^[a-zA-Z0-9]+$/;
    return usernamePattern.test(username);
  };

  const handleShowPass = () => {
    setShowPass(!showPass);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`relative overflow-hidden duration-150 ease-linear`}
    >
      <div className={`space-y-8 p-8 duration-150 ease-linear`}>
        <div className="relative" dir="ltr">
          <label
            htmlFor="email"
            className={`block font-semibold absolute 
          -top-7 right-0 py-0 px-1 ${
            errors.email ? "text-red-500" : "text-white"
          }`}
          >
            البريد الالكتروني
          </label>
          <input
            type="text"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            onInput={handleEmailInput}
            autoComplete={false}
            className={`w-full px-3 py-3 border-2 duration-150 ease-linear text-white
          bg-gray-900 rounded-md focus:border-orange-400 outline-none ${
            errors.email ? "border-red-500" : "border-gray-200"
          } placeholder:tracking-wide text-left mb-2`}
            placeholder="email@example.com"
            // placeholder="Enter email"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email}</p>
          )}
        </div>

        <div className="relative" dir="ltr">
          <label
            htmlFor="password"
            className={`block font-semibold absolute
          -top-7 right-0 py-0 px-1 ${
            errors.email ? "text-red-500" : "text-white"
          }`}
          >
            كلمة المرور
          </label>
          <input
            type={showPass ? "text" : "password"}
            id="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            onInput={handlePasswordChange}
            className={`w-full px-3 py-3 border-2 duration-150 ease-linear text-white
          bg-gray-900 rounded-md focus:border-orange-400 outline-none ${
            errors.password ? "border-red-500" : "border-gray-200"
          } placeholder:tracking-wide text-left`}
            // placeholder="Enter password"
            placeholder="***********"
          />
          <div
            className={`absolute top-full left-1 mt-1.5 ease-linear duration-100
            cursor-pointer text-sm font-bold text-gray-500 hover:text-gray-800`}
          >
            نسيت كلمة السر
          </div>
          <div
            className={`absolute top-1/2 right-2 text-gray-700
            -translate-x-1/2 -translate-y-1/2 cursor-pointer`}
          >
            {showPass ? (
              <Eye size={25} weight="bold" onClick={handleShowPass} />
            ) : (
              <EyeClosed size={25} weight="bold" onClick={handleShowPass} />
            )}
          </div>

          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password}</p>
          )}
        </div>

        <div>
          <button
            type="submit"
            className={`w-full bg-themeColor ease-linear duration-150 
            hover:bg-transparent hover:text-themeColor
            border-2 border-themeColor font-semibold
            text-gray-900 rounded-md py-2 tracking-wide mt-2`}
          >
            {buttonText}
          </button>
        </div>
      </div>
    </form>
  );
}
