import './App.css'
import Header from './components/header/Header'
import MyPlants from './pages/myplants/MyPlants'
import Login from './pages/login/Login';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './Context/AuthContext';
import { PlantsProvider } from './Context/PlantsContext';
import AddPlant from './pages/addplant/AddPlant';
import ProtectedRoute from './components/common/ProtectedRoute';
import Homepage from './pages/homepage/Homepage';
import Footer from './components/footer/Footer';
import Collection from './pages/plantlibrary/Collection';

function App() {
  return (
    <>
      <AuthProvider>
        <PlantsProvider>
          <Header></Header>
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/collection" element={<Collection />} />
            <Route path="/login" element={
              <ProtectedRoute requireAuth={false}>
                <Login />
              </ProtectedRoute>
            } />
            <Route path="/myplants" element={
              <ProtectedRoute requireAuth={true}>
                <MyPlants />
              </ProtectedRoute>
            } />
            <Route path="/addplant" element={
              <ProtectedRoute requireAuth={true}>
                <AddPlant />
              </ProtectedRoute>
            } />
          </Routes>
          <Footer />
        </PlantsProvider>
      </AuthProvider>
    </>
  )
}

export default App