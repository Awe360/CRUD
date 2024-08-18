import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Navigate, useNavigate,Link } from 'react-router-dom';
import UpdateStudent from './updateStudent';


function Student() {
    const [students, setStudents] = useState([]);
    const navigate=useNavigate();
    useEffect(() => {
        axios.get('http://localhost:3002')
            .then(res => setStudents(res.data))
            .catch(err => console.error(err));
    });
// const HandleSubmit=(e)=>{
//     e.preventDefault()
//     navigate('/Creat')
// }
    return (
        <div className="bg-blue-700 min-h-screen flex flex-col justify-center items-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-4xl">
                <Link to='/createStudent' className='bg-green-600 text-white py-2 px-4 rounded mb-4'>Add +</Link>
                <table className='min-w-full border-collapse'>
                    <thead className='border-b-2 border-black'>
                        <tr>
                            <th className='px-3 py-3 w-[150px] text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Name</th>
                            <th className='px-3 py-3 w-[100px] text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Email</th>
                            <th className='w-[150px] '>Action</th>
                            
                        </tr>
                    </thead>
                    <tbody>
                        {students.length > 0 ? (
                            students.map((student, index) => (
                                <tr key={index} className="border-b">
                                    <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900'>{student.Name}</td>
                                    <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>{student.Email}</td>
                                    <td><Link to={`/UpdateStudent/${student.ID}`} className=' bg-yellow-400 mr-4 px-5 py-3 rounded-lg'>Update</Link>
                                    <button onClick={()=>{axios.delete(`http://localhost:3002/DeleteStudent/${student.ID}`)
                .then(res => console.log("Success:", res.data))
                .then(navigate('/'))
                .catch(err=>{console.log(err)})}} className=' bg-red-600 mr-4 px-5 py-3 rounded-lg'>Delete</button></td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="2" className='px-6 py-4 text-center text-sm text-gray-500'>No data available</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Student;
