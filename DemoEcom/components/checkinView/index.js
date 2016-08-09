'use strict';

app.checkinView = kendo.observable({
    
    scan: function() {
            cordova.plugins.barcodeScanner.scan(
                function(result) {
                    
                    //navigator.notification.alert(result.text);
                    var query = result.text;
                    
                    var arrtext = query.split(",");
                    var final;
                    
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
                            
                            if(pair[0].match("id")){
                                 final = pair[1];
                            }
                            
                            
                        }
                    } 
                    
                    
                    navigator.notification.alert(final);
                    
                    
              
                    //var navi_parameters = "components/detailsproducts/view.html?id="+result.text;
                    //app.mobileApp.navigate(navi_parameters);
                 
                   
                }, 
                function(error) {
                    	navigator.notification.alert(error);
                });
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