import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../ApiUrl";
import CentersTable from "./CenterTable";
import CreateCenter from "./forms/CreateCenter";

export default function Centers({ role }) {
  const [openCreate, setOpenCreate] = useState(false);
  const [openPreview, setOpenPreview] = useState(false);
  const [centersData, setCentersData] = useState([]);

  const navigate = useNavigate();

  const toggleOpenCreateModal = () => {
    setOpenCreate(!openCreate);
  };

  const toggleOpenPreviewModal = () => {
    setOpenPreview(!openPreview);
  };

  const handleGetCenters = () => {
    api
      .get(`/Centers/GetAll`)
      .then((response) => {
        const dataFromServer = response.data.result;

        setCentersData(dataFromServer);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  useEffect(() => {
    handleGetCenters();
  }, [navigate]);

  return (
    <div className={"text-white"}>
      <CentersTable
        openCreate={toggleOpenCreateModal}
        openPreview={toggleOpenPreviewModal}
        CentersData={centersData}
      />
      <CreateCenter
          closeModal={toggleOpenCreateModal}
          modal={openCreate}
          role={role}
        />
      {/* {openCreate && (
        
      )} */}
      {/* {openPreview && <PreviewUser closeModal={toggleOpenPreviewModal} />} */}
    </div>
  );
}
