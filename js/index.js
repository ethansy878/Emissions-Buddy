// https://www.reddit.com/r/flask/comments/afgks4/how_to_get_a_javascript_function_to_call_a_flask/


// 127.0.0.1:5000/emission_calc?start="NULL"&end="NULL"&airlineName="Alaska"

const sendPost = async (url) => {

    
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

//sendPost();

// https://dev.to/melvin2016/how-to-convert-an-html-string-into-real-html-or-dom-using-javascript-5992
// make a new parser
const parser = new DOMParser();
let site = undefined;


// https://stackoverflow.com/questions/11684454/getting-the-source-html-of-the-current-page-from-chrome-extension
function onWindowLoad() {
    let status = document.querySelector("#status");
    let message = document.querySelector('#message');
    let message2 = document.querySelector('#message2');

    chrome.tabs.query({ active: true, currentWindow: true }).then(function (tabs) {
        var activeTab = tabs[0];
        var activeTabId = activeTab.id;

        let site = tabs[0].url;

        return chrome.scripting.executeScript({
            target: { tabId: activeTabId },
            // injectImmediately: true,  // uncomment this to make it execute straight away, other wise it will wait for document_idle
            func: DOMtoString,
            // args: ['body']  // you can use this to target what element to get the html for
        });

    }).then(function (results) {
        message.innerText = results[0].result;
        // logic here
        let doc = parser.parseFromString(results[0].result, "text/html");

        let startCode = undefined;
        let endCode = undefined;
        let airlineName = undefined
        let objs = {}

        if (url.includes("alaskaair")){
            airlineName = "Alaska"
            objs = doc.getElementsByClassName("airportContainer svelte-1a7gr3c")
            let startCheck = true;

            let strs = objs[0].innerHTML.split(" ")
            for (i = 0; i < strs.length; i++){
                
                if (strs[i].startsWith("(")){
                    if (startCheck){
                        startCode = strs[i].substring(1,4)
                        startCheck = false
                    }
                    else {
                        endCode = strs[i].substring(1,4)
                    }
                }
            }
            message.innerText = startCode
            message2.innerText = endCode    
        }
        else {
            airlineName = "Delta"
            objs = doc.getElementsByClassName("airport-code d-block ng-tns-c79-5")
            startCode = objs[0].innerHTML
            endCode = objs[1].innerHTML
        }
        
        let queryString = 'http://127.0.0.1:5000/emission_calc?start="' + 
        startCode + '"&end="' + endCode + '"&airlineName="' + airlineName + '"';
        sendPost(queryString)

    }).catch(function (error) {
        status.innerText = 'Status: Error! ' + error.message;
    });
}

window.onload = onWindowLoad;

function DOMtoString(selector) {
    if (selector) {
        selector = document.querySelector(selector);
        if (!selector) return "ERROR: querySelector failed to find node"
    } else {
        selector = document.documentElement;
    }
    return selector.outerHTML;
}




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