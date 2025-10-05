import { useEffect, useMemo, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/user/Login';
import Page from './base/route/Page';
import DefaultNavigation from './base/route/DefaultNavigation';
import MeetingList from './pages/meeting/MeetingList';
import MeetingCreate from './pages/meeting/MeetingCreate';
import MeetingDetail from './pages/meeting/MeetingDetail';


function App() {

  const routesList = useMemo(() => [
      { path: "/meeting/list", name: "Reuniões", allowedRoles: ['ADMIN', 'USER'], component: MeetingList },
      { path: "/meeting/create", name: "Criar Reunião", allowedRoles: ['ADMIN', 'USER'], component: MeetingCreate },
      { path: "/meeting/:id", name: "Alterar Reunião", allowedRoles: ['ADMIN', 'USER'], component: null },
      { path: "/meeting/detail/:id", name: "Consultar Reunião", allowedRoles: ['ADMIN', 'USER'], component: MeetingDetail },

      { path: "/configuracao/usuarios", name: "Usuários", allowedRoles: ['ADMIN', 'USER'], component: null }
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
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
