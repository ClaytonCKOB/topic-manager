import { useEffect, useMemo, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/user/Login';
import Page from './base/route/Page';
import DefaultNavigation from './base/route/DefaultNavigation';


function App() {

  const routesList = useMemo(() => [
      { path: "/meeting/list", name: "Reuniões", allowedRoles: ['ADMIN'], component: null },
      { path: "/meeting/create", name: "Criar Reunião", allowedRoles: ['ADMIN'], component: null },
      { path: "/meeting/:id", name: "Alterar Reunião", allowedRoles: ['ADMIN'], component: null },

      { path: "/configuracao/usuarios", name: "Usuários", allowedRoles: ['ADMIN'], component: null }
  ], []);

  return (
    <>
      <BrowserRouter>
        <Routes>
            {routesList.map((route) => {
                const Component = route.component;
                return (
                    <Route
                        key={route.path}
                        path={route.path}
                        element={
                            <Page name={route.name} allowedRoles={route.allowedRoles}>
                                <Component />
                            </Page>
                        }
                    />
                );
            })}

            <Route path="/login" element={<Login />} />
            <Route path="*" element={<DefaultNavigation />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
