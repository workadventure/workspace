/*! For license information please see script.js.LICENSE.txt */
(()=>{"use strict";var e={640:(e,t,o)=>{o.r(t),o.d(t,{Properties:()=>r,VariableDescriptor:()=>i,bootstrapExtra:()=>ee,findLayerBoundaries:()=>g,findLayersBoundaries:()=>h,getAreaObject:()=>f,getLayersMap:()=>p,getVariables:()=>s,initDoors:()=>Q,initPropertiesTemplates:()=>U,initPropertiesTemplatesArea:()=>G,initVariableActionLayer:()=>X,launchTutorialv1:()=>Y,openConfig:()=>a});class r{constructor(e){this.properties=null!=e?e:[]}get(e){const t=this.properties.filter((t=>t.name===e)).map((e=>e.value));if(t.length>1)throw new Error('Expected only one property to be named "'+e+'"');if(0!==t.length)return t[0]}getString(e){return this.getByType(e,"string")}getNumber(e){return this.getByType(e,"number")}getBoolean(e){return this.getByType(e,"boolean")}getByType(e,t){const o=this.get(e);if(void 0!==o){if("json"!==t&&typeof o!==t)throw new Error('Expected property "'+e+'" to have type "'+t+'"');return o}}mustGetString(e){return this.mustGetByType(e,"string")}mustGetNumber(e){return this.mustGetByType(e,"number")}mustGetBoolean(e){return this.mustGetByType(e,"boolean")}mustGetByType(e,t){const o=this.get(e);if(void 0===o)throw new Error('Property "'+e+'" is missing');if("json"!==t&&typeof o!==t)throw new Error('Expected property "'+e+'" to have type "'+t+'"');return o}getType(e){const t=this.properties.filter((t=>t.name===e)).map((e=>e.type));if(t.length>1)throw new Error('Expected only one property to be named "'+e+'"');if(0!==t.length)return t[0]}}const n="https://cdn.jsdelivr.net/npm/@workadventure/scripting-api-extra@1.6.0/dist";class i{constructor(e){this.name=e.name,this.x=e.x,this.y=e.y,this.properties=new r(e.properties)}get isReadable(){const e=this.properties.getString("readableBy");return!e||WA.player.tags.includes(e)}get isWritable(){const e=this.properties.getString("writableBy");return!e||WA.player.tags.includes(e)}}function a(e){const t=e?"#"+e.join():"";WA.nav.openCoWebSite(n+"/configuration.html"+t,!0)}async function s(e,t){const o=await WA.room.getTiledMap(),r=new Map;return l(o.layers,r,e,t),r}function l(e,t,o,r){for(const n of e)if("objectgroup"===n.type){for(const e of n.objects)if("variable"===e.type||"variable"===e.class){if(o&&n.name!==o)continue;if(r&&!r.includes(e.name))continue;t.set(e.name,new i(e))}}else"group"===n.type&&l(n.layers,t,o,r)}let c;async function p(){return void 0===c&&(c=async function(){return function(e){const t=new Map;return u(e.layers,"",t),t}(await WA.room.getTiledMap())}()),c}function u(e,t,o){for(const r of e)"group"===r.type?u(r.layers,t+r.name+"/",o):(r.name=t+r.name,o.set(r.name,r))}async function f(){const e=await p(),t=[];for(const o of e.values())if("objectgroup"===o.type)for(const e of o.objects)"area"!==e.type&&"area"!==e.class||t.push(e);return t}function g(e){let t=1/0,o=1/0,r=0,n=0;const i=e.data;if("string"==typeof i)throw new Error("Unsupported tile layer data stored as string instead of CSV");for(let a=0;a<e.height;a++)for(let s=0;s<e.width;s++)0!==i[s+a*e.width]&&(t=Math.min(t,s),n=Math.max(n,s),o=Math.min(o,a),r=Math.max(r,a));return{top:o,left:t,right:n+1,bottom:r+1}}function h(e){let t=1/0,o=1/0,r=0,n=0;for(const i of e){const e=g(i);e.left<t&&(t=e.left),e.top<o&&(o=e.top),e.right>n&&(n=e.right),e.bottom>r&&(r=e.bottom)}return{top:o,left:t,right:n,bottom:r}}var y=Object.prototype.toString,d=Array.isArray||function(e){return"[object Array]"===y.call(e)};function m(e){return"function"==typeof e}function b(e){return e.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g,"\\$&")}function v(e,t){return null!=e&&"object"==typeof e&&t in e}var w=RegExp.prototype.test,A=/\S/;var W={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;","/":"&#x2F;","`":"&#x60;","=":"&#x3D;"},S=/\s*/,C=/\s+/,x=/\s*=/,E=/\s*\}/,T=/#|\^|\/|>|\{|&|=|!/;function L(e){this.string=e,this.tail=e,this.pos=0}function P(e,t){this.view=e,this.cache={".":this.view},this.parent=t}function V(){this.templateCache={_cache:{},set:function(e,t){this._cache[e]=t},get:function(e){return this._cache[e]},clear:function(){this._cache={}}}}L.prototype.eos=function(){return""===this.tail},L.prototype.scan=function(e){var t=this.tail.match(e);if(!t||0!==t.index)return"";var o=t[0];return this.tail=this.tail.substring(o.length),this.pos+=o.length,o},L.prototype.scanUntil=function(e){var t,o=this.tail.search(e);switch(o){case-1:t=this.tail,this.tail="";break;case 0:t="";break;default:t=this.tail.substring(0,o),this.tail=this.tail.substring(o)}return this.pos+=t.length,t},P.prototype.push=function(e){return new P(e,this)},P.prototype.lookup=function(e){var t,o,r,n=this.cache;if(n.hasOwnProperty(e))t=n[e];else{for(var i,a,s,l=this,c=!1;l;){if(e.indexOf(".")>0)for(i=l.view,a=e.split("."),s=0;null!=i&&s<a.length;)s===a.length-1&&(c=v(i,a[s])||(o=i,r=a[s],null!=o&&"object"!=typeof o&&o.hasOwnProperty&&o.hasOwnProperty(r))),i=i[a[s++]];else i=l.view[e],c=v(l.view,e);if(c){t=i;break}l=l.parent}n[e]=t}return m(t)&&(t=t.call(this.view)),t},V.prototype.clearCache=function(){void 0!==this.templateCache&&this.templateCache.clear()},V.prototype.parse=function(e,t){var o=this.templateCache,r=e+":"+(t||M.tags).join(":"),n=void 0!==o,i=n?o.get(r):void 0;return null==i&&(i=function(e,t){if(!e)return[];var o,r,n,i,a=!1,s=[],l=[],c=[],p=!1,u=!1,f="",g=0;function h(){if(p&&!u)for(;c.length;)delete l[c.pop()];else c=[];p=!1,u=!1}function y(e){if("string"==typeof e&&(e=e.split(C,2)),!d(e)||2!==e.length)throw new Error("Invalid tags: "+e);o=new RegExp(b(e[0])+"\\s*"),r=new RegExp("\\s*"+b(e[1])),n=new RegExp("\\s*"+b("}"+e[1]))}y(t||M.tags);for(var m,v,W,P,V,j,k=new L(e);!k.eos();){if(m=k.pos,W=k.scanUntil(o))for(var B=0,G=W.length;B<G;++B)i=P=W.charAt(B),function(e,t){return w.call(e,t)}(A,i)?(u=!0,a=!0,f+=" "):(c.push(l.length),f+=P),l.push(["text",P,m,m+1]),m+=1,"\n"===P&&(h(),f="",g=0,a=!1);if(!k.scan(o))break;if(p=!0,v=k.scan(T)||"name",k.scan(S),"="===v?(W=k.scanUntil(x),k.scan(x),k.scanUntil(r)):"{"===v?(W=k.scanUntil(n),k.scan(E),k.scanUntil(r),v="&"):W=k.scanUntil(r),!k.scan(r))throw new Error("Unclosed tag at "+k.pos);if(V=">"==v?[v,W,m,k.pos,f,g,a]:[v,W,m,k.pos],g++,l.push(V),"#"===v||"^"===v)s.push(V);else if("/"===v){if(!(j=s.pop()))throw new Error('Unopened section "'+W+'" at '+m);if(j[1]!==W)throw new Error('Unclosed section "'+j[1]+'" at '+m)}else"name"===v||"{"===v||"&"===v?u=!0:"="===v&&y(W)}if(h(),j=s.pop())throw new Error('Unclosed section "'+j[1]+'" at '+k.pos);return function(e){for(var t,o=[],r=o,n=[],i=0,a=e.length;i<a;++i)switch((t=e[i])[0]){case"#":case"^":r.push(t),n.push(t),r=t[4]=[];break;case"/":n.pop()[5]=t[2],r=n.length>0?n[n.length-1][4]:o;break;default:r.push(t)}return o}(function(e){for(var t,o,r=[],n=0,i=e.length;n<i;++n)(t=e[n])&&("text"===t[0]&&o&&"text"===o[0]?(o[1]+=t[1],o[3]=t[3]):(r.push(t),o=t));return r}(l))}(e,t),n&&o.set(r,i)),i},V.prototype.render=function(e,t,o,r){var n=this.getConfigTags(r),i=this.parse(e,n),a=t instanceof P?t:new P(t,void 0);return this.renderTokens(i,a,o,e,r)},V.prototype.renderTokens=function(e,t,o,r,n){for(var i,a,s,l="",c=0,p=e.length;c<p;++c)s=void 0,"#"===(a=(i=e[c])[0])?s=this.renderSection(i,t,o,r,n):"^"===a?s=this.renderInverted(i,t,o,r,n):">"===a?s=this.renderPartial(i,t,o,n):"&"===a?s=this.unescapedValue(i,t):"name"===a?s=this.escapedValue(i,t,n):"text"===a&&(s=this.rawValue(i)),void 0!==s&&(l+=s);return l},V.prototype.renderSection=function(e,t,o,r,n){var i=this,a="",s=t.lookup(e[1]);if(s){if(d(s))for(var l=0,c=s.length;l<c;++l)a+=this.renderTokens(e[4],t.push(s[l]),o,r,n);else if("object"==typeof s||"string"==typeof s||"number"==typeof s)a+=this.renderTokens(e[4],t.push(s),o,r,n);else if(m(s)){if("string"!=typeof r)throw new Error("Cannot use higher-order sections without the original template");null!=(s=s.call(t.view,r.slice(e[3],e[5]),(function(e){return i.render(e,t,o,n)})))&&(a+=s)}else a+=this.renderTokens(e[4],t,o,r,n);return a}},V.prototype.renderInverted=function(e,t,o,r,n){var i=t.lookup(e[1]);if(!i||d(i)&&0===i.length)return this.renderTokens(e[4],t,o,r,n)},V.prototype.indentPartial=function(e,t,o){for(var r=t.replace(/[^ \t]/g,""),n=e.split("\n"),i=0;i<n.length;i++)n[i].length&&(i>0||!o)&&(n[i]=r+n[i]);return n.join("\n")},V.prototype.renderPartial=function(e,t,o,r){if(o){var n=this.getConfigTags(r),i=m(o)?o(e[1]):o[e[1]];if(null!=i){var a=e[6],s=e[5],l=e[4],c=i;0==s&&l&&(c=this.indentPartial(i,l,a));var p=this.parse(c,n);return this.renderTokens(p,t,o,c,r)}}},V.prototype.unescapedValue=function(e,t){var o=t.lookup(e[1]);if(null!=o)return o},V.prototype.escapedValue=function(e,t,o){var r=this.getConfigEscape(o)||M.escape,n=t.lookup(e[1]);if(null!=n)return"number"==typeof n&&r===M.escape?String(n):r(n)},V.prototype.rawValue=function(e){return e[1]},V.prototype.getConfigTags=function(e){return d(e)?e:e&&"object"==typeof e?e.tags:void 0},V.prototype.getConfigEscape=function(e){return e&&"object"==typeof e&&!d(e)?e.escape:void 0};var M={name:"mustache.js",version:"4.2.0",tags:["{{","}}"],clearCache:void 0,escape:void 0,parse:void 0,render:void 0,Scanner:void 0,Context:void 0,Writer:void 0,set templateCache(e){j.templateCache=e},get templateCache(){return j.templateCache}},j=new V;M.clearCache=function(){return j.clearCache()},M.parse=function(e,t){return j.parse(e,t)},M.render=function(e,t,o,r){if("string"!=typeof e)throw new TypeError('Invalid template! Template should be a "string" but "'+(d(n=e)?"array":typeof n)+'" was given as the first argument for mustache#render(template, view, partials)');var n;return j.render(e,t,o,r)},M.escape=function(e){return String(e).replace(/[&<>"'`=\/]/g,(function(e){return W[e]}))},M.Scanner=L,M.Context=P,M.Writer=V;const k=M;class B{constructor(e,t){this.template=e,this.state=t,this.ast=k.parse(e)}getValue(){return void 0===this.value&&(this.value=k.render(this.template,this.state)),this.value}onChange(e){const t=[];for(const o of this.getUsedVariables().values())t.push(this.state.onVariableChange(o).subscribe((()=>{const t=k.render(this.template,this.state);t!==this.value&&(this.value=t,e(this.value))})));return{unsubscribe:()=>{for(const e of t)e.unsubscribe()}}}isPureString(){return 0===this.ast.length||1===this.ast.length&&"text"===this.ast[0][0]}getUsedVariables(){const e=new Set;return this.recursiveGetUsedVariables(this.ast,e),e}recursiveGetUsedVariables(e,t){for(const o of e){const e=o[0],r=o[1],n=o[4];["name","&","#","^"].includes(e)&&t.add(r),void 0!==n&&"string"!=typeof n&&this.recursiveGetUsedVariables(n,t)}}}async function G(){var e;const t=await f();for(const o of t){const t=null!==(e=o.properties)&&void 0!==e?e:[];for(const e of t){if("int"===e.type||"bool"===e.type||"object"===e.type||"string"!=typeof e.value)continue;const t=new B(e.value,WA.state);if(t.isPureString())continue;const r=t.getValue();await O(o.name,e.name,r),t.onChange((async t=>{await O(o.name,e.name,t)}))}}}async function U(){var e;const t=await p();for(const[o,r]of t.entries())if("objectgroup"!==r.type){const t=null!==(e=r.properties)&&void 0!==e?e:[];for(const e of t){if("int"===e.type||"bool"===e.type||"object"===e.type||"string"!=typeof e.value)continue;const t=new B(e.value,WA.state);if(t.isPureString())continue;const r=t.getValue();R(o,e.name,r),t.onChange((t=>{R(o,e.name,t)}))}}}async function O(e,t,o){console.log(e),(await WA.room.area.get(e)).setProperty(t,o)}function R(e,t,o){WA.room.setProperty(e,t,o),"visible"===t&&(o?WA.room.showLayer(e):WA.room.hideLayer(e))}let I,D,N=0,_=0;function $(e){if(WA.state[e.name]){let t=e.properties.mustGetString("openLayer");for(const e of t.split("\n"))WA.room.showLayer(e);t=e.properties.mustGetString("closeLayer");for(const e of t.split("\n"))WA.room.hideLayer(e)}else{let t=e.properties.mustGetString("openLayer");for(const e of t.split("\n"))WA.room.hideLayer(e);t=e.properties.mustGetString("closeLayer");for(const e of t.split("\n"))WA.room.showLayer(e)}}function q(e){return e.map((e=>I.get(e))).filter((e=>"tilelayer"===(null==e?void 0:e.type)))}function z(e){const t=h(q(e)),o=32*((t.right-t.left)/2+t.left),r=32*((t.bottom-t.top)/2+t.top);return Math.sqrt(Math.pow(N-o,2)+Math.pow(_-r,2))}function F(e){WA.state.onVariableChange(e.name).subscribe((()=>{WA.state[e.name]?function(e){const t=e.properties.getString("openSound"),o=e.properties.getNumber("soundRadius");let r=1;if(o){const t=z(e.properties.mustGetString("openLayer").split("\n"));if(t>o)return;r=1-t/o}t&&WA.sound.loadSound(t).play({volume:r})}(e):function(e){const t=e.properties.getString("closeSound"),o=e.properties.getNumber("soundRadius");let r=1;if(o){const t=z(e.properties.mustGetString("closeLayer").split("\n"));if(t>o)return;r=1-t/o}t&&WA.sound.loadSound(t).play({volume:r})}(e),$(e)})),$(e)}function K(e,t,o,r){const n=e.name;let i,a,s=!1;const l=o.getString("tag");let c=!0;l&&!WA.player.tags.includes(l)&&(c=!1);const p=!!l;function u(){var e;i&&i.remove(),i=WA.ui.displayActionMessage({message:null!==(e=o.getString("closeTriggerMessage"))&&void 0!==e?e:"Press SPACE to close the door",callback:()=>{WA.state[t.name]=!1,f()}})}function f(){var e;i&&i.remove(),i=WA.ui.displayActionMessage({message:null!==(e=o.getString("openTriggerMessage"))&&void 0!==e?e:"Press SPACE to open the door",callback:()=>{WA.state[t.name]=!0,u()}})}function g(){a&&(WA.room.website.delete(a.name),a=void 0)}function y(){s=!0,o.getBoolean("autoOpen")&&c?WA.state[t.name]=!0:WA.state[t.name]||(!p||c)&&p||!o.getString("code")&&!o.getString("codeVariable")?c&&(WA.state[t.name]?u():f()):function(){let o;if("tilelayer"===e.type)o=h(q(t.properties.mustGetString("closeLayer").split("\n")));else{if(void 0===e.x||void 0===e.y||void 0===e.width||void 0===e.height)throw new Error(`Doorstep zone "${e.name}" is missing x, y, width or height`);o={top:e.y,left:e.x,right:e.x+e.width,bottom:e.y+e.height}}a=WA.room.website.create({name:"doorKeypad"+n,url:r+"/keypad.html#"+encodeURIComponent(n),position:{x:32*o.right,y:32*o.top,width:96,height:128},allowApi:!0})}()}function d(){s=!1,o.getBoolean("autoClose")&&(WA.state[t.name]=!1),i&&i.remove(),g()}"tilelayer"===e.type?(WA.room.onEnterLayer(n).subscribe(y),WA.room.onLeaveLayer(n).subscribe(d)):(WA.room.area.onEnter(n).subscribe(y),WA.room.area.onLeave(n).subscribe(d)),WA.state.onVariableChange(t.name).subscribe((()=>{s&&(o.getBoolean("autoClose")||!0!==WA.state[t.name]||u(),a&&!0===WA.state[t.name]&&g(),o.getBoolean("autoOpen")||!1!==WA.state[t.name]||f())}))}function H(e){void 0===WA.state[e.name]&&(WA.state[e.name]=0),WA.state.onVariableChange(e.name).subscribe((()=>{WA.state[e.name]&&function(e){const t=e.properties.mustGetString("bellSound"),o=e.properties.getNumber("soundRadius");let r=1;if(o){const t=Math.sqrt(Math.pow(e.x-N,2)+Math.pow(e.y-_,2));if(t>o)return;r=1-t/o}WA.sound.loadSound(t).play({volume:r})}(e)}))}function J(e,t,o){let r;const n=t.getString("bellPopup");if("tilelayer"===o.type){const i=o.name;WA.room.onEnterLayer(i).subscribe((()=>{var o;n?r=WA.ui.openPopup(n,"",[{label:null!==(o=t.getString("bellButtonText"))&&void 0!==o?o:"Ring",callback:()=>{WA.state[e]=WA.state[e]+1}}]):WA.state[e]=WA.state[e]+1})),WA.room.onLeaveLayer(i).subscribe((()=>{r&&(r.close(),r=void 0)}))}else{const i=o.name;WA.room.area.onEnter(i).subscribe((()=>{var o;n?r=WA.ui.openPopup(n,"",[{label:null!==(o=t.getString("bellButtonText"))&&void 0!==o?o:"Ring",callback:()=>{WA.state[e]=WA.state[e]+1}}]):WA.state[e]=WA.state[e]+1})),WA.room.area.onLeave(i).subscribe((()=>{r&&(r.close(),r=void 0)}))}}async function Q(e){e=null!=e?e:n;const t=await s();I=await p();for(const e of t.values())e.properties.get("door")&&F(e),e.properties.get("bell")&&H(e);for(const o of I.values()){const n=new r(o.properties),i=n.getString("doorVariable");if(i&&"tilelayer"===o.type){const r=t.get(i);if(void 0===r)throw new Error('Cannot find variable "'+i+'" referred in the "doorVariable" property of layer "'+o.name+'"');K(o,r,n,e)}const a=n.getString("bellVariable");a&&"tilelayer"===o.type&&J(a,n,o)}for(const o of await f()){const n=new r(o.properties),i=n.getString("doorVariable");if(i){const r=t.get(i);if(void 0===r)throw new Error('Cannot find variable "'+i+'" referred in the "doorVariable" property of object "'+o.name+'"');K(o,r,n,e)}const a=n.getString("bellVariable");a&&J(a,n,o)}WA.player.onPlayerMove((e=>{N=e.x,_=e.y}))}function X(e,t){const o=e.getString("bindVariable");o&&function(e,t,o,r,n,i){i&&!WA.player.tags.includes(i)||(void 0!==o&&WA.room.onEnterLayer(t).subscribe((()=>{n||(WA.state[e]=o)})),void 0!==r&&WA.room.onLeaveLayer(t).subscribe((()=>{WA.state[e]=r})))}(o,t,e.get("enterValue"),e.get("leaveValue"),e.getString("triggerMessage"),e.getString("tag"))}function Y(){const e=`${n}/tutorialv1.html`;console.info("Start onboarding application!",e),console.info("Player tutorial done information: ",WA.player.state.tutorialDone),WA.player.state.tutorialDone||WA.ui.modal.openModal({tiltle:"Welcome onboard!",src:e,allow:"fullscreen; clipboard-read; clipboard-write",allowApi:!0,position:"right"})}function Z(e,t,o){let r;const n=o.getString("openConfigAdminTag");let i=!0;function s(){WA.nav.closeCoWebSite()}n&&!WA.player.tags.includes(n)&&(i=!1),WA.room.onEnterLayer(t).subscribe((()=>{const t=o.getString("openConfigTrigger");var n;i&&(t&&"onaction"===t?(r&&r.remove(),r=WA.ui.displayActionMessage({message:null!==(n=o.getString("openConfigTriggerMessage"))&&void 0!==n?n:"Press SPACE or touch here to configure",callback:()=>a(e)})):a(e))})),WA.room.onLeaveLayer(t).subscribe((()=>{r?(r.remove(),s()):s()}))}function ee(){return WA.onInit().then((()=>{Q().catch((e=>console.error(e))),async function(){const e=await p();for(const t of e.values())X(new r(t.properties),t.name)}().catch((e=>console.error(e))),async function(e){const t=await WA.room.getTiledMap();e=null!=e?e:n,D=await p();const o=t.layers.find((e=>"configuration"===e.name));if(o){const t=new r(o.properties).getString("tag");t&&!WA.player.tags.includes(t)||WA.ui.registerMenuCommand("Configure the room",(()=>{WA.nav.openCoWebSite(e+"/configuration.html",!0)}));for(const e of D.values()){const t=new r(e.properties),o=t.getString("openConfig");o&&"tilelayer"===e.type&&Z(o.split(","),e.name,t)}}}().catch((e=>console.error(e))),U().catch((e=>console.error(e))),G().catch((e=>console.error(e)))})).catch((e=>console.error(e)))}}},t={};function o(r){var n=t[r];if(void 0!==n)return n.exports;var i=t[r]={exports:{}};return e[r](i,i.exports,o),i.exports}o.d=(e,t)=>{for(var r in t)o.o(t,r)&&!o.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})},o.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),o.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},(()=>{const e=o(640);console.log("Script started successfully"),WA.onInit().then((()=>{console.log("Scripting API ready"),console.log("Player tags: ",WA.player.tags),WA.player.tags.includes("editor")&&(WA.room.showLayer("exitNorthConfig"),WA.room.showLayer("exitSouthConfig"),WA.room.showLayer("exitWestConfig"),WA.room.showLayer("exitEastConfig")),(0,e.bootstrapExtra)().then((()=>{console.log("Scripting API Extra ready")})).catch((e=>console.error(e)))})).catch((e=>console.error(e)))})()})();
//# sourceMappingURL=script.js.map