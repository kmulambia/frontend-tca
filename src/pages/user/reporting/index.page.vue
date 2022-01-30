
<template>
  <q-page class="bg-white q-pa-md">
    <div class="q-pa-md bg-grey-1">
      <q-breadcrumbs class="text-capitalize">
         <q-breadcrumbs-el label="Home" to="/user/home" />
        <q-breadcrumbs-el label="Reporting" />
      </q-breadcrumbs>
    </div>
    <q-separator class="q-mt-md q-mb-md" />
    <div class="flex flex-center">
      <q-card flat bordered style="width: 800px; max-width: 80vw">
        <q-card-section class="q-gutter-sm row">
          <q-card :class="'point-card bg-blue-5'" flat bordered>
            <q-card-section class="q-pt-xs">
              <div class="text-caption text-white text-uppercase">
                Malawi Cyclone Ana Reports
              </div>
              <div class="q-mt-sm q-mb-xs row">
                <span class="text-body2 text-capitalize col-2">My Entries</span>
                <span
                  class="text-h5 text-weight-light text-white col text-right"
                  >&nbsp; 0
                </span>
              </div>
            </q-card-section>
          </q-card>
        </q-card-section>
        <q-card-section class="q-gutter-sm row">
          <create-report-form v-on:create="createReport" class="q-ma-xs" />
         
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>
<script setup>
import { useQuasar } from "quasar";
import { ref, reactive, onMounted } from "vue";
import { useStore } from "vuex";
import { useRouter, useRoute } from "vue-router";
import createReportForm from "src/components/report-form.component.vue";
//Declarations
const $q = useQuasar();
const $store = useStore();
const $router = useRouter();
const $route = useRoute();
//Variables
const id = ref(null);
const model = ref({});
//Mounted
onMounted(() => {
  id.value = $route.params.id;
});
//Functions
async function createReport(item) {}
///Get Member
</script>
<style lang="sass" scoped>
.point-card
  width: 100%
</style>