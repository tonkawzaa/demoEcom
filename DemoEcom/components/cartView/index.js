'use strict';

app.cartView = kendo.observable({
    onShow: function(e) {  
        //navigator.notification.alert(cart);
        /*
        e.view.element.find("#cartlist").kendoMobileListView({
            			            template: kendo.template($("#cartTemplate").html()),
            			            dataSource: cart,
                                    pullToRefresh: true,
                                    });
        */
        app.cartView.set('cartdata', cart);
    },
    afterShow: function() {}
});
(function (parent) {
    var cartViewModel = kendo.observable({
        
        SendOrder: function() {
           // navigator.notification.alert("SendOrder");
            //navigator.notification.alert(merchant_client_id);
            
            //var order2=[{"product_id":"111","quantity":"6"},{"product_id":"114","quantity": "7"}];
            
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
                                                //order : JSON.stringify(order2),
                                                order : JSON.stringify(order),
                                             }),
                        success: function(result) {
                            //navigator.notification.alert(result);
                            if(result.success){
                                navigator.notification.alert("Send Complete");
                                cart=[] ;
                                order=[];
                                localStorage.setItem("cart",JSON.stringify(cart));
                                localStorage.setItem("order",JSON.stringify(order));
                                app.mobileApp.navigate('components/categoriesView/view.html');
                            }else{
                                navigator.notification.alert(result);
                            }
                        },
                        error: function(result) {
                            navigator.notification.alert(result);
                        }
                  });
            
        },
        removeItem: function(e) {
           //navigator.notification.alert("delete");
            var item = e.data;
            //navigator.notification.alert(item.id);
            var cart_index = cart.map(function(e) {return e.id; }).indexOf(item.id);
             //navigator.notification.alert(cart_index);
            cart.splice(cart_index, 1);
            localStorage.setItem("cart",JSON.stringify(cart));
            
            var order_index = order.map(function(e) {return e.product_id; }).indexOf(item.id);
            order.splice(order_index, 1);
            localStorage.setItem("order",JSON.stringify(order));
            
            //$("#cartlist").remove();
           // $("#cartlist").data("").refresh();
           // $("#cartlist").data("kendoMobileListView").refresh()
            
        },
    });
    parent.set('cartViewModel', cartViewModel);
})(app.cartView)

