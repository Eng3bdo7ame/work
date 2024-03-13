import { configureStore } from "@reduxjs/toolkit";

import centerSlice from "./slices/centerSlice";
import userSlice from "./slices/userSlice";
import roleSlice from "./slices/roleSlice";
import teacherSlice from "./slices/teacherSlice";
import studentSlice from "./slices/studentSlice";

export const store = configureStore({
  reducer: {
    centers: centerSlice,
    users: userSlice,
    roles: roleSlice,
    teachers: teacherSlice,
    students: studentSlice,
  },
});

export default store;
