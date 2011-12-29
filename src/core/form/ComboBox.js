/**
 * @depreciated
 */
Ext.define('Hatimeria.core.form.ComboBox', {
    extend: 'Ext.form.field.ComboBox',
    alias: 'widget.xcombo',
    triggerTip: 'Click to clear selection.',
    spObj:'',
    spForm:'',
    spExtraParam:'',
    qtip:'Clearable Combo Box',
    trigger1Class: 'x-form-select-trigger',
    trigger2Class: 'x-form-clear-trigger',
    onRender: function(ct, position){
        this.callParent([ct, position])
        var id = this.getId();
        this.triggerConfig = {
            tag:'div', 
            cls:'x-form-twin-triggers', 
            style:'display:block;width:46px;', 
            cn:[

            {
                tag: "img", 
                style: Ext.isIE?'margin-left:-3;height:19px':'', 
                src: Ext.BLANK_IMAGE_URL, 
                id:"trigger1" + id, 
                name:"trigger1" + id, 
                cls: "x-form-trigger " + this.trigger1Class
                },

                {
                tag: "img", 
                style: Ext.isIE?'margin-left:-6;height:19px':'', 
                src: Ext.BLANK_IMAGE_URL, 
                id:"trigger2" + id, 
                name:"trigger2" + id, 
                cls: "x-form-trigger " + this.trigger2Class
                }
            ]
            };
        this.triggerEl.replaceWith(this.triggerConfig);
        this.triggerEl.on('mouseup',function(e){

            if(e.target.name == "trigger1" + id ){
                this.onTriggerClick();
            } else if(e.target.name == "trigger2" + id){
                this.reset();
                if(this.spObj!=='' && this.spExtraParam !== ''){
                    Ext.getCmp(this.spObj).store.setExtraParam(this.spExtraParam,'');
                    Ext.getCmp(this.spObj).store.load()
                }
                if(this.spForm!==''){
                    Ext.getCmp(this.spForm).getForm().reset();
                }
            }
        },
        this);
        var trigger1 = Ext.get("trigger1" + id);
        var trigger2 = Ext.get("trigger2" + id);
        trigger1.addClsOnOver('x-form-trigger-over');
        trigger2.addClsOnOver('x-form-trigger-over');
    }
});
