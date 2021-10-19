

export default function Showperformances() {

        let performances_div = document.createElement('div');
        performances_div.id = "performances";
        let title = document.createElement('h1');
        title.innerText = "Performances page"
        performances_div.appendChild(title);

        let mainpannelappcontent = document.createElement('div');
          mainpannelappcontent.id = "mainpanelappcontent";
          mainpannelappcontent.appendChild(performances_div);     
        return performances_div;
    
  }