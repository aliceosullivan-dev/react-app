import * as React from 'react';
import './App.css';
import { Switch, Route, withRouter, RouteComponentProps, Link, Redirect } from 'react-router-dom';
import AddUser from './components/user/AddUser';
import UserList from './components/UserList';
import UserProfile from './components/user/UserProfile';
import EditUser from './components/user/EditUser';
import Booklist from './components/user/UserBookList';
import UserListXState from './components/user/UserListXState';

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
            {/* <Route path="/" component={UserList}/> */}
            <Route path={'/users'} exact component={UserList} /> 

            {/* <Route path={'/users'} exact component={Home} /> */}
            {/* <Route path={'/create'} exact component={Create} /> */}
            <Route path={'/create'} exact component={AddUser} />

            {/* <Route path={'/users/:id/edit'} exact component={EditUser} /> */}
            <Route path="/users/:id/:edit" component={EditUser} />

            <Route path="/add" component={AddUser} />

            <Route path={"/users/:id"} exact component={UserProfile} />
            <Route path={"/list"} exact component={ UserListXState} />

            {/* <Route path={'/users/:id'} exact component={ViewUser} /> */}

            <Route path="/">{<Redirect to="/users" /> }</Route>
          </Switch>
        </div>
      </div>
    );
  }
}
export default withRouter(App);