/**
 * Base direct store
 * 
 *     <pre><code>
 *     Ext.define("Foo.BarModel", {
 *          extend: 'Hatimeria.core.model.DirectModel',
 *          api: 'FooBundle_BarController',
 *          // first field as id property for model and store
 *          fields: ['id','name']
 *     });
 * 
 *     Ext.define("Foo.BarStore", {
 *          extend: 'Hatimeria.core.store.BaseStore',
 *          model: 'Foo.BarModel',
 *          directSuffix: 'top' // it will be then added to store as directFn: Actions.FooBundle_BarController.top
 *     });
 *     </code></pre>
 * 
 * @class Hatimeria.core.store.BaseStore
 * @extends Ext.data.DirectStore
 */
(function() {

    Ext.define('Hatimeria.core.store.BaseStore', {
        extend: 'Ext.data.Store',
        requires: ['Ext.data.proxy.Direct'],
        config: {
            idProperty: 'id',
            remoteSort: true,
            autoLoad: true
        },
        /**
         * Direct function suffix to be added to model api prefix
         * 
         * @cfg {String}
         */        
        directSuffix: 'list',

        /**
         * Constructor
         * 
         * @private
         * @param {Object} cfg
         */
        constructor: function(cfg)
        {
            var config = {};
            
            if(typeof cfg != 'object') {
                cfg = {};
            }
            this.initConfig(cfg);
            
            Ext.apply(config, this.config);
            
            var proxy = {
                paramsAsHash: true,
                type: 'direct',
                reader: {
                    root: 'records',
                    type: 'json'
                },
                writer: {
                    type: 'json',
                    allowSingle: false
                }
            };
            Ext.copyTo(proxy, this, 'paramOrder,paramsAsHash,directFn,api,simpleSortMode');
            Ext.copyTo(proxy.reader, this, 'totalProperty,root,idProperty');
            Ext.copyTo(proxy, cfg, 'paramOrder,paramsAsHash,directFn,api,simpleSortMode');
            Ext.copyTo(proxy.reader, cfg, 'totalProperty,root,idProperty');
            Ext.copyTo(this, cfg, 'directSuffix');
            config.proxy = proxy;
            if(!config.model) {
                config.model = this.model;
            }
            if(!proxy.directFn && !(proxy.api && proxy.api.read)) {
                proxy.directFn = this.directFn;
            
                if(!proxy.directFn) {
                    var model = Ext.ClassManager.get(config.model);
                    
                    if(!model) {
                        console.error("Invalid model class " + config.model);
                    }
                    
                    delete proxy.directFn;
                    proxy.api = Ext.clone(model.prototype.actionsConfiguration);
                    proxy.api.read = proxy.api.list;
                    delete proxy.api.list;
                    console.log(proxy.api);
                }
            }
            
            this.callParent([config]);
        },
        
        onClassExtended: function(cls, data) {
            // method body from Ext.data.Store
            var model = data.model;

            if (typeof model == 'string') {
                var onBeforeClassCreated = data.onBeforeClassCreated;

                data.onBeforeClassCreated = function(cls, data) {
                    var me = this;

                    Ext.require(model, function() {
                        onBeforeClassCreated.call(me, cls, data);
                    });
                };
            }
        },      

        /**
         * Applies global variables
         * 
         * @param {Array} varnames
         * @param {String} prefix
         */
        applyGlobalValues: function(varnames, prefix)
        {
            var data = {}, varname;

            if (!Ext.isDefined(prefix))
            {
                prefix = '_';
            }

            for (var i in varnames)
            {
                varname = varnames[i];
                if (typeof window[prefix + varname] != 'undefined')
                {
                    if (window[prefix + varname] != '')
                    {
                        data[varname] = window[prefix + varname];
                    }
                }
            }

            this.applyExtraParams(data);
        },

        /**
         * Applying extraparams passed during creating store
         * 
         * @param {Object} data
         */
        applyExtraParams: function(data)
        {
            if (typeof this.proxy.extraParams != 'object')
            {
                this.proxy.extraParams = {};
            }

            Ext.apply(this.proxy.extraParams, data);
        },
        
        /**
         * Applying extraparams passed during creating store
         * 
         * @param {Object} data
         */
        mergeExtraParams: function(data)
        {
            if (typeof this.proxy.extraParams != 'object')
            {
                this.proxy.extraParams = {};
            }

            Ext.merge(this.proxy.extraParams, data);
        },
        
        /**
         * Proxy extra params
         */
        getExtraParams: function()
        {
            return this.proxy.extraParams;
        },
        
        /**
         * Override extra params
         * 
         * @param {} data
         */        
        setExtraParams: function(data)
        {
            this.proxy.extraParams = data;
        }        
        
    });

})();
