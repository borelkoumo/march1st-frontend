<template>
  <q-page class="bg-home">
    <div class="main-content q-pt-lg q-pb-lg">
      <q-toolbar class="header q-pl-none q-pr-none q-pb-lg">
        <div class="flex col q-gutter-md q-pr-lg">
          <q-btn-dropdown
            outline
            color="secondary"
            class="bg-white col"
            label="Program Name"
            no-caps
          >
            <q-list>
              <q-item clickable v-close-popup>
                <q-item-section>
                  <q-item-label>PayPal</q-item-label>
                </q-item-section>
              </q-item>
              <q-item clickable v-close-popup>
                <q-item-section>
                  <q-item-label>Bank Account</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-btn-dropdown>
          <q-btn-dropdown
            outline
            color="secondary"
            class="bg-white col"
            label="Payment Method"
            no-caps
          >
            <q-list>
              <q-item clickable v-close-popup>
                <q-item-section>
                  <q-item-label>PayPal</q-item-label>
                </q-item-section>
              </q-item>
              <q-item clickable v-close-popup>
                <q-item-section>
                  <q-item-label>Bank Account</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-btn-dropdown>
          <q-btn-dropdown
            outline
            color="secondary"
            class="bg-white col"
            label="Status"
            no-caps
          >
            <q-list>
              <q-item clickable v-close-popup>
                <q-item-section>
                  <q-item-label>Paid</q-item-label>
                </q-item-section>
              </q-item>
              <q-item clickable v-close-popup>
                <q-item-section>
                  <q-item-label>Unpaid</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-btn-dropdown>
        </div>
        <q-space />
        <q-btn
          dense
          no-caps
          label="Submissions"
          class="btn-filter q-pr-none"
          flat
          icon-right="import_export"
        />
      </q-toolbar>
      <div class="q-gutter-lg">
        <q-card class="card-payment q-pa-lg bg-white" flat>
          <div class="flex flex-center">
            <div class="box-image col">
              <q-img src="~assets/local/image17.png" width="195px" />
            </div>
            <div class="content-payment flex col">
              <div class="box-left col">
                <q-badge class="unpaid">Status: Unpaid</q-badge>
                <div class="title q-pt-md q-pb-sm">
                  Client Name Lorem ipsum dolor sit amet,
                </div>
                <div class="subtitle q-pb-md">
                  NProgram Name Lorem Ipsum is simply dummy text of the printing
                  and typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a type
                </div>
                <q-btn
                  label="Mark as Paid"
                  class="text-white bg-secondary"
                  flat
                  no-caps
                />
              </div>
              <div class="box-right">
                <q-list>
                  <q-item>
                    <q-item-section>Amount Due :</q-item-section>
                    <q-item-section
                      class="text-right text-secondary"
                      style="max-width: 100px"
                      >$600</q-item-section
                    >
                  </q-item>
                  <q-item>
                    <q-item-section>Payment Method :</q-item-section>
                    <q-item-section
                      class="text-right text-secondary"
                      style="max-width: 100px"
                      >PayPal</q-item-section
                    >
                  </q-item>
                  <q-item>
                    <q-item-section>Severity Level :</q-item-section>
                    <q-item-section
                      class="text-right text-secondary"
                      style="max-width: 100px"
                      >Medium</q-item-section
                    >
                  </q-item>
                  <q-item>
                    <q-item-section>Hacker Name :</q-item-section>
                    <q-item-section
                      class="text-right text-secondary"
                      style="max-width: 100px"
                      >Durian Grey</q-item-section
                    >
                  </q-item>
                </q-list>
              </div>
            </div>
          </div>
        </q-card>
        <q-card class="card-payment q-pa-lg bg-white" flat>
          <div class="flex flex-center">
            <div class="box-image col">
              <q-img src="~assets/local/image17.png" width="195px" />
            </div>
            <div class="content-payment flex col">
              <div class="box-left col">
                <q-badge class="paid">Status: Paid</q-badge>
                <div class="title q-pt-md q-pb-sm">
                  Client Name Lorem ipsum dolor sit amet,
                </div>
                <div class="subtitle q-pb-md">
                  NProgram Name Lorem Ipsum is simply dummy text of the printing
                  and typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a type
                </div>
              </div>
              <div class="box-right">
                <q-list>
                  <q-item>
                    <q-item-section>Amount Due :</q-item-section>
                    <q-item-section
                      class="text-right text-secondary"
                      style="max-width: 100px"
                      >$600</q-item-section
                    >
                  </q-item>
                  <q-item>
                    <q-item-section>Payment Method :</q-item-section>
                    <q-item-section
                      class="text-right text-secondary"
                      style="max-width: 100px"
                      >PayPal</q-item-section
                    >
                  </q-item>
                  <q-item>
                    <q-item-section>Severity Level :</q-item-section>
                    <q-item-section
                      class="text-right text-secondary"
                      style="max-width: 100px"
                      >Medium</q-item-section
                    >
                  </q-item>
                  <q-item>
                    <q-item-section>Hacker Name :</q-item-section>
                    <q-item-section
                      class="text-right text-secondary"
                      style="max-width: 100px"
                      >Durian Grey</q-item-section
                    >
                  </q-item>
                </q-list>
              </div>
            </div>
          </div>
        </q-card>
        <q-card class="card-payment q-pa-lg bg-white" flat>
          <div class="flex flex-center">
            <div class="box-image col">
              <q-img src="~assets/local/image17.png" width="195px" />
            </div>
            <div class="content-payment flex col">
              <div class="box-left col">
                <q-badge class="paid">Status: Paid</q-badge>
                <div class="title q-pt-md q-pb-sm">
                  Client Name Lorem ipsum dolor sit amet,
                </div>
                <div class="subtitle q-pb-md">
                  NProgram Name Lorem Ipsum is simply dummy text of the printing
                  and typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a type
                </div>
              </div>
              <div class="box-right">
                <q-list>
                  <q-item>
                    <q-item-section>Amount Due :</q-item-section>
                    <q-item-section
                      class="text-right text-secondary"
                      style="max-width: 100px"
                      >$600</q-item-section
                    >
                  </q-item>
                  <q-item>
                    <q-item-section>Payment Method :</q-item-section>
                    <q-item-section
                      class="text-right text-secondary"
                      style="max-width: 100px"
                      >PayPal</q-item-section
                    >
                  </q-item>
                  <q-item>
                    <q-item-section>Severity Level :</q-item-section>
                    <q-item-section
                      class="text-right text-secondary"
                      style="max-width: 100px"
                      >Medium</q-item-section
                    >
                  </q-item>
                  <q-item>
                    <q-item-section>Hacker Name :</q-item-section>
                    <q-item-section
                      class="text-right text-secondary"
                      style="max-width: 100px"
                      >Durian Grey</q-item-section
                    >
                  </q-item>
                </q-list>
              </div>
            </div>
          </div>
        </q-card>
      </div>
    </div>
  </q-page>
</template>
<script>
export default {};
</script>
<style scoped>
.btn-filter {
  font-family: "inter";
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 34px;
  color: #767676;
}
.header .q-btn-dropdown {
  background-color: #ffffff;
  border: 1px solid #5887ff;
  box-sizing: border-box;
  border-radius: 8px;
  font-family: "inter";
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 34px;
  color: #767676;
}
.card-payment .title {
  font-family: "inter";
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 22px;
  letter-spacing: -0.015em;
  color: #46516d;
}
.card-payment .subtitle {
  font-family: "inter";
  font-style: normal;
  font-weight: 300;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: -0.015em;
  color: #838181;
}
.card-payment .box-image {
  max-width: 195px;
}
.content-payment .box-right {
  min-width: 300px;
  font-family: "inter";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 26px;
  letter-spacing: -0.015em;
  color: #46516d;
}
.content-payment .box-left {
  padding-left: 34px;
  padding-right: 65px;
}
.card-payment .q-badge {
  font-family: "inter";
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 25px;
  letter-spacing: -0.015em;
  padding-left: 15px;
  padding-right: 15px;
}
.card-payment .paid {
  background: rgba(71, 184, 129, 0.2);
  color: rgba(71, 184, 129, 1);
}
.card-payment .unpaid {
  background-color: rgba(247, 213, 213, 1);
  color: #f55b5d;
}
.card-payment {
  border-radius: 10px;
}
.bg-home {
  background-color: #eaf5ff;
}
.main-content {
  padding-left: 24px;
  padding-right: 24px;
}
</style>
