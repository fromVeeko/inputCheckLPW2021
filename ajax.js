function dateCheck(){//01/34/6789
            //nn/nn/nnnn
    var errorOutput = document.getElementById('dateErrorDiv');
    var date = document.getElementById('date').value;
    var pass = 0;

    var day = date.slice(0, 2);
    var firstSlash = date.slice(2, 3);
    var month = date.slice(3, 5);
    var secondSlash = date.slice(5, 6);
    var year = date.slice(6, 10);
    try {
        if (isNaN(day)) throw "Inserire un numero";
        if (day < 1 || day > 31) throw "Inserire un giorno valido (1 - 31)";
        if (isNaN(month)) throw "Inserire un numero";
        if (month < 1 || month > 12) throw "Inserire un mese valido (1 - 12)";
        if (isNaN(year)) throw "Inserire un numero";
        if (year < 1900 || year > 2021) throw "Inserire un anno valido (1900 - 2021)";
        if (firstSlash != '/' || secondSlash != '/') throw "Correggere il carattere (inserire /)";

    } catch (error) {
        errorOutput.innerHTML = error;
        //alert("Got a problem");
        pass = 1;
    }
    if (pass == 0) {
        errorOutput.innerHTML = "&#x2714;";
        passValues();
    }
}

function hourCheck() {
    var timed = document.getElementById('hour').value;
    var errorOutput = document.getElementById('hourErrorDiv');
    var pass = 0;
    var hour = timed.slice(0, 2);
    var dotDot = timed.slice(2, 3);
    var min = timed.slice(3, 5);

    try {
        if (isNaN(hour)) throw "Inserire un numero";
        if (hour < 0 || hour > 23) throw "Inserire un valore valido per l'ora (0-23)";
        if (dotDot != ':') throw "Correggere il formato orario (hh:mm)";
        if (isNaN(min)) throw "Inserire un numero";
        if (min < 0 || min > 60) throw "Inserire un valore valido per i minuti (0-59)";
    } catch (error) {
        errorOutput.innerHTML = error;
        pass = 1;
    }

    if (pass == 0) {
        errorOutput.innerHTML = "&#x2714;";
        passValues();
    }
}

function descCheck() {
    var description = document.getElementById('description-input').value;
    var errorOutput = document.getElementById('descErrorDiv');

    var pass = 0;
    var descLength = description.length;
    for (var i = 0; i < descLength; i++){
        if (!isNaN(description[i]) && description[i] != ' ') {
            error = "Rimuovere i numeri dalla descrizione";
            pass++;
        }
    }

    if (pass == 0) {
        errorOutput.innerHTML = "&#x2714;";
        passValues();
    } else {
        errorOutput.innerHTML = error;
    }
}

function passValues(){//la funzione viene chiamata dalle tre funzioni di controllo, solo se il controllo viene passato
    //preparo le variabili
    var date = document.getElementById('date').value;
    var hour = document.getElementById('hour').value;
    var desc = document.getElementById('description-input').value;
    var serverResp = document.getElementById('serverResponse');
    var jsResp = document.getElementById('debug');

    jsResp.innerHTML = "Working on it...";
    var request = new XMLHttpRequest();

    request.onreadystatechange = function () {
        if (request.readyState == 4 && request.status == 200) {
            serverResp.innerHTML = request.responseText;
        }
    }

    request.open("POST", "server.php");
    if (date != '' && hour != '' && desc != '') {
        jsResp.innerHTML = '';
        request.setRequestHeader('content-type', "application/x-www-form-urlencoded");
        var dateTS = date;  //TS = to server
        var hourTS = hour;
        var descTS = desc;
        var urlEncode = "date=" + dateTS + "&hour=" + hourTS + "&desc=" + descTS;
        //jsResp.innerHTML = urlEncode;
        request.send(urlEncode);
    } else {
        jsResp.innerHTML = "Riempi tutti i campi per vedere una magia...";
    }
}