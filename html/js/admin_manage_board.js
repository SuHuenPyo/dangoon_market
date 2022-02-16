
boardClickEvent();

function boardClickEvent(){
    let navButton = document.querySelectorAll('.admin-common-button');
    for(var i =0; i< navButton.length; i++){
        navButton[i].addEventListener("click", (e)=>{
            location.href=e.target.value+".html"; 
        });
    }
}

