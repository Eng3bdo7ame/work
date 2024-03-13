import React from "react";
import { useEffect, useState } from "react";
import { Plus, TrashSimple, X } from "@phosphor-icons/react";
import api from "../../../ApiUrl";
import { useI18nContext } from "../../../context/i18n-context";
import { fetchCenters } from "../../../store/slices/centerSlice";
import { useDispatch, useSelector } from "react-redux";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import FormSelect from "../../../components/form/FormSelect";
import FormNumber from "../../../components/form/FormNumber";
import FormPic from "../../../components/form/FormPic";
import FormText from "../../../components/form/FormText";
import FormBtnIcon from "../../../components/form/FormBtnIcon";
import FormEmail from "../../../components/form/FormEmail";
import FormPassword from "../../../components/form/FormPassword";

export default function CreateTeacher({ closeModal, role, modal }) {
  const dispatch = useDispatch();
  const centersDataOrdered = useSelector((state) => state.centers.centers);
  const centersData = centersDataOrdered.map((item) => ({
    value: item.id,
    label: item.name,
  }));

  useEffect(() => {
    dispatch(fetchCenters());
  }, [dispatch]);
  
  const refreshData = () => {
    dispatch(fetchCenters());
  };

  // console.log("centersDataOrdered", centersDataOrdered);

  const { t } = useI18nContext();
  const [formData, setFormData] = useState({
    centerId: "",
    fullName: "",
    ssn: "",
    role: "",
    gender: "",
    bod: "",
    address: "",
    phone1: "",
    phone2: "",
    phone3: "",
    phone4: "",
    email: "",
    notes: "",
    salary: 0,
    Incentive: 0,
    discount: 0,
    dueAmount: 0,
    activated: true,
    file: null,
  });

  const [errorMsg, setErrorMsg] = useState("");
  const [showError, setShowError] = useState(false);

  const createTeacher = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post("/Teacher/Add", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log(response);

      // Assuming the API response includes the newly created teacher data
      const newTeacher = response.data;

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
    // console.log(formData);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    setFormData((prevData) => ({
      ...prevData,
      file,
    }));
    console.log(file);
  };

  useEffect(() => {
    // getAdmins();
  }, []);

  return (
    <>
      {/* Create modal */}
      <div
        className={`overflow-y-auto overflow-x-hidden duration-200 ease-linear
        absolute top-1/2 -translate-x-1/2 -translate-y-1/2
        z-50 justify-center items-center ${modal ? "left-1/2" : "-left-[100%]"}
        bg-black bg-opacity-40 w-full h-full `}
      >
        <div
          className={`CreateCenter p-4 w-full max-w-2xl pb-10 bg-white
           dark:bg-gray-800 rounded-r-lg duration-200 ease-linear
           ${modal ? "absolute left-0" : "absolute -left-[100%]"}
           h-screen overflow-auto`}
          dir="rtl"
        >
          {/* Modal content */}
          <div className="relative p-4 bg-white dark:bg-gray-800 sm:p-5">
            {/* Modal header */}
            <div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white outline-none focus:border-gray-600 dark:focus:border-gray-100 duration-100 ease-linear">
                {t("teachersForm.createTeacher")}
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
            <form onSubmit={createTeacher}>
              <div className="grid gap-4 mb-4 sm:grid-cols-2">
                {/* full name */}
                <FormText
                  label={t("teachersForm.fullName")}
                  name="fullName"
                  value={formData.fullName}
                  placeholder="محمد احمد"
                  required=""
                  onChange={handleChange}
                />
                {/*     username: "اسم المستخدم",
                 */}

                <FormText
                  label={t("teachersForm.username")}
                  name="username"
                  value={formData.username}
                  placeholder={t("teachersForm.uniqueUsername")}
                  required=""
                  onChange={handleChange}
                />
                {/* email */}
                <FormEmail
                  label={t("teachersForm.email")}
                  value={formData.email}
                  onChange={handleChange}
                />

                {/* password */}
                <FormPassword
                  label={t("teachersForm.password")}
                  name="password"
                  value={formData.pasword}
                  placeholder="كلمة مرور"
                  required=""
                  onChange={handleChange}
                />

                {/* centers */}
                <FormSelect
                  selectLabel={t("teachersForm.center")}
                  handleChange={handleChange}
                  options={centersData}
                />
                <FormNumber
                  label={t("teachersForm.phone1")}
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  placeholder="01011560461"
                  required=""
                  onChange={handleChange}
                />
                <FormNumber
                  label={t("teachersForm.phone2")}
                  name="secondPhoneNumber"
                  value={formData.secondPhoneNumber}
                  placeholder="01011560461"
                  required=""
                  onChange={handleChange}
                />
                <FormNumber
                  label={t("teachersForm.phone3")}
                  name="phone3"
                  value={formData.phone3}
                  placeholder="01011560461"
                  required=""
                  onChange={handleChange}
                />
                <FormNumber
                  label={t("teachersForm.phone4")}
                  name="phone4"
                  value={formData.phone4}
                  placeholder="01011560461"
                  required=""
                  onChange={handleChange}
                />
                <FormSelect
                  selectLabel={t("teachersForm.gender")}
                  handleChange={handleChange}
                  options={[
                    { value: "male", label: t("teachersForm.male") },
                    { value: "female", label: t("teachersForm.female") },
                  ]}
                />

                <FormNumber
                  label={t("teachersForm.ssn")}
                  name="ssn"
                  value={formData.ssn}
                  placeholder="01011560461"
                  required=""
                  onChange={handleChange}
                />

                <FormText
                  label={t("teachersForm.teachingPlace")}
                  name="teachingPlace"
                  value={formData.teachingPlace}
                  placeholder="مدرسة السلام"
                  required=""
                  onChange={handleChange}
                />

                <FormSelect
                  selectLabel={t("teachersForm.accountsMethod")}
                  handleChange={handleChange}
                  options={[
                    { value: "normal", label: t("teachersForm.normal") },
                    {
                      value: "exceptional",
                      label: t("teachersForm.exceptional"),
                    },
                  ]}
                />

                <FormSelect
                  selectLabel={t("teachersForm.accounts")}
                  handleChange={handleChange}
                  options={[
                    { value: "daily", label: t("teachersForm.daily") },
                    { value: "monthly", label: t("teachersForm.monthly") },
                  ]}
                />

                <FormPic
                  label={t("teachersForm.uploadPic")}
                  name="file-upload"
                  onChange={handleFileUpload}
                  file={formData.file}
                />
              </div>

              <FormBtnIcon
                label={t("teachersForm.addTeacher")}
                icon={<Plus size={18} weight="bold" />}
              />
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
