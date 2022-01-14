let rows_dizionario = 26879;
let rows_parole = 2741;
let dayWord = "";
getDayWord();

/*      NON HO CAPITO COME MA SI FA COSI
window.setInterval(function(){ 
    var date = new Date(); 
    if(date.getHours() === 0 && date.getMinutes() === 0){ 
        getDayWord();
        
    }
}, 60000); 
*/
document.getElementById('div').innerHTML="Parola del giorno: " + dayWord;


function editHtml(level, s){



    for (var i = 0; i < 5; i ++){

        if(s.charAt(i) === dayWord.charAt(i)){
            document.getElementById(i+level).style="background-color: green";
        } 
        else if (dayWord.includes(s.charAt(i))){
            document.getElementById(i+level).style="background-color: yellow";
        }

    }


    for (var i = level + 5; i < level + 10; i++){

        document.getElementById(i).style="visibility: visible"
        
    }
    
    for (var i = 1, j = 1; i < 22, j < 7; i += 5, j ++){

        if (level === i){

            document.getElementById("b"+j).style="visibility: hidden"
        
            document.getElementById("b"+(j+1)).style="visibility: visible"            

        }

    }

    if (level === 26){
    
        document.getElementById('b6').style="visibility: hidden"
    
    }


}
function victory(){

    alert ("Hai vinto!");

}

function lost(){

    alert("Tentativi terminati :(")

}

function handleErrors(){

    alert("la parola inserita non esiste");

}

function handleAction(level){


    let s = getString(level);

    if (isWord(s)){
        
        
        
        if (level === 26 && s != dayWord){

            lost(); 

        }

        if (s === dayWord)

            victory();
        
        else    

            editHtml(level, s);


    }
    
    else{

        handleErrors();

    }
    

}

function getString(level){

    let str = "";

    for (var i = level; i < level + 5; i ++){

        str += document.getElementById(i).value;

    }
    
    str += '\n';

    return str;
    
}


function isWord(s){

    var str = "";
    let allText = "";
    var rawFile = new XMLHttpRequest();


    rawFile.open("GET", "dizionario.txt", false);
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4)
        {
            if(rawFile.status === 200 || rawFile.status == 0)
            {
                allText += rawFile.responseText;
    
            }
        }
        
    }
    rawFile.send(null);


    for (var i = 0; i < allText.length; i++){

        str += allText.charAt(i);

        if (allText.charAt(i) == '\n'){

            if (str === s)
                return true;
            
            
            str = "";
        }        
        
    }

    return false;

}

function getDayWord(){

    let n = Math.floor(Math.random() * rows_parole);
    var str = "";
    var c = 0;
    let allText = "";
    var rawFile = new XMLHttpRequest();
    
    rawFile.open("GET", "parole.txt", false);
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4)
        {
            if(rawFile.status === 200 || rawFile.status == 0)
            {
                allText += rawFile.responseText;
    
            }
        }
        
    }
    rawFile.send(null);    


    for (var i = 0; i < allText.length; i++){

        str += allText.charAt(i);

        if (allText.charAt(i) == '\n'){
            
            c++;

            if (c === n)
                dayWord = str;
            
            
            str = "";
        }        
        
    }

    document.getElementById('div').innerHTML=str;

}

/*
 TODO:  

        generare la parola del giorno ogni giorno a mezzanotte

        istruzioni di gioco
        
        non deve essere segnalata la stessa parola in verde e in giallo

        le parole inserite, se valide, non possono essere modificate

        è possibile inserire solo un carattere per volta

        automaticamente cambiare il focus sulla prossima casella quando si è inserito il carattere

        migliorare i messaggi di errore

        migliorare messaggio di sconfitta e vittoria

        abbellimento con animazioni

        togliere i plurali dal file parole.txt

        filtrare il più possibile il file parole.txt



 */
