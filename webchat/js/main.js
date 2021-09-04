// initialize websockets:
var ws_uri = "ws://used.hondascooterparts.com:9600";
var websocket = new WebSocket(ws_uri);


// on websocket open:
websocket.onopen = function(event) {
    MessageAdd('<div class="message green">Welcome... to the Hyperblurt Mainframe.</div>');
};


// on websocket close:
websocket.onclose = function(event) {
    MessageAdd('<div class="message blue">You have been disconnected.</div>');
};


// on websocket error:
websocket.onerror = function(event) {
    MessageAdd('<div class="message red">Connection to chat failed.</div>');
};


// on websocket message received:
websocket.onmessage = function(event) {
    var data = JSON.parse(event.data);

    if (data.type === "message" || data.type === "mirror") {
        if (data.username === localStorage.getItem("username")) {
            MessageAdd('<div class="message self">' + data.username + ': ' + data.message + '</div>');
        } else {
            MessageAdd('<div class="message">' + data.username + ': ' + data.message + '</div>');
        }
    }
};


// on chat form submit:
document.getElementById("chat-form").addEventListener("submit", function(event) {
    event.preventDefault();

    var message_element = document.getElementsByTagName("input")[0];
    var message = message_element.value;

    if (message.toString().length) {
        var data = {
            type: "message",
            username: localStorage.getItem("username"),
            message: message
        };

        websocket.send(JSON.stringify(data));

        message_element.value = "";
    }
}, false);


// add message to chat:
function MessageAdd(message) {
    var chat_messages = document.getElementById("chat-messages");
    console.log('sending')
    console.log(message)
    message = linkify(message)

    chat_messages.insertAdjacentHTML("beforeend", message);
    chat_messages.scrollTop = chat_messages.scrollHeight;
}

function linkify(inputText) {
    var replacedText, replacePattern1, replacePattern2, replacePattern3;

    //URLs starting with http://, https://, or ftp://
    replacePattern1 = /(\b(https?|ftp):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gim;
    replacedText = inputText.replace(replacePattern1, '<a href="$1" target="_blank">$1</a>');

    //URLs starting with "www." (without // before it, or it'd re-link the ones done above).
    replacePattern2 = /(^|[^\/])(www\.[\S]+(\b|$))/gim;
    replacedText = replacedText.replace(replacePattern2, '$1<a href="http://$2" target="_blank">$2</a>');

    //Change email addresses to mailto:: links.
    replacePattern3 = /(([a-zA-Z0-9\-\_\.])+@[a-zA-Z\_]+?(\.[a-zA-Z]{2,6})+)/gim;
    replacedText = replacedText.replace(replacePattern3, '<a href="mailto:$1">$1</a>');

    return replacedText;
}

function Username() {
    var username = window.prompt("Enter your username:", "");

    if (username.toString().length > 0) {
        localStorage.setItem("username", username);
    } else {
        alert("Your username must be at least one character.");
        Username();
    }
}

Username();