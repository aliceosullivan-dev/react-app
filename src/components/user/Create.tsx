import * as React from 'react';
import axios from 'axios';
import { RouteComponentProps, withRouter } from 'react-router-dom';

export interface IValues {
    first_name: string,
    last_name: string,
    email: string,
    gender: string,
    company:{
        name: string,
        department: string
    }
}
export interface IFormState {
    [key: string]: any;
    values: IValues[];
    submitSuccess: boolean;
    loading: boolean;
}

class Create extends React.Component<RouteComponentProps, IFormState> {
    constructor(props: RouteComponentProps) {
        super(props);
        this.state = {
            first_name: '',
            last_name: '',
            email: '',
            gender: '',
            company: [{name: '',department:''}],
            // company: '',
            values: [],
            loading: false,
            submitSuccess: false,
        }
    }


private processFormSubmission = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    this.setState({ loading: true });
    const formData = {
        first_name: this.state.first_name,
        last_name: this.state.last_name,
        email: this.state.email,
        gender: this.state.gender,
        company: {
            name: this.state.companyName,
            department: this.state.companyDept
        }

        // company: this.state.address,
    }
    this.setState({ submitSuccess: true, values: [...this.state.values, formData], loading: false });
    axios.post(`http://localhost:5000/users`, formData).then(data => [
        setTimeout(() => {
            this.props.history.push('/');
        }, 1500)
    ]);
}

private handleInputChanges = (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    this.setState({
        [e.currentTarget.name]: e.currentTarget.value,
})
}

public render() {
    const { submitSuccess, loading } = this.state;
    return (
        <div>
            <div className={"col-md-12 form-wrapper"}>
                <h2> Create User </h2>
                {!submitSuccess && (
                    <div className="alert alert-info" role="alert">
                        Fill the form below to create a new user
                </div>
                )}
                {submitSuccess && (
                    <div className="alert alert-info" role="alert">
                        The form was successfully submitted!
                        </div>
                )}
                <form id={"create-post-form"} onSubmit={this.processFormSubmission} noValidate={true}>
                    <div className="form-group col-md-12">
                        <label htmlFor="first_name"> First Name </label>
                        <input type="text" id="first_name" onChange={(e) => this.handleInputChanges(e)} name="first_name" className="form-control" placeholder="Enter user's first name" />
                    </div>
                    <div className="form-group col-md-12">
                        <label htmlFor="last_name"> Last Name </label>
                        <input type="text" id="last_name" onChange={(e) => this.handleInputChanges(e)} name="last_name" className="form-control" placeholder="Enter user's last name" />
                    </div>
                    <div className="form-group col-md-12">
                        <label htmlFor="email"> Email </label>
                        <input type="email" id="email" onChange={(e) => this.handleInputChanges(e)} name="email" className="form-control" placeholder="Enter user's email address" />
                    </div>
                    <div className="form-group col-md-12">
                        <label htmlFor="gender"> Gender </label>
                        <input type="text" id="gender" onChange={(e) => this.handleInputChanges(e)} name="gender" className="form-control" placeholder="Enter user's phone number" />
                    </div>
                    <div className="form-group col-md-12">
                        <label htmlFor="companyName"> Company Name </label>
                        <input type="text" id="companyName" onChange={(e) => this.handleInputChanges(e)} name="companyName" className="form-control" placeholder="Enter company name" />
                    </div> 
                    <div className="form-group col-md-12">
                        <label htmlFor="companyDept"> Department </label>
                        <input type="text" id="companyDept" onChange={(e) => this.handleInputChanges(e)} name="companyDept" className="form-control" placeholder="Enter department" />
                    </div> 
                    <div className="form-group col-md-4 pull-right">
                        <button className="btn btn-success" type="submit">
                            Create User
                        </button>
                        {loading &&
                            <span className="fa fa-circle-o-notch fa-spin" />
                        }
                    </div>
                </form>
            </div>
        </div>
    )
}

}
export default withRouter(Create)