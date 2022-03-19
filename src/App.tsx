import * as React from 'react';
import './App.css';
import { Switch, Route, withRouter, RouteComponentProps, Link, Redirect } from 'react-router-dom';
import Home from './components/Home';
import Create from './components/user/Create';
import EditUser from './components/user/Edit';
import ViewUser from './components/user/View';


class App extends React.Component<RouteComponentProps<any>> {
  public render() {
    return (
      <div>
        <div className="container-xl">
          <div className="table-responsive">
            <div className="table-wrapper">
              <div className="table-title">
                <div className="row">
                  <div className="col-sm-5">
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
            <Route path={'/users'} exact component={Home} />
            <Route path={'/create'} exact component={Create} />
            <Route path={'/users/:id/edit'} exact component={EditUser} />
            <Route path={'/users/:id'} exact component={ViewUser} />
            <Route path="/">{<Redirect to="/users" /> }</Route>
          </Switch>
        </div>
      </div>
    );
  }
}
export default withRouter(App);