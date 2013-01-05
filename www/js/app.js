
  function getLocation() {
    document.getElementById('mapstatus').innerHTML = "Getting location, please wait..."
    var suc = function(p) {
       // alert(p.coords.latitude + " " + p.coords.longitude);
	   document.getElementById("textinputlat").value = p.coords.latitude;
	   document.getElementById("textinputlon").value = p.coords.longitude;
                var img = document.getElementById('mapimage');
                img.style.visibility = "visible";
                img.style.display = "block";
	   document.getElementById("mapimage").src = 'http://ojw.dev.openstreetmap.org/StaticMap/?mlat=' + p.coords.latitude + '&mlon=' + p.coords.longitude +'&zoom=16&layers=M&show=1&size=288x288';
    document.getElementById('mapstatus').innerHTML = "";
    };
    var locFail = function() {
	   document.getElementById("textinputlat").value = 'Unable to get latitude';
	   document.getElementById("textinputlon").value = 'Unable to get longitude';	   
                var img = document.getElementById('mapimage');
                img.style.visibility = "hidden";
                img.style.display = "none";
	   document.getElementById("mapimage").src = '';
         document.getElementById('mapstatus').innerHTML = "Unable to get location, please check your GPS settings"

    };
    navigator.geolocation.getCurrentPosition(suc, locFail);
};


    function takePicture() {
        navigator.camera.getPicture(
            function(uri) {
                var img = document.getElementById('camera_image');
                img.style.visibility = "visible";
                img.style.display = "block";
                img.src = uri;
                document.getElementById('camera_status').innerHTML = "";
            },
            function(e) {
                console.log("Error getting picture: " + e);
                document.getElementById('camera_status').innerHTML = "Error getting picture.";
            },
            { quality: 50, destinationType: navigator.camera.DestinationType.FILE_URI, sourceType: navigator.camera.PictureSourceType.CAMERA, 
			  targetWidth: 288, targetHeight: 288, correctOrientation: true});
    };


    function onConfirmQuit(button){
       if(button == "1"){
        navigator.app.exitApp(); 
    }
    };

    
    function exitApp() {
    
              navigator.notification.confirm(
                        'Do you want to quit?', 
                        onConfirmQuit, 
                        'Exit WASA Leak Reporter', 
                        'Yes,No'  
                    );
    }
    
function init() {
 
 document.addEventListener("backbutton", function () { 
              navigator.notification.confirm(
                        'Do you want to quit', 
                        onConfirmQuit, 
                        'Exit leak reporter', 
                        'OK,Cancel'  
                    );
            }, true); 
    getLocation();            
}

function reportLeak() {
  navigator.notification.vibrate();
  $.get('http://mobileapps.referencelogic.com/wasa-leak-reporter/json-api/add.php', 
          {email: document.getElementById("textinputemail").value,
           name: document.getElementById("textinputname").value,
           contactno: document.getElementById("textinputcontactno").value,
           lat: document.getElementById("textinputlat").value,
           lon: document.getElementById("textinputlon").value,
           comment: document.getElementById("commenttext").value},
            function(output){
                alert(output);
            }
        ).error(function() { alert("Could not report leak... Ensure you have an active Internet connection..."); });
}    
    

/*
            //App custom javascript
			
            //---------------------------------------
            // Button handlers
            //---------------------------------------
            function saveContactData() {
                var stringValue = "Hello World!";
                localStorage.setItem("string_key", stringValue);
            }



            function setit() {
                var stringValue = "Hello World!";
                localStorage.setItem("string_key", stringValue);
                document.getElementById("stringResponseText").innerHTML = 
                    "Set string value: " + stringValue;
            }
            function nullit() {
                localStorage.setItem("string_key", null);
                document.getElementById("stringResponseText").innerHTML = 
                    "Set string value to null.";
            }
            function getit() {
                var stringValue = localStorage.getItem("string_key"); 
                document.getElementById("stringResponseText").innerHTML = 
                    "Got string value: " + stringValue; 
            }
*/            
