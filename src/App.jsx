/** @format */

import "./App.css";
import { Route, Routes, useNavigate } from "react-router-dom";
import UpdateInforUser from "./Components/User/UpdateInforUser/UpdateInforUser";
import LoginScreen from "./Components/LoginScreen/LoginScreen";
import RegisterScreen from "./Components/RegisterScreen/RegisterScreen";
import MyFooter from "./Components/MyFooter/MyFooter";
import MyHeader from "./Components/MyHeader/MyHeader";
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
      </Routes>
    </div>
  );
}

export default App;
