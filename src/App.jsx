/** @format */

import "./App.css";
import { Route, Routes, useNavigate } from "react-router-dom";
import UpdateInforUser from "./Components/User/UpdateInforUser/UpdateInforUser";
import LoginScreen from "./Components/LoginScreen/LoginScreen";
import RegisterScreen from "./Components/RegisterScreen/RegisterScreen";
import MyFooter from "./Components/MyFooter/MyFooter";
import MyHeader from "./Components/MyHeader/MyHeader";
import Homepage from "./Components/User/Homepage/Homepage";
function App() {
  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <MyHeader />
              <MyFooter />
            </>
          }
        />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/register" element={<RegisterScreen />} />
        <Route path="/user/homepage" element={<Homepage />} />
      </Routes>
    </div>
  );
}

export default App;
