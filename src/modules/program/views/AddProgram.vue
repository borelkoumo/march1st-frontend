<template>
  <q-page class="bg-home">
    <div class="main-content">
      <q-toolbar
        class="bg-none flex q-gutter-sm header"
        style="padding-top: 40px"
      >
        <q-toolbar-title class="title-header">Add A Program</q-toolbar-title>
      </q-toolbar>
      <q-card
        class="card-user q-mt-lg bg-transparent"
        flat
        style="border-radius: 10px"
      >
        <div class="wrap-card q-pa-lg flex flex-center bg-white">
          <div class="wrap-image flex flex-center drop-zone cursor-pointer">
            <div class="card-image drop-zone__prompt">
              <q-img src="~assets/local/file_copy.png" width="32px" />
              <div class="subtitle">Program picture</div>
              <div class="subtitle-2">Drop your file here</div>
            </div>
            <div
              class="drop-zone__thumb drop-zone__thumb-hidden"
              data-label="myfile.txt"
            ></div>
            <input
              type="file"
              name="program_picture"
              id=""
              hidden
              class="drop-zone__input"
            />
          </div>
          <div class="flex col content-card">
            <div style="width: 100%">
              <div class="form-elt q-pb-lg">
                <div class="subtitle q-pb-sm">Program Title</div>
                <div class="">
                  <q-input
                    type=""
                    v-model="formData.program_title"
                    label="Enter Title"
                    borderless
                    class="q-pl-sm q-pr-sm"
                  />
                </div>
              </div>
              <div class="form-elt q-pb-lg">
                <div class="subtitle q-pb-sm">Program Description</div>
                <div class="">
                  <q-input
                    type="textarea"
                    v-model="formData.program_description"
                    label="Enter description"
                    borderless
                    class="q-pl-sm q-pr-sm"
                    style="
                      background: #fbfbfb;
                      border: 1px solid #f3f3f3;
                      box-sizing: border-box;
                      border-radius: 12px;
                    "
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </q-card>
      <div
        class="q-pt-lg"
        style="display: grid; grid-template-columns: 3fr 2fr; grid-gap: 24px"
      >
        <div class="bg-white q-pa-lg" style="border-radius: 16px">
          <q-list>
            <q-item class="q-pl-none q-pr-none">
              <q-item-section class="radio-element">
                <div class="q-pb-md">Program Type</div>
                <q-radio
                  name="program-type"
                  v-model="formData.program_type"
                  val="private"
                  label="Private"
                  color="secondary"
                />
                <q-radio
                  name="program-type"
                  v-model="formData.program_type"
                  val="public"
                  label="Public"
                  color="secondary"
                />
              </q-item-section>
              <q-item-section class="radio-element">
                <div class="q-pb-md">Safe Harbour Type</div>
                <q-radio
                  name="program-type"
                  v-model="formData.safe_harbour_type"
                  val="full"
                  label="Full Safe Harbor"
                  color="secondary"
                />
                <q-radio
                  name="program-type"
                  v-model="formData.safe_harbour_type"
                  val="partial"
                  label="Partial Safe Harbor"
                  color="secondary"
                />
              </q-item-section>
              <q-item-section class="radio-element">
                <div class="q-pb-md">Reward Type</div>
                <q-radio
                  name="program-type"
                  v-model="formData.reward_type"
                  val="cash"
                  label="Cash Payment"
                  color="secondary"
                />
                <q-radio
                  name="program-type"
                  v-model="formData.reward_type"
                  val="points"
                  label="Points"
                  color="secondary"
                />
              </q-item-section>
            </q-item>
          </q-list>
        </div>
        <div class="bg-white q-pa-lg" style="border-radius: 16px">
          <q-list>
            <q-item class="item-amount">
              <q-item-section class="first-element" style="max-width: 60px"
                >P1</q-item-section
              >
              <q-item-section class="second-element">Critical</q-item-section>
              <q-item-section class="q-pl-sm q-pr-sm">
                <q-range
                  v-model="formData.critical"
                  :min="formData.severe.min"
                  :max="5000"
                  label
                  color="secondary"
                />
              </q-item-section>
            </q-item>
            <q-item class="item-amount">
              <q-item-section class="first-element" style="max-width: 60px"
                >P2</q-item-section
              >
              <q-item-section class="second-element">Severe</q-item-section>
              <q-item-section class="q-pl-sm q-pr-sm">
                <q-range
                  v-model="formData.severe"
                  :min="formData.medium.min"
                  :max="formData.critical.max"
                  label
                  color="secondary"
                />
              </q-item-section>
            </q-item>
            <q-item class="item-amount">
              <q-item-section class="first-element" style="max-width: 60px"
                >P3</q-item-section
              >
              <q-item-section class="second-element">Medium</q-item-section>
              <q-item-section class="q-pl-sm q-pr-sm">
                <q-range
                  v-model="formData.medium"
                  :min="formData.low.min"
                  :max="formData.severe.max"
                  label
                  color="secondary"
                />
              </q-item-section>
            </q-item>
            <q-item class="item-amount">
              <q-item-section class="first-element" style="max-width: 60px"
                >P4</q-item-section
              >
              <q-item-section class="second-element">Low</q-item-section>
              <q-item-section class="q-pl-sm q-pr-sm">
                <q-range
                  v-model="formData.low"
                  :min="0"
                  :max="formData.medium.max"
                  label
                  color="secondary"
                />
              </q-item-section>
            </q-item>
          </q-list>
        </div>
      </div>
      <div class="q-pt-lg q-pb-lg">
        <q-card class="my-card card-description" flat>
          <q-card-section class="title q-pt-lg q-pb-md"
            >Detailed Description</q-card-section
          >
          <q-card-section class="q-pb-sm">
            <!--<div class="subtitle q-pb-sm">Program Guidelines</div>-->
            <div class="relative-position">
              <!--<q-popup-proxy v-model="editColor">
                  <q-color v-model="textColor" @change="applyColor"></q-color>
                </q-popup-proxy>-->
              <q-editor
                ref="program_editor"
                v-model="formData.program_guidelines_1"
                :dense="$q.screen.lt.md"
                :toolbar="toolbar"
                :fonts="fonts"
                :definitions="{
                  fontColor: {
                    tip: 'Change font color',
                    icon: 'colorize',
                    label: 'Font Color',
                    handler: showChangeColor,
                  },
                }"
              >

              </q-editor>
              <q-color
                  v-model="textColor"
                  @change="applyColor"
                  v-if="editColor"
                  no-header
                  style="width: 90px; position:absolute; top:0; right: 0;"
                  no-footer
                />
            </div>
          </q-card-section>
          <!--<q-card-section class="q-pb-sm">
            <div class="subtitle q-pb-sm">Rewards Guidelines</div>
            <div class="">
              <q-editor
                v-model="formData.program_guidelines_2"
                :dense="$q.screen.lt.md"
                :toolbar="toolbar"
                :fonts="fonts"
              />
            </div>
          </q-card-section>
          <q-card-section class="q-pb-sm">
            <div class="subtitle q-pb-sm">Legal Terms</div>
            <div class="">
              <q-editor
                v-model="formData.legal_terms"
                :dense="$q.screen.lt.md"
                :toolbar="toolbar"
                :fonts="fonts"
              />
            </div>
          </q-card-section>-->
        </q-card>
      </div>
      <div class="card-invite">
        <q-card class="my-card" flat>
          <q-toolbar
            class="toolbar"
            style="padding-top: 40px; padding-bottom: 15px"
          >
            <div class="title">Assign Managers</div>
            <q-space />
            <q-input
              dense
              v-model="search_manager"
              placeholder="Search"
              borderless
            >
              <template v-slot:append>
                <q-icon name="search" />
              </template>
            </q-input>
          </q-toolbar>
          <q-card-section>
            <q-list separator>
              <q-item class="item-header">
                <q-item-section style="max-width: 50px"
                  ><q-checkbox
                    v-model="checkAllManagers"
                    class="q-mr-sm"
                    color="secondary"
                /></q-item-section>
                <q-item-section> Username </q-item-section>
                <q-item-section class="text-center">
                  Designation
                </q-item-section>
                <q-item-section class="text-center" style="max-width: 400px">
                  Privileges
                </q-item-section>
              </q-item>
              <q-item
                class="item-element"
                v-for="manager in allManagers"
                :key="manager.id"
              >
                <q-item-section style="max-width: 50px"
                  ><q-checkbox
                    v-model="manager.isCheck"
                    class="q-mr-sm"
                    color="secondary"
                /></q-item-section>
                <q-item-section>
                  <q-item-label class="title">{{
                    manager.first_name
                  }}</q-item-label>
                  <q-item-label caption class="subtitle">{{
                    manager.user.email
                  }}</q-item-label>
                </q-item-section>
                <q-item-section class="text-center title flex flex-center">
                  <div class="">{{ manager.designation }}</div>
                </q-item-section>
                <q-item-section
                  class="text-center text-item"
                  style="max-width: 400px"
                >
                  <q-select
                    v-if="manager.isCheck"
                    bg-color="white"
                    borderless
                    dense
                    :options="privileges"
                    v-model="manager.privilege"
                    label="Select privilege"
                    multiple
                    v-close-popup
                  />
                </q-item-section>
              </q-item>
            </q-list>
          </q-card-section>
        </q-card>
      </div>
      <div class="card-invite q-mt-lg">
        <q-card class="my-card" flat>
          <q-toolbar
            class="toolbar"
            style="padding-top: 40px; padding-bottom: 15px"
          >
            <div class="title">Invite Hackers</div>
            <q-space />
            <q-input
              dense
              v-model="search_hacker"
              placeholder="Search"
              borderless
            >
              <template v-slot:append>
                <q-icon name="search" />
              </template>
            </q-input>
          </q-toolbar>
          <q-card-section>
            <q-list separator>
              <q-item class="item-header">
                <q-item-section style="max-width: 50px"
                  ><q-checkbox
                    v-model="checkAllHackers"
                    class="q-mr-sm"
                    color="secondary"
                /></q-item-section>
                <q-item-section> Username / Email </q-item-section>
                <q-item-section class="text-center" style="max-width: 18%">
                  Rank
                </q-item-section>
                <q-item-section class="text-center" style="max-width: 18%">
                  Acceptance Rate
                </q-item-section>
                <q-item-section class="text-center" style="max-width: 18%">
                  Severity Level
                </q-item-section>
                <q-item-section class="text-center" style="max-width: 50px">
                  Action
                </q-item-section>
              </q-item>
              <q-item
                class="item-element"
                v-for="hacker in allHackers"
                :key="hacker.id"
              >
                <q-item-section style="max-width: 50px"
                  ><q-checkbox
                    v-model="formData.invitations"
                    class="q-mr-sm"
                    color="secondary"
                    :val="hacker.id"
                /></q-item-section>
                <q-item-section>
                  <q-item-label class="title"
                    >{{ hacker.first_name }}
                    {{ hacker.last_name }}</q-item-label
                  >
                  <q-item-label caption class="subtitle">{{
                    hacker.email
                  }}</q-item-label>
                </q-item-section>
                <q-item-section
                  class="text-center flex flex-center"
                  style="max-width: 18%"
                >
                  <div class="active-badge">67%</div>
                </q-item-section>
                <q-item-section
                  class="text-center text-item"
                  style="max-width: 18%"
                >
                  24
                </q-item-section>
                <q-item-section
                  class="text-center text-item"
                  style="max-width: 18%"
                >
                  P1
                </q-item-section>
                <q-item-section
                  class="text-center text-item"
                  style="max-width: 50px"
                >
                  <q-btn flat icon="more_horiz" />
                </q-item-section>
              </q-item>
            </q-list>
          </q-card-section>
        </q-card>
      </div>
      <q-card flat class="bg-transparent q-pb-lg">
        <q-card-actions align="right" class="q-pt-lg q-gutter-md btn-actions">
          <q-btn label="Cancel" no-caps outline color="secondary" />
          <q-btn
            label="Save"
            no-caps
            flat
            class="bg-secondary text-white"
            @click="onSaveProgram()"
          />
        </q-card-actions>
      </q-card>
    </div>
  </q-page>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      textColor: "#000",
      editColor: false,
      fonts: {
        arial: "Arial",
        arial_black: "Arial Black",
        comic_sans: "Comic Sans MS",
        courier_new: "Courier New",
        impact: "Impact",
        lucida_grande: "Lucida Grande",
        times_new_roman: "Times New Roman",
        verdana: "Verdana",
      },
      toolbar: [
        [
          {
            label: this.$q.lang.editor.align,
            icon: this.$q.iconSet.editor.align,
            fixedLabel: true,
            list: "only-icons",
            options: ["left", "center", "right", "justify"],
          },
        ],
        ["bold", "italic", "fontColor"],
        ["token", "hr", "link", "custom_btn"],
        [
          {
            label: this.$q.lang.editor.fontSize,
            icon: this.$q.iconSet.editor.fontSize,
            fixedLabel: true,
            fixedIcon: true,
            list: "no-icons",
            options: [
              "size-1",
              "size-2",
              "size-3",
              "size-4",
              "size-5",
              "size-6",
              "size-7",
            ],
          },
          {
            label: this.$q.lang.editor.defaultFont,
            icon: this.$q.iconSet.editor.font,
            fixedIcon: true,
            list: "no-icons",
            options: [
              "default_font",
              "arial",
              "arial_black",
              "comic_sans",
              "courier_new",
              "impact",
              "lucida_grande",
              "times_new_roman",
              "verdana",
            ],
          },
        ],
        ["unordered", "ordered", "outdent", "indent"],

        ["undo", "redo"],
        ["viewsource"],
      ],
      formData: {
        //id: null,
        //user_id: 1,
        //picture: "https://cdn.quasar.dev/img/parallax2.jpg",
        picture: null,
        program_title: "Lorem ipsum dolor sit amet,",
        program_description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec rutrum congue leo eget malesuada. Cras ultricies ligula sed magna dictum porta.",
        program_type: "public",
        safe_harbour_type: "full",
        reward_type: "points",
        reward_range: false,
        program_guidelines_1:'<div style="text-align: justify;"><b style=""><font color="#fc0505" size="5">Program Guidelines</font></b></div><div style="text-align: justify;"><font size="3"><br></font></div><div><div style="text-align: justify;"><font size="3">Proin eget tortor risus. Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a. Nulla quis lorem ut libero malesuada feugiat. Pellentesque in ipsum id orci porta dapibus.</font></div><div style="text-align: justify;"><font size="3"><br></font></div><div style="text-align: justify;"><font size="3">Curabitur aliquet quam id dui posuere blandit. Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a. Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui. Curabitur arcu erat, accumsan id imperdiet et, porttitor at sem.</font></div><div style="text-align: justify;"><font size="3"><br></font></div><div style="text-align: justify;"><font size="3">Curabitur non nulla sit amet nisl tempus convallis quis ac lectus. Praesent sapien massa, convallis a pellentesque nec, egestas non nisi. Nulla porttitor accumsan tincidunt. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec velit neque, auctor sit amet aliquam vel, ullamcorper sit amet ligula.</font></div><div style="text-align: justify;"><font size="3"><br></font></div><div style="text-align: justify;"><font size="3">Cras ultricies ligula sed magna dictum porta. Cras ultricies ligula sed magna dictum porta. Cras ultricies ligula sed magna dictum porta. Donec rutrum congue leo eget malesuada.</font></div><div style="text-align: justify;"><font size="3"><br></font></div><div style="text-align: justify;"><font size="3">Sed porttitor lectus nibh. Vivamus magna justo, lacinia eget consectetur sed, convallis at tellus. Donec sollicitudin molestie malesuada. Quisque velit nisi, pretium ut lacinia in, elementum id enim.</font></div><div style="text-align: justify;"><font size="3"><br></font></div><div style="text-align: justify;"><b style=""><font color="#fc0505" size="5">Rewards Guidelines</font></b></div><div><p style="text-align: justify; margin-top: 1.1875em; margin-bottom: 1.1875em; letter-spacing: -0.21px; color: rgb(7, 7, 7); font-family: InriaSans, Arial, sans-serif;"><font size="3">Rewards are given based on CVSS scoring and actual business impact.</font></p><table style="font-size: 0.875rem; letter-spacing: -0.21px; margin-bottom: 0px; margin-top: 1.1875em; width: auto; max-width: 100%; overflow-x: auto; line-height: 1.28571; color: rgb(7, 7, 7); font-family: InriaSans, Arial, sans-serif;"><thead><tr><th style="padding: 1.21429em 1.21429em 1.21429em 0px; border-bottom: 0.0625rem solid rgb(224, 224, 224); color: rgb(155, 155, 155); text-transform: uppercase;">RATING</th><th style="padding: 1.21429em; border-bottom: 0.0625rem solid rgb(224, 224, 224); color: rgb(155, 155, 155); text-transform: uppercase;">CVSS SCORE</th><th style="padding: 1.21429em 0px 1.21429em 1.21429em; border-bottom: 0.0625rem solid rgb(224, 224, 224); color: rgb(155, 155, 155); text-transform: uppercase;">BOUNTY</th></tr></thead><tbody><tr><td style="padding: 1.21429em 1.21429em 1.21429em 0px; border-bottom: 0.0625rem solid rgb(224, 224, 224);">None</td><td style="padding: 1.21429em; border-bottom: 0.0625rem solid rgb(224, 224, 224);">0.0</td><td style="padding: 1.21429em 0px 1.21429em 1.21429em; border-bottom: 0.0625rem solid rgb(224, 224, 224);">No bounty</td></tr><tr><td style="padding: 1.21429em 1.21429em 1.21429em 0px; border-bottom: 0.0625rem solid rgb(224, 224, 224);"><span style="font-weight: bolder;">Low</span></td><td style="padding: 1.21429em; border-bottom: 0.0625rem solid rgb(224, 224, 224);">0.1 - 3.9</td><td style="padding: 1.21429em 0px 1.21429em 1.21429em; border-bottom: 0.0625rem solid rgb(224, 224, 224);">$30 - 100</td></tr><tr><td style="padding: 1.21429em 1.21429em 1.21429em 0px; border-bottom: 0.0625rem solid rgb(224, 224, 224);"><span style="font-weight: bolder;">Medium</span></td><td style="padding: 1.21429em; border-bottom: 0.0625rem solid rgb(224, 224, 224);">4.0 - 6.9</td><td style="padding: 1.21429em 0px 1.21429em 1.21429em; border-bottom: 0.0625rem solid rgb(224, 224, 224);">$100 - 500</td></tr><tr><td style="padding: 1.21429em 1.21429em 1.21429em 0px; border-bottom: 0.0625rem solid rgb(224, 224, 224);"><span style="font-weight: bolder;">High</span></td><td style="padding: 1.21429em; border-bottom: 0.0625rem solid rgb(224, 224, 224);">7.0 - 8.9</td><td style="padding: 1.21429em 0px 1.21429em 1.21429em; border-bottom: 0.0625rem solid rgb(224, 224, 224);">$500 – 2500</td></tr><tr><td style="padding: 1.21429em 1.21429em 1.21429em 0px; border-bottom: 0.0625rem solid rgb(224, 224, 224);"><span style="font-weight: bolder;">Critical</span></td><td style="padding: 1.21429em; border-bottom: 0.0625rem solid rgb(224, 224, 224);">9.0 - 10.0</td><td style="padding: 1.21429em 0px 1.21429em 1.21429em; border-bottom: 0.0625rem solid rgb(224, 224, 224);">$1000 - 10000</td></tr></tbody></table></div><div><br></div><div><font color="#fc0505" size="5"><b style="">Legal Terms</b></font></div><div><div><br></div><div style="text-align: justify;"><font size="3">Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a. Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a. Vivamus suscipit tortor eget felis porttitor volutpat. Curabitur arcu erat, accumsan id imperdiet et, porttitor at sem.</font></div><div style="text-align: justify;"><font size="3"><br></font></div><div style="text-align: justify;"><font size="3">Sed porttitor lectus nibh. Pellentesque in ipsum id orci porta dapibus. Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a. Curabitur non nulla sit amet nisl tempus convallis quis ac lectus.</font></div><div style="text-align: justify;"><font size="3"><br></font></div><div style="text-align: justify;"><font size="3">Donec sollicitudin molestie malesuada. Vivamus suscipit tortor eget felis porttitor volutpat. Curabitur non nulla sit amet nisl tempus convallis quis ac lectus. Cras ultricies ligula sed magna dictum porta.</font></div></div><div><br></div><div><br></div></div>',
        program_guidelines_2:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec rutrum congue leo eget malesuada.",
        legal_terms:
          "Vivamus suscipit tortor eget felis porttitor volutpat. Curabitur aliquet quam id dui posuere blandit.",
        program_scope: 4,
        hackers: [],
        managers: [],
        critical: { min: 0, max: 1400 },
        severe: { min: 0, max: 1000 },
        medium: { min: 0, max: 900 },
        low: { min: 0, max: 800 },
        is_closed: false,
        //close_at: null,
        //status: "Active",
        //date_post: "10/04/2021",
        invitations: [],

        company: null,
      },
      allHackers: [],
      search_hacker: null,
      checkAllHackers: false,

      search_manager: null,
      checkAllManagers: false,
      allManagers: [],
      privileges: [],
    };
  },
  watch: {
    checkAllHackers: function (val) {
      if (val) {
        this.allHackers.forEach((hacker) => {
          this.formData.invitations.push(hacker.id);
        });
      } else {
        this.formData.invitations = [];
      }
    },
    checkAllManagers: function (val) {
      if (val) {
        this.allManagers.forEach((manager) => {
          manager.isCheck = true;
        });
      } else {
        this.allManagers.forEach((manager) => {
          manager.isCheck = false;
        });
      }
    },
  },
  computed: {
    ...mapGetters("auth", ["getUser", "getHackers"]),
  },
  methods: {
    ...mapActions("program", ["CREATE_PROGRAM"]),
    ...mapActions("auth", ["GET_HACKERS", "GET_MY_COMPANYUSERS"]),
    applyColor() {
      document.execCommand("foreColor", false, this.textColor);
      this.editColor = false;
    },
    showChangeColor() {
      this.editColor = true;
    },
    async onSaveProgram() {
      try {
        this.$q.loading.show();
        this.formData.managers = this.allManagers.filter(
          (m) => m.isCheck == true
        );
        this.formData.company = this.getUser.company.id;
        await this.CREATE_PROGRAM(this.formData);
        this.$router.push("/new-dashboard");
        this.$q.notify({
          message: "Create successfully Program",
          type: "positive",
          position: "top",
        });
        this.$q.loading.hide();
      } catch (e) {
        console.log("error where create program", e.message());
        this.$q.loading.hide();
      }
    },
    dragAndDrop() {
      document.querySelectorAll(".drop-zone__input").forEach((inputElement) => {
        const dropZoneElement = inputElement.closest(".drop-zone");

        dropZoneElement.addEventListener("click", (e) => {
          inputElement.click();
        });
        inputElement.addEventListener("change", (e) => {
          if (inputElement.files.length) {
            updateThumbnail(dropZoneElement, inputElement.files[0]);
            this.formData.picture = inputElement.files[0];
          }
        });

        dropZoneElement.addEventListener("dragover", (e) => {
          e.preventDefault();
          dropZoneElement.classList.add("drop-zone--over");
        });
        ["dragleave", "dragend"].forEach((type) => {
          dropZoneElement.addEventListener(type, (e) => {
            dropZoneElement.classList.remove("drop-zone--over");
          });
        });

        dropZoneElement.addEventListener("drop", (e) => {
          e.preventDefault();
          if (e.dataTransfer.files.length) {
            inputElement.files = e.dataTransfer.files;
            updateThumbnail(dropZoneElement, e.dataTransfer.files[0]);
            this.formData.picture = e.dataTransfer.files[0];
            //console.log(this.formData);
          } else {
          }
          dropZoneElement.classList.remove("drop-zone--over");
        });
      });
      function updateThumbnail(dropZoneElement, file) {
        let thumbnailElement =
          dropZoneElement.querySelector(".drop-zone__thumb");
        if (dropZoneElement.querySelector(".drop-zone__prompt")) {
          dropZoneElement.querySelector(".drop-zone__prompt").remove();
        }
        thumbnailElement.classList.remove("drop-zone__thumb-hidden");
        thumbnailElement.dataset.label = file.name;
        if (file.type.startsWith("image/")) {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => {
            thumbnailElement.style.backgroundImage = `url('${reader.result}')`;
          };
        }
      }
    },
  },
  async mounted() {
    const companyUserData = await this.GET_MY_COMPANYUSERS();
    this.allManagers = companyUserData.map(function (companyUser) {
      let manager = {
        first_name: companyUser.first_name,
        id: companyUser.id,
        last_name: companyUser.last_name,
        user: companyUser.user,
        isCheck: false,
      };
      return manager;
    });
    await this.GET_HACKERS();
    this.allHackers = this.getHackers.map(function (element) {
      let hacker = {
        email: element.email,
        first_name: element.first_name,
        id: element.id,
        last_name: element.last_name,
      };
      return hacker;
    });
    //this.allHackers = this.getHackers;

    this.dragAndDrop();
  },
};
</script>

<style lang="scss" scoped>
.wrap-image {
  width: 250px;
  height: 250px;
  background: #f5f5f5;
  border: 1px dashed #b0b0b0;
  box-sizing: border-box;
  border-radius: 12px;
  /*padding-top: 50px;
  padding-bottom: 50px;*/
  padding: 25px;
}
.drop-zone--over {
  border-style: solid;
}
.wrap-image .card-image {
  text-align: center;
}
.wrap-image .subtitle {
  font-family: "inter";
  font-style: normal;
  font-weight: bold;
  font-size: 18px;
  line-height: 30px;
  text-align: center;
  letter-spacing: -0.02em;
  color: #46516d;
}
.wrap-image .subtitle-2 {
  font-family: "inter";
  font-style: normal;
  font-weight: 300;
  font-size: 14px;
  line-height: 25px;
  text-align: center;
  letter-spacing: -0.015em;
  color: #838181;
}
.drop-zone__thumb {
  width: 100%;
  height: 100%;
  border-radius: 10px;
  background-color: #cccccc;
  background-size: cover;
  position: relative;
}
.drop-zone__thumb::after {
  content: attr(data-label);
  //content: "attr(data-label)";
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 5px 0;
  color: white;
  background-color: rgba(0, 0, 0, 0.75);
  font-size: 14px;
  text-align: center;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
}
.drop-zone__thumb-hidden {
  display: none;
}
.wrap-card {
  border-radius: 10px;
  width: 100%;
}
.content-card {
  padding-left: 40px;
  padding-right: 30px;
}
.wrap-card .subtitle {
  font-family: "inter";
  font-style: normal;
  font-weight: bold;
  font-size: 18px;
  line-height: 30px;
  letter-spacing: -0.02em;
  color: #46516d;
}
.wrap-card .q-input,
.wrap-card .q-select {
  background: #fbfbfb;
  border: 1px solid #f3f3f3;
  box-sizing: border-box;
  border-radius: 12px;
  width: 100%;
}
.btn-actions .q-btn {
  width: 160px;
}

.attachment .title {
  font-family: "inter";
  font-style: normal;
  font-weight: bold;
  font-size: 18px;
  line-height: 30px;
  text-align: center;
  letter-spacing: -0.02em;
  color: #46516d;
}
.attachment .subtitle {
  font-family: "inter";
  font-style: normal;
  font-weight: 300;
  font-size: 14px;
  line-height: 25px;
  text-align: center;
  letter-spacing: -0.015em;
  color: #838181;
}
.attachment {
  background: #f5f5f5;
  border: 1px dashed #b0b0b0;
  box-sizing: border-box;
  border-radius: 12px;
  padding-bottom: 32px;
  padding-top: 32px;
}
.card-description .subtitle {
  font-family: "inter";
  font-style: normal;
  font-weight: bold;
  font-size: 18px;
  line-height: 30px;
  letter-spacing: -0.02em;
  color: #46516d;
}
.card-description .q-input,
.card-description .q-select {
  background: #fbfbfb;
  border: 1px solid #f3f3f3;
  box-sizing: border-box;
  border-radius: 12px;
  width: 100%;
  padding-left: 20px;
  padding-top: 0;
}

.submission-elt {
  border-radius: 10px;
}
.title-submission {
  font-family: "inter";
  font-style: normal;
  font-weight: bold;
  font-size: 24px;
  line-height: 34px;
  display: flex;
  align-items: center;
  letter-spacing: 1px;
  color: #1b2559;
}
.header .title-header {
  font-family: "inter";
  font-style: normal;
  font-weight: bold;
  font-size: 18px;
  line-height: 30px;
  letter-spacing: -0.02em;
  color: #46516d;
}

.text-item {
  font-family: "inter";
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 140%;
  text-align: center;
  letter-spacing: -0.3px;
  color: #767676;
}
.active-badge {
  width: 85px;
  height: 22px;
  background: rgba(255, 172, 50, 0.1);
  border-radius: 100px;
  color: #ffb648;
}
.item-element .subtitle {
  font-family: "inter";
  font-style: normal;
  font-weight: 300;
  font-size: 12px;
  line-height: 25px;
  letter-spacing: -0.015em;
  color: #838181;
}
.item-element .title {
  font-family: "inter";
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 140%;
  letter-spacing: -0.3px;
  color: #1b2559;
}
.q-list .item-header {
  background: #eff0f6;
  box-shadow: 0px 1px 0px #dadbe4;
}
.card-invite {
  border-radius: 16px;
}
.q-card {
  border-radius: 16px;
}
.card-invite .q-toolbar {
  max-height: 10px;
}
.card-invite .toolbar .q-input {
  background: #fbfbfb;
  border-radius: 8px;
  min-width: 45%;
  padding-left: 15px;
  padding-right: 15px;
}
.card-description {
  border-radius: 16px;
}
.card-description .title {
  font-family: "inter";
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 22px;
  letter-spacing: -0.015em;
  color: #46516d;
}
.card-description .subtitle {
  font-family: "inter";
  font-style: normal;
  font-weight: bold;
  font-size: 18px;
  line-height: 30px;
  letter-spacing: -0.02em;
  color: #46516d;
}
.card-description .q-input {
  background: #fbfbfb;
  border: 1px solid #f3f3f3;
  box-sizing: border-box;
  border-radius: 12px;
  width: 100%;
}
.item-amount .first-element {
  font-family: Inter;
  font-style: normal;
  font-weight: bold;
  font-size: 18px;
  line-height: 30px;
  letter-spacing: -0.02em;
  color: #46516d;
}
.item-amount .second-element {
  font-family: "inter";
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  line-height: 38px;
  letter-spacing: -0.015em;
  color: #46516d;
}
.item-amount .q-input {
  background: #fbfbfb;
  border: 1px solid #f3f3f3;
  box-sizing: border-box;
  border-radius: 12px;
  width: 100%;
}
.item-amount .q-field__control {
  height: 32px;
}
.radio-element .q-radio,
.radio-element .q-toggle {
  font-family: "inter";
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 24px;
  letter-spacing: -0.02em;
  color: #a3aed0;
}
.radio-element div {
  font-family: "inter";
  font-style: normal;
  font-weight: bold;
  font-size: 18px;
  line-height: 30px;
  letter-spacing: -0.02em;
  color: #46516d;
}
.title-card {
  font-family: "inter";
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 22px;
  letter-spacing: -0.015em;
  color: #46516d;
  padding-bottom: 25px;
}
.subtitle-card {
  font-family: "inter";
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 25px;
  letter-spacing: -0.015em;
  color: #838181;
}
.recent-title {
  font-family: "inter";
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 22px;
  letter-spacing: -0.015em;
  color: #46516d;
}
.recent-time {
  font-family: "inter";
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 38px;
  letter-spacing: -0.015em;
  color: #838181;
}
.recent-content {
  font-family: "inter";
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 25px;
  letter-spacing: -0.015em;
  color: rgba(0, 0, 0, 0.7);
}
.description-title {
  font-family: "inter";
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 22px;
  letter-spacing: -0.015em;
  color: #46516d;
}
.description-subtitle {
  font-family: "inter";
  font-style: normal;
  font-weight: bold;
  font-size: 18px;
  line-height: 30px;
  letter-spacing: -0.02em;
  color: #46516d;
}
.description-content {
  font-family: "inter";
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 18px;
  letter-spacing: -0.015em;
  color: #46516d;
}
.first-element {
  font-family: "inter";
  font-style: normal;
  font-weight: bold;
  font-size: 18px;
  line-height: 30px;
  letter-spacing: -0.02em;
  color: #46516d;
  max-width: 13%;
}
.second-element {
  font-family: "inter";
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  line-height: 38px;
  letter-spacing: -0.015em;
  color: #46516d;
  max-width: 20%;
}
.third-element {
  font-family: "inter";
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 25px;
  letter-spacing: -0.015em;
  color: #838181;
}
.caption-element {
  font-family: "inter";
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 24px;
  letter-spacing: -0.02em;
  color: #a3aed0;
}
.title-element {
  font-family: "inter";
  font-style: normal;
  font-weight: bold;
  font-size: 18px;
  line-height: 30px;
  letter-spacing: -0.02em;
  color: #46516d;
}
.header .q-btn {
  min-width: 164px;
}
.header .title-header {
  font-family: "inter";
  font-style: normal;
  font-weight: bold;
  font-size: 18px;
  line-height: 30px;
  letter-spacing: -0.02em;
  color: #46516d;
}
.grid-content {
  display: grid;
  grid-template-columns: 3fr 1fr;
  grid-gap: 24px;
}
.grid-element {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 12px;
}
.bg-home {
  background-color: #eaf5ff;
}
.main-content {
  padding-left: 24px;
  padding-right: 24px;
}
</style>
