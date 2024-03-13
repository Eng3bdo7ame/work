/*
<div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white outline-none focus:border-gray-600 dark:focus:border-gray-100 duration-100 ease-linear"
                  >
                
                    {t("teachersForm.email")}
                  </label>
                  <input
                    type="email"
                    name="name"
                    id="name"
                    value={formData.name}
                    className="bg-gray-50 border border-gray-300
                        text-gray-900 text-sm rounded-md
                        block w-full p-2.5 dark:bg-gray-700
                        dark:border-gray-600 dark:placeholder-gray-400 
                        dark:text-white outline-none 
                        focus:border-orange-400 dark:focus:border-orange-400
                        duration-100 ease-linear"
                    placeholder="email@gmail.com"
                    required=""
                    onChange={handleChange}
                  />
                </div>
*/

import React from "react";
const FormEmail = ({ value, handleChange, label }) => {
  return (
    <div>
      <label
        htmlFor="email"
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white outline-none focus:border-gray-600 dark:focus:border-gray-100 duration-100 ease-linear"
      >
        {label}
      </label>
      <input
        type="email"
        name="name"
        id="name"
        value={value}
        className="bg-gray-50 border border-gray-300
                    text-gray-900 text-sm rounded-md
                    block w-full p-2.5 dark:bg-gray-700
                    dark:border-gray-600 dark:placeholder-gray-400 
                    dark:text-white outline-none 
                    focus:border-orange-400 dark:focus:border-orange-400
                    duration-100 ease-linear"
        placeholder="email@gmail.com"
        required=""
        onChange={handleChange}
      />
    </div>
  );
};

export default FormEmail;
