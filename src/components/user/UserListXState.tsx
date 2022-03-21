import React, { useContext, useEffect, useState } from 'react';
import { appMachine } from './AppMachine';
import { useMachine } from '@xstate/react';
import Loader from '../loaderComponent';
import UserDataService from '../../services/UserService';
// import { Deleteicon } from './Deleteicon';

import IUserData from '../../types/userType'
import { Link } from 'react-router-dom';
import { Observable } from 'rxjs';

function UserListXState() {


    // const [users,setUsers] = useState('');
    // const [users, setUsers] = useState<xIUserData>();
    const [users, setUsers] = useState<Array<IUserData>>([]);

    const [state, sendToMachine] = useMachine(appMachine);
    const isLoading = state.matches('list.loading')
    const list = state.context.users;
    // const list = users;


    useEffect(() => {
        sendToMachine('LOAD_BOOKS');
        // setUsers(state.context.users);
    }, []);


    const handleButtonClick = () => {
        // send('FETCH')
        console.log(state.context.users);
    }

    const deleteUser = (index: number) => {

        let userId: number = list.at(index)!.id;
    
        // const userId = 100;
        UserDataService.remove(userId)
            .then((response) => {
                sendToMachine('LOAD_BOOKS');
                alert("The user was deleted successfully!");
            })
            .catch((e) => {
                console.log(e);
            });
    };

    return (
        <>



            <>


                <div className="container-xl">
                    {list.length === 0 && !isLoading && (
                        <div className="text-center">
                            <h2>No user found at the moment</h2>
                        </div>
                    )}

                    {isLoading && (
                        <><h2 className="loading-text"></h2><Loader></Loader></>

                    )}
                    {!isLoading && (
                        <div className="table-responsive">
                            <div className="table-wrapper">
                                <table className="table table-striped table-hover">
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>First Name</th>
                                            <th>Last Name</th>
                                            <th>Email</th>
                                            <th>Gender</th>
                                            <th>Company Name</th>
                                            <th>Department</th>
                                            <th>Actions</th>

                                        </tr>
                                    </thead>

                                    <tbody>
                                        {/* //list.map((user, i) => */}
                                        {list && list.map((user:IUserData,index:number) => <tr key={user.id}>
                                            <td>{user.id}</td>

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
                                                        <button className="btn btn-sm btn-outline-secondary" onClick={() => deleteUser(index)}>Delete User</button>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                        )}
                                    </tbody>

                                </table>
                            </div>
                        </div>
                    )}
                </div>



            </>



        </>




    );
}

export default UserListXState;