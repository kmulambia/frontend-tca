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
     <q-separator class="q-mt-md q-mb-md" />
      <q-table 
        dense
        flat
        :rows="rows"
        :columns="columns"
        color="primary"
        row-key="id"
        :visible-columns="visibleColumns2"
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
const visibleColumns2 = ref([
  "district",
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
    field: (row) => row.camps,
    format: (val) => val.join(", "),
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
          ...new Map(
            district.map((item) => [item["admin2Pcode"], item])
          ).values()
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
.my-card
  width: 100%
  max-width: 45%
</style>
