import { useMemo } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/user/Login';
import Page from './base/route/Page';
import Home from './pages/Home';
import MeetingCreate from './pages/meeting/MeetingCreate';
import MeetingVote from './pages/meeting/MeetingVote';
import UserList from './pages/user/UserList';
import Register from './pages/user/Register';


function App() {

  const routesList = useMemo(() => [
      { path: "/home", name: "Reuniões", allowedRoles: ['ADMIN', 'CHEFE', 'USER'], component: Home },
      { path: "/meeting/create", name: "Criar Reunião", allowedRoles: ['ADMIN', 'CHEFE', 'USER'], component: MeetingCreate },
      { path: "/meeting/:id", name: "Alterar Reunião", allowedRoles: ['ADMIN', 'CHEFE', 'USER'], component: null },
      { path: "/meeting/detail/:id", name: "Consultar Reunião", allowedRoles: ['ADMIN', 'CHEFE', 'USER'], component: MeetingCreate },
      { path: "/meeting/vote/:id", name: "Consultar Reunião", allowedRoles: ['ADMIN', 'CHEFE', 'USER'], component: MeetingVote },
      { path: "/user/list", name: "Usuários", allowedRoles: ['ADMIN'], component: UserList },
      { path: "/register/:id", name: "Sign-up", allowedRoles: [], component: Register }
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
                            <Page name={route.name} allowedRoles={route.allowedRoles} path={route.path}>
                                <Component />
                            </Page>
                        }
                    />
                );
            })}

            <Route path="/login" element={<Login />} />
            <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
