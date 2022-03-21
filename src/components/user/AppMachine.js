import { createContext } from 'react';
import { assign, Machine, createMachine } from 'xstate';


import fetchAllBooks from './fetchBooks';
// export const MachineContext = createContext('BookContext');

const fetchifetch = async () => {

  // const res = await fetch('http://localhost:5000/users').then((x) => x.json());
  console.log("Fetch i fetch")

  return await fetch(
    'http://localhost:5000/users'
  ).then((response) => response.json()).then(data => {
    if (data.message) {
      return
    }
    console.log("TESTING DATA" + data);
    console.log(data[0]);
    return data
  });//.then(data => data.value);

  // return await 'http://localhost:5000/users'.get<Array<IUserData>>("/").then((response)=> response.data)
};

function getUserBooks(context) {
  const { books } = context.books;

  return Promise.all(
    books.map((bookId) =>
      fetch(`http://localhost:5000/users/${bookId}/`).then((response) => response.json())
    )
  );
}

export const appMachine = createMachine({
  id: 'app',
  initial: 'init',
  context: {
    books: [],
    error: undefined,
    fields: '',
  },
  states: {
    init: {},

    list: {
      states: {
        loading: {
          invoke: {
            src: (context, event) => fetchifetch(),
            onDone: {
              target: 'success',
              actions: assign({ books: (context, event) => event.data }),
            },
            // src: (context, event) => async (send) => {
            //   return new Promise((resolve, reject) => {
            //     setTimeout(async () => {
            //       try {
            //         console.log("Fetching...")
            //         console.log("HELLOOO")
            //         const data = await fetchifetch();
            //         // const data = await getUserBooks();

            //         // .get<Array<IUserData>>("/");
            //         console.log(data);
            //         // resolve(data);
            //         assign({
            //           books: (context, event) => [...context.books, data],
            //           // books: (context, event) => event.data

            //         })
            //         // console.log("Data " + JSON.parse(data));
            //       } catch (err) {
            //         reject(err);
            //       }
            //     }, 0);
            //   });
            // },
            // onDone: {
            //   target: "success",
            //   actions: assign({ books: (_context, event) => event.data })
            // },
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
          actions: assign({ books: (context, event) => event.data }),
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
    LOAD_BOOKS: {
      target: 'list.loading',
      actions: assign({
        actions: assign({ books: (context, event) => event.data }),
        // books: (context, event) => event.data

      })
    },

  },
});