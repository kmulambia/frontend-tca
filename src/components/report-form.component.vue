<template>
  <div>
    <q-btn
      color="primary"
      icon="post_add"
      label="Add new report"
      @click="addReportForm = true"
    >
      <q-tooltip>add new report</q-tooltip>
    </q-btn>
    <q-dialog
      v-model="addReportForm"
      :maximized="false"
      transition-show="slide-up"
      transition-hide="slide-down"
      persistent
    >
      <q-card style="width: 600px; max-width: 80vw">
        <q-form @submit.prevent="onSubmit">
          <q-card-section class="bg-grey-2 text-primary">
            <div class="text-h6 text-capitalize">add new report</div>
          </q-card-section>
          <q-separator />
          <q-card-section class="q-gutter-sm">
            <q-select
              class="text-capitalize"
              label="District"
              :hint="'District has ' + admin3s.length + ' TAs'"
              bg-color="white"
              v-model="model.admin2"
              :options="admin2s"
              :option-value="(opt) => opt"
              :option-label="(opt) => opt.admin2Name_en"
              :rules="[
                (val) =>
                  (val !== null && val !== '') || 'You must make selection',
              ]"
              stack-label
              outlined
              dense
              lazy-rules
            />
            <q-select
              :disable="admin3s.length == 0"
              class="text-capitalize"
              label="TA"
              hint=" "
              bg-color="white"
              v-model="model.admin3"
              :options="admin3s"
              :option-value="(opt) => opt"
              :option-label="(opt) => opt.admin3Name_en"
              :rules="[
                (val) =>
                  (val !== null && val !== '') || 'You must make selection',
              ]"
              stack-label
              outlined
              dense
              lazy-rules
            />
            <q-select
              stack-label
              outlined
              label="Camps"
              v-model="model.camps"
              use-input
              use-chips
              multiple
              hide-dropdown-icon
              input-debounce="0"
              new-value-mode="add-unique"
            />
          </q-card-section>
          <span class="q-ml-md">Affected </span>
          <q-card-section class="q-gutter-sm row q-pb-none">
            <q-input
              outlined
              dense
              class="col"
              color="primary"
              type="number"
              v-model="model.HH"
              label="HH"
              :rules="[(val) => val >= 0 || 'please enter  number']"
            />
            <q-input
              outlined
              dense
              class="col"
              color="primary"
              type="number"
              v-model="model.injuries"
              label="Injuries"
              :rules="[(val) => val >= 0 || 'please enter  number']"
            />
            <q-input
              outlined
              dense
              class="col"
              color="primary"
              type="number"
              v-model="model.deaths"
              label="Deaths "
              :rules="[(val) => val >= 0 || 'please enter  number']"
            />
          </q-card-section>
          <q-card-section class="q-gutter-sm row q-pt-none">
            <q-input
              outlined
              dense
              class="col"
              color="primary"
              type="number"
              v-model="model.LW"
              label="LW"
              :rules="[(val) => val >= 0 || 'please enter  number']"
            />
            <q-input
              outlined
              dense
              class="col"
              color="primary"
              type="number"
              v-model="model.PG"
              label="PG"
              :rules="[(val) => val >= 0 || 'please enter  number']"
            />
            <q-input
              outlined
              dense
              class="col"
              color="primary"
              type="number"
              v-model="model.U5"
              label="U5"
              :rules="[(val) => val >= 0 || 'please enter  number']"
            />
          </q-card-section>
          <q-separator />

          <q-card-actions align="right" class="text-primary">
            <q-btn
              flat
              class="text-capitalize"
              label="cancel"
              v-on:click="clear"
              v-close-popup
            />
            <q-btn
              class="q-ml-sm text-capitalize"
              label="add"
              type="submit"
              color="primary"
            ></q-btn>
          </q-card-actions>
        </q-form>
      </q-card>
    </q-dialog>
  </div>
</template>
<script setup>
import { useQuasar } from "quasar";
import { ref, reactive, onMounted, watch } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

//Declarations
const $q = useQuasar();
const $store = useStore();
const $router = useRouter();
const emit = defineEmits(["create"]);
//Variables
const model = reactive({
  admin2: null,
  admin3: null,
  camps: [],
  HH: 0,
  deaths: 0,
  injuries: 0,
  LW: 0,
  PG: 0,
  U5: 0,
});
const isPwd = ref(true);
const confirm = ref("");
const addReportForm = ref(false);
//
const admin2s = reactive([]);
const admin3s = reactive([]);
//Mounted
onMounted(() => {
  getAdmin2s();
});
//Watch
watch(
  () => model.admin2,
  (value, prevValue) => {
    if (value != null) {
      model.admin3 = null;
      admin3s.splice(0, admin3s.length);
      getAdmin3s(value.admin2Pcode);
    }
  }
);
watch(
  () => model.admin3,
  (value, prevValue) => {
    if (value != null) {
    getLatest(value)
    }
  }
);
//Functions
const onSubmit = () => {
  emit("create", Object.assign({}, model));
clear();
  addReportForm.value = false;
};
const clear = () => {
  admin3s.splice(0, admin3s.length);
  model.admin2 = null;
  model.admin3 = null;
  model.camps = [];
  model.HH = 0;
  model.deaths = 0;
  model.injuries = 0;
  model.LW = 0;
  model.PG = 0;
  model.U5 = 0;
};

const getAdmin2s = async () => {
  $q.loading.show();
  await $store
    .dispatch("admin2/get")
    .then(
      (response) => {
        admin2s.push(...response);
      },
      (reason) => {
        $q.notify({
          type: "error",
          message: "Failed to load admin 2s",
          caption: !reason.message
            ? " you may be experiencing bad network "
            : reason.message,
        });
      }
    )
    .finally(() => {
      $q.loading.hide();
    });
};
const getLatest = async (data) => {
      $q.loading.show();
  await   $store
        .dispatch("report/getLatest", {
          admin2Pcode: data.admin2Pcode,
          admin3Pcode: data.admin3Pcode,
        })
        .then(
          (response) => {
            if (response[0] != undefined) {
              model.camps = response[0].camps;
              model.HH = Number(response[0].HH);
              model.deaths = Number(response[0].deaths);
              model.injuries = Number(response[0].injuries);
              model.LW = Number(response[0].LW);
              model.PG = Number(response[0].PG);
              model.U5 = Number(response[0].U5);
            }
          },
          (reason) => {
            $q.notify({
              type: "error",
              message: "Failed to load latest report in this District and TA",
              caption: !reason.message
                ? " you may be experiencing bad network "
                : reason.message,
            });
          }
        ).finally(() => {
        $q.loading.hide();
      });
};

const getAdmin3s = async (admin2Pcode) => {
  $q.loading.show();
  await $store
    .dispatch("admin3/getByAdmin2", admin2Pcode)
    .then(
      (response) => {
        admin3s.push(...response);
      },
      (reason) => {
        $q.notify({
          type: "error",
          message: "Failed to load admin 3s",
          caption: !reason.message
            ? " you may be experiencing bad network "
            : reason.message,
        });
      }
    )
    .finally(() => {
      $q.loading.hide();
    });
};
</script>