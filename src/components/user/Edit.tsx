// import * as React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import axios from 'axios';
import React, { FC, useCallback, useEffect, useMemo, useState } from "react";
import { useParams } from 'react-router-dom';


export interface IValues {
    [key: string]: any;
}
export interface IFormState {
    id: number,
    user: any;
    values: IValues[];
    submitSuccess: boolean;
    loading: boolean;
}

type UserParams = {
    id: string;
  };

  type user = {
    // firstName: string;
    // lastName: string;
    id: string;
    first_name: string,
    last_name: string,
    email: string,
    gender: string,
    company: {
        name: string,
        department: string
    }
};
// extends React.Component<RouteComponentProps<any>, IFormState>

// const EditUser: React.Component<RouteComponentProps<any>> = () => {

const Edit: React.FC<RouteComponentProps> = (props: RouteComponentProps) => {

    // this.state = {
    //     isVisible: true,
    //     users: [],
    //   };

    //   const [isVisible, setIsVisible] = useState(true);
    // const [users, setUsers] = useState([]);

    // const [id, setId] = useState(true);
    // const [user, setUser] = React.useState(true);
    const [values, setValues] = useState(true);
    const [loading, setLoading] = useState(true);
    const [submitSuccess, setSubmitSuccess] = useState(true);
    // let id = useParams(); // Unpacking and retrieve id

    // const [user, setUser] = useState({});
    const [user, setUser] = useState({
        id: 0,
        first_name: '',
        last_name: '',
        email: '',
        gender: '',
        company: {
            name: '',
            department: ''
        }
    })

    const { id } = useParams<UserParams>();

    React.useEffect(() => {
        //     fetch(‘url’)
        //     .then(res => res.json())
        //     .then(items => setItems(items)
        //     .catch(console.log(err))
        //    }, [])


        const axiosUsers = async () => {
            const response = await axios.get('http://localhost:5000/users/${id}/edit');
            setUser(response.data);
            console.log(response);
        };
        axiosUsers();
    }, [id]);
    // axios.get(`http://localhost:5000/users/${id}/edit`).then(data => { (user: any) => setUser(data) });
    // console.log(user.first_name);

    return (
        <div className="App">
            {user &&
                <div>
                    <div>
                        <div className={"col-md-12 form-wrapper"}>
                            <h2> Edit User </h2>
                            {submitSuccess && (
                                <div className="alert alert-info" role="alert">
                                    User's details has been edited successfully </div>
                            )}
                            <form id={"create-post-form"} noValidate={true}>
                                <div className="form-group col-md-12">
                                    <label htmlFor="first_name"> {user.first_name} </label>
                                    {/* <input type="text" id="first_name" defaultValue={user.first_name} onChange={(e) => this.handleInputChanges(e)} name="first_name" className="form-control" placeholder="Enter user's first name" /> */}
                                </div>
                                <div className="form-group col-md-12">
                                    <label htmlFor="last_name"> Last Name </label>
                                    {/* <input type="text" id="last_name" defaultValue={this.state.user.last_name} onChange={(e) => this.handleInputChanges(e)} name="last_name" className="form-control" placeholder="Enter user's last name" /> */}
                                </div>
                                <div className="form-group col-md-12">
                                    <label htmlFor="email"> Email </label>
                                    {/* <input type="email" id="email" defaultValue={this.state.user.email} onChange={(e) => this.handleInputChanges(e)} name="email" className="form-control" placeholder="Enter user's email address" /> */}
                                </div>
                                <div className="form-group col-md-12">
                                    <label htmlFor="phone"> Gender </label>
                                    {/* <input type="text" id="phone" defaultValue={this.state.user.phone} onChange={(e) => this.handleInputChanges(e)} name="phone" className="form-control" placeholder="Enter user's phone number" /> */}
                                </div>
                                <div className="form-group col-md-4 pull-right">
                                    <button className="btn btn-success" type="submit">
                                        Edit User </button>
                                    {loading &&
                                        <span className="fa fa-circle-o-notch fa-spin" />
                                    }
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

export default Edit;


/*
class EditUser extends React.Component<RouteComponentProps<any>, IFormState> {
            constructor(props: RouteComponentProps) {
                super(props);
                this.state = {
                    id: this.props.match.params.id,
                    user: {},
                    values: [],
                    loading: false,
                    submitSuccess: false,
                }
            }

            public componentDidMount(): void {
                axios.get(`http://localhost:5000/users/${this.state.id}/edit`).then(data => {
                    this.setState({ user: data.data });
                })
            }

            private processFormSubmission = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
                e.preventDefault();
                this.setState({ loading: true });
                axios.patch(`http://localhost:5000/users/edit/${this.state.id}/edit`, this.state.values).then(data => {
                    this.setState({ submitSuccess: true, loading: false })
                    setTimeout(() => {
                        this.props.history.push('/');
                    }, 1500)
                })
            }

            private setValues = (values: IValues) => {
                this.setState({ values: { ...this.state.values, ...values } });
            }
            private handleInputChanges = (e: React.FormEvent<HTMLInputElement>) => {
                e.preventDefault();
                this.setValues({ [e.currentTarget.id]: e.currentTarget.value })
            }

            public render() {
                const { submitSuccess, loading } = this.state;
                return (
                    <div className="App">
                        {this.state.user &&
                            <div>
                                <div>
                                    <div className={"col-md-12 form-wrapper"}>
                                        <h2> Edit User </h2>
                                        {submitSuccess && (
                                            <div className="alert alert-info" role="alert">
                                                User's details has been edited successfully </div>
                                        )}
                                        <form id={"create-post-form"} onSubmit={this.processFormSubmission} noValidate={true}>
                                            <div className="form-group col-md-12">
                                                <label htmlFor="first_name"> First Name </label>
                                                <input type="text" id="first_name" defaultValue={this.state.user.first_name} onChange={(e) => this.handleInputChanges(e)} name="first_name" className="form-control" placeholder="Enter user's first name" />
                                            </div>
                                            <div className="form-group col-md-12">
                                                <label htmlFor="last_name"> Last Name </label>
                                                <input type="text" id="last_name" defaultValue={this.state.user.last_name} onChange={(e) => this.handleInputChanges(e)} name="last_name" className="form-control" placeholder="Enter user's last name" />
                                            </div>
                                            <div className="form-group col-md-12">
                                                <label htmlFor="email"> Email </label>
                                                <input type="email" id="email" defaultValue={this.state.user.email} onChange={(e) => this.handleInputChanges(e)} name="email" className="form-control" placeholder="Enter user's email address" />
                                            </div>
                                            <div className="form-group col-md-12">
                                                <label htmlFor="phone"> Gender </label>
                                                <input type="text" id="phone" defaultValue={this.state.user.phone} onChange={(e) => this.handleInputChanges(e)} name="phone" className="form-control" placeholder="Enter user's phone number" />
                                            </div>
                                            <div className="form-group col-md-4 pull-right">
                                                <button className="btn btn-success" type="submit">
                                                    Edit User </button>
                                                {loading &&
                                                    <span className="fa fa-circle-o-notch fa-spin" />
                                                }
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        }
                    </div>
                )
            }
        }

        
export default withRouter(EditUser)

*/