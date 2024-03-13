import { useEffect, useState } from "react";
import { Plus, TrashSimple, X } from "@phosphor-icons/react";
import api from "../../../ApiUrl";
import { useI18nContext } from "../../../context/i18n-context";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import Permission from "../../../components/Permission";
import PermissionHead from "../../../components/PermissionHead";
import FormSelect from "../../../components/form/FormSelect";

export default function CreateSubject({
  refreshData,
  closeModal,
  subject,
  modal,
}) {
  const { t } = useI18nContext();
  const [formData, setFormData] = useState({
    subject: "",
    stage: "",
  });

  const [selectedSubjects, setSelectedSubjects] = useState([]);

  const [errorMsg, setErrorMsg] = useState("");
  const [showError, setShowError] = useState(false);

  const createSubject = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post("/Subjects/Add", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log(response);

      // Assuming the API response includes the newly created center data
      const newSubject = response.data;

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

  const handleSubjectSelect = (selectedSubject) => {
    setSelectedSubjects((prevSelectedSubjects) => [
      ...prevSelectedSubjects,
      {
        label: selectedSubject.label,
        imageSrc: selectedSubject.imageSrc,
      },
    ]);
  };

  const handleSubjectRemove = (removedSubject) => {
    setSelectedSubjects((prevSelected) =>
      prevSelected.filter((subject) => subject !== removedSubject)
    );
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
                {t("subjectsForm.createSubject")}
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
            <form onSubmit={createSubject}>
              <div className="grid gap-4 mb-4 sm:grid-cols-1">
                {/* المراحل */}
                <FormSelect
                  selectLabel={t("subjectsForm.stage")}
                  handleChange={handleChange}
                  options={t("subjectsForm.stages")}
                />
                {/* التخصصات */}
                <FormSelect
                  selectLabel={t("subjectsForm.specialty")}
                  handleChange={handleChange}
                  options={t("subjectsForm.specialties")}
                />
                {/* الصفوف */}
                <FormSelect
                  selectLabel={t("subjectsForm.class")}
                  handleChange={handleChange}
                  options={t("subjectsForm.classes")}
                />
                {/* الشعبة */}
                <FormSelect
                  selectLabel={t("subjectsForm.division")}
                  handleChange={handleChange}
                  options={t("subjectsForm.divisions")}
                />
                {/* المواد */}
                <FormSelect
                  selectLabel={t("subjectsForm.subject")}
                  handleChange={(selectedSubject) =>
                    handleSubjectSelect(selectedSubject)
                  }
                  options={t("subjectsForm.subjects")}
                />

                <div className="mt-4">
                  <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">
                    {t("selectedSubjects")}
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    {selectedSubjects.map((subject) => (
                      <div
                        key={subject.value}
                        className="flex items-center gap-2"
                      >
                        <img
                          src={subject.imageSrc}
                          alt={subject.label}
                          className="w-6 h-6 object-cover rounded-full"
                        />
                        <span>{subject.label}</span>
                        <button
                          type="button"
                          onClick={() => handleSubjectRemove(subject)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <TrashSimple size={16} weight="bold" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* سيكون هنا المواد المختاره مع الصفوف والمراحل والعدد */}
              </div>
              <div className="flex justify-center mx-auto w-full mt-10">
                <button
                  type="submit"
                  className="text-white gap-2 inline-flex items-center
                  bg-orange-600 hover:bg-orange-700 
                  outline-none font-medium rounded-md 
                  text-sm px-5 py-2.5 text-center 
                  ease-linear duration-100"
                >
                  <Plus size={18} weight="bold" />
                  {t("subjectsForm.createSubject")}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
