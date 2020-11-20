function alertUser(){
    alert("Oops! This feature isn't available yet.")
}



 function follow(){
     document.getElementById("notFollowed").onclick = function(){
         document.getElementById("notFollowed").style.color = 'white';
         document.getElementById("notFollowed").style.backgroundColor = 'blue';
         document.getElementById("notFollowed").innerHTML = 'Followed';
     }
 }

