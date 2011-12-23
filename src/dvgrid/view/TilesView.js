/**
 * Custom TilesView
 * 
 * @class Hatimeria.dvgrid.view.TilesView
 * @extends Ext.view.View
 */
(function() {
    
    Ext.util.Format.truncate = function(value, len) {
        if (typeof len == 'undefined')
        {
            len = 20;
        }
        
        if (value.length > len)
        {
            value = value.substring(0, (len-3)) + '...';
        }
        
        return value;
    };
    
    Ext.define('Hatimeria.dvgrid.view.TilesView', {
        extend: 'Ext.view.View',
        alias: 'widget.tilesview',
        
        initComponent: function()
        {
            Ext.apply(this, {
                tpl: new Ext.XTemplate(
                    '<ul>',
                        '<tpl for=".">',
                            '<li class="dvgrid-tile">',
                              '<div class="icon">',
                                    '<img src="{avatar}" alt="{name}" />' + this.renderActions(),
                              '</div>',
                              '<div class="title">{name:truncate(20)}</div>',
                            '</li>',
                        '</tpl>',
                    '</ul>'),
                itemSelector: 'li.dvgrid-tile'
            });

            this.callParent();

            this.on('itemclick', function(view, record, el, index, event) {
                this.dispatchItemClick(view, record, el, index, event);
            });
            
            this.on('itemmouseenter', this.onElementMouseEnter);
        },

        /**
         * Renders actions passed into grid
         * 
         * @private
         * @return {String}
         */
        renderActions: function()
        {
            var actions = this.actions;
            
            if (typeof actions != 'object')
            {
                return '';
            }

            var tpl = new Ext.XTemplate([
                '<div class="actions" style="display:none;">',
                    '<tpl for="actions">',
                        '<span class="button {cls}">',
                            '<button class="{index}">{text}</button>',
                        '</span>',
                    '</tpl>',
                '</div>'
            ]);

            var buttons = [];
            for (var index in actions)
            {
                buttons.push({
                    cls: actions[index].cls,
                    text: actions[index].text,
                    index: index
                });
            }

            return tpl.applyTemplate({
                actions: buttons
            });
        },

        /**
         * Event: reacts when a header resizes
         * @private
         */
        onHeaderResize: function()
        {
            // must be implemented
        },
        
        /**
         * Event: trigger when column header change display mode
         * @private
         */
        onHeaderHide: function()
        {
            // must be implemented
        },
        
        /**
         * Event: trigger when column header change display mode
         * @private
         */
        onHeaderShow: function()
        {
            // must be implemented
        },

        /**
         * Dispatch click on record
         * 
         * @private
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
        },
        
        /**
         * Event: mouse over tile
         * @private
         */
        onElementMouseEnter: function(view, record, el)
        {
            if (el.mouseEnterIsBound)
            {
                return ;
            }
            el.mouseEnterIsBound = true;

            var element = Ext.get(el);
            var triggerEnter = function() {
                var actions = Ext.get(this).select('.actions');
                actions.setStyle({opacity: 0, display: 'block'});
                actions.fadeIn({opacity: .75, duration: 200});
            };
            
            element.on('mouseenter', triggerEnter);
            element.on('mouseleave', function() {
                var actions = Ext.get(this).select('.actions');
                actions.setStyle({opacity: 0, display: 'block'});
                actions.fadeIn({opacity: 0, duration: 100});
            });
            triggerEnter.call(el);
        }        
    });

})();
