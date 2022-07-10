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
      await this.GET_PROGRAMS();
      await this.GET_MY_PROGRAMS();
    } catch (error) {
      console.log(error)
    }
  }
}
</script>

<style>

</style>
