import React, { useEffect, useRef, useState } from 'react';
import { appMachine } from '../../state/AppMachine';
import { useMachine } from '@xstate/react';
import Loader from '../loaderComponent';
import UserDataService from '../../services/UserService';
import IUserData from '../../types/userType';
import { Link } from 'react-router-dom';

function UserListXState() {

    const [state, sendToMachine] = useMachine(appMachine);          //consume machine
    const isLoading = state.matches('list.loading')
    const list = state.context.users;                               //table is populated from list
    const componentMounted = useRef(true);                          // component is mounted

    useEffect(() => {
        sendToMachine('LOAD_USERS');
        return () => {
            // This code runs when component is unmounted
            componentMounted.current = false; // set it to false when we leave the page
        }
    }, []);


    const deleteUser = (userId: number) => {
        UserDataService.remove(userId)
            .then((response) => {
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
                                            <th>Actions</th>

                                        </tr>
                                    </thead>

                                    <tbody>
                                        {list && list.map((user: IUserData, index: number) => 
                                        <tr key={user.id}>
                                            <td>{user.id}</td>
                                            <td>{user.first_name}</td>
                                            <td>{user.last_name}</td>
                                            <td>
                                                <div className="d-flex justify-content-between align-items-center">
                                                    <div className="btn-group" style={{ marginBottom: "20px" }}>
                                                        <Link to={`users/${user.id}`} className="btn btn-sm btn-outline-secondary">View User </Link>
                                                        <Link to={`users/${user.id}/edit`} className="btn btn-sm btn-outline-secondary">Edit User </Link>
                                                        <Link to={''} className="btn btn-sm btn-outline-secondary delete" onClick={() => deleteUser(user.id)}>Delete User </Link>
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