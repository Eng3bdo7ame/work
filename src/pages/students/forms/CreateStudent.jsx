import React from "react";
import { useEffect, useState } from "react";
import { Plus, TrashSimple, X } from "@phosphor-icons/react";
import api from "../../../ApiUrl";
import { useI18nContext } from "../../../context/i18n-context";
import { fetchCenters } from "../../../store/slices/centerSlice";
import { useDispatch, useSelector } from "react-redux";

import FormSelect from "../../../components/form/FormSelect";
import FormNumber from "../../../components/form/FormNumber";
import FormPic from "../../../components/form/FormPic";
import FormText from "../../../components/form/FormText";
import FormBtnIcon from "../../../components/form/FormBtnIcon";
import FormEmail from "../../../components/form/FormEmail";
import FormPassword from "../../../components/form/FormPassword";
import FormPicProfile from "../../../components/form/FormPicProfile";

export default function CreateStudent({ closeModal, role, modal }) {
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
    role: "Student",
    gender: "",
    birthDate: "",
    stage: "",
    class: "",
    phone: "",
    phoneWhats1: "",
    phoneParent: "",
    phoneWhats2: "",
    email: "",
    password: "",
    confirmPassword: "",
    studyType: "",
    studyPlace: "",
    nationalId: "",
    address: "",
    profilePic: null,
    proofChar: "",
    notes: "",
  });

  const [errorMsg, setErrorMsg] = useState("");
  const [showError, setShowError] = useState(false);

  const createStudent = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post("/Student/Add", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log(response);

      // Assuming the API response includes the newly created student data
      const newStudent = response.data;

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
                {t("studentsForm.createStudent")}
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
            <form onSubmit={createStudent}>
              <div className="grid gap-4 mb-4 sm:grid-cols-2 items-center">
                {/* الصورة الشخصية */}
                <div className="sm:col-span-2">
                  <FormPicProfile
                    label={t("studentsForm.uploadProfilePic")}
                    name="file-upload"
                    onChange={handleFileUpload}
                    file={formData.file}
                  />
                </div>

                {/* الاسم كامل */}
                <FormText
                  label={t("studentsForm.fullName")}
                  name="fullName"
                  value={formData.fullName}
                  placeholder="محمد احمد"
                  required=""
                  onChange={handleChange}
                />
                {/*     username: "اسم المستخدم",
                 */}

                <FormText
                  label={t("studentsForm.username")}
                  name="username"
                  value={formData.username}
                  placeholder={t("studentsForm.uniqueUsername")}
                  required=""
                  onChange={handleChange}
                />

                {/* email */}
                <FormEmail
                  label={t("studentsForm.email")}
                  value={formData.email}
                  onChange={handleChange}
                />

                {/* centers */}
                <FormSelect
                  selectLabel={t("studentsForm.center")}
                  handleChange={handleChange}
                  value={formData.centerId}
                  name={"centerId"}
                  options={centersData}
                />

                {/* password */}
                <FormPassword
                  label={t("studentsForm.password")}
                  name="password"
                  value={formData.password}
                  placeholder="****************"
                  required=""
                  onChange={handleChange}
                />

                {/* confirm password */}
                <FormPassword
                  label={t("studentsForm.confirmPassword")}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  placeholder="****************"
                  required=""
                  onChange={handleChange}
                />
                {/* هاتف الطالب */}
                <FormNumber
                  label={t("studentsForm.phone")}
                  name="phone"
                  value={formData.phone}
                  placeholder="01011560461"
                  required=""
                  onChange={handleChange}
                />
                {/* هاتف ولي الامر */}
                <FormNumber
                  label={t("studentsForm.phoneParent")}
                  name="phoneParent"
                  value={formData.phoneParent}
                  placeholder="01011560461"
                  required=""
                  onChange={handleChange}
                />
                {/* هاتف الطالب واتس */}
                <FormNumber
                  label={t("studentsForm.phoneWhats1")}
                  name="phoneWhats1"
                  value={formData.phoneWhats1}
                  placeholder="01011560461"
                  required=""
                  onChange={handleChange}
                />
                {/* هاتف ولي الامر واتس */}
                <FormNumber
                  label={t("studentsForm.phoneWhats2")}
                  name="phoneWhats2"
                  value={formData.phoneWhats2}
                  placeholder="01011560461"
                  required=""
                  onChange={handleChange}
                />
                {/* النوع */}
                <FormSelect
                  selectLabel={t("studentsForm.gender")}
                  handleChange={handleChange}
                  value={formData.gender}
                  name={"gender"}
                  options={[
                    { value: "male", label: t("studentsForm.male") },
                    { value: "female", label: t("studentsForm.female") },
                  ]}
                />
                {/* مكان التدريس */}
                <FormSelect
                  selectLabel={t("studentsForm.studyPlaceHead")}
                  handleChange={handleChange}
                  options={t("studentsForm.studyPlace")}
                  value={formData.studyPlace}
                  name={"studyPlace"}
                />
                {/* نوع التعليم */}
                <FormSelect
                  selectLabel={t("studentsForm.studyTypeHead")}
                  handleChange={handleChange}
                  options={t("studentsForm.studyType")}
                  value={formData.studyType}
                  name={"studyType"}
                />
                {/* المرحلة */}
                <FormSelect
                  selectLabel={t("studentsForm.studyTypeHead")}
                  handleChange={handleChange}
                  options={t("studentsForm.studyType")}
                  value={formData.studyType}
                  name={"studyType"}
                />
                {/* الصفوف */}
                <FormSelect
                  selectLabel={t("studentsForm.studyTypeHead")}
                  handleChange={handleChange}
                  options={t("studentsForm.studyType")}
                  value={formData.studyType}
                  name={"studyType"}
                />

                <FormNumber
                  label={t("studentsForm.nationalId")}
                  name="nationalId"
                  value={formData.nationalId}
                  placeholder="300121512185"
                  required=""
                  onChange={handleChange}
                />
                <div className="sm:col-span-2">
                  <FormPic
                    label={t("studentsForm.uploadProofPic")}
                    name="file-upload"
                    onChange={handleFileUpload}
                    file={formData.file}
                  />
                </div>
              </div>

              <FormBtnIcon
                label={t("studentsForm.addStudent")}
                icon={<Plus size={18} weight="bold" />}
              />
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
