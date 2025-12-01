
import './App.css'
import MainD from './components/dashboard/mainD';
import Login from './components/login';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import PrivateRoute from './PrivateRoute';
import Citas from './components/dashboard/citas';

function App() {
  
  return (
    <BrowserRouter>
   <Routes>
        {/* Ruta pública */}
        <Route path='/' element={<Login />} />

        {/* Rutas protegidas */}
        <Route 
          path='/Dashboard' 
          element={
            <PrivateRoute>
              <MainD />
            </PrivateRoute>
          }
        />

        <Route 
          path="/Dashboard/crear_cita" 
          element={
            <PrivateRoute>
              <Citas />
            </PrivateRoute>
          }
        />

        <Route 
          path="/Dashboard/cancelar_cita" 
          element={
            <PrivateRoute>
              <div>Cancelar cita</div>
            </PrivateRoute>
          }
        />

        <Route 
          path="/Dashboard/ver_citas" 
          element={
            <PrivateRoute>
              <div>Ver citas</div>
            </PrivateRoute>
          }
        />
        <Route 
          path="/Dashboard/ver_pacientes" 
          element={
            <PrivateRoute>
              <div>Modificar_paciente</div>
            </PrivateRoute>
          }
        />
        <Route 
          path="/Dashboard/modificar_pacientes" 
          element={
            <PrivateRoute>
              <div>Ver doctores</div>
            </PrivateRoute>
          }
        />
        <Route 
          path="/Dashboard/ver_doctores" 
          element={
            <PrivateRoute>
              <div>Ver Usuarios</div>
            </PrivateRoute>
          }
        />
        <Route 
          path="/Dashboard/crear_usuario" 
          element={
            <PrivateRoute>
              <div>Ver doctores</div>
            </PrivateRoute>
          }
        />
        <Route 
          path="/Dashboard/ver_historial_clinico" 
          element={
            <PrivateRoute>
              <div>Ver doctores</div>
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App
