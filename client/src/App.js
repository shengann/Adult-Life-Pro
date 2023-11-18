import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppLayout, ProtectedRoute, Home, Expenses, FinancialReport, ToDo } from './pages';
import './index.css';

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
          <Route index element={<Navigate replace to="home" />} />
          <Route path="home" element={<Home />} />
          <Route path="expenses" element={<Expenses />} />
          <Route path="financial-report" element={<FinancialReport />} />
          <Route path="to-do" element={<ToDo />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;