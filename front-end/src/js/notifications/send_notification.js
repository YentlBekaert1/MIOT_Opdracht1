import '../util'

export default async function send_notification(element){
   
        const pushBtn  = element.querySelector("#notification_button");

   
        
        function sendMessage() {
            
            return fetch('./push/notify-demo', {
                method: 'post',
                headers: {
                    'Content-type': 'application/json'
                },
                
            })
        }
    
        if ((navigator.serviceWorker && 'PushManager' in window)) {
            pushBtn.addEventListener('click', function(event) {
                event.preventDefault();
                    sendMessage();
            });
    }
}