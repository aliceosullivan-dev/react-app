import {map} from 'rxjs/operators';



export default interface IUserData {
    id?: any | null,
    first_name: string,
    last_name: string,
    email: string,
    gender: string,
    company: {
        name: string,
        department: string
    }
  }
