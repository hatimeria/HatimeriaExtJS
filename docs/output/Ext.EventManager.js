Ext.data.JsonP.Ext_EventManager({"extends":null,"inheritable":false,"statics":{"css_var":[],"cfg":[],"method":[],"css_mixin":[],"event":[],"property":[]},"alternateClassNames":[],"singleton":true,"code_type":"assignment","superclasses":[],"members":{"css_var":[],"method":[{"meta":{},"tagname":"method","owner":"Ext.EventManager","name":"addListener","id":"method-addListener"},{"meta":{},"tagname":"method","owner":"Ext.EventManager","name":"getId","id":"method-getId"},{"meta":{},"tagname":"method","owner":"Ext.EventManager","name":"getKeyEvent","id":"method-getKeyEvent"},{"meta":{},"tagname":"method","owner":"Ext.EventManager","name":"getPageX","id":"method-getPageX"},{"meta":{},"tagname":"method","owner":"Ext.EventManager","name":"getPageXY","id":"method-getPageXY"},{"meta":{},"tagname":"method","owner":"Ext.EventManager","name":"getPageY","id":"method-getPageY"},{"meta":{},"tagname":"method","owner":"Ext.EventManager","name":"getRelatedTarget","id":"method-getRelatedTarget"},{"meta":{},"tagname":"method","owner":"Ext.EventManager","name":"getTarget","id":"method-getTarget"},{"meta":{},"tagname":"method","owner":"Ext.EventManager","name":"on","id":"method-on"},{"meta":{},"tagname":"method","owner":"Ext.EventManager","name":"onDocumentReady","id":"method-onDocumentReady"},{"meta":{},"tagname":"method","owner":"Ext.EventManager","name":"onWindowResize","id":"method-onWindowResize"},{"meta":{},"tagname":"method","owner":"Ext.EventManager","name":"preventDefault","id":"method-preventDefault"},{"meta":{},"tagname":"method","owner":"Ext.EventManager","name":"purgeElement","id":"method-purgeElement"},{"meta":{},"tagname":"method","owner":"Ext.EventManager","name":"removeAll","id":"method-removeAll"},{"meta":{},"tagname":"method","owner":"Ext.EventManager","name":"removeListener","id":"method-removeListener"},{"meta":{},"tagname":"method","owner":"Ext.EventManager","name":"removeResizeListener","id":"method-removeResizeListener"},{"meta":{},"tagname":"method","owner":"Ext.EventManager","name":"removeUnloadListener","id":"method-removeUnloadListener"},{"meta":{},"tagname":"method","owner":"Ext.EventManager","name":"stopEvent","id":"method-stopEvent"},{"meta":{},"tagname":"method","owner":"Ext.EventManager","name":"stopPropagation","id":"method-stopPropagation"},{"meta":{},"tagname":"method","owner":"Ext.EventManager","name":"un","id":"method-un"}],"cfg":[],"css_mixin":[],"event":[],"property":[]},"component":false,"mixins":[],"subclasses":[],"html_meta":{},"requires":[],"mixedInto":[],"tagname":"class","meta":{},"private":false,"files":[{"filename":"EventManager.js","href":"EventManager2.html#Ext-EventManager"}],"allMixins":[],"name":"Ext.EventManager","aliases":{},"inheritdoc":null,"html":"<div><pre class=\"hierarchy\"><h4>Files</h4><div class='dependency'><a href='source/EventManager2.html#Ext-EventManager' target='_blank'>EventManager.js</a></div></pre><div class='doc-contents'><p>Registers event handlers that want to receive a normalized EventObject instead of the standard browser event and provides\nseveral useful events directly.\nSee <a href=\"#!/api/Ext.EventObject\" rel=\"Ext.EventObject\" class=\"docClass\">Ext.EventObject</a> for more details on normalized event objects.</p>\n</div><div class='members'><div class='members-section'><div class='definedBy'>Defined By</div><h3 class='members-title icon-method'>Methods</h3><div class='subsection'><div id='method-addListener' class='member first-child not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Ext.EventManager'>Ext.EventManager</span><br/><a href='source/EventManager2.html#Ext-EventManager-method-addListener' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Ext.EventManager-method-addListener' class='name expandable'>addListener</a>( <span class='pre'>String/HTMLElement el, String eventName, Function handler, [Object scope], [Object options]</span> )</div><div class='description'><div class='short'>Appends an event handler to an element. ...</div><div class='long'><p>Appends an event handler to an element.  The shorthand version <a href=\"#!/api/Ext.EventManager-method-on\" rel=\"Ext.EventManager-method-on\" class=\"docClass\">on</a> is equivalent.  Typically you will\nuse <a href=\"#!/api/Ext.Element-method-addListener\" rel=\"Ext.Element-method-addListener\" class=\"docClass\">Ext.Element.addListener</a> directly on an Element in favor of calling this version.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>el</span> : String/HTMLElement<div class='sub-desc'><p>The html element or id to assign the event handler to.</p>\n</div></li><li><span class='pre'>eventName</span> : String<div class='sub-desc'><p>The name of the event to listen for.</p>\n</div></li><li><span class='pre'>handler</span> : Function<div class='sub-desc'><p>The handler function the event invokes. This function is passed\nthe following parameters:<ul>\n<li>evt : EventObject<div class=\"sub-desc\">The <a href=\"#!/api/Ext.EventObject\" rel=\"Ext.EventObject\" class=\"docClass\">EventObject</a> describing the event.</div></li>\n<li>t : Element<div class=\"sub-desc\">The <a href=\"#!/api/Ext.Element\" rel=\"Ext.Element\" class=\"docClass\">Element</a> which was the target of the event.\nNote that this may be filtered by using the <tt>delegate</tt> option.</div></li>\n<li>o : Object<div class=\"sub-desc\">The options object from the addListener call.</div></li>\n</ul></p>\n</div></li><li><span class='pre'>scope</span> : Object (optional)<div class='sub-desc'><p>The scope (<b><code>this</code></b> reference) in which the handler function is executed. <b>Defaults to the Element</b>.</p>\n</div></li><li><span class='pre'>options</span> : Object (optional)<div class='sub-desc'><p>An object containing handler configuration properties.\nThis may contain any of the following properties:<ul>\n<li>scope : Object<div class=\"sub-desc\">The scope (<b><code>this</code></b> reference) in which the handler function is executed. <b>Defaults to the Element</b>.</div></li>\n<li>delegate : String<div class=\"sub-desc\">A simple selector to filter the target or look for a descendant of the target</div></li>\n<li>stopEvent : Boolean<div class=\"sub-desc\">True to stop the event. That is stop propagation, and prevent the default action.</div></li>\n<li>preventDefault : Boolean<div class=\"sub-desc\">True to prevent the default action</div></li>\n<li>stopPropagation : Boolean<div class=\"sub-desc\">True to prevent event propagation</div></li>\n<li>normalized : Boolean<div class=\"sub-desc\">False to pass a browser event to the handler function instead of an <a href=\"#!/api/Ext.EventObject\" rel=\"Ext.EventObject\" class=\"docClass\">Ext.EventObject</a></div></li>\n<li>delay : Number<div class=\"sub-desc\">The number of milliseconds to delay the invocation of the handler after te event fires.</div></li>\n<li>single : Boolean<div class=\"sub-desc\">True to add a handler to handle just the next firing of the event, and then remove itself.</div></li>\n<li>buffer : Number<div class=\"sub-desc\">Causes the handler to be scheduled to run in an <a href=\"#!/api/Ext.util.DelayedTask\" rel=\"Ext.util.DelayedTask\" class=\"docClass\">Ext.util.DelayedTask</a> delayed\nby the specified number of milliseconds. If the event fires again within that time, the original\nhandler is <em>not</em> invoked, but the new handler is scheduled in its place.</div></li>\n<li>target : Element<div class=\"sub-desc\">Only call the handler if the event was fired on the target Element, <i>not</i> if the event was bubbled up from a child node.</div></li>\n</ul><br></p>\n\n<p>See <a href=\"#!/api/Ext.Element-method-addListener\" rel=\"Ext.Element-method-addListener\" class=\"docClass\">Ext.Element.addListener</a> for examples of how to use these options.</p>\n\n</div></li></ul></div></div></div><div id='method-getId' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Ext.EventManager'>Ext.EventManager</span><br/><a href='source/EventManager2.html#Ext-EventManager-method-getId' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Ext.EventManager-method-getId' class='name expandable'>getId</a>( <span class='pre'>HTMLElement/<a href=\"#!/api/Ext.Element\" rel=\"Ext.Element\" class=\"docClass\">Ext.Element</a> element</span> ) : String</div><div class='description'><div class='short'>Get the id of the element. ...</div><div class='long'><p>Get the id of the element. If one has not been assigned, automatically assign it.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>element</span> : HTMLElement/<a href=\"#!/api/Ext.Element\" rel=\"Ext.Element\" class=\"docClass\">Ext.Element</a><div class='sub-desc'><p>The element to get the id for.</p>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'>String</span><div class='sub-desc'><p>id</p>\n</div></li></ul></div></div></div><div id='method-getKeyEvent' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Ext.EventManager'>Ext.EventManager</span><br/><a href='source/EventManager2.html#Ext-EventManager-method-getKeyEvent' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Ext.EventManager-method-getKeyEvent' class='name expandable'>getKeyEvent</a>( <span class='pre'></span> ) : String</div><div class='description'><div class='short'>Indicates which event to use for getting key presses. ...</div><div class='long'><p>Indicates which event to use for getting key presses.</p>\n<h3 class='pa'>Returns</h3><ul><li><span class='pre'>String</span><div class='sub-desc'><p>The appropriate event name.</p>\n</div></li></ul></div></div></div><div id='method-getPageX' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Ext.EventManager'>Ext.EventManager</span><br/><a href='source/EventManager2.html#Ext-EventManager-method-getPageX' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Ext.EventManager-method-getPageX' class='name expandable'>getPageX</a>( <span class='pre'>Object event</span> ) : Number</div><div class='description'><div class='short'>Gets the x coordinate from the event ...</div><div class='long'><p>Gets the x coordinate from the event</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>event</span> : Object<div class='sub-desc'><p>The event</p>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'>Number</span><div class='sub-desc'><p>The x coordinate</p>\n</div></li></ul></div></div></div><div id='method-getPageXY' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Ext.EventManager'>Ext.EventManager</span><br/><a href='source/EventManager2.html#Ext-EventManager-method-getPageXY' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Ext.EventManager-method-getPageXY' class='name expandable'>getPageXY</a>( <span class='pre'>Object event</span> ) : Number[]</div><div class='description'><div class='short'>Gets the x &amp; y coordinate from the event ...</div><div class='long'><p>Gets the x &amp; y coordinate from the event</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>event</span> : Object<div class='sub-desc'><p>The event</p>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'>Number[]</span><div class='sub-desc'><p>The x/y coordinate</p>\n</div></li></ul></div></div></div><div id='method-getPageY' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Ext.EventManager'>Ext.EventManager</span><br/><a href='source/EventManager2.html#Ext-EventManager-method-getPageY' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Ext.EventManager-method-getPageY' class='name expandable'>getPageY</a>( <span class='pre'>Object event</span> ) : Number</div><div class='description'><div class='short'>Gets the y coordinate from the event ...</div><div class='long'><p>Gets the y coordinate from the event</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>event</span> : Object<div class='sub-desc'><p>The event</p>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'>Number</span><div class='sub-desc'><p>The y coordinate</p>\n</div></li></ul></div></div></div><div id='method-getRelatedTarget' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Ext.EventManager'>Ext.EventManager</span><br/><a href='source/EventManager2.html#Ext-EventManager-method-getRelatedTarget' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Ext.EventManager-method-getRelatedTarget' class='name expandable'>getRelatedTarget</a>( <span class='pre'>Object event</span> ) : HTMLElement</div><div class='description'><div class='short'>Gets the related target from the event. ...</div><div class='long'><p>Gets the related target from the event.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>event</span> : Object<div class='sub-desc'><p>The event</p>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'>HTMLElement</span><div class='sub-desc'><p>The related target.</p>\n</div></li></ul></div></div></div><div id='method-getTarget' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Ext.EventManager'>Ext.EventManager</span><br/><a href='source/EventManager2.html#Ext-EventManager-method-getTarget' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Ext.EventManager-method-getTarget' class='name expandable'>getTarget</a>( <span class='pre'>Object event</span> ) : HTMLElement</div><div class='description'><div class='short'>Gets the target of the event. ...</div><div class='long'><p>Gets the target of the event.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>event</span> : Object<div class='sub-desc'><p>The event</p>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'>HTMLElement</span><div class='sub-desc'><p>target</p>\n</div></li></ul></div></div></div><div id='method-on' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Ext.EventManager'>Ext.EventManager</span><br/><a href='source/EventManager2.html#Ext-EventManager-method-on' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Ext.EventManager-method-on' class='name expandable'>on</a>( <span class='pre'></span> )</div><div class='description'><div class='short'>Alias for Ext.EventManager.addListener ...</div><div class='long'><p>Alias for <a href=\"#!/api/Ext.EventManager-method-addListener\" rel=\"Ext.EventManager-method-addListener\" class=\"docClass\">Ext.EventManager.addListener</a></p>\n</div></div></div><div id='method-onDocumentReady' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Ext.EventManager'>Ext.EventManager</span><br/><a href='source/EventManager2.html#Ext-EventManager-method-onDocumentReady' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Ext.EventManager-method-onDocumentReady' class='name expandable'>onDocumentReady</a>( <span class='pre'>Function fn, [Object scope], [Boolean options]</span> )</div><div class='description'><div class='short'>Adds a listener to be notified when the document is ready (before onload and before images are loaded). ...</div><div class='long'><p>Adds a listener to be notified when the document is ready (before onload and before images are loaded). Can be\naccessed shorthanded as <a href=\"#!/api/Ext-method-onReady\" rel=\"Ext-method-onReady\" class=\"docClass\">Ext.onReady</a>().</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>fn</span> : Function<div class='sub-desc'><p>The method the event invokes.</p>\n</div></li><li><span class='pre'>scope</span> : Object (optional)<div class='sub-desc'><p>The scope (<code>this</code> reference) in which the handler function executes. Defaults to the browser window.</p>\n</div></li><li><span class='pre'>options</span> : Boolean (optional)<div class='sub-desc'><p>Options object as passed to <a href=\"#!/api/Ext.Element-method-addListener\" rel=\"Ext.Element-method-addListener\" class=\"docClass\">Ext.Element.addListener</a>.</p>\n</div></li></ul></div></div></div><div id='method-onWindowResize' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Ext.EventManager'>Ext.EventManager</span><br/><a href='source/EventManager2.html#Ext-EventManager-method-onWindowResize' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Ext.EventManager-method-onWindowResize' class='name expandable'>onWindowResize</a>( <span class='pre'>Function fn, Object scope, Boolean options</span> )</div><div class='description'><div class='short'>Adds a listener to be notified when the browser window is resized and provides resize event buffering (100 millisecon...</div><div class='long'><p>Adds a listener to be notified when the browser window is resized and provides resize event buffering (100 milliseconds),\npasses new viewport width and height to handlers.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>fn</span> : Function<div class='sub-desc'><p>The handler function the window resize event invokes.</p>\n</div></li><li><span class='pre'>scope</span> : Object<div class='sub-desc'><p>The scope (<code>this</code> reference) in which the handler function executes. Defaults to the browser window.</p>\n</div></li><li><span class='pre'>options</span> : Boolean<div class='sub-desc'><p>Options object as passed to <a href=\"#!/api/Ext.Element-method-addListener\" rel=\"Ext.Element-method-addListener\" class=\"docClass\">Ext.Element.addListener</a></p>\n</div></li></ul></div></div></div><div id='method-preventDefault' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Ext.EventManager'>Ext.EventManager</span><br/><a href='source/EventManager2.html#Ext-EventManager-method-preventDefault' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Ext.EventManager-method-preventDefault' class='name expandable'>preventDefault</a>( <span class='pre'>Event The</span> )</div><div class='description'><div class='short'>Prevents the browsers default handling of the event. ...</div><div class='long'><p>Prevents the browsers default handling of the event.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>The</span> : Event<div class='sub-desc'><p>event to prevent the default</p>\n</div></li></ul></div></div></div><div id='method-purgeElement' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Ext.EventManager'>Ext.EventManager</span><br/><a href='source/EventManager2.html#Ext-EventManager-method-purgeElement' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Ext.EventManager-method-purgeElement' class='name expandable'>purgeElement</a>( <span class='pre'>String/HTMLElement el, [String eventName]</span> )</div><div class='description'><div class='short'>Recursively removes all previous added listeners from an element and its children. ...</div><div class='long'><p>Recursively removes all previous added listeners from an element and its children. Typically you will use <a href=\"#!/api/Ext.Element-method-purgeAllListeners\" rel=\"Ext.Element-method-purgeAllListeners\" class=\"docClass\">Ext.Element.purgeAllListeners</a>\ndirectly on an Element in favor of calling this version.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>el</span> : String/HTMLElement<div class='sub-desc'><p>The id or html element from which to remove all event handlers.</p>\n</div></li><li><span class='pre'>eventName</span> : String (optional)<div class='sub-desc'><p>The name of the event.</p>\n</div></li></ul></div></div></div><div id='method-removeAll' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Ext.EventManager'>Ext.EventManager</span><br/><a href='source/EventManager2.html#Ext-EventManager-method-removeAll' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Ext.EventManager-method-removeAll' class='name expandable'>removeAll</a>( <span class='pre'>String/HTMLElement el</span> )</div><div class='description'><div class='short'>Removes all event handers from an element. ...</div><div class='long'><p>Removes all event handers from an element.  Typically you will use <a href=\"#!/api/Ext.Element-method-removeAllListeners\" rel=\"Ext.Element-method-removeAllListeners\" class=\"docClass\">Ext.Element.removeAllListeners</a>\ndirectly on an Element in favor of calling this version.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>el</span> : String/HTMLElement<div class='sub-desc'><p>The id or html element from which to remove all event handlers.</p>\n</div></li></ul></div></div></div><div id='method-removeListener' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Ext.EventManager'>Ext.EventManager</span><br/><a href='source/EventManager2.html#Ext-EventManager-method-removeListener' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Ext.EventManager-method-removeListener' class='name expandable'>removeListener</a>( <span class='pre'>String/HTMLElement el, String eventName, Function fn, Object scope</span> )</div><div class='description'><div class='short'>Removes an event handler from an element. ...</div><div class='long'><p>Removes an event handler from an element.  The shorthand version <a href=\"#!/api/Ext.EventManager-method-un\" rel=\"Ext.EventManager-method-un\" class=\"docClass\">un</a> is equivalent.  Typically\nyou will use <a href=\"#!/api/Ext.Element-method-removeListener\" rel=\"Ext.Element-method-removeListener\" class=\"docClass\">Ext.Element.removeListener</a> directly on an Element in favor of calling this version.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>el</span> : String/HTMLElement<div class='sub-desc'><p>The id or html element from which to remove the listener.</p>\n</div></li><li><span class='pre'>eventName</span> : String<div class='sub-desc'><p>The name of the event.</p>\n</div></li><li><span class='pre'>fn</span> : Function<div class='sub-desc'><p>The handler function to remove. <b>This must be a reference to the function passed into the <a href=\"#!/api/Ext.EventManager-method-addListener\" rel=\"Ext.EventManager-method-addListener\" class=\"docClass\">addListener</a> call.</b></p>\n</div></li><li><span class='pre'>scope</span> : Object<div class='sub-desc'><p>If a scope (<b><code>this</code></b> reference) was specified when the listener was added,\nthen this must refer to the same object.</p>\n</div></li></ul></div></div></div><div id='method-removeResizeListener' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Ext.EventManager'>Ext.EventManager</span><br/><a href='source/EventManager2.html#Ext-EventManager-method-removeResizeListener' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Ext.EventManager-method-removeResizeListener' class='name expandable'>removeResizeListener</a>( <span class='pre'>Function fn, Object scope</span> )</div><div class='description'><div class='short'>Removes the passed window resize listener. ...</div><div class='long'><p>Removes the passed window resize listener.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>fn</span> : Function<div class='sub-desc'><p>The method the event invokes</p>\n</div></li><li><span class='pre'>scope</span> : Object<div class='sub-desc'><p>The scope of handler</p>\n</div></li></ul></div></div></div><div id='method-removeUnloadListener' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Ext.EventManager'>Ext.EventManager</span><br/><a href='source/EventManager2.html#Ext-EventManager-method-removeUnloadListener' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Ext.EventManager-method-removeUnloadListener' class='name expandable'>removeUnloadListener</a>( <span class='pre'>Function fn, Object scope</span> )</div><div class='description'><div class='short'>Removes the passed window unload listener. ...</div><div class='long'><p>Removes the passed window unload listener.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>fn</span> : Function<div class='sub-desc'><p>The method the event invokes</p>\n</div></li><li><span class='pre'>scope</span> : Object<div class='sub-desc'><p>The scope of handler</p>\n</div></li></ul></div></div></div><div id='method-stopEvent' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Ext.EventManager'>Ext.EventManager</span><br/><a href='source/EventManager2.html#Ext-EventManager-method-stopEvent' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Ext.EventManager-method-stopEvent' class='name expandable'>stopEvent</a>( <span class='pre'>Event The</span> )</div><div class='description'><div class='short'>Stop the event (preventDefault and stopPropagation) ...</div><div class='long'><p>Stop the event (preventDefault and stopPropagation)</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>The</span> : Event<div class='sub-desc'><p>event to stop</p>\n</div></li></ul></div></div></div><div id='method-stopPropagation' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Ext.EventManager'>Ext.EventManager</span><br/><a href='source/EventManager2.html#Ext-EventManager-method-stopPropagation' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Ext.EventManager-method-stopPropagation' class='name expandable'>stopPropagation</a>( <span class='pre'>Event The</span> )</div><div class='description'><div class='short'>Cancels bubbling of the event. ...</div><div class='long'><p>Cancels bubbling of the event.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>The</span> : Event<div class='sub-desc'><p>event to stop bubbling.</p>\n</div></li></ul></div></div></div><div id='method-un' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Ext.EventManager'>Ext.EventManager</span><br/><a href='source/EventManager2.html#Ext-EventManager-method-un' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Ext.EventManager-method-un' class='name expandable'>un</a>( <span class='pre'></span> )</div><div class='description'><div class='short'>Alias for Ext.EventManager.removeListener ...</div><div class='long'><p>Alias for <a href=\"#!/api/Ext.EventManager-method-removeListener\" rel=\"Ext.EventManager-method-removeListener\" class=\"docClass\">Ext.EventManager.removeListener</a></p>\n</div></div></div></div></div></div></div>","uses":[],"id":"class-Ext.EventManager"});