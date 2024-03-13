import React from "react";
import { useEffect, useState } from "react";
import { Plus, TrashSimple, X } from "@phosphor-icons/react";
import api from "../../../ApiUrl";
import { useI18nContext } from "../../../context/i18n-context";
import { fetchCenters } from "../../../store/slices/centerSlice";
import { useDispatch, useSelector } from "react-redux";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import FormText from "../../../components/form/FormText";
import FormSelect from "./../../../components/form/FormSelect";

const roles = [
  "Oliver Hansen",
  "Van Henry",
  "April Tucker",
  "Ralph Hubbard",
  "Omar Alexander",
  "Omar fasfsd",
];

export default function CreateModerator({ closeModal, role, modal }) {
  const dispatch = useDispatch();
  const centersDataOrdered = useSelector((state) => state.centers.centers);
  const centersData = centersDataOrdered.map((item) => ({
    value: item.id,
    label: item.name,
  }));

  useEffect(() => {
    dispatch(fetchCenters());
  }, [dispatch]);

  const refreshData = () => {
    dispatch(fetchCenters());
  };

  const [rolesChosen, setRolesChosen] = React.useState([]);

  console.log("centersDataOrdered", centersDataOrdered);

  const { t } = useI18nContext();
  const [formData, setFormData] = useState({
    centerId: "",
    fullName: "",
    ssn: "",
    role: rolesChosen,
    gender: "",
    bod: "",
    address: "",
    phone1: "",
    phone2: "",
    email: "",
    birthday: "",
    notes: "",
    salary: 0,
    Incentive: 0,
    discount: 0,
    dueAmount: 0,
    activated: true,
    file: null,
  });

  const [errorMsg, setErrorMsg] = useState("");
  const [showError, setShowError] = useState(false);

  const createModerator = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post("/Moderator/Add", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log(response);

      // Assuming the API response includes the newly created moderator data
      const newModerator = response.data;

      // Optionally, you can refresh the data by calling the refreshData function
      refreshData();

      // Close the modal or perform any other actions
      closeModal();
    } catch (error) {
      console.error("An error occurred:", error);
      // Handle error appropriately, e.g., display an error message
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    console.log(formData);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    setFormData((prevData) => ({
      ...prevData,
      file,
    }));
    console.log(file);
  };

  const handleRoles = (event) => {
    const {
      target: { value },
    } = event;

    setRolesChosen(value);

    setFormData((prevData) => ({
      ...prevData,
      role: value,
    }));

    console.log(formData);
  };

  useEffect(() => {
    // getAdmins();
  }, []);

  return (
    <>
      {/* Create modal */}
      <div
        className={`overflow-y-auto overflow-x-hidden duration-200 ease-linear
        absolute top-1/2 -translate-x-1/2 -translate-y-1/2
        z-50 justify-center items-center ${modal ? "left-1/2" : "-left-[100%]"}
        bg-black bg-opacity-40 w-full h-full `}>
        <div
          className={`CreateCenter p-4 w-full max-w-2xl pb-10 bg-white
           dark:bg-gray-800 rounded-r-lg duration-200 ease-linear
           ${modal ? "absolute left-0" : "absolute -left-[100%]"}
           h-screen overflow-auto`}
          dir="rtl">
          {/* Modal content */}
          <div className="relative p-4 bg-white dark:bg-gray-800 sm:p-5">
            {/* Modal header */}
            <div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white outline-none focus:border-gray-600 dark:focus:border-gray-100 duration-100 ease-linear">
                {t("moderatorsForm.createModerator")}
              </h3>
              <button
                type="button"
                onClick={closeModal}
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 mr-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white">
                <X size={18} weight="bold" />
                <span className="sr-only">Close modal</span>
              </button>
            </div>
            {/* Modal body */}
            <form onSubmit={createModerator}>
              <div className="grid gap-4 mb-4 sm:grid-cols-2">
                <FormText
                  label={t("moderatorsForm.fullName")}
                  name="name"
                  value={formData.name}
                  placeholder="محمد احمد"
                  required=""
                  onChange={handleChange}
                />

                <FormSelect
                  selectLabel={t("moderatorsForm.center")}
                  handleChange={handleChange}
                  options={centersData}
                  value={formData.center}
                />

                <div>
                  <label
                    htmlFor="role"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white outline-none focus:border-gray-600 dark:focus:border-gray-100 duration-100 ease-linear">
                    {/* اختر الوظيفة */}
                    {t("moderatorsForm.role")}
                  </label>
                  <Select
                    labelId="role"
                    id="role"
                    multiple
                    value={rolesChosen}
                    onChange={handleRoles}
                    input={<OutlinedInput label="Tag" />}
                    renderValue={(selected) => selected.join(", ")}
                    className="bg-gray-50 border !border-gray-300
                        text-gray-900 text-sm rounded-md
                        block w-full p-2.5 dark:bg-gray-700
                        dark:border-gray-600 dark:placeholder-gray-400 
                        dark:text-white outline-none 
                        focus:border-orange-400 dark:focus:border-orange-400
                        duration-100 ease-linear h-10"
                    // MenuProps={MenuProps}
                  >
                    {roles.map((role) => (
                      <MenuItem key={role} value={role}>
                        <Checkbox checked={rolesChosen.indexOf(role) > -1} />
                        <ListItemText primary={role} />
                      </MenuItem>
                    ))}
                  </Select>
                </div>

                <FormSelect
                  selectLabel={"المسمي الوظيفي"}
                  handleChange={handleChange}
                  options={centersData}
                  value={formData.center}
                />

                <div>
                  <label
                    htmlFor="phoneNumber"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white outline-none focus:border-gray-600 dark:focus:border-gray-100 duration-100 ease-linear">
                    {t("moderatorsForm.phone1")}
                  </label>
                  <input
                    type="number"
                    name="phoneNumber"
                    id="phoneNumber"
                    value={formData.phoneNumber}
                    className="bg-gray-50 border border-gray-300
                    text-gray-900 text-sm rounded-md
                    block w-full p-2.5 dark:bg-gray-700
                    dark:border-gray-600 dark:placeholder-gray-400 
                    dark:text-white outline-none 
                    focus:border-orange-400 dark:focus:border-orange-400
                    duration-100 ease-linear"
                    placeholder="01011560461"
                    required=""
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label
                    htmlFor="secondPhoneNumber"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white outline-none focus:border-gray-600 dark:focus:border-gray-100 duration-100 ease-linear">
                    {t("moderatorsForm.phone2")}
                  </label>
                  <input
                    type="number"
                    name="secondPhoneNumber"
                    id="secondPhoneNumber"
                    value={formData.secondPhoneNumber}
                    className="bg-gray-50 border border-gray-300
                        text-gray-900 text-sm rounded-md
                        block w-full p-2.5 dark:bg-gray-700
                        dark:border-gray-600 dark:placeholder-gray-400
                        dark:text-white outline-none
                        focus:border-orange-400 dark:focus:border-orange-400
                        duration-100 ease-linear"
                    placeholder="01011560461"
                    required=""
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white outline-none focus:border-gray-600 dark:focus:border-gray-100 duration-100 ease-linear">
                    {t("moderatorsForm.email")}
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={formData.email}
                    className="bg-gray-50 border border-gray-300
                    text-gray-900 text-sm rounded-md
                    block w-full p-2.5 dark:bg-gray-700
                    dark:border-gray-600 dark:placeholder-gray-400 
                    dark:text-white outline-none 
                    focus:border-orange-400 dark:focus:border-orange-400
                    duration-100 ease-linear"
                    placeholder="J7kU6@example.com"
                    required=""
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label
                    htmlFor="address"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white outline-none focus:border-gray-600 dark:focus:border-gray-100 duration-100 ease-linear">
                    {t("moderatorsForm.address")}
                  </label>
                  <input
                    type="text"
                    name="address"
                    id="address"
                    value={formData.address}
                    className="bg-gray-50 border border-gray-300
                    text-gray-900 text-sm rounded-md
                    block w-full p-2.5 dark:bg-gray-700
                    dark:border-gray-600 dark:placeholder-gray-400 
                    dark:text-white outline-none 
                    focus:border-orange-400 dark:focus:border-orange-400
                    duration-100 ease-linear"
                    placeholder="cairo, egypt"
                    required=""
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <label
                    htmlFor="birthday"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white outline-none focus:border-gray-600 dark:focus:border-gray-100 duration-100 ease-linear">
                    {t("moderatorsForm.birthday")}
                  </label>
                  <input
                    type="date"
                    name="birthday"
                    id="birthday"
                    value={formData.birthday}
                    className="bg-gray-50 border border-gray-300
                    text-gray-900 text-sm rounded-md
                    block w-full p-2.5 dark:bg-gray-700
                    dark:border-gray-600 dark:placeholder-gray-400 
                    dark:text-white outline-none 
                    focus:border-orange-400 dark:focus:border-orange-400
                    duration-100 ease-linear"
                    placeholder="cairo, egypt"
                    required=""
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <label
                    htmlFor="gender"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white outline-none focus:border-gray-600 dark:focus:border-gray-100 duration-100 ease-linear">
                    {t("moderatorsForm.gender")}
                  </label>
                  <select
                    onChange={handleChange}
                    className="bg-gray-50 border border-gray-300
                        text-gray-900 text-sm rounded-md
                        block w-full p-2.5 dark:bg-gray-700
                        dark:border-gray-600 dark:placeholder-gray-400
                        dark:text-white outline-none
                        focus:border-orange-400 dark:focus:border-orange-400
                        duration-100 ease-linear">
                    <option value="male">{t("moderatorsForm.male")}</option>
                    <option value="female">{t("moderatorsForm.female")}</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white outline-none focus:border-gray-600 dark:focus:border-gray-100 duration-100 ease-linear">
                    {t("moderatorsForm.ssn")}
                  </label>
                  <input
                    type="number"
                    name="ssn"
                    id="ssn"
                    value={formData.ssn}
                    className="bg-gray-50 border border-gray-300
                        text-gray-900 text-sm rounded-md
                        block w-full p-2.5 dark:bg-gray-700
                        dark:border-gray-600 dark:placeholder-gray-400

                        dark:text-white outline-none
                        focus:border-orange-400 dark:focus:border-orange-400
                        duration-100 ease-linear"
                    required=""
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <label
                    htmlFor="maximum"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white outline-none focus:border-gray-600 dark:focus:border-gray-100 duration-100 ease-linear">
                    {t("moderatorsForm.maximum")}
                  </label>
                  <input
                    type="number"
                    name="maximum"
                    id="maximum"
                    value={formData.maximum}
                    className="bg-gray-50 border border-gray-300
                        text-gray-900 text-sm rounded-md
                        block w-full p-2.5 dark:bg-gray-700
                        dark:border-gray-600 dark:placeholder-gray-400
                        dark:text-white outline-none
                        focus:border-orange-400 dark:focus:border-orange-400
                        duration-100 ease-linear"
                    required=""
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label
                    htmlFor="salary"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white outline-none focus:border-gray-600 dark:focus:border-gray-100 duration-100 ease-linear">
                    {t("moderatorsForm.salary")}
                  </label>
                  <input
                    type="number"
                    name="salary"
                    id="salary"
                    value={formData.salary}
                    className="bg-gray-50 border border-gray-300
                        text-gray-900 text-sm rounded-md
                        block w-full p-2.5 dark:bg-gray-700
                        dark:border-gray-600 dark:placeholder-gray-400
                        dark:text-white outline-none
                        focus:border-orange-400 dark:focus:border-orange-400
                        duration-100 ease-linear"
                    required=""
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label
                    htmlFor="discount"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white outline-none focus:border-gray-600 dark:focus:border-gray-100 duration-100 ease-linear">
                    {t("moderatorsForm.discount")}
                  </label>
                  <input
                    type="number"
                    name="discount"
                    id="discount"
                    value={formData.discount}
                    className="bg-gray-50 border border-gray-300
                        text-gray-900 text-sm rounded-md
                        block w-full p-2.5 dark:bg-gray-700
                        dark:border-gray-600 dark:placeholder-gray-400
                        dark:text-white outline-none
                        focus:border-orange-400 dark:focus:border-orange-400
                        duration-100 ease-linear"
                    required=""
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <label
                    htmlFor="Incentive"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white outline-none focus:border-gray-600 dark:focus:border-gray-100 duration-100 ease-linear">
                    {t("moderatorsForm.Incentive")}
                  </label>
                  <input
                    type="number"
                    name="Incentive"
                    id="Incentive"
                    value={formData.Incentive}
                    className="bg-gray-50 border border-gray-300
                        text-gray-900 text-sm rounded-md
                        block w-full p-2.5 dark:bg-gray-700
                        dark:border-gray-600 dark:placeholder-gray-400
                        dark:text-white outline-none
                        focus:border-orange-400 dark:focus:border-orange-400
                        duration-100 ease-linear"
                    required=""
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label
                    htmlFor="dueAmount"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white outline-none focus:border-gray-600 dark:focus:border-gray-100 duration-100 ease-linear">
                    {t("moderatorsForm.dueAmount")}
                  </label>
                  <input
                    type="number"
                    name="dueAmount"
                    id="dueAmount"
                    value={formData.dueAmount}
                    className="bg-gray-50 border border-gray-300
                        text-gray-900 text-sm rounded-md
                        block w-full p-2.5 dark:bg-gray-700
                        dark:border-gray-600 dark:placeholder-gray-400
                        dark:text-white outline-none
                        focus:border-orange-400 dark:focus:border-orange-400
                        duration-100 ease-linear"
                    required=""
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label
                    htmlFor="activated"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white outline-none focus:border-gray-600 dark:focus:border-gray-100 duration-100 ease-linear">
                    {t("moderatorsForm.activated")}
                  </label>
                  <select
                    onChange={handleChange}
                    className="bg-gray-50 border border-gray-300
                        text-gray-900 text-sm rounded-md
                        block w-full p-2.5 dark:bg-gray-700
                        dark:border-gray-600 dark:placeholder-gray-400
                        dark:text-white outline-none
                        focus:border-orange-400 dark:focus:border-orange-400
                        duration-100 ease-linear">
                    <option value="true">{t("moderatorsForm.yes")}</option>
                    <option value="false">{t("moderatorsForm.no")}</option>
                  </select>
                </div>
                <div>
                  <label
                    htmlFor="notes"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white outline-none focus:border-gray-600 dark:focus:border-gray-100 duration-100 ease-linear">
                    {t("moderatorsForm.notes")}
                  </label>
                  <input
                    type="text"
                    name="notes"
                    id="notes"
                    value={formData.notes}
                    className="bg-gray-50 border border-gray-300
                        text-gray-900 text-sm rounded-md
                        block w-full p-2.5 dark:bg-gray-700
                        dark:border-gray-600 dark:placeholder-gray-400
                        dark:text-white outline-none
                        focus:border-orange-400 dark:focus:border-orange-400
                        duration-100 ease-linear"
                    required=""
                    onChange={handleChange}
                  />
                </div>

                <div>
                  {/* section to add upload pic */}
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="file-upload"
                      className="flex items-center gap-2 bg-orange-600 hover:bg-orange-700 
                                        outline-none font-medium rounded-md 
                                        text-sm px-5 py-2.5 text-center 
                                        ease-linear duration-100">
                      {t("moderatorsForm.uploadPic")}
                    </label>
                    <input
                      type="file"
                      id="file-upload"
                      name="file-upload"
                      className="hidden"
                      onChange={handleFileUpload}
                    />
                  </div>
                  {formData.file && (
                    <div>
                      <img
                        src={URL.createObjectURL(formData.file)}
                        alt="Uploaded Image"
                      />
                    </div>
                  )}
                </div>
              </div>
              <button
                type="submit"
                className="text-white gap-2 inline-flex items-center 
                bg-orange-600 hover:bg-orange-700 
                outline-none font-medium rounded-md 
                text-sm px-5 py-2.5 text-center 
                ease-linear duration-100">
                <Plus size={18} weight="bold" />
                {t("moderatorsForm.addModerator")}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
