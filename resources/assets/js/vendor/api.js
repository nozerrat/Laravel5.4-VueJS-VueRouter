window.Vue = require('vue');
window.Vue.use( window.VueRouter = require('vue-router').default );



// Se obtiene el valor CSRF
window.token = document.head.querySelector('meta[name="csrf-token"]').content;

// Se asigna el nombre de la aplicación
document.writeln('<div id="z'+window.token+'"><layouts></layouts></div>')

// Nombre de la aplicación para arrancar VueJS
window.appName = '#z'+window.token;



/**
 * Configuración de la aplicación
 */
window[window.appName]         = {};
window[window.appName].app     = null;
window[window.appName].options = {};
window[window.appName].appName = window.appName;








window[window.appName].config = function( options, callback ) {

   if ( options===undefined ) {
      window[window.appName].options.loading = false;
   }
   
   if (typeof options!=='function') {
      if ( !options ) {
         window[window.appName].options.auth     = null;
         window[window.appName].options._token   = window.token;
         window[window.appName].options.isAuth   = false;
         window[window.appName].options.noAuth   = true;
         window[window.appName].options.appName  = '';
         window[window.appName].options.userName = '';
      }
      else {
         window.axios.defaults.headers.common['X-CSRF-TOKEN']   = options._token;
         window[window.appName].options._token  = options._token;
         window[window.appName].options.auth    = options.auth;
         window[window.appName].options.isAuth  = options.isAuth;
         window[window.appName].options.noAuth  = options.noAuth;
         window[window.appName].options.appName = options.appName;
         try {
            window[window.appName].options.userName = options.auth.name;
         } catch(e) {}
      }
   }
   else {
      callback = options;
   }

   if ( typeof callback==='function' ) {
      callback( window[window.appName] );
   }

   return window[window.appName];
};
window[window.appName].config();



/**
 * [ajax]
 * @param  {String}   url           [URL a solicitar]
 * @param  {Object}   data          [Datos a enviar]
 * @param  {Function} callbackThen  [Callback cuando la solicitud es exitosa]
 * @param  {Function} callbackCatch [Callback cuando la solicitud es erronea]
 * @return {App}                    [Retorna la aplicacion]
 *
 * Uso:
 *    
   app.ajax('/auth', [{key:value,...},]
      function Then( res, app ) {
         console.log( app.appName, res.data );
      },
      function Catch( error, app ) {
         console.log( app.appName, error );
      }
   );
 */
window[window.appName].ajax = function ( url, data, callbackThen, callbackCatch) {

   if ( typeof url!=='string' ) {
      return console.error( 'La URL es requerido...' );
   }

   if ( typeof data==='function' ) {
      callbackCatch = callbackThen;
      callbackThen  = data;
      data = {};
   }

   window[window.appName].options.loading = true;

   window.axios
   .post( url , data )
   .then(function( res1 ) {

      window[window.appName].options.loading = false;
      
      window[window.appName].authenticate(function( res2, app ) {
         if ( typeof callbackThen==='function' ) {
            callbackThen( res1, app );
         }
      });

   })
   .catch(function( error ) {
      // document.querySelectorAll('input,button,a')
      
      if ( error.response.status < 500 ) {
         window[window.appName].options.loading = false;
      }

      var e = {
         response: error.response,
         request:  error.request,
         message:  error.message,
         config:   error.config,
      }

      if ( typeof callbackCatch==='function' ) {
         callbackCatch( e, window[window.appName] );
      }
      else {
         console.error( error );
      }

   });


   return window[window.appName];
}



window[window.appName].authenticate = function( callbackThen, callbackCatch ) {
   window[window.appName].options.loading = true;
   window.axios
   .post( '/auth' )
   .then(function( res ) {
      window[window.appName].options.loading = false;
      window[window.appName].config( res.data, function( app ) {
         if ( typeof callbackThen==='function' ) {
            callbackThen( res, app );
         }
      });
   })
   .catch(function( error ) {
      // document.querySelectorAll('input,button,a')
      if ( error.response.status < 500 ) {
         window[window.appName].options.loading = false;
      }
      var e = {
         response: error.response,
         request:  error.request,
         message:  error.message,
         config:   error.config,
      }
      if ( typeof callbackCatch==='function' ) {
         callbackCatch( e, window[window.appName] );
      }
      else {
         console.error( error );
      }
   });

   return window[window.appName];
}



window[window.appName].error_handdle = function( error, data_errors ) {

   if ( arguments.length === 1 ) {
      data_errors = arguments[0];
   }

   for (var idx in data_errors) {
      data_errors[idx] = null;
   }

   if ( arguments.length === 2 ) {
      for (var idx in error.response.data) {
         if ( window._.isArray( error.response.data[idx] ) && error.response.data[idx].length ) {
            data_errors[idx] = error.response.data[idx][0];
         }
         else {
            data_errors[idx] = error.response.data[idx];
         }
      }
   }
}



window[window.appName].aLink = function( ) {
   document.body.querySelectorAll('ul[class*="nav"] li[class="active"]').forEach( function(element, index) {
      element.className = '';
   });
   document.body.querySelectorAll('ul[class*="nav"] li[class="dropdown active"]').forEach( function(element, index) {
      element.className = 'dropdown';
   });
   setTimeout(function() {
      try {
         var path = window.location.pathname;
         document.body.querySelector('a[to="'+path+'"]').parentNode.className='active';
         var LI = document.body.querySelector('a[to="'+path+'"]').parentNode.parentNode.parentNode;
         if ( LI.nodeName==="LI" && LI.className==="dropdown" ) {
            LI.className = 'dropdown active';
         }
      } catch(e) {}
   }, 200);
}

window[window.appName].mount = function( app, callbackThen, callbackCatch ) {
   app.authenticate(
      function Then( res, app ) {
         /**
          * Se realiza la instancia de Vue
          */
         app.app = new Vue({
            router: require('../components/routes.vue'),
            data() {
               // Se realiza un bind de la configuración de la aplicación
               return app
            },
         });

         /**
          * Se arranca la Aplicación VueJS
          */
         if ( typeof callbackThen==='function' ) {
            // llamado asincrono
            callbackThen( res, app );
         }
         else {
            // llamado sincrono
            app.app.$mount( window.appName );
         }
      },
      function Catch( error, app ) {
         if ( typeof callbackCatch==='function' ) {
            callbackCatch( error, app );
         }
         else {
            console.error( error );
         }
      }
   );

   return window[window.appName];
}



