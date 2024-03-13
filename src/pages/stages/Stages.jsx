import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import StagesTable from "./StagesTable";
import api from "../../ApiUrl";
import CreateStage from "./forms/CreateStage";
import { useI18nContext } from "../../context/i18n-context";

export default function Stages({ Stage }) {
  console.log("Stages -> stage", Stage);

  const [openCreate, setOpenCreate] = useState(false);
  const [openPreview, setOpenPreview] = useState(false);
  const [stagesData, setStagesData] = useState([]);
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
      .get(`/Stages/GetAll`)
      .then((response) => {
        const dataFromServer = response.data.result;

        setStagesData(dataFromServer);
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
      <StagesTable
        openCreate={toggleOpenCreateModal}
        openPreview={toggleOpenPreviewModal}
        StagesData={stagesData}
      />
      <CreateStage
        closeModal={toggleOpenCreateModal}
        modal={openCreate}
        Stage={Stage}
      />
      {/* 
      {openPreview && <PreviewUser closeModal={toggleOpenPreviewModal} />} */}
    </div>
  );
}
