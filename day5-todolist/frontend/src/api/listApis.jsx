import axios from "axios"

export let createNewList = async (data) => {
    try {
        let res = await axios.post("http://localhost:3000/api/lists/create", data)      
        return res;
    } catch (error) {
        console.log("error in get list", error)
    }
}

export let fetchAllLists = async () => {
    try {
        let res = await axios.get("http://localhost:3000/api/lists")      
        return res.data.list;
    } catch (error) {
        console.log("error in get list", error)
    }
}

export let deleteList = async (id) => {
    try {
        let res = await axios.delete(`http://localhost:3000/api/lists/delete/${id}`)
        alert("list deleted")
        return res;
    } catch (error) {
        console.log("error in delete api", error)
    }
}
 
