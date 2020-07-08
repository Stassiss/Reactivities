import React, { Fragment } from 'react';
import { Container } from 'semantic-ui-react';
import NavBar from '../../Features/Nav/NavBar';
import ActivitiesDashboard from '../../Features/activities/dashboard/ActivitiesDashboard';

import { observer } from "mobx-react-lite"
import { Route, withRouter, RouteComponentProps } from 'react-router-dom';
import HomePage from '../../Features/home/HomePage';
import ActivityForm from '../../Features/activities/form/ActivityForm';
import ActivitiyDetails from '../../Features/activities/details/ActivitiyDetails';
// location comes from RouteComponentProps
const App: React.FC<RouteComponentProps> = ({ location }) => {


  return (
    <Fragment>
      <Route exact path="/" component={HomePage} />
      <Route path={'/(.+)'} render={() => (
        <Fragment>
          <NavBar />
          <Container style={{ marginTop: "7em" }}>

            <Route exact path="/activities" component={ActivitiesDashboard} />
            <Route path="/activity/:id" component={ActivitiyDetails} />
            <Route
              key={location.key}
              path={["/create", "/manage/:id"]}
              component={ActivityForm}
            />
          </Container >
        </Fragment >
      )}
      />
    </Fragment >
  );
}


export default withRouter(observer(App));
