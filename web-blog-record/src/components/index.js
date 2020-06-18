import Vue from 'vue'
import Message from './content/Message'
import Modal from './common/Model'
import Slider from './common/Slider'

Vue.component('Message', Message)
const components = {
  Message,
  Modal,
  Slider
}

for (const [key, value] of Object.entries(components)) {
  Vue.component(key, value)
}