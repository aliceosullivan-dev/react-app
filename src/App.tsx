// import './App.css';

// const App = () => {
//   return (
//     <div className="App">
//       <p>Test</p>
//     </div>
//   );
// }

// export default App;

import * as React from 'react';
import './App.css';
import { Switch, Route, withRouter, RouteComponentProps, Link } from 'react-router-dom';
import Home from './components/Home';
import Create from './components/user/Create';
import EditUser from './components/user/Edit';
import ViewUser from './components/user/View';


class App extends React.Component<RouteComponentProps<any>> {
  public render() {
    return (
      <div>
        <nav>
          <ul>
            <li>
              <Link to={'/users'}> Home </Link>
            </li>
            <li>
              <Link to={'/create'}> Create User </Link>
            </li>
          </ul>
        </nav>
        <Switch>
          <Route path={'/users'} exact component={Home} />
          <Route path={'/create'} exact component={Create} />
          <Route path={'/users/:id/edit'} exact component={EditUser} />
          <Route path={'/users/:id'} exact component={ViewUser} />
        </Switch>
      </div>
    );
  }
}
export default withRouter(App);