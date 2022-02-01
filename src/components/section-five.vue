<template>
  <div class="section pt-box pb-box">
    <div class="header-section">
      <div class="first-title">SERVICE</div>
      <div class="second-title relative-position">
        ACTIVE PROGRAMS
        <div
          class="tiret-wrap relative-position"
          style="margin: auto; width: 142px"
        >
          <div
            class="tiret relative-position"
            style="margin-left: -129px; margin-top: -11px; width: 142px"
          ></div>
        </div>
      </div>
    </div>
    <div class="section-five content-box q-pt-lg" style="">
      <q-toolbar class="grid-header">
        <div>
          <q-input
            color="primary"
            outlined
            v-model="search"
            placeholder="Search To Provider Service"
            dense
            class="q-mr-sm"
          >
            <template v-slot:append>
              <q-icon name="search" color="primary" />
            </template>
          </q-input>
        </div>
        <div class="gt-xs flex justify-between">
          <q-btn
            label="PUBLIC (25)"
            class="bg-primary text-white"
            flat
            style="min-width: 170px"
          />
          <q-btn
            label="PRIVATE (55)"
            class="bg-primary text-white"
            flat
            style="min-width: 170px"
          />
          <q-btn
            label="POINONLY (55)"
            class="bg-primary text-white"
            flat
            style="min-width: 170px"
          />
          <q-btn
            label="REWARD (55)"
            class="bg-primary text-white"
            flat
            style="min-width: 170px"
          />
        </div>
        <q-btn
          flat
          label="ALL"
          icon-right="menu"
          dense
          no-wrap
          class="bg-primary text-white xs"
        />
      </q-toolbar>
    </div>
    <div
      class="content-box grid-content q-pa-sm shadow-0"
      style="margin-bottom: 0px"
    >
      <thumbnail
        v-for="(service, i) in services"
        :service="service"
        :key="i"
        class="q-mb-lg"
      />
    </div>
  </div>
</template>
<script>
import thumbnail from "src/components/thumbnail.vue";
export default {
  components: { thumbnail },
  data() {
    return {
      search: null,
      services: [
        {
          color: "white",
          image: "service-1.png",
          title: "Bitbucket discover vernubality Programme Full reward",
          description:
            "Programme to test emirate Airlane System and programmes",
          isProgram: true,
          hasPrice: true,
          price: "100$ 1.000$",
        },
        {
          color: "#7ebf51",
          image: "service-2.png",
          title: "Digistorm",
          description:
            "Programme to test emirate Airlane System and programmes",
          isProgram: true,
          hasPrice: true,
          price: "100$ 1.000$",
        },
        {
          color: "#fff1e6",
          image: "service-3.png",
          title: "Twilio",
          description: "A Cloud Communications Company",
          isProgram: false,
          hasPrice: false,
        },
        {
          color: "black",
          image: "service-4.png",
          title: "Western Union",
          description: "Moving money for better",
          isProgram: true,
          hasPrice: true,
          price: "100$ 1.000$",
        },
        {
          color: "#ff639a",
          image: "service-5.png",
          title: "Bitbucket discover vernubality Programme Full reward",
          description:
            "Programme to test emirate Airlane System and programmes",
          isProgram: false,
          hasPrice: false,
        },
        {
          color: "black",
          image: "service-6.png",
          title: "Bitbucket discover",
          description:
            "Programme to test emirate Airlane System and programmes",
          isProgram: true,
          hasPrice: true,
          price: "100$ 1.000$",
        },
      ],
    };
  },
};
</script>
<style scoped>
.section-five {
  padding-top: 50px;
  padding-bottom: 30px;
}
.grid-header {
  display: grid;
  grid-template-columns: 1fr 2fr;
  grid-gap: 15px;
}
.grid-header.q-toolbar {
  padding: 0px;
}
.grid-content {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 15px;
  background-color: #f2f6f7;
  border-radius: 5px;
}
@media (max-width: 599px) {
  .section-five {
    padding-top: 20px;
    padding-bottom: 10px;
  }
  .grid-header {
    grid-template-columns: 3fr 1fr;
    grid-gap: 0px;
  }
  .grid-header .q-field{
    margin-right: 0;
  }
  .grid-header .q-btn{
    height: 38px;
  }
  .grid-content {
    grid-template-columns: 1fr;
  }
}
</style>
