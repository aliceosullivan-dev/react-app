import React, { useContext, useEffect, useState } from 'react';
import { appMachine} from './AppMachine';
import { useMachine } from '@xstate/react';

// import { Deleteicon } from './Deleteicon';
import { Link } from 'react-router-dom';

function Booklist() {


    const [books, setBooks] = useState('');
    const [state, sendToMachine] = useMachine(appMachine);

    // const { books, error } = state.context.books;
    // const books = state.context.books;

    const list = books.records; //[];

    // const [machine, sendToMachine] = useContext(MachineContext);
    // const machineContext = machine.context;
    // const books = machineContext.books;

//   const [books, setBooks] = useState('');
//   const [state, sendToMachine] = useMachine(appMachine);
//   const list = state.context.books.records;

  useEffect(() => {
    sendToMachine('LOAD_BOOKS');
    console.log("State context" + state.context.books.length);
    // eslint-disable-next-line
    console.log("BOOKs " + books)
    console.log("Book data " + state.context.books[0]);
    //machine.matches('list.loading') &&
  }, []);


  return (
    <>
      { (
        <span className="w-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="feather feather-loader animate-spin text-2xl"
          >
            <line x1="12" y1="2" x2="12" y2="6"></line>
            <line x1="12" y1="18" x2="12" y2="22"></line>
            <line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line>
            <line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line>
            <line x1="2" y1="12" x2="6" y2="12"></line>
            <line x1="18" y1="12" x2="22" y2="12"></line>
            <line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line>
            <line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line>
          </svg>
        </span>
      )}
    <p>TESTING State context {state.context.books.length}</p>
    <p>TESTING State context {state.context.books.users}</p>
       <div>{state.context.books.map((book, i) => (
    <div key={`${book.Author}-${i}`}>
      <br />
      <b>{book.Name}</b>
      <br />
      
    </div>
  ))
}</div>  
    <button
        onClick={() => sendToMachine("FETCH")}
      >
        click to fetch
      </button>
      <div>{state.context.books.length}</div>

      <section>

        {books && books.length > 0 && (
          <div className="grid grid-cols-1 gap-6 mx-auto mt-8 md:grid-cols-3">
            {books.map((b) => (
              <>
                <div
                  key={b.id}
                  className="shadow-xl p-9 rounded border border-gray-100"
                >
                  <div>
                    <span className="text-xs uppercase font-medium text-gray-500">
                      {b.fields.Category}
                    </span>
                    <h6 className="font-bold text-xl text-gray-900">
                      {b.fields.Name}
                    </h6>
                  </div>
                  <div className="mt-6 flex mb-6">
                    <div className="flex-1">
                      <span className="text-sm text-gray-500">Author</span>
                      <p className="text-lg pt-2"> {b.fields.Author}</p>
                    </div>
                    <div className="flex-1">
                      <span className="text-sm text-gray-500">Published</span>
                      <p className="text-lg pt-2"> {b.fields.Published}</p>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-extrabold text-3xl text-green-400">
                        ${b.fields.Currency}
                      </p>
                      <span className="text-xs text-gray-500">Net worth</span>
                    </div>
                    <div className="flex items-center">
                      <ul className="flex-row flex">
                        <li className="mr-4">
                          {/* <Deleteicon clickDelete={() => removeBook(b.id)} /> */}
                        </li>
                        <li>
                          <Link to={`/editbook/${b.id}`}>
                            <svg
                              className="w-6 h-6"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"></path>
                            </svg>
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </>
            ))}
          </div>
        )}
      </section>

      {/* <div>
        {machine.matches('list.failed') && (
          <span>Data cannot be loaded {error.toString()}</span>
        )}
      </div> */}
      
    </>
  );
}

export default Booklist;