/**
 * Response handler
 * 
 * @class Hatimeria.core.response.FormHandler
 * @extends Hatimeria.core.response.BaseHandler
 */
(function() {
    
    Ext.define("Hatimeria.core.response.FormHandler", {
        extend: 'Hatimeria.core.response.BaseHandler',
        config: {
            
            /**
             * Success callback
             * @cfg {Function} success
             */
            success: function() {},
            
            /**
             * Form panel
             * @cfg {Ext.form.Panel} formPanel
             */
            formPanel: {}
        },

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

            return this;
        },

        /**
         * Manage failure case
         * 
         * @private
         * @param {Ext.form.Base} form
         * @param {Object} action
         */
        failure: function(form, action)
        {
            this.callParent([action.result]);
        },

        /**
         * Mark fields as invalid
         * 
         * @private
         * @param {String} index
         */
        markMessage: function(index)
        {
            var field = this.getFormPanel().getFieldByName(index);
            var text = this.msg[index];
            if (field)
            {
                field.markInvalid(text);
            }
            else
            {
                if(typeof msg == 'object') {
                    this.globalMsg.push(text.join(', '));
                } else {
                    this.globalMsg.push(text);
                }
                
            }
        }

    });
    
})();