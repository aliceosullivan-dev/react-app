// const fetchAllBooks = async () => {
//     const res = await fetch(
//       process.env.REACT_APP_BASE_URL + 'Books?maxRecords=all&view=Grid%20view',
//       {
//         method: 'GET',
//         headers: new Headers({
//           Authorization: process.env.REACT_APP_API_KEY,
//           'Content-Type': 'application/json',
//         }),
//       }
//     ).then((x) => x.json());
//     return res;
//   };


  const fetchAllBooks = async () => {

    const res = await fetch('http://localhost:5000/users').then((x) => x.json()).then(data => data.value)
    ;
    console.log("FETCHING USERS MACHINE fetchBooks.js")
    console.log(res)
    return res;


    // console.log("FETCHING USERS");
    // return fetch('http://localhost:5000/users')
    //   .then((response) => response.json())
    //   .then(data => data.value)
    //   .catch(error => error)
  }

  
  export default fetchAllBooks;