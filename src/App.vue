<template>
  <div id="app">
    <h1>Images Filter</h1>
    <canvas id="data-canvas"></canvas>
    
    <UploadForm v-bind:images=this.images v-on:image-add="addImageOnUpload" v-on:reset-all="resetAll" />
    <RenderImage v-bind:images=this.images v-bind:selected=this.selected v-on:filter-add="addFilter" />
    <Timeline v-bind:images=this.images v-bind:selected=this.selected v-on:select-image="selectImage" />
  </div>
</template>

<script>
import UploadForm from './components/UploadForm';
import RenderImage from './components/RenderImage';
import Timeline from './components/Timeline';

import Worker from 'worker-loader!./Worker.js';

export default {
  name: 'app',
  metaInfo: {
    title: 'Images Filter',
    meta: [
      { charset: 'utf-8' },
      { name: 'description', content: 'Filter your images using Images Filter !' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' }
    ]
  },
  components: {
    UploadForm,
    RenderImage,
    Timeline
  },
  data() {
    return {
      images: [],
      loading: false,
      selected: null,
      worker: new Worker(),
      dataCanvas: null,
    };
  },
  created() {
    this.worker.addEventListener('message', this.onWorkerSuccess);
  },
  mounted() {
    this.dataCanvas = document.querySelector('canvas');
  },
  methods: {
    resetAll() {
      this.images = [];
    },
    addImageOnUpload(image) {
      this.computeImageData(image);
      this.resetAll();
      this.addImage(image);
    },
    addImage(image) {
      image.name = (this.images.length > 0) ? this.images[0].name + this.images.length : image.name;
      this.images.push(image);
      this.selectImage(this.images.length - 1);
    },
    selectImage(index) {
      this.selected = +index;
    },
    computeImageData(image) {
      this.dataCanvas.width = image.width;
      this.dataCanvas.height = image.height;

      const context = this.dataCanvas.getContext('2d');
      context.drawImage(image.bitmap, 0, 0);
      image.data = context.getImageData(0, 0, image.width, image.height);
    },


    addFilter(filterCode) {
      if(!this.worker) { return; }
      var image = this.images[this.images.length - 1];
      this.worker.postMessage({
        filterCode,
        image
      });
    },
    onWorkerSuccess(message) {
      this.addImage(message.data);
    }
  }
}
</script>

<style>
:root {
  --theme-color-1: #EC6EAD;
  --theme-color-2: #3494E6;
}

body, html {
  height: 100%;
  width: 100%;
  padding: 0;
  margin: 0;
  display: block;
  font-size: 16px;
  background-color: lightgray;
  overflow: hidden;
}

#app {
  flex: 1;
  font-family: 'Helvetica', 'Arial', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: white;
  background: var(--theme-color-2);
  background: -webkit-linear-gradient(217deg, var(--theme-color-1), var(--theme-color-2));
  background: linear-gradient(217deg, var(--theme-color-1), var(--theme-color-2));
  display: flex;
  height: 100%;
  flex-direction: column;
  text-align: center;
  transition: margin .5s, border-radius .5s, height .5s;
  box-shadow: 0px 10px 13px -7px #000000, 5px 5px 15px 5px rgba(0,0,0,0);
  border-radius: 0;
}

#data-canvas {
  position: absolute;
  top: -9999px;
  left: -9999px;
}

h1 {
  font-weight: normal;
  flex-basis: 1em;
}

@media screen and (min-width: 700px) {
  #app {
    margin: 1.5em;
    height: calc(100% - 3em);
    border-radius: 10px;
  }
}
</style>
