!function(t){function e(e){for(var r,s,o=e[0],i=e[1],l=e[2],u=0,f=[];u<o.length;u++)s=o[u],Object.prototype.hasOwnProperty.call(n,s)&&n[s]&&f.push(n[s][0]),n[s]=0;for(r in i)Object.prototype.hasOwnProperty.call(i,r)&&(t[r]=i[r]);for(d&&d(e);f.length;)f.shift()();return c.push.apply(c,l||[]),a()}function a(){for(var t,e=0;e<c.length;e++){for(var a=c[e],r=!0,o=1;o<a.length;o++){var i=a[o];0!==n[i]&&(r=!1)}r&&(c.splice(e--,1),t=s(s.s=a[0]))}return t}var r={},n={0:0},c=[];function s(e){if(r[e])return r[e].exports;var a=r[e]={i:e,l:!1,exports:{}};return t[e].call(a.exports,a,a.exports,s),a.l=!0,a.exports}s.m=t,s.c=r,s.d=function(t,e,a){s.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:a})},s.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},s.t=function(t,e){if(1&e&&(t=s(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var a=Object.create(null);if(s.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)s.d(a,r,function(e){return t[e]}.bind(null,r));return a},s.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return s.d(e,"a",e),e},s.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},s.p="";var o=window.webpackJsonp=window.webpackJsonp||[],i=o.push.bind(o);o.push=e,o=o.slice();for(var l=0;l<o.length;l++)e(o[l]);var d=i;c.push([121,1]),a()}({121:function(t,e,a){a(122),t.exports=a(308)},308:function(t,e,a){"use strict";a.r(e);a(309),a(310)},309:function(t,e,a){},310:function(t,e){function a(t,e){return function(t){if(Array.isArray(t))return t}(t)||function(t,e){if("undefined"==typeof Symbol||!(Symbol.iterator in Object(t)))return;var a=[],r=!0,n=!1,c=void 0;try{for(var s,o=t[Symbol.iterator]();!(r=(s=o.next()).done)&&(a.push(s.value),!e||a.length!==e);r=!0);}catch(t){n=!0,c=t}finally{try{r||null==o.return||o.return()}finally{if(n)throw c}}return a}(t,e)||function(t,e){if(!t)return;if("string"==typeof t)return r(t,e);var a=Object.prototype.toString.call(t).slice(8,-1);"Object"===a&&t.constructor&&(a=t.constructor.name);if("Map"===a||"Set"===a)return Array.from(t);if("Arguments"===a||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(a))return r(t,e)}(t,e)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function r(t,e){(null==e||e>t.length)&&(e=t.length);for(var a=0,r=new Array(e);a<e;a++)r[a]=t[a];return r}function n(t,e){var a=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),a.push.apply(a,r)}return a}function c(t,e,a){return e in t?Object.defineProperty(t,e,{value:a,enumerable:!0,configurable:!0,writable:!0}):t[e]=a,t}var s={},o={default:{"--bg":"url('default-bg.jpg') no-repeat","--card":"#ffffff","--default":"#1e88e5","--default-hover":"#1976d2","--complete":"#76ff03","--complete-hover":"#64dd17","--danger":"#c62828","--danger-hover":"#b71c1c","--borders":"hsla(242, 1%, 35%, 0.5)","--fog":"rgba(0, 0, 0, 0.6)"},dark:{"--bg":"url('dark-bg.jpg') no-repeat","--card":"#9e9e9e","--default":"#1a237e","--default-hover":"#283593","--complete":"#00695c","--complete-hover":"#004d40","--danger":"#c62828","--danger-hover":"#b71c1c","--borders":"hsla(242, 1%, 35%, 0.5)","--fog":"rgba(0, 0, 0, 0.6)"}},i=document.querySelector(".form"),l=document.querySelector(".form__task-name"),d=document.querySelector(".form__task-desc"),u=(document.querySelector(".form__btn"),document.querySelector(".header__select")),f=document.querySelector(".tasks-section__container"),m=localStorage.getItem("theme")||"default",p=document.querySelector(".tasks-section__filter-buttons"),_=document.querySelectorAll(".tasks-section__filter-button");function b(t){var e=t.taskName,a=t.taskDesc,r=t.completed,n=t.creationDate,c=t._id,s=document.createElement("div"),o=document.createElement("div"),i=document.createElement("h3"),l=document.createElement("span"),d=document.createElement("p"),u=document.createElement("div");return s.classList.add("task-card"),o.classList.add("task-card__header-row"),i.classList.add("task-card__task-name"),l.classList.add("task-card__date"),d.classList.add("task-card__task-desc"),u.classList.add("task-card__btns"),i.textContent=e,l.textContent=n,d.textContent=a,u.innerHTML='<a class="task-card__complete" href="#">Выполнено</a>\n                                <a class="task-card__edit" href="#">Редактировать</a>\n                                <a class="task-card__remove" href="#">Удалить</a>',o.appendChild(i),o.appendChild(l),s.appendChild(o),s.appendChild(d),s.appendChild(u),s.setAttribute("data-task-id",c),v(r,s,s.querySelector(".task-card__complete")),s}function v(t,e,a){var r=e.querySelector(".task-card__task-name"),n=e.querySelector(".task-card__task-desc"),c=e.querySelector(".task-card__edit");t?(a.textContent="Не выполнено",e.classList.add("task-card_completed"),a.classList.add("task-card__complete_is-complete"),r.classList.add("task-card__task-name_is-complete"),n.classList.add("task-card__task-desc_is-complete"),c.classList.add("task-card__edit_inaccessible"),c.removeAttribute("href"),_[1].classList.contains("tasks-section__filter-button_is-active")&&(e.style="display: none;")):(a.textContent="Выполнено",e.classList.remove("task-card_completed"),a.classList.remove("task-card__complete_is-complete"),r.classList.remove("task-card__task-name_is-complete"),n.classList.remove("task-card__task-desc_is-complete"),c.classList.remove("task-card__edit_inaccessible"),c.setAttribute("href","#"),_[0].classList.contains("tasks-section__filter-button_is-active")&&(e.style="display: none;"))}function k(t,e){t.completed=e,localStorage.setItem(t._id,JSON.stringify(t))}function g(t){Object.entries(t).forEach((function(t){var e=a(t,2),r=e[0],n=e[1];document.documentElement.style.setProperty(r,n)}))}i.addEventListener("submit",(function(t){t.preventDefault();var e=l.value,a=d.value,r=Date.now(),o=function(t,e,a){var r={taskName:t,taskDesc:e,creationDate:(o=new Date,i=o.getMinutes(),l=o.getHours(),d=o.getDate(),u=o.getMonth(),f=o.getFullYear(),"".concat(1===String(d).length?"0"+d:d,".").concat(1===String(u).length?"0"+(u+1):u+1,".").concat(f," ").concat(l,":").concat(i)),timestamp:a,completed:!1,_id:"task-".concat(Math.random())};var o,i,l,d,u,f;return s[r._id]=r,function(t){for(var e=1;e<arguments.length;e++){var a=null!=arguments[e]?arguments[e]:{};e%2?n(Object(a),!0).forEach((function(e){c(t,e,a[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(a)):n(Object(a)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(a,e))}))}return t}({},r)}(e,a,r);u=o,localStorage.setItem(u._id,JSON.stringify(u));var u;var m=b(o);f.insertAdjacentElement("afterbegin",m),i.reset()})),f.addEventListener("click",(function(t){if(t.target.classList.contains("task-card__remove")){t.preventDefault();var e=t.target.closest("[data-task-id]"),a=function(t){var e=confirm('Вы действительно хотите удалить задачу "'.concat(s[t].taskName,'"?'));return e?(delete s[t],e):e}(e.getAttribute("data-task-id"));!function(t,e){if(!t)return;e.remove()}(a,e),function(t,e){if(!t)return;localStorage.removeItem(e.getAttribute("data-task-id"))}(a,e)}})),f.addEventListener("click",(function(t){if(t.target.classList.contains("task-card__complete")&&"#"===t.target.getAttribute("href")){t.preventDefault();var e=t.target.closest("[data-task-id]");v(function(t){var e=JSON.parse(localStorage.getItem("".concat(s[t]._id)));s[t].completed?(s[t].completed=!1,e&&k(e,s[t].completed)):(s[t].completed=!0,e&&k(e,s[t].completed));return s[t].completed}(e.getAttribute("data-task-id")),e,t.target)}})),f.addEventListener("click",(function(t){if(t.target.classList.contains("task-card__edit")&&"#"===t.target.getAttribute("href")){t.preventDefault();var e=t.target.closest("[data-task-id]"),a=e.querySelector(".task-card__task-name"),r=e.querySelector(".task-card__task-desc"),n=e.querySelector(".task-card__complete");!function(t,e,a,r){"Редактировать"===a.textContent?(t.setAttribute("contentEditable",""),t.setAttribute("spellcheck","false"),t.focus(),t.classList.add("task-card__task-name_box-shadow"),e.setAttribute("contentEditable",""),e.setAttribute("spellcheck","false"),e.classList.add("task-card__task-desc_box-shadow"),a.textContent="Готово",a.classList.add("task-card__edit_editable"),r.classList.add("task-card__complete_inaccessible"),r.removeAttribute("href")):""===t.textContent||""===e.textContent?alert("Название и описание задачи не могут быть пустыми!"):(t.removeAttribute("contentEditable"),t.removeAttribute("spellcheck"),t.classList.remove("task-card__task-name_box-shadow"),e.removeAttribute("contentEditable"),e.removeAttribute("spellcheck"),e.classList.remove("task-card__task-desc_box-shadow"),a.textContent="Редактировать",a.classList.remove("task-card__edit_editable"),r.classList.remove("task-card__complete_inaccessible"),r.setAttribute("href","#"),function(t,e,a){var r=a.closest(".task-card").getAttribute("data-task-id"),n=JSON.parse(localStorage.getItem(r));n.taskName=t,n.taskDesc=e,localStorage.setItem(r,JSON.stringify(n))}(t.textContent,e.textContent,a))}(a,r,t.target,n)}})),u.addEventListener("change",(function(t){var e=u.value;g(o[e]),localStorage.setItem("theme",e)})),p.addEventListener("click",(function(t){if(t.target){t.preventDefault();var e=t.target;_.forEach((function(t,a){t.classList.remove("tasks-section__filter-button_is-active"),t===e&&(!function(t){document.querySelectorAll(".task-card").forEach((function(e){e.style="display: block",e.classList.contains("task-card_completed")||0!==t?e.classList.contains("task-card_completed")&&1===t&&(e.style="display: none;"):e.style="display: none;"}))}(a),t.classList.add("tasks-section__filter-button_is-active"))}))}})),g(o[m]),function(){for(var t in localStorage)"task"===t.split("-")[0]&&(s[t]=JSON.parse(localStorage.getItem(t)))}(),function(t){t||console.error("Передайте объект с задачами!");var e=document.createDocumentFragment(),a=[];Object.values(t).forEach((function(t){a.push(t)})),a.sort((function(t,e){var a=t.timestamp;return e.timestamp-a})).forEach((function(t){var a=b(t);e.appendChild(a)})),f.appendChild(e)}(s)}});