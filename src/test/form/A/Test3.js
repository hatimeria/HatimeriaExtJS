/**
 * Form
 * 
 * @class Hatimeria.test.form.TestA
 * @extends Hatimeria.core.form.BaseForm
 */
(function() {
    
    Ext.define('Hatimeria.test.form.A.Test3', {
        extend: 'Hatimeria.core.form.BaseForm',
        
        submitConfig: {
            submit: Actions.HatimeriaExtJS_Javascript.receiveTestData,
            success: function() {
                Ext.Msg.alert('Ok', 'Wykonano zapytanie testu A');
            }
        },
        
        buttonConfig: {
            padding: 5,
            text: 'Lepszy button A'
        },
        
        constructor: function(cfg)
        {
            var config = {
                title: 'Ostylowany przycisk',
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