/** @format */

import { Route, Routes } from "react-router-dom";
import "./App.css";
import LoginScreen from "./Components/LoginScreen/LoginScreen";
import MyFooter from "./Components/MyFooter/MyFooter";
import MyHeader from "./Components/MyHeader/MyHeader";
import RegisterScreen from "./Components/RegisterScreen/RegisterScreen";
import Banner from "./Components/Banner/Banner";
import { useSelector } from "react-redux";
import User from "./Components/User/User";
import Admin from "./Components/Admin/Admin";
function App() {
  const role = useSelector(
    (state) => state.userReducer.dataUser.role
  );
  const isLoggedIn = useSelector(
    (state) => state.userReducer.isLoggedIn
  );
  console.log(role);
  return (
    <div>
      <Routes>
        <Route
          path='/'
          element={
            <>
              <MyHeader />
              <Banner />
              <MyFooter />
            </>
          }
        />
        <Route path='/login' element={<LoginScreen />} />
        <Route
          path='/register'
          element={<RegisterScreen />}
        />
        {isLoggedIn ? (
          <>
            {role === "user" ? (
              <Route
                path='*'
                element={
                  <>
                    <MyHeader />
                    <User />
                  </>
                }
              />
            ) : (
              <Route
                path='*'
                element={
                  <>
                    <MyHeader />
                    <Admin />
                  </>
                }
              />
            )}
          </>
        ) : null}
      </Routes>
    </div>
  );
}

export default App;
