import { useSelector } from 'react-redux';
import { LandingPage,Dashboard } from './index.js';
import { Navigate } from 'react-router-dom';


function HomeGate() {
  const isAuthenticated = useSelector(state => state.auth.status);

  return isAuthenticated ? <Navigate to="/dashboard" replace /> : <LandingPage />;
}

export default HomeGate;
