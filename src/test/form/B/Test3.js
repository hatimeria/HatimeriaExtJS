/**
 * Form
 * 
 * @class Hatimeria.test.form.TestB
 * @extends Hatimeria.core.form.BaseForm
 */
(function() {
    
    Ext.define('Hatimeria.test.form.B.Test3', {
        extend: 'Hatimeria.core.form.BaseForm',
        
        constructor: function(cfg)
        {
            var config = {
                title: 'Ostylowany przycisk',
                submitConfig: {
                    submit: Actions.HatimeriaExtJS_Javascript.receiveTestData,
                    success: function() {
                        Ext.Msg.alert('Ok', 'Wykonano zapytanie testu B');
                    }
                },
                buttonConfig: {
                    padding: 5,
                    text: 'Lepszy button B'
                },
                frame: true,
                items: [
                   {xtype: 'textfield', name: 'firstname', fieldLabel: 'Imię'},
                   {xtype: 'textfield', name: 'lastname', fieldLabel: 'Nazwisko'},
                   {xtype: 'textfield', name: 'address', fieldLabel: 'Adres'},
                   {xtype: 'textfield', name: 'city', fieldLabel: 'Miasto'},
                   {xtype: 'textfield', name: 'code', fieldLabel: 'Kod'}
                ]
            };
            Ext.apply(config, cfg || {});
            this.callParent([config]);
        }
    });

})();