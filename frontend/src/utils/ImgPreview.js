const onImgUpload = (e,viewSelector) => {
    const target = e.currentTarget;
    const imgView = document.querySelector(viewSelector);
    if (target.files[0]) {
      const reader = new FileReader();

      reader.onload = (event) => {
        const newImg = document.createElement('img');
        newImg.setAttribute('src',event.target.result)

        imgView.insertAdjacentElement("afterbegin",newImg);
      };

      reader.readAsDataURL(target.files[0]);
    }
  };


export const onImgView = (e,viewSelector) => {
    const target = e.currentTarget;
    const imgView = document.querySelector(viewSelector);
    if (target.files[0]) {
      const reader = new FileReader();

      reader.onload = (event) => {
        imgView.innerHTML =`<img src=${event.target.result}>`;
      };

      reader.readAsDataURL(target.files[0]);
    }
  };

  export default onImgUpload;