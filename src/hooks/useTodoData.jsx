// const {user} = useAuth()
//     if (user?.email) { // Ensure email exists before making the request
//         axios.get(`${import.meta.env.VITE_API_URL}/task/${user.email}`)
//             .then(res => {
//                 console.log("User tasks:", res.data);
//             })
//             .catch(error => {
//                 console.error("Error fetching tasks:", error);
//             });
//     }

import axios from "axios";
import { useEffect, useState } from "react";
import useAuth from "./useAuth";


const useTodoData = () => {
    const {user} = useAuth()
    const [todoData, SetTodoData]= useState([])

    useEffect(()=>{
        axios.get(`${import.meta.env.VITE_API_URL}/task/${user.email}`)
            .then(res => {
                // console.log("User tasks:", res.data);
                SetTodoData(res.data)
            })
    },[])
    return [todoData];
};

export default useTodoData;