import {PersonService} from './person-service';

var template = (function () {
  let personService = new PersonService();

  return {
    data () {
      return {
        grid:{
          rows: personService.getPeople(),
          columns: personService.getColumns()
        }
      }
    }
  }; 
}());

function renderMainFragment ( root, component ) {
	var div = createElement( 'div' );
	div.className = "row";
	
	var div1 = createElement( 'div' );
	div1.className = "col-md-6";
	
	appendNode( div1, div );
	
	var table = createElement( 'table' );
	table.className = "table table-striped";
	
	appendNode( table, div1 );
	
	var thead = createElement( 'thead' );
	
	appendNode( thead, table );
	
	var tr = createElement( 'tr' );
	
	appendNode( tr, thead );
	var eachBlock_anchor = createComment();
	appendNode( eachBlock_anchor, tr );
	var eachBlock_value = root.grid.columns;
	var eachBlock_iterations = [];
	
	for ( var i = 0; i < eachBlock_value.length; i += 1 ) {
		eachBlock_iterations[i] = renderEachBlock( root, eachBlock_value, eachBlock_value[i], i, component );
		eachBlock_iterations[i].mount( eachBlock_anchor.parentNode, eachBlock_anchor );
	}
	
	appendNode( createText( "\n       " ), table );
	
	var tbody = createElement( 'tbody' );
	
	appendNode( tbody, table );
	var eachBlock1_anchor = createComment();
	appendNode( eachBlock1_anchor, tbody );
	var eachBlock1_value = root.grid.rows;
	var eachBlock1_iterations = [];
	
	for ( var i1 = 0; i1 < eachBlock1_value.length; i1 += 1 ) {
		eachBlock1_iterations[i1] = renderEachBlock1( root, eachBlock1_value, eachBlock1_value[i1], i1, component );
		eachBlock1_iterations[i1].mount( eachBlock1_anchor.parentNode, eachBlock1_anchor );
	}

	return {
		mount: function ( target, anchor ) {
			insertNode( div, target, anchor );
		},
		
		update: function ( changed, root ) {
			var __tmp;
		
			var eachBlock_value = root.grid.columns;
			
			for ( var i = 0; i < eachBlock_value.length; i += 1 ) {
				if ( !eachBlock_iterations[i] ) {
					eachBlock_iterations[i] = renderEachBlock( root, eachBlock_value, eachBlock_value[i], i, component );
					eachBlock_iterations[i].mount( eachBlock_anchor.parentNode, eachBlock_anchor );
				} else {
					eachBlock_iterations[i].update( changed, root, eachBlock_value, eachBlock_value[i], i );
				}
			}
			
			teardownEach( eachBlock_iterations, true, eachBlock_value.length );
			
			eachBlock_iterations.length = eachBlock_value.length;
			
			var eachBlock1_value = root.grid.rows;
			
			for ( var i1 = 0; i1 < eachBlock1_value.length; i1 += 1 ) {
				if ( !eachBlock1_iterations[i1] ) {
					eachBlock1_iterations[i1] = renderEachBlock1( root, eachBlock1_value, eachBlock1_value[i1], i1, component );
					eachBlock1_iterations[i1].mount( eachBlock1_anchor.parentNode, eachBlock1_anchor );
				} else {
					eachBlock1_iterations[i1].update( changed, root, eachBlock1_value, eachBlock1_value[i1], i1 );
				}
			}
			
			teardownEach( eachBlock1_iterations, true, eachBlock1_value.length );
			
			eachBlock1_iterations.length = eachBlock1_value.length;
		},
		
		teardown: function ( detach ) {
			teardownEach( eachBlock_iterations, false );
			
			teardownEach( eachBlock1_iterations, false );
			
			if ( detach ) {
				detachNode( div );
			}
		}
	};
}

function renderEachBlock1 ( root, eachBlock1_value, row, row__index, component ) {
	var tr = createElement( 'tr' );
	
	var td = createElement( 'td' );
	
	appendNode( td, tr );
	var last_text = row.firstName
	var text = createText( last_text );
	appendNode( text, td );
	appendNode( createText( "\n              " ), tr );
	
	var td1 = createElement( 'td' );
	
	appendNode( td1, tr );
	var last_text2 = row.lastName
	var text2 = createText( last_text2 );
	appendNode( text2, td1 );
	appendNode( createText( "\n              " ), tr );
	
	var td2 = createElement( 'td' );
	
	appendNode( td2, tr );
	var last_text4 = row.age
	var text4 = createText( last_text4 );
	appendNode( text4, td2 );

	return {
		mount: function ( target, anchor ) {
			insertNode( tr, target, anchor );
		},
		
		update: function ( changed, root, eachBlock1_value, row, row__index ) {
			var __tmp;
		
			if ( ( __tmp = row.firstName ) !== last_text ) {
				text.data = last_text = __tmp;
			}
			
			if ( ( __tmp = row.lastName ) !== last_text2 ) {
				text2.data = last_text2 = __tmp;
			}
			
			if ( ( __tmp = row.age ) !== last_text4 ) {
				text4.data = last_text4 = __tmp;
			}
		},
		
		teardown: function ( detach ) {
			if ( detach ) {
				detachNode( tr );
			}
		}
	};
}

function renderEachBlock ( root, eachBlock_value, col, col__index, component ) {
	var td = createElement( 'td' );
	
	var last_text = col.descr
	var text = createText( last_text );
	appendNode( text, td );

	return {
		mount: function ( target, anchor ) {
			insertNode( td, target, anchor );
		},
		
		update: function ( changed, root, eachBlock_value, col, col__index ) {
			var __tmp;
		
			if ( ( __tmp = col.descr ) !== last_text ) {
				text.data = last_text = __tmp;
			}
		},
		
		teardown: function ( detach ) {
			if ( detach ) {
				detachNode( td );
			}
		}
	};
}

function Grid ( options ) {
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
	
	this._fragment = renderMainFragment( this._state, this );
	if ( options.target ) this._fragment.mount( options.target, null );
}

Grid.prototype.get = function get( key ) {
 	return key ? this._state[ key ] : this._state;
 };

Grid.prototype.fire = function fire( eventName, data ) {
 	var handlers = eventName in this._handlers && this._handlers[ eventName ].slice();
 	if ( !handlers ) return;
 
 	for ( var i = 0; i < handlers.length; i += 1 ) {
 		handlers[i].call( this, data );
 	}
 };

Grid.prototype.observe = function observe( key, callback, options ) {
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

Grid.prototype.on = function on( eventName, handler ) {
 	var handlers = this._handlers[ eventName ] || ( this._handlers[ eventName ] = [] );
 	handlers.push( handler );
 
 	return {
 		cancel: function () {
 			var index = handlers.indexOf( handler );
 			if ( ~index ) handlers.splice( index, 1 );
 		}
 	};
 };

Grid.prototype.set = function set( newState ) {
 	this._set( newState );
 	( this._root || this )._flush();
 };

Grid.prototype._flush = function _flush() {
 	if ( !this._renderHooks ) return;
 
 	while ( this._renderHooks.length ) {
 		var hook = this._renderHooks.pop();
 		hook.fn.call( hook.context );
 	}
 };

Grid.prototype._set = function _set ( newState ) {
	var oldState = this._state;
	this._state = Object.assign( {}, oldState, newState );
	
	dispatchObservers( this, this._observers.pre, newState, oldState );
	if ( this._fragment ) this._fragment.update( newState, this._state );
	dispatchObservers( this, this._observers.post, newState, oldState );
};

Grid.prototype.teardown = Grid.prototype.destroy = function destroy ( detach ) {
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

function createComment() {
	return document.createComment( '' );
}

function teardownEach( iterations, detach, start ) {
	for ( var i = ( start || 0 ); i < iterations.length; i += 1 ) {
		iterations[i].teardown( detach );
	}
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

export default Grid;