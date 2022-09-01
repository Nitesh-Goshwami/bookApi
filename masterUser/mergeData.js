const masterData = require('D:/TurnoutNow/masterUser/user_master.json');
const secondryData = require('D:/TurnoutNow/masterUser/users_secondary.json');
const config = require('D:/TurnoutNow/masterUser/configure.json');

let result = [];

masterData.forEach((master) => {
    secondryData.filter((secondary) => {
        if (master.id === secondary.attendeeId) {
            let ans = {}
            ans[config[0].id] = master.id
            ans[config[0].firstName] = master.firstName
            ans[config[0].lastName] = master.lastName
            ans[config[0].attendeeType] = master.attendeeType
            ans[config[0].badgeType] = master.badgeType
            ans[config[0].zip] = secondary.zip
            ans[config[0].country] = secondary.country
            ans[config[0].city] = secondary.city
            ans[config[0].registered] = secondary.registered
            ans[config[0].fileURL] = secondary.files.length ? secondary.files[secondary.files.length - 1].fileURL : ""
            result.push(ans)
        }
    })
})


console.log(result)
