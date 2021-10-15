export var access_token = "";

export default function Showdashboard() {
    var element =  document.createElement("div");
    var title = document.createElement("h1");
    title.innerHTML = "Dashboard";
    element.appendChild(title);
    element.id = "mainpanelappcontent";

    return element;  
  }


