<template>
<main style="height: 100%" class="pt-4">
  <v-container v-if="product" class="boxed__container">
    <div class="mb-8 d-flex align-end justify-lg-space-between">
      <Breadcrumb class="flex-grow-0" icon="plus-box-multiple" title="New Product" />
    </div>

    <v-sheet class="pa-8">
      <div class="mb-5">
        <div class="font-weight-bold mb-1">Product Thumbnail</div>

        <croppa :width="200" :height="200" class="radius__10" :remove-button-size="30" :accept="'image/*'" :initial-image="product.thumbnail" :prevent-white-space="true" placeholder="Choose an image" :placeholder-font-size="13" :file-size-limit="4096000" @file-type-mismatch="onFileTypeMismatch" @file-size-exceed="onFileSizeExceed" v-model="uploadedThumbnail"></croppa>
      </div>

      <v-row>
        <v-col cols="12" sm="6">
          <div>
            <div class="font-weight-bold mb-1">Product Name</div>
            <v-text-field v-model="product.name" solo flat color="secondary" class="font__13 font-weight-medium" background-color="grey lighten-3" />
          </div>
        </v-col>

        <v-col cols="12" sm="6">
          <div>
            <div class="font-weight-bold mb-1">Price (₦)</div>
            <v-text-field type="number" v-model="product.price" solo flat color="secondary" class="font__13 font-weight-medium" background-color="grey lighten-3" />
          </div>
        </v-col>

        <v-col cols="12" sm="6">
          <div>
            <div class="font-weight-bold mb-1">Quick Overview</div>
            <v-textarea v-model="product.overview" rows="3" solo flat color="secondary" class="font__13 font-weight-medium" background-color="grey lighten-3" />
          </div>

          <div>
            <div class="font-weight-bold mb-1">Category</div>
            <v-select :items="categories" v-model="product.category" item-text="name" item-value="_id" solo flat color="secondary" class="font__13 font-weight-medium" background-color="grey lighten-3" />
          </div>
        </v-col>

        <v-col cols="12" sm="6">
          <div>
            <div class="font-weight-bold mb-1">Stock Quantity</div>
            <v-text-field v-model="product.stock" type="number" solo flat color="secondary" class="font__13 font-weight-medium" background-color="grey lighten-3" />
          </div>

          <div>
            <div class="font-weight-bold mb-1">Product Weight (KG)</div>
            <v-text-field v-model="product.weight" type="number" solo flat color="secondary" class="font__13 font-weight-medium" background-color="grey lighten-3" />
          </div>
        </v-col>

        <v-col cols="12">
          <div class="font-weight-bold mb-2">Product Description</div>
          <vue-editor :editorToolbar="customToolbar" v-model="product.description"></vue-editor>
        </v-col>

        <v-col cols="12">
          <div class="font-weight-bold mb-1 mt-3">Product Images</div>

          <section class="d-flex flex-wrap">
            <div v-if="product.images.length" class="d-flex flex-wrap mr-10">
              <v-img style="position: relative" width="150" height="150" class="mr-2" v-for="(image, i) in product.images" :key="i" :src="image.imageURL">

                <v-btn @click="remove_image(image, i)" color="white" style="position: absolute; top: -8px; right: -8px" icon>
                  <v-icon color="red">mdi-close-circle</v-icon>
                </v-btn>

              </v-img>
            </div>

            <div @click="image_dialog = true" class="cursor__pointer upload__card d-flex align-center justify-center font__13 grey lighten-3">
              <div class="text-center">
                <v-icon size="30">mdi-cloud-download-outline</v-icon>
                <div>Click to upload</div>
              </div>
            </div>
          </section>
        </v-col>
      </v-row>

      <section class="d-flex justify-space-between flex-wrap mt-6">
        <v-checkbox v-model="product.featured" color="secondary">
          <div slot="label" class="font__13 font-weight-bold">Feature this product</div>
        </v-checkbox>

        <div>
          <v-btn :loading="loading" @click="publish_product" depressed color="primary" class="secondary--text font-weight-bold" height="45" width="120">Publish</v-btn>
          
          <v-btn :loading="loading_2" @click="unpublish_product" outlined height="45" width="120" class="font-weight-bold">Unpublish</v-btn>
        </div>
      </section>
    </v-sheet>

    <!-- DIALOG  -->
    <v-dialog v-if="image_dialog" persistent v-model="image_dialog" max-width="600">
      <v-sheet>
        <div class="pa-6 title font-weight-bold secondary--text primary">Product Image
          <div class="caption font-weight-medium mt-2">Click the box below to select and adjust image.</div>
        </div>

        <div class="pt-8 pb-4 px-4">
          <div style="width: 512px" class="mx-auto">
            <croppa :width="512" :height="512" class="radius__10" :remove-button-size="30" :accept="'image/*'" :prevent-white-space="true" placeholder="Choose an image" :placeholder-font-size="13" :file-size-limit="4096000" @file-type-mismatch="onFileTypeMismatch" @file-size-exceed="onFileSizeExceed" v-model="uploadedImage"></croppa>
          </div>

          <div class="text-center mt-8">
            <v-btn rounded @click="image_dialog = false" outlined width="100" class="font__12 font-weight-bold">Cancel</v-btn>

            <v-btn rounded @click="add_image" depressed width="100" color="primary" class="font__12 font-weight-bold secondary--text">Add Image</v-btn>
          </div>
        </div>
      </v-sheet>
    </v-dialog>
  </v-container>

  <v-overlay v-else>
    <v-progress-circular indeterminate size="64"></v-progress-circular>
  </v-overlay>
</main>
</template>

<style lang="scss" scoped>
.v-btn {
  border-radius: 0 !important;
}

.upload__card {
  height: 150px;
  width: 150px;
  border: 3px dashed grey !important;
}
</style>

<script>
import {
  VueEditor
} from "vue2-editor";

import Breadcrumb from '@/components/navigation/Breadcrumb'
import toast from '@/helpers/toast'

export default {
  layout: 'admin',

  middleware: 'auth',

  components: {
    VueEditor,
    Breadcrumb
  },

  data: () => ({
    description: '',
    image_dialog: false,
    loading: false,
    uploadedImage: {},
    uploadedThumbnail: {},
    product_images: [],
    categories: [],
    category: '',
    product_name: '',
    price: '',
    overview: '',
    stock: '',
    weight: '',
    featured: false,
    thumbnail: '',
    loading_2: false,
    deleted_images: [],
    new_images: [],

    product: null,

    customToolbar: [
      [{
        'font': []
      }],
      [{
        'header': [false, 1, 2, 3, 4, 5, 6, ]
      }],
      ['bold', 'italic', 'underline', 'strike'],
      [{
        'align': ''
      }, {
        'align': 'center'
      }, {
        'align': 'right'
      }, {
        'align': 'justify'
      }],
      [{
        'list': 'ordered'
      }, {
        'list': 'bullet'
      }],
      [{
        'indent': '-1'
      }, {
        'indent': '+1'
      }],
      [{
        'color': []
      }, {
        'background': []
      }],
      ['link'],
      ['clean'],
    ],
  }),

  methods: {
    onFileTypeMismatch(file) {
      alert('Invalid file type. Please choose a JPEG, PNG or GIF file.')
    },

    onFileSizeExceed(file) {
      alert('File size exceeds. Please choose a file smaller than 4MB.')
    },

    add_image() {
      let picture = this.uploadedImage.generateDataUrl('image/jpeg', 0.5)
      if (!picture) {
        alert('No image file was selected.')
        return
      }

      const data = {
        imageURL: picture
      }

      this.product.images.push(data)
      this.new_images.push(picture)

      this.image_dialog = false
    },

    remove_image(image, index) {
      this.product.images.splice(index, 1)

      const data = {
        publicId: image.publicId,
        imageURL: image.imageURL
      }

      this.deleted_images.push(data)
    },

    update_product(status) {
      let picture = this.uploadedThumbnail.generateDataUrl('image/jpeg', 0.5)
      if (!picture) {
        alert('No thumbnail was selected.')
        return
      }

      this.product.status = status
      this.product.thumbnail = picture
      this.product.deleted_images = this.deleted_images
      this.product.new_images = this.new_images

      status == 'published' ? this.loading = true : this.loading_2 = true

      this.$axios.$patch(`/products/${this.product._id}`, this.product).then(response => {
        status == 'published' ? this.loading = false : this.loading_2 = false

        this.$router.push('/admin/products')
      }).catch(() => status == 'published' ? this.loading = false : this.loading_2 = false)
    },

    publish_product() {
      this.update_product('published')
    },

    unpublish_product() {
      this.update_product('draft')
    }
  },

  async created() {
    await this.$axios.$get(`/products/${this.$route.params.slug}`).then(response => {
      this.product = response.data
    })

    this.$axios.$get('/categories').then(response => {
      this.categories = response.data
    })
  },
}
</script>
