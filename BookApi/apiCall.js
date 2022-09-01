const fetch = require('node-fetch');
let input = require('D:/TurnoutNow/BookApi/input.json');
const rp = require('request-promise')

async function apiCall(date, query) {
    let result;
    try {
        let res = await fetch(`https://api.nytimes.com/svc/books/v3/lists/${date}/${query}?api-key=iR2mBnCKOdN9Hfvk15Ioc9D9i3r9OIFM`)
        let data = await res.json();
        result = data.results.books
        console.log(result)
    } catch (err) {
        console.log(err)
    }
    return result
}

// async function apiCall(date, query) {
//     return rp({
//         url : `https://api.nytimes.com/svc/books/v3/lists/${date}/${query}?api-key=iR2mBnCKOdN9Hfvk15Ioc9D9i3r9OIFM`,
//         method : 'GET',
//         json : true
//     })
// }



async function getData() {
    let promises = [];
    let result = [];
    for (let date in input) {
        for (let key in input[date]) {
            try {
                promises.push(apiCall(date, key))
            } catch (err) {
                console.log(err)
            }
        }
    }
    const data = await Promise.all(promises);
    // const data = await res.json()
    console.log(data.results)
    // data.forEach(({ data }) => {
    //     result = [...result, data];
    // });
    // console.log(result)
}

// async function getData() {
//     let promises = [];
//     let result = [];
//     for (let date in input) {
//         for (let key in input[date]) {
//             try {
//                 // console.log(date, key)
//                 let res = await apiCall(date, key);
//                 // let data  = await res.json();
//                 console.log(res)
//             } catch (err) {
//                 console.log(err)
//             }
//         }
//     }
//     // const res = await Promise.all(promises);
//     // const data = await res.json()
//     // console.log(data)
//     // data.forEach(({ data }) => {
//     //     result = [...result, data];
//     // });
//     // console.log(result)
// }

getData();