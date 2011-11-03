/* 
 * Custom TableView
 */
(function() {
    
    Ext.define('Hatimeria.dvgrid.view.TableView', {
        extend: 'Ext.view.Table',
        
        alias: 'widget.customtableview',
        
        /**
         * Init component
         * 
         */
        initComponent: function()
        {
            this.callParent();
            
            this.on('itemclick', function(view, record, el, index, event) {
                this.dispatchItemClick(view, record, el, index, event);
            });
        },
        
        /**
         * Dispatch click on record
         */
        dispatchItemClick: function(view, record, el, index, event)
        {
            var actions = this.ownerCt.initialConfig.actions;
            if (typeof actions == 'object')
            {
                var cls = Ext.get(event.target).dom.className;

                if (cls && actions[cls] && typeof actions[cls].handler == 'function')
                {
                    actions[cls].handler(this.ownerCt, view, record, el, index, event);
                    
                    return true;
                }
            }
            
            this.ownerCt.fireEvent('itemareaclick', view, record, el, index, event);
            
            return true;
        }
    });
    
})();