const json = require('./transcriptData.json');
const data = json.results.items;

let [phrases, sentances, sentance, phrase, startTime, pharStartTime, phraseWords] = [[], [], "", "", 0, 0, 0]
let flag = false;

for (let i = 0; i < data.length; i++) {
    if (data[i].alternatives[0].content != "." && data[i].alternatives[0].content != "?") {
        sentance += data[i].alternatives[0].content + " ";

        // Creating Phrases 
        if (data[i].alternatives[0].content == ",") {
            phraseWords--;
        }
        if (phraseWords === 7 || flag) {
            let temp = {
                start_time: data[pharStartTime].start_time,
                end_time: data[i - 1].end_time,
                phrase: phrase
            }
            if (flag) {
                temp.end_time = data[i - 2].end_time
            }
            phrases.push(temp);
            pharStartTime = i;
            flag = false;
            phrase = "";
            phraseWords = 0
        }
        phrase += data[i].alternatives[0].content + " ";
        phraseWords++;
    } else {

        // Creating sentances 
        sentance += data[i].alternatives[0].content;
        let ans = {
            start_time: data[startTime].start_time,
            end_time: data[i - 1].end_time,
            sentance: sentance
        }
        sentances.push(ans)
        sentance = "";
        startTime = i + 1;
        flag = true;
    }
}

console.log(sentances, phrases)