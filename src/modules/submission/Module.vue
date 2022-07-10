<template>
  <router-view v-if="getMyPrograms.length>0 && getMySubmissions.length>=0"/>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  data() {
    return {

    }
  },
  computed: {
    ...mapGetters('submission',[
      'getMySubmissions'
    ]),
    ...mapGetters('program',[
      'getMyPrograms'
    ])
  },
  methods:{
    ...mapActions('submission',[
      'GET_MY_SUBMISSIONS',
      'GET_ALL_SUBMISSIONS'
    ]),
    ...mapActions('program',[
      'GET_MY_PROGRAMS'
    ])
  },
  async beforeMount() {
    await this.GET_ALL_SUBMISSIONS();
    await this.GET_MY_SUBMISSIONS();
    await this.GET_MY_PROGRAMS();
  },
}
</script>

<style>

</style>
