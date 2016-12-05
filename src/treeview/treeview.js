import { LocationService } from './location-service';

var template = (function () {

  let locationService = new LocationService();
  let locations = locationService.getLocations();
  
  return {
    data () {
      return {
        locations: locations
      };
    }
  };

}());

function renderMainFragment ( root, component, target ) {
	var div = document.createElement( 'div' );
	
	var ul = document.createElement( 'ul' );
	
	var eachBlock_0_anchor = document.createComment( "#each locations" );
	ul.appendChild( eachBlock_0_anchor );
	
	var eachBlock_0_value = root.locations;
	var eachBlock_0_fragment = document.createDocumentFragment();
	var eachBlock_0_iterations = [];
	
	for ( var i = 0; i < eachBlock_0_value.length; i += 1 ) {
		eachBlock_0_iterations[i] = renderEachBlock_0( root, eachBlock_0_value, eachBlock_0_value[i], i, component, eachBlock_0_fragment );
	}
	
	eachBlock_0_anchor.parentNode.insertBefore( eachBlock_0_fragment, eachBlock_0_anchor );
	
	div.appendChild( ul )
	
	target.appendChild( div )

	return {
		update: function ( changed, root ) {
			var eachBlock_0_value = root.locations;
			
			for ( var i = 0; i < eachBlock_0_value.length; i += 1 ) {
				if ( !eachBlock_0_iterations[i] ) {
					eachBlock_0_iterations[i] = renderEachBlock_0( root, eachBlock_0_value, eachBlock_0_value[i], i, component, eachBlock_0_fragment );
				} else {
					eachBlock_0_iterations[i].update( changed, root, eachBlock_0_value, eachBlock_0_value[i], i );
				}
			}
			
			for ( var i = eachBlock_0_value.length; i < eachBlock_0_iterations.length; i += 1 ) {
				eachBlock_0_iterations[i].teardown( true );
			}
			
			eachBlock_0_anchor.parentNode.insertBefore( eachBlock_0_fragment, eachBlock_0_anchor );
			eachBlock_0_iterations.length = eachBlock_0_value.length;
		},

		teardown: function ( detach ) {
			if ( detach ) div.parentNode.removeChild( div );
			
			
			
			for ( let i = 0; i < eachBlock_0_iterations.length; i += 1 ) {
				eachBlock_0_iterations[i].teardown( detach );
			}
			
			if ( detach ) eachBlock_0_anchor.parentNode.removeChild( eachBlock_0_anchor );
		}
	};
}

function renderEachBlock_0 ( root, eachBlock_0_value, loc1, loc1__index, component, target ) {
	var li = document.createElement( 'li' );
	
	var text = document.createTextNode( loc1.name );
	li.appendChild( text );
	
	var text1 = document.createTextNode( "\n      " );
	li.appendChild( text1 );
	
	var ul = document.createElement( 'ul' );
	
	var eachBlock_1_anchor = document.createComment( "#each loc1.locations" );
	ul.appendChild( eachBlock_1_anchor );
	
	var eachBlock_1_value = loc1.locations;
	var eachBlock_1_fragment = document.createDocumentFragment();
	var eachBlock_1_iterations = [];
	
	for ( var i = 0; i < eachBlock_1_value.length; i += 1 ) {
		eachBlock_1_iterations[i] = renderEachBlock_1( root, eachBlock_0_value, loc1, loc1__index, eachBlock_1_value, eachBlock_1_value[i], i, component, eachBlock_1_fragment );
	}
	
	eachBlock_1_anchor.parentNode.insertBefore( eachBlock_1_fragment, eachBlock_1_anchor );
	
	li.appendChild( ul )
	
	target.appendChild( li )

	return {
		update: function ( changed, root, eachBlock_0_value, loc1, loc1__index ) {
			var loc1 = eachBlock_0_value[loc1__index];
			
			text.data = loc1.name;
			
			var eachBlock_1_value = loc1.locations;
			
			for ( var i = 0; i < eachBlock_1_value.length; i += 1 ) {
				if ( !eachBlock_1_iterations[i] ) {
					eachBlock_1_iterations[i] = renderEachBlock_1( root, eachBlock_0_value, loc1, loc1__index, eachBlock_1_value, eachBlock_1_value[i], i, component, eachBlock_1_fragment );
				} else {
					eachBlock_1_iterations[i].update( changed, root, eachBlock_0_value, loc1, loc1__index, eachBlock_1_value, eachBlock_1_value[i], i );
				}
			}
			
			for ( var i = eachBlock_1_value.length; i < eachBlock_1_iterations.length; i += 1 ) {
				eachBlock_1_iterations[i].teardown( true );
			}
			
			eachBlock_1_anchor.parentNode.insertBefore( eachBlock_1_fragment, eachBlock_1_anchor );
			eachBlock_1_iterations.length = eachBlock_1_value.length;
		},

		teardown: function ( detach ) {
			if ( detach ) li.parentNode.removeChild( li );
			
			text1.parentNode.removeChild( text1 );
			
			
			
			for ( let i = 0; i < eachBlock_1_iterations.length; i += 1 ) {
				eachBlock_1_iterations[i].teardown( detach );
			}
			
			if ( detach ) eachBlock_1_anchor.parentNode.removeChild( eachBlock_1_anchor );
		}
	};
}

function renderEachBlock_1 ( root, eachBlock_0_value, loc1, loc1__index, eachBlock_1_value, loc2, loc2__index, component, target ) {
	var li = document.createElement( 'li' );
	
	var text = document.createTextNode( loc2.name );
	li.appendChild( text );
	
	var text1 = document.createTextNode( "\n          " );
	li.appendChild( text1 );
	
	var ul = document.createElement( 'ul' );
	
	var eachBlock_2_anchor = document.createComment( "#each loc2.locations" );
	ul.appendChild( eachBlock_2_anchor );
	
	var eachBlock_2_value = loc2.locations;
	var eachBlock_2_fragment = document.createDocumentFragment();
	var eachBlock_2_iterations = [];
	
	for ( var i = 0; i < eachBlock_2_value.length; i += 1 ) {
		eachBlock_2_iterations[i] = renderEachBlock_2( root, eachBlock_0_value, loc1, loc1__index, eachBlock_1_value, loc2, loc2__index, eachBlock_2_value, eachBlock_2_value[i], i, component, eachBlock_2_fragment );
	}
	
	eachBlock_2_anchor.parentNode.insertBefore( eachBlock_2_fragment, eachBlock_2_anchor );
	
	li.appendChild( ul )
	
	target.appendChild( li )

	return {
		update: function ( changed, root, eachBlock_0_value, loc1, loc1__index, eachBlock_1_value, loc2, loc2__index ) {
			var loc1 = eachBlock_0_value[loc1__index];
			var loc2 = eachBlock_1_value[loc2__index];
			
			text.data = loc2.name;
			
			var eachBlock_2_value = loc2.locations;
			
			for ( var i = 0; i < eachBlock_2_value.length; i += 1 ) {
				if ( !eachBlock_2_iterations[i] ) {
					eachBlock_2_iterations[i] = renderEachBlock_2( root, eachBlock_0_value, loc1, loc1__index, eachBlock_1_value, loc2, loc2__index, eachBlock_2_value, eachBlock_2_value[i], i, component, eachBlock_2_fragment );
				} else {
					eachBlock_2_iterations[i].update( changed, root, eachBlock_0_value, loc1, loc1__index, eachBlock_1_value, loc2, loc2__index, eachBlock_2_value, eachBlock_2_value[i], i );
				}
			}
			
			for ( var i = eachBlock_2_value.length; i < eachBlock_2_iterations.length; i += 1 ) {
				eachBlock_2_iterations[i].teardown( true );
			}
			
			eachBlock_2_anchor.parentNode.insertBefore( eachBlock_2_fragment, eachBlock_2_anchor );
			eachBlock_2_iterations.length = eachBlock_2_value.length;
		},

		teardown: function ( detach ) {
			if ( detach ) li.parentNode.removeChild( li );
			
			text1.parentNode.removeChild( text1 );
			
			
			
			for ( let i = 0; i < eachBlock_2_iterations.length; i += 1 ) {
				eachBlock_2_iterations[i].teardown( detach );
			}
			
			if ( detach ) eachBlock_2_anchor.parentNode.removeChild( eachBlock_2_anchor );
		}
	};
}

function renderEachBlock_2 ( root, eachBlock_0_value, loc1, loc1__index, eachBlock_1_value, loc2, loc2__index, eachBlock_2_value, loc3, loc3__index, component, target ) {
	var li = document.createElement( 'li' );
	
	var text = document.createTextNode( loc3.name );
	li.appendChild( text );
	
	target.appendChild( li )

	return {
		update: function ( changed, root, eachBlock_0_value, loc1, loc1__index, eachBlock_1_value, loc2, loc2__index, eachBlock_2_value, loc3, loc3__index ) {
			var loc1 = eachBlock_0_value[loc1__index];
			var loc2 = eachBlock_1_value[loc2__index];
			var loc3 = eachBlock_2_value[loc3__index];
			
			text.data = loc3.name;
		},

		teardown: function ( detach ) {
			if ( detach ) li.parentNode.removeChild( li );
		}
	};
}

function treeview ( options ) {
	var component = this;
	var state = Object.assign( template.data(), options.data );

	var observers = {
		immediate: Object.create( null ),
		deferred: Object.create( null )
	};

	var callbacks = Object.create( null );

	function dispatchObservers ( group, newState, oldState ) {
		for ( const key in group ) {
			if ( !( key in newState ) ) continue;

			const newValue = newState[ key ];
			const oldValue = oldState[ key ];

			if ( newValue === oldValue && typeof newValue !== 'object' ) continue;

			const callbacks = group[ key ];
			if ( !callbacks ) continue;

			for ( let i = 0; i < callbacks.length; i += 1 ) {
				const callback = callbacks[i];
				if ( callback.__calling ) continue;

				callback.__calling = true;
				callback.call( component, newValue, oldValue );
				callback.__calling = false;
			}
		}
	}

	this.fire = function fire ( eventName, data ) {
		var handlers = eventName in callbacks && callbacks[ eventName ].slice();
		if ( !handlers ) return;

		for ( var i = 0; i < handlers.length; i += 1 ) {
			handlers[i].call( this, data );
		}
	};

	this.get = function get ( key ) {
		return state[ key ];
	};

	this.set = function set ( newState ) {
		const oldState = state;
		state = Object.assign( {}, oldState, newState );
		
		dispatchObservers( observers.immediate, newState, oldState );
		if ( mainFragment ) mainFragment.update( newState, state );
		dispatchObservers( observers.deferred, newState, oldState );
	};

	this.observe = function ( key, callback, options = {} ) {
		const group = options.defer ? observers.deferred : observers.immediate;

		( group[ key ] || ( group[ key ] = [] ) ).push( callback );

		if ( options.init !== false ) {
			callback.__calling = true;
			callback.call( component, state[ key ] );
			callback.__calling = false;
		}

		return {
			cancel () {
				const index = group[ key ].indexOf( callback );
				if ( ~index ) group[ key ].splice( index, 1 );
			}
		};
	};

	this.on = function on ( eventName, handler ) {
		const handlers = callbacks[ eventName ] || ( callbacks[ eventName ] = [] );
		handlers.push( handler );

		return {
			cancel: function () {
				const index = handlers.indexOf( handler );
				if ( ~index ) handlers.splice( index, 1 );
			}
		};
	};

	this.teardown = function teardown ( detach ) {
		this.fire( 'teardown' );

		mainFragment.teardown( detach !== false );
		mainFragment = null;

		state = {};
	};

	var mainFragment = renderMainFragment( state, this, options.target );
}

export default treeview;