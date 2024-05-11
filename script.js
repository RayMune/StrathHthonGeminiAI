document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('generateButton').addEventListener('click', function () {
        var question = document.getElementById('questionInput').value;
        generateQuestion(question);
    });
});

function generateQuestion(question) {
    var API_KEY = "AIzaSyB-84Bx9du9DokKzdJPS9xUH-aWd8rPeXQ";
    var request_body = {
        "contents": [
            {
                "role": "user",
                "parts": [{"text": question}]
            }
        ]
    };

    var url = "https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=" + API_KEY;

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(request_body)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        var generated_text = data.candidates[0].content.parts[0].text;
        displayResult(generated_text);
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
    });
}

function displayResult(generatedText) {
    document.getElementById('resultContainer').innerHTML = '<p>' + generatedText + '</p>';
}
