<template>
  <q-page class="flex flex-center bg-grey-2">
    <q-card class="column" style="width: 500px; max-width: 70vw">
      <q-card-section class="col flex-center flex q-pt-xl column">
        <img
          alt="Quasar logo"
          src="~assets/undp-logo.png"
          style="width: 100px; height: auto"
        />
      </q-card-section>
      <q-card-section class="col self-center q-pt-none">
        <div class="text-h6 text-grey-9 text-capitalize text-center">
          {{ system.name }} &#8482;
          <small class="text-caption">v-{{ system.version }}</small>
        </div>
      </q-card-section>
      <q-card-section
        class="col self-center q-pt-none text-subtitle1 text-grey-7 text-center"
      >
        A project, designed and developed by <br/>
        <span class="text-capitalize text-weight-bold"> UNDP IM MALAWI </span>
      </q-card-section>
      <!-- <q-card-section class="col self-center q-pt-none q-gutter-sm">
        <q-btn round outline dense color="primary" icon="mdi-facebook" type="a" href="https://web.facebook.com/profile.php?id=100015551791902" target="_blank" />
        <q-btn round outline dense color="green" icon="mdi-whatsapp" type="a" href="https://wa.me/qr/XQL42V4EIBUFG1" target="_blank" />
        <q-btn round outline dense color="red" icon="mdi-gmail"  type="a" href="mailto:mulambiakaponda@gmail.com?subject=Get%20In%20Touch&body=Hie%0D%0A" target="_blank" />
        <q-btn round outline dense color="primary" icon="mdi-linkedin"  type="a" href="https://www.linkedin.com/in/kaponda-mulambia-357755105/" target="_blank"  />
      </q-card-section> -->
    </q-card>
  </q-page>
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
const system = reactive({
  name: process.env.NAME,
  short: process.env.SHORT_NAME,
  version: process.env.VERSION,
});
</script>
