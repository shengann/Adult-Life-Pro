import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppLayout, ProtectedRoute, Home, Expenses, Friends } from './pages';
import './index.css';
import "react-datepicker/dist/react-datepicker.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <AppLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate replace to="expenses" />} />
          {/* <Route path="home" element={<Home />} /> */}
          <Route path="expenses" element={<Expenses />} />
          <Route path="friends" element={<Friends />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;