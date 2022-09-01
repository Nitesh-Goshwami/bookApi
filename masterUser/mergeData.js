const masterData = require('D:/TurnoutNow/masterUser/user_master.json');
const secondaryData = require('D:/TurnoutNow/masterUser/users_secondary.json');
const config = require('D:/TurnoutNow/masterUser/configure.json');
let result = [];

// Converting the the secondary user array into object.
let secondaryObj = secondaryData.reduce((arr, value) => ({ ...arr, [value.attendeeId]: value }), {});


for (let master of masterData) {
    for (let secondary in secondaryObj) {       //This loop is looking for the key in object .       
        if (master.id === secondary) {              // looking up a key in an object is O(1)
            let ans = {}
            ans[config[0].id] = master.id
            ans[config[0].firstName] = master.firstName
            ans[config[0].lastName] = master.lastName
            ans[config[0].attendeeType] = master.attendeeType
            ans[config[0].badgeType] = master.badgeType
            ans[config[0].zip] = secondaryObj[secondary].zip
            ans[config[0].country] = secondaryObj[secondary].country
            ans[config[0].city] = secondaryObj[secondary].city
            ans[config[0].registered] = secondaryObj[secondary].registered
            ans[config[0].fileURL] = secondaryObj[secondary].files.length ? secondaryObj[secondary].files[secondaryObj[secondary].files.length - 1].fileURL : ""
            result.push(ans);
            break;
        }
    }
}


console.log(result)

