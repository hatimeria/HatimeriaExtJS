/**
 * Vertical Tabs
 * 
 * @class Hatimeria.edit.panel.VTabsPanel
 * @extends Ext.panel.Panel
 */
(function() {
        
    Ext.define('Hatimeria.edit.panel.VTabsPanel', {
        extend: 'Ext.panel.Panel',
        mixins: {
            translationable: 'Hatimeria.core.mixins.Translationable'
        },
        alias: 'widget.vtabs',
        config: {
            
            /**
             * List of tabs
             * 
             * @cfg {Object} tabsConfig
             *     tabsConfig: {
             *         info: {
             *             title: "info", 
             *             icon: "icon",
             *             item: {Hatimeria.edit.form.EditForm}
             *         }, 
             *         users: {
             *             title: "users", 
             *             icon: "icon",
             *             item: {Hatimeria.edit.form.EditForm}
             *         }
             *     }
             */
            tabsConfig: {},
            
            /**
             * First activate tab
             * 
             * @cfg {Number}/{String} activatedTab
             */
            activatedTab: 0,
            
            /**
             * Current enabled panel
             * 
             * @cfg {Ext.panel.Panel} currentItem
             */
            currentItem: undefined,
            
            /**
             * Current enabled tab
             * 
             * @private
             * @property {Ext.Element} currentTab
             */
            currentTab: undefined,
            
            /**
             * Current enabled tab
             * 
             * @private
             * @property {String}  currentTabName
             */
            currentTabName: undefined,
            
            /**
             * Copy of Record
             * 
             * @cfg {Object} dataCollection
             */
            dataCollection: {}
        },
        
        /**
         * Initialize component
         * 
         * @private
         */
        initComponent: function()
        {
            if (!this.initialConfig.tabsConfig)
            {
                throw new Error('PanelViewer needs to specify "tabs" object');
            }
            
            this.configureTabs();
  
            var _this = this;
            var config = {
                cls: 'panelviewer',
                layout: 'border',
                items: [
                    Ext.create('Ext.view.View', {
                        itemId: 'panelviewer-tabs',
                        region: 'west',
                        width: 200,
                        itemSelector: '.tab-item',
                        tpl: new Ext.XTemplate(
                            '<ul>',
                                '<tpl for=".">', 
                                    '<li id="tab-{name}" class="tab-item {active}">',
                                        '<span class="icon {icon}"></span>',
                                        '<span class="name">{title}</span>',
                                    '</li>', 
                                '</tpl>', 
                            '</ul>'
                        ),
                        store: this.prepareTabStore(),
                        listeners: {
                            itemclick: function(view, record, el, index, events) {
                                _this.onTabClick(view, record, el, index, events)
                            },
                            viewready: function() {
                                _this.initPanelViewer(this);
                            }
                        }
                    }),
                    {
                        xtype: 'panel',
                        itemId: 'panelviewer-slot',
                        split: true,
                        region: 'center',
                        items: this.getActivatedItem(),
                        layout: 'fit'
                    }
                ]
            };
            
            Ext.apply(this, Ext.apply(config, this.initialConfig || {}));
            
            this.callParent();
        },
        
        /**
         * Check whether component alias is panel form
         * 
         * @param {String} alias
         * @return {Boolean}
         */
        isTabForm: function(alias)
        {
            return (alias == 'widget.baseform');
        },
        
        /**
         * Configure tabs
         * 
         * @private
         */
        configureTabs: function()
        {
            var tabs = this.getTabsConfig();
            
            for (var tabname in tabs)
            {
                tabs[tabname].params = {
                    itemId: 'panelviewer-tab-' + tabname,
                    hidden: true
                }
            }
        },
        
        /**
         * Prepares store
         * 
         * @private
         * @return {Ext.data.Store}
         */
        prepareTabStore: function()
        {
            var data = [];
            var tabs = this.getTabsConfig();
            var element, title;

            for (var tabName in tabs)
            {
                title = (tabs[tabName].title) ? tabs[tabName].title : '' ;
                element = {name: tabName, title: title, icon: tabs[tabName].icon}
                data.push(element);
            }
            
            var store = Ext.create('Ext.data.Store', {
                fields: ['name', 'title', 'icon'],
                data: data
            });
            
            return store;
        },
        
        /**
         * Prepare items
         * 
         * @return {Array} of {Ext.panel.Panel}
         */
        getActivatedItem: function()
        {
            var tabs = this.getTabsConfig();
            var 
                i = 0, 
                retTabname;
            
            if (typeof this.getActivatedTab() == 'undefined')
            {
                this.setActivatedTab(0);
            }
            
            for (var tabname in tabs)
            {
                if ((isNaN(this.getActivatedTab()) && this.getActivatedTab() == tabname) || (!isNaN(this.getActivatedTab()) && i == this.getActivatedTab()))
                {
                    retTabname = tabname;
                    break;
                }
                i++;
            }
            
            var tab = this.createTab(retTabname)
            tab.hidden = false;
            this.setCurrentItem(tab);
            this.setCurrentTabName(retTabname);

            return tab;
        },
        
        /**
         * Event: click Tab
         * 
         * @private
         * @param {Ext.view.View} view
         * @param {Ext.data.Record} record
         * @param {Ext.Element} el
         * @param {Number} index
         * @param {Ext.Event} event
         */
        onTabClick: function(view, record, el, index, events)
        {
            var tabId = record.get('name');
            var tab;
            
            if (this.getTab(tabId))
            {
                tab = this.getTab(tabId);
            }
            else
            {
                tab = this.createTab(tabId);
                this.getSlotPanel().insert(0, tab);
            }
            
            this.getCurrentItem().hide();
            this.setCurrentItem(tab);
            tab.show();
            
            if (this.getCurrentTab())
            {
                this.getCurrentTab().removeCls('active');
            }
            Ext.get(el).addCls('active');
            this.setCurrentTab(Ext.get(el));
        },
        
        /**
         * Creates a new tab and adds to Container
         * 
         * @param {String} tabId
         * @return {Ext.panel.Panel}
         */
        createTab: function(tabId)
        {
            var localData;
            var data = this.getDataCollection() || {};
            var tabs = this.getTabsConfig();
            var tab = Ext.create(tabs[tabId].itemClass, tabs[tabId].params);
            
            if (typeof data[tabId] == 'object')
            {
                localData = data[tabId];
            }
            else if (typeof tabs[tabId].data == 'object')
            {
                localData = tabs[tabId].data;
            }
            else 
            {
                localData = data;
            }
            
            tab.setPanelViewer(this);
            tab.populate(localData);
            
            return tab;
        },
        
        /**
         * Gets slot panel
         * 
         * @return {Ext.panel.Panel}
         */
        getSlotPanel: function()
        {
            return this.getComponent('panelviewer-slot');
        },
        
        /**
         * Gets tab panel
         * 
         * @return {Ext.view.View}
         */
        getTabsPanel: function()
        {
            return this.getComponent('panelviewer-tabs');
        },
        
        /**
         * Gets tab by id
         * 
         * @param {String} name
         * @return {Ext.panel.Panel}
         */
        getTab: function(name)
        {
            var tab = this.getSlotPanel().getComponent('panelviewer-tab-' + name);
            
            return (typeof tab != 'undefined') ? tab : false ;
        },
        
        /**
         * Event: Inits features of panel after rendering
         * 
         * @private
         */
        initPanelViewer: function(viewer)
        {
            var el = viewer.all.elements[this.getActivatedTab()];
            if (el)
            {
                el = Ext.get(el);
                this.setCurrentTab(el);
                el.addCls('active');
            }
        },
        
        /**
         * Applies data to all forms
         * 
         * @param {Object} data
         */
        populate: function(data)
        {
            var _this = this;
            this.setDataCollection(data);
            this.cascade(function(item) { 
                if (_this.isTabForm(item.alias))
                {
                    item.populate(data);
                }
            });
        },
        
        /**
         * Retrieves dirty data from forms
         * 
         * @return {Object}
         */
        retrieveFormData: function()
        {
            var _this = this;
            var data = Ext.clone(this.getDataCollection());
            
            this.cascade(function(item) { 
                if (_this.isTabForm(item.alias))
                {
                    Ext.apply(data, item.retrieveData());
                }
            });
            
            return data;
        },
        
        /**
         * Valdates data
         * 
         * @return {Boolean}
         */
        isValid: function()
        {
            var _this = this;
            var errors = 0;
            
            this.cascade(function(item) { 
                if (_this.isTabForm(item.alias))
                {
                    if (!item.getForm().isValid())
                    {
                         errors++;   
                    }
                }
            });
            
            return (errors == 0);
        }
    });
    
})();