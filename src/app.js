import Treeview from './treeview/treeview';
import Grid from './grid/grid';
import { LocationService } from './treeview/location-service';

var template = (function () {
 
  let locationService = new LocationService();
  let locations = locationService.getLocations();

  return {
    data () {
      return {
        title: 'Svelte Demo Components',
        locations: locations
      }
    },

    components: {
      Treeview,
      Grid
    }
  }; 

}());

function renderMainFragment ( root, component ) {
	var div = createElement( 'div' );
	
	var h1 = createElement( 'h1' );
	
	appendNode( h1, div );
	var last_text = root.title
	var text = createText( last_text );
	appendNode( text, h1 );
	appendNode( createText( "\n\n  " ), div );
	
	var h4 = createElement( 'h4' );
	
	appendNode( h4, div );
	appendNode( createText( "Grid" ), h4 );
	appendNode( createText( "\n   " ), div );
	
	var grid = new template.components.Grid({
		target: div,
		_root: component._root || component
	});
	
	appendNode( createText( "\n\n  " ), div );
	
	var h41 = createElement( 'h4' );
	
	appendNode( h41, div );
	appendNode( createText( "Treeview" ), h41 );
	appendNode( createText( "\n  " ), div );
	
	var treeview_initialData = {
		locations: root.locations
	};
	var treeview = new template.components.Treeview({
		target: div,
		_root: component._root || component,
		data: treeview_initialData
	});

	return {
		mount: function ( target, anchor ) {
			insertNode( div, target, anchor );
		},
		
		update: function ( changed, root ) {
			var __tmp;
		
			if ( ( __tmp = root.title ) !== last_text ) {
				text.data = last_text = __tmp;
			}
			
			var treeview_changes = {};
			
			if ( 'locations' in changed ) treeview_changes.locations = root.locations;
			
			if ( Object.keys( treeview_changes ).length ) treeview.set( treeview_changes );
		},
		
		teardown: function ( detach ) {
			grid.destroy( false );
			treeview.destroy( false );
			
			if ( detach ) {
				detachNode( div );
			}
		}
	};
}

function App ( options ) {
	options = options || {};
	this._state = Object.assign( template.data(), options.data );
	
	this._observers = {
		pre: Object.create( null ),
		post: Object.create( null )
	};
	
	this._handlers = Object.create( null );
	
	this._root = options._root;
	this._yield = options._yield;
	
	this._torndown = false;
	this._renderHooks = [];
	
	this._fragment = renderMainFragment( this._state, this );
	if ( options.target ) this._fragment.mount( options.target, null );
	
	this._flush();
}

App.prototype.get = function get( key ) {
 	return key ? this._state[ key ] : this._state;
 };

App.prototype.fire = function fire( eventName, data ) {
 	var handlers = eventName in this._handlers && this._handlers[ eventName ].slice();
 	if ( !handlers ) return;
 
 	for ( var i = 0; i < handlers.length; i += 1 ) {
 		handlers[i].call( this, data );
 	}
 };

App.prototype.observe = function observe( key, callback, options ) {
 	var group = ( options && options.defer ) ? this._observers.pre : this._observers.post;
 
 	( group[ key ] || ( group[ key ] = [] ) ).push( callback );
 
 	if ( !options || options.init !== false ) {
 		callback.__calling = true;
 		callback.call( this, this._state[ key ] );
 		callback.__calling = false;
 	}
 
 	return {
 		cancel: function () {
 			var index = group[ key ].indexOf( callback );
 			if ( ~index ) group[ key ].splice( index, 1 );
 		}
 	};
 };

App.prototype.on = function on( eventName, handler ) {
 	var handlers = this._handlers[ eventName ] || ( this._handlers[ eventName ] = [] );
 	handlers.push( handler );
 
 	return {
 		cancel: function () {
 			var index = handlers.indexOf( handler );
 			if ( ~index ) handlers.splice( index, 1 );
 		}
 	};
 };

App.prototype.set = function set( newState ) {
 	this._set( newState );
 	( this._root || this )._flush();
 };

App.prototype._flush = function _flush() {
 	if ( !this._renderHooks ) return;
 
 	while ( this._renderHooks.length ) {
 		var hook = this._renderHooks.pop();
 		hook.fn.call( hook.context );
 	}
 };

App.prototype._set = function _set ( newState ) {
	var oldState = this._state;
	this._state = Object.assign( {}, oldState, newState );
	
	dispatchObservers( this, this._observers.pre, newState, oldState );
	if ( this._fragment ) this._fragment.update( newState, this._state );
	dispatchObservers( this, this._observers.post, newState, oldState );
	
	this._flush();
};

App.prototype.teardown = App.prototype.destroy = function destroy ( detach ) {
	this.fire( 'teardown' );

	this._fragment.teardown( detach !== false );
	this._fragment = null;

	this._state = {};
	this._torndown = true;
};

var dispatchObservers = function dispatchObservers( component, group, newState, oldState ) {
	for ( var key in group ) {
		if ( !( key in newState ) ) continue;

		var newValue = newState[ key ];
		var oldValue = oldState[ key ];

		if ( newValue === oldValue && typeof newValue !== 'object' ) continue;

		var callbacks = group[ key ];
		if ( !callbacks ) continue;

		for ( var i = 0; i < callbacks.length; i += 1 ) {
			var callback = callbacks[i];
			if ( callback.__calling ) continue;

			callback.__calling = true;
			callback.call( component, newValue, oldValue );
			callback.__calling = false;
		}
	}
}

function createElement( name ) {
	return document.createElement( name );
}

function detachNode( node ) {
	node.parentNode.removeChild( node );
}

function insertNode( node, target, anchor ) {
	target.insertBefore( node, anchor );
}

function appendNode( node, target ) {
	target.appendChild( node );
}

function createText( data ) {
	return document.createTextNode( data );
}

function dispatchObservers( component, group, newState, oldState ) {
	for ( var key in group ) {
		if ( !( key in newState ) ) continue;

		var newValue = newState[ key ];
		var oldValue = oldState[ key ];

		if ( newValue === oldValue && typeof newValue !== 'object' ) continue;

		var callbacks = group[ key ];
		if ( !callbacks ) continue;

		for ( var i = 0; i < callbacks.length; i += 1 ) {
			var callback = callbacks[i];
			if ( callback.__calling ) continue;

			callback.__calling = true;
			callback.call( component, newValue, oldValue );
			callback.__calling = false;
		}
	}
}

export default App;