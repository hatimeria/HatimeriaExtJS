/**
 * Agreement Form
 */
(function() {
    
    Ext.require('Hatimeria.core.response.DirectHandler');
    
    Ext.define('Hatimeria.core.form.AgreementForm', {
        extend: 'Ext.form.Panel',
        config: {
            
            /**
             * Direct function to content of terms
             * @cfg {Function} directFn
             */
            directFn: function() {},
            
            /**
             * Optional request parameters
             * @cfg {Object} params
             */
            params: {},
            
            /**
             * Label of form
             * @cfg {String} label
             */
            label: 'Regulamin',
            
            /**
             * Label behind checkbox
             * @cfg {String} checkboxLabel
             */
            checkboxLabel: 'Akceptuję requlamin'
        },
        
        /**
         * Constructor
         * 
         * @private
         * @param {Object} config
         */
        constructor: function(config)
        {
            this.initConfig(config);
            this.callParent([config]);
            
            return this;
        },
        
        /**
         * Initializes form
         * 
         * @private
         */
        initComponent: function()
        {
            var config = {
                border: false,
                items: [
                    {
                        xtype: 'label',
                        text: this.getLabel()
                    },
                    {
                        xtype: 'panel',
                        id: 'agreement-field',
                        layout: 'auto',
                        autoScroll: true,
                        width: this.initialConfig.width || 350,
                        bodyStyle: {
                            background: '#FFF',
                            overflow: 'auto'
                        },
                        margin: '5 0',
                        height: 100,
                        html: ''
                    },
                    {
                        xtype: 'checkbox',
                        fieldLabel: false,
                        boxLabel: this.getCheckboxLabel()+'<em class="ux-required">*</em>',
                        name: 'agreement'
                    }
                ]
            };
            Ext.apply(this, Ext.apply(config, this.initComponent || {}));
            
            this.callParent();
            
            this.on('afterrender', function() {
                this.loadTerms();
            });
        },
        
        /**
         * Load terms of Agreement
         * 
         * @private
         */
        loadTerms: function()
        {
            Ext.create('Hatimeria.core.response.DirectHandler', {
                fn: this.getDirectFn(),
                params: this.getParams(),
                scope: this,
                success: function(result) {
                    this.updateTerms(result.record);
                }
            });
        },
        
        /**
         * Updates a textarea field
         * 
         * @private
         * @param string value
         */
        updateTerms: function(value)
        {
            this.getComponent('agreement-field').update(value);
        }
    });
    
})();
