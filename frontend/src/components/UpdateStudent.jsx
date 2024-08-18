import React, { useState,useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

function UpdateStudent() {
    const [Name, setName] = useState('');
    const [Email, setEmail] = useState('');
    const navigate=useNavigate()
    const {id}=useParams();
    useEffect(() => {
        // Fetch the student's current data when the component mounts
        axios.get(`http://localhost:3002/UpdateStudent/${id}`)
            .then(res => {
               
                setName(res.data.Name);
                setEmail(res.data.Email);
              
            })
            .catch(err => console.error("Error fetching student data:", err));
    },[id]);

    const handleSubmit = () => {
        if (Name !== '' && Email !== '') {
            axios.put(`http://localhost:3002/UpdateStudent/${id}`, {Name, Email })
                .then(res => console.log("Success:", res.data))
                .then(navigate('/'))
                .catch(err => console.error("Error:", err));
        } else {
            console.log("Name and Email are required.");
        }
    };

    return (
        <div className='bg-blue-700 min-h-screen flex justify-center items-center'>
           
            <div className="bg-white w-[500px] h-[400px] flex relative flex-col gap-4 p-7 justify-center rounded-xl">  
            <h1 className='font-bold text-3xl absolute top-[40px] left-[100px]'>Update Student Data</h1>
                <div>
                    <label htmlFor="name" className='pr-3 text-lg font-bold'>Name</label>
                    <input 
                        type="text" 
                        id="name"
                        value={Name} 
                        onChange={(e) => setName(e.target.value)} 
                        className='pl-4 outline-none border-2 w-[300px]' 
                        placeholder='Enter your name' required
                    />
                </div>
                <div>
                    <label htmlFor="email" className='pr-3 text-lg font-bold'>Email</label>
                    <input 
                        type="text" 
                        id="email"
                        value={Email}
                        onChange={(e) => setEmail(e.target.value)} 
                        className='pl-4 outline-none border-2 w-[300px]' 
                        placeholder='Enter your email' required 
                    />
                </div>
                <button 
                    onClick={handleSubmit}
                    className='bg-green-500 mx-[160px]  p-3 rounded-lg shadow-md shadow-black'
                >
                    Save Changes
                </button>
            </div>
        </div>
    );
}

export default UpdateStudent;
