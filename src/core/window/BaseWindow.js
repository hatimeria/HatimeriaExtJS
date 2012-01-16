(function() {
    
    Ext.define("Hatimeria.core.window.BaseWindow", {
        extend: "Ext.window.Window",
        mixins: {
            translationable: 'Hatimeria.core.mixins.Translationable'
        },
        transDomain: 'HatimeriaExtJSBundle'
    });
    
})();
