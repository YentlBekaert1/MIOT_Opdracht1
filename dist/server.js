(()=>{var t={56:(t,e,s)=>{var o=s(860).Router();o.get("/",(function(t,e,s){e.status(200).json({message:"Handling GET requests to /products"})})),o.post("/",(function(t,e,s){e.status(201).json({message:"Handling POST requests to /products"})})),o.get("/:productId",(function(t,e,s){var o=t.params.productId;"special"===o?e.status(200).json({message:"You discovered the special ID",id:o}):e.status(200).json({message:"You passed an ID"})})),o.patch("/:productId",(function(t,e,s){e.status(200).json({message:"Updated product!"})})),o.delete("/:productId",(function(t,e,s){e.status(200).json({message:"Deleted product!"})})),t.exports=o},860:t=>{"use strict";t.exports=require("express")}},e={};function s(o){var n=e[o];if(void 0!==n)return n.exports;var r=e[o]={exports:{}};return t[o](r,r.exports,s),r.exports}s.n=t=>{var e=t&&t.__esModule?()=>t.default:()=>t;return s.d(e,{a:e}),e},s.d=(t,e)=>{for(var o in e)s.o(e,o)&&!s.o(t,o)&&Object.defineProperty(t,o,{enumerable:!0,get:e[o]})},s.o=(t,e)=>Object.prototype.hasOwnProperty.call(t,e),(()=>{"use strict";const t=require("path");var e=s.n(t),o=s(860),n=s.n(o),r=s(56),a=n()(),u=__dirname,i=e().join(u,"index.html");a.use(n().static(u)),a.get("/",(function(t,e){e.sendFile(i)})),a.get("/get",(function(t,e){e.json("test")})),a.use("/activities",r);var c=process.env.PORT||8080;a.listen(c,(function(){console.log("App listening to ".concat(c,"....")),console.log("Press Ctrl+C to quit.")}))})()})();