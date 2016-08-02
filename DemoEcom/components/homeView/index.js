'use strict';

app.homeView = kendo.observable({
    onShow: function() {},
    afterShow: function() {}
});

// START_CUSTOM_CODE_homeView
// Add custom code here. For more information about custom code, see http://docs.telerik.com/platform/screenbuilder/troubleshooting/how-to-keep-custom-code-changes
(function () {
    app.homeView.set('title', 'Odoo Mobile Commerce');
})();
(function (parent) {
    var homeViewModel = kendo.observable({
        
        gotermofuse: function() {
                app.mobileApp.navigate('components/termsofuse/view.html');
        },
    });
    parent.set('homeViewModel', homeViewModel);
})(app.homeView)
// END_CUSTOM_CODE_homeView