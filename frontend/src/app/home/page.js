"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FiArrowLeft } from "react-icons/fi";
import { toast } from "react-toastify";

const apiurl = process.env.NEXT_PUBLIC_API_URL;

const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    router.push("/signIn");
  };

  const fetchTasks = async () => {
    try {
      const res = await axios.get(`${apiurl}/task/data`);
      console.log("data", res.data);
      setTasks(res.data.result || []);
    } catch (err) {
      console.error("Error fetching tasks:", err);
    }
  };

  const handleAddTask = async (e) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) {
      toast.warning("Please fill in all fields");
      return;
    }
    try {
      const res = await axios.post(`${apiurl}/task/addTask`, {
        title,
        description,
      });
      setTitle("");
      toast.success(res.data.message);
      setDescription("");
      fetchTasks();
      console.log("dara", res);
    } catch (error) {
      toast.success(error.response?.data?.message);
    }
  };

  const handleMarkDone = async (id) => {
    try {
      const res = await axios.put(`${apiurl}/task/${id}/done`);
      toast.success(res.data.message);
      fetchTasks();
    } catch (error) {
      console.log("Error marking task done", error);
      toast.success(error.response?.data?.message);
    }
  };

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (!isLoggedIn) {
      router.push("/signIn");
    }
    fetchTasks();
  }, [router]);



  return (
    <div className="w-full h-screen flex justify-center items-center">
      <main className="p-10 flex justify-between items-start w-full h-full gap-24">
        <div className="flex flex-col justify-between w-2/5 sticky top-0 h-full">
          <div className="flex flex-col gap-3">
            <h1 className="text-2xl font-bold mb-4">Add a Task</h1>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Task Title"
              className="p-2 outline-0 border-2 rounded-md border-gray-100 focus:ring-2 focus:ring-blue-500/50"
            />
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description"
              className="p-2 outline-0 border-2 rounded-md border-gray-100 focus:ring-2 focus:ring-blue-500/50"
            />
            <div className="flex justify-end mt-4">
              <button
                onClick={handleAddTask}
                className="bg-blue-700 text-white rounded px-12 py-2 hover:bg-blue-900 transition-all duration-300 hover:scale-110"
              >
                Add
              </button>
            </div>
          </div>
            <div>
              <button onClick={handleLogout} className="flex items-center gap-2 hover:text-red-400 p-2">
                <FiArrowLeft />
                Logout
              </button>
            </div>
        </div>
        <div className="w-[3px] h-full bg-black/20 rounded-full" />
        <div className="w-3/5 flex flex-col justify-center items-center">
          <ul className="w-full flex flex-col items-center gap-4">
            {tasks.length > 0 ? (
              tasks.map((task) => (
                <li
                  className="px-4 py-6 mb-2 rounded-xl w-full bg-black/20"
                  key={task.id}
                >
                  <h3 className="font-semibold text-lg">{task.title}</h3>
                  <div className="flex items-center justify-between mt-2">
                    <p>{task.description}</p>
                    <button
                      onClick={() => handleMarkDone(task.id)}
                      className="border border-black px-10 py-1 rounded hover:border-green-600 hover:bg-green-600 transition-all duration-300 hover:text-white"
                    >
                      Done
                    </button>
                  </div>
                </li>
              ))
            ) : (
              <p>Tasks not found</p>
            )}
          </ul>
        </div>
      </main>
    </div>
  );
};

export default Home;
