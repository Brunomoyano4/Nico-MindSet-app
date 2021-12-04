import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Layout from './Components/Layout';
import Home from './Components/Home';
import Admins from './Components/Admins';
import AdminsForm from './Components/Admins/Form';
import Applications from './Components/Applications';
import ApplicationsForm from './Components/Applications/Form';
import Clients from './Components/Clients';
import ClientsForm from './Components/Clients/Form';
import Interviews from './Components/Interviews';
import InterviewsForm from './Components/Interviews/Form';
import Positions from './Components/Positions';
import PositionsForm from './Components/Positions/Form';
import Postulants from './Components/Postulants';
import PostulantsForm from './Components/Postulants/Form';
import Profiles from './Components/Profiles';
import ProfilesForm from './Components/Profiles/Form';
import Psychologists from './Components/Psychologists';
import PsychologistsForm from './Components/Psychologists/Form';
import Sessions from './Components/Sessions';
import SessionsForm from './Components/Sessions/Form';

const Routes = () => {
  return (
    <Layout>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/admins" component={Admins} />
        <Route path="/admins/form" component={AdminsForm} />
        <Route path="/admins/form/:id" component={AdminsForm} />
        <Route exact path="/applications" component={Applications} />
        <Route path="/applications/form" component={ApplicationsForm} />
        <Route path="/applications/form/:id" component={ApplicationsForm} />
        <Route exact path="/clients" component={Clients} />
        <Route path="/clients/form" component={ClientsForm} />
        <Route path="/clients/form/:id" component={ClientsForm} />
        <Route exact path="/interviews" component={Interviews} />
        <Route path="/interviews/form" component={InterviewsForm} />
        <Route path="/interviews/form/:id" component={InterviewsForm} />
        <Route exact path="/positions" component={Positions} />
        <Route path="/positions/form" component={PositionsForm} />
        <Route path="/positions/form/:id" component={PositionsForm} />
        <Route exact path="/postulants" component={Postulants} />
        <Route path="/postulants/form" component={PostulantsForm} />
        <Route path="/postulants/form/:id" component={PostulantsForm} />
        <Route exact path="/profiles" component={Profiles} />
        <Route path="/profiles/form" component={ProfilesForm} />
        <Route path="/profiles/form/:id" component={ProfilesForm} />
        <Route exact path="/psychologists" component={Psychologists} />
        <Route path="/psychologists/form" component={PsychologistsForm} />
        <Route path="/psychologists/form/:id" component={PsychologistsForm} />
        <Route exact path="/sessions" component={Sessions} />
        <Route path="/sessions/form" component={SessionsForm} />
        <Route path="/sessions/form/:id" component={SessionsForm} />
      </Switch>
    </Layout>
  );
};

export default Routes;
