/*!
 * Testing
 */

Ext.onReady(function() {
    TestUnit.init();
    
    // ROUTING
    
    TestUnit.group('Routing');
    
    Routing.prefix = '/app_dev.php';
    Routing.variablePrefix = '{';
    Routing.variableSuffix = '}';
    Routing.connect("test1", "\/author\/show\/{name}", []);
    Routing.connect("test2", "\/shop\/category/{category}\/product\/{product}", []);
    Routing.connect("test3", "/shop/producer/{producer}/show.html#section-top", []);
    
    TestUnit.isType(Routing, 'object', 'Routing');
    
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
    
    TestUnit.group('Translations');
    
    ExposeTranslation.locale = 'pl';
    ExposeTranslation.defaultDomains = ["messages"];
    ExposeTranslation.add("HatimeriaExtJSBundle:direct.title", "B\u0142\u0105d po stronie serwera");
    ExposeTranslation.add("HatimeriaExtJSBundle:direct.forbidden", "Brak dost\u0119pu");
    ExposeTranslation.add("HatimeriaExtJSBundle:direct.try_later", "Nast\u0105pi\u0142 b\u0142\u0105d po stronie serwera. Spr\u00f3buj ponownie p\u00f3\u017aniej.");
    ExposeTranslation.add("HatimeriaExtJSBundle:form.alert_title", "Formularz zawiera b\u0142\u0119dy");
    ExposeTranslation.add("HatimeriaExtJSBundle:form.image.browse", "Przegl\u0105daj");
    ExposeTranslation.add("HatimeriaExtJSBundle:form.image.delete", "Usu\u0144");
    
    TestUnit.test(
        
    );
    
});