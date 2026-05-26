import React from "react";
import { Outlet } from "react-router-dom";
import { getUser } from "./api/authApi";
import { useDispatch } from "react-redux";
import { login, logout } from "./slice/authSlice";
import { ToastContainer } from "react-toastify";

function App() {

  const [loading, setLoading] = React.useState(true);
  const dispatch = useDispatch();

  React.useEffect(() => {

    getUser()
      .then((res) => {
        if (res) {
          dispatch(login(res.data));
        } else {
          dispatch(logout());
        }
      })
      .catch(() => dispatch(logout()))
      .finally(() => setLoading(false));

  }, [dispatch]);

  if (loading) return <p>Loading...</p>;

  return (
    <>
      <ToastContainer position="top-center" autoClose={2000} />
      <Outlet />
    </>
  );
}

export default App;