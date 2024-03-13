import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ClassesTable from "./ClassesTable";
import api from "../../ApiUrl";
import CreateClass from "./forms/CreateClass";
import { useI18nContext } from "../../context/i18n-context";

export default function Classes({ Class }) {
  console.log("Classes -> class", Class);

  const [openCreate, setOpenCreate] = useState(false);
  const [openPreview, setOpenPreview] = useState(false);
  const [classesData, setClassesData] = useState([]);
  const { t } = useI18nContext();

  const navigate = useNavigate();

  const toggleOpenCreateModal = () => {
    setOpenCreate(!openCreate);
  };

  const toggleOpenPreviewModal = () => {
    setOpenPreview(!openPreview);
  };

  const handleGetSubjects = () => {
    api
      .get(`/Classes/GetAll`)
      .then((response) => {
        const dataFromServer = response.data.result;

        setClassesData(dataFromServer);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  useEffect(() => {
    handleGetSubjects();
  }, [navigate]);

  return (
    <div className={"text-white"}>
      <ClassesTable
        openCreate={toggleOpenCreateModal}
        openPreview={toggleOpenPreviewModal}
        ClassesData={classesData}
      />
      <CreateClass
        closeModal={toggleOpenCreateModal}
        modal={openCreate}
        Class={Class}
      />
      {/* 
      {openPreview && <PreviewUser closeModal={toggleOpenPreviewModal} />} */}
    </div>
  );
}
