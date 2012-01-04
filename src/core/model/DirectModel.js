Ext.define("Hatimeria.core.model.DirectModel", {
    extend: 'Ext.data.Model',
    
    onClassExtended: function(cls, data) {
        
        data.idProperty = data.fields[0].name;
        
        if(typeof data.api == 'string') {
            var controller = data.api;
            data.api = {
                update: Actions[controller].update,
                destroy: Actions[controller].destroy,
                create: Actions[controller].create,
                // @deprecated
                remove: Actions[controller].remove
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
        }
        
        delete data.api;
        
        cls.prototype.superclass.superclass.$onExtended(cls, data);
    }
})