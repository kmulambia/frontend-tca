<template>
  <q-layout view="lHh Lpr lFf" class="bg-white">
    <q-header elevated class="bg-white text-grey-8 q-py-xs">
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />
        <img
          alt="Logo"
          src="~assets/amp-logo.png"
          height="25px"
          class="q-ml-xs"
        />
        <q-toolbar-title shrink class="text-weight-bold text-weight-thin"
          >{{ system.name
          }}<small class="text-caption">
            v-{{ system.version }}</small
          ></q-toolbar-title
        >
        <q-space />
        <div class="q-pa-none row q-gutter-sm">
          <!-- <q-select
            v-model="$i18n.locale"
            option-value="id"
            filled
            option-label="name"
            emit-value
            map-options
            style="width: 200px"
            :options="[
              { id: 'en-US', name: 'English' },
              { id: 'ny', name: 'Chichewa' },
            ]"
            ><template v-slot:prepend>
              <q-icon name="g_translate" />
            </template>
          </q-select> -->
          <q-item clickable v-ripple class="">
            <q-item-section class="text-right">
              <q-item-label class="text-capitalize"
                >Admin : {{ user.name }}</q-item-label
              >
              <q-item-label class="text-lowercase" caption>
                {{ user.email }}</q-item-label
              >
            </q-item-section>
            <q-menu auto-close fit anchor="bottom middle" self="top middle">
              <q-list dense style="min-width: 100%" class="text-left">
                <q-item @click="onSignout()" clickable>
                  <!-- <q-item-section avatar>
                    <q-icon  name="logout" />
                  </q-item-section> -->
                  <q-item-section
                    ><q-item-label class=""
                      >Signout</q-item-label
                    ></q-item-section
                  >
                </q-item>
              </q-list>
            </q-menu>
          </q-item>
        </div>
      </q-toolbar>
    </q-header>
    <q-drawer v-model="leftDrawerOpen" show-if-above bordered class="bg-grey-1">
      <q-list>
        <q-item-label header class="text-grey-8"> Modules </q-item-label>
        <q-item
          clickable
          v-for="link in links"
          :key="link.title"
          :to="link.path"
        >
          <q-item-section v-if="link.icon" avatar>
            <q-icon :name="link.icon" />
          </q-item-section>
          <q-item-section>
            <q-item-label class="text-capitalize">{{
              link.title
            }}</q-item-label>
            <!-- <q-item-label caption>
              {{ link.caption }}
            </q-item-label> -->
          </q-item-section>
        </q-item>
        <q-separator spaced inset />
        <q-item
          clickable
          v-for="option in options"
          :key="option.title"
          :to="'/' + role.name + option.path"
        >
          <q-item-section v-if="option.icon" avatar>
            <q-icon :name="option.icon" />
          </q-item-section>

          <q-item-section>
            <q-item-label class="text-capitalize">{{
              option.title
            }}</q-item-label>
            <!-- <q-item-label caption>
              {{ option.caption }}
            </q-item-label> -->
          </q-item-section>
        </q-item>
        <q-separator spaced inset />
        <q-item>
          <q-item-section top>
            <q-item-label class="text-center" caption lines="2">
              &copy; {{ system.name }} &trade; {{ year }}
            </q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { useQuasar, date } from "quasar";
import { ref, reactive, onMounted, computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
//Declarations
const $q = useQuasar();
const $store = useStore();
const $router = useRouter();
//Variables
const user = reactive($store.getters["session/getUser"]);
const role = reactive($store.getters["session/getRole"]);
var year = date.formatDate(Date.now(), "YYYY");
const links = reactive(
  computed({
    get: () => $store.state.navigation.user,
  })
);

// const getTodos = () => $store.dispatch("todo/get");

// function addTodo(todo) {
//   $store.dispatch("todo/create", todo);
// }

//addTodo({name:"kaponda mulambia"})

const options = reactive(
  computed({
    get: () => $store.state.navigation.options,
  })
);
const system = reactive({
  name: process.env.NAME,
  short: process.env.SHORT_NAME,
  version: process.env.VERSION,
});

const leftDrawerOpen = ref(true);
//Functions
function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}
function onSignout() {
  $q.loading.show();
  $store
    .dispatch("session/signout")
    .then(
      () => {},
      (reason) => {}
    )
    .finally(() => {
      $q.loading.hide();
      // redirect
      $router.push({ path: "/" });
    });
}
</script>
