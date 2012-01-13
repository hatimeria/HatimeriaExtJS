/** 
 * Google map
 * Add to page headers this javascript: http://maps.googleapis.com/maps/api/js?sensor=false
 * 
 *      @example
 *         Ext.create('Hatimeria.google.Map', {
 *              renderTo: 'maps-container',
 *              zoom: 6,
 *              center: 'Polska',
 *              addresses: [
 *                  'Bydgoszcz, ul. Mińska 7',
 *                  'Kraków, ul. Portowa 3'
 *              ]
 *          });
 *      
 * @class Hatimeria.google.Map
 */
Ext.define("Hatimeria.google.Map", {
    /**
     * Address for geocoder
     * 
     * @cfg {String} address
     */    
    address: null,
    /**
     * Addresses for geocoder
     * 
     * @cfg {Array} addresses
     */    
    addresses: null,
    /**
     * Dom element id in which map will be placed
     * 
     * @cfg {String} renderTo
     */    
    renderTo: null,
    /**
     * Google map instance
     * 
     * @property {Object} map
     */
    map: null,
    /**
     * Google geocoder instance
     * 
     * @property {Object} geocoder
     */
    geocoder: null,
    /**
     * Zoom value
     * 
     * @cfg {Number} zoom
     */
    zoom: 9,
    /**
     * Center address
     * 
     * @cfg {String} center
     */
    center: null,
    
    /**
     * Constructor
     * 
     * @param {Object} config
     */
    constructor: function(config)
    {
        this.geocoder = new google.maps.Geocoder();
        
        Ext.apply(this, config);
        
        return this
    },
       
    /**
     * Renders map
     */    
    render: function()
    {
        var me = this;
        me.createMap();
        Ext.each(me.getAddresses(), function(address, index) {
            me.getLocalization(address, Ext.bind(me.addMarker, me, [index], true));
        });
        
        this.centerMap();
    },
    
    /**
     * Add makers
     *
     * @param {String} localization
     * @private
     */
    addMarker: function(localization, index)
    {
        var marker = new google.maps.Marker({
                    map: this.map,
                    title: '',
                    position: localization
        });
        
        google.maps.event.addListener(marker, 'click', Ext.bind(this.showMarkerInfo, this, [marker, index]));
    },
    
    /**
     * Shows popup window when marker is clicked
     *
     * @private
     */    
    showMarkerInfo: function(marker, index)
    {
        var content = this.getInfoContent(index);
        if(content) {
            var info = new google.maps.InfoWindow({
                content: content
            });

            info.open(this.map, marker);
        }
    },    
    
    /**
     * Get info content for marker
     *
     * @private
     * @return {Boolean}\{String}
     */
    getInfoContent: function(index)
    {
        return false;
    },
    
    /**
     * Get container dom element
     *
     * @private
     */
    getContainer: function()
    {
        return document.getElementById(this.renderTo);
    },
    
    /**
     * Get addresses
     *
     * @private
     */
    getAddresses: function()
    {
        if(this.address) {
            return [this.address];
        } else {
            return this.addresses;
        }
    },
    
    /**
     * Creates map
     *
     * @private
     */
    createMap: function() {
        var myOptions = {
            zoom: this.zoom,
            mapTypeId: google.maps.MapTypeId.TERRAIN
        };
        
        this.map = new google.maps.Map(this.getContainer(), myOptions);
    },
    
    /**
     * Get localization from google service
     *
     * @private
     */
    getLocalization: function(address, success, failure)
    {
        this.geocoder.geocode( {
            'address': address
        }, function(results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                    success(results[0].geometry.location);
            } else {
                if(failure) {
                    failure();
                }
            }
        });
        
    },
    
    /**
     * Center map;
     *
     * @private
     * @return {Boolean}
     */
    centerMap: function() 
    {
        var me = this;
        var address = this.center;
        
        if(!address) {
            address = this.getAddresses()[0];
        }
        
        var localization = this.getLocalization(address, function(localization) {
            me.map.setCenter(localization);
        });
    }
})