Ext.define("Hatimeria.core.field.Currency", {
    extend: "Ext.form.field.Number",
    alias: 'widget.currencyfield',
    decimalSeparator: ',',
    hideTrigger: true,
    decimalPrecision : 2,
    
    getSubmitValue: function() {
        return this.getValue();
    }
})