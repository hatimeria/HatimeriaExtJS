/**
 * Base store
 */
(function() {
    
    Ext.define('Hatimeria.core.store.BaseStore', {
        extend: 'Ext.data.DirectStore',

        /**
         * Constructor
         * 
         * @param {} cfg
         */
        constructor: function(cfg)
        {
            var config = {
                root: 'records',
                idProperty: 'id',
                remoteSort: true,
                autoLoad: true,
                paramsAsHash: true
            };
            Ext.apply(config, cfg || {});

            this.callParent([config]);
        },

        /**
         * Applies context-tag
         * 
         * @param [] vars
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
         * @param {} data
         */
        applyExtraParams: function(data)
        {
            if (typeof this.proxy.extraParams != 'object')
            {
                this.proxy.extraParams = {};
            }

            Ext.apply(this.proxy.extraParams, data);
        }
    });

})();
