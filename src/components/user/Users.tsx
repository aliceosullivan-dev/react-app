import { useMachine } from "@xstate/react";
import UserDataService from "../../services/UserService";

import usersMachine from "./UsersMachine";

export default function Users() {

    const [state, send] = useMachine(usersMachine, {
        services: {

            fetchUsers: () =>
                fetch("https://jsonplaceholder.typicode.com/users")
                    .then((res) => res.json())
                    .then((res) => Promise.resolve(res))
                    .catch((err) =>
                        Promise.reject({
                            status: err.response.status,
                            data: err.response.data
                        })
                    ),


            retrieveTutorials: () =>
                UserDataService.getAll()
                    .then((response: any) => {
                        // setUsers(response.data);
                        console.log(response.data);
                        // setLoading(false);
                    })
                    .catch((e: Error) => {
                        console.log(e);
                        // setLoading(false);

                    })

        
    }



  });

const currentState = state.value;
const users = currentState === "success" ? state.context.users : [];

const handleButtonClick = () => {
    send("FETCH");
};

//   if(users){}
//   // @ts-ignore: Object is possibly 'null'.


//     const stateUIMapping = {
//         loading: <p>Loading</p>,
//         success: users!.map((user) => <div key={user.id}>{user!.name}</div>),
//         error: <p>An error occured</p>
//     };
// }
//   const output = stateUIMapping[currentState];

return (
    <div className="users">
        <button type="button" onClick={handleButtonClick}>
            Fetch users
        </button>

        User List
    </div>
);
}
