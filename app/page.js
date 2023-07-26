"use client"
import { useState } from "react"
import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes} from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyBITNV9idNIkM0rLbAlDHDGTPtew-81vSI",
  authDomain: "my-first-firestore-jct.firebaseapp.com",
  projectId: "my-first-firestore-jct",
  storageBucket: "my-first-firestore-jct.appspot.com",
  messagingSenderId: "744714981130",
  appId: "1:744714981130:web:d67fac4b594aec4a08b4f3"
};




export default function Home() {
  const [file, setFile] = useState()
  const [uploadedFile, setUploadFile] = useState()
  const handleFile = (e) => {
    console.log(e.target.files[0])
    setFile(e.target.files[0])
    // connect to storage
    const app = initializeApp(firebaseConfig); // connect to our project
    const storage = getStorage(app) // connects to storage
    // create a reference to ourbfile in storage using filename
    const filename = e.target.files[0].name
    const imageRef = ref(storage,'photos/' + filename)
    // use Todd's hack to get the url for that file
    const url = `https://firebasestorage.googleapis.com/v0/b/my-first-firestore-jct.appspot.com/o/photos%2F${filename}?alt=media`
    // upload
    uploadBytes(imageRef, e.target.files[0])
    .then(() => setUploadFile(url))
    .catch(alert)
  }
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
    <h1 className='text-3xl font-bold'>Upload a Photo</h1>
    <input type='file' accept="image/*" onChange={handleFile}/>
    {file &&
    <div className="w-1/2 h-1/2 rounded">
    <h2 className="text-xl font-semibold">Image from computer:</h2>
    <img src={URL.createObjectURL(file)} className="object-cover" />
    </div>
    }
    {uploadedFile &&
    <div className="w-1/2 h-1/2 rounded">
    <h2 className="text-xl font-semibold">Image from computer:</h2>
    <img className="object-cover" src={uploadedFile}  />
    </div>
    }
    </main>
  )
}
