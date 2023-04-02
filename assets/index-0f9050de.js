import{r as Ot,j as v,R as De}from"./index-71444cec.js";function xn({props:t,onToggle:e}){return v.jsxs("div",{className:"flex mb-4",children:[v.jsx("div",{className:`w-2 ${t.color}`}),v.jsxs("div",{className:`flex flex-col w-full ${t.color2}`,children:[v.jsxs("button",{className:"flex",onClick:n=>e(),children:[v.jsx("div",{className:"flex-grow text-start pl-2 my-3",children:t.title}),v.jsx("div",{className:"w-12 self-center transition-transform "+(t.toggle?"rotate-45":""),children:"+"})]}),v.jsx("div",{className:"pl-2 pr-12 transition-all overflow-hidden "+(t.toggle?"p-2 max-h-screen":"max-h-0"),children:t.content})]})]})}function wn(){const[t,e]=Ot.useState([{title:"What is React and why should I learn it?",content:"React is a popular JavaScript library used for building user interfaces. It allows you to create reusable UI components that can be combined to create complex interfaces. Learning React can help you build modern, scalable web applications and improve your job prospects as a developer.",toggle:!1,color:"bg-orange-500",color2:"bg-orange-200"},{title:"Do I need to know JavaScript before learning React?",content:"Yes, you should have a good understanding of JavaScript before learning React. React is a JavaScript library, so you need to know the basics of JavaScript such as variables, functions, arrays, and objects. You should also be familiar with concepts like scope, closures, and callbacks.",toggle:!1,color:"bg-blue-500",color2:"bg-blue-200"},{title:"What tools do I need to learn React?",content:"To get started with React, you need a code editor such as Visual Studio Code or Atom, and a web browser like Chrome or Firefox. You can also use Node.js and npm to set up a development environment and install packages.",toggle:!1,color:"bg-violet-500",color2:"bg-violet-200"},{title:"How do I create a React component?",content:"To create a React component, you can use the `React.createClass` method or create a class that extends the `React.Component` class. You can define the component's `render` method to return the HTML markup, and use props to pass data to the component.",toggle:!1,color:"bg-purple-500",color2:"bg-purple-200"},{title:"What is JSX and how does it work with React?",content:"JSX is a syntax extension for JavaScript that allows you to write HTML-like code in your JavaScript files. It's used to create React elements and components, and makes it easier to work with the virtual DOM. JSX is not required to use React, but it's a helpful tool that can make your code more readable and maintainable.",toggle:!1,color:"bg-green-500",color2:"bg-green-200"}]),n=a=>{e(r=>{const i=[...r];return i[a]={...i[a],toggle:!i[a].toggle},i})};return v.jsx("div",{className:"flex",children:v.jsxs("div",{className:"mx-auto w-3/4",children:[v.jsxs("div",{className:"my-4 text-center",children:[v.jsx("h3",{className:"my-1 font-bold text-3xl",children:"Frequently Asked Questions"}),v.jsx("p",{className:"text-sm mx-auto max-w-xs",children:"Answers to common questions about our frontend challenge website."})]}),v.jsx("div",{children:t.map((a,r)=>v.jsx(xn,{props:a,onToggle:()=>n(r)},r))})]})})}function me(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(t);e&&(a=a.filter(function(r){return Object.getOwnPropertyDescriptor(t,r).enumerable})),n.push.apply(n,a)}return n}function u(t){for(var e=1;e<arguments.length;e++){var n=arguments[e]!=null?arguments[e]:{};e%2?me(Object(n),!0).forEach(function(a){S(t,a,n[a])}):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):me(Object(n)).forEach(function(a){Object.defineProperty(t,a,Object.getOwnPropertyDescriptor(n,a))})}return t}function St(t){return St=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(e){return typeof e}:function(e){return e&&typeof Symbol=="function"&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},St(t)}function kn(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function de(t,e){for(var n=0;n<e.length;n++){var a=e[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(t,a.key,a)}}function An(t,e,n){return e&&de(t.prototype,e),n&&de(t,n),Object.defineProperty(t,"prototype",{writable:!1}),t}function S(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function Zt(t,e){return Sn(t)||Pn(t,e)||Ye(t,e)||In()}function ft(t){return On(t)||Nn(t)||Ye(t)||Cn()}function On(t){if(Array.isArray(t))return Dt(t)}function Sn(t){if(Array.isArray(t))return t}function Nn(t){if(typeof Symbol<"u"&&t[Symbol.iterator]!=null||t["@@iterator"]!=null)return Array.from(t)}function Pn(t,e){var n=t==null?null:typeof Symbol<"u"&&t[Symbol.iterator]||t["@@iterator"];if(n!=null){var a=[],r=!0,i=!1,o,s;try{for(n=n.call(t);!(r=(o=n.next()).done)&&(a.push(o.value),!(e&&a.length===e));r=!0);}catch(l){i=!0,s=l}finally{try{!r&&n.return!=null&&n.return()}finally{if(i)throw s}}return a}}function Ye(t,e){if(t){if(typeof t=="string")return Dt(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);if(n==="Object"&&t.constructor&&(n=t.constructor.name),n==="Map"||n==="Set")return Array.from(t);if(n==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return Dt(t,e)}}function Dt(t,e){(e==null||e>t.length)&&(e=t.length);for(var n=0,a=new Array(e);n<e;n++)a[n]=t[n];return a}function Cn(){throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function In(){throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}var ve=function(){},te={},$e={},We=null,Ue={mark:ve,measure:ve};try{typeof window<"u"&&(te=window),typeof document<"u"&&($e=document),typeof MutationObserver<"u"&&(We=MutationObserver),typeof performance<"u"&&(Ue=performance)}catch{}var En=te.navigator||{},pe=En.userAgent,be=pe===void 0?"":pe,Y=te,y=$e,ge=We,dt=Ue;Y.document;var L=!!y.documentElement&&!!y.head&&typeof y.addEventListener=="function"&&typeof y.createElement=="function",He=~be.indexOf("MSIE")||~be.indexOf("Trident/"),vt,pt,bt,gt,ht,j="___FONT_AWESOME___",Yt=16,Ve="fa",Xe="svg-inline--fa",G="data-fa-i2svg",$t="data-fa-pseudo-element",Tn="data-fa-pseudo-element-pending",ee="data-prefix",ne="data-icon",he="fontawesome-i2svg",_n="async",jn=["HTML","HEAD","STYLE","SCRIPT"],Ge=function(){try{return!0}catch{return!1}}(),h="classic",x="sharp",ae=[h,x];function ct(t){return new Proxy(t,{get:function(n,a){return a in n?n[a]:n[h]}})}var rt=ct((vt={},S(vt,h,{fa:"solid",fas:"solid","fa-solid":"solid",far:"regular","fa-regular":"regular",fal:"light","fa-light":"light",fat:"thin","fa-thin":"thin",fad:"duotone","fa-duotone":"duotone",fab:"brands","fa-brands":"brands",fak:"kit","fa-kit":"kit"}),S(vt,x,{fa:"solid",fass:"solid","fa-solid":"solid",fasr:"regular","fa-regular":"regular",fasl:"light","fa-light":"light"}),vt)),it=ct((pt={},S(pt,h,{solid:"fas",regular:"far",light:"fal",thin:"fat",duotone:"fad",brands:"fab",kit:"fak"}),S(pt,x,{solid:"fass",regular:"fasr",light:"fasl"}),pt)),ot=ct((bt={},S(bt,h,{fab:"fa-brands",fad:"fa-duotone",fak:"fa-kit",fal:"fa-light",far:"fa-regular",fas:"fa-solid",fat:"fa-thin"}),S(bt,x,{fass:"fa-solid",fasr:"fa-regular",fasl:"fa-light"}),bt)),Rn=ct((gt={},S(gt,h,{"fa-brands":"fab","fa-duotone":"fad","fa-kit":"fak","fa-light":"fal","fa-regular":"far","fa-solid":"fas","fa-thin":"fat"}),S(gt,x,{"fa-solid":"fass","fa-regular":"fasr","fa-light":"fasl"}),gt)),Mn=/fa(s|r|l|t|d|b|k|ss|sr|sl)?[\-\ ]/,Be="fa-layers-text",Ln=/Font ?Awesome ?([56 ]*)(Solid|Regular|Light|Thin|Duotone|Brands|Free|Pro|Sharp|Kit)?.*/i,Fn=ct((ht={},S(ht,h,{900:"fas",400:"far",normal:"far",300:"fal",100:"fat"}),S(ht,x,{900:"fass",400:"fasr",300:"fasl"}),ht)),qe=[1,2,3,4,5,6,7,8,9,10],zn=qe.concat([11,12,13,14,15,16,17,18,19,20]),Dn=["class","data-prefix","data-icon","data-fa-transform","data-fa-mask"],V={GROUP:"duotone-group",SWAP_OPACITY:"swap-opacity",PRIMARY:"primary",SECONDARY:"secondary"},st=new Set;Object.keys(it[h]).map(st.add.bind(st));Object.keys(it[x]).map(st.add.bind(st));var Yn=[].concat(ae,ft(st),["2xs","xs","sm","lg","xl","2xl","beat","border","fade","beat-fade","bounce","flip-both","flip-horizontal","flip-vertical","flip","fw","inverse","layers-counter","layers-text","layers","li","pull-left","pull-right","pulse","rotate-180","rotate-270","rotate-90","rotate-by","shake","spin-pulse","spin-reverse","spin","stack-1x","stack-2x","stack","ul",V.GROUP,V.SWAP_OPACITY,V.PRIMARY,V.SECONDARY]).concat(qe.map(function(t){return"".concat(t,"x")})).concat(zn.map(function(t){return"w-".concat(t)})),nt=Y.FontAwesomeConfig||{};function $n(t){var e=y.querySelector("script["+t+"]");if(e)return e.getAttribute(t)}function Wn(t){return t===""?!0:t==="false"?!1:t==="true"?!0:t}if(y&&typeof y.querySelector=="function"){var Un=[["data-family-prefix","familyPrefix"],["data-css-prefix","cssPrefix"],["data-family-default","familyDefault"],["data-style-default","styleDefault"],["data-replacement-class","replacementClass"],["data-auto-replace-svg","autoReplaceSvg"],["data-auto-add-css","autoAddCss"],["data-auto-a11y","autoA11y"],["data-search-pseudo-elements","searchPseudoElements"],["data-observe-mutations","observeMutations"],["data-mutate-approach","mutateApproach"],["data-keep-original-source","keepOriginalSource"],["data-measure-performance","measurePerformance"],["data-show-missing-icons","showMissingIcons"]];Un.forEach(function(t){var e=Zt(t,2),n=e[0],a=e[1],r=Wn($n(n));r!=null&&(nt[a]=r)})}var Ke={styleDefault:"solid",familyDefault:"classic",cssPrefix:Ve,replacementClass:Xe,autoReplaceSvg:!0,autoAddCss:!0,autoA11y:!0,searchPseudoElements:!1,observeMutations:!0,mutateApproach:"async",keepOriginalSource:!0,measurePerformance:!1,showMissingIcons:!0};nt.familyPrefix&&(nt.cssPrefix=nt.familyPrefix);var Z=u(u({},Ke),nt);Z.autoReplaceSvg||(Z.observeMutations=!1);var d={};Object.keys(Ke).forEach(function(t){Object.defineProperty(d,t,{enumerable:!0,set:function(n){Z[t]=n,at.forEach(function(a){return a(d)})},get:function(){return Z[t]}})});Object.defineProperty(d,"familyPrefix",{enumerable:!0,set:function(e){Z.cssPrefix=e,at.forEach(function(n){return n(d)})},get:function(){return Z.cssPrefix}});Y.FontAwesomeConfig=d;var at=[];function Hn(t){return at.push(t),function(){at.splice(at.indexOf(t),1)}}var z=Yt,_={size:16,x:0,y:0,rotate:0,flipX:!1,flipY:!1};function Vn(t){if(!(!t||!L)){var e=y.createElement("style");e.setAttribute("type","text/css"),e.innerHTML=t;for(var n=y.head.childNodes,a=null,r=n.length-1;r>-1;r--){var i=n[r],o=(i.tagName||"").toUpperCase();["STYLE","LINK"].indexOf(o)>-1&&(a=i)}return y.head.insertBefore(e,a),t}}var Xn="0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";function lt(){for(var t=12,e="";t-- >0;)e+=Xn[Math.random()*62|0];return e}function tt(t){for(var e=[],n=(t||[]).length>>>0;n--;)e[n]=t[n];return e}function re(t){return t.classList?tt(t.classList):(t.getAttribute("class")||"").split(" ").filter(function(e){return e})}function Je(t){return"".concat(t).replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/'/g,"&#39;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}function Gn(t){return Object.keys(t||{}).reduce(function(e,n){return e+"".concat(n,'="').concat(Je(t[n]),'" ')},"").trim()}function It(t){return Object.keys(t||{}).reduce(function(e,n){return e+"".concat(n,": ").concat(t[n].trim(),";")},"")}function ie(t){return t.size!==_.size||t.x!==_.x||t.y!==_.y||t.rotate!==_.rotate||t.flipX||t.flipY}function Bn(t){var e=t.transform,n=t.containerWidth,a=t.iconWidth,r={transform:"translate(".concat(n/2," 256)")},i="translate(".concat(e.x*32,", ").concat(e.y*32,") "),o="scale(".concat(e.size/16*(e.flipX?-1:1),", ").concat(e.size/16*(e.flipY?-1:1),") "),s="rotate(".concat(e.rotate," 0 0)"),l={transform:"".concat(i," ").concat(o," ").concat(s)},f={transform:"translate(".concat(a/2*-1," -256)")};return{outer:r,inner:l,path:f}}function qn(t){var e=t.transform,n=t.width,a=n===void 0?Yt:n,r=t.height,i=r===void 0?Yt:r,o=t.startCentered,s=o===void 0?!1:o,l="";return s&&He?l+="translate(".concat(e.x/z-a/2,"em, ").concat(e.y/z-i/2,"em) "):s?l+="translate(calc(-50% + ".concat(e.x/z,"em), calc(-50% + ").concat(e.y/z,"em)) "):l+="translate(".concat(e.x/z,"em, ").concat(e.y/z,"em) "),l+="scale(".concat(e.size/z*(e.flipX?-1:1),", ").concat(e.size/z*(e.flipY?-1:1),") "),l+="rotate(".concat(e.rotate,"deg) "),l}var Kn=`:root, :host {
  --fa-font-solid: normal 900 1em/1 "Font Awesome 6 Solid";
  --fa-font-regular: normal 400 1em/1 "Font Awesome 6 Regular";
  --fa-font-light: normal 300 1em/1 "Font Awesome 6 Light";
  --fa-font-thin: normal 100 1em/1 "Font Awesome 6 Thin";
  --fa-font-duotone: normal 900 1em/1 "Font Awesome 6 Duotone";
  --fa-font-sharp-solid: normal 900 1em/1 "Font Awesome 6 Sharp";
  --fa-font-sharp-regular: normal 400 1em/1 "Font Awesome 6 Sharp";
  --fa-font-sharp-light: normal 300 1em/1 "Font Awesome 6 Sharp";
  --fa-font-brands: normal 400 1em/1 "Font Awesome 6 Brands";
}

svg:not(:root).svg-inline--fa, svg:not(:host).svg-inline--fa {
  overflow: visible;
  box-sizing: content-box;
}

.svg-inline--fa {
  display: var(--fa-display, inline-block);
  height: 1em;
  overflow: visible;
  vertical-align: -0.125em;
}
.svg-inline--fa.fa-2xs {
  vertical-align: 0.1em;
}
.svg-inline--fa.fa-xs {
  vertical-align: 0em;
}
.svg-inline--fa.fa-sm {
  vertical-align: -0.0714285705em;
}
.svg-inline--fa.fa-lg {
  vertical-align: -0.2em;
}
.svg-inline--fa.fa-xl {
  vertical-align: -0.25em;
}
.svg-inline--fa.fa-2xl {
  vertical-align: -0.3125em;
}
.svg-inline--fa.fa-pull-left {
  margin-right: var(--fa-pull-margin, 0.3em);
  width: auto;
}
.svg-inline--fa.fa-pull-right {
  margin-left: var(--fa-pull-margin, 0.3em);
  width: auto;
}
.svg-inline--fa.fa-li {
  width: var(--fa-li-width, 2em);
  top: 0.25em;
}
.svg-inline--fa.fa-fw {
  width: var(--fa-fw-width, 1.25em);
}

.fa-layers svg.svg-inline--fa {
  bottom: 0;
  left: 0;
  margin: auto;
  position: absolute;
  right: 0;
  top: 0;
}

.fa-layers-counter, .fa-layers-text {
  display: inline-block;
  position: absolute;
  text-align: center;
}

.fa-layers {
  display: inline-block;
  height: 1em;
  position: relative;
  text-align: center;
  vertical-align: -0.125em;
  width: 1em;
}
.fa-layers svg.svg-inline--fa {
  -webkit-transform-origin: center center;
          transform-origin: center center;
}

.fa-layers-text {
  left: 50%;
  top: 50%;
  -webkit-transform: translate(-50%, -50%);
          transform: translate(-50%, -50%);
  -webkit-transform-origin: center center;
          transform-origin: center center;
}

.fa-layers-counter {
  background-color: var(--fa-counter-background-color, #ff253a);
  border-radius: var(--fa-counter-border-radius, 1em);
  box-sizing: border-box;
  color: var(--fa-inverse, #fff);
  line-height: var(--fa-counter-line-height, 1);
  max-width: var(--fa-counter-max-width, 5em);
  min-width: var(--fa-counter-min-width, 1.5em);
  overflow: hidden;
  padding: var(--fa-counter-padding, 0.25em 0.5em);
  right: var(--fa-right, 0);
  text-overflow: ellipsis;
  top: var(--fa-top, 0);
  -webkit-transform: scale(var(--fa-counter-scale, 0.25));
          transform: scale(var(--fa-counter-scale, 0.25));
  -webkit-transform-origin: top right;
          transform-origin: top right;
}

.fa-layers-bottom-right {
  bottom: var(--fa-bottom, 0);
  right: var(--fa-right, 0);
  top: auto;
  -webkit-transform: scale(var(--fa-layers-scale, 0.25));
          transform: scale(var(--fa-layers-scale, 0.25));
  -webkit-transform-origin: bottom right;
          transform-origin: bottom right;
}

.fa-layers-bottom-left {
  bottom: var(--fa-bottom, 0);
  left: var(--fa-left, 0);
  right: auto;
  top: auto;
  -webkit-transform: scale(var(--fa-layers-scale, 0.25));
          transform: scale(var(--fa-layers-scale, 0.25));
  -webkit-transform-origin: bottom left;
          transform-origin: bottom left;
}

.fa-layers-top-right {
  top: var(--fa-top, 0);
  right: var(--fa-right, 0);
  -webkit-transform: scale(var(--fa-layers-scale, 0.25));
          transform: scale(var(--fa-layers-scale, 0.25));
  -webkit-transform-origin: top right;
          transform-origin: top right;
}

.fa-layers-top-left {
  left: var(--fa-left, 0);
  right: auto;
  top: var(--fa-top, 0);
  -webkit-transform: scale(var(--fa-layers-scale, 0.25));
          transform: scale(var(--fa-layers-scale, 0.25));
  -webkit-transform-origin: top left;
          transform-origin: top left;
}

.fa-1x {
  font-size: 1em;
}

.fa-2x {
  font-size: 2em;
}

.fa-3x {
  font-size: 3em;
}

.fa-4x {
  font-size: 4em;
}

.fa-5x {
  font-size: 5em;
}

.fa-6x {
  font-size: 6em;
}

.fa-7x {
  font-size: 7em;
}

.fa-8x {
  font-size: 8em;
}

.fa-9x {
  font-size: 9em;
}

.fa-10x {
  font-size: 10em;
}

.fa-2xs {
  font-size: 0.625em;
  line-height: 0.1em;
  vertical-align: 0.225em;
}

.fa-xs {
  font-size: 0.75em;
  line-height: 0.0833333337em;
  vertical-align: 0.125em;
}

.fa-sm {
  font-size: 0.875em;
  line-height: 0.0714285718em;
  vertical-align: 0.0535714295em;
}

.fa-lg {
  font-size: 1.25em;
  line-height: 0.05em;
  vertical-align: -0.075em;
}

.fa-xl {
  font-size: 1.5em;
  line-height: 0.0416666682em;
  vertical-align: -0.125em;
}

.fa-2xl {
  font-size: 2em;
  line-height: 0.03125em;
  vertical-align: -0.1875em;
}

.fa-fw {
  text-align: center;
  width: 1.25em;
}

.fa-ul {
  list-style-type: none;
  margin-left: var(--fa-li-margin, 2.5em);
  padding-left: 0;
}
.fa-ul > li {
  position: relative;
}

.fa-li {
  left: calc(var(--fa-li-width, 2em) * -1);
  position: absolute;
  text-align: center;
  width: var(--fa-li-width, 2em);
  line-height: inherit;
}

.fa-border {
  border-color: var(--fa-border-color, #eee);
  border-radius: var(--fa-border-radius, 0.1em);
  border-style: var(--fa-border-style, solid);
  border-width: var(--fa-border-width, 0.08em);
  padding: var(--fa-border-padding, 0.2em 0.25em 0.15em);
}

.fa-pull-left {
  float: left;
  margin-right: var(--fa-pull-margin, 0.3em);
}

.fa-pull-right {
  float: right;
  margin-left: var(--fa-pull-margin, 0.3em);
}

.fa-beat {
  -webkit-animation-name: fa-beat;
          animation-name: fa-beat;
  -webkit-animation-delay: var(--fa-animation-delay, 0s);
          animation-delay: var(--fa-animation-delay, 0s);
  -webkit-animation-direction: var(--fa-animation-direction, normal);
          animation-direction: var(--fa-animation-direction, normal);
  -webkit-animation-duration: var(--fa-animation-duration, 1s);
          animation-duration: var(--fa-animation-duration, 1s);
  -webkit-animation-iteration-count: var(--fa-animation-iteration-count, infinite);
          animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  -webkit-animation-timing-function: var(--fa-animation-timing, ease-in-out);
          animation-timing-function: var(--fa-animation-timing, ease-in-out);
}

.fa-bounce {
  -webkit-animation-name: fa-bounce;
          animation-name: fa-bounce;
  -webkit-animation-delay: var(--fa-animation-delay, 0s);
          animation-delay: var(--fa-animation-delay, 0s);
  -webkit-animation-direction: var(--fa-animation-direction, normal);
          animation-direction: var(--fa-animation-direction, normal);
  -webkit-animation-duration: var(--fa-animation-duration, 1s);
          animation-duration: var(--fa-animation-duration, 1s);
  -webkit-animation-iteration-count: var(--fa-animation-iteration-count, infinite);
          animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  -webkit-animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.28, 0.84, 0.42, 1));
          animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.28, 0.84, 0.42, 1));
}

.fa-fade {
  -webkit-animation-name: fa-fade;
          animation-name: fa-fade;
  -webkit-animation-delay: var(--fa-animation-delay, 0s);
          animation-delay: var(--fa-animation-delay, 0s);
  -webkit-animation-direction: var(--fa-animation-direction, normal);
          animation-direction: var(--fa-animation-direction, normal);
  -webkit-animation-duration: var(--fa-animation-duration, 1s);
          animation-duration: var(--fa-animation-duration, 1s);
  -webkit-animation-iteration-count: var(--fa-animation-iteration-count, infinite);
          animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  -webkit-animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.4, 0, 0.6, 1));
          animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.4, 0, 0.6, 1));
}

.fa-beat-fade {
  -webkit-animation-name: fa-beat-fade;
          animation-name: fa-beat-fade;
  -webkit-animation-delay: var(--fa-animation-delay, 0s);
          animation-delay: var(--fa-animation-delay, 0s);
  -webkit-animation-direction: var(--fa-animation-direction, normal);
          animation-direction: var(--fa-animation-direction, normal);
  -webkit-animation-duration: var(--fa-animation-duration, 1s);
          animation-duration: var(--fa-animation-duration, 1s);
  -webkit-animation-iteration-count: var(--fa-animation-iteration-count, infinite);
          animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  -webkit-animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.4, 0, 0.6, 1));
          animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.4, 0, 0.6, 1));
}

.fa-flip {
  -webkit-animation-name: fa-flip;
          animation-name: fa-flip;
  -webkit-animation-delay: var(--fa-animation-delay, 0s);
          animation-delay: var(--fa-animation-delay, 0s);
  -webkit-animation-direction: var(--fa-animation-direction, normal);
          animation-direction: var(--fa-animation-direction, normal);
  -webkit-animation-duration: var(--fa-animation-duration, 1s);
          animation-duration: var(--fa-animation-duration, 1s);
  -webkit-animation-iteration-count: var(--fa-animation-iteration-count, infinite);
          animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  -webkit-animation-timing-function: var(--fa-animation-timing, ease-in-out);
          animation-timing-function: var(--fa-animation-timing, ease-in-out);
}

.fa-shake {
  -webkit-animation-name: fa-shake;
          animation-name: fa-shake;
  -webkit-animation-delay: var(--fa-animation-delay, 0s);
          animation-delay: var(--fa-animation-delay, 0s);
  -webkit-animation-direction: var(--fa-animation-direction, normal);
          animation-direction: var(--fa-animation-direction, normal);
  -webkit-animation-duration: var(--fa-animation-duration, 1s);
          animation-duration: var(--fa-animation-duration, 1s);
  -webkit-animation-iteration-count: var(--fa-animation-iteration-count, infinite);
          animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  -webkit-animation-timing-function: var(--fa-animation-timing, linear);
          animation-timing-function: var(--fa-animation-timing, linear);
}

.fa-spin {
  -webkit-animation-name: fa-spin;
          animation-name: fa-spin;
  -webkit-animation-delay: var(--fa-animation-delay, 0s);
          animation-delay: var(--fa-animation-delay, 0s);
  -webkit-animation-direction: var(--fa-animation-direction, normal);
          animation-direction: var(--fa-animation-direction, normal);
  -webkit-animation-duration: var(--fa-animation-duration, 2s);
          animation-duration: var(--fa-animation-duration, 2s);
  -webkit-animation-iteration-count: var(--fa-animation-iteration-count, infinite);
          animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  -webkit-animation-timing-function: var(--fa-animation-timing, linear);
          animation-timing-function: var(--fa-animation-timing, linear);
}

.fa-spin-reverse {
  --fa-animation-direction: reverse;
}

.fa-pulse,
.fa-spin-pulse {
  -webkit-animation-name: fa-spin;
          animation-name: fa-spin;
  -webkit-animation-direction: var(--fa-animation-direction, normal);
          animation-direction: var(--fa-animation-direction, normal);
  -webkit-animation-duration: var(--fa-animation-duration, 1s);
          animation-duration: var(--fa-animation-duration, 1s);
  -webkit-animation-iteration-count: var(--fa-animation-iteration-count, infinite);
          animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  -webkit-animation-timing-function: var(--fa-animation-timing, steps(8));
          animation-timing-function: var(--fa-animation-timing, steps(8));
}

@media (prefers-reduced-motion: reduce) {
  .fa-beat,
.fa-bounce,
.fa-fade,
.fa-beat-fade,
.fa-flip,
.fa-pulse,
.fa-shake,
.fa-spin,
.fa-spin-pulse {
    -webkit-animation-delay: -1ms;
            animation-delay: -1ms;
    -webkit-animation-duration: 1ms;
            animation-duration: 1ms;
    -webkit-animation-iteration-count: 1;
            animation-iteration-count: 1;
    -webkit-transition-delay: 0s;
            transition-delay: 0s;
    -webkit-transition-duration: 0s;
            transition-duration: 0s;
  }
}
@-webkit-keyframes fa-beat {
  0%, 90% {
    -webkit-transform: scale(1);
            transform: scale(1);
  }
  45% {
    -webkit-transform: scale(var(--fa-beat-scale, 1.25));
            transform: scale(var(--fa-beat-scale, 1.25));
  }
}
@keyframes fa-beat {
  0%, 90% {
    -webkit-transform: scale(1);
            transform: scale(1);
  }
  45% {
    -webkit-transform: scale(var(--fa-beat-scale, 1.25));
            transform: scale(var(--fa-beat-scale, 1.25));
  }
}
@-webkit-keyframes fa-bounce {
  0% {
    -webkit-transform: scale(1, 1) translateY(0);
            transform: scale(1, 1) translateY(0);
  }
  10% {
    -webkit-transform: scale(var(--fa-bounce-start-scale-x, 1.1), var(--fa-bounce-start-scale-y, 0.9)) translateY(0);
            transform: scale(var(--fa-bounce-start-scale-x, 1.1), var(--fa-bounce-start-scale-y, 0.9)) translateY(0);
  }
  30% {
    -webkit-transform: scale(var(--fa-bounce-jump-scale-x, 0.9), var(--fa-bounce-jump-scale-y, 1.1)) translateY(var(--fa-bounce-height, -0.5em));
            transform: scale(var(--fa-bounce-jump-scale-x, 0.9), var(--fa-bounce-jump-scale-y, 1.1)) translateY(var(--fa-bounce-height, -0.5em));
  }
  50% {
    -webkit-transform: scale(var(--fa-bounce-land-scale-x, 1.05), var(--fa-bounce-land-scale-y, 0.95)) translateY(0);
            transform: scale(var(--fa-bounce-land-scale-x, 1.05), var(--fa-bounce-land-scale-y, 0.95)) translateY(0);
  }
  57% {
    -webkit-transform: scale(1, 1) translateY(var(--fa-bounce-rebound, -0.125em));
            transform: scale(1, 1) translateY(var(--fa-bounce-rebound, -0.125em));
  }
  64% {
    -webkit-transform: scale(1, 1) translateY(0);
            transform: scale(1, 1) translateY(0);
  }
  100% {
    -webkit-transform: scale(1, 1) translateY(0);
            transform: scale(1, 1) translateY(0);
  }
}
@keyframes fa-bounce {
  0% {
    -webkit-transform: scale(1, 1) translateY(0);
            transform: scale(1, 1) translateY(0);
  }
  10% {
    -webkit-transform: scale(var(--fa-bounce-start-scale-x, 1.1), var(--fa-bounce-start-scale-y, 0.9)) translateY(0);
            transform: scale(var(--fa-bounce-start-scale-x, 1.1), var(--fa-bounce-start-scale-y, 0.9)) translateY(0);
  }
  30% {
    -webkit-transform: scale(var(--fa-bounce-jump-scale-x, 0.9), var(--fa-bounce-jump-scale-y, 1.1)) translateY(var(--fa-bounce-height, -0.5em));
            transform: scale(var(--fa-bounce-jump-scale-x, 0.9), var(--fa-bounce-jump-scale-y, 1.1)) translateY(var(--fa-bounce-height, -0.5em));
  }
  50% {
    -webkit-transform: scale(var(--fa-bounce-land-scale-x, 1.05), var(--fa-bounce-land-scale-y, 0.95)) translateY(0);
            transform: scale(var(--fa-bounce-land-scale-x, 1.05), var(--fa-bounce-land-scale-y, 0.95)) translateY(0);
  }
  57% {
    -webkit-transform: scale(1, 1) translateY(var(--fa-bounce-rebound, -0.125em));
            transform: scale(1, 1) translateY(var(--fa-bounce-rebound, -0.125em));
  }
  64% {
    -webkit-transform: scale(1, 1) translateY(0);
            transform: scale(1, 1) translateY(0);
  }
  100% {
    -webkit-transform: scale(1, 1) translateY(0);
            transform: scale(1, 1) translateY(0);
  }
}
@-webkit-keyframes fa-fade {
  50% {
    opacity: var(--fa-fade-opacity, 0.4);
  }
}
@keyframes fa-fade {
  50% {
    opacity: var(--fa-fade-opacity, 0.4);
  }
}
@-webkit-keyframes fa-beat-fade {
  0%, 100% {
    opacity: var(--fa-beat-fade-opacity, 0.4);
    -webkit-transform: scale(1);
            transform: scale(1);
  }
  50% {
    opacity: 1;
    -webkit-transform: scale(var(--fa-beat-fade-scale, 1.125));
            transform: scale(var(--fa-beat-fade-scale, 1.125));
  }
}
@keyframes fa-beat-fade {
  0%, 100% {
    opacity: var(--fa-beat-fade-opacity, 0.4);
    -webkit-transform: scale(1);
            transform: scale(1);
  }
  50% {
    opacity: 1;
    -webkit-transform: scale(var(--fa-beat-fade-scale, 1.125));
            transform: scale(var(--fa-beat-fade-scale, 1.125));
  }
}
@-webkit-keyframes fa-flip {
  50% {
    -webkit-transform: rotate3d(var(--fa-flip-x, 0), var(--fa-flip-y, 1), var(--fa-flip-z, 0), var(--fa-flip-angle, -180deg));
            transform: rotate3d(var(--fa-flip-x, 0), var(--fa-flip-y, 1), var(--fa-flip-z, 0), var(--fa-flip-angle, -180deg));
  }
}
@keyframes fa-flip {
  50% {
    -webkit-transform: rotate3d(var(--fa-flip-x, 0), var(--fa-flip-y, 1), var(--fa-flip-z, 0), var(--fa-flip-angle, -180deg));
            transform: rotate3d(var(--fa-flip-x, 0), var(--fa-flip-y, 1), var(--fa-flip-z, 0), var(--fa-flip-angle, -180deg));
  }
}
@-webkit-keyframes fa-shake {
  0% {
    -webkit-transform: rotate(-15deg);
            transform: rotate(-15deg);
  }
  4% {
    -webkit-transform: rotate(15deg);
            transform: rotate(15deg);
  }
  8%, 24% {
    -webkit-transform: rotate(-18deg);
            transform: rotate(-18deg);
  }
  12%, 28% {
    -webkit-transform: rotate(18deg);
            transform: rotate(18deg);
  }
  16% {
    -webkit-transform: rotate(-22deg);
            transform: rotate(-22deg);
  }
  20% {
    -webkit-transform: rotate(22deg);
            transform: rotate(22deg);
  }
  32% {
    -webkit-transform: rotate(-12deg);
            transform: rotate(-12deg);
  }
  36% {
    -webkit-transform: rotate(12deg);
            transform: rotate(12deg);
  }
  40%, 100% {
    -webkit-transform: rotate(0deg);
            transform: rotate(0deg);
  }
}
@keyframes fa-shake {
  0% {
    -webkit-transform: rotate(-15deg);
            transform: rotate(-15deg);
  }
  4% {
    -webkit-transform: rotate(15deg);
            transform: rotate(15deg);
  }
  8%, 24% {
    -webkit-transform: rotate(-18deg);
            transform: rotate(-18deg);
  }
  12%, 28% {
    -webkit-transform: rotate(18deg);
            transform: rotate(18deg);
  }
  16% {
    -webkit-transform: rotate(-22deg);
            transform: rotate(-22deg);
  }
  20% {
    -webkit-transform: rotate(22deg);
            transform: rotate(22deg);
  }
  32% {
    -webkit-transform: rotate(-12deg);
            transform: rotate(-12deg);
  }
  36% {
    -webkit-transform: rotate(12deg);
            transform: rotate(12deg);
  }
  40%, 100% {
    -webkit-transform: rotate(0deg);
            transform: rotate(0deg);
  }
}
@-webkit-keyframes fa-spin {
  0% {
    -webkit-transform: rotate(0deg);
            transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
            transform: rotate(360deg);
  }
}
@keyframes fa-spin {
  0% {
    -webkit-transform: rotate(0deg);
            transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
            transform: rotate(360deg);
  }
}
.fa-rotate-90 {
  -webkit-transform: rotate(90deg);
          transform: rotate(90deg);
}

.fa-rotate-180 {
  -webkit-transform: rotate(180deg);
          transform: rotate(180deg);
}

.fa-rotate-270 {
  -webkit-transform: rotate(270deg);
          transform: rotate(270deg);
}

.fa-flip-horizontal {
  -webkit-transform: scale(-1, 1);
          transform: scale(-1, 1);
}

.fa-flip-vertical {
  -webkit-transform: scale(1, -1);
          transform: scale(1, -1);
}

.fa-flip-both,
.fa-flip-horizontal.fa-flip-vertical {
  -webkit-transform: scale(-1, -1);
          transform: scale(-1, -1);
}

.fa-rotate-by {
  -webkit-transform: rotate(var(--fa-rotate-angle, none));
          transform: rotate(var(--fa-rotate-angle, none));
}

.fa-stack {
  display: inline-block;
  vertical-align: middle;
  height: 2em;
  position: relative;
  width: 2.5em;
}

.fa-stack-1x,
.fa-stack-2x {
  bottom: 0;
  left: 0;
  margin: auto;
  position: absolute;
  right: 0;
  top: 0;
  z-index: var(--fa-stack-z-index, auto);
}

.svg-inline--fa.fa-stack-1x {
  height: 1em;
  width: 1.25em;
}
.svg-inline--fa.fa-stack-2x {
  height: 2em;
  width: 2.5em;
}

.fa-inverse {
  color: var(--fa-inverse, #fff);
}

.sr-only,
.fa-sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

.sr-only-focusable:not(:focus),
.fa-sr-only-focusable:not(:focus) {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

.svg-inline--fa .fa-primary {
  fill: var(--fa-primary-color, currentColor);
  opacity: var(--fa-primary-opacity, 1);
}

.svg-inline--fa .fa-secondary {
  fill: var(--fa-secondary-color, currentColor);
  opacity: var(--fa-secondary-opacity, 0.4);
}

.svg-inline--fa.fa-swap-opacity .fa-primary {
  opacity: var(--fa-secondary-opacity, 0.4);
}

.svg-inline--fa.fa-swap-opacity .fa-secondary {
  opacity: var(--fa-primary-opacity, 1);
}

.svg-inline--fa mask .fa-primary,
.svg-inline--fa mask .fa-secondary {
  fill: black;
}

.fad.fa-inverse,
.fa-duotone.fa-inverse {
  color: var(--fa-inverse, #fff);
}`;function Qe(){var t=Ve,e=Xe,n=d.cssPrefix,a=d.replacementClass,r=Kn;if(n!==t||a!==e){var i=new RegExp("\\.".concat(t,"\\-"),"g"),o=new RegExp("\\--".concat(t,"\\-"),"g"),s=new RegExp("\\.".concat(e),"g");r=r.replace(i,".".concat(n,"-")).replace(o,"--".concat(n,"-")).replace(s,".".concat(a))}return r}var ye=!1;function Rt(){d.autoAddCss&&!ye&&(Vn(Qe()),ye=!0)}var Jn={mixout:function(){return{dom:{css:Qe,insertCss:Rt}}},hooks:function(){return{beforeDOMElementCreation:function(){Rt()},beforeI2svg:function(){Rt()}}}},R=Y||{};R[j]||(R[j]={});R[j].styles||(R[j].styles={});R[j].hooks||(R[j].hooks={});R[j].shims||(R[j].shims=[]);var T=R[j],Ze=[],Qn=function t(){y.removeEventListener("DOMContentLoaded",t),Nt=1,Ze.map(function(e){return e()})},Nt=!1;L&&(Nt=(y.documentElement.doScroll?/^loaded|^c/:/^loaded|^i|^c/).test(y.readyState),Nt||y.addEventListener("DOMContentLoaded",Qn));function Zn(t){L&&(Nt?setTimeout(t,0):Ze.push(t))}function ut(t){var e=t.tag,n=t.attributes,a=n===void 0?{}:n,r=t.children,i=r===void 0?[]:r;return typeof t=="string"?Je(t):"<".concat(e," ").concat(Gn(a),">").concat(i.map(ut).join(""),"</").concat(e,">")}function xe(t,e,n){if(t&&t[e]&&t[e][n])return{prefix:e,iconName:n,icon:t[e][n]}}var ta=function(e,n){return function(a,r,i,o){return e.call(n,a,r,i,o)}},Mt=function(e,n,a,r){var i=Object.keys(e),o=i.length,s=r!==void 0?ta(n,r):n,l,f,c;for(a===void 0?(l=1,c=e[i[0]]):(l=0,c=a);l<o;l++)f=i[l],c=s(c,e[f],f,e);return c};function ea(t){for(var e=[],n=0,a=t.length;n<a;){var r=t.charCodeAt(n++);if(r>=55296&&r<=56319&&n<a){var i=t.charCodeAt(n++);(i&64512)==56320?e.push(((r&1023)<<10)+(i&1023)+65536):(e.push(r),n--)}else e.push(r)}return e}function Wt(t){var e=ea(t);return e.length===1?e[0].toString(16):null}function na(t,e){var n=t.length,a=t.charCodeAt(e),r;return a>=55296&&a<=56319&&n>e+1&&(r=t.charCodeAt(e+1),r>=56320&&r<=57343)?(a-55296)*1024+r-56320+65536:a}function we(t){return Object.keys(t).reduce(function(e,n){var a=t[n],r=!!a.icon;return r?e[a.iconName]=a.icon:e[n]=a,e},{})}function Ut(t,e){var n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:{},a=n.skipHooks,r=a===void 0?!1:a,i=we(e);typeof T.hooks.addPack=="function"&&!r?T.hooks.addPack(t,we(e)):T.styles[t]=u(u({},T.styles[t]||{}),i),t==="fas"&&Ut("fa",e)}var yt,xt,wt,q=T.styles,aa=T.shims,ra=(yt={},S(yt,h,Object.values(ot[h])),S(yt,x,Object.values(ot[x])),yt),oe=null,tn={},en={},nn={},an={},rn={},ia=(xt={},S(xt,h,Object.keys(rt[h])),S(xt,x,Object.keys(rt[x])),xt);function oa(t){return~Yn.indexOf(t)}function sa(t,e){var n=e.split("-"),a=n[0],r=n.slice(1).join("-");return a===t&&r!==""&&!oa(r)?r:null}var on=function(){var e=function(i){return Mt(q,function(o,s,l){return o[l]=Mt(s,i,{}),o},{})};tn=e(function(r,i,o){if(i[3]&&(r[i[3]]=o),i[2]){var s=i[2].filter(function(l){return typeof l=="number"});s.forEach(function(l){r[l.toString(16)]=o})}return r}),en=e(function(r,i,o){if(r[o]=o,i[2]){var s=i[2].filter(function(l){return typeof l=="string"});s.forEach(function(l){r[l]=o})}return r}),rn=e(function(r,i,o){var s=i[2];return r[o]=o,s.forEach(function(l){r[l]=o}),r});var n="far"in q||d.autoFetchSvg,a=Mt(aa,function(r,i){var o=i[0],s=i[1],l=i[2];return s==="far"&&!n&&(s="fas"),typeof o=="string"&&(r.names[o]={prefix:s,iconName:l}),typeof o=="number"&&(r.unicodes[o.toString(16)]={prefix:s,iconName:l}),r},{names:{},unicodes:{}});nn=a.names,an=a.unicodes,oe=Et(d.styleDefault,{family:d.familyDefault})};Hn(function(t){oe=Et(t.styleDefault,{family:d.familyDefault})});on();function se(t,e){return(tn[t]||{})[e]}function la(t,e){return(en[t]||{})[e]}function X(t,e){return(rn[t]||{})[e]}function sn(t){return nn[t]||{prefix:null,iconName:null}}function fa(t){var e=an[t],n=se("fas",t);return e||(n?{prefix:"fas",iconName:n}:null)||{prefix:null,iconName:null}}function $(){return oe}var le=function(){return{prefix:null,iconName:null,rest:[]}};function Et(t){var e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},n=e.family,a=n===void 0?h:n,r=rt[a][t],i=it[a][t]||it[a][r],o=t in T.styles?t:null;return i||o||null}var ke=(wt={},S(wt,h,Object.keys(ot[h])),S(wt,x,Object.keys(ot[x])),wt);function Tt(t){var e,n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},a=n.skipLookups,r=a===void 0?!1:a,i=(e={},S(e,h,"".concat(d.cssPrefix,"-").concat(h)),S(e,x,"".concat(d.cssPrefix,"-").concat(x)),e),o=null,s=h;(t.includes(i[h])||t.some(function(f){return ke[h].includes(f)}))&&(s=h),(t.includes(i[x])||t.some(function(f){return ke[x].includes(f)}))&&(s=x);var l=t.reduce(function(f,c){var m=sa(d.cssPrefix,c);if(q[c]?(c=ra[s].includes(c)?Rn[s][c]:c,o=c,f.prefix=c):ia[s].indexOf(c)>-1?(o=c,f.prefix=Et(c,{family:s})):m?f.iconName=m:c!==d.replacementClass&&c!==i[h]&&c!==i[x]&&f.rest.push(c),!r&&f.prefix&&f.iconName){var p=o==="fa"?sn(f.iconName):{},g=X(f.prefix,f.iconName);p.prefix&&(o=null),f.iconName=p.iconName||g||f.iconName,f.prefix=p.prefix||f.prefix,f.prefix==="far"&&!q.far&&q.fas&&!d.autoFetchSvg&&(f.prefix="fas")}return f},le());return(t.includes("fa-brands")||t.includes("fab"))&&(l.prefix="fab"),(t.includes("fa-duotone")||t.includes("fad"))&&(l.prefix="fad"),!l.prefix&&s===x&&(q.fass||d.autoFetchSvg)&&(l.prefix="fass",l.iconName=X(l.prefix,l.iconName)||l.iconName),(l.prefix==="fa"||o==="fa")&&(l.prefix=$()||"fas"),l}var ca=function(){function t(){kn(this,t),this.definitions={}}return An(t,[{key:"add",value:function(){for(var n=this,a=arguments.length,r=new Array(a),i=0;i<a;i++)r[i]=arguments[i];var o=r.reduce(this._pullDefinitions,{});Object.keys(o).forEach(function(s){n.definitions[s]=u(u({},n.definitions[s]||{}),o[s]),Ut(s,o[s]);var l=ot[h][s];l&&Ut(l,o[s]),on()})}},{key:"reset",value:function(){this.definitions={}}},{key:"_pullDefinitions",value:function(n,a){var r=a.prefix&&a.iconName&&a.icon?{0:a}:a;return Object.keys(r).map(function(i){var o=r[i],s=o.prefix,l=o.iconName,f=o.icon,c=f[2];n[s]||(n[s]={}),c.length>0&&c.forEach(function(m){typeof m=="string"&&(n[s][m]=f)}),n[s][l]=f}),n}}]),t}(),Ae=[],K={},Q={},ua=Object.keys(Q);function ma(t,e){var n=e.mixoutsTo;return Ae=t,K={},Object.keys(Q).forEach(function(a){ua.indexOf(a)===-1&&delete Q[a]}),Ae.forEach(function(a){var r=a.mixout?a.mixout():{};if(Object.keys(r).forEach(function(o){typeof r[o]=="function"&&(n[o]=r[o]),St(r[o])==="object"&&Object.keys(r[o]).forEach(function(s){n[o]||(n[o]={}),n[o][s]=r[o][s]})}),a.hooks){var i=a.hooks();Object.keys(i).forEach(function(o){K[o]||(K[o]=[]),K[o].push(i[o])})}a.provides&&a.provides(Q)}),n}function Ht(t,e){for(var n=arguments.length,a=new Array(n>2?n-2:0),r=2;r<n;r++)a[r-2]=arguments[r];var i=K[t]||[];return i.forEach(function(o){e=o.apply(null,[e].concat(a))}),e}function B(t){for(var e=arguments.length,n=new Array(e>1?e-1:0),a=1;a<e;a++)n[a-1]=arguments[a];var r=K[t]||[];r.forEach(function(i){i.apply(null,n)})}function M(){var t=arguments[0],e=Array.prototype.slice.call(arguments,1);return Q[t]?Q[t].apply(null,e):void 0}function Vt(t){t.prefix==="fa"&&(t.prefix="fas");var e=t.iconName,n=t.prefix||$();if(e)return e=X(n,e)||e,xe(ln.definitions,n,e)||xe(T.styles,n,e)}var ln=new ca,da=function(){d.autoReplaceSvg=!1,d.observeMutations=!1,B("noAuto")},va={i2svg:function(){var e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};return L?(B("beforeI2svg",e),M("pseudoElements2svg",e),M("i2svg",e)):Promise.reject("Operation requires a DOM of some kind.")},watch:function(){var e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{},n=e.autoReplaceSvgRoot;d.autoReplaceSvg===!1&&(d.autoReplaceSvg=!0),d.observeMutations=!0,Zn(function(){ba({autoReplaceSvgRoot:n}),B("watch",e)})}},pa={icon:function(e){if(e===null)return null;if(St(e)==="object"&&e.prefix&&e.iconName)return{prefix:e.prefix,iconName:X(e.prefix,e.iconName)||e.iconName};if(Array.isArray(e)&&e.length===2){var n=e[1].indexOf("fa-")===0?e[1].slice(3):e[1],a=Et(e[0]);return{prefix:a,iconName:X(a,n)||n}}if(typeof e=="string"&&(e.indexOf("".concat(d.cssPrefix,"-"))>-1||e.match(Mn))){var r=Tt(e.split(" "),{skipLookups:!0});return{prefix:r.prefix||$(),iconName:X(r.prefix,r.iconName)||r.iconName}}if(typeof e=="string"){var i=$();return{prefix:i,iconName:X(i,e)||e}}}},E={noAuto:da,config:d,dom:va,parse:pa,library:ln,findIconDefinition:Vt,toHtml:ut},ba=function(){var e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{},n=e.autoReplaceSvgRoot,a=n===void 0?y:n;(Object.keys(T.styles).length>0||d.autoFetchSvg)&&L&&d.autoReplaceSvg&&E.dom.i2svg({node:a})};function _t(t,e){return Object.defineProperty(t,"abstract",{get:e}),Object.defineProperty(t,"html",{get:function(){return t.abstract.map(function(a){return ut(a)})}}),Object.defineProperty(t,"node",{get:function(){if(L){var a=y.createElement("div");return a.innerHTML=t.html,a.children}}}),t}function ga(t){var e=t.children,n=t.main,a=t.mask,r=t.attributes,i=t.styles,o=t.transform;if(ie(o)&&n.found&&!a.found){var s=n.width,l=n.height,f={x:s/l/2,y:.5};r.style=It(u(u({},i),{},{"transform-origin":"".concat(f.x+o.x/16,"em ").concat(f.y+o.y/16,"em")}))}return[{tag:"svg",attributes:r,children:e}]}function ha(t){var e=t.prefix,n=t.iconName,a=t.children,r=t.attributes,i=t.symbol,o=i===!0?"".concat(e,"-").concat(d.cssPrefix,"-").concat(n):i;return[{tag:"svg",attributes:{style:"display: none;"},children:[{tag:"symbol",attributes:u(u({},r),{},{id:o}),children:a}]}]}function fe(t){var e=t.icons,n=e.main,a=e.mask,r=t.prefix,i=t.iconName,o=t.transform,s=t.symbol,l=t.title,f=t.maskId,c=t.titleId,m=t.extra,p=t.watchable,g=p===void 0?!1:p,A=a.found?a:n,P=A.width,w=A.height,C=r==="fak",k=[d.replacementClass,i?"".concat(d.cssPrefix,"-").concat(i):""].filter(function(F){return m.classes.indexOf(F)===-1}).filter(function(F){return F!==""||!!F}).concat(m.classes).join(" "),O={children:[],attributes:u(u({},m.attributes),{},{"data-prefix":r,"data-icon":i,class:k,role:m.attributes.role||"img",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 ".concat(P," ").concat(w)})},I=C&&!~m.classes.indexOf("fa-fw")?{width:"".concat(P/w*16*.0625,"em")}:{};g&&(O.attributes[G]=""),l&&(O.children.push({tag:"title",attributes:{id:O.attributes["aria-labelledby"]||"title-".concat(c||lt())},children:[l]}),delete O.attributes.title);var N=u(u({},O),{},{prefix:r,iconName:i,main:n,mask:a,maskId:f,transform:o,symbol:s,styles:u(u({},I),m.styles)}),U=a.found&&n.found?M("generateAbstractMask",N)||{children:[],attributes:{}}:M("generateAbstractIcon",N)||{children:[],attributes:{}},H=U.children,jt=U.attributes;return N.children=H,N.attributes=jt,s?ha(N):ga(N)}function Oe(t){var e=t.content,n=t.width,a=t.height,r=t.transform,i=t.title,o=t.extra,s=t.watchable,l=s===void 0?!1:s,f=u(u(u({},o.attributes),i?{title:i}:{}),{},{class:o.classes.join(" ")});l&&(f[G]="");var c=u({},o.styles);ie(r)&&(c.transform=qn({transform:r,startCentered:!0,width:n,height:a}),c["-webkit-transform"]=c.transform);var m=It(c);m.length>0&&(f.style=m);var p=[];return p.push({tag:"span",attributes:f,children:[e]}),i&&p.push({tag:"span",attributes:{class:"sr-only"},children:[i]}),p}function ya(t){var e=t.content,n=t.title,a=t.extra,r=u(u(u({},a.attributes),n?{title:n}:{}),{},{class:a.classes.join(" ")}),i=It(a.styles);i.length>0&&(r.style=i);var o=[];return o.push({tag:"span",attributes:r,children:[e]}),n&&o.push({tag:"span",attributes:{class:"sr-only"},children:[n]}),o}var Lt=T.styles;function Xt(t){var e=t[0],n=t[1],a=t.slice(4),r=Zt(a,1),i=r[0],o=null;return Array.isArray(i)?o={tag:"g",attributes:{class:"".concat(d.cssPrefix,"-").concat(V.GROUP)},children:[{tag:"path",attributes:{class:"".concat(d.cssPrefix,"-").concat(V.SECONDARY),fill:"currentColor",d:i[0]}},{tag:"path",attributes:{class:"".concat(d.cssPrefix,"-").concat(V.PRIMARY),fill:"currentColor",d:i[1]}}]}:o={tag:"path",attributes:{fill:"currentColor",d:i}},{found:!0,width:e,height:n,icon:o}}var xa={found:!1,width:512,height:512};function wa(t,e){!Ge&&!d.showMissingIcons&&t&&console.error('Icon with name "'.concat(t,'" and prefix "').concat(e,'" is missing.'))}function Gt(t,e){var n=e;return e==="fa"&&d.styleDefault!==null&&(e=$()),new Promise(function(a,r){if(M("missingIconAbstract"),n==="fa"){var i=sn(t)||{};t=i.iconName||t,e=i.prefix||e}if(t&&e&&Lt[e]&&Lt[e][t]){var o=Lt[e][t];return a(Xt(o))}wa(t,e),a(u(u({},xa),{},{icon:d.showMissingIcons&&t?M("missingIconAbstract")||{}:{}}))})}var Se=function(){},Bt=d.measurePerformance&&dt&&dt.mark&&dt.measure?dt:{mark:Se,measure:Se},et='FA "6.4.0"',ka=function(e){return Bt.mark("".concat(et," ").concat(e," begins")),function(){return fn(e)}},fn=function(e){Bt.mark("".concat(et," ").concat(e," ends")),Bt.measure("".concat(et," ").concat(e),"".concat(et," ").concat(e," begins"),"".concat(et," ").concat(e," ends"))},ce={begin:ka,end:fn},kt=function(){};function Ne(t){var e=t.getAttribute?t.getAttribute(G):null;return typeof e=="string"}function Aa(t){var e=t.getAttribute?t.getAttribute(ee):null,n=t.getAttribute?t.getAttribute(ne):null;return e&&n}function Oa(t){return t&&t.classList&&t.classList.contains&&t.classList.contains(d.replacementClass)}function Sa(){if(d.autoReplaceSvg===!0)return At.replace;var t=At[d.autoReplaceSvg];return t||At.replace}function Na(t){return y.createElementNS("http://www.w3.org/2000/svg",t)}function Pa(t){return y.createElement(t)}function cn(t){var e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},n=e.ceFn,a=n===void 0?t.tag==="svg"?Na:Pa:n;if(typeof t=="string")return y.createTextNode(t);var r=a(t.tag);Object.keys(t.attributes||[]).forEach(function(o){r.setAttribute(o,t.attributes[o])});var i=t.children||[];return i.forEach(function(o){r.appendChild(cn(o,{ceFn:a}))}),r}function Ca(t){var e=" ".concat(t.outerHTML," ");return e="".concat(e,"Font Awesome fontawesome.com "),e}var At={replace:function(e){var n=e[0];if(n.parentNode)if(e[1].forEach(function(r){n.parentNode.insertBefore(cn(r),n)}),n.getAttribute(G)===null&&d.keepOriginalSource){var a=y.createComment(Ca(n));n.parentNode.replaceChild(a,n)}else n.remove()},nest:function(e){var n=e[0],a=e[1];if(~re(n).indexOf(d.replacementClass))return At.replace(e);var r=new RegExp("".concat(d.cssPrefix,"-.*"));if(delete a[0].attributes.id,a[0].attributes.class){var i=a[0].attributes.class.split(" ").reduce(function(s,l){return l===d.replacementClass||l.match(r)?s.toSvg.push(l):s.toNode.push(l),s},{toNode:[],toSvg:[]});a[0].attributes.class=i.toSvg.join(" "),i.toNode.length===0?n.removeAttribute("class"):n.setAttribute("class",i.toNode.join(" "))}var o=a.map(function(s){return ut(s)}).join(`
`);n.setAttribute(G,""),n.innerHTML=o}};function Pe(t){t()}function un(t,e){var n=typeof e=="function"?e:kt;if(t.length===0)n();else{var a=Pe;d.mutateApproach===_n&&(a=Y.requestAnimationFrame||Pe),a(function(){var r=Sa(),i=ce.begin("mutate");t.map(r),i(),n()})}}var ue=!1;function mn(){ue=!0}function qt(){ue=!1}var Pt=null;function Ce(t){if(ge&&d.observeMutations){var e=t.treeCallback,n=e===void 0?kt:e,a=t.nodeCallback,r=a===void 0?kt:a,i=t.pseudoElementsCallback,o=i===void 0?kt:i,s=t.observeMutationsRoot,l=s===void 0?y:s;Pt=new ge(function(f){if(!ue){var c=$();tt(f).forEach(function(m){if(m.type==="childList"&&m.addedNodes.length>0&&!Ne(m.addedNodes[0])&&(d.searchPseudoElements&&o(m.target),n(m.target)),m.type==="attributes"&&m.target.parentNode&&d.searchPseudoElements&&o(m.target.parentNode),m.type==="attributes"&&Ne(m.target)&&~Dn.indexOf(m.attributeName))if(m.attributeName==="class"&&Aa(m.target)){var p=Tt(re(m.target)),g=p.prefix,A=p.iconName;m.target.setAttribute(ee,g||c),A&&m.target.setAttribute(ne,A)}else Oa(m.target)&&r(m.target)})}}),L&&Pt.observe(l,{childList:!0,attributes:!0,characterData:!0,subtree:!0})}}function Ia(){Pt&&Pt.disconnect()}function Ea(t){var e=t.getAttribute("style"),n=[];return e&&(n=e.split(";").reduce(function(a,r){var i=r.split(":"),o=i[0],s=i.slice(1);return o&&s.length>0&&(a[o]=s.join(":").trim()),a},{})),n}function Ta(t){var e=t.getAttribute("data-prefix"),n=t.getAttribute("data-icon"),a=t.innerText!==void 0?t.innerText.trim():"",r=Tt(re(t));return r.prefix||(r.prefix=$()),e&&n&&(r.prefix=e,r.iconName=n),r.iconName&&r.prefix||(r.prefix&&a.length>0&&(r.iconName=la(r.prefix,t.innerText)||se(r.prefix,Wt(t.innerText))),!r.iconName&&d.autoFetchSvg&&t.firstChild&&t.firstChild.nodeType===Node.TEXT_NODE&&(r.iconName=t.firstChild.data)),r}function _a(t){var e=tt(t.attributes).reduce(function(r,i){return r.name!=="class"&&r.name!=="style"&&(r[i.name]=i.value),r},{}),n=t.getAttribute("title"),a=t.getAttribute("data-fa-title-id");return d.autoA11y&&(n?e["aria-labelledby"]="".concat(d.replacementClass,"-title-").concat(a||lt()):(e["aria-hidden"]="true",e.focusable="false")),e}function ja(){return{iconName:null,title:null,titleId:null,prefix:null,transform:_,symbol:!1,mask:{iconName:null,prefix:null,rest:[]},maskId:null,extra:{classes:[],styles:{},attributes:{}}}}function Ie(t){var e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{styleParser:!0},n=Ta(t),a=n.iconName,r=n.prefix,i=n.rest,o=_a(t),s=Ht("parseNodeAttributes",{},t),l=e.styleParser?Ea(t):[];return u({iconName:a,title:t.getAttribute("title"),titleId:t.getAttribute("data-fa-title-id"),prefix:r,transform:_,mask:{iconName:null,prefix:null,rest:[]},maskId:null,symbol:!1,extra:{classes:i,styles:l,attributes:o}},s)}var Ra=T.styles;function dn(t){var e=d.autoReplaceSvg==="nest"?Ie(t,{styleParser:!1}):Ie(t);return~e.extra.classes.indexOf(Be)?M("generateLayersText",t,e):M("generateSvgReplacementMutation",t,e)}var W=new Set;ae.map(function(t){W.add("fa-".concat(t))});Object.keys(rt[h]).map(W.add.bind(W));Object.keys(rt[x]).map(W.add.bind(W));W=ft(W);function Ee(t){var e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:null;if(!L)return Promise.resolve();var n=y.documentElement.classList,a=function(m){return n.add("".concat(he,"-").concat(m))},r=function(m){return n.remove("".concat(he,"-").concat(m))},i=d.autoFetchSvg?W:ae.map(function(c){return"fa-".concat(c)}).concat(Object.keys(Ra));i.includes("fa")||i.push("fa");var o=[".".concat(Be,":not([").concat(G,"])")].concat(i.map(function(c){return".".concat(c,":not([").concat(G,"])")})).join(", ");if(o.length===0)return Promise.resolve();var s=[];try{s=tt(t.querySelectorAll(o))}catch{}if(s.length>0)a("pending"),r("complete");else return Promise.resolve();var l=ce.begin("onTree"),f=s.reduce(function(c,m){try{var p=dn(m);p&&c.push(p)}catch(g){Ge||g.name==="MissingIcon"&&console.error(g)}return c},[]);return new Promise(function(c,m){Promise.all(f).then(function(p){un(p,function(){a("active"),a("complete"),r("pending"),typeof e=="function"&&e(),l(),c()})}).catch(function(p){l(),m(p)})})}function Ma(t){var e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:null;dn(t).then(function(n){n&&un([n],e)})}function La(t){return function(e){var n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},a=(e||{}).icon?e:Vt(e||{}),r=n.mask;return r&&(r=(r||{}).icon?r:Vt(r||{})),t(a,u(u({},n),{},{mask:r}))}}var Fa=function(e){var n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},a=n.transform,r=a===void 0?_:a,i=n.symbol,o=i===void 0?!1:i,s=n.mask,l=s===void 0?null:s,f=n.maskId,c=f===void 0?null:f,m=n.title,p=m===void 0?null:m,g=n.titleId,A=g===void 0?null:g,P=n.classes,w=P===void 0?[]:P,C=n.attributes,k=C===void 0?{}:C,O=n.styles,I=O===void 0?{}:O;if(e){var N=e.prefix,U=e.iconName,H=e.icon;return _t(u({type:"icon"},e),function(){return B("beforeDOMElementCreation",{iconDefinition:e,params:n}),d.autoA11y&&(p?k["aria-labelledby"]="".concat(d.replacementClass,"-title-").concat(A||lt()):(k["aria-hidden"]="true",k.focusable="false")),fe({icons:{main:Xt(H),mask:l?Xt(l.icon):{found:!1,width:null,height:null,icon:{}}},prefix:N,iconName:U,transform:u(u({},_),r),symbol:o,title:p,maskId:c,titleId:A,extra:{attributes:k,styles:I,classes:w}})})}},za={mixout:function(){return{icon:La(Fa)}},hooks:function(){return{mutationObserverCallbacks:function(n){return n.treeCallback=Ee,n.nodeCallback=Ma,n}}},provides:function(e){e.i2svg=function(n){var a=n.node,r=a===void 0?y:a,i=n.callback,o=i===void 0?function(){}:i;return Ee(r,o)},e.generateSvgReplacementMutation=function(n,a){var r=a.iconName,i=a.title,o=a.titleId,s=a.prefix,l=a.transform,f=a.symbol,c=a.mask,m=a.maskId,p=a.extra;return new Promise(function(g,A){Promise.all([Gt(r,s),c.iconName?Gt(c.iconName,c.prefix):Promise.resolve({found:!1,width:512,height:512,icon:{}})]).then(function(P){var w=Zt(P,2),C=w[0],k=w[1];g([n,fe({icons:{main:C,mask:k},prefix:s,iconName:r,transform:l,symbol:f,maskId:m,title:i,titleId:o,extra:p,watchable:!0})])}).catch(A)})},e.generateAbstractIcon=function(n){var a=n.children,r=n.attributes,i=n.main,o=n.transform,s=n.styles,l=It(s);l.length>0&&(r.style=l);var f;return ie(o)&&(f=M("generateAbstractTransformGrouping",{main:i,transform:o,containerWidth:i.width,iconWidth:i.width})),a.push(f||i.icon),{children:a,attributes:r}}}},Da={mixout:function(){return{layer:function(n){var a=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},r=a.classes,i=r===void 0?[]:r;return _t({type:"layer"},function(){B("beforeDOMElementCreation",{assembler:n,params:a});var o=[];return n(function(s){Array.isArray(s)?s.map(function(l){o=o.concat(l.abstract)}):o=o.concat(s.abstract)}),[{tag:"span",attributes:{class:["".concat(d.cssPrefix,"-layers")].concat(ft(i)).join(" ")},children:o}]})}}}},Ya={mixout:function(){return{counter:function(n){var a=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},r=a.title,i=r===void 0?null:r,o=a.classes,s=o===void 0?[]:o,l=a.attributes,f=l===void 0?{}:l,c=a.styles,m=c===void 0?{}:c;return _t({type:"counter",content:n},function(){return B("beforeDOMElementCreation",{content:n,params:a}),ya({content:n.toString(),title:i,extra:{attributes:f,styles:m,classes:["".concat(d.cssPrefix,"-layers-counter")].concat(ft(s))}})})}}}},$a={mixout:function(){return{text:function(n){var a=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},r=a.transform,i=r===void 0?_:r,o=a.title,s=o===void 0?null:o,l=a.classes,f=l===void 0?[]:l,c=a.attributes,m=c===void 0?{}:c,p=a.styles,g=p===void 0?{}:p;return _t({type:"text",content:n},function(){return B("beforeDOMElementCreation",{content:n,params:a}),Oe({content:n,transform:u(u({},_),i),title:s,extra:{attributes:m,styles:g,classes:["".concat(d.cssPrefix,"-layers-text")].concat(ft(f))}})})}}},provides:function(e){e.generateLayersText=function(n,a){var r=a.title,i=a.transform,o=a.extra,s=null,l=null;if(He){var f=parseInt(getComputedStyle(n).fontSize,10),c=n.getBoundingClientRect();s=c.width/f,l=c.height/f}return d.autoA11y&&!r&&(o.attributes["aria-hidden"]="true"),Promise.resolve([n,Oe({content:n.innerHTML,width:s,height:l,transform:i,title:r,extra:o,watchable:!0})])}}},Wa=new RegExp('"',"ug"),Te=[1105920,1112319];function Ua(t){var e=t.replace(Wa,""),n=na(e,0),a=n>=Te[0]&&n<=Te[1],r=e.length===2?e[0]===e[1]:!1;return{value:Wt(r?e[0]:e),isSecondary:a||r}}function _e(t,e){var n="".concat(Tn).concat(e.replace(":","-"));return new Promise(function(a,r){if(t.getAttribute(n)!==null)return a();var i=tt(t.children),o=i.filter(function(H){return H.getAttribute($t)===e})[0],s=Y.getComputedStyle(t,e),l=s.getPropertyValue("font-family").match(Ln),f=s.getPropertyValue("font-weight"),c=s.getPropertyValue("content");if(o&&!l)return t.removeChild(o),a();if(l&&c!=="none"&&c!==""){var m=s.getPropertyValue("content"),p=~["Sharp"].indexOf(l[2])?x:h,g=~["Solid","Regular","Light","Thin","Duotone","Brands","Kit"].indexOf(l[2])?it[p][l[2].toLowerCase()]:Fn[p][f],A=Ua(m),P=A.value,w=A.isSecondary,C=l[0].startsWith("FontAwesome"),k=se(g,P),O=k;if(C){var I=fa(P);I.iconName&&I.prefix&&(k=I.iconName,g=I.prefix)}if(k&&!w&&(!o||o.getAttribute(ee)!==g||o.getAttribute(ne)!==O)){t.setAttribute(n,O),o&&t.removeChild(o);var N=ja(),U=N.extra;U.attributes[$t]=e,Gt(k,g).then(function(H){var jt=fe(u(u({},N),{},{icons:{main:H,mask:le()},prefix:g,iconName:O,extra:U,watchable:!0})),F=y.createElement("svg");e==="::before"?t.insertBefore(F,t.firstChild):t.appendChild(F),F.outerHTML=jt.map(function(yn){return ut(yn)}).join(`
`),t.removeAttribute(n),a()}).catch(r)}else a()}else a()})}function Ha(t){return Promise.all([_e(t,"::before"),_e(t,"::after")])}function Va(t){return t.parentNode!==document.head&&!~jn.indexOf(t.tagName.toUpperCase())&&!t.getAttribute($t)&&(!t.parentNode||t.parentNode.tagName!=="svg")}function je(t){if(L)return new Promise(function(e,n){var a=tt(t.querySelectorAll("*")).filter(Va).map(Ha),r=ce.begin("searchPseudoElements");mn(),Promise.all(a).then(function(){r(),qt(),e()}).catch(function(){r(),qt(),n()})})}var Xa={hooks:function(){return{mutationObserverCallbacks:function(n){return n.pseudoElementsCallback=je,n}}},provides:function(e){e.pseudoElements2svg=function(n){var a=n.node,r=a===void 0?y:a;d.searchPseudoElements&&je(r)}}},Re=!1,Ga={mixout:function(){return{dom:{unwatch:function(){mn(),Re=!0}}}},hooks:function(){return{bootstrap:function(){Ce(Ht("mutationObserverCallbacks",{}))},noAuto:function(){Ia()},watch:function(n){var a=n.observeMutationsRoot;Re?qt():Ce(Ht("mutationObserverCallbacks",{observeMutationsRoot:a}))}}}},Me=function(e){var n={size:16,x:0,y:0,flipX:!1,flipY:!1,rotate:0};return e.toLowerCase().split(" ").reduce(function(a,r){var i=r.toLowerCase().split("-"),o=i[0],s=i.slice(1).join("-");if(o&&s==="h")return a.flipX=!0,a;if(o&&s==="v")return a.flipY=!0,a;if(s=parseFloat(s),isNaN(s))return a;switch(o){case"grow":a.size=a.size+s;break;case"shrink":a.size=a.size-s;break;case"left":a.x=a.x-s;break;case"right":a.x=a.x+s;break;case"up":a.y=a.y-s;break;case"down":a.y=a.y+s;break;case"rotate":a.rotate=a.rotate+s;break}return a},n)},Ba={mixout:function(){return{parse:{transform:function(n){return Me(n)}}}},hooks:function(){return{parseNodeAttributes:function(n,a){var r=a.getAttribute("data-fa-transform");return r&&(n.transform=Me(r)),n}}},provides:function(e){e.generateAbstractTransformGrouping=function(n){var a=n.main,r=n.transform,i=n.containerWidth,o=n.iconWidth,s={transform:"translate(".concat(i/2," 256)")},l="translate(".concat(r.x*32,", ").concat(r.y*32,") "),f="scale(".concat(r.size/16*(r.flipX?-1:1),", ").concat(r.size/16*(r.flipY?-1:1),") "),c="rotate(".concat(r.rotate," 0 0)"),m={transform:"".concat(l," ").concat(f," ").concat(c)},p={transform:"translate(".concat(o/2*-1," -256)")},g={outer:s,inner:m,path:p};return{tag:"g",attributes:u({},g.outer),children:[{tag:"g",attributes:u({},g.inner),children:[{tag:a.icon.tag,children:a.icon.children,attributes:u(u({},a.icon.attributes),g.path)}]}]}}}},Ft={x:0,y:0,width:"100%",height:"100%"};function Le(t){var e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:!0;return t.attributes&&(t.attributes.fill||e)&&(t.attributes.fill="black"),t}function qa(t){return t.tag==="g"?t.children:[t]}var Ka={hooks:function(){return{parseNodeAttributes:function(n,a){var r=a.getAttribute("data-fa-mask"),i=r?Tt(r.split(" ").map(function(o){return o.trim()})):le();return i.prefix||(i.prefix=$()),n.mask=i,n.maskId=a.getAttribute("data-fa-mask-id"),n}}},provides:function(e){e.generateAbstractMask=function(n){var a=n.children,r=n.attributes,i=n.main,o=n.mask,s=n.maskId,l=n.transform,f=i.width,c=i.icon,m=o.width,p=o.icon,g=Bn({transform:l,containerWidth:m,iconWidth:f}),A={tag:"rect",attributes:u(u({},Ft),{},{fill:"white"})},P=c.children?{children:c.children.map(Le)}:{},w={tag:"g",attributes:u({},g.inner),children:[Le(u({tag:c.tag,attributes:u(u({},c.attributes),g.path)},P))]},C={tag:"g",attributes:u({},g.outer),children:[w]},k="mask-".concat(s||lt()),O="clip-".concat(s||lt()),I={tag:"mask",attributes:u(u({},Ft),{},{id:k,maskUnits:"userSpaceOnUse",maskContentUnits:"userSpaceOnUse"}),children:[A,C]},N={tag:"defs",children:[{tag:"clipPath",attributes:{id:O},children:qa(p)},I]};return a.push(N,{tag:"rect",attributes:u({fill:"currentColor","clip-path":"url(#".concat(O,")"),mask:"url(#".concat(k,")")},Ft)}),{children:a,attributes:r}}}},Ja={provides:function(e){var n=!1;Y.matchMedia&&(n=Y.matchMedia("(prefers-reduced-motion: reduce)").matches),e.missingIconAbstract=function(){var a=[],r={fill:"currentColor"},i={attributeType:"XML",repeatCount:"indefinite",dur:"2s"};a.push({tag:"path",attributes:u(u({},r),{},{d:"M156.5,447.7l-12.6,29.5c-18.7-9.5-35.9-21.2-51.5-34.9l22.7-22.7C127.6,430.5,141.5,440,156.5,447.7z M40.6,272H8.5 c1.4,21.2,5.4,41.7,11.7,61.1L50,321.2C45.1,305.5,41.8,289,40.6,272z M40.6,240c1.4-18.8,5.2-37,11.1-54.1l-29.5-12.6 C14.7,194.3,10,216.7,8.5,240H40.6z M64.3,156.5c7.8-14.9,17.2-28.8,28.1-41.5L69.7,92.3c-13.7,15.6-25.5,32.8-34.9,51.5 L64.3,156.5z M397,419.6c-13.9,12-29.4,22.3-46.1,30.4l11.9,29.8c20.7-9.9,39.8-22.6,56.9-37.6L397,419.6z M115,92.4 c13.9-12,29.4-22.3,46.1-30.4l-11.9-29.8c-20.7,9.9-39.8,22.6-56.8,37.6L115,92.4z M447.7,355.5c-7.8,14.9-17.2,28.8-28.1,41.5 l22.7,22.7c13.7-15.6,25.5-32.9,34.9-51.5L447.7,355.5z M471.4,272c-1.4,18.8-5.2,37-11.1,54.1l29.5,12.6 c7.5-21.1,12.2-43.5,13.6-66.8H471.4z M321.2,462c-15.7,5-32.2,8.2-49.2,9.4v32.1c21.2-1.4,41.7-5.4,61.1-11.7L321.2,462z M240,471.4c-18.8-1.4-37-5.2-54.1-11.1l-12.6,29.5c21.1,7.5,43.5,12.2,66.8,13.6V471.4z M462,190.8c5,15.7,8.2,32.2,9.4,49.2h32.1 c-1.4-21.2-5.4-41.7-11.7-61.1L462,190.8z M92.4,397c-12-13.9-22.3-29.4-30.4-46.1l-29.8,11.9c9.9,20.7,22.6,39.8,37.6,56.9 L92.4,397z M272,40.6c18.8,1.4,36.9,5.2,54.1,11.1l12.6-29.5C317.7,14.7,295.3,10,272,8.5V40.6z M190.8,50 c15.7-5,32.2-8.2,49.2-9.4V8.5c-21.2,1.4-41.7,5.4-61.1,11.7L190.8,50z M442.3,92.3L419.6,115c12,13.9,22.3,29.4,30.5,46.1 l29.8-11.9C470,128.5,457.3,109.4,442.3,92.3z M397,92.4l22.7-22.7c-15.6-13.7-32.8-25.5-51.5-34.9l-12.6,29.5 C370.4,72.1,384.4,81.5,397,92.4z"})});var o=u(u({},i),{},{attributeName:"opacity"}),s={tag:"circle",attributes:u(u({},r),{},{cx:"256",cy:"364",r:"28"}),children:[]};return n||s.children.push({tag:"animate",attributes:u(u({},i),{},{attributeName:"r",values:"28;14;28;28;14;28;"})},{tag:"animate",attributes:u(u({},o),{},{values:"1;0;1;1;0;1;"})}),a.push(s),a.push({tag:"path",attributes:u(u({},r),{},{opacity:"1",d:"M263.7,312h-16c-6.6,0-12-5.4-12-12c0-71,77.4-63.9,77.4-107.8c0-20-17.8-40.2-57.4-40.2c-29.1,0-44.3,9.6-59.2,28.7 c-3.9,5-11.1,6-16.2,2.4l-13.1-9.2c-5.6-3.9-6.9-11.8-2.6-17.2c21.2-27.2,46.4-44.7,91.2-44.7c52.3,0,97.4,29.8,97.4,80.2 c0,67.6-77.4,63.5-77.4,107.8C275.7,306.6,270.3,312,263.7,312z"}),children:n?[]:[{tag:"animate",attributes:u(u({},o),{},{values:"1;0;0;0;0;1;"})}]}),n||a.push({tag:"path",attributes:u(u({},r),{},{opacity:"0",d:"M232.5,134.5l7,168c0.3,6.4,5.6,11.5,12,11.5h9c6.4,0,11.7-5.1,12-11.5l7-168c0.3-6.8-5.2-12.5-12-12.5h-23 C237.7,122,232.2,127.7,232.5,134.5z"}),children:[{tag:"animate",attributes:u(u({},o),{},{values:"0;0;1;1;0;0;"})}]}),{tag:"g",attributes:{class:"missing"},children:a}}}},Qa={hooks:function(){return{parseNodeAttributes:function(n,a){var r=a.getAttribute("data-fa-symbol"),i=r===null?!1:r===""?!0:r;return n.symbol=i,n}}}},Za=[Jn,za,Da,Ya,$a,Xa,Ga,Ba,Ka,Ja,Qa];ma(Za,{mixoutsTo:E});E.noAuto;E.config;E.library;E.dom;var Kt=E.parse;E.findIconDefinition;E.toHtml;var tr=E.icon;E.layer;E.text;E.counter;var b={},er={get exports(){return b},set exports(t){b=t}},nr="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED",ar=nr,rr=ar;function vn(){}function pn(){}pn.resetWarningCache=vn;var ir=function(){function t(a,r,i,o,s,l){if(l!==rr){var f=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");throw f.name="Invariant Violation",f}}t.isRequired=t;function e(){return t}var n={array:t,bigint:t,bool:t,func:t,number:t,object:t,string:t,symbol:t,any:t,arrayOf:e,element:t,elementType:t,instanceOf:e,node:t,objectOf:e,oneOf:e,oneOfType:e,shape:e,exact:e,checkPropTypes:pn,resetWarningCache:vn};return n.PropTypes=n,n};er.exports=ir();function Fe(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(t);e&&(a=a.filter(function(r){return Object.getOwnPropertyDescriptor(t,r).enumerable})),n.push.apply(n,a)}return n}function D(t){for(var e=1;e<arguments.length;e++){var n=arguments[e]!=null?arguments[e]:{};e%2?Fe(Object(n),!0).forEach(function(a){J(t,a,n[a])}):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):Fe(Object(n)).forEach(function(a){Object.defineProperty(t,a,Object.getOwnPropertyDescriptor(n,a))})}return t}function Ct(t){return Ct=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(e){return typeof e}:function(e){return e&&typeof Symbol=="function"&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},Ct(t)}function J(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function or(t,e){if(t==null)return{};var n={},a=Object.keys(t),r,i;for(i=0;i<a.length;i++)r=a[i],!(e.indexOf(r)>=0)&&(n[r]=t[r]);return n}function sr(t,e){if(t==null)return{};var n=or(t,e),a,r;if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(t);for(r=0;r<i.length;r++)a=i[r],!(e.indexOf(a)>=0)&&Object.prototype.propertyIsEnumerable.call(t,a)&&(n[a]=t[a])}return n}function Jt(t){return lr(t)||fr(t)||cr(t)||ur()}function lr(t){if(Array.isArray(t))return Qt(t)}function fr(t){if(typeof Symbol<"u"&&t[Symbol.iterator]!=null||t["@@iterator"]!=null)return Array.from(t)}function cr(t,e){if(t){if(typeof t=="string")return Qt(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);if(n==="Object"&&t.constructor&&(n=t.constructor.name),n==="Map"||n==="Set")return Array.from(t);if(n==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return Qt(t,e)}}function Qt(t,e){(e==null||e>t.length)&&(e=t.length);for(var n=0,a=new Array(e);n<e;n++)a[n]=t[n];return a}function ur(){throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function mr(t){var e,n=t.beat,a=t.fade,r=t.beatFade,i=t.bounce,o=t.shake,s=t.flash,l=t.spin,f=t.spinPulse,c=t.spinReverse,m=t.pulse,p=t.fixedWidth,g=t.inverse,A=t.border,P=t.listItem,w=t.flip,C=t.size,k=t.rotation,O=t.pull,I=(e={"fa-beat":n,"fa-fade":a,"fa-beat-fade":r,"fa-bounce":i,"fa-shake":o,"fa-flash":s,"fa-spin":l,"fa-spin-reverse":c,"fa-spin-pulse":f,"fa-pulse":m,"fa-fw":p,"fa-inverse":g,"fa-border":A,"fa-li":P,"fa-flip":w===!0,"fa-flip-horizontal":w==="horizontal"||w==="both","fa-flip-vertical":w==="vertical"||w==="both"},J(e,"fa-".concat(C),typeof C<"u"&&C!==null),J(e,"fa-rotate-".concat(k),typeof k<"u"&&k!==null&&k!==0),J(e,"fa-pull-".concat(O),typeof O<"u"&&O!==null),J(e,"fa-swap-opacity",t.swapOpacity),e);return Object.keys(I).map(function(N){return I[N]?N:null}).filter(function(N){return N})}function dr(t){return t=t-0,t===t}function bn(t){return dr(t)?t:(t=t.replace(/[\-_\s]+(.)?/g,function(e,n){return n?n.toUpperCase():""}),t.substr(0,1).toLowerCase()+t.substr(1))}var vr=["style"];function pr(t){return t.charAt(0).toUpperCase()+t.slice(1)}function br(t){return t.split(";").map(function(e){return e.trim()}).filter(function(e){return e}).reduce(function(e,n){var a=n.indexOf(":"),r=bn(n.slice(0,a)),i=n.slice(a+1).trim();return r.startsWith("webkit")?e[pr(r)]=i:e[r]=i,e},{})}function gn(t,e){var n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:{};if(typeof e=="string")return e;var a=(e.children||[]).map(function(l){return gn(t,l)}),r=Object.keys(e.attributes||{}).reduce(function(l,f){var c=e.attributes[f];switch(f){case"class":l.attrs.className=c,delete e.attributes.class;break;case"style":l.attrs.style=br(c);break;default:f.indexOf("aria-")===0||f.indexOf("data-")===0?l.attrs[f.toLowerCase()]=c:l.attrs[bn(f)]=c}return l},{attrs:{}}),i=n.style,o=i===void 0?{}:i,s=sr(n,vr);return r.attrs.style=D(D({},r.attrs.style),o),t.apply(void 0,[e.tag,D(D({},r.attrs),s)].concat(Jt(a)))}var hn=!1;try{hn=!0}catch{}function gr(){if(!hn&&console&&typeof console.error=="function"){var t;(t=console).error.apply(t,arguments)}}function ze(t){if(t&&Ct(t)==="object"&&t.prefix&&t.iconName&&t.icon)return t;if(Kt.icon)return Kt.icon(t);if(t===null)return null;if(t&&Ct(t)==="object"&&t.prefix&&t.iconName)return t;if(Array.isArray(t)&&t.length===2)return{prefix:t[0],iconName:t[1]};if(typeof t=="string")return{prefix:"fas",iconName:t}}function zt(t,e){return Array.isArray(e)&&e.length>0||!Array.isArray(e)&&e?J({},t,e):{}}var mt=De.forwardRef(function(t,e){var n=t.icon,a=t.mask,r=t.symbol,i=t.className,o=t.title,s=t.titleId,l=t.maskId,f=ze(n),c=zt("classes",[].concat(Jt(mr(t)),Jt(i.split(" ")))),m=zt("transform",typeof t.transform=="string"?Kt.transform(t.transform):t.transform),p=zt("mask",ze(a)),g=tr(f,D(D(D(D({},c),m),p),{},{symbol:r,title:o,titleId:s,maskId:l}));if(!g)return gr("Could not find icon",f),null;var A=g.abstract,P={ref:e};return Object.keys(t).forEach(function(w){mt.defaultProps.hasOwnProperty(w)||(P[w]=t[w])}),hr(A[0],P)});mt.displayName="FontAwesomeIcon";mt.propTypes={beat:b.bool,border:b.bool,beatFade:b.bool,bounce:b.bool,className:b.string,fade:b.bool,flash:b.bool,mask:b.oneOfType([b.object,b.array,b.string]),maskId:b.string,fixedWidth:b.bool,inverse:b.bool,flip:b.oneOf([!0,!1,"horizontal","vertical","both"]),icon:b.oneOfType([b.object,b.array,b.string]),listItem:b.bool,pull:b.oneOf(["right","left"]),pulse:b.bool,rotation:b.oneOf([0,90,180,270]),shake:b.bool,size:b.oneOf(["2xs","xs","sm","lg","xl","2xl","1x","2x","3x","4x","5x","6x","7x","8x","9x","10x"]),spin:b.bool,spinPulse:b.bool,spinReverse:b.bool,symbol:b.oneOfType([b.bool,b.string]),title:b.string,titleId:b.string,transform:b.oneOfType([b.string,b.object]),swapOpacity:b.bool};mt.defaultProps={border:!1,className:"",mask:null,maskId:null,fixedWidth:!1,inverse:!1,flip:!1,icon:null,listItem:!1,pull:null,pulse:!1,rotation:null,size:null,spin:!1,spinPulse:!1,spinReverse:!1,beat:!1,fade:!1,beatFade:!1,bounce:!1,shake:!1,symbol:!1,title:"",titleId:null,transform:null,swapOpacity:!1};var hr=gn.bind(null,De.createElement),yr={prefix:"fab",iconName:"facebook-messenger",icon:[512,512,[],"f39f","M256.55 8C116.52 8 8 110.34 8 248.57c0 72.3 29.71 134.78 78.07 177.94 8.35 7.51 6.63 11.86 8.05 58.23A19.92 19.92 0 0 0 122 502.31c52.91-23.3 53.59-25.14 62.56-22.7C337.85 521.8 504 423.7 504 248.57 504 110.34 396.59 8 256.55 8zm149.24 185.13l-73 115.57a37.37 37.37 0 0 1-53.91 9.93l-58.08-43.47a15 15 0 0 0-18 0l-78.37 59.44c-10.46 7.93-24.16-4.6-17.11-15.67l73-115.57a37.36 37.36 0 0 1 53.91-9.93l58.06 43.46a15 15 0 0 0 18 0l78.41-59.38c10.44-7.98 24.14 4.54 17.09 15.62z"]},xr={prefix:"fab",iconName:"linkedin",icon:[448,512,[],"f08c","M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z"]},wr={prefix:"fab",iconName:"instagram",icon:[448,512,[],"f16d","M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"]},kr={prefix:"fab",iconName:"facebook",icon:[512,512,[62e3],"f09a","M504 256C504 119 393 8 256 8S8 119 8 256c0 123.78 90.69 226.38 209.25 245V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.28c-30.8 0-40.41 19.12-40.41 38.73V256h68.78l-11 71.69h-57.78V501C413.31 482.38 504 379.78 504 256z"]},Ar={prefix:"fab",iconName:"twitter",icon:[512,512,[],"f099","M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z"]},Or={prefix:"fab",iconName:"pinterest",icon:[496,512,[],"f0d2","M496 256c0 137-111 248-248 248-25.6 0-50.2-3.9-73.4-11.1 10.1-16.5 25.2-43.5 30.8-65 3-11.6 15.4-59 15.4-59 8.1 15.4 31.7 28.5 56.8 28.5 74.8 0 128.7-68.8 128.7-154.3 0-81.9-66.9-143.2-152.9-143.2-107 0-163.9 71.8-163.9 150.1 0 36.4 19.4 81.7 50.3 96.1 4.7 2.2 7.2 1.2 8.3-3.3.8-3.4 5-20.3 6.9-28.1.6-2.5.3-4.7-1.7-7.1-10.1-12.5-18.3-35.3-18.3-56.6 0-54.7 41.4-107.6 112-107.6 60.9 0 103.6 41.5 103.6 100.9 0 67.1-33.9 113.6-78 113.6-24.3 0-42.6-20.1-36.7-44.8 7-29.5 20.5-61.3 20.5-82.6 0-19-10.2-34.9-31.4-34.9-24.9 0-44.9 25.7-44.9 60.2 0 22 7.4 36.8 7.4 36.8s-24.5 103.8-29 123.2c-5 21.4-3 51.6-.9 71.2C65.4 450.9 0 361.1 0 256 0 119 111 8 248 8s248 111 248 248z"]};function Sr(){const[t,e]=Ot.useState([{icon:Ar,link:"https://twitter.com/"},{icon:xr,link:"https://twitter.com/"},{icon:kr,link:"https://www.instagram.com/"},{icon:wr,link:"https://www.youtube.com/"},{icon:Or,link:"https://www.linkedin.com/"},{icon:yr,link:"https://github.com/"}]);return v.jsx("div",{className:"flex justify-between my-4 gap-4",children:t.map(({icon:n},a)=>v.jsx("button",{className:"w-8 h-8 text-white bg-gray-300 rounded-full hover:ring-1 ring-black",children:v.jsx(mt,{icon:n})},a))})}function Nr({link:t,inputRef:e}){return v.jsxs("div",{className:"flex bg-gray-300 px-2 py-1 rounded-md text-xs",children:[v.jsx("input",{ref:e,type:"text",value:t,className:"grow bg-transparent outline-none",readOnly:!0}),v.jsx("button",{className:"font-medium pl-2",onClick:()=>{var n;return navigator.clipboard.writeText(((n=e.current)==null?void 0:n.value)??"")},children:"Copy"})]})}function Pr(){const[t,e]=Ot.useState("https://www.copymehaha.com/aslkdowce"),n=Ot.useRef();return v.jsx("div",{className:"flex items-center",children:v.jsx("div",{className:"mx-auto",children:v.jsxs("div",{className:"h-full px-10 py-6 bg-gray-100 rounded-xl shadow-md shadow-gray-400",children:[v.jsx("div",{className:"font-bold text-sm",children:"Share this challenge"}),v.jsx(Sr,{}),v.jsx("div",{className:"text-xs mb-2",children:"or copy link"}),v.jsx(Nr,{link:t,inputRef:n})]})})})}function Cr(){return v.jsxs("div",{className:"flex flex-col rounded-lg overflow-clip pd-4 w-64 h-80 bg-white shadow-md shadow-gray-400",children:[v.jsx("div",{children:v.jsx("figure",{children:v.jsx("img",{src:"https://picsum.photos/300/200",width:"100%",className:"h-32 object-cover"})})}),v.jsxs("div",{className:"flex-1 relative",children:[v.jsx("img",{src:"https://picsum.photos/50/50",width:"50",height:"50",className:"absolute top-[calc(-25px)] left-[calc(50%_-_25px)] rounded-full outline outline-4 outline-offset-0 outline-white"}),v.jsxs("div",{className:"ml-4 my-4 items-center mt-12",children:[v.jsxs("div",{children:[v.jsx("span",{className:"text-xl font-bold",children:"Victor Crest  "}),v.jsx("span",{children:"26"})]}),v.jsx("span",{className:"font-light text-xs",children:"London"})]})]}),v.jsx("hr",{}),v.jsxs("div",{className:"flex w-full mt-2 justify-evenly text-center pb-2",children:[v.jsx("div",{className:"w-[calc(30%_-_2px)] my-auto",children:v.jsxs("div",{className:"flex flex-col",children:[v.jsx("div",{className:"font-bold",children:"80K"}),v.jsx("span",{className:"text-xs",children:"Followers"})]})}),v.jsx("div",{className:"w-[calc(30%_-_2px)] my-auto",children:v.jsxs("div",{className:"flex flex-col",children:[v.jsx("div",{className:"font-bold",children:"803K"}),v.jsx("span",{className:"text-xs",children:"Likes"})]})}),v.jsx("div",{className:"w-[calc(30%_-_2px)] my-auto",children:v.jsxs("div",{className:"flex flex-col",children:[v.jsx("div",{className:"font-bold",children:"1.4K"}),v.jsx("span",{className:"text-xs",children:"Photos"})]})})]})]})}function Er(){return v.jsxs("div",{children:[v.jsxs("div",{className:"flex justify-center gap-x-8",children:[v.jsx(Cr,{}),v.jsx(Pr,{})]}),v.jsx(wn,{})]})}export{Er as default};
