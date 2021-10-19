export async function reAuthorize() {
    const auth_link = "https://www.strava.com/oauth/token";
    const response = await fetch(auth_link,{
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
  });
const data = await response.json();
return data;
}

export async function getList(access_token){
    const activities_link = `https://www.strava.com/api/v3/athlete/activities?per_page=20&access_token=${access_token}`
    const response = await fetch(activities_link);
    const data = await response.json();
    return data;  
}

export async function getActivityByid(access_token, id){
    const activitie_link = `https://www.strava.com/api/v3/activities/${id}?include_all_efforts="true"&access_token=${access_token}`
    const response =  await fetch(activitie_link);
    const data = await response.json();
    return data; 
}

export async function showTotalGraphs(access_token, id){
    const activitie_steam_link = `https://www.strava.com/api/v3/activities/${id}/streams?keys=heartrate,time,watts,cadence,altitude,moving,velocity_smooth&key_by_type=true&access_token=${access_token}`
    const response = await fetch(activitie_steam_link);
    const data = await response.json();
    return data; 
}



