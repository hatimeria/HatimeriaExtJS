(function() {
    
    Ext.define("Hatimeria.core.window.LoginWindow", {
        extend: "Ext.window.Window",
        mixins: {
            translationable: 'Hatimeria.core.mixins.Translationable'
        },    
        transDomain: 'HatimeriaExtJSBundle',
        width: 300,
        height: 180,
        layout: {
            type: 'fit',
            align: 'center'
        },  
        initComponent: function() {
            this.callParent();
            this.title = this.__("window.login.title");
            this.add(Ext.create("Hatimeria.core.form.LoginForm"));
        }
    });
    
})();
