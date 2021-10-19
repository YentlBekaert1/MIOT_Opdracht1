
import {reAuthorize} from "./strava_api_v2"
import {getList} from "./strava_api_v2"
import {GotoActivityDetail} from './navigation'

export var access_token = "";

export default function Showdashboard() {
    var element =  document.createElement("div");
    var title = document.createElement("h1");
    title.innerHTML = "Dashboard";
    element.appendChild(title);
    element.id = "mainpanelappcontent";

   new Promise(function(resolve, reject) {
      resolve(reAuthorize())
    }).then(data => {
        //console.log(data.access_token);
        access_token = data.access_token;  
        return  new Promise((resolve, reject) => {
          resolve(getList(access_token))
      });
    })
    .then(
        data =>{
          //console.log(data);
          var data_to_send = [];
          for(var a=0; a<data.length; a++){

            var links = document.createElement("a");
            var text = document.createTextNode(data[a].start_date_local +" - "+ data[a].name);
            links.appendChild(text);
            links.id = data[a].id
            links.className = "activity"
            element.appendChild(links);
            var enter = document.createElement("br");
            element.appendChild(enter);

            var act_obj = {"name":data[a].name,"summery":data[a].description,"activity_id":data[a].id,"user_id":1};
            data_to_send.push(act_obj);
          }
          const activitys = document.getElementsByClassName("activity");
          for(var i = 0; i < activitys.length; i++) {
              //console.log(activitys[i].id);
              //activitys[i].onclick =  function (){GotoActivityDetail(this.id)};
          }
    });
    return element;  
  }


