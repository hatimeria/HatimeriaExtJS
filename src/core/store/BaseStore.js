/**
 * Base store
 * 
 * @class Hatimeria.core.store.BaseStore
 * @extends Ext.data.DirectStore
 */
(function() {
    
    Ext.define('Hatimeria.core.store.BaseStore', {
        extend: 'Ext.data.DirectStore',
        config: {
            root: 'records',
            idProperty: 'id',
            remoteSort: true,
            autoLoad: true,
            paramsAsHash: true
        },

        /**
         * Constructor
         * 
         * @private
         * @param {Object} cfg
         */
        constructor: function(cfg)
        {
            Ext.apply(this.config, cfg || {});
            this.initConfig(cfg);
            
            Ext.require(this.config.model);
            this.callParent([this.config]);
            
            if(this.proxy.write) {
                // always send records as an array
                this.proxy.writer.allowSingle = false;                
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
