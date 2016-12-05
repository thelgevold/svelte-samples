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

function renderMainFragment ( root, component, target ) {
	var div = document.createElement( 'div' );
	div.className = "row";
	
	var div1 = document.createElement( 'div' );
	div1.className = "col-md-6";
	
	var table = document.createElement( 'table' );
	table.className = "table table-striped";
	
	var thead = document.createElement( 'thead' );
	
	var tr = document.createElement( 'tr' );
	
	var eachBlock_0_anchor = document.createComment( "#each grid.columns" );
	tr.appendChild( eachBlock_0_anchor );
	
	var eachBlock_0_value = root.grid.columns;
	var eachBlock_0_fragment = document.createDocumentFragment();
	var eachBlock_0_iterations = [];
	
	for ( var i = 0; i < eachBlock_0_value.length; i += 1 ) {
		eachBlock_0_iterations[i] = renderEachBlock_0( root, eachBlock_0_value, eachBlock_0_value[i], i, component, eachBlock_0_fragment );
	}
	
	eachBlock_0_anchor.parentNode.insertBefore( eachBlock_0_fragment, eachBlock_0_anchor );
	
	thead.appendChild( tr )
	
	table.appendChild( thead )
	
	var text = document.createTextNode( "\n       " );
	table.appendChild( text );
	
	var tbody = document.createElement( 'tbody' );
	
	var eachBlock_1_anchor = document.createComment( "#each grid.rows" );
	tbody.appendChild( eachBlock_1_anchor );
	
	var eachBlock_1_value = root.grid.rows;
	var eachBlock_1_fragment = document.createDocumentFragment();
	var eachBlock_1_iterations = [];
	
	for ( var i = 0; i < eachBlock_1_value.length; i += 1 ) {
		eachBlock_1_iterations[i] = renderEachBlock_1( root, eachBlock_1_value, eachBlock_1_value[i], i, component, eachBlock_1_fragment );
	}
	
	eachBlock_1_anchor.parentNode.insertBefore( eachBlock_1_fragment, eachBlock_1_anchor );
	
	table.appendChild( tbody )
	
	div1.appendChild( table )
	
	div.appendChild( div1 )
	
	target.appendChild( div )

	return {
		update: function ( changed, root ) {
			var eachBlock_0_value = root.grid.columns;
			
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
			
			var eachBlock_1_value = root.grid.rows;
			
			for ( var i = 0; i < eachBlock_1_value.length; i += 1 ) {
				if ( !eachBlock_1_iterations[i] ) {
					eachBlock_1_iterations[i] = renderEachBlock_1( root, eachBlock_1_value, eachBlock_1_value[i], i, component, eachBlock_1_fragment );
				} else {
					eachBlock_1_iterations[i].update( changed, root, eachBlock_1_value, eachBlock_1_value[i], i );
				}
			}
			
			for ( var i = eachBlock_1_value.length; i < eachBlock_1_iterations.length; i += 1 ) {
				eachBlock_1_iterations[i].teardown( true );
			}
			
			eachBlock_1_anchor.parentNode.insertBefore( eachBlock_1_fragment, eachBlock_1_anchor );
			eachBlock_1_iterations.length = eachBlock_1_value.length;
		},

		teardown: function ( detach ) {
			if ( detach ) div.parentNode.removeChild( div );
			
			
			
			
			
			
			
			
			
			for ( let i = 0; i < eachBlock_0_iterations.length; i += 1 ) {
				eachBlock_0_iterations[i].teardown( detach );
			}
			
			if ( detach ) eachBlock_0_anchor.parentNode.removeChild( eachBlock_0_anchor );
			
			text.parentNode.removeChild( text );
			
			
			
			for ( let i = 0; i < eachBlock_1_iterations.length; i += 1 ) {
				eachBlock_1_iterations[i].teardown( detach );
			}
			
			if ( detach ) eachBlock_1_anchor.parentNode.removeChild( eachBlock_1_anchor );
		}
	};
}

function renderEachBlock_1 ( root, eachBlock_1_value, row, row__index, component, target ) {
	var tr = document.createElement( 'tr' );
	
	var td = document.createElement( 'td' );
	
	var text = document.createTextNode( row.firstName );
	td.appendChild( text );
	
	tr.appendChild( td )
	
	var text1 = document.createTextNode( "\n              " );
	tr.appendChild( text1 );
	
	var td1 = document.createElement( 'td' );
	
	var text2 = document.createTextNode( row.lastName );
	td1.appendChild( text2 );
	
	tr.appendChild( td1 )
	
	var text3 = document.createTextNode( "\n              " );
	tr.appendChild( text3 );
	
	var td2 = document.createElement( 'td' );
	
	var text4 = document.createTextNode( row.age );
	td2.appendChild( text4 );
	
	tr.appendChild( td2 )
	
	target.appendChild( tr )

	return {
		update: function ( changed, root, eachBlock_1_value, row, row__index ) {
			var row = eachBlock_1_value[row__index];
			
			text.data = row.firstName;
			
			text2.data = row.lastName;
			
			text4.data = row.age;
		},

		teardown: function ( detach ) {
			if ( detach ) tr.parentNode.removeChild( tr );
			
			
			
			text1.parentNode.removeChild( text1 );
			
			
			
			text3.parentNode.removeChild( text3 );
			
			
		}
	};
}

function renderEachBlock_0 ( root, eachBlock_0_value, col, col__index, component, target ) {
	var td = document.createElement( 'td' );
	
	var text = document.createTextNode( col.descr );
	td.appendChild( text );
	
	target.appendChild( td )

	return {
		update: function ( changed, root, eachBlock_0_value, col, col__index ) {
			var col = eachBlock_0_value[col__index];
			
			text.data = col.descr;
		},

		teardown: function ( detach ) {
			if ( detach ) td.parentNode.removeChild( td );
		}
	};
}

function grid ( options ) {
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

export default grid;