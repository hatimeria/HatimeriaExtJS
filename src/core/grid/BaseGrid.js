/**
 * Base Grid
 * 
 * @class Hatimeria.core.grid.BaseGrid
 * @extends Ext.grid.Panel
 * 
 *    @example
 *    Ext.define('Foo.Bar', {
 *      extend: 'Hatimeria.core.grid.BaseGrid',
 *      
 *      initComponent: function() {
 *        Ext.apply(this, {
 *          ...
 *          windowEditClass: 'Foo.BarWindow',
 *          rowActions: ['edit', 'clone', 'remove'],
 *          dockedElements: ['paging', 'add]
 *          ...
 *        });
 *      }
 *    });
 *    
 */
(function() {
    
    Ext.define('Hatimeria.core.grid.BaseGrid', {
        extend: 'Ext.grid.Panel',
        alternateClassName: 'HatimeriaAdmin.core.grid.BaseGrid',
        mixins: {
            configurable: 'Hatimeria.core.mixins.ConfigurableExternal',
            translationable: 'Hatimeria.core.mixins.Translationable'
        },
        
        /**
         * Row operations
         * 
         * predefined:
         *   - edit
         *   - clone
         *   - remove
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
         *     rowActions: "edit, remove, clone" 
         *     
         * adding custom hadlers:
         * 1. set: rowActions: {'enable': 'Enable it!'}
         * 2. add method: onEnableClick: function(record, index) { ... }
         */
        rowActions: {},
        
        /**
         * Docked elements (already defined: "paging", "add")
         * 
         * @cfg {Array} dockedElements
         */
        dockedElements: ['paging'],
        
        /**
         * Class name of edit window
         * 
         * @private
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
            var grid = this;
            this.dockedItems = this.getDockedElements();
            if(this.transDomain) {
                Ext.each(this.columns, function(column) {
                    if(!column.header) {
                        column.header = grid.__(column.dataIndex);
                    }
                });
            }
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
         * Docked elements
         * 
         * @return {Array}
         */
        getDockedElements: function()
        {
            var items = [];
            
            // With paging?
            if (Ext.Array.contains(this.dockedElements, 'paging'))
            {
                items.push({
                    xtype: 'pagingtoolbar',
                    dock: 'bottom',
                    store: this.store,
                    displayInfo: true,
                    displayMsg: 'Rekordy {0} - {1} z {2}',
                    emptyMsg: "Brak rekordów"       
                })
            }
            
            // With add-button ?
            if (Ext.Array.contains(this.dockedElements, 'add'))
            {
                items.push({
                    xtype: 'toolbar',
                    docked: 'top',
                    items: [{
                        xtype: 'button',
                        iconCls: 'icon-user-add',
                        text: 'Dodaj',
                        scope: this,
                        handler: function() {
                            Ext.create(this.getWindowEditClass()).show();
                        }
                    }]
                });
            }
            
            return items;
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
                        actions[item] = this.defaultRowActions[item] ? this.defaultRowActions[item] : Ext.String.capitalize(item) ;
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
                (function(name, scope) {
                    items.push({
                        text: actions[name],
                        cls: 'ux-' + name,
                        scope: scope,
                        handler: function() {
                            scope['on' + Ext.String.capitalize(name) + 'Click'](record, index);
                        }
                    });
                })(name, this);
            }
            
            return items;
        },
        
        /**
         * Event: right click on row
         * @private
         * 
         * @param {Ext.tree.Panel} grid
         * @param {Ext.data.Node} record
         * @param {DOMElement} el
         * @param {Number} index
         * @param {Ext.Object.Event} event
         */
        onContextMenu: function(grid, record, el, index, event)
        {
            if (!Ext.isEmpty(this.getRowActions()))
            {
                Ext.create('Ext.menu.Menu', {
                    items: this.getContextMenuItems(record, index)
                }).showAt(event.getXY());

                event.stopEvent();
            }
        },
        
        /**
         * Event: edit click
         * @private
         * 
         * @param {Ext.data.Model} record
         * @param {Number} index
         */
        onEditClick: function(record)
        {
            var editWindow = Ext.create(this.getWindowEditClass());
            editWindow.show();
            editWindow.populate(record);
        },
        
        /**
         * Cloning record
         * @private
         * 
         * @param {Ext.data.Model} record
         * @param {Number} index
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
         * @private
         * 
         * @param {Ext.data.Model} record
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