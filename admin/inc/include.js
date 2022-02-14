
(
    async ()=>{
        const header = document.querySelector('*[data-header]');
        const url = header.dataset.header;
    
        let html = null;
    
        try {
            const response = await fetch(url);
    
            html = await response.text();
    
        } catch(err){
            console.log(err);
        }
        if(html != null){
            header.outerHTML = html;

            let navButton = document.querySelectorAll('.admin-common-nav-btn');
            for(var i =0; i< navButton.length; i++){
                navButton[i].addEventListener("click", (e)=>{
                    location.href="./"+e.target.value+".html"; 
                });
            }
        }


    }
)();
