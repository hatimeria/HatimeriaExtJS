(function() {

    Ext.define('Hatimeria.core.form.UserSwitch', {
        extend: 'Hatimeria.core.field.ComboBox',
        mixins: {
            translationable: 'Hatimeria.core.mixins.Translationable'
        },
        transDomain: 'HatimeriaExtJSBundle',
        transNS: 'switch',

        constructor: function(cfg)
        {
            var config = {
                fieldLabel: this.__("action"),
                queryMode: 'remote',
                displayField: 'username',
                valueField: 'username',
                listeners: {
                    scope: this,
                    select: function(field, record) {
                        location.href = Routing.generate('homepage') + '?_switch_user=' + record[0].get('username');
                    }
                }        
            };
            
            Ext.apply(config, cfg || {});

            this.callParent([config]);
        }
    });
    
})();
