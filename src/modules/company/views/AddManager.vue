<template>
  <q-page class="bg-home">
    <div class="main-content q-pt-lg q-pb-lg">
      <q-card class="card-info q-pb-lg q-pb-lg q-mt-lg" flat>
        <div class="flex q-gutter-lg q-pb-md">
          <div class="form-elt col">
            <div class="subtitle q-pb-sm">User Name</div>
            <div class="">
              <q-input
                type=""
                v-model="formData.username"
                label="Enter Name"
                borderless
                class="q-pl-sm q-pr-sm"
              />
            </div>
          </div>
        </div>
        <div class="flex q-gutter-lg q-pb-md">
          <div class="form-elt col">
            <div class="subtitle q-pb-sm">Title</div>
            <div class="">
              <q-input
                type="text"
                v-model="formData.title"
                label="Enter Title"
                borderless
                class="q-pl-sm q-pr-sm"
              />
            </div>
          </div>
          <div class="form-elt col">
            <div class="subtitle q-pb-sm">Email ID</div>
            <div class="">
              <q-input
                type="email"
                v-model="formData.email"
                label="Enter email"
                borderless
                class="q-pl-sm q-pr-sm"
              />
            </div>
          </div>
        </div>
        <div class="flex q-gutter-lg q-pb-md">
          <div class="form-elt col">
            <div class="subtitle q-pb-sm">Status</div>
            <div class="">
              <q-select
                :options="locations"
                v-model="location"
                label="Select Status"
                borderless
                class="q-pl-sm q-pr-sm select-input"
              />
            </div>
          </div>
          <div class="form-elt col">
            <div class="subtitle q-pb-sm">Role</div>
            <div class="">
              <q-select
                :options="roles"
                v-model="role"
                label="Select Role"
                borderless
                class="q-pl-sm q-pr-sm select-input"
              />
            </div>
          </div>
          <div class="form-elt col">
            <div class="subtitle q-pb-sm">Privilege</div>
            <div class="">
              <q-select
                :options="locations"
                v-model="location"
                label="Select Privilege"
                borderless
                class="q-pl-sm q-pr-sm select-input"
              />
            </div>
          </div>
        </div>
      </q-card>
      <q-card class="card-list q-pa-lg q-pb-lg q-mt-lg" flat>
        <div class="q-pr-md q-pl-md">
          <q-toolbar class="q-pb-md">
            <div class="subtitle2">Programs</div>
            <q-space />
            <q-input
              outlined
              borderless
              v-model="search"
              label="Search"
              class="input-text"
              dense
            >
              <template v-slot:append>
                <q-icon name="search" />
              </template>
            </q-input>
          </q-toolbar>
          <q-list separator bordered>
            <q-item class="header">
              <q-item-section class="flex flex-center" style="max-width: 40px">
                <q-checkbox v-model="box1" color="secondary" />
              </q-item-section>
              <q-item-section> Program Name </q-item-section>
              <q-item-section class="flex flex-center" style="max-width: 170px">
                <span
                  >Type <q-icon name="import_export" class="q-pl-lg"
                /></span>
              </q-item-section>
              <q-item-section class="flex flex-center" style="max-width: 140px">
                <span
                  >Date <q-icon name="import_export" class="q-pl-lg"
                /></span>
              </q-item-section>
              <q-item-section class="flex flex-center" style="max-width: 60px">
                Actions
              </q-item-section>
            </q-item>
            <q-item :class="{ 'active-item': box2 == true }"
              v-for="program in allPrograms" :key="program.id"
            >
              <q-item-section class="flex flex-center" style="max-width: 40px">
                <q-checkbox v-model="formData.programs" :val="program.id" color="secondary" />
              </q-item-section>
              <q-item-section>
                <q-item class="flex flex-center no-padding">
                  <q-item-section style="max-width: 70px; max-height: 70px;">
                    <q-img
                      :src="program.program_picture_url"
                      width="66px"
                    />
                  </q-item-section>
                  <q-item-section class="subtitle2">
                    {{program.program_title}}
                  </q-item-section>
                </q-item>
              </q-item-section>
              <q-item-section
                class="subtitle5 flex flex-center"
                style="max-width: 170px"
              >
                Mnc
              </q-item-section>
              <q-item-section
                class="subtitle5 flex flex-center"
                style="max-width: 140px"
              >
                {{program.createdAt}}
              </q-item-section>
              <q-item-section class="flex flex-center" style="max-width: 60px">
                <q-btn icon="more_horiz" flat />
              </q-item-section>
            </q-item>
          </q-list>
        </div>
      </q-card>
      <div class="flex q-pt-lg q-pb-lg q-gutter-lg">
        <q-space />
        <q-btn
          label="Cancel"
          outline
          class="text-center text-secondary bg-white"
          no-caps
          style="width: 160px"
        />
        <q-btn
          label="Add User"
          flat
          class="text-center text-white bg-secondary"
          no-caps
          style="width: 160px"
          @click="onAddUser()"
        />
      </div>
    </div>
  </q-page>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
export default {
  data() {
    return {
      formData:{
        username: null,
        email: null,
        title:null,
        role:null,
        programs:[]
      },
      allPrograms:[],
      status: [],
      stat: null,
      locations: [],
      location: null,
      search: null,
      role:{label:"Program Manager", value:"program_manager"},
      roles:[
        {label:"Program Super Admin", value:"program_super_admin"},
        {label:"Program Manager", value:"program_manager"}
      ],
      privileges:[
        {label:"Read program",value:"read"},
        {label:"Edit program",value:"read"},
        {label:"Create program",value:"read"},
      ],

      box1: false,
      box2: false,
      box3: true,
      box4: false,
    };
  },
  computed:{
    ...mapGetters('program',[
      'getMyPrograms'
    ])
  },
  methods: {
    ...mapActions('program',[
      'GET_MY_PROGRAMS'
    ]),
    ...mapActions('company',[
      'ADD_USER'
    ]),
    async onAddUser(){
      try {
        this.$q.loading.show();
        this.formData.role=this.role.value;
        await this.ADD_USER(this.formData);
        this.$q.loading.hide();
      } catch (error) {
        console.log(error);
        this.$q.loading.hide();
      }
    }
  },
  async beforeMount(){
    try {
      this.$q.loading.show();
      const programs = await this.GET_MY_PROGRAMS();
      console.log("beforeMount/programs = ",programs);
      this.allPrograms = programs.map(function(program){
        return{
          id:program.id,
          program_picture_url:program.program_picture_url,
          program_title:program.program_title,
          createdAt:program.createdAt
        }
      });
      this.$q.loading.hide();
    } catch (error) {
      this.$q.loading.hide();
    }
  }
}
</script>

<style lang="scss" scoped>
  .card-list .active-item {
  background: #f2f6ff;
}
.card-list .subtitle2 {
  font-family: "inter";
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 140%;
  letter-spacing: -0.3px;
  color: #1b2559;
}
.card-list .subtitle3 {
  font-family: "inter";
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 140%;
  letter-spacing: -0.3px;
  color: #1b2559;
}
.card-list .subtitle4 {
  font-family: "inter";
  font-style: normal;
  font-weight: 300;
  font-size: 12px;
  line-height: 25px;
  letter-spacing: -0.015em;
  color: #838181;
}
.card-list .subtitle5 {
  font-family: "inter";
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 140%;
  letter-spacing: -0.3px;
  color: #767676;
}
.card-list .q-toolbar {
  padding-left: 0;
  padding-right: 0;
}
.card-list .header {
  background: #eff0f6;
  box-shadow: 0px 1px 0px #dadbe4;
  font-family: "inter";
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 140%;
  letter-spacing: -0.3px;
  color: #767676;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}
.card-list .q-list {
  border-radius: 10px;
}
.card-list .input-text {
  background: #fbfbfb;
  border-radius: 8px;
  width: 520px;
}
.card-info {
  padding-left: 40px;
  padding-right: 30px;
}
.card-info .subtitle {
  font-family: "inter";
  font-style: normal;
  font-weight: bold;
  font-size: 18px;
  line-height: 30px;
  letter-spacing: -0.02em;
  color: #46516d;
}
.form-elt .q-input,
.form-elt .q-select {
  background: #fbfbfb;
  border: 1px solid #f3f3f3;
  box-sizing: border-box;
  border-radius: 12px;
  width: 100%;
}
.bg-home {
  background-color: #eaf5ff;
}
.main-content {
  padding-left: 24px;
  padding-right: 24px;
}
</style>
