Ext.define("Hatimeria.core.model.DirectModel", {
    extend: 'Ext.data.Model',
    requires: ['Hatimeria.core.mixins.ConfigurableExternal'],
    
    onClassExtended: function(cls, data) {
        
        if(!data.idProperty) {
            data.idProperty = typeof data.fields[0] == 'string' ? data.fields[0] : data.fields[0].name;
        }
        
        if (typeof data.api == 'string') {
            var controller = data.api;
            data.api = {
                update: Actions[controller].update,
                destroy: Actions[controller].destroy,
                create: Actions[controller].create,
                read: Actions[controller].read
            }
        }
        
        data.proxy = {
            type: 'direct',
            api: data.api,
            reader: {
                type: 'json',
                root: 'record',
                messageProperty: 'msg'
            }
        };
        
        delete data.api;
        
        // Adding extra fields:
        var ce = Ext.create("Hatimeria.core.mixins.ConfigurableExternal");
        var extraConfig = ce.getConnectedConfig(data.$className);
        
        Ext.each(extraConfig.fields, function(field) {
           data.fields.push(field);
        });
        
        cls.prototype.superclass.superclass.$onExtended(cls, data);
    }
});