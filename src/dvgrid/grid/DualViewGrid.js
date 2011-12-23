/** 
 * Dual-View Grid
 * Component built on Ext.grid.Panel with change view feature in run-time
 * 
 * @class Hatimeria.dvgrid.grid.DualViewGrid
 * @extends Ext.grid.Panel
 */
(function() {
    
    Ext.require('Hatimeria.dvgrid.view.TilesView');
    Ext.require('Hatimeria.dvgrid.view.TableView');
    Ext.require('Hatimeria.dvgrid.selection.TilesModel');
    Ext.require('Hatimeria.dvgrid.form.SortComboBox');
    
    Ext.define('Hatimeria.dvgrid.grid.DualViewGrid', {
        extend: 'Ext.grid.Panel',
        mixins: {
            translationable: 'Hatimeria.core.mixins.Translationable'
        },
        
        // Class statics (ext feature):
        inheritableStatics: {
            
            factories: {
                gridView: 'Hatimeria.dvgrid.view.TableView',
                tilesView: 'Hatimeria.dvgrid.view.TilesView',
                combo: 'Hatimeria.dvgrid.form.SortComboBox'
            },
            
            applyFactories: function(factories) {
                Ext.apply(this.factories, factories)
            }
        },
        
        /**
         * Translation namespace
         * @cfg {String} transNS
         */
        transNS: 'dualviewgrid',
        
        /**
         * Types of views
         * 
         * @private
         * @property {Object}
         */
        userViews: {
            tiles: {
                viewType: 'tilesview', 
                selType: 'tilesmodel',
                factory: 'tilesView'
            },
            grid : {
                viewType: 'customtableview', 
                selType: 'rowmodel',
                factory: 'gridView'
            }
        },
        
        /**
         * Columns config
         * 
         *     columnConfig: {
         *         name: {defaultVisible: true, flex: true, align: 'left'},
         *         price: {defaultVisible: false, width: 60, align: 'right', defaultSort: 'DESC'},
         *         created_at: {defaultVisible: false, width: 100, align: 'center', defaultSort: 'DESC'},
         *         updated_at: {defaultVisible: false, width: 100, align: 'center', defaultSort: 'DESC'},
         *     }
         *   
         * @cfg {Object} columnConfig
         */
        columnConfig: {},
        
        /**
         * Curerent view type
         * 
         * @private
         * @property {String}
         */
        currentViewName: undefined,
        
        /**
         * Sort combo box:
         * 
         * @private
         * @property {Ext.form.field.ComboBox}
         */
        sortCombo: undefined,
        
        /**
         * Current sort column name added from combobox
         * 
         * @private
         * @property {String}
         */
        currentSortColumn: undefined,
        
        /**
         * Default view
         * 
         * @cfg {String} defaultView grid|tiles
         */
        defaultView: 'grid',
        
        /**
         * Actions for grid/tiles
         * 
         *       actions: {
         *           menu: {
         *               header: '',
         *               width: 50,
         *               text: 'Menu',
         *               align: 'center',
         *               position: 'last',
         *               cls: 'menucls',
         *               handler: function(grid, view, record, el, index, event) {
         *                   
         *               }
         *           }
         *       }
         *       
         * @cfg {Object} actions
         */
        actions: {},
        
        /**
         * Initializes component
         * 
         * @private
         */
        initComponent: function()
        {
            var _this = this;
            var initialConfig = this.initialConfig || {};
            var viewType = initialConfig.defaultView || 'grid' ;
            this.currentViewName = viewType;
            
            if (typeof this.initialConfig.columnConfig != 'object')
            {
                throw new Error('Need to specify columnConfig');
            }
            
            var comboboxSort = Ext.create(this.self.factories.combo, {
                applyColumns: this.initialConfig.columnConfig,
                cls: 'grid-select-order',
                style: {
                    'margin-left': '25px',
                    'margin-top': '7px'
                },
                listeners: {
                    select:  function(cb, records) {
                        var record = records.pop();
                        _this.fireEvent('sorterchange', record.get('field'), record.get('sort'));
                    }
                }
            });
            
            var buttonGrid = Ext.create('Ext.Button', {
                text: '',
                scope: _this,
                id: initialConfig.id+'-switch-grid',
                cls: 'switch-grid-btn ' + ((viewType == 'grid') ? 'active' : ''),
                align: 'right',
                handler: function(button)
                {
                    this.switchActiveButton(button, initialConfig.id+'-switch-tiles');
                    this.switchViewTo('grid');
                }
            });

            var buttonTiles = Ext.create('Ext.Button', {
                text: '',
                scope: _this,
                id: initialConfig.id+'-switch-tiles',
                cls: 'switch-tiles-btn ' + ((viewType == 'tiles') ? 'active' : ''),
                align: 'right',
                handler: function(button)
                {
                    this.switchActiveButton(button, initialConfig.id+'-switch-grid');
                    this.switchViewTo('tiles');
                }
            });
            
            var cfg = {
                title: 'MegaTotal Grid',
                cls: 'dual-view-grid',
                columns: this.getColumnsForGrid(this.initialConfig.columnConfig),
                dockedItems: [{
                    xtype: 'pagingtoolbar',
                    store: this.initialConfig.store,
                    dock: 'bottom',
                    hideMode: 'visibility',
                    displayInfo: true,
                    height: 39,
                    cls: 'dual-view-grid-paginator'
                },{
                    xtype: 'toolbar',
                    dock: 'top',
                    items: [ comboboxSort, buttonGrid, buttonTiles ],
                    cls: 'dual-view-grid-header',
                    padding: 0,
                    style: {
                        'border-bottom': '1px solid #C5C5C5'
                    }
                }],
                viewConfig: {
                    // Passing actions to the view:
                    actions: (initialConfig.actions ? initialConfig.actions : {})
                }
            };
            
            // Merges view settings:
            Ext.apply(cfg, this.userViews[viewType]);
            
            // Merges initialConfig:
            Ext.apply(this, Ext.apply(cfg, initialConfig));
            
            this.callParent();
            
            this.addEvents(
            
                /**
                 * @event sorterchange
                 * @param {String} fieldName
                 * @param {String} direction
                 * Fires when sort mode is changed
                 */
                'sorterchange',
                
                /**
                 * @event viewchange
                 * @param {String} viewName
                 * @param {Ext.view.View} view
                 * Fires when view mode is changed
                 */
                'viewchange',
                
                /**
                 * @event beforeviewchange
                 * @param {String} viewType
                 * Fires before change of view
                 */
                'beforeviewchange'
            );
            
            this.on('sorterchange', this.onSortComboChange);
            this.store.on('sort', this.onSortGridChange, this);
            this.on('beforerender', this.customizeSorters);
        },
        
        /**
         * Shows column according to sorters
         * 
         * @private
         */
        customizeSorters: function()
        {
            var sorter = this.store.sorters.first();
            
            if (typeof sorter == 'object')
            {
                var column = this.headerCt.items.get(this.getColumnIndex(sorter.property));
                this.currentSortColumn = sorter.property;
                column.hidden = false;
                column.setSortState('ASC');
            }
        },
        
        /**
         * Creates column configuration
         * 
         * @private
         * @param {Object} cols
         * @return {Object}
         */
        getColumnsForGrid: function(colsConfig)
        {
            var columns = this.createColumnsCollection(colsConfig);
            
            return this.addActions(columns);
        },
        
        /**
         * Sort combo
         * 
         * @private
         * @return {Ext.form.field.Combobox}
         */
        getSortCombo: function()
        {
            if (!this.sortCombo)
            {
                this.sortCombo = this.down('combobox');
            }
            
            return this.sortCombo;
        },
        
        /**
         * Add actions
         * 
         * @private
         * @param {Object} columns
         * @return {Object}
         */
        addActions: function(columns)
        {
            if (typeof this.initialConfig.actions == 'object')
            {
                var colCfg, newCol;
                for (var name in this.initialConfig.actions)
                {
                    colCfg = this.initialConfig.actions[name];
                    newCol = this.createActionColumn(name, colCfg);
                    if (!colCfg.position || colCfg.position == 'last')
                    {
                        columns.push(newCol);
                    }
                    else
                    {
                        columns.unshift(newCol);
                    }
                }
            }
            
            return columns;
        },
        
        /**
         * Creates action column
         * 
         * @private
         * @param {Object} config
         * @return {Ext.grid.column.Column}
         */
        createActionColumn: function(name, cfg)
        {
            var config = Ext.apply({
                name: name,
                xtype: 'actionbuttoncolumn',
                text: 'Click',
                width: 100,
                align: '',
                sortable: false,
                disabled: true,
                hideable: false,
                handler: function() {},
                header: false,
                cls: ''
            }, cfg);
            
            return config;
        },
        
        /**
         * Applies column config
         * 
         * @private
         * @param {Object} columns
         */
        createColumnsCollection: function(columns)
        {
            var cfg,
                appliedColumns = [],
                headerConfig;
            
            // Creates column configuration understandable for grid:
            for (var columnName in columns)
            {
                cfg = columns[columnName];
                
                if (cfg.defaultVisible)
                {
                    headerConfig = Ext.apply({text: this.__(columnName), dataIndex: columnName}, cfg);
                }
                else
                {
                    headerConfig = Ext.apply({text: this.__(columnName), dataIndex: columnName, hidden: true}, cfg);
                }
                
                // Remove unuseless properties:
                delete headerConfig.defaultVisible;
                delete headerConfig.defaultSort;
                
                appliedColumns.push(headerConfig);
            }
            
            return appliedColumns;
        },
        
        /**
         * Switches to custom view: tiles | grid
         * 
         * @param {String} viewPrefix tiles or grid
         */
        switchViewTo: function(viewPrefix)
        {
            var _this = this;
            var initialConfig = this.initialConfig || {};
            if (this.viewType == viewPrefix + 'view')
            {
                return false;
            }
            
            this.fireEvent('beforeviewchange', this.viewType);
            
            var cfgView = this.userViews[viewPrefix];
            this.viewType = cfgView.viewType;
            this.currentViewName = viewPrefix;
            
            // We need to change selModel, so delete it, and create again:
            delete this.selModel;
            this.selModel = {selType: cfgView.selType};
            var sm = this.getSelectionModel(); // lazy.
            
            // to prevent duplicate events:
            this.view.clearListeners();
            // Creating a new View instance:
            this.view = Ext.create(this.self.factories[cfgView.factory], {
                deferInitialRefresh: _this.deferRowRender,
                xtype: _this.viewType,
                store: _this.store,
                headerCt: _this.headerCt,
                selModel: sm,
                features: _this.features,
                panel: _this,
                el: (_this.body.child('div.x-component') || _this.body.child('div.x-grid-view')),
                ownerCt: _this,
                actions: (initialConfig.actions ? initialConfig.actions : {})
            });
            
            this.headerCt.view = this.view;
            sm.view = this.view
            this.relayEvents(this.view, ['cellclick', 'celldblclick']);
            this.getView().render();
            
            this.fireEvent('viewchange', this.viewType, this.getView());
            this.doLayout();
            
            return this.getView();
        },
        
        /**
         * View name
         * 
         * @return {String}
         */
        getCurrentViewName: function()
        {
            return this.currentViewName;
        },
        
        /**
         * Event: Manage event on combobox sort change
         * 
         * @private
         * @param {String} fieldName
         */
        onSortComboChange: function(fieldName, direction)
        {
            var index = this.getColumnIndex(fieldName);
            
            if (typeof index == 'undefined')
            {
                throw new Error('Cant find column with index: ' + index);
            }
            
            // Process current sort column:
            if (this.currentSortColumn)
            {
                var oldColumn = this.headerCt.items.get(this.getColumnIndex(this.currentSortColumn));
                // @todo check if allright:
                if (typeof oldColumn == 'object')
                {
                    // Default visible column cannot be hidden!
                    if (!this.isDefaultVisible(this.currentSortColumn))
                    {
                        // Rendered?
                        if (this.headerCt.rendered)
                        {
                            oldColumn.hide();
                        }
                        else
                        {
                            oldColumn.hidden = true;
                        }
                    }
                }
            }
            
            // Process new column:
            var column = this.headerCt.items.get(index);
            
            if (this.headerCt.rendered)
            {
                if (column.isHidden())
                {
                    column.show();
                }
            }
            else
            {
                column.hidden = false;
            }
            
            direction = (typeof direction != 'undefined') ? direction : 'ASC' ;
            column.setSortState(direction);
            this.currentSortColumn = fieldName;

            // Fire sorting:
            this.store.sort(fieldName, direction);
        },
        
        /**
         * Event: grid sort change
         * 
         * @private
         * @param {Ext.util.Sorter[]} sorters
         */
        onSortGridChange: function(sorters)
        {
            if (typeof sorters == 'object' && typeof sorters.first == 'function')
            {
                var column = sorters.first();
                
                if (column)
                {
                    this.getSortCombo().setValue(column.property);
                }
            }
        },
        
        /**
         * Checks if column is default visible
         * 
         * @param {String} columnName
         */
        isDefaultVisible: function(columnName)
        {
            if (typeof this.initialConfig.columnConfig[columnName] != 'object')
            {
                return true;
            }
            
            return this.initialConfig.columnConfig[columnName].defaultVisible;
        },
        
        /**
         * Finds index of a column by name
         * 
         * @return {Integer} index
         */
        getColumnIndex: function(columnName)
        {
            var index = undefined;
            this.headerCt.items.each(function(column, i) {
                if (column.dataIndex == columnName)
                {
                    index = i;
                }
            });
            
            return index;
        },
        
        /**
         * Switches status button
         * 
         * @private
         * @param {Ext.button.Button}
         */
        switchActiveButton: function(button, name)
        {
            button.el.addCls('active');
            button.ownerCt.getComponent(name).el.removeCls('active');
        }
    }); 
    
})();
