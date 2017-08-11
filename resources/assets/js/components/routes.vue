<script>
   var beforeEnter = function (to, from, next) {
      var routeDefaultIsAuth = '/app';
      var routeDefaultNoAuth = '/login';
      var routeIsAuth = [routeDefaultIsAuth,'/home','/perfil'];
      var routeNoAuth = [routeDefaultNoAuth,'/register','/password/reset'];

      window[window.appName].authenticate(function( res, app ) {
         var redirect = true;
         if ( res.data.isAuth===true ) {
            routeNoAuth.forEach( function( path ) {
               var regExpPath = new RegExp ( path, "i");
               if ( regExpPath.exec( to.path ) ) {
                  redirect = false; 
                  next( routeDefaultIsAuth );
               }
            });
            if ( redirect ) {
               next();
            }
         }
         else {
            routeIsAuth.forEach( function( path ) {
               var regExpPath = new RegExp ( path, "i");
               if ( regExpPath.exec( to.path ) ) {
                  redirect = false; 
                  next( routeDefaultNoAuth );
               }
            });
            if ( redirect ) {
               next();
            }
         }
         app.app.aLink();
      });
   };

   export default new VueRouter({
      mode: 'history',
      routes: [
         { path: '/login', component: require('./modules/auth/login.vue').options, beforeEnter: beforeEnter, },
         { path: '/register', component: require('./modules/auth/register.vue').options, beforeEnter: beforeEnter, },
         { path: '/password/reset', component: require('./modules/auth/passwords/email.vue').options, beforeEnter: beforeEnter, },
         { path: '/password/reset/:token', component: require('./modules/auth/passwords/reset.vue').options, beforeEnter: beforeEnter, },
         
         { path: '/app', component: require('./modules/app.vue').options, beforeEnter: beforeEnter, },
         { path: '/home', component: require('./modules/home.vue').options, beforeEnter: beforeEnter, },
         { path: '/perfil', component: require('./modules/perfil.vue').options, beforeEnter: beforeEnter, },
         
         { path: '*', redirect: '/login' },
      ]
   });
</script>
