import { useEffect, useState } from "react";
import { Plus, TrashSimple, X } from "@phosphor-icons/react";
import api from "../../../ApiUrl";
import { useI18nContext } from "../../../context/i18n-context";
import "react-tabs/style/react-tabs.css";
import FormText from "../../../components/form/FormText";

export default function CreateStage({ refreshData, closeModal, Stage, modal }) {
  const { t } = useI18nContext();
  const [formData, setFormData] = useState({
    stage: "",
    specialty: "",
  });

  const [errorMsg, setErrorMsg] = useState("");
  const [showError, setShowError] = useState(false);

  const createStage = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post("/Stages/Add", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log(response);

      // Assuming the API response includes the newly created center data
      const newStage = response.data;

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
                {t("stagesForm.createStage")}
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
            <form onSubmit={createStage}>
              <div className="grid gap-4 mb-4 sm:grid-cols-1">
                {/* اسم المرحلة */}
                <FormText
                  label={t("stagesForm.stageName")}
                  name="stage"
                  value={formData.stage}
                  placeholder={t("stagesForm.stageName")}
                  required=""
                  onChange={handleChange}
                />

                {/* اسم التخصص */}
                <FormText
                  label={t("stagesForm.specialtyName")}
                  name="specialty"
                  value={formData.specialty}
                  placeholder={t("stagesForm.specialtyName")}
                  required=""
                  onChange={handleChange}
                />
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
                  {t("stagesForm.createStage")}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
