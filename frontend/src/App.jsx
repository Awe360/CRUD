import React from 'react'
import Student from './components/Student.jsx'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import CreateStudent from './components/CreateStudent.jsx'
import UpdateStudent from './components/updateStudent.jsx'



function App() {
  return (
    <div>
    <BrowserRouter>
    <Routes>
          <Route path='/' element={<Student/>} />
          <Route path='/CreateStudent' element={<CreateStudent/>} />
          <Route path='/UpdateStudent/:id' element={<UpdateStudent/>} />

    </Routes>
    </BrowserRouter>
    </div>
  )
}

export default App
