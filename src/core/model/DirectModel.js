Ext.define("Hatimeria.core.model.DirectModel", {
    extend: 'Ext.data.Model',
    
    onClassExtended: function(cls, data) {
        
        if(!data.idProperty) {
            data.idProperty = typeof data.fields[0] == 'string' ? data.fields[0] : data.fields[0].name;
        }
        
        if(typeof data.api == 'string') {
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
        }
        
        delete data.api;
        
        cls.prototype.superclass.superclass.$onExtended(cls, data);
    }
})