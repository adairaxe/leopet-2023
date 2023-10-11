import { useEffect, useState } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import { App as Paganini } from 'paganini';

import Routes from './Routes';
import Context from './Context';
import Login from './Components/Shared/Login/Login';
import { User } from './Components/Donador/User/User';
import Home from './Components/Shared/Home';

import logo from './Assets/Img/leopet.png';

import './App.scss';

const APP_DATA = {
  appName: 'Leopet',
  appId: 'çec0a4c4571930a9c8e9196d46e53ead',
  appSecret: 'ebb7db0da883493b8c2e1666ece903ebb8dec50949529db9ce68b1c2d69fceff',
};

export default function App() {
  const [routes, setRoutes] = useState(Routes);
  const [clientData, setClientData] = useState(undefined);

  const Payment = () => (
    <Paganini appData={APP_DATA} clientData={clientData} logoURL={logo} />
  );

  useEffect(() => {
    if (!clientData && window.location.pathname === '/payment') {
      window.location.href = '/home';
    }
  }, [clientData]);

  return (
    <Context.Provider
      value={{
        routes,
        setRoutes,
        setClientData,
      }}
    >
      <link
        rel="stylesheet"
        href="https://pro.fontawesome.com/releases/v5.10.0/css/all.css"
        integrity="sha384-AYmEC3Yw5cVb3ZcuHtOA93w35dYTsvhLPVnYs9eStHfGJvOvKxVfELGroGkvsg+p"
        crossOrigin="anonymous"
      />
      <BrowserRouter>
        <Switch>
          <Route path="/home" component={Home} exact={true} />
          <Route path="/login" component={Login} exact={true} />;
          <Route path="/register" component={User} exact={true} />;
          <Route path="/payment" component={Payment} exact={true} />;
          <AuthRoute path="/" exact={true} />;
          {routes.map((route) => {
            return (
              <AuthRoute
                key={route.path}
                role={route.role}
                component={route.component}
              />
            );
          })}
        </Switch>
      </BrowserRouter>
    </Context.Provider>
  );
}

const AuthRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      if (localStorage.session) {
        if (rest.location.pathname === '/logout') {
          localStorage.removeItem('session');
          window.userSigned = undefined;
          return <Redirect to={{ pathname: '/home' }} />;
        }
        let session = JSON.parse(localStorage.session);
        let route = Routes.find((r) => r.role == session.role);
        window.userSigned = session;
        if (!Component) {
          Component = route?.component;
        }
        return <Component {...props} />;
      }
      return <Redirect to={{ pathname: '/home' }} />;
    }}
  />
);
