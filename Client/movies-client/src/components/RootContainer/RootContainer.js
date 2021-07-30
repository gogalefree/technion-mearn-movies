import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Movies from '../Movies/Movies';
import NavBar from '../NavBar/NavBar';
import { Container } from 'react-bootstrap';
import EditMovie from '../Movies/EditMovie';
import CreateMovie from '../Movies/CreateMovie';
import AllSubscriptions from '../Subscriptions/Subscriptions';
import MovieDetails from '../Movies/MovieDetails';
import EditMember from '../Members/EditMember';
import  CreateMember  from '../Members/CreateMember';
export default function RootContainer() {
  return (
    <>
      <NavBar />

      <Container>
        <Switch>
          <Route path="/" exact component={Movies} />
        </Switch>
        <Switch>
          <Route path="/editMovie/:id" exact component={EditMovie} />
        </Switch>
        <Switch>
          <Route path="/createMovie" exact component={CreateMovie} />
        </Switch>
        <Switch>
          <Route path="/subscriptions" exact component={AllSubscriptions} />
        </Switch>
        <Switch>
          <Route path="/movieDetails/:id" exact component={MovieDetails} />
        </Switch>
        <Switch>
          <Route path="/editMember/:id" exact component={EditMember} />
        </Switch>
        <Switch>
          <Route path="/createMember" exact component={CreateMember} />
        </Switch>
      </Container>
    </>
  );
}
