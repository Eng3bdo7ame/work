import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import SubjectsNamesTable from "./SubjectsNamesTable";
import api from "../../ApiUrl";
import CreateSubjectName from "./forms/CreateSubjectName";
import { useI18nContext } from "../../context/i18n-context";

export default function SubjectsNames({ subjectName }) {
  console.log("Subjects -> subjectName", subjectName);

  const [openCreate, setOpenCreate] = useState(false);
  const [openPreview, setOpenPreview] = useState(false);
  const [subjectsNamesData, setSubjectsNamesData] = useState([]);
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
      .get(`/SubjectsName/GetAll`)
      .then((response) => {
        const dataFromServer = response.data.result;

        setSubjectsNamesData(dataFromServer);
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
      <SubjectsNamesTable
        openCreate={toggleOpenCreateModal}
        openPreview={toggleOpenPreviewModal}
        SubjectsNamesData={subjectsNamesData}
      />
      <CreateSubjectName
        closeModal={toggleOpenCreateModal}
        modal={openCreate}
        subjectName={subjectName}
      />
      {/* 
      {openPreview && <PreviewUser closeModal={toggleOpenPreviewModal} />} */}
    </div>
  );
}
