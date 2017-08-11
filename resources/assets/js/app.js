
require('./autoload');


window[window.appName].mount( 
	window[window.appName],
	function( res, app ) {
		app.app.$mount( window.appName );
	},
	function( error, app ) {
		console.error( error );
	}
);
