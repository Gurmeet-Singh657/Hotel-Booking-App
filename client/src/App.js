import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom"
import Home from "./pages/home/Home"
import List from "./pages/list/List"
import Hotel from "./pages/hotel/Hotel"
import Login from "./pages/login/Login.jsx";
import Register from "./pages/register/Register.jsx"
import Single from "./pages/single/Single.jsx"
import UserEdit from "./pages/UserEdit/UserEdit.jsx";
import { userInputs } from "./formSource";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/hotels" element={<List />} />
          <Route path="/hotels/:id" element={<Hotel />} />
          <Route path="/login" element={<Login />} />
          <Route path="/Register" element={<Register inputs={userInputs} />} />
          <Route path="/userprofile" element={<Single />} />
          <Route path="/users/editPage" element={<UserEdit inputs={userInputs} />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;