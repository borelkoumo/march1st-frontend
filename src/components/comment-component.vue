<template>
  <q-card class="comment-card" flat>
    <q-card-section class="send-section">
      <q-item>
        <q-item-section avatar class="q-mr-sm">
          <q-avatar>
            <img src="https://cdn.quasar.dev/img/avatar.png" />
          </q-avatar>
        </q-item-section>
        <q-item-section>
          <q-input v-model="message" label="Leave a message" dense>
            <template v-slot:append>
              <q-icon
                name="send"
                @click="message = ''"
                class="cursor-pointer text-secondary"
              />
            </template>
          </q-input>
        </q-item-section>
      </q-item>
    </q-card-section>
    <q-card-section class="last-message q-gutter-md">
      <q-item>
        <q-item-section avatar class="q-mr-sm">
          <q-avatar>
            <img src="https://cdn.quasar.dev/img/avatar.png" />
          </q-avatar>
        </q-item-section>
        <q-item-section>
          <div class="comment-param">
            <span>You</span>
            <span class="q-pl-md">22m</span>
          </div>
          <div class="comment-message">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
            lobortis ipsum erat, in commodo felis pulvinar vitae Lorem ipsum
            dolor sit amet, consectetur adipiscing elit. Quisque lobortis ipsum
            erat, in commodo felis pulvinar vitae
          </div>
        </q-item-section>
      </q-item>
      <q-item>
        <q-item-section avatar class="q-mr-sm">
          <q-avatar>
            <img src="https://cdn.quasar.dev/img/avatar.png" />
          </q-avatar>
        </q-item-section>
        <q-item-section>
          <div class="comment-param">
            <span>March1 Admin</span>
            <span class="q-pl-md">22m</span>
          </div>
          <div class="comment-message">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
            lobortis ipsum erat, in commodo felis pulvinar vitae Lorem ipsum
            dolor sit amet, consectetur adipiscing elit. Quisque lobortis ipsum
            erat, in commodo felis pulvinar vitae
          </div>
        </q-item-section>
      </q-item>
    </q-card-section>
  </q-card>
</template>
<script>
export default {
  data() {
    return {
      message: null,
    };
  },
};
</script>
<style scoped>
.comment-card {
  border-radius: 10px;
}
.last-message .q-item {
  background: #f9f9f9;
  border: 1px solid #e4e7eb;
  box-sizing: border-box;
  border-radius: 24px;
}
.last-message .comment-param {
  font-family: "inter";
  font-style: normal;
  font-weight: bold;
  font-size: 18px;
  line-height: 30px;
  letter-spacing: -0.02em;
  color: #46516d;
}
.last-message .comment-message {
  font-family: Inter;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 25px;
  letter-spacing: -0.015em;
  color: #838181;
}
.send-section .q-input {
  font-family: 'inter';
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 25px;
  letter-spacing: -0.015em;
  color: #838181;
}
</style>
