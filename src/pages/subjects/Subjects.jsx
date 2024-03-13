import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../ApiUrl";
import { useI18nContext } from "../../context/i18n-context";
import CreateSubject from "./forms/CreateSubject";
import SubjectsTable from "./SubjectsTable";

export default function Subjects({ subject }) {
  console.log("Subjects -> subject", subject);

  const [openCreate, setOpenCreate] = useState(false);
  const [openPreview, setOpenPreview] = useState(false);
  const [subjectsData, setSubjectsData] = useState([]);
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
      .get(`/Authentications/GetAllSubjects`)
      .then((response) => {
        const dataFromServer = response.data.result;

        setSubjectsData(dataFromServer);
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
      <SubjectsTable
        SubjectsData={subjectsData}
        openCreate={toggleOpenCreateModal}
        openPreview={toggleOpenPreviewModal}
      />
      <CreateSubject
        closeModal={toggleOpenCreateModal}
        modal={openCreate}
        subject={subject}
      />
    </div>
  );
}
