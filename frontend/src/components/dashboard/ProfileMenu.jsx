import { useDispatch } from "react-redux";
import { logout } from "../../slice/authSlice";
import { logout as logoutApi } from "../../api/authApi";
import { useNavigate } from "react-router-dom";

function ProfileMenu({ closeMenu }) {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {

      await logoutApi();

      dispatch(logout());

      navigate("/", { replace: true });

    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <div className="absolute right-0 mt-2 w-40 bg-[#020617] border border-gray-700 rounded-lg shadow-lg">

      <button
        className="block w-full text-left px-4 py-2 hover:bg-gray-800"
      >
        Settings
      </button>

      <button
        className="block w-full text-left px-4 py-2 hover:bg-gray-800"
        onClick={handleLogout}
      >
        Logout
      </button>

    </div>
  );
}

export default ProfileMenu;