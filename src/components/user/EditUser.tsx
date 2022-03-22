import React, { useState, useEffect, ChangeEvent, useRef } from "react";
import { useParams, Link } from 'react-router-dom';
import IUserData from "../../types/userType";
import UserDataService from "../../services/UserService";
import Alert from 'react-bootstrap/Alert';

function EditUser() {
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
    const [loading, setLoading] = useState<boolean>(false);
    const [submitted, setSubmitted] = useState<boolean>(false);
    const componentMounted = useRef(true); // component is mounted

    const getUser = (id: string) => {
        UserDataService.get(id)
            .then((response: any) => {
                setCurrentUser(response.data);
            })
            .catch((e: Error) => {
                console.log(e);
            });
    };
    useEffect(() => {
        if (id)
            getUser(id);
    }, [id])

    const updateUser = () => {
        const ac = new AbortController();

        UserDataService.update(currentUser.id, currentUser)
            .then((response: any) => {
                setMessage("The user was updated successfully!");
                setSubmitted(true);
                alert("The user was updated successfully!");
            })
            .catch((e: Error) => {
                console.log(e);
            });
        return () => ac.abort(); // Abort both fetches on unmount

    };

    const handleInputChange = (event: ChangeEvent) => {
        const { name } = event.target as HTMLButtonElement;
        const value = (event.target as HTMLInputElement).value
        setCurrentUser({ ...currentUser, [name]: value });
    };

    const handleCompanyNameChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setCurrentUser({
            ...currentUser,
            company: {
                name: value,
                department: currentUser.company.department
            }
        })
    }
    const handleCompanyDeptChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setCurrentUser({
            ...currentUser,
            company: {
                name: currentUser.company.name,
                department: value
            }
        })
    }

    return (
        <>
            <div>
                <div className={"col-md-12 form-wrapper"}>
                    <h2> Edit User </h2>
                    {!submitted && (
                        <div className="alert alert-info" role="alert">
                            Fill the form below to edit the user's details
                        </div>
                    )}
                    {submitted && (
                        <><div className="alert alert-info" role="alert">
                            The user was successfully updated!
                        </div> <Alert show={submitted} onClose={() => { }} dismissible>The user was successfully updated!</Alert>
                        </>
                    )}
                    <form id={"create-post-form"} noValidate={true}>
                        <div className="form-group col-md-12">
                            <label htmlFor="first_name"> First Name </label>
                            <input type="text" id="first_name" onChange={handleInputChange} name="first_name" className="form-control" placeholder={currentUser.first_name} />
                        </div>
                        <div className="form-group col-md-12">
                            <label htmlFor="last_name"> Last Name </label>
                            <input type="text" id="last_name" onChange={handleInputChange} name="last_name" className="form-control" placeholder={currentUser.last_name} />
                        </div>
                        <div className="form-group col-md-12">
                            <label htmlFor="email"> Email </label>
                            <input type="email" id="email" onChange={handleInputChange} name="email" className="form-control" placeholder={currentUser.email} />
                        </div>
                        <div className="form-group col-md-12">
                            <label htmlFor="gender"> Gender </label>
                            <input type="text" id="gender" onChange={handleInputChange} name="gender" className="form-control" placeholder={currentUser.gender} />
                        </div>
                        <div className="form-group col-md-12">
                            <label htmlFor="company.name"> Company Name </label>
                            <input type="text" id="company.name" onChange={handleCompanyNameChange} name="company.name" className="form-control" placeholder={currentUser.company.name} />
                        </div>
                        <div className="form-group col-md-12">
                            <label htmlFor="company.department"> Department </label>
                            <input type="text" id="company.department" onChange={handleCompanyDeptChange} name="company.department" className="form-control" placeholder={currentUser.company.department} />
                        </div>
                        <div className="form-group col-md-4 pull-right">
                            <Link onClick={updateUser} className="btn btn-success" to={'/./'}>Update User </Link>
                            {loading &&
                                <span className="fa fa-circle-o-notch fa-spin" />}
                        </div>
                    </form>
                </div>
            </div></>

    );
};
export default EditUser;