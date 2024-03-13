import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import SubjectsNamesTable from "./SubjectsNamesTable";
import api from "../../ApiUrl";

export default function SubjectsNames({ role }) {
  const [openCreate, setOpenCreate] = useState(false);
  const [openPreview, setOpenPreview] = useState(false);
  const [subjectsData, setSubjectsData] = useState([]);

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
      <SubjectsNamesTable
        openCreate={toggleOpenCreateModal}
        openPreview={toggleOpenPreviewModal}
        SubjectsData={subjectsData}
      />
      {/* {openCreate && (
        <CreateUser closeModal={toggleOpenCreateModal} role={role} />
      )}
      {openPreview && <PreviewUser closeModal={toggleOpenPreviewModal} />} */}
    </div>
  );
}
