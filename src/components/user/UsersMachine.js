import { Machine, assign } from "xstate";
import UserDataService from "../../services/UserService";
//https://engineering.kablamo.com.au/posts/2021/finite-state-machines-and-xstate
import http from "../../httpCommon";



const usersMachine = Machine({
  id: "users",
  initial: "idle",
  context: {
    users: null,
    error: null
  },
  states: {
    idle: {
      on: { FETCH: "loading" }
    },
    loading: {
      invoke: {
        src: "fetchUsers",
        onDone: {
          target: "success",
          actions: assign({
            users: (_, event) => event.data
          })
        },
        onError: {
          target: "error",
          actions: assign({
            error: (_, event) => event.error
          })
        }
      }
    },
    success: {
      on: { FETCH: "loading" }
    },
    error: {
      on: { FETCH: "loading" }
    }
  },

  services: {
    // fetchUsers: fetchUsers

    fetchUsers: (_, e) => {
      console.log("FETCHING USERS MACHINE");
      return fetch('http://localhost:5000/users')
        .then((response) => response.json())
        .then(data => data.value)
        .catch(error => error)
    }
  }
})

export default usersMachine;
