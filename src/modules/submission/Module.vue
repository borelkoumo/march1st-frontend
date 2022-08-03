<template>
  <router-view
    v-if="getMyPrograms.length > 0 && getMySubmissions.length >= 0"
  />
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters("submission", ["getMySubmissions"]),
    ...mapGetters("program", ["getMyPrograms"]),
  },
  methods: {
    ...mapActions("submission", ["GET_MY_SUBMISSIONS"]),
    ...mapActions("program", ["GET_MY_PROGRAMS"]),
  },
  async beforeMount() {
    try {
      this.$q.loading.show();
      await this.GET_MY_SUBMISSIONS();
      await this.GET_MY_PROGRAMS();
      this.$q.loading.hide();
    } catch (error) {
      this.$q.loading.hide();
    }
  },
};
</script>

<style></style>
