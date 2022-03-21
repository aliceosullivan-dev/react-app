import React, { useState, useEffect, ChangeEvent } from "react";
import { Link } from "react-router-dom";
import UserDataService from "../services/UserService";
import IUserData from "../types/userType";
import Loader from "./loaderComponent";
import { useParams, useHistory } from 'react-router-dom';
import http from '../httpCommon'
import usersMachine from "./user/UsersMachine";
import { Machine, assign } from "xstate";
import { useMachine } from '@xstate/react'

function UserList() {

    // https://blog.openreplay.com/xstate-the-solution-to-all-your-app-state-problems
    const [state, send] = useMachine(usersMachine, {
        services: {
            fetchUsers() {
                console.log("FETCHING USERS");
                return fetch('http://localhost:5000/users')
                  .then((response) => response.json())
                  .then(data => data.value)
                  .catch(error => error)
              }
        }
    });

    const isLoading = state.matches('loading')
    const isSuccess = state.matches('success')
    const isError = state.matches('error')


    const handleButtonClick = () => {
        send('FETCH')
        console.log(state.context.users);
    }


    const [users, setUsers] = useState<Array<IUserData>>([]);
    const [currentUser, setCurrentUser] = useState<IUserData | null>(null);
    const [currentIndex, setCurrentIndex] = useState<number>(-1);
    const [searchTitle, setSearchTitle] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        // handleButtonClick();
        retrieveUsers();
    }, []);



    const onChangeSearchTitle = (e: ChangeEvent<HTMLInputElement>) => {
        const searchTitle = e.target.value;
        setSearchTitle(searchTitle);
    };
    const retrieveUsers = () => {
        UserDataService.getAll()
            .then((response: any) => {
                setUsers(response.data);
                console.log(response.data);
                setLoading(false);
            })
            .catch((e: Error) => {
                console.log(e);
                setLoading(false);

            });
    };
    const refreshList = () => {
        retrieveUsers();
        setCurrentUser(null);
        setCurrentIndex(-1);
    };
    const setActiveTutorial = (user: IUserData, index: number) => {
        setCurrentUser(user);
        setCurrentIndex(index);
    };

    const getUser = (id: number) => {
        UserDataService.get(id)
            .then((response: any) => {
                setCurrentUser(response.data);
                console.log(response.data);
            })
            .catch((e: Error) => {
                console.log(e);

            });
    };

    const deleteUser = (index: number) => {
        const id = index + 1;

        UserDataService.remove(id)
            .then((response: any) => {
                refreshList();
                alert("The user was deleted successfully!");

            })
            .catch((e: Error) => {
                console.log(e);
            });

    };

    return (

        <>

            <button onClick={handleButtonClick}>TEST SERVICE </button>

            <div className="container-xl">
                {users.length === 0 && !loading && (
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
                                    {users && users.map((user, index) => <tr key={user.id}>
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
                                                    <button className="btn btn-sm btn-outline-secondary delete" onClick={() => deleteUser(index)}>Delete User</button>
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
    )
};
export default UserList;