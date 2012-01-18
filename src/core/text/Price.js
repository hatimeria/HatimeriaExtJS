/**
 * Price widget
 *     @example
 *     Ext.create("Hatimeria.core.text.Price",
 *     {
 *       xtype: 'price',
 *       data: {
 *          price: 123
 *     }
 *     });
 * 
 * @class Hatimeria.core.text.Price
 * @extends Ext.container.Container
 */
Ext.define('Hatimeria.core.text.Price', {
    extend: 'Ext.container.Container',
    alias: 'widget.price',
    data: {price: 0},
    style: 'text-align:right',
    
    /**
     * Constructor
     */
    constructor: function(config)
    {
        config.tpl = config.text + ' <b>{price}</b>';
        this.callParent([config]);
    },
    
    /**
     * Change displayed price
     *
     * @param {Float} value
     */
    setPrice: function(value)
    {
        this.update({price: Ext.util.Format.currency(value)});
    }
});
