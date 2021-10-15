export default function Showcalendar() {
    var element =  document.createElement("div");
    var title = document.createElement("h1");
    title.innerHTML = "Calendar";
    element.appendChild(title);
    element.id = "mainpanelappcontent";
    return element;  
  }
  