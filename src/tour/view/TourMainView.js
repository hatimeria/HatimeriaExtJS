Ext.define("Hatimeria.tour.view.TourMainView", {
    extend: 'Ext.container.Viewport',
    title: 'Tour',
    layout: 'border',
    items: [
        {
            region: 'north',
            xtype: 'container',
            padding: 10,
            style: 'font-size: 18px; background: white',
            html: 'Hatimeria CMF'
        },
        {
            region: 'center',
            bodyPadding: 20,
            html: '<a href="/compiled/js/docs/index.html">Javascript classes documentation</a><br/>' + 
                '<a href="/admin">Administration</a>'
        }
    ]
})