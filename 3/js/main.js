let input = document.querySelector('input');
let btnSend = document.querySelector('.btn-send');
let btnGeo = document.querySelector('.btn-geo');
let output = document.querySelector('.output');

let wsURL = 'wss://echo-ws-service.herokuapp.com';
let websocket = new WebSocket(wsURL);

websocket.onmessage = function(event) {
    if (event.data.indexOf('Гео-локация') != -1) {
        return;
    } else {
        addMessageToChat(event.data, true);
    }
};

btnSend.addEventListener('click', function() {
    let message = input.value;
    input.value = null;
    input.focus();
    
    addMessageToChat(message, false);
});

btnGeo.addEventListener('click', function() {
    if (!navigator.geolocation) {
        console.log('Навигатор не поддерживается вашим браузером');
    } else {
        navigator.geolocation.getCurrentPosition(geolocationSuccess, geolocationError);
    }
});

function addMessageToChat(message, senderIsServer) {
    if (senderIsServer) {
        output.innerHTML += `
            <div class="message-wrapper message-wrapper_server">
                <p>${message}</p>
            </div>
        `;
    } else {
        websocket.send(message);
        output.innerHTML += `
            <div class="message-wrapper message-wrapper_client">
                <p>${message}</p>
            </div>
        `;
    }
}

function geolocationSuccess(position) {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    let link = `<a href="https://www.openstreetmap.org/#map=15/${latitude}/${longitude}" target="_blank">Гео-локация</a>`;

    websocket.send(`Гео-локация: ${latitude}, ${longitude}`);
    
    addMessageToChat(link, false);
}

function geolocationError() {
    console.log('Невозможно получить ваше местоположение');
}