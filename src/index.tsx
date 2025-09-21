import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AdminDashboardPage from "./app/admin/dashboard/page";
import { ILandingPage } from "./screens/ILandingPage/ILandingPage";
import "../tailwind.css";

createRoot(document.getElementById("app") as HTMLElement).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ILandingPage />} />
        <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
