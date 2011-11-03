/*!
 * Testing
 */

Ext.onReady(function() {
    TestUnit.init();
    
    Routing.prefix = '/app_dev.php';
    Routing.variablePrefix = '{';
    Routing.variableSuffix = '}';
    Routing.connect("test1", "\/author\/show\/{name}", []);
    Routing.connect("test2", "\/shop\/category/{category}\/product\/{product}", []);
    Routing.connect("test3", "/shop/producer/{producer}/show.html#section-top", []);
    
    TestUnit.group('Routing');
    
    TestUnit.test(
        Routing.generate('test1', {name: 'Stanislaw-Lem'}), 
        '/app_dev.php/author/show/Stanislaw-Lem',
        '/app_dev.php/author/show/Stanislaw-Lem'
    );
        
    TestUnit.test(
        Routing.generate('test2', {category: 'Monitory', product: 'LCD-Samsung-flat-dw156'}), 
        '/app_dev.php/shop/category/Monitory/product/LCD-Samsung-flat-dw156',
        '/app_dev.php/shop/category/Monitory/product/LCD-Samsung-flat-dw156'
    );
        
    TestUnit.test(
        Routing.generate('test3', {producer: 'Samsung'}), 
        '/app_dev.php/shop/producer/Samsung/show.html#section-top',
        '/app_dev.php/shop/producer/Samsung/show.html#section-top'
    );
    
});