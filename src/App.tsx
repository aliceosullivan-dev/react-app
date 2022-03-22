import * as React from 'react';
import './App.css';
import { Switch, Route, withRouter, RouteComponentProps, Link, Redirect } from 'react-router-dom';
import AddUser from './components/user/AddUser';
import UserProfile from './components/user/UserProfile';
import EditUser from './components/user/EditUser';
import UserListXState from './components/user/UserListXState'; // XState version of User List
import UserList from './components/UserList'; // Local state version of User List
import CoolPlanetLogo from './CoolPlanetLogo.png';

class App extends React.Component<RouteComponentProps<any>> {
  public render() {
    return (
      <div>
        <div className="container-xl">
          <div className="table-responsive">
            <div className="table-wrapper title-wrapper">
              <div className="table-title">
                <div className="row">
                  <div className="col-sm-5">
                    <img src={CoolPlanetLogo} alt="Admin" width="150">
                    </img>
                    <h2><Link to={'/users'}> User Management </Link></h2>
                  </div>
                  <div className="col-sm-7">
                    <Link to={'/create'} className="header-link btn btn-secondary"> Create User </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <Switch>
            <Route path={'/create'} exact component={AddUser} />
            <Route path="/users/:id/:edit" component={EditUser} />
            <Route path="/add" component={AddUser} />
            <Route path={"/users/:id"} exact component={UserProfile} />
            <Route path={"/users"} exact component={UserListXState} />
            <Route path="/">{<Redirect to="/users" />}</Route>

          </Switch>
        </div>
      </div>
    );
  }
}
export default withRouter(App);