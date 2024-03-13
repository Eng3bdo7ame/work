import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../ApiUrl";
import { useI18nContext } from "../../context/i18n-context";
import CreateRole from "./forms/CreateRole";
import RolesTable from "./RolesTable";

export default function Roles({ role }) {
  console.log("Roles -> role", role);

  const [openCreate, setOpenCreate] = useState(false);
  const [openPreview, setOpenPreview] = useState(false);
  const [rolesData, setRolesData] = useState([]);
  const { t } = useI18nContext();

  const navigate = useNavigate();

  const toggleOpenCreateModal = () => {
    setOpenCreate(!openCreate);
  };

  const toggleOpenPreviewModal = () => {
    setOpenPreview(!openPreview);
  };

  const handleGetRoles = () => {
    api
      .get(`/Authentications/GetAllRoles`)
      .then((response) => {
        const dataFromServer = response.data.result;

        setRolesData(dataFromServer);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  useEffect(() => {
    handleGetRoles();
  }, [navigate]);

  return (
    <div className={"text-white"}>
      <RolesTable
        RolesData={rolesData}
        openCreate={toggleOpenCreateModal}
        openPreview={toggleOpenPreviewModal}
      />
      <CreateRole
        closeModal={toggleOpenCreateModal}
        modal={openCreate}
        role={role}
      />
    </div>
  );
}
