if(!self.define){let e,i={};const n=(n,o)=>(n=new URL(n+".js",o).href,i[n]||new Promise((i=>{if("document"in self){const e=document.createElement("script");e.src=n,e.onload=i,document.head.appendChild(e)}else e=n,importScripts(n),i()})).then((()=>{let e=i[n];if(!e)throw new Error(`Module ${n} didn’t register its module`);return e})));self.define=(o,s)=>{const r=e||("document"in self?document.currentScript.src:"")||location.href;if(i[r])return;let c={};const d=e=>n(e,r),a={module:{uri:r},exports:c,require:d};i[r]=Promise.all(o.map((e=>a[e]||d(e)))).then((e=>(s(...e),c)))}}define(["./workbox-3e911b1d"],(function(e){"use strict";self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"assets/favicon-CgL-UA8h.ico",revision:null},{url:"assets/file-CgDU6tFJ.js",revision:null},{url:"assets/file-DxJfdbic.css",revision:null},{url:"icons/android-chrome-192x192.png",revision:"abc551da8b1dc09e4a52232669d0b497"},{url:"icons/android-chrome-512x512.png",revision:"2e7877d99e5bce81669a33bd6102e27b"},{url:"icons/apple-touch-icon.png",revision:"70e22df3180de9b2d6e69d0351279a04"},{url:"icons/favicon-16x16.png",revision:"2a459ec5bba8e3e4a2d6018324d34f59"},{url:"icons/favicon-32x32.png",revision:"897d65f3fc6a3c6daae2b7a60c3850a0"},{url:"manifest.webmanifest",revision:"76980b425ebad8693d5f65836d450728"},{url:"registerSW.js",revision:"402b66900e731ca748771b6fc5e7a068"},{url:"./icons/favicon-16x16.png",revision:"2a459ec5bba8e3e4a2d6018324d34f59"},{url:"./icons/favicon-32x32.png",revision:"897d65f3fc6a3c6daae2b7a60c3850a0"},{url:"./icons/apple-touch-icon.png",revision:"70e22df3180de9b2d6e69d0351279a04"},{url:"./icons/android-chrome-192x192.png",revision:"abc551da8b1dc09e4a52232669d0b497"},{url:"./icons/android-chrome-512x512.png",revision:"2e7877d99e5bce81669a33bd6102e27b"},{url:"manifest.webmanifest",revision:"76980b425ebad8693d5f65836d450728"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html")))}));