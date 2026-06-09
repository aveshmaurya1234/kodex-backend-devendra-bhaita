import React from 'react'
import { useState } from 'react'
import axios from 'axios'

const App = () => {
  const [file, setFile] = useState(null)
  const [files, setFiles] = useState(null)
  console.log("files", files)

  const handleSendFile = async () => {
    try{
      let formData = new FormData()
      // // --- for single file ---
      // formData.append("image", file)
      // let res = await axios.post("http://localhost:3000/api/files/image-upload", formData)
      // console.log(res)

      // --- for multiple files ---
      for(let file of files) {
        formData.append("images", file)
      }
      let res = await axios.post("http://localhost:3000/api/files/multiple-upload", formData)
      console.log(res)            

    }catch(err) {
      console.log("error while uploading file", err)
    }
  }

  return (
    <div>
      <h1>Image Upload</h1>
      <p>uploading image using multer and imagekit</p>

      {/* for single file */}
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <button onClick={handleSendFile}>Send file</button>

      {/* for multiple files */}
      <input type="file" multiple onChange={(e) => setFiles(e.target.files)} />
      <button onClick={handleSendFile}>Send files</button>
    </div>
  )
}

export default App
