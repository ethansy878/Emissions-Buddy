// Interaction with Flask Server
// CREDIT: https://www.reddit.com/r/flask/comments/afgks4/how_to_get_a_javascript_function_to_call_a_flask/
const sendPost = async (url) => {
    const method = 'GET'; // not used
    const response = await fetch(url);
    const emData = await response.json();

    let emissionNum = document.getElementById('emissionnum')    
    emissionNum.innerHTML = emData + " kg CO2"

    treeUrl = 'http://127.0.0.1:5000/trees?emissions=' + emData
    const treeResponse = await fetch(treeUrl)
    const treeData = await treeResponse.json();

    let treeNum = document.getElementById('treenum')
    treeNum.innerHTML = treeData + " Trees I need to plant to offset your CO2 within a year"
}

// function for button to display photo
function show_image(src, width, height, alt) {
    var img = document.createElement("img");
    img.src = src;
    img.width = width;
    img.height = height;
    img.alt = alt;
    document.body.appendChild(img);
}

// function for page redirect on "YES" press
function happyRedirect(){
    let img = document.getElementById("mainimg")
    img.setAttribute("src", "./assets/HappyEM.png")
    
    // wait 1 second then redirect
    setTimeout(() => {
        window.open('https://google.com', '_blank').focus();
      }, 1000);
}

// this must be global due to several function .this()
let url = undefined;

// CREDIT: https://stackoverflow.com/questions/11684454/getting-the-source-html-of-the-current-page-from-chrome-extension
const parser = new DOMParser(); // this must be global due to several function .this()

function onWindowLoad() {
    let noButton = document.getElementById("NO");
    noButton.addEventListener("click", function() {
        show_image("./assets/SadEM.png", 100, 100, "Sadge")});
    let yesButton = document.getElementById("YES");
    yesButton.addEventListener("click", function() {
        happyRedirect()});
    
    let status = document.querySelector("#status");
    let idle = document.querySelector("#idle");
    let active = document.querySelector("#active");

    chrome.tabs.query({ active: true, currentWindow: true }).then(function (tabs) {
        var activeTab = tabs[0];
        var activeTabId = activeTab.id;

        url = tabs[0].url.toString();

        return chrome.scripting.executeScript({
            target: { tabId: activeTabId },
            func: DOMtoString,
        });

    }).then(function (results) {
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