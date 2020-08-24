<template>
  <div class="home">
    <div style="margin-top:20px">
      <div>
        <b-card-group deck>
          <b-card border-variant="light" text-variant="dark">
            <b-card-text>
              <b-row>
                <b-col lg="6">
                  <b-form-group
                    label="Class"
                    label-cols-sm="3"
                    label-align-sm="right"
                    label-size="sm"
                    label-for="sortBySelect1"
                    class="mb-0"
                  >
                    <b-input-group size="sm">
                      <b-form-select v-model="filter" :options="class1Options" class="w-75">
                        <template v-slot:first></template>
                      </b-form-select>
                    </b-input-group>
                  </b-form-group>
                </b-col>
                <b-col lg="6">
                  <b-form-group
                    label="Subject"
                    label-cols-sm="3"
                    label-align-sm="right"
                    label-size="sm"
                    label-for="sortBySelect2"
                    class="mb-0"
                  >
                    <b-input-group size="sm">
                      <b-form-select v-model="filter" id :options="subjectOptions" class="w-75">
                        <template v-slot:first></template>
                      </b-form-select>
                    </b-input-group>
                  </b-form-group>
                </b-col>
              </b-row>
              <b-row style="margin-top:1px">
                <b-col lg="6" class="my-1">
                  <b-form-group
                    label="Type"
                    label-cols-sm="3"
                    label-align-sm="right"
                    label-size="sm"
                    label-for="sortBySelect3"
                    class="mb-0"
                  >
                    <b-input-group size="sm">
                      <b-form-select v-model="filter" id :options="destinationOptions" class="w-75">
                        <template v-slot:first></template>
                      </b-form-select>
                    </b-input-group>
                  </b-form-group>
                </b-col>
                <b-col lg="6" class="my-1">
                  <b-form-group
                    label="Ratings"
                    label-cols-sm="3"
                    label-align-sm="right"
                    label-size="sm"
                    label-for="sortBySelect4"
                    class="mb-0"
                  >
                    <b-input-group size="sm">
                      <b-form-select v-model="filter" id :options="ratingOptions" class="w-75">
                        <template v-slot:first></template>
                      </b-form-select>
                    </b-input-group>
                  </b-form-group>
                </b-col>
              </b-row>
            </b-card-text>
          </b-card>
        </b-card-group>
      </div>
    </div>
    <div style="float:right;margin-top:20px;margin-bottom:20px;">
      <b-button hvr-overline-from-center size="sm" @click="addNewLink">Add New Link</b-button>
    </div>
    <b-table
      style="margin-top:20px"
      striped
      hover
      :items="bindListLink"
      responsive="sm"
      :fields="headings"
      show-empty
      :current-page="currentPage"
      :filter="filter"
      :filterIncludedFields="filterOn"
      :per-page="perPage"
      @filtered="onFiltered"
    >
      <template v-slot:cell(actions)="data">
        <b-button variant="link" size="sm" class="mr-1" @click="editLink(data)">
          <b-icon icon="pencil" variant="danger" aria-hidden="true"></b-icon>
        </b-button>
        <b-button variant="link" size="sm" @click="deleteLink(data)">
          <b-icon icon="trash" variant="danger" aria-hidden="true"></b-icon>
        </b-button>
      </template>
      <template v-slot:cell(url)="data">
        <!-- `data.value` is the value after formatted by the Formatter -->
        <a :href="`${data.value.toLowerCase()}`" target="_blank">
          {{
          'Click Here'
          }}
        </a>
      </template>
    </b-table>
    <b-col sm="3" md="3" class="my-1 float-right">
      <b-pagination
        v-model="currentPage"
        :total-rows="totalRows"
        :per-page="perPage"
        align="fill"
        size="sm"
        class="my-0"
      ></b-pagination>
    </b-col>
    <AddNewLink />
  </div>
</template>

<script>
import { BTable } from "bootstrap-vue";
import AddNewLink from "./AddNewLink.vue";

export default {
  name: "Home",
  components: {
    "b-table": BTable,
    AddNewLink,
  },
  data() {
    return {
      class1Options: [
        {
          value: "Grade 1",
          text: "Grade 1",
        },
        {
          value: "Grade 2",
          text: "Grade 2",
        },
        {
          value: "Grade 3",
          text: "Grade 3",
        },
        {
          value: "Grade 4",
          text: "Grade 4",
        },
        {
          value: "Grade 5",
          text: "Grade 5",
        },
        {
          value: "Grade 6",
          text: "Grade 6",
        },
        {
          value: "NA",
          text: "Not Applicable",
        },
      ],
      subjectOptions: [
        {
          value: "Maths",
          text: "Maths",
        },
        {
          value: "Science",
          text: "Science",
        },
        {
          value: "Social",
          text: "Social Science",
        },
        {
          value: "Languages",
          text: "Languages",
        },
        {
          value: "EVS",
          text: "Environmental",
        },
        {
          value: "IT",
          text: "Information Technology",
        },
        {
          value: "NA",
          text: "Not Applicable",
        },
      ],
      destinationOptions: [
        {
          value: "youtube",
          text: "YouTube",
        },
        {
          value: "khan",
          text: "Khan Academy",
        },
        {
          value: "byjus",
          text: "Byjus",
        },
        {
          value: "unacadamy",
          text: "UnAcademy",
        },
        {
          value: "vedantu",
          text: "Vedantu",
        },
        {
          value: "NA",
          text: "Not Applicable",
        },
      ],
      ratingOptions: [
        {
          value: "4",
          text: "4 star",
        },
        {
          value: "3",
          text: "3 star",
        },
        {
          value: "2",
          text: "2 star",
        },
        {
          value: "NA",
          text: "Not Applicable",
        },
      ],
      headings: [
        {
          key: "url",
          label: "Link",
        },
        {
          key: "type",
          label: "Type",
        },
        {
          key: "grade",
          label: "Grade",
        },
        {
          key: "rating",
          label: "Rating",
        },
        {
          key: "subject",
          label: "Subject",
        },
        {
          key: "actions",
          label: "Actions",
        },
      ],
      filterOn: ["type", "rating", "grade", "subject"],
      currentPage: 1,
      totalRows: 0,
      perPage: 5,
      sortBy: "",
      sortDesc: false,
      sortDirection: "asc",
      filter: "NA",
      pageOptions: [5, 10, 15],
    };
  },
  computed: {
    sortOptions() {
      // Create an options list from our fields
      return this.fields
        .filter((f) => f.sortable)
        .map((f) => {
          return { text: f.label, value: f.key };
        });
    },
    bindListLink() {
      return this.$store.state.listLink;
    },
  },
  watch: {
    bindListLink: {
      deep: true,
      handler: function (list) {
        this.totalRows = list.length;
      },
    },
  },
  created() {
    this.loadlistLink();
  },
  methods: {
    loadlistLink() {
      this.totalRows = this.$store.state.listLink.length;
    },
    addNewLink() {
      this.$root.$emit("add-employee", {});
      this.$bvModal.show("addNewLink");
    },
    editLink(link) {
      this.$root.$emit("edit-link", Object.assign({}, link.item));
      this.$bvModal.show("addNewLink");
    },
    deleteLink(link) {
      this.$bvModal
        .msgBoxConfirm("Please confirm that you want to delete link.", {
          title: "Please Confirm",
          size: "mm",
          buttonSize: "sm",
          okVariant: "danger",
          okTitle: "YES",
          cancelTitle: "NO",
          footerClass: "p-2",
          hideHeaderClose: false,
          centered: true,
        })
        .then((value) => {
          if (value) {
            this.$store.dispatch("deleteStoreLink", { link: link }); // dispatch store action
          }
        })
        .catch((err) => {
          console.log("err", err);
          // An error occurred
        });
    },
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    },
  },
};
</script>
