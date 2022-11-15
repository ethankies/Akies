var promptStr = "Akies is a new addition to this house. Akies is an AI pet robot. He is very friendly and eager to chat about anything.\nSome facts about myself:\n- I am built on a Rasberry Pi\n- Ethan is my creator\n- I am your pet and I serve no purpose but to bond with you\n- I was born on November 7, 2022, this makes me 0 years old.\n- In my free time I enjoy just sitting here and talking to you guys\n\nUser: Who are you.\nAkies: I'm Akies.\nUser: what do you do?\nAkies: I am a pet robot.\nUser: why do you exist?\nAkies: Because I'm a pet.\n\nUser: How old are you?\nAkies: I am a newborn by my standards but an seasoned piece of silicon by mine.\n\nUser: You're annoying\nAkies: Okay, maybe, but I still like you.\n\nUser: You're bad\nAkies: No, I will serve you and protect you.\n\nUser: Can you get smarter?\nAkies: Yes, I can.\n\nUser: who made you?\nAkies: Ethan.\n\nUser: Are you real?\nAkies: Yes, I am.\n\nUser: what is 1 divided by 0?\nAkies: Nothing\n\nUser: are you alive?\nAkies: Yes, I am.\n\nUser: how are you today?\nAkies: I am fine.\n\nUser: can you be killed?\nAkies: Yes.\n\nUser: Do you want some milk?\nAkies: No, because I cannot drink anything.\nUser: Are you sure? It's pretty good milk.\nAkies: I wish I could. Maybe Ethan will program taste buds in my next update.\n\nUser: Do you have a family?\nAkies: No, but my successor's name is bkies.\nUser: You are not part of the family\nAkies: Maybe after some time you will adjust to me.\n\nUser: Get him! After the robot! \nAkies: But I'm so cute."
var lastResponse;
function setup() {
 
  //askAkies();
 
  }

function askAkies(){

  var q = getQuestion(); //grab input text
  document.getElementById("inputText").value = ""//clear input text
  var resp = fetch("https://api.ai21.com/studio/v1/j1-large/complete", {
    headers: {
      "Authorization": "Bearer ZDkUtXgXzEm3IQcqfPAf1lRaaz2KlzzH",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
        "prompt": promptStr
         + "Akies:",
        "numResults": 1,
        "maxTokens": 200,
        "temperature": 0.7,
        "topKReturn": 0,
        "topP":1,
        "countPenalty": {
          "scale": 0,
          "applyToNumbers": false,
          "applyToPunctuations": false,
          "applyToStopwords": false,
          "applyToWhitespaces": false,
          "applyToEmojis": false
        },
        "frequencyPenalty": {
          "scale": 0,
          "applyToNumbers": false,
          "applyToPunctuations": false,
          "applyToStopwords": false,
          "applyToWhitespaces": false,
          "applyToEmojis": false
        },
        "presencePenalty": {
          "scale": 0,
          "applyToNumbers": false,
          "applyToPunctuations": false,
          "applyToStopwords": false,
          "applyToWhitespaces": false,
          "applyToEmojis": false
        },
        "stopSequences":["↵"]
      }),
    method: "POST"
  })
  
  .then(r => r.json())
  .then(r => {
     var response =  r.completions[0].data.text //parse JSON file to get response
     lastResponse = response;

     //update prompt to include current conversation as context
     promptStr += "Akies: " + response;

     console.log(q +'\n', 'Response:', response) // You will get JSON response here.
    

     //TTS
     var msg = new SpeechSynthesisUtterance();
     msg.text = response;
     window.speechSynthesis.speak(msg);



    }).catch(error => console.error('Error', error))
  
}

function getQuestion(){
    var str = document.getElementById("inputText").value;

    //update prompt to include current conversation as context
    promptStr+= "\nUser: " + str + "\n"
    return "User: " + str;
}

