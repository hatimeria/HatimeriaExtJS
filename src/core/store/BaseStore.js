/**
 * Base store
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
            config.proxy = proxy;
            if(!config.model) {
                config.model = this.model;
            }
            if(!config.proxy.directFn) {
                config.proxy.directFn = this.directFn;
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
