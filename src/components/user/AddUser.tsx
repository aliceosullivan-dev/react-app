import React, { useState, ChangeEvent, useEffect } from "react";
import UserDataService from "../../services/UserService"
import IUserData from '/Users/aosullivan/react-app/src/types/userType.js';
import { Link } from 'react-router-dom';

function AddUser(){
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

    // Local state management
    const [user, setUser] = useState<IUserData>(initialUserState);
    const [submitted, setSubmitted] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);


    const newUser = () => {
        setUser(initialUserState);
        setSubmitted(false);
    };
    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setUser({ ...user, [name]: value });
    };
    const handleCompanyNameChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setUser({
            ...user,
            company: {
                name: value,
                department: user.company.department
            }
        })
    }
    const handleCompanyDeptChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setUser({
            ...user,
            company: {
                name: user.company.name,
                department: value
            }
        })
    }

    useEffect(() => {
        // return function cleanup(){

        // }
        return () => {
          };
    }, [])


    const saveUser = () => {
        setLoading(true);
        var data = {
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            gender: user.gender,
            company: {
                name: user.company.name,
                department: user.company.department
            }

        };
        const ac = new AbortController();

        UserDataService.create(data)
            .then((response: any) => {
                setUser({
                    id: response.data.id,
                    first_name: response.data.first_name,
                    last_name: response.data.last_name,
                    email: response.data.email,
                    gender: response.data.gender,
                    company: {
                        name: response.data.company.name,
                        department: response.data.company.department
                    }
                });
                setLoading(false);
                setSubmitted(true);
                alert("The user was created successfully!");
            })
            .catch((e: Error) => {
                console.log(e);
            });

            return () => ac.abort(); // Abort both fetches on unmount
    };

    return (
        <>
            <div>
                <div className={"col-md-12 form-wrapper"}>
                    <h2> Create User </h2>
                    {!submitted && (
                        <div className="alert " role="alert">
                            Fill in the form below to create a new user
                        </div>
                    )}

                    {submitted && (
                        <div className="alert alert-info" role="alert">
                            The form was successfully submitted!
                        </div>
                    )}
                    <form id={"create-post-form"} onSubmit={saveUser} noValidate={true}>
                        <div className="form-group col-md-12">
                            <label htmlFor="first_name"> First Name </label>
                            <input type="text" id="first_name" onChange={handleInputChange} name="first_name" className="form-control" placeholder="Enter user's first name" />
                        </div>
                        <div className="form-group col-md-12">
                            <label htmlFor="last_name"> Last Name </label>
                            <input type="text" id="last_name" onChange={handleInputChange} name="last_name" className="form-control" placeholder="Enter user's last name" />
                        </div>
                        <div className="form-group col-md-12">
                            <label htmlFor="email"> Email </label>
                            <input type="email" id="email" onChange={handleInputChange} name="email" className="form-control" placeholder="Enter user's email address" />
                        </div>
                        <div className="form-group col-md-12">
                            <label htmlFor="gender"> Gender </label>
                            <input type="text" id="gender" onChange={handleInputChange} name="gender" className="form-control" placeholder="Enter user's gender" />
                        </div>
                        <div className="form-group col-md-12">
                            <label htmlFor="company.name"> Company Name </label>
                            <input type="text" id="company.name" onChange={handleCompanyNameChange} name="company.name" className="form-control" placeholder="Enter company name" />
                        </div>
                        <div className="form-group col-md-12">
                            <label htmlFor="company.department"> Department </label>
                            <input type="text" id="company.department" onChange={handleCompanyDeptChange} name="company.department" className="form-control" placeholder="Enter department" />
                        </div>
                        <div className="form-group col-md-4 pull-right">
                            <Link onClick={saveUser} className="btn btn-success" to={'/./'}>Create User </Link>
                            {loading &&
                                <span className="fa fa-circle-o-notch fa-spin" />}
                        </div>
                    </form>
                </div>
            </div></>
    );
};
export default AddUser;