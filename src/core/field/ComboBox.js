/**
 * Hatimeria Combo
 * 
 * @class Hatimeria.core.field.ComboBox
 * @extends Ext.form.field.ComboBox
 */
(function() {
    
    Ext.define('Hatimeria.core.field.ComboBox', {
        extend: 'Ext.form.field.ComboBox',
        mixins: {
            clearable: 'Hatimeria.core.field.mixin.Clearable'
        },
        
        /**
         * @cfg firstSelected
         * Triggers select on first record found in store (if no value passed)
         */
        firstSelected: false,
        
        /**
         * @cfg hiddenIfOne
         * Hides combo when 1) store has one record 2) value indicats on that record
         */
        hiddenIfOne: false,
        
        /**
         * @cfg newAutoSelect
         * Auto select each new added record to store
         */
        newAutoSelect: false,
        
        /**
         * Initialize
         * @private
         */
        initComponent: function()
        {
            this.addEvents(
                /**
                 * @event onehidden
                 * Fires when flag: 
                 */
                'onehidden',
                
                /**
                 * @vent oneadded
                 * Fires when one is added to store
                 */
                'oneadded'
            );
            
            this.callParent();
            
            if (this.queryMode == 'remote')
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
                this.checkChange();
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