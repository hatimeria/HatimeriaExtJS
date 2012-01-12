/**
 * Hatimeria Combo
 * 
 * @class Hatimeria.core.field.ComboBox
 * @extends Ext.form.field.ComboBox
 */
(function() {
    
    Ext.define('Hatimeria.core.field.ComboBox', {
        extend: 'Ext.form.field.ComboBox',
        alias: 'widget.h-combobox',
        mixins: {
            clearable: 'Hatimeria.core.field.mixin.Clearable'
        },
        
        /**
         * @cfg clearable
         * Adds clear feature to field
         */
        clearable: false,
        
        /**
         * @cfg firstSelected
         * Triggers select on first record found in store (if no value passed)
         */
        firstSelected: false,
        
        /**
         * @cfg hiddenIfOne
         * Hides combo when store has one record
         */
        hiddenIfOne: false,
        
        /**
         * @cfg newAutoSelect
         * Auto select each new added record to store
         */
        newAutoSelect: false,
        
        /**
         * Constructor
         * 
         * @param {Object} config
         */
        constructor: function(config)
        {
            if (!Ext.isObject(config) || !config.clearable)
            {
                this.trigger2Cls = undefined;
            }
            
            return this.callParent(arguments);
        },
        
        /**
         * Initialize
         * @private
         */
        initComponent: function()
        {
            this.addEvents(
            
                /**
                 * @event firstseleted
                 * Fires when 
                 */
                'firstselected',
                
                /**
                 * @event onehidden
                 * Fires when flag
                 */
                'onehidden',
                
                /**
                 * @event oneadded
                 * Fires when one is added to store
                 */
                'oneadded',
                
                /**
                 * @event reset
                 * Fires when clear button is triggered
                 */
                'reset'
            );
            
            this.callParent();
            if (!Ext.isEmpty(this.store.proxy))
            {
                this.getStore().on('load', function(store) {
                    this.onStoreLoaded(store);
                }, this);
            }
            else
            {
                this.onStoreLoaded(this.getStore());
            }
            
            this.getStore().on('add', this.onNewAdded, this);
        },
        
        /**
         * Event: fires when a store is ready
         * 
         * @private
         * @param {Ext.data.Store} store
         */
        onStoreLoaded: function(store)
        {
            if (this.firstSelected && typeof this.initialConfig.value == 'undefined')
            {
                this.select(this.getStore().first());
                this.fireEvent('firstselected', this, this.getValue());
                this.checkChange();
            } 
            
            if(this.value) {
                console.log(this.value, this.store.getAt(0));
                this.validate();
            }
            
            if (this.hiddenIfOne && store.getCount() == 1)
            {
                this.fireEvent('onehidden', this, store.first());
                this.hide();
            }
        },
        
        /**
         * Event: fires when new record is added
         * @private
         */
        onNewAdded: function(store, records)
        {
            if (this.newAutoSelect)
            {
                var record = records[0];
                this.select(record);
                this.fireEvent('oneadded', this, record);
            }
        }
    });
    
})();