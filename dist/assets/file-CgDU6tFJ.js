(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))u(e);new MutationObserver(e=>{for(const n of e)if(n.type==="childList")for(const s of n.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&u(s)}).observe(document,{childList:!0,subtree:!0});function a(e){const n={};return e.integrity&&(n.integrity=e.integrity),e.referrerPolicy&&(n.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?n.credentials="include":e.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function u(e){if(e.ep)return;e.ep=!0;const n=a(e);fetch(e.href,n)}})();const h=14;function w(t,r,a){return Math.sqrt(r*t*a/h)}function O(t,r,a){return h*Math.pow(a,2)/(r*t)}function I(t,r,a){return h*Math.pow(r,2)/(t*a)}const L={requiredAperature:w,requiredShutterSpeed:O,requiredISO:I},i={video:void 0,luminanceOutput:void 0},l={aperature:[],shutterSpeed:[],iso:[]},o={canvas:void 0,ctx:void 0},d={height:0,width:320,streaming:!1},b=250;document.createElement("canvas");q();async function q(){E(),await x(),M()}function E(){i.video=document.querySelector("video"),i.luminanceOutput=document.querySelector("output"),i.aperature=document.querySelector("#aperature"),i.shutterSpeed=document.querySelector("#shutter-speed"),i.iso=document.querySelector("#iso"),l.aperature=[...i.aperature.options].map(t=>Number(t.value)),l.shutterSpeed=[...i.shutterSpeed.options].map(t=>Number(t.value)),l.iso=[...i.iso.options].map(t=>Number(t.value))}async function x(){let[t,r]=[!1,!1];return new Promise(async(a,u)=>{try{let e={video:{facingMode:{ideal:"environment"}},audio:!1},n=await navigator.mediaDevices.getUserMedia(e);i.video.srcObject=n;let s=n.getVideoTracks()[0];console.log(`Chosen camera deviceId: ${s.getSettings().deviceId}`),t=!0,t&&r&&a()}catch(e){console.error(`Trouble getting user media: ${e}`),u(e)}i.video.addEventListener("canplay",()=>{d.streaming||(d.height=i.video.videoHeight/i.video.videoWidth,d.height*=d.width,i.video.setAttribute("width",d.width),i.video.setAttribute("height",d.height),d.streaming=!0,r=!0,t&&r&&a())},!1)})}function f(){var m;o.ctx.drawImage(i.video,0,0,o.canvas.width,o.canvas.height);let t=(m=o.ctx.getImageData(0,0,o.canvas.width,o.canvas.height))==null?void 0:m.data,r=0;for(let c=0;c<t.length;c+=4){let v=t[c]/255,g=t[c+1]/255,S=t[c+2]/255,y=.299*v+.587*g+.114*S;r+=y}let a=r/(o.canvas.width*o.canvas.height);i.luminanceOutput.textContent=a.toFixed(10);let u=a*100,e=i.aperature.value;i.shutterSpeed.value;let n=i.iso.value,s=L.requiredShutterSpeed(n,u,e),p=N(l.shutterSpeed,s);i.shutterSpeed.selectedIndex=p}function M(){o.canvas=document.createElement("canvas"),o.ctx=o.canvas.getContext("2d",{willReadFrequently:!0}),o.canvas.width=i.video.width,o.canvas.height=i.video.height,f(),setInterval(f,b)}function N(t,r){let a=t.reduce((u,e)=>Math.abs(e-r)<Math.abs(u-r)?e:u);return t.indexOf(a)}