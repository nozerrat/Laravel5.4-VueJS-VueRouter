<template>
   <div class="container">
      <h3> Dashboard </h3>

      <div class="title m-b-md">
         App
      </div>
   </div>
</template>
<script>
   var name_component = 'app';
   export default Vue.component(name_component, { template: '<'+name_component+'></'+name_component+'>',
      data() {
         return {
         }
      },
   });
</script>
