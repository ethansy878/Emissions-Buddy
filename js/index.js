if (window.location.toString === "www.alaskaair.com"){
    let idle = document.getElementById('idle');
    idle.setAttribute("hidden", true)
};


chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
    let url = tabs[0].url;
    document.getElementById('status').innerHTML = "Edited"
});

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