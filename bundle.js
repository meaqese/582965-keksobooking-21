(()=>{"use strict";window.debounce=e=>{let t=null;return(...n)=>{t&&window.clearTimeout(t),t=window.setTimeout((()=>e(...n)),500)}},(()=>{const e=(e,t)=>Math.round(e+Math.random()*(t-e));window.util={getRandRange:e,getRandElement:(t,n=!1)=>{const o=!1===n?t.length-1:t.length;return t[e(0,o)]},clearAllElements:(e,t=document)=>{const n=t.querySelectorAll(e);for(let e of n)e.remove()},clearAllChildren:e=>{e.innerHTML=""},disableAll:(e=HTMLAllCollection)=>{for(let t of e)t.disabled=!0},enableAll:(e=HTMLAllCollection)=>{for(let t of e)t.disabled=!1},clearAllPins:e=>{window.util.clearAllElements(".map__pin:not(.map__pin--main)",e)},hideCard:e=>{window.util.clearAllElements(".map__card",e)},intersection:(e,t)=>{const n=[];for(let o of e)t.includes(o)&&n.push(o);return n},createRedErrorMessage:e=>{const t=document.createElement("div");t.style.position="absolute",t.style.top="0",t.style.left="0",t.style.backgroundColor="red",t.style.textAlign="center",t.style.width="100%",t.style.height="40px",t.style.lineHeight="40px",t.style.color="white",0===e.length&&(e="Ошибка загрузки"),t.textContent=e,document.body.append(t),setTimeout((()=>{t.remove()}),1e4)}}})(),(()=>{const e=document.querySelector(".map"),t=e.querySelector(".map__filters"),n=t.querySelectorAll("select, fieldset"),o=document.querySelector(".ad-form"),r=o.querySelectorAll("fieldset");window.util.disableAll(r),window.util.disableAll(n),window.main={map:e,adForm:o,adFormFieldsets:r,mapFiltersBlocks:n,mapFilters:t}})(),(()=>{const e=(e,t)=>{const n=new XMLHttpRequest;return n.addEventListener("load",(()=>{200===n.status?e(n.response):t(n.statusText)})),n.addEventListener("error",(()=>{t(n.statusText)})),n.addEventListener("timeout",(()=>{t("Превышено время ожидания")})),n};window.backend={load:(t,n)=>{const o=e(t,n);o.responseType="json",o.open("GET","https://21.javascript.pages.academy/keksobooking/data"),o.send()},send:(t,n,o,r)=>{const i=e(n,o);i.open("POST",r),i.send(t)}}})(),window.data={TYPES:{palace:"Дворец",flat:"Квартира",house:"Дом",bungalow:"Бунгало"}},(()=>{const e=window.main.adForm,t=window.main.map.querySelector(".map__pin--main"),n=window.main.map.querySelector(".map__pins"),o=()=>{const e=getComputedStyle(t);return[Math.round(parseInt(e.left,10)+parseInt(e.width,10)/2),Math.round(t.clientHeight/2+t.offsetTop)]},r=()=>{window.main.map.classList.add("map--faded"),window.main.adForm.classList.add("ad-form--disabled"),window.util.disableAll(window.main.adFormFieldsets),window.util.disableAll(window.main.mapFiltersBlocks),t.style.top="375px",t.style.left="570px",window.util.clearAllPins(n),window.util.hideCard(window.main.map),e.reset(),window.filters.filters.reset(),i.value=o().join(", ")},i=e.querySelector("#address");i.value=o().join(", ");const a=e.querySelector("#room_number"),d=e.querySelector("#capacity"),l=e=>{const t=parseInt(a.value,10),n=parseInt(d.value,10);100===t&&n>0?e.setCustomValidity("Жилье не для гостей"):t<100&&0===n?e.setCustomValidity("Жилье только для гостей"):t<n?e.setCustomValidity("Количество комнат меньше количества гостей"):(a.setCustomValidity(""),d.setCustomValidity("")),e.reportValidity()};a.addEventListener("change",(()=>{l(a)})),d.addEventListener("change",(()=>{l(d)}));const s=e.querySelector("#type"),c=e.querySelector("#price");s.addEventListener("change",(()=>{const e=s.value,t={bungalow:0,flat:1e3,house:5e3,palace:1e4};c.setAttribute("min",t[e]),c.setAttribute("placeholder",t[e]),c.reportValidity()})),c.addEventListener("input",(()=>{c.reportValidity()}));const u=e.querySelector("#timein"),p=e.querySelector("#timeout"),m=e=>{u.value=e.target.value,p.value=e.target.value};u.addEventListener("change",m),p.addEventListener("change",m);const w=document.querySelector("#success").content.querySelector(".success"),y=document.querySelector("#error").content.querySelector(".error"),v=()=>{document.querySelector(".success").remove(),document.removeEventListener("keydown",_),document.removeEventListener("click",f)},_=e=>{"Escape"===e.key&&v()},f=()=>{v()},g=()=>{document.querySelector(".error").remove(),document.removeEventListener("keydown",h),document.removeEventListener("click",E)},h=e=>{"Escape"===e.key&&g()},E=()=>{g()},S=()=>{const e=w.cloneNode(!0);document.body.append(e),r(),document.addEventListener("click",f),document.addEventListener("keydown",_)},q=()=>{const e=y.cloneNode(!0);document.querySelector("main").append(e),document.addEventListener("click",E),document.addEventListener("keydown",h)};e.addEventListener("submit",(t=>{t.preventDefault();const n=e.getAttribute("action");window.backend.send(new FormData(e),S,q,n)})),e.querySelector(".ad-form__reset").addEventListener("click",(e=>{e.preventDefault(),r()})),window.form={mapPinMain:t,getInactivePinCoords:o}})(),(()=>{const e=["image/jpeg","image/gif","image/png"],t=(t,n,o)=>{const r=t.files[0];if(e.some((e=>r.type===e))){const e=new FileReader;e.addEventListener("load",(()=>{switch(o){case"image":n.src=e.result;break;case"background":n.style.backgroundImage=`url(${e.result})`,n.style.backgroundSize="cover";break;default:throw new Error("Выберите метод размещения изображения")}})),e.readAsDataURL(r)}else window.util.createRedErrorMessage("Файл должен иметь расширение JPEG, JPG, GIF или PNG")},n=window.main.adForm.querySelector(".ad-form-header__input"),o=window.main.adForm.querySelector(".ad-form-header__preview img");n.addEventListener("change",(()=>{t(n,o,"image")}));const r=window.main.adForm.querySelector(".ad-form__input"),i=window.main.adForm.querySelector(".ad-form__photo");r.addEventListener("change",(()=>{t(r,i,"background")}))})(),(()=>{const e=window.util.clearAllChildren,t=()=>{window.main.map.querySelector(".map__card").remove(),document.removeEventListener("keydown",o)},n=()=>{t()},o=e=>{"Escape"===e.key&&t()},r=document.querySelector("#card").content.querySelector(".map__card");window.card={createCard:t=>{const{offer:i,author:a}=t,d=r.cloneNode(!0),l=d.querySelector(".popup__close");d.querySelector(".popup__title").textContent=i.title,d.querySelector(".popup__text--address").textContent=i.address,d.querySelector(".popup__text--price").textContent=i.price+"₽/ночь",d.querySelector(".popup__type").textContent=window.data.TYPES[i.type],d.querySelector(".popup__text--capacity").textContent=`${i.rooms} комнаты для ${i.guests} гостей`,d.querySelector(".popup__text--time").textContent=`Заезд после ${i.checkin}, выезд до ${i.checkout}`;const s=d.querySelector(".popup__features");e(s);for(let e of i.features){let t=document.createElement("li");t.classList.add("popup__feature"),t.classList.add("popup__feature--"+e),s.append(t)}d.querySelector(".popup__description").textContent=i.description;const c=d.querySelector(".popup__photos"),u=c.querySelector(".popup__photo");e(c);for(let e of i.photos){let t=u.cloneNode(!0);t.src=e,c.append(t)}return d.querySelector(".popup__avatar").src=a.avatar,l.addEventListener("click",n),document.addEventListener("keydown",o),d}}})(),(()=>{const e=document.querySelector("#pin").content.querySelector(".map__pin"),t=window.main.map.querySelector(".map__pins");window.pin={renderPins:e=>{window.util.clearAllElements(".map__pin:not(.map__pin--main)",t),t.append(e)},createPins:n=>{const o=document.createDocumentFragment(),r=n.length>5?5:n.length;for(let i=0;i<r;i++){let r=e.cloneNode(!0);const a=n[i];r.style.left=a.location.x+"px",r.style.top=a.location.y+"px";let d=r.querySelector("img");d.src=a.author.avatar,d.alt=a.offer.title,r.addEventListener("click",(()=>{window.util.clearAllElements(".map__card",window.main.map),t.after(window.card.createCard(a))})),o.appendChild(r)}return o}}})(),(()=>{const e=window.main.map,t=window.form.mapPinMain,n=Math.round(t.clientWidth/2);t.addEventListener("mousedown",(o=>{o.preventDefault();let r={x:o.clientX,y:o.clientY};if(0===o.button){const o=e=>{const o=r.x-e.clientX,i=r.y-e.clientY;r={x:e.clientX,y:e.clientY};const a=t.offsetLeft-o,d=t.offsetTop-i;d+window.map.MAP_PIN_MAIN_HEIGHT<=630&&d+window.map.MAP_PIN_MAIN_HEIGHT>130&&(t.style.top=d+"px"),a+n>=0&&a+n<=1200&&(t.style.left=a+"px"),window.map.addressInput.value=window.map.getActivePinCoords().join(", ")},i=()=>{e.removeEventListener("mousemove",o),e.removeEventListener("mouseup",i),window.map.addressInput.value=window.map.getActivePinCoords().join(", ")};e.addEventListener("mousemove",o),e.addEventListener("mouseup",i)}}))})(),(()=>{const e=window.main.map,t=window.form.mapPinMain,n=window.main.adForm.querySelector("#address");window.map={};const o=()=>[Math.round(t.clientWidth/2+t.offsetLeft),parseInt(getComputedStyle(t).top,10)+84],r=e=>{window.map.pins=e,window.pin.renderPins(window.pin.createPins(e)),window.util.enableAll(window.main.mapFiltersBlocks)},i=()=>{e.classList.remove("map--faded"),window.main.adForm.classList.remove("ad-form--disabled"),window.util.enableAll(window.main.adFormFieldsets),window.backend.load(r,window.util.createRedErrorMessage),n.value=o().join(", ")};t.addEventListener("mousedown",(e=>{0===e.button&&i()})),t.addEventListener("keydown",(e=>{"Enter"===e.key&&i()})),window.map={mapPinMain:t,addressInput:n,getActivePinCoords:o,MAP_PIN_MAIN_HEIGHT:84}})(),(()=>{const e=window.main.mapFilters,t=window.debounce((e=>{window.pin.renderPins(window.pin.createPins(e)),window.util.hideCard(window.main.map)}));e.addEventListener("change",(()=>{const n=new FormData(e),o=n.get("housing-type"),r=n.get("housing-price"),i=n.get("housing-rooms"),a=n.get("housing-guests"),d=n.getAll("features"),l=window.map.pins.filter((e=>{const t=e.offer,n=t.type===o||"any"===o,l=t.rooms===window.parseInt(i)||"any"===i,s=t.guests===window.parseInt(a)||"any"===a,c=window.util.intersection(t.features,d).length===d.length||0===d.length;return n&&(()=>{switch(r){case"any":return!0;case"middle":return t.price>=1e4&&t.price<=5e4;case"low":return t.price<1e4;case"high":return t.price>5e4;default:return!1}})()&&l&&s&&c}));t(l)})),window.filters={filters:e}})()})();