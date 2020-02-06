<template>
  <div id="timeline" v-bind:class="{ collapsed: !images || !images.length }">
    <ul>
        <li v-for="(image, index) in this.images" v-bind:key="index" tabindex="0" :data-index="index" @click="selectImage" @keydown.enter="selectImage" @keydown.space="selectImage">
            <span class="image" v-bind:class="{ selected: $parent.selected === index }">
                <canvas data-index="{ index }" width="100" height="75"></canvas>
                {{ image.name }}
            </span>
        </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'timeline',
  components: {},
  props: ['images', 'selected'],
  data() {
      return {};
  },
  methods: {
    updateCanvas() {
        document.querySelectorAll('.image canvas').forEach((canvas) => {
            const image = this.images[+canvas.getAttribute('data-image')];
            canvas.width = image.width;
            canvas.height = image.height;
            canvas.getContext('2d').putImageData(image.data, 0, 0);
        });
    },
    selectImage(e) {
        this.$emit('select-image', e.currentTarget.getAttribute('data-index'));
    }
  },
  updated() {
      this.updateCanvas();
  }
}
</script>

<style scoped>
#timeline {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: flex .5s;
}

#timeline.collapsed {
    flex: 0;
    overflow: hidden;
}

#timeline ul {
    flex: 1;
    height: 100%;
    display: flex;
    margin: 0;
    padding: 0;
    max-width: 100%;
    overflow-x: auto;
    overflow-y: hidden;
}

#timeline ul li {
    flex: 1;
    height: 100%;
    /*display: inline-block;*/
    overflow: hidden;
    min-width: 10em;
}

#timeline ul li:focus {
    outline: 2px solid lightgray;
}

#timeline ul li + li {
    margin-left: 1em;
}

.image {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    cursor: pointer;
}

.image.selected {
    background-color: rgba(0, 0, 0, .2);
}

.image canvas {
    max-height: 4em;
    border: 1px solid white;
    margin-bottom: .7em;
}

@media screen and (min-width: 700px) {
    #timeline ul {
        display: flex;
        overflow: hidden;
        border-radius: 0 0 10px 10px;
    }

    #timeline ul li {
        flex: 1;
        min-width: .5em;
    }
}
</style>