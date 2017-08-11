<template>
   <div class="container" style="margin-top: 50px;">
      <div class="row">
         <div class="col-md-8 col-md-offset-2">
            <div class="panel panel-default">
               <div class="panel-heading">Login</div>
               <div class="panel-body">
                  <form class="form-horizontal">
                     <div class="form-group" :class="{'has-error': errors.email}">
                        <label for="email" class="col-md-4 control-label">E-Mail Address</label>
                        <div class="col-md-6">
                           <input v-model="email" type="email" class="form-control" required autofocus>
                           <small class="help-block">{{errors.email}}</small>
                        </div>
                     </div>

                     <div class="form-group" :class="{'has-error': errors.password}">
                        <label for="password" class="col-md-4 control-label">Password</label>
                        <div class="col-md-6">
                           <input v-model="password" type="password" class="form-control" required>
                           <small class="help-block">{{errors.password}}</small>
                        </div>
                     </div>

                     <div class="form-group">
                        <div class="col-md-6 col-md-offset-4">
                           <div class="checkbox">
                              <label>
                                 <input v-model="remember" type="checkbox" > Remember Me
                              </label>
                           </div>
                        </div>
                     </div>

                     <div class="form-group">
                        <div class="col-md-8 col-md-offset-4">
                           <button @click.prevent="submit" type="submit" class="btn btn-primary">
                              Login
                           </button>

                           <a-link to="/password/reset">
                              Forgot Your Password?
                           </a-link>
                        </div>
                     </div>
                  </form>
               </div>
            </div>
         </div>
      </div>
   </div>
</template>

<script>
   var name_component = 'login';
   export default Vue.component(name_component, { template: '<'+name_component+'></'+name_component+'>',
      data() {
         return {
            errors: {
               email: null,
               password: null,
            },
            _token: this.$root.options._token,
            email: 'garlos.figueroa@gmail.com',
            password: '123456',
            remember: null,
         }
      },
      methods: {
         submit() {
            this.$root.ajax('/login', this.$data,
               function Then( res, app ) {
                  this.$router.push('/app');
                  app.error_handdle( this.errors );
               }.bind(this),
               function Catch( error, app ) {
                  app.error_handdle( error, this.errors );
               }.bind(this)
            );
         }
      }
   });
</script>

