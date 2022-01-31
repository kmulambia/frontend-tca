<template>
  <q-page class="row q-gutter-sm q-pa-md bg-grey-3" :key="refresh">
    <q-card
      flat
      bordered
      class="my-card"
      v-for="admin2 in admin2s"
      :key="admin2.id"
    >
      <q-card-section>
        <div class="text-h6">{{ admin2.admin2Name_en }}</div>
      </q-card-section>

      <q-separator inset />
      <q-card-section class="q-pt-none">
        <q-table
          flat
          dense
          hide-bottom
          :rows="getReportsByAdmin2(admin2.admin2Pcode)"
          :columns="columns"
          :visible-columns="visibleColumns"
          row-key="id"
        />
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup>
import { useQuasar, date, exportFile } from "quasar";
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
const refresh = ref(null);
const user = reactive($store.getters["session/getUser"]);
const rows = reactive([]);
const admin2s = reactive([]);
const pagination = reactive({
  sortBy: "desc",
  descending: false,
  rowsPerPage: 40,
});
const filter = ref("");
const visibleColumns = ref([
  "ta",
  "camps",
  "hh",
  "injuries",
  "deaths",
  "LW",
  "PG",
  "U5",
]);
const columns = reactive([
  {
    name: "district",
    label: "District",
    align: "left",
    field: "admin2Name_en",
    sortable: true,
    classes: "text-uppercase",
    style: "width:50px",
  },
  {
    name: "ta",
    label: "TA",
    align: "left",
    field: "admin3Name_en",
    sortable: true,
    classes: "text-uppercase",
    style: "width:50px",
  },

  {
    name: "camps",
    label: "Camps",
    align: "left",
    field: "camps",
    sortable: true,
    classes: "text-capitalize",
    style: "width:50px",
  },

  {
    name: "hh",
    label: "HH",
    align: "left",
    field: "HH",
    sortable: true,
    classes: "text-uppercase",
    style: "width:20px",
  },
  {
    name: "injuries",
    required: true,
    label: "Injuries",
    align: "left",
    field: "injuries",
    sortable: true,
    classes: "text-uppercase",
    style: "width:20px",
  },
  {
    name: "deaths",
    required: true,
    label: "Deaths",
    align: "left",
    field: "deaths",
    sortable: true,
    classes: "text-uppercase",
    style: "width:20px",
  },
  {
    name: "pg",
    required: true,
    label: "PG",
    align: "left",
    field: "PG",
    sortable: true,
    classes: "text-uppercase",
    style: "width:20px",
  },
  {
    name: "lw",
    required: true,
    label: "LW",
    align: "left",
    field: "LW",
    sortable: true,
    classes: "text-uppercase",
    style: "width:20px",
  },
  {
    name: "u5",
    required: true,
    label: "U5",
    align: "left",
    field: "U5",
    sortable: true,
    classes: "text-uppercase",
    style: "width:20px",
  },
  {
    name: "created",
    label: "Created On",
    align: "right",
    field: (row) => row.created,
    format: (val) => date.formatDate(val, "DD-MM-YYYY HH:mm:ss"),
    sortable: true,
    classes: "text-capitalize",
  },
]);
//Mounted
onMounted(() => {
  id.value = $route.params.id;
  getMyReports();
});
//Functions
//GetReports
const getMyReports = async (userId) => {
  $q.loading.show();
  await $store
    .dispatch("report/getComplete")
    .then(
      (response) => {
        rows.push(...response);
        console.log(rows);
        let district = rows.map((a) => {
          return { admin2Pcode: a.admin2Pcode, admin2Name_en: a.admin2Name_en };
        });
        admin2s.push(
          ...new Map(district.map((item) => [item['admin2Pcode'], item])).values()
        );
        refresh.value = Math.random();
      },
      (reason) => {
        $q.notify({
          type: "error",
          message: "Failed to load my Reports",
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
//Admin2s
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

//GetByDistrict
const getReportsByAdmin2 = (admin2Pcode) => {
  return rows.filter((item) => {
    return item.admin2Pcode === admin2Pcode;
  });
};
</script>
<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: 40%
</style>
