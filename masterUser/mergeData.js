const masterData = require('D:/TurnoutNow/masterUser/user_master.json');
const secondaryData = require('D:/TurnoutNow/masterUser/users_secondary.json');
const config = require('D:/TurnoutNow/masterUser/configure.json');
let result = [];

// Converting the the secondary user array into object.
let secondaryObj = secondaryData.reduce((arr, value) => ({ ...arr, [value.attendeeId]: value }), {});


for (let master of masterData) {
    if (secondaryObj.hasOwnProperty(master.id)) {
        let ans = {}
        ans[config.id] = master.id
        ans[config.firstName] = master.firstName
        ans[config.lastName] = master.lastName
        ans[config.attendeeType] = master.attendeeType
        ans[config.badgeType] = master.badgeType
        ans[config.zip] = secondaryObj[master.id].zip
        ans[config.country] = secondaryObj[master.id].country
        ans[config.city] = secondaryObj[master.id].city
        ans[config.registered] = secondaryObj[master.id].registered
        ans[config.fileURL] = secondaryObj[master.id].files.length ? secondaryObj[master.id].files[secondaryObj[master.id].files.length - 1].fileURL : ""
        result.push(ans);
    }
}

console.log(result)

