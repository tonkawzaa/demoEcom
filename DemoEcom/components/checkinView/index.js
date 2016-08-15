'use strict';

app.checkinView = kendo.observable({
    
    scan: function() {
            cordova.plugins.barcodeScanner.scan(
                function(result) {
                    
                    //navigator.notification.alert(result.text);
                    var query = result.text;
                    
                    var arrtext = query.split(",");
                    
                    
                    for (var i=0;i<arrtext.length;i++) {
                        var pair = arrtext[i].split("=");
                        if(pair[1])
                        {
                            /*
                            if(!final){
                                final = pair[1];
                            } else{
                                final = final+pair[1];
                            }
                            */
                            
                            if(pair[0].match("merchant_client_id")){
                                 merchant_client_id = pair[1];
                            }
                        }
                    } 
                    
                   // navigator.notification.alert(final);
                    var access_token = null;
        	        access_token = localStorage.getItem("access_token");
                  
                            $.ajax({
                           type: "POST",
                           url: server_location+"/api/pos/check_in",
                           contentType: "application/json",
                           data: JSON.stringify({ client_id: client_id,
                                                  client_secret:client_secret,
                                                  access_token:access_token,
                                                  merchant_client_id:merchant_client_id,
                                               }),
                           success: function(result) {
                                
                               //navigator.notification.alert(result.success);
                               if (result.success)
                               {
                                   app.mobileApp.navigate('components/categoriesView/view.html');
                               }else{
                                   app.mobileApp.navigate(result);
                               }
                          },
                            error: function(result) {
                                navigator.notification.alert(result.error_message);
                                //navigator.notification.alert("ระบบผิดพลาด");
                                // app.mobileApp.navigate('components/earn/view.html');
                         },
                         });
                    
                    
                  
              
                    //var navi_parameters = "components/detailsproducts/view.html?id="+result.text;
                    //app.mobileApp.navigate(navi_parameters);
                }, 
                function(error) {
                    	navigator.notification.alert(error);
                });
        },
    session:function(){
        ///var keyName = window.sessionStorage.key(0); //Get key name
        window.sessionStorage.setItem("Top", 444); //Set item
        var value = window.sessionStorage.getItem("Top");// Get item
        navigator.notification.alert(value);
        
    },
    clear:function(){
        //window.sessionStorage.removeItem("top"); //Remove Item 
       window.sessionStorage.clear();//Clear storage
        
    },
    
    onShow: function() {},
    afterShow: function() {}
});

// START_CUSTOM_CODE_settingsView
// Add custom code here. For more information about custom code, see http://docs.telerik.com/platform/screenbuilder/troubleshooting/how-to-keep-custom-code-changes
(function () {
    
    app.checkinView.set('title', "checkinView");
    
})();
// END_CUSTOM_CODE_settingsView