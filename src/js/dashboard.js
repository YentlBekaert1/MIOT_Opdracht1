
import AbstractView from "./abstractView";
import {reAuthorize} from "./strava_api_v2"
import {getList} from "./strava_api_v2"

export var access_token = "";

export default class extends AbstractView {
      constructor(params) {
          super(params);
          this.setTitle("Dashboard");
      }
  
      async getHtml() {
        let dashboard_div = document.createElement('div');
        dashboard_div.id = "dashboard";
        let title = document.createElement('h1');
        title.innerText = "Welcome back, ..."
        dashboard_div.appendChild(title);

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
                  links.href = "/activitydetail/" + data[a].id; 
                  dashboard_div.appendChild(links);
                  var enter = document.createElement("br");
                  dashboard_div.appendChild(enter);
      
                  var act_obj = {"name":data[a].name,"summery":data[a].description,"activity_id":data[a].id,"user_id":1};
                  data_to_send.push(act_obj);
                }
          });
        return dashboard_div;
      }
  }
