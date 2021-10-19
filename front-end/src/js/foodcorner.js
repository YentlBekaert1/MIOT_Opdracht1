import AbstractView from "./abstractView";

export default function Showfoodcorner(){

        let foodcorner_div = document.createElement('div');
        foodcorner_div.id = "foodcorner";
        let title = document.createElement('h1');
        title.innerText = "Foodcorner page"
        foodcorner_div.appendChild(title);

        let mainpannelappcontent = document.createElement('div');
          mainpannelappcontent.id = "mainpanelappcontent";
          mainpannelappcontent.appendChild(foodcorner_div);
          return mainpannelappcontent;      
  }