/**
 * Base Grid
 * 
 * @class Hatimeria.core.grid.BaseGrid
 * @extends Ext.grid.Panel
 * 
<pre><code>
Ext.define('Foo.Bar', {
    extend: 'Hatimeria.core.grid.BaseGrid',
    initComponent: function() {
    Ext.apply(this, {
            windowEditClass: 'Foo.BarWindow',
            rowActions: ['edit', 'clone', 'remove'],
            dockedElements: ['paging', 'add'],
            actionColumn: true
            });
        }
    });
</code></pre>
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
         * @cfg {Array/String/{Object} rowActions
         * 
         <pre><code>
                // Simple array
                rowActions: ['edit', 'remove', 'clone']
                // Record based label name
                rowActions: ['publish': function(record) {return record.isPublished() ? 'publish':'unpublish'} ]
                // Codename: label object
                rowActions: {
                    edit: 'Edycja',
                    remove: 'Usuń',
                     clone: 'Klonuj',
                }
                 // String
                rowActions: "edit, remove, clone" 
         </code></pre>     
        
         * adding custom handlers:
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
         * Translate title, headers etc ?
         * 
         * @cfg {Boolean} translateAll
         */
        translateAll: false,
        
        /**
         * Action column added as last column in grid
         *
         * @cfg {String/Boolean} actionColumn
         */
        actionColumn: true,
        
        /**
         * Class name of edit window
         * 
         * @property {String} windowEditClass
         */
        windowEditClass: false,
        
        /**
         * Class name of entity record
         * 
         * @property {String} recordClass
         */
        recordClass: false,
        
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
         * Add or remove action based on current record
         *
         * @cfg {Function} addConditionalRowActions
         * 
         * @return {Object}
         */
        addConditionalRecordActions: function(actions, record) {return actions},
        
        /**
         *
         * Translation namespace
         * 
         * @property
         */
        transNS: 'grid',
        
        /**
         * Used for translation for current class not extended one
         * 
         * @private
         */
        translate: function(key, placeholders)
        {
            return this.statics().prototype.__(key, placeholders);
        },
        
        /**
         * Initializes component
         */
        initComponent: function()
        {
            var grid = this;
            // Docked items: 
            this.dockedItems = this.getDockedElements();
            
            if(this.translateAll) {
                Ext.Object.each(this.defaultRowActions, function(key, value, property) {
                    property[key] = grid.translate('actions.' + key);
                });
                Ext.each(this.columns, function(column) {
                    if(!column.header) {
                        column.header = grid.__('headers.'+column.dataIndex);
                    }
                });
                
                this.title = grid.__('title');
            }
            
            // Action column with row-operations:
            var actions = this.getRowActions();
            if (!Ext.isEmpty(actions) && this.actionColumn)
            {
                this.columns.push(this.getRowActionsColumn());
            }
            
            this.callParent();
            
            // Mouse row-operations:
            this.on({
                itemcontextmenu: {
                    scope: this,
                    fn: this.onContextMenu
                },
                itemclick: {
                    scope: this,
                    fn: this.onItemClick
                },
                itemdblclick: {
                    scope: this, 
                    fn: function(grid, record, el, index, e) {
                        if (actions['edit'])
                        {
                            this.onEditClick(record, index);
                            e.stopEvent();
                        }
                    }
                }
            });
        },
        
        /**
         * On item click
         *
         * @private
         */
        onItemClick: function(grid, record, el, index, e) {
            if(e.getTarget().parentNode.className.match(/actions-show-column/)) {
                this.onContextMenu(grid, record, el, index, e);
            }
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
                    displayMsg: this.translate('pager.records'),
                    emptyMsg: this.translate('pager.empty')
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
                        iconCls: 'icon-add',
                        cls: 'ux-icon-add-btn',
                        text: this.translate('actions.add'),
                        scope: this,
                        handler: function() {
                            var window = Ext.create(this.getWindowEditClass());
                            window.show();
                            if (this.recordClass)
                            {
                                window.populate(Ext.create(this.getRecordClass()))
                            }
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
        getRowActions: function(record)
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
         * Action column with row-operations
         * 
         * @private
         * @return {Object}
         */
        getRowActionsColumn: function()
        {
            var grid = this;
            
            return {
                tdCls: 'actions-show-column',
                width: 100,
                header: '&nbsp;',
                renderer: function() {
                    return grid.translate('options')
                }
            };
        },
        
        /**
         * Edit window class name
         * 
         * @return {String}
         */
        getWindowEditClass: function()
        {
            return this.windowEditClass;
        },
        
        /**
         * Record class name
         * 
         * @return {String}
         */
        getRecordClass: function()
        {
            return this.recordClass;
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
            return value ? this.translate('yes'): this.translate('no');
        },
        
        /**
         * Items for context menu
         * 
         * @return {Array}
         */
        getContextMenuItems: function(record, index)
        {
            var items = [];
            var actions = Ext.clone(this.getRowActions(record));
            this.addConditionalRecordActions(actions, record);
            
            for (var name in actions)
            {
                var label = actions[name];
                (function(name, scope) {
                    items.push({
                        text: typeof label == 'function' ? label(record) : label,
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
            Ext.Msg.confirm(this.translate('remove.confirm.title'), this.translate('remove.confirm.text'), function(response) {
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