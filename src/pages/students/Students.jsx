import { useEffect, useState } from "react";
import StudentsTable from "./StudentsTable";
import api from "../../ApiUrl";
import { useNavigate } from "react-router-dom";
import { useI18nContext } from "../../context/i18n-context";
import CreateStudent from "./forms/CreateStudent";

export default function Students({ role }) {
  const [openCreate, setOpenCreate] = useState(false);
  const [openPreview, setOpenPreview] = useState(false);
  const [studentsData, setStudentsData] = useState([]);

  const { language, t } = useI18nContext();
  
  console.log(language);

  const navigate = useNavigate();

  const toggleOpenCreateModal = () => {
    setOpenCreate(!openCreate);
  };

  const toggleOpenPreviewModal = () => {
    setOpenPreview(!openPreview);
  };

  //   const roleName = "Student";

  //   const handleGetStudents = () => {
  //     api
  //       .get(`/Authentications/GetUsersByRoleName/${roleName}`)
  //       .then((response) => {
  //         const dataFromServer = response.data.result;

  //         setStudentsData(dataFromServer);
  //       })
  //       .catch((error) => {
  //         console.error("Error fetching data:", error);
  //       });
  //   };

  //   useEffect(() => {
  //     handleGetStudents();
  //   }, [navigate]);

  return (
    <div className={"text-white"}>
      <CreateStudent
        closeModal={toggleOpenCreateModal}
        modal={openCreate}
        role={role}
      />
      <StudentsTable
        openCreate={toggleOpenCreateModal}
        openPreview={toggleOpenPreviewModal}
        StudentsData={studentsData}
      />
    </div>
  );
}
