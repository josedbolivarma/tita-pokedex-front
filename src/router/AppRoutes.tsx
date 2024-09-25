import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { DashboardRoutes } from './'

export const AppRoutes = () => {
  return (
    <BrowserRouter>
        <Routes>
            <Route 
                path='/*' 
                element={<DashboardRoutes />}
            />
        </Routes>
    </BrowserRouter>
  )
}
