<template>
  <q-page class="bg-white q-pa-md">
    <div class="q-pa-md bg-grey-1">
      <q-breadcrumbs>
        <q-breadcrumbs-el label="Home" to="/admin/home" />
        <q-breadcrumbs-el label="Settings" />
      </q-breadcrumbs>
    </div>
    <q-separator class="q-mt-md q-mb-md" />
    <div class="col-grow bg-white q-pa-sm">
      <q-splitter v-model="splitterModel">
        <template v-slot:before>
          <q-tabs
            v-model="tab"
            vertical
            active-color="primary"
            indicator-color="primary"
            no-caps
            dense
            inline-label
            class="text-grey-8 shadow-2"
          >
            <q-tab
              style="justify-content: flex-start"
              class="text-capitalize text-weight-thin"
              name="profile"
              label="Profile"
            />
            <q-tab
              style="justify-content: flex-start"
              class="text-capitalize text-weight-thin"
              name="security"
              label="Security"
            />
            <q-tab
              style="justify-content: flex-start"
              class="text-capitalize text-weight-thin"
              name="logs"
              label="Logs"
            />
          </q-tabs>
        </template>

        <template v-slot:after>
          <q-tab-panels
            v-model="tab"
            animated
            swipeable
            vertical
            transition-prev="jump-up"
            transition-next="jump-up"
          >
            <q-tab-panel name="profile">
              <div class="text-h5 q-mb-md">Profile</div>
              <profile-page />
            </q-tab-panel>
            <q-tab-panel name="security">
              <div class="text-h5 q-mb-md">Security</div>
              <security-page />
            </q-tab-panel>
            <q-tab-panel name="logs">
              <div class="text-h5 q-mb-md">Logs</div>
              <logs-page />
            </q-tab-panel>
          </q-tab-panels>
        </template>
      </q-splitter>
    </div>
  </q-page>
</template>

<script setup>
import { useQuasar } from "quasar";
import { ref, reactive, onMounted } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import profilePage from "./profile.page.vue";
import securityPage from "./security.page.vue";
import logsPage from "./logs.page.vue";
//Declarations
const $q = useQuasar();
const $store = useStore();
const $router = useRouter();
//Variables
const tab = ref("profile");
const splitterModel = ref(10);
</script>