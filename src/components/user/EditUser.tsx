import React, { useState, useEffect, ChangeEvent } from "react";
import { useParams, useHistory } from 'react-router-dom';
import IUserData from "../../types/userType";
import UserDataService from "../../services/UserService";


const EditUser: React.FC = () => {
    type UserParams = {
        id: string;
    };
    type HTMLElementEvent<T extends HTMLElement> = Event & {
        target: T;
      }

    const { id } = useParams<UserParams>();
    let navigate = useHistory();
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


    const getUser = (id: string) => {
        UserDataService.get(id)
            .then((response: any) => {
                setCurrentUser(response.data);
                console.log(response.data);
            })
            .catch((e: Error) => {
                console.log(e);
            });
    };
    useEffect(() => {
        if (id)
            getUser(id);
    }, [id]);

    const updateUser = () => {
        console.log("Update user id " + currentUser.id);
        UserDataService.update(currentUser.id, currentUser)
            .then((response: any) => {
                console.log(response.data);
                setMessage("The user was updated successfully!");
            })
            .catch((e: Error) => {
                console.log(e);
            });
    };

    const handleInputChange = (event: ChangeEvent) => {
        const { name } = event.target as HTMLButtonElement;
        // const { target } = event

        const value = (event.target as HTMLInputElement).value 

        console.log("Name: " + name);
        // const { name, value } = event.currentTarget;
        // setCurrentUser({ ...setCurrentUser, [name]: value });
        console.log("EVENT TARGET");
        console.log(value);
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
                        <div className="alert alert-info" role="alert">
                            The form was successfully submitted!
                        </div>
                    )}
                    <form id={"create-post-form"} onSubmit={updateUser} noValidate={true}>
                        <div className="form-group col-md-12">
                            <label htmlFor="first_name"> First Name </label>
                            <input type="text" id="first_name" onChange={handleInputChange} name="first_name" className="form-control" placeholder={currentUser.first_name}/>
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
                            <button className="btn btn-success" type="submit" onClick={updateUser}>
                                Update User
                            </button>

                            {/* <button
                                type="submit"
                                className="badge badge-success"
                                onClick={updateUser}
                            >
                                Update
                            </button> */}
                            {loading &&
                                <span className="fa fa-circle-o-notch fa-spin" />}
                        </div>
                    </form>
                </div>
            </div></>





    );
};
export default EditUser;