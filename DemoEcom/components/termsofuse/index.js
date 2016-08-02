'use strict';

app.termsofuseView = kendo.observable({
    onShow: function() {},
    afterShow: function() {}
});

// START_CUSTOM_CODE_homeView
// Add custom code here. For more information about custom code, see http://docs.telerik.com/platform/screenbuilder/troubleshooting/how-to-keep-custom-code-changes
(function () {
    app.termsofuseView.set('title', 'Terms Of Use');
})();
(function (parent) {
    var termsofuseViewModel = kendo.observable({
        
        submit: function() {
            app.mobileApp.navigate('components/reigister/view.html');
        },
        
        gohome: function() {
                app.mobileApp.navigate('components/homeView/view.html');
            },

    });
    parent.set('termsofuseViewModel', termsofuseViewModel);
})(app.termsofuseView)