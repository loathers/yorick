(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const c of r.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&i(c)}).observe(document,{childList:!0,subtree:!0});function s(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(e){if(e.ep)return;e.ep=!0;const r=s(e);fetch(e.href,r)}})();function l(){return window.parent.parent.parent}function n(){return l().frames}function u(){const t=n().chatpane;if(t===void 0)return!1;const o=t.location.href;return["mchat.php","chat.html","chat.php"].some(s=>o.includes(s))}function a(){if(n().length===0)return-1;const t=n().rootset;return t?t.cols.split(",").length:(console.error("YORICK: Can't find rootset."),-1)}function f(){if(n().length===0)return;const t=n().rootset;if(!t){console.error("YORICK: Can't find rootset.");return}const o=t.cols.split(",");t.cols=[...o.slice(0,2),"25%",...o.slice(2)].join(",")}function p(){if(n().length===0)return;const t=n().rootset;if(!t){console.error("YORICK: Can't find rootset.");return}const o=t.cols.split(",");t.cols=[...o.slice(0,2),"25%"].join(",")}export{f as a,l as b,u as c,n as g,p as s,a as v};
