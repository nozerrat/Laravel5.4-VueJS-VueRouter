<template>
   <div class="container">
      <div class="row">
         <div class="col-md-8 col-md-offset-2">
            <div class="panel panel-default">
               <div class="panel-heading">Reset Password</div>

               <div class="panel-body">
                  <div v-if="status" class="alert alert-success">
                     {{ status }}
                  </div>
                  <form class="form-horizontal">
                     <input type="hidden" name="token" value="{ { $token }}">

                     <div class="form-group" :class="{'has-error': errors.email}">
                        <label for="email" class="col-md-4 control-label">E-Mail Address</label>
                        <div class="col-md-6">
                           <input v-model="email" type="email" class="form-control" required autofocus>   
                           <small class="help-block">{{ errors.email }}</small>
                        </div>
                     </div>

                     <div class="form-group" :class="{'has-error': errors.password}">
                        <label for="password" class="col-md-4 control-label">Password</label>
                        <div class="col-md-6">
                           <input v-model="password" type="password" class="form-control" required>
                           <small class="help-block">{{ errors.password }}</small>
                        </div>
                     </div>

                     <div class="form-group" :class="{'has-error': errors.password_confirmation}">
                        <label for="password_confirmation" class="col-md-4 control-label">Confirm Password</label>
                        <div class="col-md-6">
                           <input v-model="password_confirmation" type="password" class="form-control" required>
                           <small class="help-block"><strong>{{ errors.password_confirmation }}</strong></small>
                        </div>
                     </div>

                     <div class="form-group">
                        <div class="col-md-6 col-md-offset-4">
                           <button @click.prevent="submit" type="button" class="btn btn-primary">
                              Reset Password
                           </button>
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
   var name_component = 'reset';
   export default Vue.component(name_component, { template: '<'+name_component+'></'+name_component+'>',
      data() {
         return {
            errors: {
               email: null,
               password: null,
               password_confirmation: null,
            },
            _token: this.$root.options._token,
            token: this.$route.params.token,
            status: null,

            email: 'garlos.figueroa@gmail.com',
            password: '123456',
            password_confirmation: '123456',
         }
      },
      methods: {
         submit() {
            this.$root.ajax('/password/reset', this.$data,
               function Then( res, app ) {
                  this.$router.push('/home');
                  this.status = res.data.status;
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
