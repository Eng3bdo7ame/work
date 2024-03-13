import { useEffect, useState } from "react";
import TeachersTable from "./TeachersTable";
import api from "../../ApiUrl";
import { useNavigate } from "react-router-dom";
import { useI18nContext } from "../../context/i18n-context";
import CreateTeacher from "./forms/CreateTeacher";
import AddAssistantForm from "./forms/AddAssistant";

export default function Teachers({ role }) {
  const [openCreate, setOpenCreate] = useState(false);
  const [AddAssistant, setAddAssistant] = useState(false);
  const [openPreview, setOpenPreview] = useState(false);
  const [teachersData, setTeachersData] = useState([]);
  const { language, t } = useI18nContext();
  console.log(language);

  const navigate = useNavigate();

  const toggleOpenCreateModal = () => {
    setOpenCreate(!openCreate);
  };

  const toggleOpenPreviewModal = () => {
    setOpenPreview(!openPreview);
  };

  const toggleAddAssistantModal = () => {
    setAddAssistant(!AddAssistant);
  };

  //   const roleName = "Teacher";

  //   const handleGetTeachers = () => {
  //     api
  //       .get(`/Authentications/GetUsersByRoleName/${roleName}`)
  //       .then((response) => {
  //         const dataFromServer = response.data.result;

  //         setTeachersData(dataFromServer);
  //       })
  //       .catch((error) => {
  //         console.error("Error fetching data:", error);
  //       });
  //   };

  //   useEffect(() => {
  //     handleGetTeachers();
  //   }, [navigate]);

  return (
    <div className={"text-white"}>
      <CreateTeacher
        closeModal={toggleOpenCreateModal}
        modal={openCreate}
        role={role}
      />

      <AddAssistantForm
        closeModal={toggleAddAssistantModal}
        modal={AddAssistant}
        role={role}
      />
      <TeachersTable
        openCreate={toggleOpenCreateModal}
        openPreview={toggleOpenPreviewModal}
        AddAssistant={toggleAddAssistantModal}
        TeachersData={teachersData}
      />
    </div>
  );
}
