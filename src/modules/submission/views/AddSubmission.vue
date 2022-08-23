<template>
  <q-page class="bg-home">
    <div class="content-page">
      <div class="main-content">
        <q-toolbar class="bg-none flex q-gutter-sm" style="padding-top: 40px">
          <q-space />
          <!-- <q-btn
            no-caps
            outline
            class="bg-white text-secondary"
            label="Log In"
            style="min-width: 160px"
          /> -->
          <q-btn
            no-caps
            label="Submit"
            class="bg-secondary text-white"
            flat
            style="min-width: 160px"
            @click.prevent="onAddReport()"
          />
        </q-toolbar>
        <div class="q-mt-lg submission-elt" v-if="program">
          <program-component :program="program" />
          <submission-component
            :programRequest="program"
          ></submission-component>
        </div>
        <div class="q-mt-lg">
          <q-card class="my-card card-description q-pb-md" flat>
            <q-card-section class="q-pb-sm">
              <div class="subtitle q-pb-sm">Submission Title</div>
              <div class="">
                <q-input
                  type=""
                  v-model="formData.submission_title"
                  label="Vulnerablity in User Private Information Leak"
                  borderless
                  class="q-pl-sm q-pr-sm"
                />
              </div>
            </q-card-section>
            <q-card-section class="q-pb-sm">
              <div class="subtitle q-pb-sm">Submission Severity Level</div>
              <div class="">
                <q-select
                  :options="levels"
                  v-model="level"
                  label="Select Severity Level"
                  borderless
                  class="q-pl-sm q-pr-sm"
                />
              </div>
            </q-card-section>
            <q-card-section class="q-pb-sm">
              <div class="subtitle q-pb-sm">Submission Target</div>
              <div class="">
                <q-input
                  type=""
                  v-model="formData.submission_target"
                  label="Enter Target"
                  borderless
                  class="q-pl-sm q-pr-sm"
                />
              </div>
            </q-card-section>
            <q-card-section class="q-pb-sm">
              <div class="subtitle q-pb-sm">Submission Text</div>

              <q-editor
                v-model="formData.submission_text"
                min-height="8rem"
                style="
                  background: #fbfbfb;
                  border: 1px solid #f3f3f3;
                  box-sizing: border-box;
                  border-radius: 12px;
                "
                class="q-mb-md"
                placeholder=""
              />
            </q-card-section>
          </q-card>
        </div>
        <div class="q-mt-lg q-pb-lg">
          <q-card class="my-card q-pa-md drop-zone cursor-pointer" flat>
            <div class="flex flex-center attachment drop-zone__prompt">
              <div>
                <div class="title">Attachments</div>
                <div class="subtitle">Drop your files here</div>
              </div>
            </div>
            <input
              type="file"
              name="attachment"
              id=""
              hidden
              class="drop-zone__input"
              multiple
            />
          </q-card>
        </div>
        <div class="wrap-thumb q-mb-lg">
          <q-card class="wrap-thumb__card" flat v-for="(thumb,i) in thumbs" :key="i">
            <q-toolbar class="q-pt-sm q-pb-none">
              <q-space />
              <q-btn icon="close" flat class="btn-close" size="10px"/>
            </q-toolbar>
            <q-item class="wrap-thumb__content">
              <q-item-section side>
                <q-img src="images/admin/pdf-img.png" width="41px" />
              </q-item-section>
              <q-item-section class="">
                <div class="filename">{{thumb.name}}</div>
                <div class="filesize">{{convertToMB(thumb.size)}}</div>
              </q-item-section>
            </q-item>
            <div
              class="drop-zone__thumb drop-zone__thumb-hidden"
              data-label="myfile.txt"
            ></div>
          </q-card>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { mapActions } from "vuex";
import submissionComponent from "../components/SubmissionComponent.vue";
import ProgramComponent from "../../program/components/ProgramComponent.vue";

export default {
  components: {
    submissionComponent,
    ProgramComponent,
  },
  data() {
    return {
      thumbs:[],

      idProgram: null,
      program: null,

      formData: {
        id: null,
        submission_title: "Curabitur non nulla sit amet nisl",
        severity_level: "low",
        submission_target: "http://localhost:8080/main/my-submissions",
        submission_text:
          "Vivamus magna justo, lacinia eget consectetur sed, convallis at tellus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec velit neque, auctor sit amet aliquam vel, ullamcorper sit amet ligula. Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui. Quisque velit nisi, pretium ut lacinia in, elementum id enim.",
        program_id: null,
        hacker_id: null,
        etat: null,
        submission_status: "Pending",
        submission_statuses: [],
        attachments:null
      },
      levels: [
        { label: "Low", value: "low" },
        { label: "Medium", value: "medium" },
        { label: "Severe", value: "severe" },
        { label: "High", value: "high" },
      ],
      level: { label: "Low", value: "low" },
    };
  },
  watch: {
    "$route.params.programId": function (val) {
      this.idProgram = val;
    },
  },
  computed: {

  },
  methods: {
    ...mapActions("program", ["GET_ONE_PROGRAM"]),
    ...mapActions("submission", ["CREATE_SUBMISSION"]),
    async onAddReport() {
      try {
        this.$q.loading.show();
        this.formData.program_id = Number(this.idProgram);
        this.formData.severity_level = this.level.value;
        await this.CREATE_SUBMISSION(this.formData);
        this.$router.push("/new-dashboard/submissions");
        this.$q.notify({
          message: "Your submission send successfully",
          position: "top",
          type: "positive",
        });
        this.$q.loading.hide();
      } catch (error) {
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
            console.log(inputElement.files);
            this.thumbs = inputElement.files;
            for(let i =0; i<inputElement.files.length; i++){
              updateThumbnail(dropZoneElement, inputElement.files[i]);
            }
            this.formData.attachments = inputElement.files;
            //updateThumbnail(dropZoneElement, inputElement.files[0]);
            //this.formData.picture = inputElement.files[0];
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
            this.thumbs = e.dataTransfer.files;
            for(let i =0; i<e.dataTransfer.files.length; i++){
              updateThumbnail(dropZoneElement, e.dataTransfer.files[i]);
            }
            this.formData.attachments = e.dataTransfer.files;
            //console.log(this.formData);
          } else {
          }
          dropZoneElement.classList.remove("drop-zone--over");
        });
      });
      function updateThumbnail(dropZoneElement, file) {
        /*let thumbnailElement =
          dropZoneElement.querySelector(".drop-zone__thumb");
        if (dropZoneElement.querySelector(".drop-zone__prompt")) {
          dropZoneElement.querySelector(".drop-zone__prompt").remove();
        }
        thumbnailElement.classList.remove("drop-zone__thumb-hidden");*/
        console.log(file);
        //thumbnailElement.dataset.label = file.name;
        /*if (file.type.startsWith("image/")) {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => {
            thumbnailElement.style.backgroundImage = `url('${reader.result}')`;
          };
        }*/
      }
    },
    convertToMB(octet){
      let result =octet;
      console.log(octet)
      if(octet<1024*1024){
        result = octet/1024;
        return result.toFixed(2)+"ko"
      }
      else if(octet<1024*1024*1024){
        //on met en mo
        result = octet/1024/1024;
        return result.toFixed(2)+"mo";
      }
      else{
        //on met en Go
        result = octet/1024/1024/1024;
        return result.toFixed(2)+"go"
      }
    }
  },
  async beforeMount() {
    this.idProgram = this.$route.params.programId;
    this.program = await this.GET_ONE_PROGRAM(this.idProgram);
  },
  async mounted() {
    this.dragAndDrop();
  },
};
</script>

<style lang="scss" scoped>
.subtitle-timeline {
  font-family: Inter;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 25px;
  letter-spacing: -0.015em;
  color: #838181;
}
.content-timeline {
  font-family: "inter";
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 18px;
  letter-spacing: -0.015em;
  color: #46516d;
}
.title-timeline {
  font-family: "inter";
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 22px;
  letter-spacing: -0.015em;
  color: #5887ff;
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
.drop-zone--over {
  border-style: solid;
}

.wrap-thumb {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-gap:15px;
  .btn-close {
    width: 12px;
    height: 12px;
    color: #5887ff;
    background-color: rgba(88, 135, 255, 0.2);
  }
  .wrap-thumb__card{
    border-radius: 16px;
    .q-toolbar{
      min-height: 20px;
    }
  }
  .wrap-thumb__content {
    .filename {
      font-family: "Inter";
      font-style: normal;
      font-weight: 400;
      font-size: 14px;
      line-height: 17px;
      /* identical to box height */

      display: flex;
      align-items: center;
      letter-spacing: -0.015em;

      color: #46516d;
    }
    .filesize {
      font-family: "Inter";
      font-style: normal;
      font-weight: 400;
      font-size: 14px;
      line-height: 17px;
      /* identical to box height */

      display: flex;
      align-items: center;
      letter-spacing: -0.015em;

      color: #949090;
    }
  }
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
.bg-home {
  background-color: #eaf5ff;
}
.main-content {
  padding-left: 24px;
  padding-right: 24px;
  padding-top: 50px;
  min-width: 100%;
}
.content-page {
  display: flex;
}
.content-page .right-content {
  max-width: 322px;
}
</style>
