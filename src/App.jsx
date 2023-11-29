/** @format */
import { useEffect } from "react";
import {
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import "./App.css";
import LoginScreen from "./Components/LoginScreen/LoginScreen";
import MyFooter from "./Components/MyFooter/MyFooter";
import MyHeader from "./Components/MyHeader/MyHeader";
import RegisterScreen from "./Components/RegisterScreen/RegisterScreen";
import Banner from "./Components/Banner/Banner";
import { useSelector } from "react-redux";
import User from "./Components/User/User";
import UpdateInforUser from "./Components/User/UpdateInforUser/UpdateInforUser";
import Admin from "./Components/Admin/Admin";
function App() {
  const navigate = useNavigate();
  const role = useSelector(
    (state) => state.userReducer.dataUser.role
  );
  const isLoggedIn = useSelector(
    (state) => state.userReducer.isLoggedIn
  );
  console.log(role);
  console.log(isLoggedIn);
  useEffect(() => {
    if (isLoggedIn === false || isLoggedIn === null) {
      navigate("/homepage");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedIn]);
  return (
    <div>
      <Routes>
        <Route
          path='/homepage'
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
          path='/user/updateInformation'
          element={
            <>
              <MyHeader />
              <UpdateInforUser />
              <MyFooter />
            </>
          }
        />
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
