/*!
 * BaseForm Testing
 */
Ext.require('Hatimeria.core.form.BaseForm');
Ext.require('Hatimeria.test.form.A.Test1');
Ext.require('Hatimeria.test.form.A.Test2');
Ext.require('Hatimeria.test.form.A.Test3');
Ext.require('Hatimeria.test.form.B.Test1');
Ext.require('Hatimeria.test.form.B.Test2');
Ext.require('Hatimeria.test.form.B.Test3');
Ext.require('Hatimeria.test.form.C.Test1');
Ext.require('Hatimeria.test.form.C.Test2');
Ext.require('Hatimeria.test.form.C.Test3');
Ext.require('Hatimeria.test.form.D.Test1');
Ext.require('Hatimeria.test.form.D.Test2');
Ext.require('Hatimeria.test.form.D.Test3');

Ext.onReady(function() {
    
   var label = {
       xtype: 'panel', 
       style: 'padding: 5px;', 
       height: 45, 
       padding: '0 0 10 0',
       bodyStyle: 'text-align: center; font-weight: bold; padding: 10px;'
   };
   
   Ext.create('Ext.panel.Panel', {
       title: 'BaseForm tests',
       renderTo: 'ext-app',
       layout: 'column',
       defaults: {
           padding: 10,
           border: 0,
           defaults: {
               height: 250, 
               padding: 10,
               margin: '0 0 10 0'
           }
       },
       items: [
           {
               columnWidth: 0.25,
               items: [
                   Ext.apply({html: '[A] submitConfig jako składnik klasy'}, label),
                   
                   Ext.create('Hatimeria.test.form.A.Test1'),
                   Ext.create('Hatimeria.test.form.A.Test2'),
                   Ext.create('Hatimeria.test.form.A.Test3')
               ]
           },
           {
               columnWidth: 0.25,
               items: [
                   Ext.apply({html: '[B] submitConfig w konstruktorze'}, label),
                   
                   Ext.create('Hatimeria.test.form.B.Test1'),
                   Ext.create('Hatimeria.test.form.B.Test2'),
                   Ext.create('Hatimeria.test.form.B.Test3')
               ]
           },
           {
               columnWidth: 0.25,
               items: [
                   Ext.apply({html: '[C] submitConfit w konfiguracji'}, label),
                   
                   Ext.create('Hatimeria.test.form.C.Test1', {
                        submitConfig: {
                            text: 'Zapisz C',
                            submit: Actions.HatimeriaExtJS_Javascript.receiveTestData,
                            success: function() {
                                Ext.Msg.alert('Ok', 'Wykonano zapytanie testu C');
                            }
                        }
                   }),
                   Ext.create('Hatimeria.test.form.C.Test2', {
                        submitConfig: {
                            button: false
                        }
                   }),
                   Ext.create('Hatimeria.test.form.C.Test3', {
                        submitConfig: {
                            submit: Actions.HatimeriaExtJS_Javascript.receiveTestData,
                            success: function() {
                                Ext.Msg.alert('Ok', 'Wykonano zapytanie testu C');
                            }
                        },
                        buttonConfig: {
                            padding: 5,
                            iconCls: 'x-tbar-loading',
                            text: 'Lepszy button C'
                        }
                   })
               ]
           },
           {
               columnWidth: 0.25,
               items: [
                   Ext.apply({html: '[D] submitConfig w konfiguracji + jako składnik klasy'}, label),
                   
                   Ext.create('Hatimeria.test.form.D.Test1', {
                        submitConfig: {
                            text: 'Zapisz D',
                            submit: Actions.HatimeriaExtJS_Javascript.receiveTestData,
                            success: function() {
                                Ext.Msg.alert('Ok', 'Wykonano zapytanie testu D');
                            }
                        }
                   }),
                   Ext.create('Hatimeria.test.form.D.Test2', {
                        submitConfig: {
                            button: false
                        }
                   }),
                   Ext.create('Hatimeria.test.form.D.Test3', {
                        submitConfig: {
                            submit: Actions.HatimeriaExtJS_Javascript.receiveTestData,
                            success: function() {
                                Ext.Msg.alert('Ok', 'Wykonano zapytanie testu D');
                            }
                        },
                        buttonConfig: {
                            padding: 5,
                            iconCls: 'x-tbar-loading',
                            text: 'Lepszy button D'
                        }
                   })
               ]
           }
       ]
   });
    
});