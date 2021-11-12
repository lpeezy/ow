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
              @click="showProfile()"
              no-caps
            />
          </div>
          <div class="col">
            <q-btn
              flat
              style="background: #36393e; color: white; width: 100%; height: 100%; font-size: 20px"
              size="md"
              label="Players Stats"
              @click="showStats()"
              no-caps
            />
          </div>
        </div>
      </div>
      <!-- drawer content -->
    </q-drawer>

    <q-page-container>
      <div class="q-pa-md wrap" v-if="showProfiles">
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
                    {{ obj.qptime || "No data (profile set to private)" }}
                  </div>
                  <div class="text-subtitle2">
                    <b>Competative Hrs:</b>
                    {{ obj.comptime || "No data (profile set to private)" }}
                  </div>
                </div>
              </q-img>

              <q-card-section>
                <q-tabs v-model="tab" class="text-teal">
                  <q-tab
                    name="mails"
                    label="Quickplay"
                    style="color: #86009e"
                  />
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
                    <p
                      v-for="(value, name) in obj.stats.average.competitive"
                      v-bind:key="name"
                    >
                      <b>{{ value.title }}</b> : {{ value.value }}
                    </p>
                  </q-tab-panel>
                </q-tab-panels>
              </q-card-section>
            </q-card>
          </div>
        </div>
      </div>
      <div v-if="!showProfiles">
        <div class="q-pa-md">
          <q-list bordered class="rounded-borders">
            <q-expansion-item
              expand-separator
              icon="perm_identity"
              label="Assists"
              class="exp-panel"
              default-opened
            >
              <q-card style="background-color: #2E3135">
                <q-card-section>
                  <div class="q-pa-md exp-card">
                    <q-table
                      class="player-stats"
                      color="secondary"
                      title="Competitive"
                      :rows="cAssistsRows"
                      :rows-per-page-options="[10, 20]"
                      :columns="columns"
                      row-key="name"
                    />
                  </div>
                  <hr>
                  <div class="q-pa-md exp-card">
                    <q-table
                      class="player-stats"
                      color="secondary"
                      title="Quickplay"
                      :rows="qAssistsRows"
                      :rows-per-page-options="[10, 20]"
                      :columns="columns"
                      row-key="name"
                    />
                  </div>
                </q-card-section>
              </q-card>
            </q-expansion-item>

            <q-expansion-item
              expand-separator
              icon="signal_wifi_off"
              label="Wifi settings"
              class="exp-panel"
            >
              <q-card>
                <q-card-section>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Quidem, eius reprehenderit eos corrupti commodi magni quaerat
                  ex numquam, dolorum officiis modi facere maiores architecto
                  suscipit iste eveniet doloribus ullam aliquid.
                </q-card-section>
              </q-card>
            </q-expansion-item>

            <q-expansion-item
              expand-separator
              icon="drafts"
              label="Drafts"
              header-class="text-purple"
              class="exp-panel"
            >
              <q-card>
                <q-card-section>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Quidem, eius reprehenderit eos corrupti commodi magni quaerat
                  ex numquam, dolorum officiis modi facere maiores architecto
                  suscipit iste eveniet doloribus ullam aliquid.
                </q-card-section>
              </q-card>
            </q-expansion-item>

            <q-expansion-item icon="assessment" label="Disabled" disable>
              <q-card>
                <q-card-section>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Quidem, eius reprehenderit eos corrupti commodi magni quaerat
                  ex numquam, dolorum officiis modi facere maiores architecto
                  suscipit iste eveniet doloribus ullam aliquid.
                </q-card-section>
              </q-card>
            </q-expansion-item>
          </q-list>
        </div>
      </div>
    </q-page-container>
  </q-layout>
</template>

<script>
import { ref } from "vue";

const columns = [
  {
    name: "player",
    required: true,
    label: "Player",
    align: "left",
    field: (row) => row.name,
    format: (val) => `${val}`,
  },
  {
    name: "Defensive Assists",
    align: "center",
    label: "Defensive Assists",
    field: "dassist",
    sortable: true,
  },
  {
    name: "Healing Done",
    label: "Healing Done",
    field: "hdone",
    sortable: true,
  },
  { name: "Offensive Assists", label: "Offensive Assists", field: "oassist", sortable: true, },
  { name: "Recon Assists", label: "Recon Assists", field: "rassist", sortable: true, },
];

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
      showProfiles: true,
      apiStatus: false,
      data: [],
      cassists: [],
      qassists: [],
      columns,
      cAssistsRows: [],
      qAssistsRows: [],
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
        .then(this.queryStats());
    },
    showProfile() {
      this.showProfiles = true;
    },
    showStats() {
      this.showProfiles = false;
    },
    queryStats() {
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
                  if (this.data.length === 7) {
                    this.buildTableData();
                  }
                });
            });
        }
        console.log(this.data);
      }
    },
    buildTableData() {
      for (const obj in this.data) {
        let cAssistObj = {};
        let qpAssistObj = {};

        cAssistObj.name = this.data[obj].username;
        qpAssistObj.name = this.data[obj].username;

        let compStats = this.data[obj].stats.assists.competitive;
        let qpStats = this.data[obj].stats.assists.quickplay;
        for (const cobj in compStats) {
          if (compStats[cobj].title === "Defensive Assists") {
            let pointNum = parseFloat(compStats[cobj].value);
            cAssistObj.dassist = pointNum;
          }
          if (compStats[cobj].title === "Offensive Assists") {
            let pointNum = parseFloat(compStats[cobj].value);
            cAssistObj.oassist = pointNum;
          }
          if (compStats[cobj].title === "Healing Done") {
            let pointNum = parseFloat(compStats[cobj].value);
            cAssistObj.hdone = pointNum;
          }
          if (compStats[cobj].title === "Recon Assists") {
            let pointNum = parseFloat(compStats[cobj].value);
            cAssistObj.rassist = pointNum;
          }
        }
        this.cassists.push(cAssistObj);
        for (const qobj in qpStats) {
          if (qpStats[qobj].title === "Defensive Assists") {
            let pointNum = parseFloat(qpStats[qobj].value);
            qpAssistObj.dassist = pointNum;
          }
          if (qpStats[qobj].title === "Offensive Assists") {
            let pointNum = parseFloat(qpStats[qobj].value);
            qpAssistObj.oassist = pointNum;
          }
          if (qpStats[qobj].title === "Healing Done") {
            let pointNum = parseFloat(qpStats[qobj].value);
            qpAssistObj.hdone = pointNum;
          }
          if (qpStats[qobj].title === "Recon Assists") {
            let pointNum = parseFloat(qpStats[qobj].value);
            qpAssistObj.rassist = pointNum;
          }
        }
        this.qassists.push(qpAssistObj);
        
      }
      
      console.log(this.qassists)
      this.qAssistsRows = this.qassists;
      this.cAssistsRows = this.cassists;
      console.log(this.cAssistsRows)
    },
  },
};
</script>
