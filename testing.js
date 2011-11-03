/*!
 * Testing
 */

Ext.onReady(function() {
    TestUnit.init();
    
    // Routing:
    
    TestUnit.group('Routing');
    TestUnit.isType(Routing, 'object', 'Routing');
    
    Routing.prefix = '/app_dev.php';
    Routing.variablePrefix = '{';
    Routing.variableSuffix = '}';
    Routing.connect("test1", "\/author\/show\/{name}", []);
    Routing.connect("test2", "\/shop\/category/{category}\/product\/{product}", []);
    Routing.connect("test3", "/shop/producer/{producer}/show.html#section-top", []);
    
    TestUnit.isType(
        Routing.generate('test1', {name: 'Stanislaw-Lem'}),
        'string',
        "Routing.generate('test1', {name: 'Stanislaw-Lem'})"
    );
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
    
    // Translations:
    
    TestUnit.group('Translations');
    TestUnit.isType(ExposeTranslation, 'object', 'ExposeTranslation');
    
    ExposeTranslation.locale = 'pl';
    ExposeTranslation.defaultDomains = ["Hatimeria"];
    ExposeTranslation.add("Hatimeria:direct.title", "B\u0142\u0105d po stronie serwera");
    ExposeTranslation.add("Validators:direct.forbidden", "Brak dost\u0119pu");
    
    
    TestUnit.isType(
        ExposeTranslation.get('direct.title'), 'string', "ExposeTranslation.get('direct.title')"
    );
    TestUnit.test(
        ExposeTranslation.get('direct.title'), 'Błąd po stronie serwera', 'direct.title'
    );
    TestUnit.test(
        ExposeTranslation.get('Validators:direct.forbidden'), 'Brak dostępu', 'Validators:direct.forbidden'
    );
    
});