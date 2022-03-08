<template>
  <q-page class="bg-home">
    <div class="main-content q-pt-lg">
      <div class="q-gutter-lg q-pb-lg">
        <task-component>
          <template v-slot:image>
            <q-img src="~assets/local/unsplash_feXpdV001o4.png" width="130px" />
          </template>
          <template v-slot:submission>
            <submission-task/>
          </template>
        </task-component>
      </div>
      <comment-component/>
    </div>
  </q-page>
</template>
<script>
import CommentComponent from '../../components/comment-component.vue';
import SubmissionTask from '../../components/submission-task.vue';
import TaskComponent from "../../components/task-component.vue";

export default {
  components: {
    TaskComponent,
    CommentComponent,
    SubmissionTask,
  },
  data() {
    return {};
  },
};
</script>
<style scoped>
.bg-home {
  background-color: #eaf5ff;
}
.main-content {
  padding-left: 24px;
  padding-right: 24px;
}
.btn-filter {
  font-family: "inter";
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 34px;
  color: #767676;
}
.btn-element {
  background: #ffffff;
  border-radius: 40px;
  padding-left: 20px;
  padding-right: 20px;
}
.q-toolbar {
  padding: 0;
}
</style>
