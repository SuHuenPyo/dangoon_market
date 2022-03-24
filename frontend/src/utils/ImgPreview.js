const onImgUpload = (e,viewSelector,alt) => {
    const target = e.currentTarget;
    const imgView = document.querySelector(viewSelector);
    if (target.files[0]) {
      const reader = new FileReader();

      reader.onerror = () => {
        alert('이미지 불어오기에 실패했습니다.');
        return;
      }

      reader.onload = (event) => {
        console.dir(event);
        const newImg = document.createElement('img');
        newImg.setAttribute('src',event.target.result);
        newImg.setAttribute('alt',alt);

        imgView.insertAdjacentElement("afterbegin",newImg);
      };

      reader.readAsDataURL(target.files[0]);
    }
  };


export const onImgView = (e,viewSelector,alt) => {
    const target = e.currentTarget;
    const imgView = document.querySelector(viewSelector);
    if (target.files[0]) {
      const reader = new FileReader();

      reader.onerror = () => {
        alert('이미지 불어오기에 실패했습니다.');
        return;
      }

      reader.onload = (event) => {
        console.dir(event);
        imgView.innerHTML =`<img src=${event.target.result} alt=${alt}>`;
      };

      reader.readAsDataURL(target.files[0]);
    }
  };

  export default onImgUpload;