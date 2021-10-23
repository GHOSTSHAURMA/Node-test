console.log('Client is up');

const next_button = document.getElementById('Next');
const out = document.getElementById('Out');

xmlhttp = new XMLHttpRequest();

xmlhttp.open("GET","http://127.0.0.1:3000/currentNum", true);
xmlhttp.onreadystatechange = function()
{
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200)
    {
        currentNum = xmlhttp.responseText;

        out.innerHTML = `Число >> ${currentNum}`;
    }
}
xmlhttp.send();

function get()
{
    xmlhttp = new XMLHttpRequest();

    xmlhttp.open("GET","http://127.0.0.1:3000/nextNum", true);
    xmlhttp.onreadystatechange = function()
    {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200)
        {
            nextNum = xmlhttp.responseText;

            out.innerHTML = `Число >> ${nextNum}`;
        }
    }
    xmlhttp.send();
}