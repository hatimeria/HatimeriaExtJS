/**
 * Direct model
 *     <pre><code>
 *     Ext.define("Foo.BarModel", {
 *       extend: 'Hatimeria.core.model.DirectModel',
 *       fields: ['id','name'],
 *       api: 'FooBundle_BarController'
 *     });
 *     </code></pre>
 *     
 * direct model changes api to :
 *     
 *     <pre><code>
 *     {
 *          read: Actions.FooBundle_BarController.read
 *          update: Actions.FooBundle_BarController.update
 *          destroy: Actions.FooBundle_BarController.destroy
 *          create: Actions.FooBundle_BarController.create
 *     }
 *     </code></pre>
 *     
 * If store is created with this model and he is missing api configuration then he is completed with:
 *     
 *     <pre><code>
 *          directFn: Actions.FooBundle_BarController.list
 *     </code></pre>
 * 
 * @class Hatimeria.core.model.DirectModel
 * @extends Ext.data.Model
 */
Ext.define("Hatimeria.core.model.DirectModel", {
    extend: 'Ext.data.Model',
    requires: ['Hatimeria.core.mixins.ConfigurableExternal'],
    
    /**
     * Api config or api prefix ("AcmeFoo_Bar") 
     * AcmeFoo is name of bundle and Bar is name of controller
     * 
     * AcmeFoo_Bar for javascript is AcmeFooBundle/Controller/BarController for backend
     *
     * @cfg {String/Object}
     */
    api: null,
    
    /**
     * Part of Actions belongs to this model
     *
     * @property {Object}
     */
    actionsConfiguration: null,
    
    /**
     * Reconfigure before Ext.data.Model gets configuration
     *
     * @private
     */
    onClassExtended: function(cls, data) {
        
        if(!data.idProperty) {
            if(!data.fields) {
                console.error("Missing fields for model");
            }
            data.idProperty = typeof data.fields[0] == 'string' ? data.fields[0] : data.fields[0].name;
        }
        
        if (typeof data.api == 'string') {
            var controller = data.api;
            var actions = Actions[controller];
            
            if(typeof actions != 'object') {
                throw new Error(controller + ' is not present in Actions, search for type or missing @remote annotation in action');
            }
            
            data.api = {
                update: actions.update,
                destroy: actions.destroy,
                create: actions.create,
                read: actions.read,
                list: actions.list
            }
            
            data.actionsConfiguration = actions;
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