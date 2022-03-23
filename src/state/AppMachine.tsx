// import { createContext } from 'react';
import { assign, createMachine } from 'xstate';


const fetchAllUsers = async () => {
  return await fetch(
    'http://localhost:5000/users'
  ).then((response) => response.json()).then(data => {
    if (data.message) {
      return
    }

    return data
  });
};


export const appMachine = createMachine({
  id: 'app',
  initial: 'init',
  context: {          // internal state for the machine. Used to store data app needs
    users: [],
    error: undefined,
    fields: '',
  },
  states: {
    init: {},
    list: {
      states: {
        loading: {
          invoke: {  //when transition into loading state 
            src: (context, event) => async (send) => {
              return new Promise((resolve, reject) => {
                setTimeout(async () => {
                  try {
                    const data = await fetchAllUsers();
                    resolve(data);
                    assign({
                      users: (context, event) => data     //update context data (context.users)
                    })
                  } catch (err) {
                    reject(err);
                  }
                }, 0);
              });
            },
            onDone: {
              target: "success",
              actions: assign({ users: (_context, event) => event.data })
            },
            onError: {
              target: "failed"
            }
          },
          on: {
            FETCHED_SUCCESSFULLY: {
              target: "idle"
            }
          }
        },
        success: {
          on: { FETCH: 'loading' }  // on FETCH action, transition to loading state
        },
        failed: {},
        idle: {},
        fetch: {
          on: {
            CLOSE: "idle"  //on CLOSE action, transition to idle state
          }
        }
      },
    },
  },
  on: { //all possible actions of states
    LOAD_USERS: {
      target: 'list.loading',   // on the 'LOAD_USERS' action, transition to list.loading state
    },

  },
});