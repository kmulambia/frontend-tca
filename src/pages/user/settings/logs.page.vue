<template>
  <div class="">
    <q-table
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
          style="min-width: 150px"
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
        />
        <q-btn
          color="primary"
          icon="archive"
          label="Export to csv"
          @click="exportTable"
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
</template>

<script setup>
import { useQuasar, date, exportFile } from "quasar";
import { ref, reactive, onMounted, computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
//Declarations
const $q = useQuasar();
const $store = useStore();
const $router = useRouter();
//Variables
const rows = reactive([]);
const user = reactive($store.getters["session/getUser"]);
const pagination = reactive({
  sortBy: "desc",
  descending: false,
  rowsPerPage: 40,
});
const filter = ref("");
const visibleColumns = ref(["action", "user", "status", "created"]);
const columns = reactive([
  {
    name: "action",
    required: true,
    label: "Action",
    align: "left",
    field: "action",
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
    name: "status",
    label: "Status",
    align: "left",
    field: (row) => row.status,
    format: (val) => (val == true ? "Success" : "Fail"),
    sortable: true,
    classes: "text-capitalize",
    style: "width:300px",
  },
  {
    name: "metadata",
    label: "Meta",
    align: "left",
    field: (row) => row.metadata,
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
  getLogs();
});
//Functions
///Get User
const getLogs = async () => {
  $q.loading.show();
  await $store
    .dispatch("log/get", user.email)
    .then(
      (response) => {
        rows.length = 0; //empty array
        rows.push(...response);
      },
      (reason) => {
        $q.notify({
          type: "error",
          message: "Failed to load Logs",
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
    user.email + "-logs.csv",
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