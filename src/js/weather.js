export default function Showweather() {
    var element =  document.createElement("div");
    var title = document.createElement("h1");
    title.innerHTML = "Weather";
    element.appendChild(title);
    element.id = "mainpanelappcontent";
    return element;  
  }
  