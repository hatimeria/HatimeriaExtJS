Ext.define('Hatimeria.core.text.Price', {
    extend: 'Ext.container.Container',
    alias: 'widget.price',
    data: {price: 0},
    style: 'text-align:right',
    constructor: function(config)
    {
        config.tpl = config.text + ' <b>{price}</b>';
        this.callParent([config]);
    },
    setPrice: function(value)
    {
        this.update({price: Ext.util.Format.currency(value)});
    }
});
