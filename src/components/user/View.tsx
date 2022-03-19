import * as React from 'react';
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';
import axios from 'axios';
import Loader from '../loaderComponent';

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
            loading: true,
            submitSuccess: false,
            userFound: false

        }
    }

    public componentDidMount(): void {
        let userFound = false;

        axios.get(`http://localhost:5000/users/${this.state.id}`).then(data => {
            this.setState({ user: data.data, userFound: true, loading: false });
        }).catch((error) => {
            //Handle error
            console.log(error);
            this.setState({ userFound: false, loading: false });

        });
    }

    public render() {
        const { submitSuccess, loading } = this.state;

        const user = this.state.user;
        console.log(user);
        return (
            <div>
                {this.state.loading && (
                    <><h2 className="loading-text"></h2><Loader></Loader></>

                )}
                {!this.state.userFound && !this.state.loading && (
                    <div className="text-center">
                        <h2>User not found</h2>
                    </div>
                )}

                {!this.state.loading && this.state.userFound && this.state.user && user.name != '' && (
                    <div className="App">
                        <h1> User Details</h1>
                        <div className="container">
                            <div className="main-body">

                                <div className="row gutters-sm">
                                    <div className="col-md-4 mb-3">
                                        <div className="card">
                                            <div className="card-body">
                                                <div className="d-flex flex-column align-items-center text-center">
                                                    <img src="/Users/aosullivan/react-app/avatar.png" alt="Admin" className="rounded-circle" width="150">
                                                    </img>
                                                    <div className="mt-3">
                                                        <h4>{user.first_name} {user.last_name}</h4>
                                                        <p className="text-secondary mb-1">{user.company.department}</p>
                                                        <p className="text-muted font-size-sm">{user.company.name}</p>
                                                        <button className="btn btn-primary">Follow</button>
                                                        <button className="btn btn-outline-primary">Message</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-8">
                                        <div className="card mb-3">
                                            <div className="card-body">
                                                <div className="row">
                                                    <div className="col-sm-3">
                                                        <h6 className="mb-0">First Name</h6>
                                                    </div>
                                                    <div className="col-sm-9 text-secondary">
                                                        {user.first_name}
                                                    </div>
                                                </div>
                                                <hr/>
                                                <div className="row">
                                                    <div className="col-sm-3">
                                                        <h6 className="mb-0">Last Name</h6>
                                                    </div>
                                                    <div className="col-sm-9 text-secondary">
                                                        {user.last_name}
                                                    </div>
                                                </div>
                                                    <hr/>
                                                    <div className="row">
                                                        <div className="col-sm-3">
                                                            <h6 className="mb-0">Email</h6>
                                                        </div>
                                                        <div className="col-sm-9 text-secondary">
                                                        {user.email}
                                                        </div>
                                                    </div>
                                                    <hr/>
                                                    <div className="row">
                                                        <div className="col-sm-3">
                                                            <h6 className="mb-0">Gender</h6>
                                                        </div>
                                                        <div className="col-sm-9 text-secondary">
                                                        {user.gender}
                                                        </div>
                                                    </div>
                                                    <hr/>
                                                    <div className="row">
                                                        <div className="col-sm-3">
                                                            <h6 className="mb-0">Company Name</h6>
                                                        </div>
                                                        <div className="col-sm-9 text-secondary">
                                                            ({user.company.name}
                                                        </div>
                                                    </div>
                                                    <hr/>
                                                    <div className="row">
                                                        <div className="col-sm-3">
                                                            <h6 className="mb-0">Department</h6>
                                                        </div>
                                                        <div className="col-sm-9 text-secondary">
                                                        {user.company.department}
                                                        </div>
                                                    </div>
                                                    <hr/>
                                                    <div className="row">
                                                        <div className="col-sm-12">

                                                        <Link to={`/users/${user.id}/edit`} className="btn btn-info">Edit</Link>
                                                        </div>
                                                    </div>
                                            </div>
                                        </div>


                                    </div>
                                </div>
                            </div>
                        </div>






                    </div>







                )}
            </div>

        )
    }
}
export default withRouter(ViewUser)