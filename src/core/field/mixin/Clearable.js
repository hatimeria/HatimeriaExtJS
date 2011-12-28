/**
 * Clearable field
 * 
 * usage:
 *     mixins: {
 *       clearable: 'Hatimeria.core.field.mixin.Clearable'
 *     }
 * 
 * @class Hatimeria.core.field.mixin.Clearable
 */
(function() {
    
    Ext.define('Hatimeria.core.field.mixin.Clearable', {
        
        /**
         * Clear trigger
         */
        trigger2Cls: 'x-form-clear-trigger',
        
        /**
         * Event fires when a second tigger is clicked
         * 
         * @private
         */
        onTrigger2Click: function() {
            var val = this.getValue()
            this.reset();
            this.blur();
            Ext.get(this.inputEl).addCls('x-form-empty-field');
            this.fireEvent('reset', this, val);
        }
    });
    
})();