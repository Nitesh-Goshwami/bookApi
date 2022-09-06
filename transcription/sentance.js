const json = require('./transcriptData.json');
const data = json.results.items;

let [phrases, sentances, result, sentance, phrase, sentStartTime, pharStartTime, phraseWords] = [[], [], [], "", "", 0, 0, 0]
let flag = false;


for (let i = 0; i < data.length; i++) {
    if (data[i].alternatives[0].content == "." || data[i].alternatives[0].content == "?") {
        sentance += data[i].alternatives[0].content;
        let ans = {
            start_time: data[sentStartTime].start_time,
            end_time: data[i - 1].end_time,
            sentance: sentance
        }
        sentances.push(ans)
        sentance = "";
        sentStartTime = i + 1;
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
                start_time: data[pharStartTime].start_time,
                end_time: data[i - 1].end_time,
                phrase: phrase
            }
            phrases.push(temp);
            phrase = "";
            phraseWords = 0;
            pharStartTime = i+1;
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