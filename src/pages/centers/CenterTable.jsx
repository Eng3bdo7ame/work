import { useState, useRef, useEffect } from "react";
import {
  CaretLeft,
  CaretRight,
  DotsThree,
  Eye,
  MagnifyingGlass,
  NotePencil,
  Plus,
  TrashSimple,
} from "@phosphor-icons/react";

export default function CentersTable({ CentersData, openCreate, openPreview }) {
  const dropdownRefs = useRef({});

  const [selectedCenterId, setSelectedCenterId] = useState(null);

  const toggleEditDropdown = (centerId) => {
    setSelectedCenterId((prev) => (prev === centerId ? null : centerId));
  };

  const handleClick = (event, centerId) => {
    const dropdown = dropdownRefs.current[centerId];
    if (
      dropdown &&
      !dropdown.contains(event.target) &&
      !event.target.classList.contains("edit-button")
    ) {
      setSelectedCenterId(null);
    }
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      handleClick(event, selectedCenterId);
    };

    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [selectedCenterId]);

  return (
    <div>
      <>
        {/* Start block */}
        <section className="bg-gray-50 dark:bg-gray-900 p-3 sm:p-5">
          <div className="mx-auto max-w-screen-xl">
            {/* Start coding here */}
            <div className="bg-white dark:bg-gray-800 relative shadow-md rounded-lg">
              <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
                <div className="w-full md:w-1/2">
                  <form className="flex items-center">
                    <label htmlFor="simple-search" className="sr-only">
                      Search
                    </label>
                    <div className="relative w-full">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <MagnifyingGlass
                          size={20}
                          weight="bold"
                          className="text-gray-500 dark:text-gray-400"
                        />
                      </div>
                      <input
                        type="text"
                        id="simple-search"
                        className="bg-gray-50 flex items-center align-middle
                         text-gray-900 text-sm rounded-lg 
                           w-full pl-10 p-2 outline-none
                          dark:bg-gray-700 border border-gray-500
                          dark:placeholder-gray-400 dark:text-white"
                        placeholder="بحث"
                        style={{ lineHeight: "2rem" }}
                        required=""
                      />
                    </div>
                  </form>
                </div>
                <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
                  <button
                    type="button"
                    onClick={openCreate}
                    className="flex gap-2 items-center justify-center duration-150 ease-linear
                    text-white bg-orange-500 hover:bg-orange-700 
                    focus:ring-4 focus:ring-orange-300 
                    font-medium rounded-lg text-sm px-4 py-2 
                    dark:bg-orange-300 dark:hover:bg-orange-500 dark:text-orange-800
                    dark:hover:text-white
                    focus:outline-none dark:focus:ring-orange-800"
                  >
                    <Plus size={18} weight="bold" />
                    إضافة سنتر
                  </button>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 text-center">
                    <tr>
                      <th scope="col" className="px-4 py-4">
                        الكود
                      </th>
                      <th scope="col" className="px-4 py-3">
                        الاسم
                      </th>
                      <th scope="col" className="px-4 py-3">
                        العنوان
                      </th>
                      <th scope="col" className="px-4 py-3">
                        المدير
                      </th>
                      <th scope="col" className="px-4 py-3">
                        <span className="sr-only">Actions</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {CentersData.map((center) => (
                      <tr
                        className="border-b dark:border-gray-700 text-center"
                        key={center.id}
                      >
                        <th
                          scope="row"
                          className="px-4 py-3 font-medium text-gray-900 
                          whitespace-nowrap dark:text-white max-w-[5rem] truncate"
                        >
                          {center.id}
                        </th>
                        <td className="px-4 py-3">{center.name}</td>
                        <td className="px-4 py-3 max-w-[2rem] md:max-w-[8rem] text-ellipsis overflow-hidden">
                          {center.address}
                        </td>
                        <td className="px-4 py-3 max-w-[2rem] md:max-w-[8rem] text-ellipsis overflow-hidden">
                          {center.adminName}
                        </td>
                        <td className="px-4 py-3 flex items-center justify-end">
                          <button
                            className="inline-flex items-center text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-700 p-1.5 dark:hover-bg-gray-800 text-center text-gray-500 hover:text-gray-800 rounded-lg focus:outline-none dark:text-gray-400 dark:hover:text-gray-100"
                            type="button"
                            onClick={() => toggleEditDropdown(center.id)}
                            ref={(el) => (dropdownRefs.current[center.id] = el)}
                          >
                            <DotsThree size={25} weight="bold" />
                          </button>
                          <div className="absolute z-50">
                            <div
                              id={`center-dropdown-${center.id}`}
                              className={`${
                                selectedCenterId === center.id
                                  ? "absolute top-3 right-full overflow-auto"
                                  : "hidden"
                              } z-10 w-44 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600`}
                            >
                              <ul className="py-1 text-sm">
                                <li>
                                  <button
                                    type="button"
                                    className="flex gap-2 w-full items-center py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white text-gray-700 dark:text-gray-200"
                                  >
                                    <NotePencil size={18} weight="bold" />
                                    Edit
                                  </button>
                                </li>
                                <li>
                                  <button
                                    type="button"
                                    // onClick={openPreview}
                                    className="flex gap-2 w-full items-center py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white text-gray-700 dark:text-gray-200"
                                  >
                                    <Eye size={18} weight="bold" />
                                    Preview
                                  </button>
                                </li>
                                <li>
                                  <button
                                    type="button"
                                    className="flex gap-2 w-full items-center py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 text-red-500 dark:hover:text-red-400"
                                  >
                                    <TrashSimple size={18} weight="bold" />
                                    Delete
                                  </button>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <nav
                className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-0 p-4"
                dir="rtl"
              >
                <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                  ظهر {"  "}
                  <span className="font-semibold text-gray-900 dark:text-white">
                    1-10 {"  "}
                  </span>
                  من {"  "}
                  <span
                    className="font-semibold text-gray-900 dark:text-white"
                    dir="ltr"
                  >
                    {"  "} 1000 {"  "}
                  </span>
                </span>
                <ul className="inline-flex items-stretch -space-x-px" dir="ltr">
                  <li>
                    <a
                      href="#"
                      className="flex items-center justify-center h-full py-1.5 px-3 ml-0 text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                    >
                      <span className="sr-only">Previous</span>
                      <CaretLeft size={18} weight="bold" />
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                    >
                      1
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                    >
                      2
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      aria-current="page"
                      className="flex items-center justify-center text-sm z-10 py-2 px-3 leading-tight text-primary-600 bg-primary-50 border border-primary-300 hover:bg-primary-100 hover:text-primary-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
                    >
                      3
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                    >
                      ...
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                    >
                      100
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="flex items-center justify-center h-full py-1.5 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                    >
                      <span className="sr-only">Next</span>
                      <CaretRight size={18} weight="bold" />
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </section>
        {/* End block */}
      </>
    </div>
  );
}
