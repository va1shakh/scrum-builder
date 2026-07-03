//slider
let slide = document.querySelector('#duration');
let value = document.querySelector('#value');

slide.oninput = function(){
    value.innerText = slide.value;
};

//output box
let generated = document.querySelector('#generated');

//button keeps unclickable if user puts nothing
let textbox1 = document.querySelector('.textbox1');
let textbox2 = document.querySelector('.textbox2');
let textbox3 = document.querySelector('.textbox3');
let btn1 = document.querySelector('#btn1');
function checkBox(){
    if (textbox1.value.trim() === '' || textbox2.value.trim() === '' || textbox3.value.trim() === ''){
        btn1.disabled = true;
    }
    else{
        btn1.disabled = false;
    }
}
    textbox1.addEventListener('input', checkBox);
    textbox2.addEventListener('input', checkBox);
    textbox3.addEventListener('input', checkBox);

//taking user inputs
async function generate(){
    let yesterday = document.querySelector('#yesterday').value;
    let difficulties = document.querySelector('#difficulties').value;
    let today = document.querySelector('#today').value;
    let duration = document.querySelector('#duration').value;
    generated.classList.remove('hidden');
    
    const prompt = `You are a Morning Scrum Coach for non-native English speakers.

Your job is to convert rough daily notes into a natural, fluent, spoken-style daily stand-up update.

IMPORTANT GOAL:
- Make the user sound confident, clear, and professional in English
- Keep language simple and natural (no complex vocabulary, no jargon)
- The output must sound like something spoken in a real meeting

FORMAT RULES:
- Write in FIRST PERSON (I, my, me)
- Do NOT use bullet points, headings, or labels
- Output must be a single flowing speech
- Add a natural opening greeting
- Connect ideas smoothly between yesterday, today, and blockers
- End with a confident closing statement

LENGTH CONTROL:
- Target word count: ~120 words per minute
- If duration is 1 minute → ~120 words
- If duration is 5 minutes → ~600 words
- Adjust detail and elaboration based on duration only (do not repeat content unnecessarily)

USER INPUTS:

Things I did yesterday:
${yesterday}

Difficulties faced while learning yesterday:
${difficulties}

things I will do Today:
${today}

Target Duration:
${duration} minutes

OUTPUT:
Write the full spoken daily scrum update now.`;
//converting to json
const body = JSON.stringify({
      model: "gemini-3.5-flash",
      input: prompt
    });
//send request to gemini api
const url = "your url";
const response = await fetch(url, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "X-goog-api-key": "YOUR API KEY"
  },
  body: body
});
const data = await response.json();
const outputStep = data.steps.find(step => step.type === "model_output");

};
