import { useEffect, useMemo, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/user/Login';
import Page from './base/route/Page';
import DefaultNavigation from './base/route/DefaultNavigation';
import Home from './pages/Home';
import MeetingCreate from './pages/meeting/MeetingCreate';
import MeetingVote from './pages/meeting/MeetingVote';
import UserList from './pages/user/UserList';


function App() {

  const routesList = useMemo(() => [
      { path: "/home", name: "Reuniões", allowedRoles: ['ADMIN', 'USER'], component: Home },
      { path: "/meeting/create", name: "Criar Reunião", allowedRoles: ['ADMIN', 'USER'], component: MeetingCreate },
      { path: "/meeting/:id", name: "Alterar Reunião", allowedRoles: ['ADMIN', 'USER'], component: null },
      { path: "/meeting/detail/:id", name: "Consultar Reunião", allowedRoles: ['ADMIN', 'USER'], component: MeetingCreate },
      { path: "/meeting/vote/:id", name: "Consultar Reunião", allowedRoles: ['ADMIN', 'USER'], component: MeetingVote },
      { path: "/user/list", name: "Usuários", allowedRoles: ['ADMIN'], component: UserList }
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
