/**
 * Response handler
 * 
 * @class Hatimeria.core.response.DirectHandler
 * @extends Hatimeria.core.response.BaseHandler
 */
(function() {
    
    Ext.define('Hatimeria.core.response.DirectHandler', {
        extend: 'Hatimeria.core.response.BaseHandler',
        config: {
            
            /**
             * Direct callback function
             * 
             * @cfg {Function} fn
             */
            fn: function(callback) { callback(); },
            
            /**
             * Request parameters
             * 
             * @cfg {Object} params
             */
            params: {},
            
            /**
             * Success case
             * 
             * @cfg {Function} success
             */
            success: undefined,
            
            /**
             * Failure case
             * !!! Error function must return TRUE to run failure method !!!
             * 
             * @cfg {Function} error
             */
            error: undefined,
            
            /**
             * Scope of functions success, error
             * 
             * @cfg {Object} scope
             */
            scope: undefined
        },
        
        /**
         * Response
         * 
         * @private
         * @property {Object}
         */
        response: undefined,
        
        /**
         * Constructor
         * 
         * @private
         * @param {Object} config
         */
        constructor: function(config)
        {
            this.callParent([config]);
            this.initConfig(config);
            this.init();
            
            return this;
        },

        /**
         * Call request
         * 
         * @private
         */
        init: function()
        {
            var _this = this;
            if (typeof this.getFn() != 'function')
            {
                throw new Error('Must specify fn parameter');
            }
            
            this.getFn()(this.getParams() || {}, function(result, response) {
                try {
                    _this.onResponse(result, response);
                }
                catch(e)
                {
                    console.error(e);
                }
            });
        },
        
        /**
         * Event: response
         * 
         * @private
         * @param {Object} result
         * @param {Object} response
         */
        onResponse: function(result, response)
        {
            this.response = response;
            var scope = this.getScope() || this;
            
            if (result.success)
            {
                if (typeof this.getSuccess() == 'function')
                {
                    this.getSuccess().call(scope, result);
                }
            }
            else
            {
                if (typeof this.getError() == 'function')
                {
                    if (this.getError().call(scope, result, response))
                    {
                        this.failure(result, response);
                    }
                }
                else
                {
                    this.failure(result, response);
                }
            }
        },
        
        /**
         * Manage success:false case
         * 
         * @private
         * @param {Object} result
         * @param {Object} response
         */
        failure: function(result, response)
        {
            this.callParent([result]);
        },
        
        /**
         * Response of request
         * 
         * @return {Object}
         */
        getResponse: function()
        {
            return this.response;
        }
    });
    
})();
