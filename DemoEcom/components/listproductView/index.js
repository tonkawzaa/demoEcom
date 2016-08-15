'use strict';

app.listproductView = kendo.observable({
    onShow: function(e) {
         var viewparams = e.view.params; 
        var pos_category_id = viewparams.id; 
        //navigator.notification.alert(pos_category_id);
        
        var access_token = null;
        	access_token = localStorage.getItem("access_token");
        
                    $.ajax({
                            type: "POST",
                            url: server_location+"/api/pos/products",
                            contentType: "application/json; charset=utf-8",
                            data: JSON.stringify({ 
                                                client_id:client_id,
                                                client_secret:client_secret,
                                                access_token:access_token,
                                                merchant_client_id:merchant_client_id,
                                                pos_category_id:pos_category_id,
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
                                navigator.notification.alert(result);   
                              //navigator.notification.alert("เชื่อมต่อข้อมูล gifts ผิดพลาด"); 
                            },
                  });
    },
    afterShow: function() {},
    
});

(function (parent) {
    
    var listproductModel = kendo.observable({
        addToCart :  function()
            {
                navigator.notification.alert("addToCart");
            },
    });
  

    parent.set('listproductModel', listproductModel);
    
})(app.listproductView);
