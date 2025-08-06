import './App.css'
import Header from './components/header/Header'
import MyPlants from './pages/myplants/MyPlants'
import Login from './pages/login/Login';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <>
      <Header></Header>
      <Routes>
        <Route path="/" element={<MyPlants />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  )
}

export default App
