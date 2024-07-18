import "./App.css";

import { BrowserRouter, Route, Navigate, Routes } from "react-router-dom";
import Auth from "./pages/Auth";
import EventsPage from "./pages/Events";
import BookingsPage from "./pages/Bookings";
import MainNavigation from "./components/Navigation/MainNavigation";
import {
  ApolloProvider
} from "@apollo/client";
import client from "./apolloClient";
import { AuthProvider } from "./context/auth/authContext";
import {EventProvider} from "./context/event/eventContext";
import { ProtectedRoute } from "./authGuard/ProtectedRoute";
function App() {

  return (
    <BrowserRouter>
      <ApolloProvider client={client}>
        <AuthProvider>
          <EventProvider>
          <>
            <MainNavigation />
            <main>
              <Routes>
                <Route path="/" element={<Navigate replace to="/auth" />} />
                <Route path="/login" element={<Auth />} />
                <Route path="/events" element={<EventsPage />} />
              
                <Route path="/bookings" element={  <ProtectedRoute>
                  <BookingsPage />
                </ProtectedRoute>} />
              </Routes>
            </main>
          </>
        </EventProvider>
        </AuthProvider>

      </ApolloProvider>
    </BrowserRouter>
  );
}

export default App;
