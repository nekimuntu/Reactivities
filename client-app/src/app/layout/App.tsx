import React, { Fragment } from 'react';
import { Container } from 'semantic-ui-react'
import NavBar from './NavBar';
import { observer } from 'mobx-react-lite';
import { Outlet, useLocation } from 'react-router-dom';
import HomPage from './home/HomePage';
import { ToastContainer } from 'react-toastify';

function App() {
  const location = useLocation();
  return (

    //this Fragment tag could be replaced by <> empty brackets
    
      <>
      
        <ToastContainer key={'notify'} position='bottom-right' theme='colored' />
        {
          location.pathname === "/" ? <HomPage /> :
            <>
              <NavBar />
              <Container style={{ marginTop: '7em' }}>
                <Outlet />
              </Container>
            </>
        }
      </>
  );
}

export default observer(App);
