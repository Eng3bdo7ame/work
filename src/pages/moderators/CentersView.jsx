import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
// import api from "../../ApiUrl";
import CreateModerators from "./forms/CreateModerator";
import { useI18nContext } from "../../context/i18n-context";
import Card from "../../components/Card";
import { ChalkboardSimple } from "@phosphor-icons/react";
import { fetchCenters } from "../../store/slices/centerSlice"; // Adjust the path as needed
import { useDispatch, useSelector } from "react-redux";
export default function Moderators({ role }) {
  // Redux dispatch
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCenters());
  }, [dispatch]);

  // Fetching centers data from Redux store
  const centersDataOrdered = useSelector((state) => state.centers.centers);
  console.log("centersDataOrdered", centersDataOrdered);

  const centersData = centersDataOrdered.map((item) => ({
    id: item.id,
    name: item.name,
    adminName: item.adminName,
    rooms: item.rooms.length,
  }));
  console.log("centersData", centersData);

  const { t } = useI18nContext();

  const navigate = useNavigate();

  const handleCenterClick = (centerId) => {
    navigate(`${import.meta.env.VITE_PUBLIC_URL}/CentersView/Moderators/${centerId}`);
  };

  return (
    <div className={"text-white"}>
      <h2 className="text-2xl font-semibold text-center text-gray-700 dark:text-white mt-5">
        {t("moderatorsForm.centers")}
      </h2>

      {centersData.map((center) => (
        <div key={center.id}>
          <Card
            icon={<ChalkboardSimple size={60} />}
            id={center.id}
            name={center.name}
            adminName={center.adminName}
            rooms={center.rooms}
            click={() => handleCenterClick(center.id)}
          />
        </div>
      ))}
    </div>
  );
}
