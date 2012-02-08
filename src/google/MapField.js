/** 
 * Google map
 * Add to page headers this javascript: http://maps.googleapis.com/maps/api/js?sensor=false
 * 
 * @class Hatimeria.google.MapField
 */
Ext.define("Hatimeria.google.MapField", {
    extend: 'Ext.form.FieldContainer',
    layout: 'hbox',
    addressCallback: null,
    defaultAddress: 'Polska',
    newCoordinates: null,
    oldCoordinates: null,
    alias: 'widget.google-map-field',
    
    constructor: function(config) {
        var cfg =  {
            handler: this.openMap,
            fieldLabel: 'Współrzędne adresu',
            items: [
                {
                    xtype: 'fieldcontainer',
                    layout: 'vbox',
                    width: 230,
                    height: 100,
                    items: [
                        {
                            width: 170,
                            xtype: 'checkboxfield',
                            itemId: 'is_manual_location',
                            name: 'is_manual_location',
                            uncheckedValue: false,
                            labelWidth: 130,
                            onValueChange: function() {
                                var form = this.up().up();
                                if(this.getValue()) {
                                    form.down('#longitude').show();
                                    form.down('#latitude').show();
                                    form.down('#change-on-map').show();
                                } else {
                                    form.down('#longitude').hide();
                                    form.down('#latitude').hide();
                                    form.down('#change-on-map').hide();
                                }
                            },
                            listeners: {
                                beforerender: function() {
                                    this.onValueChange();
                                },
                                change: function() {
                                    this.onValueChange();
                                }
                            },
                            fieldLabel: 'Ustawione ręcznie',
                            fieldSeparator: ''
                        },
                        {
                            fieldLabel: 'długość',
                            labelWidth: 80,
                            width: 220,
                            xtype: 'textfield',
                            name: 'longitude',
                            itemId: 'longitude'
                        },
                        {
                            fieldLabel: 'szerokość',
                            labelWidth: 80,
                            width: 220,
                            xtype: 'textfield',
                            margin: '5 0',
                            name: 'latitude',
                            itemId: 'latitude'
                        }
                    ]
                },
                {
                    xtype: 'button',
                    handler: this.openMap,
                    itemId: 'change-on-map',
                    scope: this,
                    text: 'Zmień na mapie'
                }
            ]
        };
        
        this.callParent([Ext.apply(config || {}, cfg)]);
    },
    
    saveCoordinates: function() {
        if(this.newCoordinates) {
            this.down('#latitude').setValue(this.newCoordinates.lat());
            this.down('#longitude').setValue(this.newCoordinates.lng());
        }
        
        this.down('#is_manual_location').setValue(true);
    },
    
    cancelCoordinates: function() {
        
    },
    
    openMap: function() {
        var field = this;
        var w = Ext.create("Ext.window.Window", {
            title: "Lokalizacja na mapie",
            height: 500,
            width: 500,
            tbar: [
                {
                    xtype: 'container',
                    style: 'padding: 10px',
                    html: 'Jeżeli wyświetlany adres jest niepoprawny, ' + 
                        'chwyć myszką znacznik na mapie i przeciągnij go w odpowiednie miejsce.' + 
                        ' Kliknij <b>ustaw współrzędne</b> na dole okienka, a następnie <b>zapisz formularz</b>'
                }
            ],
            bbar: [
              {
                  xtype: 'button',
                  scope: field,
                  text: 'Zapisz współrzędne',
                  handler: function() {
                    w.close();  
                    field.saveCoordinates();
                  }
              },
              {
                  xtype: 'button',
                  scope: field,
                  text: 'Anuluj',
                  handler: function() {
                    w.close();  
                    field.cancelCoordinates();
                  }
              }
            ],
            items: [
                {
                    xtype: 'container', 
                    itemId: 'map-container',
                    width: 490,
                    height: 490
                }]
        });
        
        w.show();
        
        var map = Ext.create("Hatimeria.google.Map", {
            renderTo: w.down('#map-container').getId()
        });

        
        var address = this.addressCallback();
        
        var createMarker = function(location) {
            map.createMap();
            var marker = new google.maps.Marker({
                        map: map.getMap(),
                        draggable: true,
                        position: location
            });

            google.maps.event.addListener(marker, 'drag', function(marker) {
                field.newCoordinates = marker.latLng;
            });
            map.getMap().setCenter(location);      
        }
        
        if(this.hasLatLng()) {
            createMarker(this.getLatLng());
        } else {
            map.getLocalization(
                address, 
                createMarker,
                function() {
                    map.getLocalization(field.defaultAddress, createMarker);
                });
        }
    },
    
    getLatLng: function()
    {
        return new google.maps.LatLng(this.down('#latitude').getValue(), this.down('#longitude').getValue());
    },
    
    hasLatLng: function() 
    {
        return this.down("#longitude").getValue() > 0;
    }
})