<?php
    $date = $_POST['date'];
    $hour = $_POST['hour'];
    $desc = $_POST['desc'];

    echo "Questa che stai leggendo è una semplice risposta di un
            server che non sa a cosa serva, ma comunque ti risponde 
            ciò che gli hai inserito: <br>
            <b>data : $date </b> </br>
            <b>ora : $hour </b> </br>
            <b>descrizione : $desc </b> </br> </br>
            
            Per saperne di più, visita la pagina <a href = \"devSpec.html\" class = \"link-between-text\">specifiche tecniche</a>"
?>