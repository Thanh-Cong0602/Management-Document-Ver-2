import { Route, Routes } from "react-router-dom";
import "./App.css";
import LoginScreen from "./Components/LoginScreen/LoginScreen";
import MyFooter from "./Components/MyFooter/MyFooter";
import MyHeader from "./Components/MyHeader/MyHeader";
import RegisterScreen from "./Components/RegisterScreen/RegisterScreen";
import Homepage from "./Components/User/Homepage/Homepage";
import UpdateInforUser from "./Components/User/UpdateInforUser/UpdateInforUser";
import Banner from "./Components/Banner/Banner";

function App() {
  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <MyHeader />
              <Banner />
              <MyFooter />
            </>
          }
        />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/register" element={<RegisterScreen />} />
        <Route path="/user/homepage" element={<Homepage />} />
        <Route
          path="/user/updateInformation"
          element={
            <>
              <MyHeader />
              <UpdateInforUser />
              <MyFooter />
            </>
          }
        />
      </Routes>
    </div>

  );
}

export default App;
