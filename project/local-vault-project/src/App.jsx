import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'
import { storeFile } from './services/fileService'
import FileList from './components/fileList'

function App() {
  const [message, setMessage] = useState('');

  async function handleFileChnage(event) {

    const file = event.target.files[0];

    if(!file){
      return;
    }

    try {

      setMessage("Saving file...");
      const id = await storeFile(file);
      console.log("Stored file:", id)
      setMessage("file stored successfully!")

    } catch(error){
      console.error(error)
      setMessage("failed to store file.")
    }
  }

  return (
    <div>
        <h1>LocalVault</h1>

        <input
            type="file"
            onChange={handleFileChnage}
        />

        <p>{message}</p>

        <FileList/>
    </div>
  )
}

export default App