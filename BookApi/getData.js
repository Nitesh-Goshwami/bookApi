const fetch = require('node-fetch');
let input = require('D:/TurnoutNow/BookApi/input.json');

async function apiCall(date, query, value) {
    let result;
    try {
        let res = await fetch(`https://api.nytimes.com/svc/books/v3/lists/${date}/${query}?api-key=iR2mBnCKOdN9Hfvk15Ioc9D9i3r9OIFM`)
        let data = await res.json();
        result = data.results.books.slice(0, value)
    } catch (err) {
        console.log(err)
    }
    return result
}


async function getData() {
    let apiResults = [];
    let finalResult = [];
    for (let date in input) {
        for (let key in input[date]) {
            try {
                apiResults.push(apiCall(date, key, input[date][key]))
            } catch (err) {
                console.log(err)
            }
        }
    }
    const data = await Promise.all(apiResults);
    data.forEach((item) => {
        finalResult.push(item);
    });
    console.log(finalResult)
}


getData();