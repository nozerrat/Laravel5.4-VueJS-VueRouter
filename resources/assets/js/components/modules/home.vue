<template>
   <div class="container">
      <h3> Dashboard </h3>

      <div class="title m-b-md">
         Home
      </div>
   </div>
</template>
<script>
   var name_component = 'home';
   export default Vue.component(name_component, { template: '<'+name_component+'></'+name_component+'>',
      data() {
         return {
         }
      },
   });
</script>

