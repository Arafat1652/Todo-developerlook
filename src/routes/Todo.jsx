import { FaRegStar, FaStar } from "react-icons/fa";
import { GoBell, GoCalendar } from "react-icons/go";
import { IoMdArrowDropdown } from "react-icons/io";
import { BsRepeat } from "react-icons/bs";
import {useEffect, useState } from "react";
import { ViewContext } from "../layout/DashBoardLayout";
import RightSidebar from "../components/RightSidebar";
import useAuth from "../hooks/useAuth";
import axios from "axios";
import toast from "react-hot-toast";

const Todo = () => {
   
    const {user} = useAuth()
    const [todoData, SetTodoData]= useState([])

    useEffect(()=>{
        axios.get(`${import.meta.env.VITE_API_URL}/task/${user.email}`)
        .then(res => {
            // console.log("User tasks:", res.data);
            SetTodoData(res.data)
        })
    },[user])
    const handleStatusChange = async (taskId, newStatus) => {
        try {
            console.log(`Updating Task ID: ${taskId} with Status: ${newStatus}`);
    
            const response = await axios.put(`${import.meta.env.VITE_API_URL}/tasks/${taskId}`, {
                status: newStatus,
            });
    
            console.log("Update Response:", response.data);
            
            // Update UI after successful update
            SetTodoData(prevData =>
              prevData.map(task =>
                task._id === taskId ? { ...task, status: newStatus } : task
              )
            );
            toast.success(response.data.message)
        } catch (error) {
            console.error("Error updating task status:", error.response ? error.response.data : error);
        }
    };

    const handleDeleteTask = async (taskId) => {
      try {
          const confirmDelete = window.confirm("Are you sure you want to delete this task?");
          if (!confirmDelete) return;
  
          const response = await axios.delete(`${import.meta.env.VITE_API_URL}/tasks/${taskId}`);
  
          console.log("Delete Response:", response.data);
  
          // Update UI after successful deletion
          SetTodoData(prevData => prevData.filter(task => task._id !== taskId));
  
          toast.success(response.data.message);
      } catch (error) {
          console.error("Error deleting task:", error.response ? error.response.data : error);
          toast.error("Failed to delete task.");
      }
  };
  


if(!user) return <p>loading...</p>
  return (
    <div className=" px-8">
      <hr className="border-1" />
      <div className="bg-[#eef6ef] pb-4 pl-5">
        <h3 className="mb-10 pt-8">Add A Task</h3>
        <div className="flex items-center justify-between ">
          <div className="flex gap-4">
            <GoBell size={20} />
            <BsRepeat size={20} />
            <GoCalendar size={20} />
          </div>
          <button
            id="open-rightbar"
            className="btn text-let-color bg-[#cddfcf] font-bold mr-2"
          >
            ADD TASK
          </button>
        </div>
      </div>
    


<table className="min-w-full divide-y bg-cyan-100 mt-10">
    <thead>
        <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">#</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">title</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Due Date</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
        </tr>
    </thead>
    <tbody className="bg-white divide-y divide-gray-200">
    {todoData.map(
          (toDo, index) =>  <tr>
          <td className="px-6 py-4 whitespace-nowrap">{index+1}</td>
          <td className="px-6 py-4 whitespace-nowrap">{toDo.title}</td>
          <td className="px-6 py-4 whitespace-nowrap"> {new Date(toDo.createdAt).toLocaleString()}</td>
          <td >
              <td className="px-6 py-4 whitespace-nowrap">
    <select
        value={toDo.status}
        onChange={(e) => handleStatusChange(toDo._id, e.target.value)}
        className="p-2 border rounded-md"
    >
        <option value="Pending">Pending</option>
        <option value="In Progress">In Progress</option>
        <option value="Completed">Completed</option>
    </select>
</td>
          </td>
          <td className="px-6 py-4 whitespace-nowrap">
          <button 
    onClick={() => handleDeleteTask(toDo._id)}
    className="ml-2 px-4 py-2 font-medium text-white bg-red-600 rounded-md hover:bg-red-500 focus:outline-none focus:shadow-outline-red active:bg-red-600 transition duration-150 ease-in-out"
>
    Delete
</button>
          </td>
      </tr>
        )}
       
    </tbody>
</table>

      <div>
       

        {/* right sidebar start */}
        <RightSidebar />
      </div>
    </div>
  );
};

export default Todo;
