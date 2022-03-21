import IUserData from '/Users/aosullivan/react-app/src/types/userType.js';
import http from '../httpCommon'

const getAll = () => {
    return http.get<Array<IUserData>>("/");
};
const get = (id: any) => {
    return http.get<IUserData>(`/${id}`);
};
const create = (data: IUserData) => {
    return http.post<IUserData>("", data);
};
const update = (id: any, data: IUserData) => {
    return http.put<any>(`/${id}`, data);
};
const remove = (id: any) => {
    console.log("Remove user " + id);
    return http.delete<any>(`/${id}`);
};

const UserDataService = {
    getAll,
    get,
    create,
    update,
    remove
};
export default UserDataService;