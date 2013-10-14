
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
    };


  function getContactData() {

    document.getElementById("textinputemail").value = "" + localStorage.getItem("wlremail");
    if ( document.getElementById("textinputemail").value == "null") { document.getElementById("textinputemail").value = ""; }

    document.getElementById("textinputname").value = "" + localStorage.getItem("wlrname");
    if ( document.getElementById("textinputname").value == "null") { document.getElementById("textinputname").value = ""; }

    document.getElementById("textinputcontactno").value = "" + localStorage.getItem("wlrcontactno");
    if ( document.getElementById("textinputcontactno").value == "null") { document.getElementById("textinputcontactno").value = ""; }

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
   getContactData();
   
   $("#textinputemail").change(function() { localStorage.setItem("wlremail", "" + document.getElementById("textinputemail").value); });
   $("#textinputname").change(function() { localStorage.setItem("wlrname", "" + document.getElementById("textinputname").value); });
   $("#textinputcontactno").change(function() { localStorage.setItem("wlrcontactno", "" + document.getElementById("textinputcontactno").value); });
       
}

/*
Originally from http://stackoverflow.com/questions/934012/get-image-data-in-javascript
*/
function getBase64Image(img) {
    // Create an empty canvas element
    var canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;

    // Copy the image contents to the canvas
    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);

    // Get the data-URL formatted image
    // Firefox supports PNG and JPEG. You could check img.src to
    // guess the original format, but be aware the using "image/jpg"
    // will re-encode the image.
    var dataURL = canvas.toDataURL("image/png");

    return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
}

function sendEmail(){
  try {
    var contactmessage = "";
    if (document.getElementById('camera_image').src != "") {
      alert("Attaching Picture from Camera\n" + document.getElementById('camera_image').src);
    }
    if (document.getElementById("textinputcontactno").value != "") {
      contactmessage = "You can contact me at " + document.getElementById("textinputcontactno").value + ".";
    }
    var commenttext =  document.getElementById("commenttext").value;
    var subject = "Reporting leak";
    var body = "<html><body><p>Dear WASA,<br/>I would like to report a leak at the GPS co-ordinates:<br/>Latitude: " +
      document.getElementById("textinputlat").value + "<br/>Longitude: " + document.getElementById("textinputlon").value +
      "</p><p>You can see the location from the map attached.<br/> </p>" + 
       "<p>" + commenttext + "</p>" +
       "<p>" + contactmessage + "</p></body></html>";
    var toRecipients = ["customercomplaint@wasa.gov.tt"];
    var ccRecipients = [];
    var bccRecipients = [];
    var isHtml = true;
    //var attachments = ["http://ojw.dev.openstreetmap.org/StaticMap/?mlat=" + document.getElementById("textinputlat").value + "&mlon=" +
    //   document.getElementById("textinputlon").value +"&zoom=16&layers=M&show=1&size=288x288"];
    var attachments = [];
    if (document.getElementById('camera_image').src != "") {
      attachments = [document.getElementById('camera_image').src];
    }
    var attachmentsData = [['map.jpg', getBase64Image(document.getElementById("mapimage"))]];
    window.plugins.emailComposer.showEmailComposerWithCallback(null,subject,body,toRecipients,ccRecipients,bccRecipients,isHtml,attachments,attachmentsData);
    
  } catch (ex) {
    alert(ex);
  }
}

function sendToWebsite() {
  var result = true;
  /*
  $.post('http://mobileapps.referencelogic.com/wasa-leak-reporter/json-api/add.php', 
          {email: document.getElementById("textinputemail").value,
           name: document.getElementById("textinputname").value,
           contactno: document.getElementById("textinputcontactno").value,
           lat: document.getElementById("textinputlat").value,
           lon: document.getElementById("textinputlon").value,
           comment: document.getElementById("commenttext").value},
            function(output){
                alert(output);
            }
        ).error(function() { alert("Could not report leak... Ensure you have an active Internet connection..."); result=false; });
        */
  return result;
}

function reportLeak() {
  if (sendToWebsite()) {
    sendEmail();
  }
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
