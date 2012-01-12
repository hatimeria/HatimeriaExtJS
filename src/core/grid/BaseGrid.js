/* 
 * BaseGrid
 */
(function() {
    
    Ext.define('Hatimeria.core.grid.BaseGrid', {
        extend: 'Ext.grid.Panel',
        alternateClassName: 'HatimeriaAdmin.core.grid.BaseGrid',
        mixins: {
            configurable: 'Hatimeria.core.mixins.ConfigurableExternal'
        },
        
        /**
         * Row operations
         * 
         * @cfg {Array}/{String}/{Object} rowActions
         * @example
         *     rowActions: ['edit', 'remove', 'clone']
         *  or
         *     rowActions: {
         *       edit: 'Edycja',
         *       remove: 'Usuń',
         *       clone: 'Klonuj',
         *     }
         *  or   
         *     rowActions: "edit, remove, string" 
         */
        rowActions: {},
        
        /**
         * Class name of edit window
         * 
         * @property {String}
         */
        windowEditClass: false,
        
        /**
         * @property {Array} rowActions
         * @private
         */
        defaultRowActions: {
            edit: 'Edycja',
            remove: 'Usuń',
            clone: 'Klonuj'
        },
        
        /**
         * Initializes component
         */
        initComponent: function()
        {
            this.callParent();
            var actions = this.getRowActions();
            
            this.on({
                itemcontextmenu: {
                    scope: this,
                    fn: this.onContextMenu
                },
                itemdblclick: {
                    scope: this, 
                    fn: function(grid, record, el, index) {
                        if (actions['edit'])
                        {
                            this.onEditClick(record, index);
                        }
                    }
                }
            });
        },
        
        /**
         * Row Actions
         *
         * @private
         * @return {Object}
         */
        getRowActions: function()
        {
            if (Ext.isArray(this.rowActions) || Ext.isString(this.rowActions))
            {
                if (Ext.isString(this.rowActions))
                {
                    this.rowActions = this.rowActions.split(/ ?, ?/g);
                }
                if (Ext.isArray(this.rowActions))
                {
                    var actions = {};
                    for (var i=0; i<this.rowActions.length; i++)
                    {
                        var item = this.rowActions[i];
                        actions[item] = this.defaultRowActions[item];
                    }
                    this.rowActions = actions;
                }
            }
            
            return this.rowActions;
        },
        
        /**
         * Edit window class
         * 
         * @return {String}
         */
        getWindowEditClass: function()
        {
            return this.windowEditClass;
        },
        
        /**
         * Merges external config
         * 
         * @param {Object} config
         * @return {Object}
         */
        applyExternal: function(cfg)
        {
            var config = this.getConnectedConfig();
            
            if (config && config.columns)
            {
                for (var i in config.columns)
                {
                    cfg.columns.push(config.columns[i]);
                }
            }
            
            return cfg;
        },
        
        /**
         * Yes/No renderer
         * 
         * @return {String}
         */
        rendererYesNo: function(value)
        { 
            return value ? 'Tak': 'Nie' 
        },
        
        /**
         * Items for context menu
         * 
         * @return {Array}
         */
        getContextMenuItems: function(record, index)
        {
            var items = [];
            var actions = this.getRowActions();
            
            for (var name in actions)
            {
                items.push({
                    text: actions[name],
                    cls: 'ux-' + name,
                    scope: this,
                    handler: function() {
                        this['on' + Ext.capitalize(name) + 'Click'](record, index);
                    }
                });
            }
        },
        
        /**
         * Event: right click on row
         * 
         * @param {Ext.tree.Panel} grid
         * @param {Ext.data.Node} record
         * @param {DOMElement} el
         * @param int index
         * @param Ext.Object.Event event
         */
        onContextMenu: function(grid, record, el, index, event)
        {
            Ext.create('Ext.menu.Menu', {
                items: this.getContextMenuItems(record, index)
            }).showAt(event.getXY());
            
            event.stopEvent();
        },
        
        /**
         * Event: edit click
         * 
         * @param Ext.data.Model record
         * @param int index
         */
        onEditClick: function(record)
        {
            var editWindow = Ext.create(this.getWindowEditClass());
            editWindow.show();
            editWindow.populate(record);
        },
        
        /**
         * Cloning record
         * 
         * @param Ext.data.Model record
         * @param int index
         */
        onCloneClick: function(record, index)
        {
            var editWindow = Ext.create(this.getWindowEditClass());
            editWindow.show();
            var newRecord = record.copy();
            newRecord.setId('');
            editWindow.populate(newRecord);
        },

        /**
         * Event: remove click
         * 
         * @param Ext.data.Model record
         */
        onRemoveClick: function(record)
        {
            var store = this.store;
            Ext.Msg.confirm('Uwaga', 'Nastąpi usunięcie rekordu z bazy danych.<br/>Czy kontynuować?', function(response) {
                if (response == 'yes')
                {
                    record.destroy({
                        success: function() {
                            store.load();
                        }
                    });
                }
            });
        }
    });
    
})();