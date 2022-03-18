
import * as React from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import axios from 'axios';

interface IState {
    users: any[];
}

export default class Home extends React.Component<RouteComponentProps, IState> {
    constructor(props: RouteComponentProps) {
        super(props);
        this.state = { users: [] }
    }
    public componentDidMount(): void {
        axios.get(`http://localhost:5000/users`).then(data => {
            this.setState({ users: data.data })
        })
    }
    public deleteUser(id: number) {
        axios.delete(`http://localhost:5000/users/${id}`).then(data => {
            const index = this.state.users.findIndex(users => users.id === id);
            this.state.users.splice(index, 1);
            this.props.history.push('/');
        })
    }

    public render() {
        const users = this.state.users;
        return (
            <div>
                {users.length === 0 && (
                    <div className="text-center">
                        <h2>No user found at the moment</h2>
                    </div>
                )}
                <div className="container">
                    <div className="row">
                        <table className="table table-bordered">
                            <thead className="thead-light">
                                <tr>
                                    <th scope="col">Firstname</th>
                                    <th scope="col">Lastname</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Gender</th>
                                    <th scope="col">Company</th>
                                    <th scope="col">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users && users.map(user =>
                                    <tr key={user.id}>
                                        <td>{user.first_name}</td>
                                        <td>{user.last_name}</td>
                                        <td>{user.email}</td>
                                        <td>{user.gender}</td>
                                        <td>Company</td>

                                        <td>
                                            <div className="d-flex justify-content-between align-items-center">
                                                <div className="btn-group" style={{ marginBottom: "20px" }}>
                                                    <Link to={`users/${user.id}`} className="btn btn-sm btn-outline-secondary">View User </Link>

                                                    <Link to={`users/${user.id}/edit`} className="btn btn-sm btn-outline-secondary">Edit User </Link>
                                                    <button className="btn btn-sm btn-outline-secondary" onClick={() => this.deleteUser(user.id)}>Delete User</button>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        )
    }
}