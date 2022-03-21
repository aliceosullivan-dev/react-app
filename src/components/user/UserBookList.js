import React, { useContext, useEffect, useState } from 'react';
import { appMachine } from './AppMachine';
import { useMachine } from '@xstate/react';
import Loader from '../loaderComponent';

// import { Deleteicon } from './Deleteicon';
import { Link } from 'react-router-dom';

function Booklist() {


    const [books, setBooks] = useState('');
    const [state, sendToMachine] = useMachine(appMachine);

    // const { books, error } = state.context.books;
    // const books = state.context.books;
    const isLoading = state.matches('loading')
    const list = books.records; //[];

    // const [machine, sendToMachine] = useContext(MachineContext);
    // const machineContext = machine.context;
    // const books = machineContext.books;

    //   const [books, setBooks] = useState('');
    //   const [state, sendToMachine] = useMachine(appMachine);
    //   const list = state.context.books.records;

    useEffect(() => {
        sendToMachine('LOAD_BOOKS');
    }, []);


    return (
        <>
            {(
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
            {isLoading && (
                <><h2 className="loading-text"></h2><Loader></Loader></>

            )}
            <p>TESTING State context {state.context.books.length}</p>
            <div>{state.context.books.map((book, i) => (
                <div key={`${book.id}-${i}`}>
                    <br />
                    <b>{book.first_name}</b>
                    <br />

                </div>
            ))
            }</div>


            <div>{state.context.books.length}</div>


            {/* <div>
        {machine.matches('list.failed') && (
          <span>Data cannot be loaded {error.toString()}</span>
        )}
      </div> */}

        </>
    );
}

export default Booklist;