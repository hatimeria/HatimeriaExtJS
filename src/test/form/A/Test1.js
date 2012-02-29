/**
 * Form
 * 
 * @class Hatimeria.test.form.TestA
 * @extends Hatimeria.core.form.BaseForm
 */
(function() {
    
    Ext.define('Hatimeria.test.form.A.Test1', {
        extend: 'Hatimeria.core.form.BaseForm',
        
        submitConfig: {
            submit: Actions.HatimeriaExtJS_Javascript.receiveTestData,
            text: 'Zapisz A',
            success: function() {
                Ext.Msg.alert('Ok', 'Wykonano zapytanie testu A');
            }
        },
        
        constructor: function(cfg)
        {
            var config = {
                title: 'Przycisk domyślnie widoczny',
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