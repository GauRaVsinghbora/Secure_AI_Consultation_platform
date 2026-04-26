import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import { googleLogin } from "../../api/authApi";
import { useDispatch } from "react-redux";
import { login } from "../../slice/authSlice";

function AuthModal({ onClose }) {

  const dispatch = useDispatch();

  const handleSuccess = async (credentialResponse) => {
    try {

      const token = credentialResponse.credential;
      const res = await googleLogin(token);

      dispatch(login(res.data));

      // store user data in localStorage
      localStorage.setItem("userData", JSON.stringify(res.data));

      onClose();

    } catch (err) {
      console.error("Login error:", err);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-[1px] z-50">

      {/* Glass modal */}
      <div className="relative w-[420px] rounded-2xl border border-white/10 bg-black/80 backdrop-blur-[500px] shadow-2xl p-8 text-white">

        {/* Close button */}
        <button
          className="absolute top-4 right-4 text-gray-400 hover:text-white text-xl"
          onClick={onClose}
        >
          ✕
        </button>

        <h2 className="text-2xl font-semibold text-center mb-3">
          Log in or sign up
        </h2>

        <p className="text-gray-400 text-center mb-8 text-sm">
          You'll get smarter responses and can upload files, images, and more.
        </p>

        <div className="flex justify-center">
          <GoogleLogin
            onSuccess={handleSuccess}
            onError={() => console.log("Login Failed")}
            theme="filled_black"
            size="large"
            shape="pill"
          />
        </div>

      </div>
    </div>
  );
}

export default AuthModal;