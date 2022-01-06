import { Switch, Route, useRouteMatch } from 'react-router-dom';
import { useEffect } from 'react';
import { tokenListener } from 'helper/firebase';
import Home from 'Components/Psychologist/Home';
import Layout from 'Components/Layout';

const PsychologistRoutes = () => {
  const { url } = useRouteMatch();
  useEffect(() => {
    tokenListener();
  }, []);
  return (
    <Layout routes={[{ name: 'Logout', path: '/auth/login' }]}>
      <Switch>
        <Route path={`${url}/`} component={Home} />
      </Switch>
    </Layout>
  );
};

export default PsychologistRoutes;
