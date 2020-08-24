<template>
  <div>
    <b-modal id="addNewLink" title="Add New Link">
      <b-form>
        <b-form-group id="input-group-1" label="Link Type:" label-for="input-1">
          <b-form-select v-model="link.type" :options="typeOptions" size="sm" class="mt-3"></b-form-select>
        </b-form-group>
        <b-form-group id="input-group-2" label="Related Subject:" label-for="input-2">
          <b-form-select v-model="link.subject" :options="subjectOptions" size="sm" class="mt-3"></b-form-select>
        </b-form-group>
        <b-form-group id="input-group-3" label="Related Grade:" label-for="input-3">
          <b-form-select v-model="link.grade" :options="gradeOptions" size="sm" class="mt-3"></b-form-select>
        </b-form-group>
        <b-form-group id="input-group-3" label="Your rating:" label-for="input-3">
          <b-form-select v-model="link.rating" :options="ratingOptions" size="sm" class="mt-3"></b-form-select>
        </b-form-group>

        <b-form-group id="input-group-3" label="Desciption:" label-for="input-3">
          <b-form-input
            id="input-1"
            v-model="link.description"
            type="text"
            required
            placeholder="Enter a good description"
          ></b-form-input>
          <span
            v-if="submitted && $v.link.description.$error"
            class="errorMsg"
          >Please Enter Description</span>
        </b-form-group>
        <b-form-group id="input-group-4" label="URL (Link):" label-for="input-1">
          <b-form-input
            id="input-2"
            v-model="link.url"
            type="text"
            required
            placeholder="Enter URL"
          ></b-form-input>
          <span v-if="submitted && $v.link.url.$error" class="errorMsg">Please Enter URL (Link)</span>
        </b-form-group>
      </b-form>
      <template v-slot:modal-footer>
        <div class="w-100">
          <b-button variant="danger" size="sm" class="float-right m-l-10" @click="submitForm">Save</b-button>
        </div>
      </template>
    </b-modal>
  </div>
</template>

<script>
import { BModal, BForm } from "bootstrap-vue";
import {
  required,
  minLength,
  maxLength,
  email,
} from "vuelidate/lib/validators";

export default {
  name: "add_new_link",
  data() {
    return {
      link: {
        type: "Youtube",
        description: "",
        grade: "NA",
        subject: "Misc",
        rating: "4",
        url: "",
      },
      submitted: false,
      typeOptions: [
        {
          value: "Youtube",
          text: "YouTube Video Link",
        },
        {
          value: "Khan Academy",
          text: "Khan Academy Link",
        },
        {
          value: "Byjus",
          text: "Byjus Link",
        },
        {
          value: "Unacadamy",
          text: "UnAcademy Link",
        },
        {
          value: "Vedantu",
          text: "Vedantu Link",
        },
        {
          value: "Book",
          text: "Book Link",
        },
        {
          value: "Blog",
          text: "Blog Link",
        },
      ],
      subjectOptions: [
        {
          value: "Maths",
          text: "Maths Related",
        },
        {
          value: "Science",
          text: "Science Related ",
        },
        {
          value: "Social",
          text: "Social Related",
        },
        {
          value: "IT",
          text: "Information Technology",
        },
        {
          value: "Language",
          text: "Language Related",
        },
        {
          value: "EVS",
          text: "Environemental",
        },
        {
          value: "Misc",
          text: "Misc",
        },
      ],
      gradeOptions: [
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
      ratingOptions: [
        {
          value: "4",
          text: "Highly Recomended",
        },
        {
          value: "3",
          text: "Good",
        },
        {
          value: "2",
          text: "Average",
        },
        {
          value: "na",
          text: "Not Applicable",
        },
      ],
    };
  },
  validations: {
    link: {
      type: { required },
      description: { required },
      url: { required },
    },
  },
  mounted() {
    this.$root.$on("add-link", (data) => {
      this.link = {};
      this.submitted = false;
    });
  },
  components: {
    "b-modal": BModal,
    "b-form": BForm,
  },
  methods: {
    submitForm() {
      this.submitted = true;
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      }
      this.$bvModal.hide("addNewLink");
      this.$store.dispatch("updatelistLink", { link: this.link }); // dispatch store action
    },
    resetForm() {
      this.link = {};
      this.submitted = false;
    },
  },
};
</script>

<style>
</style>
