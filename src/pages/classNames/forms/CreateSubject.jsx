import { useState } from "react";
import { Plus, X } from "@phosphor-icons/react";
import api from "../../../ApiUrl";

export default function CreateSubject({ closeModal, refreshData, role }) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    username: "",
    email: "",
    password: "",
    passwordConfirm: "",
    nationalId: "",
    nationality: "",
    job: "",
    description: "",
  });

  const createUser = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post("/SubjectsName/AddAsync", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log(response);

      // Assuming the API response includes the newly created user data
      const newUser = response.data;

      // Optionally, you can refresh the data by calling the refreshData function
      refreshData();

      // Close the modal or perform any other actions
      closeModal();
    } catch (error) {
      console.error("An error occurred:", error);
      // Handle error appropriately, e.g., display an error message
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    console.log(formData);
  };

  return (
    <>
      {/* Create modal */}
      <div
        className={`overflow-y-auto overflow-x-hidden 
        absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
        z-50 justify-center items-center top
        w-full h-full bg-black bg-opacity-40`}
      >
        <div
          className="CreateUser absolute top-2/3 sm:top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-4 w-full max-w-2xl pb-10"
          dir="rtl"
        >
          {/* Modal content */}
          <div className="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
            {/* Modal header */}
            <div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                إضافة مادة
              </h3>
              <button
                type="button"
                onClick={closeModal}
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 mr-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
              >
                <X size={18} weight="bold" />
                <span className="sr-only">Close modal</span>
              </button>
            </div>
            {/* Modal body */}
            <form onSubmit={createUser}>
              <div className="grid gap-4 mb-4 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="name"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    الاسم
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    className="bg-gray-50 border border-gray-300
                    text-gray-900 text-sm rounded-lg
                    block w-full p-2.5 dark:bg-gray-700
                    dark:border-gray-600 dark:placeholder-gray-400 
                    dark:text-white outline-none 
                    focus:border-gray-600 dark:focus:border-gray-100 
                    duration-100 ease-linear"
                    placeholder="محمد احمد"
                    required=""
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label
                    htmlFor="phone"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    الهاتف
                  </label>
                  <input
                    type="number"
                    name="phone"
                    id="phone"
                    className="bg-gray-50 border border-gray-300
                    text-gray-900 text-sm rounded-lg
                    block w-full p-2.5 dark:bg-gray-700
                    dark:border-gray-600 dark:placeholder-gray-400 
                    dark:text-white outline-none 
                    focus:border-gray-600 dark:focus:border-gray-100 
                    duration-100 ease-linear"
                    placeholder="01011560461"
                    required=""
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label
                    htmlFor="username"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    اسم المستخدم
                  </label>
                  <input
                    type="text"
                    name="username"
                    id="username"
                    className="bg-gray-50 border border-gray-300
                    text-gray-900 text-sm rounded-lg
                    block w-full p-2.5 dark:bg-gray-700
                    dark:border-gray-600 dark:placeholder-gray-400 
                    dark:text-white outline-none 
                    focus:border-gray-600 dark:focus:border-gray-100 
                    duration-100 ease-linear"
                    placeholder="user2501"
                    required=""
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    الايميل
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="bg-gray-50 border border-gray-300
                    text-gray-900 text-sm rounded-lg
                    block w-full p-2.5 dark:bg-gray-700
                    dark:border-gray-600 dark:placeholder-gray-400 
                    dark:text-white outline-none 
                    focus:border-gray-600 dark:focus:border-gray-100 
                    duration-100 ease-linear"
                    placeholder="user@example.com"
                    required=""
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    كلمة المرور
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    className="bg-gray-50 border border-gray-300
                    text-gray-900 text-sm rounded-lg
                    block w-full p-2.5 dark:bg-gray-700
                    dark:border-gray-600 dark:placeholder-gray-400 
                    dark:text-white outline-none 
                    focus:border-gray-600 dark:focus:border-gray-100 
                    duration-100 ease-linear"
                    placeholder="**************"
                    required=""
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label
                    htmlFor="passwordConfirm"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    تاكيد كلمة المرور
                  </label>
                  <input
                    type="password"
                    name="passwordConfirm"
                    id="passwordConfirm"
                    className="bg-gray-50 border border-gray-300
                    text-gray-900 text-sm rounded-lg
                    block w-full p-2.5 dark:bg-gray-700
                    dark:border-gray-600 dark:placeholder-gray-400 
                    dark:text-white outline-none 
                    focus:border-gray-600 dark:focus:border-gray-100 
                    duration-100 ease-linear"
                    placeholder="**************"
                    required=""
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label
                    htmlFor="idNumber"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    الرقم القومي
                  </label>
                  <input
                    type="number"
                    name="nationalId"
                    id="nationalId"
                    className="bg-gray-50 border border-gray-300
                    text-gray-900 text-sm rounded-lg
                    block w-full p-2.5 dark:bg-gray-700
                    dark:border-gray-600 dark:placeholder-gray-400 
                    dark:text-white outline-none 
                    focus:border-gray-600 dark:focus:border-gray-100 
                    duration-100 ease-linear"
                    placeholder="6489419861896"
                    required=""
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label
                    htmlFor="nationality"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    الجنسية
                  </label>
                  <select
                    id="nationality"
                    className="bg-gray-50 border border-gray-300
                     text-gray-900 text-sm rounded-lg 
                     focus:ring-orange-500 focus:border-orange-500
                     block w-full p-2.5 dark:bg-gray-700 
                     dark:border-gray-600 dark:placeholder-gray-400
                     dark:text-white dark:focus:ring-orange-500 
                     dark:focus:border-orange-500 outline-none"
                  >
                    <option selected="">اختر الجنسية</option>
                    <option value="eg">مصري</option>
                    <option value="">سعودي</option>
                    <option value="">اماراتي</option>
                    <option value="">كويتي</option>
                  </select>
                </div>
                <div>
                  <label
                    htmlFor="nationality"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    الوظيفة
                  </label>
                  <select
                    id="nationality"
                    className="bg-gray-50 border border-gray-300
                     text-gray-900 text-sm rounded-lg 
                     focus:ring-orange-500 focus:border-orange-500
                     block w-full p-2.5 dark:bg-gray-700 
                     dark:border-gray-600 dark:placeholder-gray-400
                     dark:text-white dark:focus:ring-orange-500 
                     dark:focus:border-orange-500 outline-none"
                  >
                    <option selected="">اختر الوظيفة</option>
                    <option value="eg">محاسب</option>
                    <option value="">مدخل بيانات</option>
                  </select>
                </div>
                <div className="sm:col-span-2">
                  <label
                    htmlFor="description"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    ملاحظات
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    rows={4}
                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-orange-500 focus:border-orange-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-orange-500 dark:focus:border-orange-500"
                    placeholder="اكتب ملاحظاتك حول الشخص هنا"
                    defaultValue={""}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <button
                type="submit"
                className="text-white gap-2 inline-flex items-center bg-themeColor hover:bg-orange-800 focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-orange-600 dark:hover:bg-orange-700 dark:focus:ring-orange-800"
              >
                <Plus size={18} weight="bold" />
                إضافة الشخص
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
