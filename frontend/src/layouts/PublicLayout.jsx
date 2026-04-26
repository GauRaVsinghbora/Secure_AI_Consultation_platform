import { Outlet, useLocation } from "react-router-dom";
import { useState } from "react";
import { Header, Footer, AuthModal } from "../components";

function PublicLayout() {

  const [authPopup, setAuthPopup] = useState({
    open: false,
    type: "login"
  });

  const location = useLocation();

  return (
    <div className="min-h-screen flex flex-col">

      <Header setAuthPopup={setAuthPopup} />

      <main className="flex-1">
        <Outlet />
      </main>

      <Footer />

      {authPopup.open && (
        <AuthModal
          type={authPopup.type}
          onClose={() => setAuthPopup({ ...authPopup, open: false })}
        />
      )}

    </div>
  );
}

export default PublicLayout;