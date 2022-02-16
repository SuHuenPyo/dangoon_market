
(
    async ()=>{
        const footer = document.querySelector('*[data-footer]');
        const url = footer.dataset.footer;
    
        let html = null;
    
        try {
            const response = await fetch(url);
    
            html = await response.text();
    
        } catch(err){
            console.log(err);
        }
        if(html != null){
            footer.outerHTML = html;

        }


    }
)();
