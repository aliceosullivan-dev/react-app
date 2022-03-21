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
  context: {
    users: [],
    error: undefined,
    fields: '',
  },
  states: {
    init: {},

    list: {
      states: {
        loading: {
          invoke: {
            src: (context, event) => async (send) => {
              return new Promise((resolve, reject) => {
                setTimeout(async () => {
                  try {
                    const data = await fetchAllUsers();
                    resolve(data);
                    assign({
                      users: (context, event) => data
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
              target: "idle"
            }
          },
          on: {
            FETCHED_SUCCESSFULLY: {
              target: "idle"
            }
          }
        },
        success: {
        },
        failed: {},
        idle: {},
        fetch: {
          on: {
            CLOSE: "idle"
          }
        }
      },
    },
  },
  on: {
    LOAD_USERS: {
      target: 'list.loading',
    },

  },
});