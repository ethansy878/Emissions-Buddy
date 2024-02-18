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
    
    emissionNum.innerHTML = data + " kg CO2"

    treeUrl = 'http://127.0.0.1:5000/trees?emissions=' + data
    
    const treeResponse = await fetch(treeUrl)
    const treeData = await treeResponse.json(); // or response.json() if your server returns JSON

    let treeNum = document.getElementById('treenum')
    treeNum.innerHTML = treeData + " Trees I need to plant to offset your CO2 within a year"
}

//function for button to display photo


function show_image(src, width, height, alt) {
    var img = document.createElement("img");
    img.src = src;
    img.width = width;
    img.height = height;
    img.alt = alt;

    // This next line will just add it to the <body> tag
    document.body.appendChild(img);
}

function happyRedirect(){
    let img = document.getElementById("mainimg")
    img.setAttribute("src", "./assets/HappyEM.png")
    
    // wait 1 second then redirect
    setTimeout(() => {
        window.open('https://google.com', '_blank').focus();
      }, 1000);
}

// https://dev.to/melvin2016/how-to-convert-an-html-string-into-real-html-or-dom-using-javascript-5992
// make a new parser
const parser = new DOMParser();
let url = undefined;

// https://stackoverflow.com/questions/11684454/getting-the-source-html-of-the-current-page-from-chrome-extension
function onWindowLoad() {
    let noButton = document.getElementById("NO")
    noButton.addEventListener("click", function() {
        show_image("./assets/SadEM.png", 100, 100, "Sadge")});
    let yesButton = document.getElementById("YES")
    yesButton.addEventListener("click", function() {
            happyRedirect()});
    
        //noButton.setAttribute("height", noButton.getAttribute("width") + 100)

    let status = document.querySelector("#status");
    let idle = document.querySelector("#idle");
    let active = document.querySelector("#active");



    chrome.tabs.query({ active: true, currentWindow: true }).then(function (tabs) {
        var activeTab = tabs[0];
        var activeTabId = activeTab.id;

        url = tabs[0].url.toString();

        return chrome.scripting.executeScript({
            target: { tabId: activeTabId },
            // injectImmediately: true,  // uncomment this to make it execute straight away, other wise it will wait for document_idle
            func: DOMtoString,
            // args: ['body']  // you can use this to target what element to get the html for
        });

    }).then(function (results) {
        // logic here
        let doc = parser.parseFromString(results[0].result, "text/html");

        let startCode = undefined;
        let endCode = undefined;
        let airlineName = undefined
        let objs = {}


        if (url.includes("alaskaair")){
            idle.setAttribute("hidden", true);
            active.removeAttribute("hidden");
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
        }
        else if (url.includes("delta")) {
            idle.setAttribute("hidden", true);
            active.removeAttribute("hidden");
            airlineName = "Delta"
            objs = doc.getElementsByClassName("airport-code d-block ng-tns-c79-5")
            startCode = objs.item(0).innerHTML
            endCode = objs.item(1).innerHTML
        }
        else {
            return;
        }
        
        let queryString = 'http://127.0.0.1:5000/emission_calc?start="' + 
        startCode + '"&end="' + endCode + '"&airlineName="' + airlineName + '"';
        sendPost(queryString)

    }).catch(function (error) {
        additional = "";
        if (error.message.includes("innerHTML")) {
            additional = " (Select a flight first!)"
        }
        msg = 'Status: Error! ' + error.message + additional;
        status.innerText = msg
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