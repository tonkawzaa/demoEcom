'use strict';

app.cartView = kendo.observable({
    onShow: function(e) {  
        //navigator.notification.alert(cart);
        app.cartView.set('cartdata', cart);
    },
    afterShow: function() {}
});
(function (parent) {
    var cartViewModel = kendo.observable({
        
        SendOrder: function() {
           // navigator.notification.alert("SendOrder");
            //navigator.notification.alert(merchant_client_id);
            
            var access_token = null;
        	access_token = localStorage.getItem("access_token");
            $.ajax({
                        type: "POST",
                        url: server_location+"/api/pos/send_order",
                        contentType: "application/json",
                        data: JSON.stringify({ 
                                                client_id:client_id,
                                                client_secret:client_secret,
                                                access_token:access_token,
                                                merchant_client_id : merchant_client_id,
                                                order : cart,
                                             }),
                        success: function(result) {
                            navigator.notification.alert(result);
                        },
                        error: function(result) {
                            navigator.notification.alert(result);
                        }
                  });
            
        },
    });
    parent.set('cartViewModel', cartViewModel);
})(app.cartView)

