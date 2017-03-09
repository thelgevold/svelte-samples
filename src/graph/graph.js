import { arc } from 'd3-shape';

function applyComputations ( state, newState, oldState, isInitial ) {
	if ( isInitial || ( 'segments' in newState && typeof state.segments === 'object' || state.segments !== oldState.segments ) || ( 'angle' in newState && typeof state.angle === 'object' || state.angle !== oldState.angle ) ) {
		state.arcs = newState.arcs = template.computed.arcs( state.segments, state.angle );
	}
}

var template = (function () {
  
  return {
    data () {
      return {
        angle: Math.PI * 2,
        segments : [
            {
              size: 5,
              label: "this thing",
              color: "rgb(100,180,200)"
            },
            {
              size: 8,
              label: "that thing",
              color: "rgb(150,200,250)"
            },
            {
              size: 11,
              label: "another thing",
              color: "rgb(80,100,150)"
            }
          ]
      };
    },
    computed: {
      arcs ( segments, angle ) {

       	const total = segments.reduce( ( total, s ) => total + s.size, 0 );
        
        const fn = arc();
        
        let acc = 0;
        return segments.map( segment => {
          const options = {
            innerRadius: 20,
            outerRadius: 40,
            startAngle: acc,
            endAngle: ( acc += ( angle * segment.size / total ) )
          };
  
          return {
            color: segment.color,
            label: segment.label,
            d: fn( options ),
            centroid: fn.centroid( options )
          };
        });
      }
    }
  };
}());

let addedCss = false;
function addCss () {
	var style = createElement( 'style' );
	style.textContent = "\n  input[svelte-692234904], [svelte-692234904] input {\n    width: 100%;\n  }\n  \n  svg[svelte-692234904], [svelte-692234904] svg {\n    width: 100%;\n    height: calc(100% - 2em);\n  }\n  \n  path[svelte-692234904], [svelte-692234904] path {\n   \tstroke: white; \n  }\n  \n  text[svelte-692234904], [svelte-692234904] text {\n    font-size: 3px;\n    text-anchor: middle;\n  }\n  \n  [svelte-692234904].outline, [svelte-692234904] .outline {\n    stroke: white;\n    stroke-width: 0.5px;\n  }\n";
	appendNode( style, document.head );

	addedCss = true;
}

function renderMainFragment ( root, component ) {
	var text = createText( "\n" );
	
	var input = createElement( 'input' );
	setAttribute( input, 'svelte-692234904', '' );
	
	var input_updating = false;
	
	function inputChangeHandler () {
		input_updating = true;
		component._set({ angle: input.value });
		input_updating = false;
	}
	
	addEventListener( input, 'input', inputChangeHandler );
	
	input.type = "range";
	input.min = "0";
	var last_input_max = ( 'Math' in root ? root.Math : Math ).PI*2;
	input.max = last_input_max;
	input.step = "0.01";
	
	input.value = root.angle;
	
	var text1 = createText( "\n\n" );
	
	var svg = createSvgElement( 'svg' )
	setAttribute( svg, 'svelte-692234904', '' );
	setAttribute( svg, 'viewBox', "0 0 100 100" );
	
	var g = createSvgElement( 'g' )
	setAttribute( g, 'svelte-692234904', '' );
	setAttribute( g, 'transform', "translate(50,50)" );
	
	appendNode( g, svg );
	var eachBlock_anchor = createComment();
	appendNode( eachBlock_anchor, g );
	var eachBlock_value = root.arcs;
	var eachBlock_iterations = [];
	
	for ( var i = 0; i < eachBlock_value.length; i += 1 ) {
		eachBlock_iterations[i] = renderEachBlock( root, eachBlock_value, eachBlock_value[i], i, component );
		eachBlock_iterations[i].mount( eachBlock_anchor.parentNode, eachBlock_anchor );
	}

	return {
		mount: function ( target, anchor ) {
			insertNode( text, target, anchor );
			insertNode( input, target, anchor );
			insertNode( text1, target, anchor );
			insertNode( svg, target, anchor );
		},
		
		update: function ( changed, root ) {
			var __tmp;
		
			if ( !input_updating ) {
							input.value = root.angle;
						}
			
			if ( ( __tmp = ( 'Math' in root ? root.Math : Math ).PI*2 ) !== last_input_max ) {
				last_input_max = __tmp;
				input.max = last_input_max;
			}
			
			var eachBlock_value = root.arcs;
			
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
		},
		
		teardown: function ( detach ) {
			removeEventListener( input, 'input', inputChangeHandler );
			
			teardownEach( eachBlock_iterations, false );
			
			if ( detach ) {
				detachNode( text );
				detachNode( input );
				detachNode( text1 );
				detachNode( svg );
			}
		}
	};
}

function renderEachBlock ( root, eachBlock_value, arc, arc__index, component ) {
	var path = createSvgElement( 'path' )
	setAttribute( path, 'svelte-692234904', '' );
	var last_path_d = arc.d;
	setAttribute( path, 'd', last_path_d );
	var last_path_fill = arc.color;
	setAttribute( path, 'fill', last_path_fill );
	
	var text = createSvgElement( 'text' )
	setAttribute( text, 'svelte-692234904', '' );
	setAttribute( text, 'class', "outline" );
	var last_text_x = arc.centroid[0];
	setAttribute( text, 'x', last_text_x );
	var last_text_y = arc.centroid[1];
	setAttribute( text, 'y', last_text_y );
	
	var last_text1 = arc.label
	var text1 = createText( last_text1 );
	appendNode( text1, text );
	
	var text2 = createSvgElement( 'text' )
	setAttribute( text2, 'svelte-692234904', '' );
	var last_text2_x = arc.centroid[0];
	setAttribute( text2, 'x', last_text2_x );
	var last_text2_y = arc.centroid[1];
	setAttribute( text2, 'y', last_text2_y );
	
	var last_text3 = arc.label
	var text3 = createText( last_text3 );
	appendNode( text3, text2 );

	return {
		mount: function ( target, anchor ) {
			insertNode( path, target, anchor );
			insertNode( text, target, anchor );
			insertNode( text2, target, anchor );
		},
		
		update: function ( changed, root, eachBlock_value, arc, arc__index ) {
			var __tmp;
		
			if ( ( __tmp = arc.d ) !== last_path_d ) {
				last_path_d = __tmp;
				setAttribute( path, 'd', last_path_d );
			}
			
			if ( ( __tmp = arc.color ) !== last_path_fill ) {
				last_path_fill = __tmp;
				setAttribute( path, 'fill', last_path_fill );
			}
			
			if ( ( __tmp = arc.centroid[0] ) !== last_text_x ) {
				last_text_x = __tmp;
				setAttribute( text, 'x', last_text_x );
			}
			
			if ( ( __tmp = arc.centroid[1] ) !== last_text_y ) {
				last_text_y = __tmp;
				setAttribute( text, 'y', last_text_y );
			}
			
			if ( ( __tmp = arc.label ) !== last_text1 ) {
				text1.data = last_text1 = __tmp;
			}
			
			if ( ( __tmp = arc.centroid[0] ) !== last_text2_x ) {
				last_text2_x = __tmp;
				setAttribute( text2, 'x', last_text2_x );
			}
			
			if ( ( __tmp = arc.centroid[1] ) !== last_text2_y ) {
				last_text2_y = __tmp;
				setAttribute( text2, 'y', last_text2_y );
			}
			
			if ( ( __tmp = arc.label ) !== last_text3 ) {
				text3.data = last_text3 = __tmp;
			}
		},
		
		teardown: function ( detach ) {
			if ( detach ) {
				detachNode( path );
				detachNode( text );
				detachNode( text2 );
			}
		}
	};
}

function Graph ( options ) {
	options = options || {};
	this._state = Object.assign( template.data(), options.data );
	applyComputations( this._state, this._state, {}, true );
	
	this._observers = {
		pre: Object.create( null ),
		post: Object.create( null )
	};
	
	this._handlers = Object.create( null );
	
	this._root = options._root;
	this._yield = options._yield;
	
	this._torndown = false;
	if ( !addedCss ) addCss();
	
	this._fragment = renderMainFragment( this._state, this );
	if ( options.target ) this._fragment.mount( options.target, null );
}

Graph.prototype.get = function get( key ) {
 	return key ? this._state[ key ] : this._state;
 };

Graph.prototype.fire = function fire( eventName, data ) {
 	var handlers = eventName in this._handlers && this._handlers[ eventName ].slice();
 	if ( !handlers ) return;
 
 	for ( var i = 0; i < handlers.length; i += 1 ) {
 		handlers[i].call( this, data );
 	}
 };

Graph.prototype.observe = function observe( key, callback, options ) {
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

Graph.prototype.on = function on( eventName, handler ) {
 	var handlers = this._handlers[ eventName ] || ( this._handlers[ eventName ] = [] );
 	handlers.push( handler );
 
 	return {
 		cancel: function () {
 			var index = handlers.indexOf( handler );
 			if ( ~index ) handlers.splice( index, 1 );
 		}
 	};
 };

Graph.prototype.set = function set( newState ) {
 	this._set( newState );
 	( this._root || this )._flush();
 };

Graph.prototype._flush = function _flush() {
 	if ( !this._renderHooks ) return;
 
 	while ( this._renderHooks.length ) {
 		var hook = this._renderHooks.pop();
 		hook.fn.call( hook.context );
 	}
 };

Graph.prototype._set = function _set ( newState ) {
	var oldState = this._state;
	this._state = Object.assign( {}, oldState, newState );
	applyComputations( this._state, newState, oldState, false )
	
	dispatchObservers( this, this._observers.pre, newState, oldState );
	if ( this._fragment ) this._fragment.update( newState, this._state );
	dispatchObservers( this, this._observers.post, newState, oldState );
};

Graph.prototype.teardown = Graph.prototype.destroy = function destroy ( detach ) {
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

function createText( data ) {
	return document.createTextNode( data );
}

function insertNode( node, target, anchor ) {
	target.insertBefore( node, anchor );
}

function detachNode( node ) {
	node.parentNode.removeChild( node );
}

function addEventListener( node, event, handler ) {
	node.addEventListener ( event, handler, false );
}

function removeEventListener( node, event, handler ) {
	node.removeEventListener ( event, handler, false );
}

function createElement( name ) {
	return document.createElement( name );
}

function setAttribute( node, attribute, value ) {
	node.setAttribute ( attribute, value );
}

function createSvgElement( name ) {
	return document.createElementNS( 'http://www.w3.org/2000/svg', name );
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

export default Graph;