// https://www.reddit.com/r/flask/comments/afgks4/how_to_get_a_javascript_function_to_call_a_flask/


// 127.0.0.1:5000/emission_calc?start="NULL"&end="NULL"&airlineName="Alaska"

const sendPost = async () => {
    const url = 'http://127.0.0.1:5000/emission_calc?start="NULL"&end="NULL"&airlineName="Alaska"'; 
    
    
    
    
    // the URL to send the HTTP request to
    //const body = ''; // whatever you want to send in the body of the HTTP request
    const headers = {}
    //{'Access-Control-Allow-Origin': '*','start': 'NULL', 'end': 'NULL', 'airlineName': "Alaska"}; // if you're sending JSON to the server
    const method = 'GET';
    const response = await fetch(url);
    const data = await response.json(); // or response.json() if your server returns JSON

    let emissionNum = document.getElementById('emissionnum')

    /*setTimeout(function(){
        console.log("Executed after 1 second");
    }, 1000); */
    
    emissionNum.innerHTML = data

    console.log(data);
}

sendPost();


/*
function replace(){
    const word = document.getElementById("word").value;
    const replacement = document.getElementById("replacement").value;

    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        const url = tabs[0].url;
        if (!url.startsWith('chrome://')){
            chrome.scripting.executeScript({
                target: {tabId: tabs[0].id},
                function: functionToInject,
                args: [word, replacement]
            })
        }
    });
}

*.

/* Old code from workshop
function functionToInject(word, replacement){
    console.log('replace');
    const toChange = new RegExp(`\\b${word}\\b`, 'gi');

    function replaceText(node) {
        if (node.nodeType === Node.TEXT_NODE){
            node.textContent = node.textContent.replace(toChange, replacement);
        }
        else {
            node.childNodes.forEach(replaceText); 
        }
    }
    replaceText(document.body);
}

async function getSynonym(){
    const word = document.getElementById("word").value;
    const url = 'https://languagetools.p.rapidapi.com/synonyms/' + word;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'YOUR KEY',
            'X-RapidAPI-Host': 'HOST'
        }
    };

    try {
        const response = await fetch(url, options);
        const result = await response.text();
        document.getElementById('results').textContent = result;
    } catch (error) {
        console.error(error);
    }
}

document.addEventListener("mouseup", function(event) {
    let selectedText = window.getSelection().toString().trim();
    if(selectedText !== "") {
        getSynonym(selectedText); 
    }
});
*/