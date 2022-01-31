
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
                  >&nbsp; {{ rows.length }}
                </span>
              </div>
            </q-card-section>
          </q-card>
        </q-card-section>
        <q-card-section class="q-gutter-sm row">
          <create-report-form v-on:create="createReport" class="q-ma-xs" />
        </q-card-section>
      </q-card>
      <q-separator class="q-mt-md q-mb-md" />
      <q-table
      style="width: 800px; max-width: 80vw"
        dense
        flat
        :rows="rows"
        :columns="columns"
        color="primary"
        row-key="id"
        :visible-columns="visibleColumns"
        :filter="filter"
        :pagination="pagination"
      >
        <template v-slot:top-left>
          <span class="text-capitalize">Recent updates</span>
        </template>
        <template v-slot:top-right="props">
          <q-select
            class="q-ma-xs"
            v-model="visibleColumns"
            multiple
            outlined
            dense
            options-dense
            :display-value="$q.lang.table.columns"
            emit-value
            map-options
            :options="columns"
            option-value="name"
            options-cover
            style="min-width: 100px"
          />
          <q-input
            class="q-ma-xs"
            outlined
            dense
            debounce="300"
            v-model="filter"
            placeholder="Search"
          >
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>
          <q-btn
            class="q-ma-xs"
            color="primary"
            :icon="props.inFullscreen ? 'fullscreen_exit' : 'fullscreen'"
            :label="props.inFullscreen ? 'exit fullscreen' : 'enter fullscreen'"
            @click="props.toggleFullscreen"
              style="min-width: 100px"
          />
          <q-btn
            color="primary"
            icon="archive"
            label="Export to csv"
            @click="exportTable"
              style="min-width: 100px"
          />
        </template>
        <template v-slot:header="props">
          <q-tr :props="props">
            <q-th
              class="text-capitalize"
              v-for="col in props.cols"
              :key="col.name"
              :props="props"
              >{{ col.label }}</q-th
            >
          </q-tr>
        </template>
        <template v-slot:body="props">
          <q-tr :props="props">
            <q-td v-for="col in props.cols" :key="col.name" :props="props">
              {{ col.value }}
            </q-td>
          </q-tr>
        </template>
      </q-table>
    </div>
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
const model = ref({});
const user = reactive($store.getters["session/getUser"]);
const rows = reactive([]);
const pagination = reactive({
  sortBy: "desc",
  descending: false,
  rowsPerPage: 40,
});
const filter = ref("");
const visibleColumns = ref(["district","ta", "hh","injuries","deaths","lw","pg","u5", "created"]);
const columns = reactive([
  {
    name: "district",
    required: true,
    label: "District",
    align: "left",
    field: "admin2Name_en",
    sortable: true,
    classes: "text-uppercase",
  },
   {
    name: "ta",
    required: true,
    label: "TA",
    align: "left",
    field: "admin3Name_en",
    sortable: true,
    classes: "text-uppercase",
  },

 {
    name: "hh",
    required: true,
    label: "HH",
    align: "left",
    field: "HH",
    sortable: true,
    classes: "text-uppercase",
  },
  {
    name: "injuries",
    required: true,
    label: "Injuries",
    align: "left",
    field: "injuries",
    sortable: true,
    classes: "text-uppercase",
  },
  {
    name: "deaths",
    required: true,
    label: "Deaths",
    align: "left",
    field: "deaths",
    sortable: true,
    classes: "text-uppercase",
  },
  {
    name: "pg",
    required: true,
    label: "PG",
    align: "left",
    field: "PG",
    sortable: true,
    classes: "text-uppercase",
  },
  {
    name: "lw",
    required: true,
    label: "LW",
    align: "left",
    field: "LW",
    sortable: true,
    classes: "text-uppercase",
  },
  {
    name: "u5",
    required: true,
    label: "U5",
    align: "left",
    field: "U5",
    sortable: true,
    classes: "text-uppercase",
  },
  {
    name: "user",
    label: "User",
    align: "left",
    field: (row) => row.user.name + "(" + row.user.email + ")",
    sortable: true,
    classes: "text-capitalize",
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
  getMyReports(user.id);
});
//Functions
///Create User
async function createReport(item) {
  //userId
  item.userId = user.id;
  //admin2
  item.admin2Pcode = item.admin2.admin2Pcode;
  item.admin2Name_en = item.admin2.admin2Name_en;
  delete item.admin2;
  //admin3
  item.admin3Pcode = item.admin3.admin3Pcode;
  item.admin3Name_en = item.admin3.admin3Name_en;
  delete item.admin3;
  //Cast to number
  item.HH = Number(item.HH);
  item.deaths = Number(item.deaths);
  item.injuries = Number(item.injuries);
  item.LW = Number(item.LW);
  item.PG = Number(item.PG);
  item.U5 = Number(item.U5);
  /***/
  //Confirm
  $q.dialog({
    title: "Confirm new Values",
    message:
      "Camps= " +
      item.camps +
      "<br/> HH = " +
      item.HH +
      "<br/> Deaths=" +
      item.deaths +
      "<br/> Injuries=" +
      item.injuries +
      "<br/> LW=" +
      item.LW +
      "<br/> PG=" +
      item.PG +
      "<br/> U5=" +
      item.U5,
    cancel: true,
    html: true,
    persistent: true,
  }).onOk(() => {
    $q.loading.show();
    $store
      .dispatch("report/create", item)
      .then(
        (response) => {
          $q.notify({
            type: "success",
            message: "Succesfully created Report ",
          });
        },
        (reason) => {
          $q.notify({
            type: "error",
            message: "Failed to create Report",
            caption: !reason.message
              ? " you may be experiencing bad network "
              : reason.message,
          });
        }
      )
      .finally(() => {
        $q.loading.hide();
      });
  });
}
const getMyReports = async (userId) => {
  $q.loading.show();
  await $store
    .dispatch("report/getMyReports", userId)
    .then(
      (response) => {
        rows.push(...response);
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
//Export Table
function exportTable() {
  // naive encoding to csv format
  const content = [columns.map((col) => wrapCsvValue(col.label))]
    .concat(
      rows.map((row) =>
        columns
          .map((col) =>
            wrapCsvValue(
              typeof col.field === "function"
                ? col.field(row)
                : row[col.field === void 0 ? col.name : col.field],
              col.format
            )
          )
          .join(",")
      )
    )
    .join("\r\n");

  const status = exportFile(
    user.email + "-reports.csv",
    content,
    "text/csv"
  );

  if (status !== true) {
    $q.notify({
      message: "Browser denied file download...",
      color: "negative",
      icon: "warning",
    });
  }
}
function wrapCsvValue(val, formatFn) {
  let formatted = formatFn !== void 0 ? formatFn(val) : val;

  formatted =
    formatted === void 0 || formatted === null ? "" : String(formatted);

  formatted = formatted.split('"').join('""');
  /**
   * Excel accepts \n and \r in strings, but some other CSV parsers do not
   * Uncomment the next two lines to escape new lines
   */
  // .split('\n').join('\\n')
  // .split('\r').join('\\r')

  return `"${formatted}"`;
}
</script>
<style lang="sass" scoped>
.point-card
  width: 100%
</style>

