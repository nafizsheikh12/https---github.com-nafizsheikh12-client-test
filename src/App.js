import logo from './logo.svg';
import './App.css';
import {useState,useEffect} from "react"
import axios from 'axios'


const url =" http://localhost:5000/"

function App() {
  const [image, setimage] = useState('')
  const [title, settitle] = useState('')
  const [data, setdata] = useState([])
  const handleChange = (e) => {
       settitle(e.target.value)
  }
  const handleClick = async () => {
        console.log(image)
      await  axios.post(`${url}addupload`,{
          title:title,
          image
        },{
        headers: {
          'Content-Type': 'multipart/form-data',
      }}
    )
  }
 
  useEffect(() => {
    const fetchRoom = async () => {
        const {data} = await axios.get(`${url}getall`);
        setdata(data)
    }
    fetchRoom();
},[])
console.log(data.data)
  return (
    <div className="App p-8">
          <div className='mt-5 flex flex-col mb-4'>
              <div class="mb-4">
                 <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
                   title
                 </label>
                 <input onChange={handleChange} value={title} class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="title"/>
               </div>

              <input type="file" onChange={(e) => setimage(e.target.files[0])} className="my-4"/>
              <button onClick={handleClick} className="bg-[#1eafb9] text-white p-3">submit</button>
          </div>
    <div className="flex flex-col">
          {
       data.data &&     data.data.map((data) => (
              <>
                  <div class="w-full rounded overflow-hidden shadow-lg p-7 mb-5">
                    <img class="w-full" src={`${url}${data.image}`} alt="Sunset in the mountains"/>
                     <div class="px-6 py-4">
                           <div class="font-bold text-xl mb-2">  {data.title}</div>
                     </div> 
                  </div>
              </>
            ))
           }
    </div>       
    </div>
  );
}

export default App;
