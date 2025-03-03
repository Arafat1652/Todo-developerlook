import { useEffect, useState } from "react";
import { BsRepeat } from "react-icons/bs";
import { FaPlus, FaRegCalendarAlt, FaRegStar } from "react-icons/fa";
import { GoBell } from "react-icons/go";


// calendar
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { IoCloseSharp } from "react-icons/io5";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { Link } from "react-router-dom";

// type ValuePiece = Date | null;
// type Value = ValuePiece | [ValuePiece, ValuePiece];


const RightSidebar = () => {
  // const [startDate, setStartDate] = useState(new Date());
  const [value, onChange] = useState(new Date());
  const [calendarOpen, setCalendarOpen] = useState(false)


  // sidebar handle
  useEffect(() => {
    const rightbar = document.getElementById("rightbar");
    const openRightbarButton = document.getElementById("open-rightbar");

    if (!rightbar || !openRightbarButton) {
      console.error("Sidebar or button element not found.");
      return;
    }

    // Toggle the sidebar's visibility
    const handleOpenRightbar = (e) => {
      e.stopPropagation();
      rightbar.classList.toggle("translate-x-full");
    };

    openRightbarButton.addEventListener("click", handleOpenRightbar);

    // Close the sidebar when clicking outside of it
    const handleClickOutside = (e) => {
      if (
        !rightbar.contains(e.target) &&
        !openRightbarButton.contains(e.target)
      ) {
        rightbar.classList.add("translate-x-full");
      }
    };
    document.addEventListener("click", handleClickOutside);

    // Cleanup event listeners on component unmount
    return () => {
      openRightbarButton.removeEventListener("click", handleOpenRightbar);
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleCloseCross=()=>{
    const rightbar = document.getElementById("rightbar");
    rightbar.classList.add("translate-x-full");
  }
//   'primColor': '#eef6ef',
//       "let-color": '#367a38',

  return (
    <div>
      <div
        className="absolute bg-[#eef6ef] mt-4 z-10 w-[452px] min-h-screen overflow-y-auto transition-transform transform translate-x-full ease-in-out duration-200 right-0 top-10"
        id="rightbar"
      >
        {/* <!-- Your Sidebar Content --> */}
        <div className="p-4 mt-5 pl-10">
          {/* <h1 className="text-2xl font-semibold">Sidebar</h1> */}
          <aside className="flex flex-col bg-[#eef6ef] px-4 overflow-y-auto border-r rtl:border-r-0 rtl:border-l">
            <div>
              {/* task */}
              <hr className="border-[1.4px]" />

              {/* add step */}
              <Link to={"addStep"} className="flex items-center justify-between pl-4 pr-8 mb-4">
                <div className="btn hover:bg-[#eef6ef] appearance-none focus:outline-none bg-transparent border-none m-0 p-0 shadow-none flex gap-5 py-5 items-center">
                  <FaPlus />
                  <h4 className="text-base">Add Step</h4>
                </div>
              </Link>
              <hr className="border-[1.4px]" />

              {/* Add due date */}
              <div className="pl-4 pr-8">
                <div className="flex items-center justify-between mb-4">
                  <div className="btn hover:bg-[#eef6ef] appearance-none focus:outline-none bg-transparent border-none m-0 p-0 shadow-none flex gap-5 py-5 items-center">
                    <FaRegCalendarAlt size={20} onClick={()=>setCalendarOpen(!calendarOpen)} className="text-base" />
                    <h4 onClick={()=>setCalendarOpen(!calendarOpen)} className="text-base hover:cursor-pointer">Add Due Date</h4>
                  </div>
                </div>
               
                {
                  calendarOpen && <Calendar onChange={onChange} value={value} className="mb-4" />
                }


              </div>
              <hr className="border-[1.4px]" />
            </div>
            {/* logout */}
            <div className="flex items-end h-[600px]">
              <button className="flex gap-28">
              <IoCloseSharp size={25} onClick={handleCloseCross} />
                <h4>CreatedToday</h4>
                <RiDeleteBin6Fill size={30} />
              </button>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default RightSidebar;
