'use strict';

app.listproductView = kendo.observable({
    onShow: function(e) {
        var access_token = null;
        	access_token = localStorage.getItem("access_token");
        
                    $.ajax({
                            type: "POST",
                            url: server_location+"/api/products",
                            contentType: "application/json; charset=utf-8",
                            data: JSON.stringify({ 
                                                client_id:client_id,
                                                client_secret:client_secret,
                                                access_token:access_token,
                                             }),
                            dataType: "json",
                            success: function (result) {
                                //navigator.notification.alert(result.products);
                                
                                e.view.element.find("#productlist").kendoMobileListView({
        			            template: kendo.template($("#productlisttmp").html()),
        			            dataSource: result.products,
                                    });
                                
                                
                             },
                            error: function(result) {
                            //navigator.notification.alert(result);   
                               navigator.notification.alert("เชื่อมต่อข้อมูล gifts ผิดพลาด"); 
                            },
                  });
    },
    afterShow: function() {}
});

(function () {
  
    app.listproductView.set('title', "Product");
    
})();
