<template>
  <q-page class="bg-white q-pa-md">
    <div class="q-pa-md bg-grey-1">
      <q-breadcrumbs class="text-capitalize">
        <q-breadcrumbs-el label="Home" to="/admin/home" />
        <q-breadcrumbs-el label="Users" />
      </q-breadcrumbs>
    </div>
    <q-separator class="q-mt-md q-mb-md" />
    <q-table
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
        <h5 class="text-capitalize">Users</h5>
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
        <create-user-form v-on:create="createUser" class="q-ma-xs" />
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
          <q-th class="text-right">Options</q-th>
        </q-tr>
      </template>
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td v-for="col in props.cols" :key="col.name" :props="props">
            {{ col.value }}
          </q-td>
          <q-td class="text-right">
            <q-btn
              class="q-ma-xs text-capitalize"
              dense
              flat
              no-caps
              color="primary"
              label="edit"
              size="xs"
              :to="'/admin/users/edit/' + props.row.id"
              icon="edit"
            >
              <q-tooltip>edit user</q-tooltip>
            </q-btn>
            <q-btn
              class="q-ma-xs text-capitalize"
              dense
              flat
              no-caps
              color="primary"
              :to="'/admin/users/logs/' + props.row.id"
              label="logs"
              size="xs"
              icon="view_list"
            >
              <q-tooltip>view user logs</q-tooltip>
            </q-btn>
            <q-btn
              class="q-ma-xs text-capitalize"
              dense
              flat
              no-caps
              color="primary"
              v-on:click="recoverUser(props.row.id)"
              label="recover"
              size="xs"
              icon="published_with_changes"
            >
              <q-tooltip>recover user credentials</q-tooltip>
            </q-btn>
            <q-btn
              class="q-ma-xs text-capitalize"
              dense
              flat
              no-caps
              color="primary"
              v-on:click="removeUser(props.row.id)"
              label="delete"
              size="xs"
              icon="delete"
            >
              <q-tooltip>delete user</q-tooltip>
            </q-btn>
          </q-td>
        </q-tr>
      </template>
    </q-table>
  </q-page>
</template>
<script setup>
import { useQuasar } from "quasar";
import { ref, reactive, onMounted } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import createUserForm from "src/components/user-form.component.vue";
//Declarations
const $q = useQuasar();
const $store = useStore();
const $router = useRouter();
//Variables
const rows = reactive([]);
const pagination = reactive({
  sortBy: "desc",
  descending: false,
  rowsPerPage: 20,
});
const filter = ref("");
const visibleColumns = ref(["name", "role", "status"]);
const columns = reactive([
  {
    name: "name",
    required: true,
    label: "Name",
    align: "left",
    field: "name",
    sortable: true,
    classes: "text-capitalize",
  },
  {
    name: "email",
    label: "Email",
    align: "left",
    field: "email",
    sortable: true,
  },
  {
    name: "phone",
    label: "Phone",
    align: "left",
    field: "phone",
    sortable: true,
  },
  {
    name: "role",
    label: "Role",
    align: "left",
    field: (row) => row.role.name,
    format: (val) => `${val}`,
    sortable: true,
    classes: "text-uppercase",
  },
  {
    name: "status",
    label: "Status",
    align: "center",
    field: (row) => row.status,
    format: (val) => (val == true ? "Active" : "Inactive"),
    sortable: true,
    classes: "text-capitalize",
  },
]);
//Mounted
onMounted(() => {
  getUsers();
});
//Functions
///Get User
const getUsers = async () => {
  $q.loading.show();
  await $store
    .dispatch("user/get")
    .then(
      (response) => {
        rows.length = 0; //empty array
        rows.push(...response);
      },
      (reason) => {
        $q.notify({
          type: "error",
          message: "Failed to load Users",
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
///Create User
async function createUser(item) {
  $q.loading.show();
  /***/
  item.roleId = item.role.id;
  delete item.role;
  /***/
  await $store
    .dispatch("user/create", item)
    .then(
      (response) => {
        $q.notify({
          type: "success",
          message: "Succesfully created User ",
          caption: "email has been sent with Login Credentials",
        });
      },
      (reason) => {
        $q.notify({
          type: "error",
          message: "Failed to create User",
          caption: !reason.message
            ? " you may be experiencing bad network "
            : reason.message,
        });
      }
    )
    .finally(() => {
      $q.loading.hide();
      getUsers();
    });
}
///Recover User
async function recoverUser(id) {
  let code = Math.floor(Math.random() * (9999 - 1000 + 1) + 1000);
  $q.dialog({
    title: "Remove user",
    message:
      "To proceed removing User credentials enter the code '" + code + "'",
    prompt: {
      model: "",
      isValid: (val) => val == code,
      type: "text",
    },
    cancel: true,
    persistent: true,
  })
    .onOk((data) => {
      $q.loading.show();
      $store
        .dispatch("user/recover", id)
        .then(
          () => {
            $q.notify({
              type: "success",
              message: `Successfully recovered User credentials`,
              caption: "email sent to user with recovered credentials",
            });
          },
          (reason) => {
            $q.notify({
              type: "error",
              message: "Failed to recover User credentials",
              caption: !reason.message
                ? "potential network error"
                : reason.message,
            });
          }
        )
        .finally(() => {
          getUsers();
        });
    })
    .onCancel(() => {});
}
///Remove User
async function removeUser(id) {
  let code = Math.floor(Math.random() * (9999 - 1000 + 1) + 1000);
  $q.dialog({
    title: "Recover user",
    message:
      "To proceed recovering User account password enter the code '" +
      code +
      "'",
    prompt: {
      model: "",
      isValid: (val) => val == code,
      type: "text",
    },
    cancel: true,
    persistent: true,
  })
    .onOk((data) => {
      $q.loading.show();
      $store
        .dispatch("user/remove", id)
        .then(
          () => {
            $q.notify({
              type: "success",
              message: `Successfully removed User`,
            });
          },
          (reason) => {
            $q.notify({
              type: "error",
              message: "Failed to remove User",
              caption: !reason.message
                ? "potential network error"
                : reason.message,
            });
          }
        )
        .finally(() => {
          getUsers();
        });
    })
    .onCancel(() => {});
}
</script>
