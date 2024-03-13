import { TrashSimple, X } from "@phosphor-icons/react";
import ImgProfile from "../../../images/avatar/a-sm.jpg";
import { useState } from "react";
import EditIcon from "../../../images/customIcons/editIcon.svg";
import FormPreview from "../../../components/form/FormPreview";
import { useI18nContext } from "../../../context/i18n-context";
import { format, differenceInYears } from "date-fns";
import { ar } from "date-fns/locale";

export default function PreviewModerator({ closeModal, userData }) {
  const openDelete = () => {};
  const { t } = useI18nContext();

  console.log(userData);

  const birthDate = userData.birthDate ? new Date(userData.birthDate) : null;
  const today = new Date();
  const age = birthDate ? differenceInYears(today, "05 03 2001") : null;

  const detailsData = [
    {
      head: `${t("previewForm.moderatorsDetails.userName")} :`,
      value: userData.username || "لم يتم تحديده",
    },
    {
      head: `${t("previewForm.moderatorsDetails.email")} :`,
      value: userData.email || "لم يتم تحديده",
    },
    {
      head: `${t("previewForm.moderatorsDetails.gender")} :`,
      value: userData.gender || "لم يتم تحديده",
    },
    {
      head: `${t("previewForm.moderatorsDetails.birthDate")} :`,
      value: birthDate
        ? format(birthDate, "dd MMMM yyyy", { locale: ar })
        : "لم يتم تحديده",
    },
    {
      head: `${t("previewForm.moderatorsDetails.age")} :`,
      value:
        userData.age !== null
          ? `${age} ${t("previewForm.moderatorsDetails.years")}`
          : "لم يتم تحديده",
    },
    {
      head: `${t("previewForm.moderatorsDetails.role")} :`,
      value: userData.role || "لم يتم تحديده",
    },
    {
      head: `${t("previewForm.moderatorsDetails.phone")} :`,
      value: userData.phone || "لم يتم تحديده",
    },
    {
      head: `${t("previewForm.moderatorsDetails.nationality")} :`,
      value: userData.nationalty || "لم يتم تحديده",
    },
    {
      head: `${t("previewForm.moderatorsDetails.nationalId")} :`,
      value: userData.nationalId || "لم يتم تحديده",
    },
    {
      head: `${t("previewForm.moderatorsDetails.country")} :`,
      value: userData.country || "لم يتم تحديده",
    },
    {
      head: `${t("previewForm.moderatorsDetails.city")} :`,
      value: userData.city || "لم يتم تحديده",
    },
    
  ];

  return (
    <div>
      {/* Preview modal */}
      <div
        className={`overflow-y-auto overflow-x-hidden 
        absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
        z-50 justify-center items-center
        w-full h-full bg-black bg-opacity-40`}
      >
        <div
          className="PreviewUser absolute top-2/3 sm:top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-4 w-full max-w-2xl pb-10"
          dir="rtl"
        >
          {/* Modal content */}
          <div className="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
            {/* Modal header */}
            <div className="flex justify-end mb-4 rounded-t sm:mb-5">
              <div>
                <button
                  type="button"
                  onClick={closeModal}
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 inline-flex dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  <X size={18} weight="bold" className="w-5 h-5" />
                  <span className="sr-only">Close modal</span>
                </button>
              </div>
            </div>
            <div
              className={`text-lg text-white bg-themeColor md:text-xl mx-auto text-center
               dark:text-white dark:bg-themeColor p-2 mb-5 rounded-md `}
            >
              <h3 className="font-semibold ">{t("previewForm.title")}</h3>
            </div>
            <FormPreview
              t={t}
              details={detailsData}
              name={userData.name || "لم يتم تحديده"}
              role={userData.role || "لم يتم تحديده"}
              center={"الشهيد"}
            />
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <button
                  type="button"
                  className="gap-2 text-white inline-flex items-center justify-center bg-themeColor
                   hover:bg-orange-700 focus:ring-4 focus:outline-none duration-100 ease-linear
                   focus:ring-primary-300 font-medium rounded-lg text-sm px-5 
                   py-2.5 text-center dark:focus:ring-themeColor"
                >
                  <img src={EditIcon} className="w-5 h-5" />
                  <span className="font-bold text-base"> تعديل </span>
                </button>
              </div>
              <button
                type="button"
                className="gap-2 inline-flex items-center 
                text-white bg-red-600 hover:bg-red-700 
                focus:ring-4 focus:outline-none 
                focus:ring-red-300 font-medium duration-100 ease-linear
                rounded-lg text-sm px-5 py-2.5 text-center 
                dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-900"
              >
                <TrashSimple size={18} weight="bold" />
                <span className="font-bold text-base"> حذف </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
