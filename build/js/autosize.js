const e="function"==typeof Map?new Map:function(){const e=[],t=[];return{has:t=>e.indexOf(t)>-1,get:o=>t[e.indexOf(o)],set(o,n){-1===e.indexOf(o)&&(e.push(o),t.push(n))},delete(o){const n=e.indexOf(o);n>-1&&(e.splice(n,1),t.splice(n,1))}}}();let t=e=>new Event(e,{bubbles:!0});try{new Event("test")}catch(e){t=e=>{const t=document.createEvent("Event");return t.initEvent(e,!0,!1),t}}function o(o){if(!o||!o.nodeName||"TEXTAREA"!==o.nodeName||e.has(o))return;let n=null,r=null,i=null;function l(e){{const e=o.style.width;o.style.width="0px",o.offsetWidth,o.style.width=e}o.style.overflowY=e}function s(){if(0===o.scrollHeight)return;const e=function(e){const t=[];for(;e&&e.parentNode&&e.parentNode instanceof Element;)e.parentNode.scrollTop&&t.push([e.parentNode,e.parentNode.scrollTop]),e=e.parentNode;return()=>t.forEach((([e,t])=>{e.style.scrollBehavior="auto",e.scrollTop=t,e.style.scrollBehavior=null}))}(o);o.style.height="",o.style.height=o.scrollHeight+n+"px",r=o.clientWidth,e()}function d(){s();const e=Math.round(parseFloat(o.style.height)),n=window.getComputedStyle(o,null);var r="content-box"===n.boxSizing?Math.round(parseFloat(n.height)):o.offsetHeight;if(r<e?"hidden"===n.overflowY&&(l("scroll"),s(),r="content-box"===n.boxSizing?Math.round(parseFloat(window.getComputedStyle(o,null).height)):o.offsetHeight):"hidden"!==n.overflowY&&(l("hidden"),s(),r="content-box"===n.boxSizing?Math.round(parseFloat(window.getComputedStyle(o,null).height)):o.offsetHeight),i!==r){i=r;const e=t("autosize:resized");try{o.dispatchEvent(e)}catch(e){}}}const a=()=>{o.clientWidth!==r&&d()},p=(t=>{window.removeEventListener("resize",a,!1),o.removeEventListener("input",d,!1),o.removeEventListener("keyup",d,!1),o.removeEventListener("autosize:destroy",p,!1),o.removeEventListener("autosize:update",d,!1),Object.keys(t).forEach((e=>{o.style[e]=t[e]})),e.delete(o)}).bind(o,{height:o.style.height,resize:o.style.resize,overflowY:o.style.overflowY,overflowX:o.style.overflowX,wordWrap:o.style.wordWrap});o.addEventListener("autosize:destroy",p,!1),"onpropertychange"in o&&"oninput"in o&&o.addEventListener("keyup",d,!1),window.addEventListener("resize",a,!1),o.addEventListener("input",d,!1),o.addEventListener("autosize:update",d,!1),o.style.overflowX="hidden",o.style.wordWrap="break-word",e.set(o,{destroy:p,update:d}),function(){const e=window.getComputedStyle(o,null);"vertical"===e.resize?o.style.resize="none":"both"===e.resize&&(o.style.resize="horizontal"),n="content-box"===e.boxSizing?-(parseFloat(e.paddingTop)+parseFloat(e.paddingBottom)):parseFloat(e.borderTopWidth)+parseFloat(e.borderBottomWidth),isNaN(n)&&(n=0),d()}()}function n(t){const o=e.get(t);o&&o.destroy()}function r(t){const o=e.get(t);o&&o.update()}let i=null;"undefined"==typeof window||"function"!=typeof window.getComputedStyle?(i=e=>e,i.destroy=e=>e,i.update=e=>e):(i=(e,t)=>(e&&Array.prototype.forEach.call(e.length?e:[e],(e=>o(e))),e),i.destroy=e=>(e&&Array.prototype.forEach.call(e.length?e:[e],n),e),i.update=e=>(e&&Array.prototype.forEach.call(e.length?e:[e],r),e));export default i;