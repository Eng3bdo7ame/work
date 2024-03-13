import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Error404Modern from "../pages/error/404-modern";
import Centers from "../pages/centers/Centers";
import CentersView from "../pages/moderators/CentersView";
import SubjectsNames from "../pages/subjectsNames/SubjectsNames";
import Teachers from "../pages/teachers/Teachers";
import Moderators from "../pages/moderators/Moderators";
import Roles from "../pages/roles/Roles";
import Subjects from "../pages/subjects/Subjects";
import Stages from "../pages/stages/Stages";
import Classes from "../pages/classes/Classes";
import Students from "../pages/students/Students";

const role = localStorage.getItem("role") || "Guest";

//! Server Pages Routes
const ServerPages = () => {
  return (
    <Suspense fallback={<div />}>
      <Routes>
        <Route
          exact
          path={`${import.meta.env.VITE_PUBLIC_URL}/`}
          element={<div>ServerDash</div>}
        />
        <Route
          exact
          path={`${import.meta.env.VITE_PUBLIC_URL}/Centers`}
          element={<Centers />}
        />
        <Route
          path={`${import.meta.env.VITE_PUBLIC_URL}/CentersView`}
          element={<CentersView />}
        />
        <Route
          path={`${
            import.meta.env.VITE_PUBLIC_URL
          }/CentersView/Moderators/:centerId`}
          element={<Moderators role={role} />}
        />
        <Route
          path={`${import.meta.env.VITE_PUBLIC_URL}/Roles`}
          element={<Roles role={role} />}
        />
        <Route
          exact
          path={`${import.meta.env.VITE_PUBLIC_URL}/SubjectsNames`}
          element={<SubjectsNames />}
        />
        <Route
          exact
          path={`${import.meta.env.VITE_PUBLIC_URL}/Subjects`}
          element={<Subjects />}
        />
        <Route
          exact
          path={`${import.meta.env.VITE_PUBLIC_URL}/Stages`}
          element={<Stages />}
        />
        <Route
          exact
          path={`${import.meta.env.VITE_PUBLIC_URL}/Classes`}
          element={<Classes />}
        />
        <Route
          exact
          path={`${import.meta.env.VITE_PUBLIC_URL}/Teachers`}
          element={<Teachers />}
        />
        <Route
          exact
          path={`${import.meta.env.VITE_PUBLIC_URL}/Students`}
          element={<Students />}
        />
        <Route path={"/*"} element={<Error404Modern />} />
      </Routes>
    </Suspense>
  );
};

//! Super Admin Pages Routes
const SuperAdminPages = () => {
  return (
    <Suspense fallback={<div />}>
      <Routes>
        <Route
          exact
          path={`${import.meta.env.VITE_PUBLIC_URL}/`}
          element={<div>SuperAdmin Dashboard</div>}
        />
        <Route
          exact
          path={`${import.meta.env.VITE_PUBLIC_URL}/Centers`}
          element={<Centers />}
        />
        <Route
          path={`${import.meta.env.VITE_PUBLIC_URL}/CentersView`}
          element={<CentersView />}
        />
        <Route
          path={`${import.meta.env.VITE_PUBLIC_URL}/Moderators/:centerId`}
          element={<Moderators role={role} />}
        />
        <Route
          path={`${import.meta.env.VITE_PUBLIC_URL}/Roles`}
          element={<Roles role={role} />}
        />
        <Route
          exact
          path={`${import.meta.env.VITE_PUBLIC_URL}/SubjectsNames`}
          element={<SubjectsNames />}
        />
        <Route
          exact
          path={`${import.meta.env.VITE_PUBLIC_URL}/Subjects`}
          element={<Subjects />}
        />
        <Route
          exact
          path={`${import.meta.env.VITE_PUBLIC_URL}/Stages`}
          element={<Stages />}
        />
        <Route
          exact
          path={`${import.meta.env.VITE_PUBLIC_URL}/Classes`}
          element={<Classes />}
        />
        <Route
          exact
          path={`${import.meta.env.VITE_PUBLIC_URL}/Teachers`}
          element={<Teachers />}
        />
        <Route
          exact
          path={`${import.meta.env.VITE_PUBLIC_URL}/Students`}
          element={<Students />}
        />
        <Route path={"/*"} element={<Error404Modern />} />
      </Routes>
    </Suspense>
  );
};

//! Admin Pages Routes
const AdminPages = () => {
  return (
    <Suspense fallback={<div />}>
      <Routes>
        <Route
          exact
          path={`${import.meta.env.VITE_PUBLIC_URL}/`}
          element={<div>Admin Dashboard</div>}
        />
        {/* Updates will be displayed to those belonging 
        to the center in which this admin is located, 
        using his/her ID */}
        <Route
          path={`${import.meta.env.VITE_PUBLIC_URL}/Moderators`}
          element={<Moderators role={role} />}
        />
        <Route
          exact
          path={`${import.meta.env.VITE_PUBLIC_URL}/SubjectsNames`}
          element={<SubjectsNames />}
        />
        <Route
          exact
          path={`${import.meta.env.VITE_PUBLIC_URL}/Subjects`}
          element={<Subjects />}
        />
        <Route
          exact
          path={`${import.meta.env.VITE_PUBLIC_URL}/Stages`}
          element={<Stages />}
        />
        <Route
          exact
          path={`${import.meta.env.VITE_PUBLIC_URL}/Classes`}
          element={<Classes />}
        />
        <Route
          exact
          path={`${import.meta.env.VITE_PUBLIC_URL}/Teachers`}
          element={<Teachers />}
        />
        <Route
          exact
          path={`${import.meta.env.VITE_PUBLIC_URL}/Students`}
          element={<Students />}
        />
        <Route path={"/*"} element={<Error404Modern />} />
      </Routes>
    </Suspense>
  );
};

export { AdminPages, SuperAdminPages, ServerPages };
