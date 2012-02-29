/**
 * Form
 * 
 * @class Hatimeria.test.form.TestD
 * @extends Hatimeria.core.form.BaseForm
 */
(function() {
    
    Ext.define('Hatimeria.test.form.D.Test2', {
        extend: 'Hatimeria.core.form.BaseForm',
        
        submitConfig: {
            text: 'Zapisz D',
            submit: Actions.HatimeriaExtJS_Javascript.receiveTestData,
            success: function() {
                Ext.Msg.alert('ERROR', 'ERROR: Nieprawidłowy rezultat zapytania');
            }
        },
        
        constructor: function(cfg)
        {
            var config = {
                title: 'Przycisk ukryty',
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