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
  // https://www.bezkoder.com/react-typescript-api-call/#List_of_Objects_Component