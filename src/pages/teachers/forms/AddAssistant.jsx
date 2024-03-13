import { useEffect, useState } from "react";
import { X } from "@phosphor-icons/react";
// import api from "../../../ApiUrl";

import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

import { ListItemText } from "@mui/material";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

const assistant = [
  "Ahmed Hassan",
  "Abdo Hassan",
  "Ali Hassan",
  "Ahmed Ali",
  "Abdo Ali",
  "Ali Ahmed",
];
export default function Addassistant({ closeModal, addassistants, modal }) {
  const [assistantChosen, setassistantChosen] = useState([]);
  const [selected, setSelected] = useState([]);

  const handleassistant = (event) => {
    const {
      target: { value },
    } = event;
    console.log("donnnnnnnnnnnn");

    console.log(event.target.value);
    setSelected((oldData) => [...oldData, event.target.value]);
    setassistantChosen(value);
  };

  // console.log("centersDataOrdered", centersDataOrdered);

  const [errorMsg, setErrorMsg] = useState("");
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    // getAdmins();
  }, []);
  const handleDragEnd = (e) => {
    if (!e.destination) return;
    let tempData = Array.from(assistant);
    let [source_data] = tempData.splice(e.source.index, 1);
    tempData.splice(e.destination.index, 0, source_data);
    selected(tempData);
  };

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
                Add an assistant
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
            {/* <form onSubmit={AddAssistant}> */}
            <form>
              <div className=" gap-4 mb-4 sm:grid-cols-2 block">
                <label className="block">Add an assistant</label>
                <Select
                  labelId="addassistants"
                  id="addassistants"
                  value={assistantChosen}
                  onChange={handleassistant}
                  input={<OutlinedInput label="Tag" />}
                  className="bg-gray-50 border !border-gray-300
                    text-gray-900 text-sm rounded-md
                    block w-full p-2.5 dark:bg-gray-700
                    dark:border-gray-600 dark:placeholder-gray-400 
                    dark:text-white outline-none 
                    focus:border-orange-400 dark:focus:border-orange-400
                    duration-100 ease-linear h-10"
                  // MenuProps={MenuProps}
                >
                  {assistant.map((addassistants, i) => (
                    <MenuItem key={addassistants} value={addassistants}>
                      {/*console.log(addassistants)*/}

                      <ListItemText id={i} primary={addassistants} />
                    </MenuItem>
                  ))}
                </Select>
                <div>
                  {" "}
                  <br />
                  <DragDropContext onDragEnd={handleDragEnd}>
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                      <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 text-center">
                        <tr>
                          <th>control</th>
                          <th>Name</th>
                          <th>index</th>
                        </tr>
                      </thead>
                      <Droppable droppableId="droppable-1">
                        {(provider) => (
                          <tbody
                            className="text-capitalize"
                            ref={provider.innerRef}
                            {...provider.droppableProps}>
                            {selected?.map((name, i) => (
                              <Draggable key={i} draggableId={i} index={i}>
                                {(provider) => (
                                  <tr
                                    className="border-b dark:border-gray-700 text-center"
                                    {...provider.draggableProps}
                                    ref={provider.innerRef}>
                                    <td {...provider.dragHandleProps}> = </td>
                                    <td className="px-4 py-3">{name}</td>
                                    <td className="px-4 py-3">{i + 1}</td>
                                  </tr>
                                )}
                              </Draggable>
                            ))}
                            {provider.placeholder}
                          </tbody>
                        )}
                      </Droppable>
                    </table>
                  </DragDropContext>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
