/** 
 * Dual-View Grid
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
        transNS: 'dualviewgrid',
        
        /**
         * Types of views
         * 
         * @var {}
         */
        userViews: {
            tiles: {
                viewType: 'tilesview', 
                selType: 'tilesmodel',
                className: 'Hatimeria.dvgrid.view.TilesView'
            },
            grid : {
                viewType: 'customtableview', 
                selType: 'rowmodel',
                className: 'Hatimeria.dvgrid.view.TableView'
            }
        },
        
        /**
         * Columns config
         * 
         * @var []
         */
        columnConfig: [],
        
        /**
         * Curerent view type
         * 
         * @var string
         */
        currentViewName: undefined,
        
        /**
         * Sort combo box:
         * 
         * @var Ext.form.field.ComboBox
         */
        sortCombo: undefined,
        
        /**
         * Current sort column name added from combobox
         * 
         * @var string
         */
        currentSortColumn: undefined,
        
        /**
         * initializes component
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
            
            var comboboxSort = Ext.create('Hatimeria.dvgrid.form.SortComboBox', {
                applyColumns: this.initialConfig.columnConfig,
                cls: 'grid-select-order',
                style: {
                    'margin-left': '25px',
                    'margin-top': '7px'
                },
                listeners: {
                    select:  function(cb) {
                        _this.fireEvent('sorterchange', cb.getValue());
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
            
            this.addEvents([
                'sorterchange',
                'viewchange',
                'beforeviewchange'
            ]);
            
            this.on('sorterchange', this.onSortComboChange);
            this.store.on('sort', this.onSortGridChange, this);
            this.on('beforerender', this.customizeSorters);
        },
        
        /**
         * Shows column according to sorters
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
         * @param {} cols
         * @return {}
         */
        getColumnsForGrid: function(colsConfig)
        {
            var columns = this.createColumnsCollection(colsConfig);
            
            return this.addActions(columns);
        },
        
        /**
         * Sort combo
         * 
         * @return Ext.form.field.Combobox
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
         * @param {} columns
         * @return {}
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
         * @param {} config
         * @return Ext.grid.column.Column
         */
        createActionColumn: function(name, cfg)
        {
            var config = Ext.apply({
                name: name,
                xtype: 'actionbuttoncolumn',
                text: 'Click',
                width: 100,
                align: '',
                handler: function() {},
                header: '',
                cls: ''
            }, cfg);
            
            return config;
        },
        
        /**
         * Applies column config
         * 
         * @param [] columns
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
                
                delete headerConfig.defaultVisible;
                appliedColumns.push(headerConfig);
            }
            
            return appliedColumns;
        },
        
        /**
         * Switches to custom view: tiles | grid
         * 
         * @param string viewPrefix
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
            this.view = Ext.create(cfgView.className, {
                deferInitialRefresh: _this.deferRowRender,
                xtype: _this.viewType,
                store: _this.store,
                headerCt: _this.headerCt,
                selModel: sm,
                features: _this.features,
                panel: _this,
                el: _this.body.child('div.x-component'),
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
         * @return string
         */
        getCurrentViewName: function()
        {
            return this.currentViewName;
        },
        
        /**
         * Event: Manage event on combobox sort change
         * 
         * @param string fieldName
         */
        onSortComboChange: function(fieldName)
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
                if (typeof oldColumn == 'object');
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

            column.setSortState('ASC');
            
            this.currentSortColumn = fieldName;

            // Fire sorting:
            this.store.sort(fieldName, 'ASC');
        },
        
        /**
         * Event: grid sort change
         * 
         * @param [] Ext.util.Sorter sorters
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
         * Schecks if column is default visible
         * 
         * @param string columnName
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
         * Finds index of a column
         * 
         * @return index
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
         * @param Ext.button.Button
         */
        switchActiveButton: function(button, name)
        {
            button.el.addCls('active');
            button.ownerCt.getComponent(name).el.removeCls('active');
        }
    }); 
    
})();