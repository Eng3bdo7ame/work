import { useState } from "react";
import {
  House,
  Package,
  Airplay,
  ChartPieSlice,
  Users,
  Books,
  Gear,
  SignOut,
  ChalkboardTeacher,
  UserGear,
  GearSix,
  UsersThree,
  ChalkboardSimple,
  Student,
} from "@phosphor-icons/react";
import { Link, NavLink, useLocation } from "react-router-dom";
import LogoWide from "../images/logoWide.png";
import { useI18nContext } from "../context/i18n-context";

const navigationServer = [
  {
    icon: <House size={25} />,
    name: "sideBar.dashboard",
    link: `${import.meta.env.VITE_PUBLIC_URL}/`,
  },
  {
    icon: <ChartPieSlice size={25} />,
    name: "sideBar.centers",
    link: `${import.meta.env.VITE_PUBLIC_URL}/Centers`,
  },
  {
    icon: <Users size={25} />,
    name: "sideBar.moderators",
    link: `${import.meta.env.VITE_PUBLIC_URL}/CentersView`,
  },
  {
    icon: <UserGear size={25} />,
    name: "sideBar.permissions",

    link: `${import.meta.env.VITE_PUBLIC_URL}/Roles`,
  },
  {
    icon: <Student size={25} />,
    name: "sideBar.students",

    link: `${import.meta.env.VITE_PUBLIC_URL}/Students`,
  },
  {
    icon: <Books size={25} />,
    name: "sideBar.subjectsNames",
    link: `${import.meta.env.VITE_PUBLIC_URL}/SubjectsNames`,
  },
  {
    icon: <ChalkboardSimple size={25} />,
    name: "sideBar.stages",
    link: `${import.meta.env.VITE_PUBLIC_URL}/Stages`,
  },
  {
    icon: <ChalkboardSimple size={25} />,
    name: "sideBar.classes",
    link: `${import.meta.env.VITE_PUBLIC_URL}/Classes`,
  },
  {
    icon: <Books size={25} />,
    name: "sideBar.subjects",
    link: `${import.meta.env.VITE_PUBLIC_URL}/Subjects`,
  },
  {
    icon: <ChalkboardTeacher size={25} />,
    name: "sideBar.teachers",

    link: `${import.meta.env.VITE_PUBLIC_URL}/Teachers`,
  },
  {
    icon: <UsersThree size={25} />,
    name: "sideBar.groups",

    link: `${import.meta.env.VITE_PUBLIC_URL}/Groups`,
  },
];
const navigationSuperAdmin = [
  {
    icon: <House size={25} />,
    name: "sideBar.dashboard",
    link: `${import.meta.env.VITE_PUBLIC_URL}/`,
  },
  {
    icon: <ChartPieSlice size={25} />,
    name: "sideBar.centers",
    link: `${import.meta.env.VITE_PUBLIC_URL}/Centers`,
  },
  {
    icon: <Users size={25} />,
    name: "sideBar.moderators",
    link: `${import.meta.env.VITE_PUBLIC_URL}/CentersView`,
  },
  {
    icon: <UserGear size={25} weight="bold" />,
    name: "sideBar.permissions",

    link: `${import.meta.env.VITE_PUBLIC_URL}/Roles`,
  },
  {
    icon: <Student size={25} />,
    name: "sideBar.students",

    link: `${import.meta.env.VITE_PUBLIC_URL}/Students`,
  },
  {
    icon: <Books size={25} />,
    name: "sideBar.subjectsNames",
    link: `${import.meta.env.VITE_PUBLIC_URL}/SubjectsNames`,
  },
  {
    icon: <ChalkboardSimple size={25} />,
    name: "sideBar.stages",
    link: `${import.meta.env.VITE_PUBLIC_URL}/Stages`,
  },
  {
    icon: <ChalkboardSimple size={25} />,
    name: "sideBar.classes",
    link: `${import.meta.env.VITE_PUBLIC_URL}/Classes`,
  },
  {
    icon: <ChalkboardTeacher size={25} />,
    name: "sideBar.teachers",

    link: `${import.meta.env.VITE_PUBLIC_URL}/Teachers`,
  },
  {
    icon: <UsersThree size={25} />,
    name: "sideBar.groups",

    link: `${import.meta.env.VITE_PUBLIC_URL}/Groups`,
  },
  // {
  //   icon: <Users size={25} />,
  //   name: "sideBar.users",
  //   link: `${import.meta.env.VITE_PUBLIC_URL}/Users`,
  // },
  // {
  //   icon: <Package size={25} />,
  //   name: "Products",
  //   link: "/products",
  // },
  // { icon: <Airplay size={25} />, name: "Website", link: "/website" },
  // { icon: <Gear size={25} />, name: "Setting", link: "/setting" },
];

const navigationAdmin = [
  {
    icon: <House size={25} />,
    name: "sideBar.dashboard",
    link: `${import.meta.env.VITE_PUBLIC_URL}/`,
  },
  {
    icon: <Users size={25} />,
    name: "sideBar.moderators",
    link: `${import.meta.env.VITE_PUBLIC_URL}/Moderators`,
  },
  {
    icon: <Books size={25} />,
    name: "sideBar.subjectsNames",
    link: `${import.meta.env.VITE_PUBLIC_URL}/SubjectsNames`,
  },
  {
    icon: <ChalkboardTeacher size={25} />,
    name: "sideBar.teachers",

    link: `${import.meta.env.VITE_PUBLIC_URL}/Teachers`,
  },
  {
    icon: <UsersThree size={25} />,
    name: "sideBar.groups",

    link: `${import.meta.env.VITE_PUBLIC_URL}/Groups`,
  },
];

const SidebarItem = ({ icon, name, link, onClick }) => {
  const location = useLocation();
  const isActive = location.pathname === link;

  const handleClick = () => {
    onClick();
  };

  return (
    <Link
      tag={Link}
      to={link}
      active={isActive ? 'true' : 'false'}
      onClick={handleClick}
      className={classNames(
        isActive
          ? "bg-gradient-to-r from-themeColor to-gray-900 text-white "
          : "text-sky-950 dark:text-white hover:bg-gradient-to-r hover:from-themeColor",
        `py-1.5 px-4 text-sm font-medium rounded-md flex items-center
         gap-2 duration-150 ease-linear`
      )}
    >
      {icon}
      {name}
    </Link>
  );
};

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Sidebar({ isSidebarOpen, closeSidebar }) {
  const { language, changeLanguage, t } = useI18nContext();
  const initialPath =
    localStorage.getItem("currentPath") ||
    `${import.meta.env.VITE_PUBLIC_URL}/`;

  const [role, setRole] = useState(localStorage.getItem("role") || "Guest");

  // اختيار الـ navigation بناءً على الـ role
  const selectedNavigation =
    role === "SuperAdmin"
      ? navigationSuperAdmin
      : role === "Server"
      ? navigationServer
      : navigationAdmin;

  const [activeIndex, setActiveIndex] = useState(
    selectedNavigation.findIndex((item) => item.link === initialPath)
  );

  const handleItemClick = (index, link) => {
    setActiveIndex(index);
    localStorage.setItem("currentPath", link);
    if (window.innerWidth <= 768) {
      closeSidebar();
    }
  };

  return (
    <div
      className="flex h-screen dark:bg-gray-900 bg-gray-50 border-r
     border-gray-200 dark:border-gray-800 dark:shadow-xl"
    >
      {/* Sidebar */}
      <nav
        className={`flex flex-col w-full dark:bg-gray-900 bg-gray-50 ${
          isSidebarOpen ? "block" : "hidden"
        }`}
      >
        <div className="flex items-center justify-center h-16 bg-gray-900 z-20">
          <img className="h-8 w-auto" src={LogoWide} alt="HighLevel" />
        </div>
        <div className="flex-grow p-4">
          <div className="flex flex-col space-y-4">
            {selectedNavigation.map((item, index) => (
              <SidebarItem
                key={index}
                icon={item.icon}
                name={t(item.name)}
                link={item.link}
                onClick={() => handleItemClick(index, item.link)}
              />
            ))}
          </div>
        </div>
      </nav>
    </div>
  );
}
