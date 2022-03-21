import React, { useState, useEffect } from "react";
import { Link, useParams } from 'react-router-dom';
import UserDataService from "../../services/UserService";
import IUserData from "../../types/userType";
import Loader from "../loaderComponent";
import avatarPic from '/Users/aosullivan/react-app/src/avatar.png';

function UserProfile(){

    type UserParams = {
        id: string;
    };

    const { id } = useParams<UserParams>();
    const initialUserState = {
        id: null,
        first_name: "",
        last_name: "",
        email: "",
        gender: "",
        company: {
            name: "",
            department: ""
        }
    };
    const [currentUser, setCurrentUser] = useState<IUserData>(initialUserState);
    const [message, setMessage] = useState<string>("");
    const [userFound, setUserFound] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);

    const getUser = (id: string) => {
        UserDataService.get(id)
            .then((response: any) => {
                setCurrentUser(response.data);
                setUserFound(true);
                setLoading(false);
            })
            .catch((e: Error) => {
                console.log(e);
                setUserFound(false);
                setLoading(false);                
            });
    };
    useEffect(() => {
        if (id)
            getUser(id);
    }, [id]);

    return (
        <>
        <div>
                {loading && (
                    <><h2 className="loading-text"></h2><Loader></Loader></>

                )}
                {!userFound && !loading && (
                    <div className="text-center">
                        <h2>User not found</h2>
                    </div>
                )} 
                { !loading && userFound && currentUser && currentUser.first_name !== '' && (

                    <div className="App">
                        <h1> User Details</h1>
                        <div className="container">
                            <div className="main-body">
                                <div className="row gutters-sm">
                                    <div className="col-md-4 mb-3">
                                        <div className="card">
                                            <div className="card-body">
                                                <div className="d-flex flex-column align-items-center text-center">
                                                    <img src={avatarPic} alt="Admin" className="rounded-circle" width="150">
                                                    </img>
                                                    <div className="mt-3">
                                                        <h4>{currentUser.first_name} {currentUser.last_name}</h4>
                                                        <p className="text-secondary mb-1">{currentUser.company.department}</p>
                                                        <p className="text-muted font-size-sm">{currentUser.company.name}</p>
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
                                                        {currentUser.first_name}
                                                    </div>
                                                </div>
                                                <hr />
                                                <div className="row">
                                                    <div className="col-sm-3">
                                                        <h6 className="mb-0">Last Name</h6>
                                                    </div>
                                                    <div className="col-sm-9 text-secondary">
                                                        {currentUser.last_name}
                                                    </div>
                                                </div>
                                                <hr />
                                                <div className="row">
                                                    <div className="col-sm-3">
                                                        <h6 className="mb-0">Email</h6>
                                                    </div>
                                                    <div className="col-sm-9 text-secondary">
                                                        {currentUser.email}
                                                    </div>
                                                </div>
                                                <hr />
                                                <div className="row">
                                                    <div className="col-sm-3">
                                                        <h6 className="mb-0">Gender</h6>
                                                    </div>
                                                    <div className="col-sm-9 text-secondary">
                                                        {currentUser.gender}
                                                    </div>
                                                </div>
                                                <hr />
                                                <div className="row">
                                                    <div className="col-sm-3">
                                                        <h6 className="mb-0">Company Name</h6>
                                                    </div>
                                                    <div className="col-sm-9 text-secondary">
                                                        {currentUser.company.name}
                                                    </div>
                                                </div>
                                                <hr />
                                                <div className="row">
                                                    <div className="col-sm-3">
                                                        <h6 className="mb-0">Department</h6>
                                                    </div>
                                                    <div className="col-sm-9 text-secondary">
                                                        {currentUser.company.department}
                                                    </div>
                                                </div>
                                                <hr />
                                                <div className="row">
                                                    <div className="col-sm-12">
                                                        <Link to={`/users/${currentUser.id}/edit`} className="btn btn-secondary">Edit</Link>
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
            </div></>
    );
};
export default UserProfile;
