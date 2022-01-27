adminNavButtonClickEvent();

//관리자 nav영역 버튼을 누르면 페이지를 이동하게 한다.
function adminNavButtonClickEvent(){
    let navButton = document.querySelectorAll('.admin-common-nav-btn');
    for(var i =0; i< navButton.length; i++){
        navButton[i].addEventListener("click", (e)=>{
            location.href=e.target.value+".html"; 
        });
    }
}

