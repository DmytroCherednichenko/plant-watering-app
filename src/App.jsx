import './App.css'
import Header from './components/header/Header'
import MyPlants from './pages/myplants/MyPlants'
import Login from './pages/login/Login';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './Context/AuthContext';
import AddPlant from './pages/addplant/AddPlant';

function App() {
  return (
    <>
      <AuthProvider>
        <Header></Header>
        <Routes>
          <Route path="/" element={<MyPlants />} />
          <Route path="/login" element={<Login />} />
          <Route path="/myplants" element={<MyPlants />} />
          <Route path="/addplant" element={<AddPlant />} />
        </Routes>
      </AuthProvider>
    </>
  )
}

export default App
