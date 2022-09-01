const masterData = require('D:/TurnoutNow/masterUser/user_master.json');
const secondryData = require('D:/TurnoutNow/masterUser/users_secondary.json');
const configured = require('D:/TurnoutNow/masterUser/configure.json');

let result = [];

masterData.forEach((master) => {
    secondryData.filter((secondary) => {
        if (master.id === secondary.attendeeId) {
            let ans = {
                attendee_id: master.id,
                first_name: master.firstName,
                last_name: master.lastName,
                attendee_type: master.attendeeType,
                badge_type: master.badgeType,
                zip: secondary.zip,
                country: secondary.country,
                city: secondary.city,
                registered: secondary.registered,
                userImage_url: secondary.files.length ? secondary.files[secondary.files.length - 1].fileURL : "",
            }
            result.push(ans)
        }
    })
})


console.log(result)
