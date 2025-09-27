/* empty css                      */import{a as h,S as m,i as n}from"./assets/vendor-BSTwZ_tR.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))a(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const s of t.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&a(s)}).observe(document,{childList:!0,subtree:!0});function o(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function a(e){if(e.ep)return;e.ep=!0;const t=o(e);fetch(e.href,t)}})();const f="https://pixabay.com/api/",p="52318112-aedb8ccc797c66be623deef69";function y(i){const r=new URLSearchParams({key:p,q:i,image_type:"photo",orientation:"horizontal",safesearch:!0});return h.get(f,{params:r}).then(o=>o.data.hits).catch(o=>{throw o})}const l=document.querySelector(".gallery"),u=document.querySelector(".loader"),g=new m(".gallery a",{captions:!0,captionsData:"alt",captionDelay:250});function b(i){l.innerHTML=i.map(({webformatURL:r,largeImageURL:o,tags:a,likes:e,views:t,comments:s,downloads:d})=>`
          <li class="gallery-item">
            <a href="${o}">
              <img src="${r}" alt="${a}" loading="lazy" />
            </a>
            <div class="info">
              <p><b>Likes:</b> ${e}</p>
              <p><b>Views:</b> ${t}</p>
              <p><b>Comments:</b> ${s}</p>
              <p><b>Downloads:</b> ${d}</p>
            </div>
          </li>
        `).join(""),g.refresh()}function L(){l.innerHTML=""}function w(){u.classList.remove("hidden")}function S(){u.classList.add("hidden")}const c=document.querySelector(".form");c.addEventListener("submit",v);function v(i){i.preventDefault();const r=c.elements["search-text"].value.trim();if(r===""){n.show({message:"Fill in the search bar!",color:"red",position:"topRight"});return}L(),w(),y(r).then(o=>{if(o.length===0){n.show({message:"Sorry, there are no images matching your search query. Please try again!",color:"red",position:"topRight"});return}b(o)}).catch(()=>{n.show({message:"Sorry, there are no images matching your search query. Please try again!",color:"red",position:"topRight"})}).finally(()=>{S(),c.reset()})}
//# sourceMappingURL=index.js.map
