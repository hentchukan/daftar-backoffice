<script>
import { QuillEditor, Quill } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css';
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
import BackOfficeFilmInfo from "./BackOfficeFilmInfo.vue"
import axios from 'axios';
import {DAFTAR_BACK_BASE_URL} from "../../../config";

export default {
  components: {
    'quill': QuillEditor,
    'filmInfoBar': BackOfficeFilmInfo
  },
  data: () => {
    return {
      filmInfo: {},
      articleTitle: '',
      articleDate: new Date(),
      status: 'draft',
      rating: 0.0
    }
  },
  methods: {
    handleToastClose() {
      if (this.status === 'success') {
        this.resetData()
      } else if (this.status === 'error') {
        this.status = 'draft'
      } else {
        console.log("Handle toast close")
      }
    },
    submitData() {
      let container = document.getElementById('editor');
      let editor = new Quill(container);
      let filmRating = this.rating;

      // Create FormData object
      let formData = new FormData();
      // Convert ArticleDTO to JSON string and wrap it in a Blob
      let articleDTO = {
        "filmInfo": this.filmInfo,
        "title": this.articleTitle,
        "text": editor.getText(),
        "articleDate": this.articleDate,
        "rating": filmRating
      };
      let articleBlob = new Blob([JSON.stringify(articleDTO)], { type: 'application/json' });
      // Append Blob to FormData
      formData.append('article', articleBlob);
      // Append image files
      if (this.coverFile) {
        formData.append('coverImage', this.coverFile);
      }
      if (this.posterFile) {
        formData.append('posterImage', this.posterFile);
      }
      console.log("Film Rating "+ articleDTO.rating);
      // Send FormData using axios
      axios.post(DAFTAR_BACK_BASE_URL + '/v1/articles', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then(response => {
        if (response.status === 200) {
          this.status = 'success'
          toast.success(this.articleTitle + " has been saved successfully", this.toastOptions());
        }
      })
      .catch(error => {
        this.status = 'error'
        toast.error("An error occurred while saving the article " + error.response.data, this.toastOptions());
      });
    },
    toastOptions() {
      return {
        "theme": "auto",
        "type": "info",
        "position": "top-center",
        "hideProgressBar": true,
        "transition": "slide",
        "dangerouslyHTMLString": true,
        "autoClose": false,
        onClose: () => this.handleToastClose()
      }
    },
    resetData() {
      this.filmInfo = {}
      this.articleTitle = ''
      this.articleDate = new Date()
      this.coverFile = null
      this.posterFile = null
      this.$refs.filmInfoBar.reset();
      window.location.reload();
    },
    getFilmInfoYear(filmInfoYear) {
      console.log("Film date "+filmInfoYear);
      this.filmInfo.year = filmInfoYear;
      toast.success(this.filmInfo.year + " has been saved successfully", this.toastOptions());
    },
    getFilmInfoTitles(filmInfoTitles) {
      console.log("Film title "+filmInfoTitles);
      this.filmInfo.title = filmInfoTitles;
    },
    getFilmInfoDirectors(filmInfoDirectors) {
      console.log("Film directors "+filmInfoDirectors);
      this.filmInfo.directors = filmInfoDirectors;
    },
    getFilmInfoStars(filmInfoStars) {
      console.log("Film starring "+filmInfoStars);
      this.filmInfo.stars = filmInfoStars;
    },
    getFilmInfoCountries(filmInfoCountries) {
      console.log("Film countries "+filmInfoCountries);
      this.filmInfo.countries = filmInfoCountries;
    },
    getFilmInfoGenres(filmInfoGenres) {
      console.log("Film countries "+filmInfoGenres);
      this.filmInfo.genres = filmInfoGenres;
    },
    getArticleTitle(articleTitle) {
      console.log("Article title "+articleTitle);
      this.articleTitle = articleTitle;
    },
    getFilmInfoSummary(filmInfoSummary) {
      console.log("Film Summary "+filmInfoSummary);
      this.filmInfo.filmSummary = filmInfoSummary;
    },
    getFilmCover(filmCover) {
      if (filmCover === undefined) {
        this.coverFile = null
        this.filmInfo.cover = null
      } else {
        this.coverFile = filmCover
        let nameParts = filmCover.name.split('.')
        this.filmInfo.cover = nameParts[0] + "-cover." + nameParts[1]
      }
      console.log("Film cover {}, {}, {}"+/*this.$refs.filmInfoBar.coverFile*/ filmCover, this.coverFile, this.coverFile.name );
    },
    getFilmPoster(filmPoster) {
      if (filmPoster === undefined) {
        this.posterFile = null
        this.filmInfo.poster = null
      } else {
        this.posterFile = filmPoster
        let nameParts = filmPoster.name.split('.')
        this.filmInfo.poster = nameParts[0] + "-poster." + nameParts[1]
      }
      console.log("Film poster {}, {}, {}"+/*this.$refs.filmInfoBar.posterFile*/filmPoster, this.posterFile, this.posterFile.name);
    },
    getArticleDate(articleDate) {
      console.log("Article date "+this.articleDate);
      this.articleDate = articleDate;
    },
    getRating(ratingEvent) {
      console.log("Rating "+ratingEvent);
      this.rating = ratingEvent;
    }
  },
  mounted() {
    let toolbarOptions = [{ 'direction': 'rtl' }];
    QuillEditor.props.globalOptions.default = () => toolbarOptions
  }}
</script>

<template>
  <filmInfoBar
          ref="filmInfoBar"
          @fireFilmInfoYear="this.getFilmInfoYear($event)"
          @fireFilmInfoTitles="$event => this.getFilmInfoTitles($event)"
          @fireFilmInfoDirectors="$event => this.getFilmInfoDirectors($event)"
          @fireFilmInfoStars="this.getFilmInfoStars($event)"
          @fireFilmInfoCountries="this.getFilmInfoCountries($event)"
          @fireFilmInfoGenres="this.getFilmInfoGenres($event)"
          @fireArticleTitle="$event => this.getArticleTitle($event)"
          @fireFilmInfoSummary="$event => this.getFilmInfoSummary($event)"
          @fireFilmCover="getFilmCover"
          @fireFilmPoster="getFilmPoster"
          @fireArticleDate="$event => this.getArticleDate($event)"
          @fireFilmRating="$event => this.getRating($event)"/>

  <div style="padding-top: 1rem">
    <quill id="editor" theme="snow" toolbar="full" style="min-height: 30rem;" />
  </div>

  <div class="
					flex
					justify-between
					border-b border-primary-light
					dark:border-secondary-dark
					pb-3
					gap-2
				"
  >
    <div class="flex justify-between gap-2" v-on:click="submitData">
					<span
                  class="
							hidden
							sm:block
							bg-primary-light
							dark:bg-ternary-dark
							p-2.5
							shadow-sm
							rounded-xl
							cursor-pointer
							">
						<i data-feather="save"
               class="text-ternary-dark dark:text-ternary-light"></i>
					</span>
    </div>
  </div>
</template>
<style scoped>
</style>
