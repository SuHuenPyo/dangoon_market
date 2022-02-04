
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
            document.querySelector('#menu-btn').addEventListener('click', e => {
                const menu = document.querySelector('#menu')
                menu.style.left = '0px';
                menu.addEventListener('click', e => {
                    menu.style.left = '-360px';
                })
            });

            if(url.includes('no_logo')){
                document.querySelector('header > h1').innerHTML = header.dataset.title;
            }
        }
    }
)();


