'use strict';

app.listproductView = kendo.observable({
    onShow: function(e) {  
          var viewparams = e.view.params; 
        var pos_category_id = viewparams.id; 
        var pos_category_name = viewparams.name; 
        app.listproductView.set('title', pos_category_name);
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
                                
                                /*
                                e.view.element.find("#productlist").kendoMobileListView({
        			            template: kendo.template($("#productlisttmp").html()),
        			            dataSource: result.products,
                                    });
                                */
                                app.listproductView.set('productsdata', result.products);
                                
                                
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
    var listproductViewModel = kendo.observable({
       
        addToCart: function(e) {
           //navigator.notification.alert("addToCart");
            var item = e.data;
            //navigator.notification.alert(item);
            var retrievedObject = localStorage.getItem('cart');
            cart = JSON.parse(retrievedObject);
            
            var index = cart.map(function(e) {return e.id; }).indexOf(item.id);
                if(index<0)
                {
                    cart.push({"id":item.id,"name":item.name,"price":item.price,"image":item.image, "qty":"1"});
                    localStorage.setItem("cart",JSON.stringify(cart));
                }else{
                    var addnum = parseInt(cart[index].qty)   ;
                    addnum += 1;  
                    cart[index].qty = addnum.toString();
                    localStorage.setItem("cart",JSON.stringify(cart));
                }
            
            var orderretrievedObject = localStorage.getItem('order');
                order = JSON.parse(orderretrievedObject);

                var order_index = order.map(function(e) {return e.product_id; }).indexOf(item.id);
                if(order_index<0)
                {
                    order.push({"product_id":item.id, "quantity":"1"});
                    localStorage.setItem("order",JSON.stringify(order));
                }else{
                    var addq = parseInt(order[index].quantity)   ;
                    addq += 1;  
                    order[index].quantity = addq.toString();
                    localStorage.setItem("order",JSON.stringify(order));
                }
            var message = "Add Oder : " + item.name +" Completely" ;
            navigator.notification.alert(message);
        },
    });
    parent.set('listproductViewModel', listproductViewModel);
    
})(app.listproductView)

