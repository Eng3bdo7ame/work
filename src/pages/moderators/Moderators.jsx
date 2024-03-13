import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
// import UsersTable from "./UsersTable";
import CreateModerator from "./forms/CreateModerator";
// import api from "../../ApiUrl";
import PreviewModerator from "./forms/PreviewModerator";
import ModeratorsTable from "./ModeratorsTable";
import { fetchUsers } from "../../store/slices/userSlice";
import { fetchCenters } from "../../store/slices/centerSlice"; // Adjust the path as needed

import { useDispatch, useSelector } from "react-redux";
export default function Moderators({ role }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  const [openCreate, setOpenCreate] = useState(false);
  const [openPreview, setOpenPreview] = useState(false);
  const [selectedModeratorData, setSelectedModeratorData] = useState({});
  const usersData = useSelector((state) => state.users.users);

  const navigate = useNavigate();

  const toggleOpenCreateModal = () => {
    setOpenCreate(!openCreate);
  };

  const toggleOpenPreviewModal = (selectedModerator) => {
    setSelectedModeratorData(selectedModerator);
    setOpenPreview(!openPreview);
  };

  //   const { centerId } = useParams();

  //   const handleGetUsersCenter = () => {
  //     api
  //       //   .get(`/Centers/GetAll/${centerId}`)
  //       .get(`/Authentications/GetAllUsers`)
  //       .then((response) => {
  //         // console.log("response", response);
  //         // const dataFromServer = response.data.result;

  //         // const usersDataOrdered = dataFromServer.map((item) => ({
  //         //   id: item.id,
  //         //   name: item.name,
  //         //   adminName: item.adminName,
  //         //   rooms: item.rooms.length,
  //         // }));
  //         setUsersData(response.data.result);
  //       })
  //       .catch((error) => {
  //         console.error("Error fetching data:", error);
  //       });
  //   };

  //   const handleGetUsers = () => {
  //     api
  //       .get(`/Authentications/GetAllUsers`)
  //       .then((response) => {
  //         const dataFromServer = response.data.result;

  //         setUsersData(dataFromServer);
  //       })
  //       .catch((error) => {
  //         console.error("Error fetching data:", error);
  //       });
  //   };

  //   useEffect(() => {
  //     handleGetUsers();
  //   }, [navigate]);

  //   useEffect(() => {
  //     handleGetUsersCenter();
  //   }, [centerId, navigate]);

  return (
    <div className={"text-white"}>
      <ModeratorsTable
        openCreate={toggleOpenCreateModal}
        openPreview={toggleOpenPreviewModal}
        ModeratorsData={usersData}
      />
      <CreateModerator
        closeModal={toggleOpenCreateModal}
        modal={openCreate}
        role={role}
      />
      {/* {openCreate && ()} */}
      {openPreview && (
        <PreviewModerator
          closeModal={() => setOpenPreview(false)}
          userData={selectedModeratorData}
        />
      )}
    </div>
  );
}
