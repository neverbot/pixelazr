
// Global addEvent to fix old IE way of attaching events
function addEvent(evnt, elem, func)
{
  if (elem.addEventListener)
    // W3C DOM
    elem.addEventListener(evnt, func, false);
  else if (elem.attachEvent)
    // IE DOM
    elem.attachEvent('on' + evnt, func);
    // If we want to expose the currentTarget (non-existent in older IE)
    // elem.attachEvent('on' + evnt, function(a) { a.currentTarget = elem; func(a); });
  else
    // Not much to do
    elem['on' + evnt] = func;
}

// Polyfill for the Array.isArray function
Array.isArray || (Array.isArray = function ( a ) {
    return'' + a !== a && {}.toString.call( a ) == '[object Array]';
});

// Polyfill for the Object.create function
Object.create || (Object.create = function ( o ) {
    if (arguments.length > 1) {
        throw new Error('Object.create implementation only accepts the first parameter.');
    }
    function F() {}
    F.prototype = o;
    return new F();
});

// Polyfill for the JS Object.keys function.
// From https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Object/keys
Object.keys || (Object.keys = function () {
    var hasOwnProperty = Object.prototype.hasOwnProperty,
        hasDontEnumBug = !({toString : null}).propertyIsEnumerable( 'toString' ),
        dontEnums = [
            'toString',
            'toLocaleString',
            'valueOf',
            'hasOwnProperty',
            'isPrototypeOf',
            'propertyIsEnumerable',
            'constructor'
        ],
        dontEnumsLength = dontEnums.length;

    return function ( obj ) {
        if ( typeof obj !== 'object' && typeof obj !== 'function' || obj === null ) throw new TypeError( 'Object.keys called on non-object' );

        var result = [];

        for ( var prop in obj ) {
            if ( hasOwnProperty.call( obj, prop ) ) result.push( prop );
        }

        if ( hasDontEnumBug ) {
            for ( var i = 0; i < dontEnumsLength; i++ ) {
                if ( hasOwnProperty.call( obj, dontEnums[i] ) ) result.push( dontEnums[i] );
            }
        }
        return result;
    };
});


