
var timeleft = 10;
clearInterval(downloadTimer);
var downloadTimer = setInterval(function(){
timeleft--;
document.getElementById("countdowntimer").textContent = timeleft 
if(timeleft <= 0){
    clearInterval(downloadTimer);
    document.getElementById("tt").textContent = "Sending ...";
    document.getElementById("btn-click").onclick = parseJson();  
}
},1000);

