import 'semantic-ui-css/semantic.min.css';
import React, { Fragment } from 'react';
import './App.css';
import { Container } from 'semantic-ui-react'

import NavBar from './NavBar';


import { observer } from 'mobx-react-lite';
import { Outlet, useLocation } from 'react-router-dom';
import HomPage from './home/HomePage';

function App() {
  const location = useLocation();
  return (
    //this Fraagment tag could be replaced by <> empty brackets

    <Fragment>
      {
        location.pathname === "/" ? <HomPage /> :
          <>
            <NavBar />
            <Container style={{ marginTop: '7em' }}>
              <Outlet />
            </Container>
          </>
      }
    </Fragment>
  );
}

export default observer(App);
