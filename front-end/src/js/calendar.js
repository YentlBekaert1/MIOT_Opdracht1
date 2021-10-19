

export default function Showcalendar() {

          let calendar_div = document.createElement('div');
          calendar_div.id = "calendar";

          let mainpannelappcontent = document.createElement('div');
          mainpannelappcontent.id = "mainpanelappcontent";
          mainpannelappcontent.appendChild(calendar_div);
          return mainpannelappcontent;      
}