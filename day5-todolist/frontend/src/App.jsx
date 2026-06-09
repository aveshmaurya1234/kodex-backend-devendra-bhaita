import { useState, useRef } from "react";
import axios from 'axios'
import { useEffect } from "react";
import List from "./components/List";
import { createNewList, deleteList, fetchAllLists } from "./api/listApis";

const App = () => {
  const inpRef = useRef({});
  const [lists, setLists] = useState([])

  let handelFormSubmit = async (e) => {
    e.preventDefault();

    let obj={
      name:inpRef.current.name.value,
      description:inpRef.current.description.value
    }

    let res = await createNewList(obj)
    getAllList()
    
    e.target.reset();
  }

  let getAllList = async () => {
    let res = await fetchAllLists();
    setLists(res)
  }

  useEffect(() => {
    getAllList()
  }, [])

  let handleDelete = async (id) => {
    let res = deleteList(id)
    getAllList()
  }

 
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-indigo-900 flex flex-col gap-5 items-center justify-center p-4">
      <div className="w-full max-w-lg bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl p-6 text-white">
        <form onSubmit={handelFormSubmit}>
          {/* Title */}
          <h1 className="text-3xl font-bold text-center mb-6">
            Task Manager
          </h1>

          {/* Input Section */}
          <div className="space-y-3 mb-5">
            <input
              ref={(e) => (inpRef.current.name = e)}
              type="text"
              placeholder="Task title..."
              className="w-full px-4 py-2 rounded-lg bg-white/20 placeholder-white/60 focus:outline-none"
            />

            <textarea
              ref={(e) => (inpRef.current.description = e)}
              placeholder="Task description..."
              className="w-full px-4 py-2 rounded-lg bg-white/20 placeholder-white/60 focus:outline-none resize-none"
            />

            <button
              className="w-full bg-indigo-500 hover:bg-indigo-600 transition py-2 rounded-lg font-semibold"
            >
              Add Task
            </button>
          </div>

        </form>
      </div>

      {
        lists.map((elem) => (
          <List key={elem._id} list={elem} handleDelete={handleDelete} />
        ))
      }
    </div>
  );
}
export default App
