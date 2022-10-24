import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Single from "./pages/single/Single";
import SingleHotel from "./pages/SingleHotel/SingleHotel"
import SingleRoom from "./pages/SingleRoom/SingleRoom";
import New from "./pages/new/New";
import NewHotel from "./pages/newHotel/NewHotel";
import NewRoom from "./pages/newRoom/NewRoom"

import List from "./pages/list/List";
import { Navigate } from "react-router-dom"
import UserEdit from "../src/pages/UserEdit/UserEdit.jsx"
import HotelEdit from "../src/pages/HotelEdit/HotelEdit.jsx"
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom"
import { userInputs, hotelInputs } from "./formSource";
import "./style/dark.scss"
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import { hotelColumns, roomColumns, userColumns } from "./datatablesource";
import RoomEdit from "./pages/RoomEdit/RoomEdit";

function App() {

  const ProtectedRoute = ({ children }) => {
    const { user } = useContext(AuthContext);
    if (!user) {
      return <Navigate to="/login" />
    }
    return children;
  }
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route path="login" element={<Login />} />
            <Route index element={<ProtectedRoute><Home /></ProtectedRoute>} />
            <Route path="users">
              <Route index element={<ProtectedRoute><List columns={userColumns} /></ProtectedRoute>} />
              <Route path=":userId" element={<ProtectedRoute><Single /></ProtectedRoute>} />
              <Route path="new" element={<ProtectedRoute><New inputs={userInputs} title="Add New User" /></ProtectedRoute>} />
              <Route path="editPage/:userId" element={<ProtectedRoute><UserEdit inputs={userInputs} title="Add New User" /></ProtectedRoute>} />
            </Route>
            <Route path="hotels">
              <Route index element={<ProtectedRoute><List columns={hotelColumns} /></ProtectedRoute>} />
              <Route path=":hotelId" element={<ProtectedRoute><SingleHotel /></ProtectedRoute>} />
              <Route path="new" element={<ProtectedRoute>
                <NewHotel /></ProtectedRoute>} />
              <Route path="editPage/:hotelId" element={<ProtectedRoute><HotelEdit inputs={hotelInputs} title="Add New Hotel" /></ProtectedRoute>} />
            </Route>
            <Route path="rooms">
              <Route index element={<ProtectedRoute><List columns={roomColumns} /></ProtectedRoute>} />
              <Route path=":roomId" element={<ProtectedRoute><SingleRoom /></ProtectedRoute>} />
              <Route path="new" element={<ProtectedRoute>
                <NewRoom /></ProtectedRoute>} />
              <Route path="editPage/:roomId" element={<ProtectedRoute><RoomEdit /></ProtectedRoute>} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div >
  );
}

export default App;
