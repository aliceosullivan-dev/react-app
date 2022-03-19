
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
                <div className="container-xl">
                    <div className="table-responsive">
                        <div className="table-wrapper">
                            {/* <div className="table-title">
                                <div className="row">
                                    <div className="col-sm-5">
                                        <h2>User <b>Management</b></h2>
                                    </div>
                                    <div className="col-sm-7">
                                        <a className="btn btn-secondary"><i className="material-icons">&#xE147;</i> <span>Add New User</span></a>
                                        <a className="btn btn-secondary"><i className="material-icons">&#xE24D;</i> <span>Export to Excel</span></a>
                                    </div>
                                </div>
                            </div> */}
                            <table className="table table-striped table-hover">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>First Name</th>
                                        <th>Last Name</th>
                                        <th>Email</th>
                                        <th>Company Name</th>
                                        <th>Department</th>
                                        <th>Actions</th>

                                    </tr>
                                </thead>

                                <tbody>
                                {users && users.map(user =>
                                    <tr key={user.id}>
                                        <td>{user.first_name}</td>
                                        <td>{user.last_name}</td>
                                        <td>{user.email}</td>
                                        <td>{user.gender}</td>
                                        <td>{user.company.name}</td>
                                        <td>{user.company.department}</td>
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
                                {/* <tbody>
                                    <tr>
                                        <td>1</td>
                                        <td><a href="#">Michael Holz</a></td>
                                        <td>04/10/2013</td>
                                        <td>Admin</td>
                                        <td><span className="status text-success">&bull;</span> Active</td>
                                        <td>
                                            <a className="settings" title="Settings" data-toggle="tooltip"><i className="material-icons">&#xE8B8;</i></a>
                                            <a className="delete" title="Delete" data-toggle="tooltip"><i className="material-icons">&#xE5C9;</i></a>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>2</td>
                                        <td><a href="#">Paula Wilson</a></td>
                                        <td>05/08/2014</td>
                                        <td>Publisher</td>
                                        <td><span className="status text-success">&bull;</span> Active</td>
                                        <td>
                                            <a className="settings" title="Settings" data-toggle="tooltip"><i className="material-icons">&#xE8B8;</i></a>
                                            <a className="delete" title="Delete" data-toggle="tooltip"><i className="material-icons">&#xE5C9;</i></a>
                                        </td>
                                    </tr>

                                </tbody> */}
                            </table>
                            <div className="clearfix">
                                <div className="hint-text">Showing <b>5</b> out of <b>25</b> entries</div>
                                <ul className="pagination">
                                    <li className="page-item disabled"><a href="#">Previous</a></li>
                                    <li className="page-item"><a href="#" className="page-link">1</a></li>
                                    <li className="page-item"><a href="#" className="page-link">2</a></li>
                                    <li className="page-item active"><a href="#" className="page-link">3</a></li>
                                    <li className="page-item"><a href="#" className="page-link">4</a></li>
                                    <li className="page-item"><a href="#" className="page-link">5</a></li>
                                    <li className="page-item"><a href="#" className="page-link">Next</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>















            </div>
        )
    }
}