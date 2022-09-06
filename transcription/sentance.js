const json = require('./transcriptData.json');
const data = json.results.items;

let [phrases,sentances, result, sentance, phrase, startTime, phraseWords] = [[],[], [], "", "", 0, 0]
let flag = false;


for (let i = 0; i < data.length; i++) {
    if (data[i].alternatives[0].content == "." || data[i].alternatives[0].content == "?") {
        sentance += data[i].alternatives[0].content;
        let ans = {
            start_time: data[startTime].start_time,
            end_time: data[i - 1].end_time,
            sentance: sentance
        }
        sentances.push(ans)
        sentance = "";
        startTime = i + 1;
        flag = true; // will indicate the end of sentance to prevent the phrase boundry 

    } else {
        sentance += data[i].alternatives[0].content + " ";
        phrase += data[i].alternatives[0].content + " ";
        phraseWords++;

        if (data[i].alternatives[0].content == ",") {
            phraseWords--;
        }
        if (phraseWords === 7 || flag) {
            let temp = {
                start_time: data[i].start_time,
                end_time: data[i - 1].end_time,
                phrase: phrase
            }
            phrases.push(temp);
            phrase = "";
            phraseWords = 0
        }
        if (flag) {
            let val = {
                sentances: sentances,
                phrases: phrases
            }
            result.push(val);
            sentances = [];
            phrases = [];
            flag = false;
        }
    }
}
console.log(result)