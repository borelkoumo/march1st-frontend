<template>
  <router-view v-if="getUser && getAllPrograms.length>=0"/>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  computed:{
    ...mapGetters('auth',[
      'getUser'
    ]),
    ...mapGetters('program',[
      'getAllPrograms'
    ])
  },
  methods: {
    ...mapActions('program',[
      'GET_PROGRAMS',
      'GET_MY_PROGRAMS',
    ])
  },
  async beforeMount(){
    try {
      this.$q.loading.show();
      await this.GET_PROGRAMS();
      await this.GET_MY_PROGRAMS();
      this.$q.loading.hide();
    } catch (error) {
      this.$q.loading.hide();
      console.log(error)
    }
  }
}
</script>

<style>

</style>
