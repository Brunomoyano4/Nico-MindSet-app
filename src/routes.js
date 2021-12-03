import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Layout from './Components/Layout';
import Home from './Components/Home';
import Admins from './Components/Admins';
import AdminsForm from './Components/Admins/Form';
import Applications from './Components/Applications';
import Clients from './Components/Clients';
import Interviews from './Components/Interviews';
import Positions from './Components/Positions';
import Postulants from './Components/Postulants';
import Profiles from './Components/Profiles';
import Psychologists from './Components/Psychologists';
import Sessions from './Components/Sessions';

const Routes = () => {
  return (
    <Layout>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/admins" component={Admins} />
        <Route path="/admins/form" component={AdminsForm} />
        <Route path="/admins/form/:id" component={AdminsForm} />
        <Route path="/applications" component={Applications} />
        <Route path="/clients" component={Clients} />
        <Route path="/interviews" component={Interviews} />
        <Route path="/positions" component={Positions} />
        <Route path="/postulants" component={Postulants} />
        <Route path="/profiles" component={Profiles} />
        <Route path="/psychologists" component={Psychologists} />
        <Route path="/sessions" component={Sessions} />
      </Switch>
    </Layout>
  );
};

export default Routes;
