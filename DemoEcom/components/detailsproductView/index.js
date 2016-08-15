'use strict';

app.detailsproductView = kendo.observable({
    onShow: function(e) {
         var viewparams = e.view.params; 
        var id = viewparams.id; 
        var image = viewparams.image; 
        var name = viewparams.name; 
        var price = viewparams.price; 
        
        var data1 = {
            data1_id : id,
            data1_image : image,
            data1_name : name,
            data1_price : price,
            Confirm: function() {
                
                
                var retrievedObject = localStorage.getItem('cart');
                cart = JSON.parse(retrievedObject);

                //cart.push({"id": "4", "name": "Top","qty":"1" });
                //cart.push({"id":id,"name":name,"price":price, "qty":"1"});
                var index = cart.map(function(e) {return e.id; }).indexOf(id);
                if(index<0)
                {
                    cart.push({"id":id,"name":name,"price":price, "qty":"1"});
                    localStorage.setItem("cart",JSON.stringify(cart));
                }else{
                    var addnum = parseInt(cart[index].qty)   ;
                    addnum += 1;  
                    cart[index].qty = addnum.toString();
                    localStorage.setItem("cart",JSON.stringify(cart));
                }
                
                //localStorage.setItem("cart",JSON.stringify(cart));
               // navigator.notification.alert(index);
                //navigator.notification.alert(cart);
            },
           
        };
        kendo.bind($('#Confirmfunc'),data1);
    },
           
    afterShow: function() {}
});