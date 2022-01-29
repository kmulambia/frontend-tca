
<template>
  <q-page class="bg-white q-pa-md">
    <div class="q-pa-md bg-grey-1">
      <q-breadcrumbs class="text-capitalize">
        <q-breadcrumbs-el label="Home" to="/admin/home" />
        <q-breadcrumbs-el label="Users" to="/admin/users" />
        <q-breadcrumbs-el label="Edit" />
      </q-breadcrumbs>
    </div>
    <q-separator class="q-mt-md q-mb-md" />
    <div class="flex flex-center">
      <q-card flat bordered style="width: 500px; max-width: 80vw">
        <q-form @submit.prevent="updateUser">
          <q-card-section class="bg-grey-2 text-primary">
            <div class="text-h6 text-capitalize">edit user</div>
          </q-card-section>
          <q-separator />
          <q-card-section class="q-gutter-sm">
            <q-select
              class="text-uppercase"
              label="Role"
              hint=" "
              bg-color="white"
              v-model="model.role"
              :options="roles"
              :option-value="(opt) => opt"
              :option-label="(opt) => opt.name"
              :rules="[
                (val) =>
                  (val !== null && val !== '') || 'You must make selection',
              ]"
              stack-label
              outlined
              dense
              lazy-rules
            />
            <q-input
              outlined
              dense
              color="primary"
              class=""
              hint=" "
              v-model="model.name"
              label="Name"
              stack-label
              :rules="[
                (val) => (val && val.length > 0) || 'please enter valid name',
              ]"
            />
            <q-input
              outlined
              dense
              class=""
              color="primary"
              v-model="model.phone"
              label="Mobile "
              mask="(###) ### - ####"
              unmasked-value
              hint="Example : (099) 123 4567 / (088) 123 4567"
              :rules="[
                (val) =>
                  (val && val.length > 0) || 'please enter valid phone number',
              ]"
            />

            <q-input
              outlined
              dense
              stack-label
              class=""
              color="primary"
              type="email"
              v-model="model.email"
              label="Email *"
              hint=" "
              lazy-rules
              :rules="[
                (val) => (val && val.length > 0) || 'please enter valid email',
              ]"
            />
            <div class="q-mb-xs">
              <q-toggle
                class="q-pb-md q-pa-sm"
                left-label
                v-model="model.status"
                label="Status"
                checked-icon="check"
                unchecked-icon="clear"
              />
            </div>
          </q-card-section>
          <q-separator />

          <q-card-actions align="right" class="text-primary">
            <q-btn
              class="q-ml-sm text-capitalize"
              label="update"
              type="submit"
              color="primary"
            ></q-btn>
          </q-card-actions>
        </q-form>
      </q-card>
    </div>
  </q-page>
</template>
<script setup>
import { useQuasar } from "quasar";
import { ref, reactive, onMounted } from "vue";
import { useStore } from "vuex";
import { useRouter, useRoute } from "vue-router";
//Declarations
const $q = useQuasar();
const $store = useStore();
const $router = useRouter();
const $route = useRoute();
//Variables
const id = ref(null);
const roles = reactive([]);
const model = ref({
  name: "",
  phone: "",
  email: "",
  status: false,
  role: null,
  roleId: "",
});
//Mounted
onMounted(() => {
  id.value = $route.params.id;
  getUsers();
  getRoles();
});
//Functions
///Get User
const getUsers = async () => {
  $q.loading.show();
  await $store
    .dispatch("user/get", id.value)
    .then(
      (response) => {
        model.value = response;
      },
      (reason) => {
        $q.notify({
          type: "error",
          message: "Failed to load User",
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
//Update User
async function updateUser() {
  let item =Object.assign({},model.value)  ;
  $q.loading.show();
  /***/
  item.roleId = item.role.id;
  delete item.role;
  /***/
  await $store
    .dispatch("user/update", item)
    .then(
      (response) => {
        $q.notify({
          type: "success",
          message: "Succesfully updated User ",
        });
      },
      (reason) => {
        $q.notify({
          type: "error",
          message: "Failed to update User",
          caption: !reason.message
            ? " you may be experiencing bad network "
            : reason.message,
        });
      }
    )
    .finally(() => {
      $q.loading.hide();
    });
}
//Get Roles
const getRoles = async () => {
  $q.loading.show();
  await $store
    .dispatch("role/get")
    .then(
      (response) => {
        roles.push(...response);
      },
      (reason) => {
        $q.notify({
          type: "error",
          message: "Failed to load roles",
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
