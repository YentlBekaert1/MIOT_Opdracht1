/*Eigen geschreven API om verbinding te maken met Strava.*/

function getQueryVariable(variable)
        {
              var query = window.location.search.substring(1);
              var vars = query.split("&");
              for (var i=0;i<vars.length;i++) {
                      var pair = vars[i].split("=");
                      if(pair[0] == variable){return pair[1];}
              }
              return(false);
        }

var id = getQueryVariable("id");

var access_token = "token";
var activity_data;
var total_graph_data;

export default function reAuthorize(){
    const auth_link = "https://www.strava.com/oauth/token"
    fetch(auth_link,{
        method: 'post',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'

        },

        body: JSON.stringify({

            client_id: '33929',
            client_secret: '0c46ee1b55778e235eef2ad1dcdb0610ce311c3a',
            refresh_token: 'f59266e61a4d9e07dcef9434a03068e53d099086',
            grant_type: 'refresh_token'
        })
    })
    .then(res => res.json())
    .then(function(data){ 
        return data.access_token;
    })
};


// verkrijg een lijst van ativiteiten voor op de indexpagina
function getListOfActivities(){
    reAuthorize();
    getList();    
}

function getList(){
    const activities_link = `https://www.strava.com/api/v3/athlete/activities?per_page=20&access_token=${access_token}`
    fetch(activities_link)
        .then((res) => res.json())
        .then(function(data){
            //console.log(data);
            //console.log(data.length);
            for(var a=0; a<data.length; a++){
                //console.log(data[a].id);
                var links = document.createElement("a");
                var text = document.createTextNode(data[a].start_date_local +" - "+ data[a].name);
                links.appendChild(text);
                links.href= "graphs.html?id=" + data[a].id;
                var element = document.getElementById("links");
                    element.appendChild(links);
                var enter = document.createElement("br");
                element.appendChild(enter);
            }

        })
        
        
}

function Show_Activity_by_page_load(){
    reAuthorize();
    setTimeout(function(){ getActivityByid() }, 800);
    setTimeout(function(){ showTotalGraphs() }, 800);
    setTimeout(function(){ document.getElementById("screen").style.visibility = "visible"; }, 100);
}

function getActivityByid(){
    //get activitie details
    const activitie_link = `https://www.strava.com/api/v3/activities/${id}?include_all_efforts="true"&access_token=${access_token}`
    fetch(activitie_link)
    .then((res) => res.json())
        .then(function(data){ 
            activity_data = data; 
            console.log(activity_data); 
            showActivityData();});
    
}

function showActivityData(){

    var mymap = L.map('mapid').setView(activity_data.start_latlng, 10);
            L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
                    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
                    maxZoom: 18,
                    id: 'mapbox/streets-v11',
                    tileSize: 512,
                    zoomOffset: -1,
                    accessToken: 'pk.eyJ1IjoiYmVla2llIiwiYSI6ImNrOWltaGV2aTAycGMzbHF6OTdkbDF0MDkifQ.MUNwNyLsnkTBIz1yKK1etQ'
             }).addTo(mymap);

             var coordinates = L.Polyline.fromEncoded(activity_data.map.summary_polyline).getLatLngs()
             L.polyline(

                 coordinates,
                 {
                     color:"red",
                     weight:5,
                     opacity:.7,
                     lineJoin:'round'
                 }

             ).addTo(mymap)

             var start_circle = L.circle(activity_data.start_latlng, {
                color: 'white',
                fillColor: 'green',
                fillOpacity: 0.5,
            }).addTo(mymap);
            
            if(activity_data.name){
                document.getElementById("Activity_name").innerHTML = activity_data.name
            }
            if(activity_data.moving_time){
                    var date =  new Date(null);
                     date.setSeconds( activity_data.moving_time);
                     date.setHours(date.getHours() - 1);

                     function checkTime(i) {
                        return (i < 10) ? "0" + i : i;
                    }

                     var h = checkTime(date.getHours());
                     var m = checkTime(date.getMinutes());
                     var s = checkTime(date.getSeconds());

                document.getElementById("head1").innerHTML = h + ":" + m + ":" + s;
            }
            if(activity_data.distance){
                var dist = (activity_data.distance / 1000).toFixed(2).toString();
                document.getElementById("head2").innerHTML = dist.replace(".",",");
            }
            if(activity_data.total_elevation_gain){
                document.getElementById("head3").innerHTML = activity_data.total_elevation_gain;
            }
            if(activity_data.type){
                document.getElementById("head_type").innerHTML = activity_data.type;
            }

            if(activity_data.average_speed){
               var tr = document.createElement("tr");
                tr.id = "Samv_snel";
                var table = document.getElementById("Act_samenv").appendChild(tr);
                var td = document.createElement("td");
                var td2 = document.createElement("td");
                var text = document.createTextNode("Snelheid");
                var gem = document.createTextNode((activity_data.average_speed*3.6).toFixed(2) + " km/h");
                var max = document.createTextNode((activity_data.max_speed*3.6).toFixed(2) + " km/h");
                td.appendChild(gem);
                td2.appendChild(max);
                td.id = "gemsnel";
                td2.id = "maxsnel";
                var element = document.getElementById("Samv_snel");
                    element.appendChild(text);
                    element.appendChild(td);
                    element.appendChild(td2);
            }
            if(activity_data.average_heartrate & activity_data.max_heartrate){
                var tr = document.createElement("tr");
                tr.id = "Samv_hart";
                var table = document.getElementById("Act_samenv").appendChild(tr);
                var td = document.createElement("td");
                var td2 = document.createElement("td");
                var text = document.createTextNode("Hartslag");
                var gem = document.createTextNode(Math.floor(activity_data.average_heartrate) + " bpm");
                var max = document.createTextNode(activity_data.max_heartrate + " bpm");
                td.appendChild(gem);
                td2.appendChild(max);
                td.id = "gemhart";
                td2.id = "maxhart";
                var element = document.getElementById("Samv_hart");
                    element.appendChild(text);
                    element.appendChild(td);
                    element.appendChild(td2);
            }
            if(activity_data.average_watts & activity_data.max_watts){
               var tr = document.createElement("tr");
                tr.id = "Samv_vrm";
                var table = document.getElementById("Act_samenv").appendChild(tr);
                var td = document.createElement("td");
                var td2 = document.createElement("td");
                var text = document.createTextNode("Vermogen");
                var gem = document.createTextNode(activity_data.average_watts.toFixed(0) + " W");
                var max = document.createTextNode(activity_data.max_watts + " W");
                td.appendChild(gem);
                td2.appendChild(max);
                td.id = "gemvrm";
                td2.id = "maxvrm";
                var element = document.getElementById("Samv_vrm");
                    element.appendChild(text);
                    element.appendChild(td);
                    element.appendChild(td2);
            }
            if(activity_data.average_cadence){
                var tr = document.createElement("tr");
                tr.id = "Samv_cad";
                var table = document.getElementById("Act_samenv").appendChild(tr);
                var td = document.createElement("td");
                var td2 = document.createElement("td");
                var text = document.createTextNode("Cadance");
                var gem = document.createTextNode(activity_data.average_cadence.toFixed(0));
                td.appendChild(gem);
                td.id = "gemcad";
                var element = document.getElementById("Samv_cad");
                    element.appendChild(text);
                    element.appendChild(td);
            }
            if(activity_data.average_heartrate){
                var tr = document.createElement("tr");
                tr.id = "Samv_cal";
                var table = document.getElementById("Act_samenv").appendChild(tr);
                var td = document.createElement("td");
                var td2 = document.createElement("td");
                var text = document.createTextNode("Caloriën");
                var gem = document.createTextNode(activity_data.average_heartrate + " kcal");
                td.appendChild(gem);
                td.id = "gemcal";
                var element = document.getElementById("Samv_cal");
                    element.appendChild(text);
                    element.appendChild(td);
            }
            if(activity_data.average_temp){
                var tr = document.createElement("tr");
                tr.id = "Samv_temp";
                var table = document.getElementById("Act_samenv").appendChild(tr);
                var td = document.createElement("td");
                var td2 = document.createElement("td");
                var text = document.createTextNode("Temperatuur");
                var gem = document.createTextNode(activity_data.average_temp + "°C");
                td.appendChild(gem);
                td.id = "gemtemp";
                var element = document.getElementById("Samv_temp");
                    element.appendChild(text);
                    element.appendChild(td);
            }

            if(activity_data.laps){
                var table = document.createElement("table");
                table.id = "laps_table";
                document.getElementById("lap_details").appendChild(table);
                document.getElementById("laps_table").innerHTML = "<thead><tr><th>Ronde</th><th>Afstand</th><th>Tijd</th><th>Snelheid</th><th>Hartslag</th><th>Vermogen</th></tr></thead><tbody id='laps_body_id'></tbody>";

                for(var x=0; x<activity_data.laps.length; x++){
                    var tr = document.createElement("tr");
                    tr.id = x;
                    //tr.className = "non-active";
                    document.getElementById("laps_body_id").appendChild(tr);

                    if(activity_data.laps[x].lap_index){
                        var ronde = document.createElement("td");
                        var ronde_text = document.createTextNode(activity_data.laps[x].lap_index);
                        ronde.appendChild(ronde_text);
                        document.getElementById(x).appendChild(ronde);
                    }else{
                        var ronde = document.createElement("td");
                        document.getElementById(x).appendChild(ronde);
                    }

                   if(activity_data.laps[x].distance){
                        var afstand = document.createElement("td");
                        var afstand_text = document.createTextNode((activity_data.laps[x].distance / 1000).toFixed(2) + " km");
                        afstand.appendChild(afstand_text);
                        document.getElementById(x).appendChild(afstand);

                   }else{
                        var afstand = document.createElement("td");
                        document.getElementById(x).appendChild(afstand);
                   }
                    if(activity_data.laps[x].elapsed_time){
                        var date =  new Date(null);
                        date.setSeconds(activity_data.laps[x].elapsed_time);
                        date.setHours(date.getHours() - 1);
                        function checkTime(i) {
                        return (i < 10) ? "0" + i : i;
                        }
                        var h = checkTime(date.getHours());
                        var m = checkTime(date.getMinutes());
                        var s = checkTime(date.getSeconds());
                        var tijd = document.createElement("td");
                        var tijd_text = document.createTextNode(h + ":" + m + ":" + s);
                        tijd.appendChild(tijd_text);
                        document.getElementById(x).appendChild(tijd);
                    }else{
                        var tijd = document.createElement("td");
                        document.getElementById(x).appendChild(tijd);
                    }

                    if(activity_data.laps[x].average_speed){
                        var snelheid = document.createElement("td");
                        var snelheid_text = document.createTextNode((activity_data.laps[x].average_speed * 3.6).toFixed(1) + " km/h");
                        snelheid.append(snelheid_text);    
                        document.getElementById(x).appendChild(snelheid);
                    }else{
                        var snelheid = document.createElement("td");
                        document.getElementById(x).appendChild(snelheid);
                    }

                    if(activity_data.laps[x].average_heartrate){
                        var hartslag = document.createElement("td");
                        var hartslag_text = document.createTextNode((activity_data.laps[x].average_heartrate).toFixed(0) +" bpm");
                        hartslag.append(hartslag_text);
                        document.getElementById(x).appendChild(hartslag);
                    }else{
                        var hartslag = document.createElement("td");
                        document.getElementById(x).appendChild(hartslag);
                    }

                    if(activity_data.laps[x].average_watts){
                        var vermogen = document.createElement("td");
                        var vermogen_text = document.createTextNode((activity_data.laps[x].average_watts).toFixed(0) + " W");
                        vermogen.appendChild(vermogen_text);
                        document.getElementById(x).appendChild(vermogen);
                    }else{
                        var vermogen = document.createElement("td");
                        document.getElementById(x).appendChild(vermogen);
                    }


                    document.getElementById(x).addEventListener("click", function(){
                        showLapsGraphs(parseInt((this.id), 10));
                      });
                    
                }
            
                var btn_tot = document.createElement("button");
                btn_tot.className = "btn_primary";
                btn_tot.id = "btn_tot"
                tot = document.createTextNode("Totaal");
                btn_tot.appendChild(tot);  
                document.getElementById("laps").appendChild(btn_tot);
                document.getElementById("btn_tot").addEventListener("click", function(){totalGraphData();});

            }
            
            

}

function showLapsGraphs(lap_number){

    document.getElementById(lap_number).className = "active_lap";

    for(i = 0; i<lap_number; i++){
        document.getElementById(i.toString()).className = "";
    }
    for(i = lap_number + 1; i<activity_data.laps.length; i++){
        document.getElementById(i.toString()).className = "";
    }
      
      // -------------------- Berekenen Graphs Laps ---------------------------------------------------------
        var time = [];

        var start_tijd_lap = 0;
        start_tijd_lap = activity_data.laps[lap_number].start_index;

        var stop_tijd_lap = 0;
        stop_tijd_lap = activity_data.laps[lap_number].end_index;

        if(total_graph_data.time){
            
            for(var x = start_tijd_lap; x < stop_tijd_lap + 1; x++){
                var date =  new Date(null);
                date.setSeconds( total_graph_data.time.data[x]);
                date.setHours(date.getHours() - 1);
                    function checkTime(i) {
                    return (i < 10) ? "0" + i : i;
                }
                    var h = checkTime(date.getHours());
                    var m = checkTime(date.getMinutes());
                    var s = checkTime(date.getSeconds());

                    time.push(h + ":" + m + ":" + s);
            }
        }

        var alt_data = [];
        var hart_data = [];
        var power_data = [];
        var cadence_data = [];
        var speed_data = [];

            for(var ad = start_tijd_lap; ad < stop_tijd_lap; ad++){
                if(total_graph_data.altitude){
                    alt_data.push(total_graph_data.altitude.data[ad]);
                }
                if(total_graph_data.heartrate){
                    hart_data.push(total_graph_data.heartrate.data[ad]);
                }
                if(total_graph_data.watts){
                    power_data.push(total_graph_data.watts.data[ad]);
                }
                if(total_graph_data.watts){
                    power_data.push(total_graph_data.watts.data[ad]);
                }
                if(total_graph_data.cadence){
                   cadence_data.push(total_graph_data.cadence.data[ad]);
                }
                if(total_graph_data.velocity_smooth){
                   speed_data.push(total_graph_data.velocity_smooth.data[ad] * 3.6);
                 }
                 
            } 

        if(total_graph_data.altitude){
            document.getElementById("graph_alt_div3").remove();
            document.getElementById("graph_alt_div2").remove();
            document.getElementById("graph_alt_div1").remove();
            createAltidtudeGraph(time, alt_data);
        }
        if(total_graph_data.velocity_smooth){
            document.getElementById("graph_spd_div3").remove();
            document.getElementById("graph_spd_div2").remove();
            document.getElementById("graph_spd_div1").remove();
            createSpeedGraph(time, speed_data);
        } 

        if(total_graph_data.heartrate){
            document.getElementById("graph_hart_div3").remove();
            document.getElementById("graph_hart_div2").remove();
            document.getElementById("graph_hart_div1").remove();
            createHaertrateGraph(time, hart_data);
            
        }
        if(total_graph_data.watts){ 
            document.getElementById("graph_pow_div3").remove();
            document.getElementById("graph_pow_div2").remove();
            document.getElementById("graph_pow_div1").remove();
            createPowerGraph(time, power_data);  
        }
        if(total_graph_data.cadence){
            document.getElementById("graph_cad_div3").remove();
            document.getElementById("graph_cad_div2").remove();
            document.getElementById("graph_cad_div1").remove();
            createCadenceGraph(time, cadence_data);
        } 


}

function showTotalGraphs(){
    const activitie_steam_link = `https://www.strava.com/api/v3/activities/${id}/streams?keys=heartrate,time,watts,cadence,altitude,moving,velocity_smooth&key_by_type=true&access_token=${access_token}`
    fetch(activitie_steam_link)
        .then((res) => res.json())
        .then(function(data){
            total_graph_data = data;
            console.log(total_graph_data);
            totalGraphData();
            
        })  
}

function totalGraphData(){
                const time = [];
                for(var x= 0; x<total_graph_data.time.data.length; x++){
                     var date =  new Date(null);
                     date.setSeconds( total_graph_data.time.data[x]);
                     date.setHours(date.getHours() - 1);
                     function checkTime(i) {
                     return (i < 10) ? "0" + i : i;
                     }
                     var h = checkTime(date.getHours());
                     var m = checkTime(date.getMinutes());
                     var s = checkTime(date.getSeconds());
 
                     time.push(h + ":" + m + ":" + s);
                } 
                //console.log(time);
                const speed = [];
                for(var x=0; x<total_graph_data.velocity_smooth.data.length; x++){
                    var speed_t = total_graph_data.velocity_smooth.data[x] * 3.6;
                    speed.push(speed_t);
                }

                const distance = [];
                for(var d=0; d<total_graph_data.distance.data.length; d++){
                        var dist = Math.floor(total_graph_data.distance.data[d]/1000);
                        distance.push(dist);
                }

            if(total_graph_data.altitude){
                    if( document.getElementById("graph_alt_div3")){
                        document.getElementById("graph_alt_div3").remove();
                        document.getElementById("graph_alt_div2").remove();
                        document.getElementById("graph_alt_div1").remove();
                        createAltidtudeGraph(time, total_graph_data.altitude.data);
                       }else{
                        createAltidtudeGraph(time, total_graph_data.altitude.data);
                       } 
            }
            if(total_graph_data.velocity_smooth){
                if( document.getElementById("graph_spd_div3")){
                    document.getElementById("graph_spd_div3").remove();
                    document.getElementById("graph_spd_div2").remove();
                    document.getElementById("graph_spd_div1").remove();
                    createSpeedGraph(time, speed);
                }else{
                    createSpeedGraph(time, speed);
                }  
                
            }
            if(total_graph_data.heartrate){
                if( document.getElementById("graph_hart_div3")){
                    document.getElementById("graph_hart_div3").remove();
                    document.getElementById("graph_hart_div2").remove();
                    document.getElementById("graph_hart_div1").remove();
                    createHaertrateGraph(time, total_graph_data.heartrate.data);
                }else{
                    createHaertrateGraph(time, total_graph_data.heartrate.data);
                }
            }
            if(total_graph_data.watts){ 
                if( document.getElementById("graph_pow_div3")){
                    document.getElementById("graph_pow_div3").remove();
                    document.getElementById("graph_pow_div2").remove();
                    document.getElementById("graph_pow_div1").remove();
                    createPowerGraph(time, total_graph_data.watts.data);
                }else{
                    createPowerGraph(time, total_graph_data.watts.data);
                }  
            }
              
            if(total_graph_data.cadence){
                if( document.getElementById("graph_cad_div3")){
                    document.getElementById("graph_cad_div3").remove();
                    document.getElementById("graph_cad_div2").remove();
                    document.getElementById("graph_cad_div1").remove();
                    createCadenceGraph(time, total_graph_data.cadence.data);
                }else{
                    createCadenceGraph(time, total_graph_data.cadence.data);
                }  
                
            }
           
}

//fucties om de grafieken te genereren
var graph_height = "15vh";

function createAltidtudeGraph(x,y){
            var graph_alt_div1 = document.createElement("div");
                graph_alt_div1.className = "row";
                graph_alt_div1.id = "graph_alt_div1";
            document.getElementById("graphs").appendChild(graph_alt_div1);

            var graph_alt_div2 = document.createElement("div");
                graph_alt_div2.className = "col-12";
                graph_alt_div2.id = "graph_alt_div2";
            document.getElementById("graph_alt_div1").appendChild(graph_alt_div2);

            var graph_alt_div3 = document.createElement("div");
                graph_alt_div3.className = "chart-container";
                graph_alt_div3.id = "graph_alt_div3";
                graph_alt_div3.style.width = "100%";
                graph_alt_div3.style.height = graph_height;
            document.getElementById("graph_alt_div2").appendChild(graph_alt_div3);


            var chart = document.createElement("canvas");
                chart.id = "altitude_chart";
                chart.style.width = "100";
                chart.style.height = "100";
            document.getElementById("graph_alt_div3").appendChild(chart);    
        
    
            const ctx_alt = document.getElementById('altitude_chart').getContext('2d');
                        const chart_alt = new Chart(ctx_alt, {
                            type: 'line',
                            data: {
                                labels: x,
                                datasets: [{
                                    label: 'Altitude',
                                    backgroundColor:  'rgba(0, 0, 0, 0.2)',
                                    borderColor:  '#595957',
                                    fill: true,
                                    data: y, 
                                    borderWidth: 1,
                                    pointRadius: 0
                                }]
                            },
                            options: {
                                maintainAspectRatio	: false,
                                responsive: true,
                                scales: {
                                    yAxes: [{
                                        ticks: {
                                            labelOffset: 1,
                                        }
                                    }],
                                    xAxes: [{
                                        gridLines:{
                                            display: false,
                                        },
                                        ticks: {
                                            maxTicksLimit: 5,
                                            maxRotation: 0,
                                        }
                                    }]
                                },
                                legend: {
                                    display: false,
                                },
                                animation: {
                                    duration: 0
                                }
                            },
                            
                        });
}
function createHaertrateGraph(x,y){

            var graph_hart_div1 = document.createElement("div");
                graph_hart_div1.className = "row";
                graph_hart_div1.id = "graph_hart_div1";
            document.getElementById("graphs").appendChild(graph_hart_div1);

            var graph_hart_div2 = document.createElement("div");
                graph_hart_div2.className = "col-12";
                graph_hart_div2.id = "graph_hart_div2";
            document.getElementById("graph_hart_div1").appendChild(graph_hart_div2);

            var graph_hart_div3 = document.createElement("div");
                graph_hart_div3.className = "chart-container";
                graph_hart_div3.id = "graph_hart_div3";
                graph_hart_div3.style.width = "100%";
                graph_hart_div3.style.height =  graph_height;
            document.getElementById("graph_hart_div2").appendChild(graph_hart_div3);

            var chart = document.createElement("canvas");
                chart.id = "haertrate_chart";
                chart.style.width = "100";
                chart.style.height = "100";
            document.getElementById("graph_hart_div3").appendChild(chart);  

    const ctx_hr = document.getElementById('haertrate_chart').getContext('2d');
    const chart_hr = new Chart(ctx_hr, {
        type: 'line',
        data: {
            labels: x,
            datasets: [{
                label: 'Hartslag (BPM)',
                backgroundColor:  'rgba(255, 0, 0, 0.2)',
                borderColor:  'rgba(255, 0, 0, 0.8)',
                fill: true,
                data: y, 
                borderWidth: 1,
                pointRadius: 0
            }]
        },
        options: {
            maintainAspectRatio	: false,
            responsive: true,
            scales: {
                yAxes: [{
                    type: 'linear',
                    ticks: {
                        stepSize: 10
                        
                        
                    }
                }],
                xAxes: [{
                    //display: false
                    gridLines:{
                        display: false,
                    },
                    ticks: {
                        maxTicksLimit: 5,
                        maxRotation: 0,
                    }
                }]
            },
            legend: {
                display: false,
            },
            animation: {
                duration: 0
            }
        },
        
    });
}
function createPowerGraph(x,y){
            var graph_pow_div1 = document.createElement("div");
                graph_pow_div1.className = "row";
                graph_pow_div1.id = "graph_pow_div1"
            document.getElementById("graphs").appendChild(graph_pow_div1);

            var graph_pow_div2 = document.createElement("div");
                graph_pow_div2.className = "col-12";
                graph_pow_div2.id = "graph_pow_div2"
            document.getElementById("graph_pow_div1").appendChild(graph_pow_div2);

            var graph_pow_div3 = document.createElement("div");
                graph_pow_div3.className = "chart-container";
                graph_pow_div3.id = "graph_pow_div3"
                graph_pow_div3.style.width = "100%"
                graph_pow_div3.style.height =  graph_height;
            document.getElementById("graph_pow_div2").appendChild(graph_pow_div3);

            var chart = document.createElement("canvas");
                chart.id = "power_chart"
                chart.style.width = "100"
                chart.style.height = "100"
            document.getElementById("graph_pow_div3").appendChild(chart);  

    const ctx_p = document.getElementById('power_chart').getContext('2d');
                        const chart_p = new Chart(ctx_p, {
                            type: 'line',
                            data: {
                                labels: x,
                                datasets: [{
                                    label: 'Power',
                                    backgroundColor:  'rgba(221, 162, 255, 0.5)',
                                    borderColor:  '#C500FF',
                                    fill: true,
                                    data: y, 
                                    borderWidth: 1,
                                    pointRadius: 0
                                }]
                            },
                            options: {
                                maintainAspectRatio	: false,
                                responsive: true,
                                scales: {
                                    yAxes: [{
                                        ticks: {
                                            min: 0,
                                            labelOffset: 1,
                                            
                                        }
                                    }],
                                    xAxes: [{
                                        gridLines:{
                                            display: false,
                                        },
                                        ticks: {
                                            maxTicksLimit: 5,
                                            maxRotation: 0,
                                        }
                                    }]
                                },
                                legend: {
                                    display: false,
                                },
                                animation: {
                                    duration: 0
                                }
                            },
                            
                        });
}
function createCadenceGraph(x,y){
            var graph_cad_div1 = document.createElement("div");
                graph_cad_div1.className = "row";
                graph_cad_div1.id = "graph_cad_div1"
            document.getElementById("graphs").appendChild(graph_cad_div1);

            var graph_cad_div2 = document.createElement("div");
                graph_cad_div2.className = "col-12";
                graph_cad_div2.id = "graph_cad_div2"
            document.getElementById("graph_cad_div1").appendChild(graph_cad_div2);

            var graph_cad_div3 = document.createElement("div");
                graph_cad_div3.className = "chart-container";
                graph_cad_div3.id = "graph_cad_div3"
                graph_cad_div3.style.width = "100%"
                graph_cad_div3.style.height =  graph_height;
            document.getElementById("graph_cad_div2").appendChild(graph_cad_div3);

            var chart = document.createElement("canvas");
                chart.id = "cadence_chart"
                chart.style.width = "100"
                chart.style.height = "100"
            document.getElementById("graph_cad_div3").appendChild(chart); 

    const ctx_cad = document.getElementById('cadence_chart').getContext('2d');
                        const chart_cad = new Chart(ctx_cad, {
                            type: 'line',
                            data: {
                                labels: x,
                                datasets: [{
                                    label: 'Cadence',
                                    backgroundColor:  'rgba(255, 168, 153, 0.2)',
                                    borderColor:  '#EB9500',
                                    fill: true,
                                    data: y, 
                                    borderWidth: 1,
                                    pointRadius: 0
                                }]
                            },
                            options: {
                                maintainAspectRatio	: false,
                                responsive: true,
                                scales: {
                                    yAxes: [{
                                        ticks: {
                                            min: 50,
                                            labelOffset: 1,
                                            
                                        }
                                    }],
                                    xAxes: [{
                                        gridLines:{
                                            display: false,
                                        },
                                        ticks: {
                                            maxTicksLimit: 5,
                                            maxRotation: 0,
                                        }
                                    }]
                                },
                                legend: {
                                    display: false,
                                },
                                animation: {
                                    duration: 0
                                }
                            },
                            
                        });
}
function createSpeedGraph(x,y){
            var graph_spd_div1 = document.createElement("div");
                graph_spd_div1.className = "row";
                graph_spd_div1.id = "graph_spd_div1"
            document.getElementById("graphs").appendChild(graph_spd_div1);

            var graph_spd_div2 = document.createElement("div");
                graph_spd_div2.className = "col-12";
                graph_spd_div2.id = "graph_spd_div2"
            document.getElementById("graph_spd_div1").appendChild(graph_spd_div2);

            var graph_spd_div3 = document.createElement("div");
                graph_spd_div3.className = "chart-container";
                graph_spd_div3.id = "graph_spd_div3"
                graph_spd_div3.style.width = "100%"
                graph_spd_div3.style.height =  graph_height;
            document.getElementById("graph_spd_div2").appendChild(graph_spd_div3);

            var chart = document.createElement("canvas");
                chart.id = "speed_chart"
                chart.style.width = "100"
                chart.style.height = "100"
            document.getElementById("graph_spd_div3").appendChild(chart);

    const ctx_spd = document.getElementById('speed_chart').getContext('2d');
                        const chart_spd= new Chart(ctx_spd, {
                            type: 'line',
                            data: {
                                labels: x,
                                datasets: [{
                                    label: 'Speed',
                                    backgroundColor:  'rgba(0, 0, 255, 0.2)',
                                    borderColor:  '#006EEB',
                                    fill: true,
                                    data: y, 
                                    borderWidth: 1,
                                    pointRadius: 0
                                }]
                            },
                            options: {
                                maintainAspectRatio	: false,
                                responsive: true,
                                scales: {
                                    yAxes: [{
                                        ticks: {
                                            min: 0,
                                            labelOffset: 1,
                                            
                                        }
                                    }],
                                    xAxes: [{
                                        gridLines:{
                                            display: false,
                                        },
                                        ticks: {
                                            maxTicksLimit: 5,
                                            maxRotation: 0,
                                        }
                                    }]
                                },
                                legend: {
                                    display: false,
                                },
                                animation: {
                                    duration: 0
                                }
                            },
                            
                        });
}

