import React, { Fragment, useEffect } from 'react';
import { Container, ModalContent } from 'semantic-ui-react'
import NavBar from './NavBar';
import { observer } from 'mobx-react-lite';
import { Outlet, useLocation } from 'react-router-dom';
import HomPage from './home/HomePage';
import { ToastContainer } from 'react-toastify';
import { useStore } from '../store/store';
import LoadingComponent from '../../components/LoadingComponent';
import ModalContainer from '../../common/modals/ModalContainer';

function App() {
  const location = useLocation();
  const { commonStore, userStore } = useStore();
  useEffect(() => {
    if (commonStore.token) {
      userStore.getUser().finally(() => commonStore.setAppLoaded())
    } else {
      commonStore.setAppLoaded()
    }
  }, [commonStore, userStore]);
  if (!commonStore.appLoaded) return <LoadingComponent content="Loading app.." />
  return (
    //this Fragment tag could be replaced by <> empty brackets
    <>
    <ModalContainer />
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
