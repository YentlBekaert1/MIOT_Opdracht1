export default function Showfoodcorner() {
    var element =  document.createElement("div");
    var title = document.createElement("h1");
    title.innerHTML = "Foodcorner";
    element.appendChild(title);
    element.id = "mainpanelappcontent";
    return element;  
  }
  