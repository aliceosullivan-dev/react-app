import * as React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import axios from 'axios';

export interface IValues {
    [key: string]: any;
}
export interface IFormState {
    id: number,
    user: any;
    values: IValues[];
    submitSuccess: boolean;
    loading: boolean;
    userFound: boolean;
}


class ViewUser extends React.Component<RouteComponentProps<any>, IFormState> {
    constructor(props: RouteComponentProps) {
        super(props);
        this.state = {
            id: this.props.match.params.id,
            user: {},
            values: [],
            loading: false,
            submitSuccess: false,
            userFound: false

        }
    }

    // loading spinner

    // https://www.basefactor.com/react-how-to-display-a-loading-indicator-on-fetch-calls

    public componentDidMount(): void {
        let userFound = false;

        axios.get(`http://localhost:5000/users/${this.state.id}`).then(data => {
            this.setState({ user: data.data, userFound: true });
        })  .catch( (error) => {
            //Handle error
            console.log(error);
            this.setState({userFound: false});

          });
    }




    public render() {
        const { submitSuccess, loading } = this.state;

        const user = this.state.user;
        console.log(user);
        return (

            <div>
                {!this.state.userFound && (
                    <div className="text-center">
                        <h2>User not found</h2>
                    </div>
                )}

                {this.state.userFound && this.state.user && user.name != '' && (
                    <div className="App">

                        <h1> User Details</h1>
                        <div className="container">
                            <div className="row">
                                <table className="table table-bordered">
                                    <thead className="thead-light">
                                        <tr>
                                            <th scope="col">First Name</th>
                                            <th scope="col">Last Name</th>
                                            <th scope="col">Email</th>
                                            <th scope="col">Gender</th>
                                            <th scope="col">Company Name </th>
                                            <th scope="col">Department</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr key={user.id}>
                                            <td>{user.first_name}</td>
                                            <td>{user.last_name}</td>
                                            <td>{user.email}</td>
                                            <td>{user.gender}</td>
                                            <td>{user.company.name}</td>
                                            <td>{user.company.department}</td>

                                        </tr>

                                    </tbody>
                                </table>
                            </div>
                        </div>




























                    </div>







                )}
            </div>

        )
    }
}
export default withRouter(ViewUser)