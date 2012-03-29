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
                        
                        var switchUrl = Routing.generate('homepage') + '?_switch_user=' + record[0].get('username');
                        if(_user.isSwitched) {
                            // hack to bypass symfony multiple user switching block
                            Ext.Ajax.request({
                                url: Routing.generate('homepage'),
                                params: {
                                    _switch_user: '_exit'
                                },
                                success: function() {
                                    location.href = switchUrl;
                                }
                            });
                        } else {
                            location.href = switchUrl;
                        }
                    }
                }        
            };
            
            Ext.apply(config, cfg || {});

            this.callParent([config]);
        }
    });
    
})();
