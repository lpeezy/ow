<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated class="bg-primary text-white" height-hint="98">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />

        <q-toolbar-title>
          Title
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer
      show-if-above
      v-model="leftDrawerOpen"
      side="left"
      style="background-color: #36393e;"
    >
      <div class="q-pa-md">
        <div class="column" style="height: 100px">
          <div class="col">
            <q-btn
              flat
              style="background: #36393e; color: white; width: 100%; height: 100%; font-size: 20px"
              size="md"
              label="Player Profiles"
              no-caps
              @click="queryProfile"
            />
          </div>
          <div class="col">
            <q-btn
              flat
              style="background: #36393e; color: white; width: 100%; height: 100%; font-size: 20px"
              size="md"
              label="Players Stats"
              no-caps
            />
          </div>
        </div>
      </div>
      <!-- drawer content -->
    </q-drawer>

    <q-page-container>
      <div class="q-pa-md wrap">
        <div class="row">
          <div
            class="col-2"
            id="cards"
            v-for="obj in data"
            v-bind:key="obj"
            style="padding: 10px;"
          >
            <q-card class="card">
              <q-img v-bind:src="obj.portrait">
                <div class="absolute-bottom text-h6">
                  <div class="text-h6">{{ obj.username }}</div>
                  <div class="text-subtitle2">
                    <b>Level:</b> {{ obj.level }}
                  </div>
                  <div class="text-subtitle2">
                    <b>Quickplay Hrs:</b>
                    {{ obj.qptime || "No data (private profile)" }}
                  </div>
                  <div class="text-subtitle2">
                    <b>Competative Hrs:</b>
                    {{ obj.comptime || "No data (private profile)" }}
                  </div>
                </div>
              </q-img>

              <q-card-section>
                <q-tabs v-model="tab" class="text-teal">
                  <q-tab name="mails" label="Quickplay" style="color: #86009e" />
                  <q-tab name="comp" label="Competive" style="color: #86009e" />
                </q-tabs>
                <q-separator />
                <q-tab-panels v-model="tab" animated>
          <q-tab-panel name="mails">
            <div class="text-h6">Mails</div>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </q-tab-panel>

          <q-tab-panel name="comp">
            <div class="text-h6">Alarms</div>
            <p v-for="(value, name) in obj.stats.average.competitive" v-bind:key="name"><b>{{ value.title }}</b> : {{ value.value }}</p>
          </q-tab-panel>
          </q-tab-panels>
              </q-card-section>
            </q-card>
          </div>
        </div>
      </div>
    </q-page-container>
  </q-layout>
</template>

<script>
import { ref } from "vue";

export default {
  setup() {
    const leftDrawerOpen = ref(false);

    return {
      tab: ref("mails"),
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
    };
  },
  data() {
    return {
      apiStatus: false,
      profileData: [],
      data: [],
      userNames: [
        "BoX-1206",
        "Lpeezydos-1106",
        "hightower-1866",
        "Phishmo-1744",
        "Notseba-1773",
        "sonnywoah-1741",
        "Chronos-1929",
      ],
    };
  },

  // runs before dom loads
  mounted() {
    this.checkAPIStatus();
  },
  methods: {
    // checking to see if the API is still running
    checkAPIStatus() {
      fetch("https://owapi.io/")
        .then((response) => response.json())
        .then((this.apiStatus = true))
        .then(this.queryProfile());
    },
    queryStats() {
      // checking that the API is reachable before querying
      /* if (this.apiStatus === true){

      } */
    },
    queryProfile() {
      // checking that the API is reachable before querying
      if (this.apiStatus === true) {
        for (const user in this.userNames) {
          // fetching profile data
          fetch("https://owapi.io/profile/pc/us/" + this.userNames[user])
            .then((response) => response.json())
            .then((data) => {
              let compplaytime = data.playtime.competitive;
              let quickplaytime = data.playtime.quickplay;
              // fetching stats data
              fetch("https://owapi.io/stats/pc/us/" + this.userNames[user])
                .then((response) => response.json())
                .then((data2) => {
                  data2.qptime = quickplaytime;
                  data2.comptime = compplaytime;
                  this.data.push(data2);
                });
            });
        }
        console.log(this.data);
      }
    },
  },
};
</script>
