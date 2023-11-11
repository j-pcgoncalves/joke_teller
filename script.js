const btn = document.getElementById("btn");
const audioElement = document.getElementById("audio");

// Disable/Enable Button
function toggleBtn() {
    btn.disabled = !btn.disabled;
}

// Passing Joke to VoiceRSS API
function tellMeJoke(joke) {
    VoiceRSS.speech({
        key: secretConfig.API_KEY,
        src: joke,
        hl: "en-us",
        r: 0,
        c: "mp3",
        f: "44khz_16bit_stereo",
        ssml: false,
    });
}

// Get jokes from Joke API
async function getJoke() {
    // Disable Button
    toggleBtn();

    let joke = "";
    const apiUrl = "https://v2.jokeapi.dev/joke/Dark";

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        joke = data.setup ? `${data.setup} ... ${data.delivery}` : data.joke;

        // Text-to-Speech
        tellMeJoke(joke);

    } catch (err) {
        // Catch Error here
    }
}

// Event Listeners
btn.addEventListener("click", getJoke);
audioElement.addEventListener("ended", toggleBtn);