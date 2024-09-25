import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { routes } from './routes'

export const DashboardRoutes = () => {
  return (
    <>

        <Routes>
            {
               routes.map(({ Component, path }) => (
                <Route key={path} path={path} element={<Component />} />
               ))
            }

            <Route path='*' element={<Navigate to='/' />} />
        </Routes>
    </>
  )
}
