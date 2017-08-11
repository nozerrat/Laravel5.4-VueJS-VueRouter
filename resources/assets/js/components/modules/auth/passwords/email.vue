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

                     <div class="form-group" :class="{'has-error': errors.email}">
                        <label for="email" class="col-md-4 control-label">E-Mail Address</label>
                        <div class="col-md-6">
                           <input v-model="email" type="emai l" class="form-control" require d>   
                           <small class="help-block">{{ errors.email }}</small>
                        </div>
                     </div>

                     <div class="form-group">
                        <div class="col-md-6 col-md-offset-4">
                           <button @click.prevent="submit" type="button" class="btn btn-primary">
                              Send Password Reset Link
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
   var name_component = 'email';
   export default Vue.component(name_component, { template: '<'+name_component+'></'+name_component+'>',
      data() {
         return {
            errors: {
               email: null,
            },
            status: null,
            _token: this.$root.options._token,
            email: 'garlos.figueroa@gmail.com',
         }
      },
      methods: {
         submit() {
            this.$root.ajax('/password/email', this.$data,
               function Then( res, app ) {
                  console.log( res );
                  this.status = res.data.status;

                  app.error_handdle( this.errors );
               }.bind(this),
               function Catch( error, app ) {
                  this.status = null;
                  // console.log( error );
                  app.error_handdle( error, this.errors );
               }.bind(this)
            );
         }
      }
   });
</script>
