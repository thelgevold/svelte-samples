import Details from './details';

var template = (function () {

  return {
    oncreate() {
      this.set({fullName: this._state.firstName + ' Smith'});

      this.refs.details.observe('age', (newAge, oldAge) => {
        this.set({personAge:newAge || 0});
      });
    },

    data () {
      return {
        firstName: 'Joe'
      }  
    },


    components: {Details}
    
  };
}());

function renderMainFragment ( root, component ) {
	var div = createElement( 'div' );
	
	var last_text = root.firstName
	var text = createText( last_text );
	appendNode( text, div );
	var text1 = createText( "\n\n" );
	var ifBlock_anchor = createComment();
	
	function getBlock ( root ) {
		if ( root.fullName ) return renderIfBlock_0;
		return null;
	}
	
	var currentBlock = getBlock( root );
	var ifBlock = currentBlock && currentBlock( root, component );
	
	var text2 = createText( "\n" );
	var last_text3 = root.personAge
	var text3 = createText( last_text3 );

	return {
		mount: function ( target, anchor ) {
			insertNode( div, target, anchor );
			insertNode( text1, target, anchor );
			insertNode( ifBlock_anchor, target, anchor );
			if ( ifBlock ) ifBlock.mount( ifBlock_anchor.parentNode, ifBlock_anchor );
			insertNode( text2, target, anchor );
			insertNode( text3, target, anchor );
		},
		
		update: function ( changed, root ) {
			var __tmp;
		
			if ( ( __tmp = root.firstName ) !== last_text ) {
				text.data = last_text = __tmp;
			}
			
			var _currentBlock = currentBlock;
			currentBlock = getBlock( root );
			if ( _currentBlock === currentBlock && ifBlock) {
				ifBlock.update( changed, root );
			} else {
				if ( ifBlock ) ifBlock.teardown( true );
				ifBlock = currentBlock && currentBlock( root, component );
				if ( ifBlock ) ifBlock.mount( ifBlock_anchor.parentNode, ifBlock_anchor );
			}
			
			if ( ( __tmp = root.personAge ) !== last_text3 ) {
				text3.data = last_text3 = __tmp;
			}
		},
		
		teardown: function ( detach ) {
			if ( ifBlock ) ifBlock.teardown( detach );
			
			if ( detach ) {
				detachNode( div );
				detachNode( text1 );
				detachNode( ifBlock_anchor );
				detachNode( text2 );
				detachNode( text3 );
			}
		}
	};
}

function renderIfBlock_0 ( root, component ) {
	var details_initialData = {
		name: root.fullName
	};
	var details = new template.components.Details({
		target: null,
		_root: component._root || component,
		data: details_initialData
	});
	
	component.refs.details = details;

	return {
		mount: function ( target, anchor ) {
			details._fragment.mount( target, anchor );
		},
		
		update: function ( changed, root ) {
			var __tmp;
		
			var details_changes = {};
			
			if ( 'fullName' in changed ) details_changes.name = root.fullName;
			
			if ( Object.keys( details_changes ).length ) details.set( details_changes );
		},
		
		teardown: function ( detach ) {
			if ( component.refs.details === details ) component.refs.details = null;
			details.destroy( detach );
		}
	};
}

function Person ( options ) {
	options = options || {};
	this.refs = {};
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
	
	if ( options._root ) {
		options._root._renderHooks.push({ fn: template.oncreate, context: this });
	} else {
		template.oncreate.call( this );
	}
}

Person.prototype.get = function get( key ) {
 	return key ? this._state[ key ] : this._state;
 };

Person.prototype.fire = function fire( eventName, data ) {
 	var handlers = eventName in this._handlers && this._handlers[ eventName ].slice();
 	if ( !handlers ) return;
 
 	for ( var i = 0; i < handlers.length; i += 1 ) {
 		handlers[i].call( this, data );
 	}
 };

Person.prototype.observe = function observe( key, callback, options ) {
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

Person.prototype.on = function on( eventName, handler ) {
 	var handlers = this._handlers[ eventName ] || ( this._handlers[ eventName ] = [] );
 	handlers.push( handler );
 
 	return {
 		cancel: function () {
 			var index = handlers.indexOf( handler );
 			if ( ~index ) handlers.splice( index, 1 );
 		}
 	};
 };

Person.prototype.set = function set( newState ) {
 	this._set( newState );
 	( this._root || this )._flush();
 };

Person.prototype._flush = function _flush() {
 	if ( !this._renderHooks ) return;
 
 	while ( this._renderHooks.length ) {
 		var hook = this._renderHooks.pop();
 		hook.fn.call( hook.context );
 	}
 };

Person.prototype._set = function _set ( newState ) {
	var oldState = this._state;
	this._state = Object.assign( {}, oldState, newState );
	
	dispatchObservers( this, this._observers.pre, newState, oldState );
	if ( this._fragment ) this._fragment.update( newState, this._state );
	dispatchObservers( this, this._observers.post, newState, oldState );
	
	this._flush();
};

Person.prototype.teardown = Person.prototype.destroy = function destroy ( detach ) {
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

function createText( data ) {
	return document.createTextNode( data );
}

function appendNode( node, target ) {
	target.appendChild( node );
}

function createComment() {
	return document.createComment( '' );
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

export default Person;