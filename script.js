// Initialize Speech Recognition
const startSpeech = document.getElementById('startSpeech');
const stopSpeech = document.getElementById('stopSpeech');
const inputText = document.getElementById('inputText');
const output = document.getElementById('output');

let recognition;
if ('webkitSpeechRecognition' in window) {
    recognition = new webkitSpeechRecognition();
    recognition.lang = 'fa-IR'; // Set your desired language
    recognition.interimResults = false; // Only final results are captured
    recognition.continuous = true;

    // When speech is recognized
    recognition.onresult = (event) => {
        let newTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
            newTranscript += event.results[i][0].transcript;
        }

        // Check if the new transcript is already part of the current text
        if (!inputText.value.endsWith(newTranscript.trim())) {
            inputText.value += newTranscript.trim() + ' ';
        }
    };

    // Handle errors
    recognition.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        stopSpeech.disabled = true;
        startSpeech.disabled = false;
    };
} else {
    alert('Your browser does not support Speech Recognition.');
}

// Start recognition
startSpeech.addEventListener('click', () => {
    recognition.start();
    startSpeech.disabled = true;
    stopSpeech.disabled = false;
});

// Stop recognition
stopSpeech.addEventListener('click', () => {
    recognition.stop();
    startSpeech.disabled = false;
    stopSpeech.disabled = true;
});

// Submit text for grammar check
document.getElementById('submitText').addEventListener('click', () => {
    const text = inputText.value;
    if (!text.trim()) {
        output.textContent = 'Please provide text to check.';
        return;
    }

    // Mock API call for grammar correction
    output.textContent = 'Checking grammar...';
    setTimeout(() => {
        // Replace with real API logic
        const correctedText = text.replace(/some error/i, 'corrected phrase');
        output.innerHTML = `<strong>Corrected Text:</strong> ${correctedText}`;
    }, 2000);
});
