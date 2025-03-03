import {use, useContext, useEffect, useState } from "react";
import "../App.css";
import "../index.css"
import { IoGridOutline } from "react-icons/io5";
import { FiSearch } from "react-icons/fi";
import { BiTask } from "react-icons/bi";
import { CiCalendar } from "react-icons/ci";
import { FaPlus, FaRegMap, FaRegStar } from "react-icons/fa";
import { MdOutlineAssignmentInd } from "react-icons/md";
import { PiInfoDuotone } from "react-icons/pi";
import { GoDotFill } from "react-icons/go";
import { Link, NavLink } from "react-router-dom";
import { TfiMenuAlt } from "react-icons/tfi";
import MenuItem from "../components/MenuItem";
import { ViewContext } from "../layout/DashBoardLayout";
import useAuth from "../hooks/useAuth";
import { GrLogout } from "react-icons/gr";


const Dashboard = () => {
    const {user, logOut} = useAuth()
    
    
    const {view, setView} = useContext(ViewContext)
    // theme handle
    const [theme, setTheme] = useState("light");
    
    
    useEffect(() => {
        if(!user) return <p>loading...</p>
        const savedTheme = localStorage.getItem("theme");
        if (savedTheme) {
            setTheme(savedTheme);
            document.querySelector("html").setAttribute("data-theme", savedTheme);
        }
    }, [user]);
    console.log(user);

  const handleThemeToogle = (e) => {
    const newTheme = e.target.checked ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.querySelector("html").setAttribute("data-theme", newTheme);
  };

  // sidebar handle
  useEffect(() => {
    const sidebar = document.getElementById("sidebar");
    const openSidebarButton = document.getElementById("open-sidebar");

    if (!sidebar || !openSidebarButton) {
      console.error("Sidebar or button element not found.");
      return;
    }

    // Add event listener to toggle sidebar
    const handleOpenSidebar = (e) => {
      e.stopPropagation();
      sidebar.classList.toggle("-translate-x-full");
    };
    openSidebarButton.addEventListener("click", handleOpenSidebar);

    // Close the sidebar when clicking outside
    const handleClickOutside = (e) => {
      if (
        !sidebar.contains(e.target) &&
        !openSidebarButton.contains(e.target)
      ) {
        sidebar.classList.add("-translate-x-full");
      }
    };
    document.addEventListener("click", handleClickOutside);

    // Cleanup event listeners on component unmount
    return () => {
      openSidebarButton.removeEventListener("click", handleOpenSidebar);
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);


  return (
    <>
      <div
        className="absolute bg-white mt-4 z-10 w-72 min-h-screen overflow-y-auto transition-transform transform -translate-x-full ease-in-out duration-200"
        id="sidebar"
      >
        {/* <!-- Your Sidebar Content --> */}
        <div className="p-4 mt-5">
          {/* <h1 className="text-2xl font-semibold">Sidebar</h1> */}
          <aside className="flex flex-col bg-[#eef6ef] w-64 px-4 overflow-y-auto border-r rtl:border-r-0 rtl:border-l">
            <div className="flex flex-col items-center mt-6 -mx-2">
              <img
                className="object-cover w-24 h-24 mx-2 rounded-full"
                src={user?.photoURL || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVCHywHxDFVk0j8PEgX8FELCQ8Vbiu2a49Xg&s"}
                alt="avatar"
              />
              <h4 className="mx-2 mt-2 font-medium">{user.displayName}</h4>
            </div>

            <div className="flex flex-col flex-1 mt-6">
              <nav className="bg-white py-4">
              <MenuItem label='Todo' address='/dashboard' icon={CiCalendar}/>
              </nav>
              <div className="bg-white py-6 mt-3">
              <MenuItem label='Add Task' address='addTask' icon={FaPlus}/>
              </div>
              <div className="bg-white py-6 mt-5 ">
                <div className="flex items-center justify-between">

                <span className="mx-4 font-medium">
                  Today Tasks{" "}
                </span>
                  
                <a
                  className="flex items-center py-2 px-4 transition-colors duration-300 transform rounded-lg"
                  href="#"
                >
                  <PiInfoDuotone size={20} />
                </a>
                </div>
                
              <span className="ml-4 text-lg font-bold w-10 bg-green-200 p-1 rounded-full">
                    11
                  </span>
              </div>
              <hr />
              {/* progress */}
              <div className="relative p-4 bg-white ">
                <svg className="rotate-[180deg] w-32 h-32 ml-8 ">
                  <circle
                    className="text-[#142e15]"
                    strokeWidth="30"
                    stroke="currentColor"
                    fill="transparent"
                    r="50"
                    cx="65"
                    cy="65"
                  />
                  <circle
                    className="text-[#3f9142]"
                    strokeWidth="30"
                    strokeDasharray="250"
                    // strokeDashoffset="80"
                    strokeLinecap="butt"
                    stroke="currentColor"
                    fill="transparent"
                    r="50"
                    cx="65"
                    cy="65"
                  />
                </svg>
                <div className="mt-4 flex gap-8 items-center justify-center">
                  <h3 className="flex items-center justify-center">
                    <GoDotFill className="text-[#3f9142]" />
                    <span>Pending</span>
                  </h3>
                  <span className="flex items-center justify-center">
                    <GoDotFill className="text-[#142e15]" />
                    <span>Done</span>
                  </span>
                </div>
              </div>
              {/* logout */}
              <div>
                <button
            onClick={logOut}
            className='flex w-full items-center px-4 py-2 mt-5 text-gray-600 hover:bg-gray-300   hover:text-gray-700 transition-colors duration-300 transform'
          >
            <GrLogout className='w-5 h-5' />

            <span className='mx-4 font-medium'>Logout</span>
          </button>
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* <!-- Content --> */}
      <div className="flex-1 flex flex-col overflow-hidden w-full">
        {/* <!-- Navbar --> */}
        <nav className="flex justify-between px-6 h-14 items-center z-50">
          <div className="flex gap-4 items-center">
            <button className="" id="open-sidebar">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </button>
            <img src="../public/logo.png" alt="" srcSet="" />
          </div>
          <div className="flex items-center">
            <div className="flex items-center"></div>
            <ul className="flex items-center space-x-6">
              <li>
                <FiSearch />
              </li>
              <li onClick={()=>setView(!view)} className="">
                {
                  view ? <IoGridOutline className="cursor-pointer" /> : <TfiMenuAlt className="cursor-pointer" />
                }
                
                
              </li>
             
              <li>
                {/* toagle */}

                <label className="swap swap-rotate mr-2">
                  <input
                    onChange={handleThemeToogle}
                    type="checkbox"
                    className=" theme-controller row-start-1 col-start-1 col-span-2"
                    checked={theme === "dark"}
                  />
                  <svg
                    className="swap-off fill-current w-6 h-6"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
                  </svg>

                  {/* moon icon */}
                  <svg
                    className="swap-on fill-current w-6 h-6"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
                  </svg>
                </label>
              </li>
            </ul>
          </div>
        </nav>

        {/* <!-- Content Body --> */}
        {/* <h3 className="text-blue-500 text-7xl">here is content</h3> */}
      </div>
    </>
  );
};

export default Dashboard;