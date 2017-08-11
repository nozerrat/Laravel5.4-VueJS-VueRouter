<template>
   <div class="container" style="margin-top: 50px;">
      <div class="row">
         <div class="col-md-8 col-md-offset-2">
            <div class="panel panel-default">
               <div class="panel-heading">Register</div>
               <div class="panel-body">
                  <div v-if="status" class="alert alert-success">
                     Ya fue creado Satisfactoriamente
                  </div>
                  <form class="form-horizontal" name="">
                     <div class="form-group" :class="{'has-error': errors.name}">
                        <label for="name" class="col-md-4 control-label">Name</label>
                        <div class="col-md-6">
                           <input v-model="name" class="form-control" require d autofocus>
                           <small class="help-block">{{errors.name}}</small>
                        </div>
                     </div>

                     <div class="form-group" :class="{'has-error': errors.email}">
                        <label for="email" class="col-md-4 control-label">E-Mail Address</label>
                        <div class="col-md-6">
                           <input v-model="email" type="email" class="form-control" require d>
                           <small class="help-block">{{errors.email}}</small>
                        </div>
                     </div>

                     <div class="form-group" :class="{'has-error': errors.password}">
                        <label for="password" class="col-md-4 control-label">Password</label>

                        <div class="col-md-6">
                           <input v-model="password" type="password" class="form-control" require d>
                           <small class="help-block">{{errors.password}}</small>
                        </div>
                     </div>

                     <div class="form-group" :class="{'has-error': errors.password_confirmation}">
                        <label for="password-confirm" class="col-md-4 control-label">Confirm Password</label>

                        <div class="col-md-6">
                           <input v-model="password_confirmation" type="password" class="form-control" require d>
                        </div>
                     </div>

                     <div class="form-group">
                        <div class="col-md-6 col-md-offset-4">
                           <button @click.prevent="submit" type="submit" class="btn btn-primary">
                              Register
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
   var name_component = 'register';
   export default Vue.component(name_component, { template: '<'+name_component+'></'+name_component+'>',
      data() {
         return {
            errors: {
               name: null,
               email: null,
               password: null,
            },
            status: null,
            _token: this.$root.options._token,
            name: 'garlos',
            email: 'garlos.figueroa@gmail.com',
            password: '123456',
            password_confirmation: '123456',
         }
      },
      methods: {
         submit() {
            this.$root.ajax('/register', this.$data,
               function Then( res, app ) {
                  // this.$router.push('/home');
                  this.status = res.data.status;

                  app.error_handdle( this.errors );
               }.bind(this),
               function Catch( error, app ) {

                  app.error_handdle( error, this.errors );

               }.bind(this)
            );
         },      }
   });
</script>
