import React from 'react';
import toast from 'react-hot-toast';
import useAuth from '../hooks/useAuth';
import { useForm } from 'react-hook-form';

const AddTask = () => {

    
    const { user, updateUser } = useAuth();
    const email = user.email
    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    const onSubmit = async (data) => {
        const { title, description, dueDate, status } = data;
    
        const taskData = {
            title,
            description,
            dueDate,
            status,
            email // Add user email from auth
        };
    
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/tasks`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(taskData)
            });
    
            const result = await response.json();
    
            if (response.ok) {
                toast.success("Task added successfully!");
                reset(); // Reset the form
            } else {
                toast.error(result.error || "Something went wrong");
            }
        } catch (error) {
            console.error("Error adding task:", error);
            toast.error("Failed to add task");
        }
    

    }

    return (
        <section className="bg-white p-4 xs:p-8">
            <div className="max-w-96 sm:max-w-4xl mx-auto border border-[#4D7C0F] rounded-lg p-8">
                <h2 className="sm:text-xl text-[12px] font-bold mb-6">ADD TASK</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="space-y-6">
                        <div>
                            <label className="text-xs xs:text-sm font-medium text-gray-700 mb-1">Title</label>
                            <input type="text" {...register("title", { required: true })} className="h-[50px] rounded-[5px] text-xs xs:text-sm border border-[#D1D5DB] w-full px-2" placeholder="Task Title"/>
                            {errors.title && <span className="text-red-500">Title is required</span>}
                        </div>
                        <div>
                            <label className="text-xs xs:text-sm font-medium text-gray-700 mb-1">Description</label>
                            <textarea {...register("description", { required: true })} className="w-full border border-gray-300 rounded-lg p-3 focus:outline-purple-500" placeholder="Task Description"></textarea>
                            {errors.description && <span className="text-red-500">Description is required</span>}
                        </div>
                        <div>
                            <label className="text-xs xs:text-sm font-medium text-gray-700 mb-1">Due Date</label>
                            <input type="date" {...register("dueDate", { required: true })} className="h-[50px] rounded-[5px] text-xs xs:text-sm border border-[#D1D5DB] w-full px-2" />
                            {errors.dueDate && <span className="text-red-500">Due Date is required</span>}
                        </div>
                        <div>
                            <label className="text-xs xs:text-sm font-medium text-gray-700 mb-1">Status</label>
                            <select {...register("status", { required: true })} className="h-[50px] rounded-[5px] text-xs xs:text-sm border border-[#D1D5DB] w-full px-2">
                                <option value="pending">Pending</option>
                                <option value="completed">Completed</option>
                            </select>
                            {errors.status && <span className="text-red-500">Status is required</span>}
                        </div>
                    </div>
                    <div className="mt-8 pt-6 border-t border-gray-200 flex justify-end">
                        <button type="submit" className="sm:w-[86px] lg:w-[200px] h-[50px] text-xs sm:text-base bg-[#4D7C0F] rounded-[5px] p-[13px_25px] gap-[10px] text-white">Add Task</button>
                    </div>
                </form>
            </div>
        </section>
    );
};

export default AddTask;
