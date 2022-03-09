<template>
  <q-page class="bg-home">
    <div class="main-content">
      <q-toolbar
        class="bg-none flex q-gutter-sm header"
        style="padding-top: 40px"
      >
        <q-input
          outlined
          borderless
          v-model="search"
          label="Search"
          class="bg-white input-text col"
          dense
        >
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
        <q-select
          dense
          class="bg-white select-input"
          v-model="size"
          :options="sizes"
          label="size"
          borderless
        />
        <q-space />
        <q-btn
          no-caps
          label="Submissions"
          class=""
          flat
          icon-right="import_export"
          style="min-width: 160px"
        />
      </q-toolbar>
      <div class="q-gutter-lg q-pt-lg q-pb-lg">
          <client-component class="q-pa-lg"/>
          <client-component class="q-pa-lg"/>
          <client-component class="q-pa-lg"/>
          <client-component class="q-pa-lg"/>
      </div>
    </div>
  </q-page>
</template>
<script>
import clientComponent from '../../components/client-component.vue';
export default {
  components: { clientComponent },
  data() {
    return {
      search: null,
      size: null,
      sizes: [{ label: "", value: "" }],
    };
  },
};
</script>
<style scoped>
.header .select-input {
  width: 175px;
  padding-left: 10px;
  border-radius: 8px;
}
.header .input-text {
  background: #ffffff;
  border-radius: 8px;
}
.bg-home {
  background-color: #eaf5ff;
}
.main-content {
  padding-left: 24px;
  padding-right: 24px;
}
</style>
