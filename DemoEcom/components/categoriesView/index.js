'use strict';

app.categoriesView = kendo.observable({
    onShow: function(e) {
        var access_token = null;
        	access_token = localStorage.getItem("access_token");
        
        
                    $.ajax({
                            type: "POST",
                            url: server_location+"/api/pos/categories",
                            contentType: "application/json; charset=utf-8",
                            data: JSON.stringify({ 
                                                client_id:client_id,
                                                client_secret:client_secret,
                                                access_token:access_token,
                                                merchant_client_id:merchant_client_id,
                                             }),
                            dataType: "json",
                            success: function (result) {
                                //navigator.notification.alert(result);
                                
                                e.view.element.find("#categorieslist").kendoMobileListView({
        			            template: kendo.template($("#categorieslisttmp").html()),
        			            dataSource: result.categories,
                                    });
                                 
                                
                                
                                
                             },
                            error: function(result) {
                                navigator.notification.alert(result);   
                               //navigator.notification.alert("เชื่อมต่อข้อมูล gifts ผิดพลาด"); 
                            },
                  });
    },
    afterShow: function() {}
});

// START_CUSTOM_CODE_settingsView
// Add custom code here. For more information about custom code, see http://docs.telerik.com/platform/screenbuilder/troubleshooting/how-to-keep-custom-code-changes
(function () {
    //app.settingsView.set('title', 'Settings');
    app.categoriesView.set('title', client_id);
    
})();
// END_CUSTOM_CODE_settingsView