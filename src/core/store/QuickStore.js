Ext.define("Hatimeria.core.store.QuickStore", {
    extend: 'Hatimeria.core.store.BaseStore',
    alternateClassName: "QuickDirectStore",
    name: null,
    fields: null,
    
    constructor: function(cfg) {
        
        var store = this;
        var name = cfg.name;
        var model = "QuickStore.model." + name;
        delete cfg.name;
        
        Ext.define(model, {
            extend: "Hatimeria.core.model.DirectModel",
            api: "HatimeriaExtJS_Direct",
            fields: cfg.fields
        });
        
        delete cfg.fields;

        cfg.model = model;

        store.callParent([cfg]);

        store.applyExtraParams({
            name: name
        });
    }
})