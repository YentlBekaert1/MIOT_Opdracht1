export default function Showperformances() {
    var element =  document.createElement("div");
    var title = document.createElement("h1");
    title.innerHTML = "Performances";
    element.appendChild(title);
    element.id = "mainpanelappcontent";
    return element;  
  }
  