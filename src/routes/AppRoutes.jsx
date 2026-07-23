import { Navigate, Route, Routes } from "react-router-dom";

import LoginPage from "@/features/auth/pages/LoginPage";
import MedicinesPage from "@/features/medicines/pages/MedicinesPage";
import OrdersPage from "@/features/orders/pages/OrdersPage";
import DashboardPage from "@/features/dashboard/pages/DashboardPage";
import ReportsPage from "@/features/reports/pages/ReportsPage";
import WarehouseLayout from "@/layouts/WarehouseLayout";
import ProtectedRoute from "@/routes/ProtectedRoute";


function AppRoutes() {
  return (
    <Routes>

      <Route 
        path="/login" 
        element={<LoginPage />} 
      />


      <Route element={<ProtectedRoute />}>

        <Route element={<WarehouseLayout />}>

          <Route
            path="/dashboard"
            element={<DashboardPage />}
          />


          <Route
            path="/medicines"
            element={<MedicinesPage />}
          />
<Route
  path="/reports"
  element={<ReportsPage />}
/>

          <Route
            path="/orders"
            element={<OrdersPage />}
          />

        </Route>

      </Route>


      <Route
        path="*"
        element={<Navigate to="/login" replace />}
      />


    </Routes>
  );
}

export default AppRoutes;