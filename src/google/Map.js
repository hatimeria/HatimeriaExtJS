/** 
 * Google map
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
     * Dom element id in which map will be placed
     * 
     * @cfg {String} renderTo
     */    
    renderTo: null,
    
    /**
     * Constructor
     * 
     * @param {Object} config
     */
    constructor: function(config)
    {
        this.geocoder = new google.maps.Geocoder();

        return this;
    },
    
    /**
     * Renders map
     */    
    render: function()
    {
        this.geocoder.geocode( {
            'address': this.config.address
        }, Ext.bind(this.handleGoogleResponse, this));
    },
    
    /**
     * Get container dom element
     *
     * @private
     */
    getContainer: function()
    {
        return document.getElementById(this.config.renderTo);
    },
    
    /**
     * Get localization from google service
     *
     * @private
     */
    handleGoogleResponse: function(results, status)
    {
        if (status == google.maps.GeocoderStatus.OK) {
            var latlng = new google.maps.LatLng(-34.397, 150.644);
            var myOptions = {
                zoom: 9,
                center: latlng,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            }                  
            var map = new google.maps.Map(this.getContainer(), myOptions);
            map.setCenter(results[0].geometry.location);
            var marker = new google.maps.Marker({
                map: map,
                position: results[0].geometry.location
            });
        } else {
            alert("Geocode was not successful for the following reason: " + status);
        }
    }
})