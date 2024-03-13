import { useEffect, useState } from "react";
import { Plus, TrashSimple, X } from "@phosphor-icons/react";
import api from "../../../ApiUrl";

export default function CreateCenter({ closeModal, refreshData, role, modal }) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    phoneNumber: "",
    address: "",
    adminId: "",
    openTime: "",
    closeTime: "",
    rooms: [
      {
        name: "",
        description: "",
        actualNumber: 0,
        addetionalNumber: 0,
      },
    ],
  });
  const [adminsData, setAdminsData] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");
  const [showError, setShowError] = useState(false);

  const createCenter = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post("/Centers/Add", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log(response);

      // Assuming the API response includes the newly created center data
      const newCenter = response.data;

      // Optionally, you can refresh the data by calling the refreshData function
      refreshData();

      // Close the modal or perform any other actions
      closeModal();
    } catch (error) {
      console.error("An error occurred:", error);
      // Handle error appropriately, e.g., display an error message
    }
  };

  const getAdmins = async () => {
    try {
      const response = await api.get(
        "/Authentications/GetUsersByRoleName/Admin",
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log(response.data.result);

      setAdminsData(response.data.result);
      // Assuming the API response includes the newly created center data
      const adminsData = response.data;
    } catch (error) {
      console.error("An error occurred:", error);
      // Handle error appropriately, e.g., display an error message
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith("rooms[")) {
      const [roomIndex, field] = name.match(/\[(\d+)\]\.(.+)/).slice(1);
      setFormData((prevData) => {
        const updatedRooms = [...prevData.rooms];
        updatedRooms[roomIndex] = {
          ...updatedRooms[roomIndex],
          [field]: value,
        };
        return {
          ...prevData,
          rooms: updatedRooms,
        };
      });
    } else {
      if (name === "closeTime" || name === "openTime") {
        if (
          document.getElementById("openTime").value &&
          document.getElementById("closeTime").value
        ) {
          const openTime = new Date(
            `1970-01-01T${document.getElementById("openTime").value}`
          );
          const closeTime = new Date(
            `1970-01-01T${document.getElementById("closeTime").value}`
          );

          if (closeTime <= openTime) {
            console.log("وقت الاغلاق يجب أن يكون بعد وقت الفتح");
            setErrorMsg("وقت الاغلاق يجب أن يكون بعد وقت الفتح");
            setShowError(true);
          } else {
            setShowError(false);
            setFormData((prevData) => ({
              ...prevData,
              [name]: value,
            }));
          }
        } else {
          setShowError(false);
          setFormData((prevData) => ({
            ...prevData,
            [name]: value,
          }));
        }
      }
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }

    console.log(formData);
  };

  const handleRemoveRoom = (index) => {
    setFormData((prevData) => {
      const updatedRooms = [...prevData.rooms];
      updatedRooms.splice(index, 1);
      return {
        ...prevData,
        rooms: updatedRooms,
      };
    });
  };

  useEffect(() => {
    getAdmins();
  }, []);

  return (
    <>
      {/* Create modal */}
      <div
        className={`overflow-y-auto overflow-x-hidden duration-200 ease-linear
        absolute top-1/2 -translate-x-1/2 -translate-y-1/2
        z-50 justify-center items-center ${modal ? "left-1/2" : "-left-[100%]"}
        bg-black bg-opacity-40 w-full h-full `}
      >
        <div
          className={`CreateCenter p-4 w-full max-w-2xl pb-10 bg-white
           dark:bg-gray-800 rounded-r-lg duration-200 ease-linear
           ${modal ? "absolute left-0" : "absolute -left-[100%]"}
           h-screen overflow-auto`}
          dir="rtl"
        >
          {/* Modal content */}
          <div className="relative p-4 bg-white dark:bg-gray-800 sm:p-5">
            {/* Modal header */}
            <div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white outline-none focus:border-gray-600 dark:focus:border-gray-100 duration-100 ease-linear">
                إضافة سنتر
              </h3>
              <button
                type="button"
                onClick={closeModal}
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 mr-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
              >
                <X size={18} weight="bold" />
                <span className="sr-only">Close modal</span>
              </button>
            </div>
            {/* Modal body */}
            <form onSubmit={createCenter}>
              <div className="grid gap-4 mb-4 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="name"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white outline-none focus:border-gray-600 dark:focus:border-gray-100 duration-100 ease-linear"
                  >
                    الاسم
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    value={formData.name}
                    className="bg-gray-50 border border-gray-300
                    text-gray-900 text-sm rounded-md
                    block w-full p-2.5 dark:bg-gray-700
                    dark:border-gray-600 dark:placeholder-gray-400 
                    dark:text-white outline-none 
                    focus:border-orange-400 dark:focus:border-orange-400
                    duration-100 ease-linear"
                    placeholder="محمد احمد"
                    required=""
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label
                    htmlFor="phoneNumber"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white outline-none focus:border-gray-600 dark:focus:border-gray-100 duration-100 ease-linear"
                  >
                    الهاتف
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
                    htmlFor="address"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white outline-none focus:border-gray-600 dark:focus:border-gray-100 duration-100 ease-linear"
                  >
                    العنوان
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
                    placeholder="center2501"
                    required=""
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <div className="flex gap-3">
                    <div className="w-1/2">
                      <label
                        htmlFor="openTime"
                        className="block mb-2 text-sm text-center font-medium text-gray-900 dark:text-white outline-none focus:border-gray-600 dark:focus:border-gray-100 duration-100 ease-linear"
                      >
                        موعد الفتح
                      </label>
                      <input
                        type="time"
                        name="openTime"
                        id="openTime"
                        value={formData.openTime}
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
                    <div className="w-1/2">
                      <label
                        htmlFor="closeTime"
                        className="block mb-2 text-sm text-center font-medium text-gray-900 dark:text-white outline-none focus:border-gray-600 dark:focus:border-gray-100 duration-100 ease-linear"
                      >
                        موعد الاغلاق
                      </label>
                      <input
                        type="time"
                        name="closeTime"
                        id="closeTime"
                        value={formData.closeTime}
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
                  </div>
                  <div className={`mt-2 text-red-600`}>
                    {showError && errorMsg}
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="nationality"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white outline-none focus:border-gray-600 dark:focus:border-gray-100 duration-100 ease-linear"
                  >
                    المدير
                  </label>
                  <select
                    id="nationality"
                    className="bg-gray-50 border border-gray-300
                    text-gray-900 text-sm rounded-md
                    block w-full p-2.5 dark:bg-gray-700
                    dark:border-gray-600 dark:placeholder-gray-400 
                    dark:text-white outline-none 
                    focus:border-orange-400 dark:focus:border-orange-400
                    duration-100 ease-linear"
                  >
                    <option selected="">اختر المدير</option>
                    {adminsData.map((admin, index) => (
                      <option value={admin.id} key={index}>
                        {admin.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="sm:col-span-2">
                  <label
                    htmlFor="description"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white outline-none focus:border-gray-600 dark:focus:border-gray-100 duration-100 ease-linear"
                  >
                    ملاحظات
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    rows={5}
                    className="bg-gray-50 border border-gray-300
                    text-gray-900 text-sm rounded-md
                    block w-full p-2.5 dark:bg-gray-700
                    dark:border-gray-600 dark:placeholder-gray-400 
                    dark:text-white outline-none
                    focus:border-orange-400 dark:focus:border-orange-400
                    duration-100 ease-linear resize-none"
                    placeholder="اكتب ملاحظاتك حول السنتر هنا"
                    defaultValue={""}
                    onChange={handleChange}
                  />
                </div>
                {/* حقول الغرف */}
                <div className="sm:col-span-2">
                  <div className="flex justify-between my-4">
                    <label
                      className={`block mb-2 text-2xl font-medium 
                      text-gray-900 dark:text-white outline-none 
                      focus:border-gray-600 dark:focus:border-gray-100 
                      duration-100 ease-linear`}
                    >
                      القاعات
                    </label>
                    <button
                      type="button"
                      className="text-white gap-2 inline-flex items-center 
                      bg-orange-600 hover:bg-orange-700 
                      outline-none font-medium rounded-md 
                      text-sm px-5 py-2.5 text-center 
                      ease-linear duration-100"
                      onClick={() =>
                        setFormData((prevData) => ({
                          ...prevData,
                          rooms: [
                            ...prevData.rooms,
                            {
                              name: "",
                              description: "",
                              actualNumber: 0,
                              addetionalNumber: 0,
                            },
                          ],
                        }))
                      }
                    >
                      <Plus size={18} weight="bold" />
                      إضافة قاعة جديدة
                    </button>
                  </div>

                  {formData.rooms.map((room, index) => (
                    <div
                      key={index}
                      className="grid gap-4 sm:grid-cols-2 border
                      mb-3 p-4 rounded-md border-gray-300 dark:border-gray-600 shadow-md"
                    >
                      <div>
                        <label
                          htmlFor={`roomName${index}`}
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white outline-none focus:border-gray-600 dark:focus:border-gray-100 duration-100 ease-linear"
                        >
                          اسم القاعة
                        </label>
                        <input
                          type="text"
                          id={`roomName${index}`}
                          name={`rooms[${index}].name`}
                          value={room.name}
                          className="bg-gray-50 border border-gray-300
                          text-gray-900 text-sm rounded-md
                            block w-full p-2.5 dark:bg-gray-700
                          dark:border-gray-600 dark:placeholder-gray-400 
                          dark:text-white outline-none 
                          focus:border-orange-400 dark:focus:border-orange-400
                          duration-100 ease-linear"
                          onChange={handleChange}
                        />
                      </div>
                      <div>
                        <label
                          htmlFor={`roomDescription${index}`}
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white outline-none focus:border-gray-600 dark:focus:border-gray-100 duration-100 ease-linear"
                        >
                          وصف القاعة
                        </label>
                        <input
                          type="text"
                          id={`roomDescription${index}`}
                          name={`rooms[${index}].description`}
                          className="bg-gray-50 border border-gray-300
                          text-gray-900 text-sm rounded-md
                            block w-full p-2.5 dark:bg-gray-700
                          dark:border-gray-600 dark:placeholder-gray-400 
                          dark:text-white outline-none 
                          focus:border-orange-400 dark:focus:border-orange-400
                          duration-100 ease-linear"
                          onChange={handleChange}
                        />
                      </div>
                      <div>
                        <label
                          htmlFor={`roomActualNumber${index}`}
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white outline-none focus:border-gray-600 dark:focus:border-gray-100 duration-100 ease-linear"
                        >
                          العدد الفعلي للقاعة
                        </label>
                        <input
                          type="number"
                          id={`roomActualNumber${index}`}
                          name={`rooms[${index}].actualNumber`}
                          className="bg-gray-50 border border-gray-300
                          text-gray-900 text-sm rounded-md
                            block w-full p-2.5 dark:bg-gray-700
                          dark:border-gray-600 dark:placeholder-gray-400 
                          dark:text-white outline-none 
                          focus:border-orange-400 dark:focus:border-orange-400
                          duration-100 ease-linear"
                          onChange={handleChange}
                        />
                      </div>
                      <div>
                        <label
                          htmlFor={`roomAdditionalNumber${index}`}
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white outline-none focus:border-gray-600 dark:focus:border-gray-100 duration-100 ease-linear"
                        >
                          العدد الإضافي للقاعة
                        </label>
                        <input
                          type="number"
                          id={`roomAdditionalNumber${index}`}
                          name={`rooms[${index}].addetionalNumber`}
                          className="bg-gray-50 border border-gray-300
                          text-gray-900 text-sm rounded-md
                            block w-full p-2.5 dark:bg-gray-700
                          dark:border-gray-600 dark:placeholder-gray-400 
                          dark:text-white outline-none 
                          focus:border-orange-400 dark:focus:border-orange-400
                          duration-100 ease-linear"
                          onChange={handleChange}
                        />
                      </div>
                      <div className="flex items-center mb-3">
                        <button
                          type="button"
                          onClick={() => handleRemoveRoom(index)}
                          className="text-white bg-red-500 
                          hover:bg-red-700 focus:ring-4 focus:outline-none
                          focus:ring-red-300 font-medium rounded-lg
                          text-sm px-4 py-2 text-center flex gap-2"
                        >
                          <TrashSimple size={18} weight="bold" />
                          حذف القاعة
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <button
                type="submit"
                className="text-white gap-2 inline-flex items-center 
                bg-orange-600 hover:bg-orange-700 
                outline-none font-medium rounded-md 
                text-sm px-5 py-2.5 text-center 
                ease-linear duration-100"
              >
                <Plus size={18} weight="bold" />
                إضافة سنتر
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
