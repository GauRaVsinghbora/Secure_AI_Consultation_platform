import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements
} from "react-router-dom";

import { Provider } from 'react-redux';
import { store } from './store/store.js';

import Protected from './routes/Protected.jsx';

import { HomeGate, Dashboard, About, Contact } from './pages/index.js'; // FIX

import { GoogleOAuthProvider } from '@react-oauth/google';

import PublicLayout from "./layouts/PublicLayout";
import DashboardLayout from "./layouts/DashboardLayout";
import ChatPage from './pages/ChatPage.jsx';

// routes
const router = createBrowserRouter(
  createRoutesFromElements(

    <Route element={<App />}>

      {/* PUBLIC WEBSITE */}
      <Route element={<PublicLayout />}>
        <Route index element={<HomeGate />} />
              <Route path="/contact" element={<Contact />} />
      <Route path="/about" element={<About />} />
      </Route>

      {/* DASHBOARD */}
      <Route element={<Protected authentication={true} />}>
        
        <Route path="/dashboard/*" element={<DashboardLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="chat/:sessionId" element={<ChatPage />} />
        </Route>

      </Route>





    </Route>

  )
);
createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <RouterProvider router={router} fallbackElement={<p>Loading...</p>} />
    </GoogleOAuthProvider>
  </Provider>
)