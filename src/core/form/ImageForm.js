/**
 * Image Form (upload of photo)
 * 
 * @class Hatimeria.core.form.ImageForm
 * @extends Ext.form.Panel
 */
(function() {

    Ext.define('Hatimeria.core.form.ImageForm', {
        extend: 'Ext.form.Panel',
        mixins: {
            translationable: 'Hatimeria.core.mixins.Translationable'
        },
        transDomain: 'HatimeriaExtJSBundle',
        
        /**
         * Image width
         * 
         * @cfg {Number} imgWidth
         */
        imgWidth: 100,

        /**
         * Image height
         * 
         * @cfg {Number} imgHeight
         */
        imgHeight: 100,

        /**
         * Json submit property name
         * 
         * @cfg {String} imgName
         */
        imgName: 'image',
        
        /**
         * POST submit property name
         * 
         * @cfg {String} name
         */
        name: 'photo',

        /**
         * Default image
         * 
         * @cfg {String} defaultImage
         */
        defaultImage: '',

        /**
         * Api for request procedures
         * @cfg {Object} api
         *     @example
         *     api: {
         *       submit: function() {}, 
         *       remove: function() {}
         *     }
         */
        api: {},

        /**
         * Addition params from outside
         * 
         * @cfg {Object} params
         */
        params: {},
            
        /**
         * Constructor
         * 
         * @private
         * @param {} config
         */
        constructor: function(config)
        {
            this.initConfig(config);
            this.callParent([config]);
        },
        
        /**
         * Initializes component
         * 
         * @private
         */
        initComponent: function()
        {
            var _this = this;
            
            // Image
            var img = Ext.create('Ext.Img', {
                itemId: 'image-form-img',
                width: this.imgWidth,
                height: this.imgHeight
            });
            
            // Upload button
            var uploadBtn = Ext.create('Ext.form.field.File', {
                itemId: 'image-form-upload',
                allowBlank: true,
                name: this.name,
                msgTarget: 'none',
                fieldLabel: false,
                buttonText: this.__("form.image.browse"),
                buttonOnly: true,
                baseBodyCls: 'image-form-upload',
                hidden: false,
                listeners: {
                    change: function()
                    {
                        _this.submitImage();
                    }
                }
            });
                       
            // Delete button:
            var deleteBtn = Ext.create('Ext.button.Button', {
                text: this.__("form.image.delete"),
                scope: this,
                handler: function()
                {
                    this.removeImage();
                }
            });
            
            var config = {
                itemId: 'image-form',
                layout: 'border',
                border: false,
                height: this.imgHeight + 5,
                items: [
                    {
                        itemId: 'image-form-imgcontainer',
                        xtype: 'panel',
                        region: 'west',
                        width: this.imgWidth + 5,
                        height: this.imgHeight + 5,
                        items: [ img ]
                    },
                    {
                        xtype: 'form',
                        itemId: 'image-form-form',
                        region: 'center',
                        padding: '0 0 0 10',
                        border: false,
                        method: 'POST',
                        api: {
                            submit: this.api.submit
                        },
                        fileUpload: true,
                        layout: 'auto',
                        items: [ 
                            uploadBtn, 
                            deleteBtn,
                            {
                                xtype: 'hiddenfield',
                                itemId: 'current-image-path',
                                name: this.imgName,
                                listeners: {
                                    change: function(field, value) {
                                        _this.setSrc(value);
                                    }
                                }
                            }
                        ]
                    }
                ]
            };
            
            Ext.apply(this, Ext.apply(config, this.initialConfig || {}));
            this.callParent();
            this.addEvents(
                
                /**
                 * @event imageloaded
                 * Fires after load image
                 */
                'imageloaded',
                
                /**
                 * @event imageremove
                 * Fires after image remove
                 */
                'imageremove',
                
                /**
                 * @event beforeload
                 * Fires before image load
                 */
                'beforeload'
            );
        },
        
        /**
         * Sets current image
         * 
         * @param {String} path
         */
        setCurrent: function(path)
        {
            this
                .getComponent('image-form-form')
                .getComponent('current-image-path')
                .setValue(path);
            
            this.setSrc(path);
        },
        
        /**
         * Sets path to img
         * 
         * @param {String} path
         */
        setSrc: function(path)
        {
            this
                .getComponent('image-form-imgcontainer')
                .getComponent('image-form-img')
                .setSrc(Ext.String.format('{0}?_dc={1}', path, (new Date()).getTime()));
        },
        
        /**
         * Current path
         * 
         * @return {String}
         */
        getCurrent: function()
        {
            return this
                .getComponent('image-form-form')
                .getComponent('current-image-path')
                .getValue();
        },
        
        /**
         * Submits image to temporary folder
         * 
         * @private
         */
        submitImage: function()
        {
            var _this = this;
            this.fireEvent('beforeload', this);
            this.getComponent('image-form-form').submit({
                params: this.params,
                success: function(form, response) {
                    _this.setCurrent(response.result.record);
                    _this.fireEvent('imageloaded', response.result);
                }
            });
        },
        
        /**
         * Removes image
         */
        removeImage: function()
        {
            var _this = this;
            if (typeof this.api.remove == 'function')
            {
                this.api.remove({}, function(form, response) {
                    _this.fireEvent('imageremove', response);
                    _this.setCurrent(_this.defaultImage);
                });
            }
            else
            {
                _this.fireEvent('imageremove');
                _this.setCurrent(_this.defaultImage);
            }
        },
        
        /**
         * Current data
         * 
         * @return {String}
         */
        getSubmitData: function()
        {
            var data = {};
            data[this.imgName] = this.getCurrent();
            
            return data;
        }
        
    });

})();
