<template>
  <div class="star-rating" @mouseleave="resetHover">
    <span v-for="star in 10"
          :key="star"
          :class="defineClass(star)"
          @mouseover="hoverRating = star"
          @click="setRating(star)">
      {{ getStarSymbol(star) }}
    </span>
  </div>
</template>

<script>
export default {
  props: {
    rating: Number, // Accepts decimal values (e.g., 3.5)
  },
  data() {
    return {
      hoverRating: null, // Store the hovered rating
    };
  },
  computed: {
    displayedRating() {
      return this.hoverRating !== null ? this.hoverRating : this.rating;
    },
  },
  methods: {
    defineClass(star) {
      return [
        "star",
        star <= this.displayedRating ? "filled" :
                (star - this.displayedRating === 0.5 ? "half" : "empty")
      ];
    },
    getStarSymbol(star) {
      return star > this.displayedRating ? "☆" : "★";
    },
    setRating(star) {
      this.$emit("input", star); // Emit new rating value
    },
    resetHover() {
      this.hoverRating = null;
    }
  }
};
</script>

<style scoped>
.star-rating {
  display: inline-flex;
  align-items: center;
  cursor: pointer;
}
.star {
  font-size: 36px;
  transition: color 0.2s;
}
.filled {
  color: gold;
}
.half {
  color: gold;
  position: relative;
}
.half::before {
  content: "★";
  color: gold;
  position: absolute;
  width: 50%;
  overflow: hidden;
}
.empty {
  color: #ccc;
}
</style>
