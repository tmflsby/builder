import Vue from 'vue'
import L from 'leaflet'
import * as mutationTypes from './mutationTypes'
import { addBaseMap, removeBaseMap } from '@/utils'

const actions = {
  setMap ({ commit, getters }) {
    const map = L.map('map', {
      center: [30, 114],
      zoom: 4,
      zoomControl: false,
      attributionControl: false
    })

    // 绑定为全局对象
    Vue.prototype.$map = map

    // zoom
    L.control.zoom({ position: 'topright' }).addTo(map)

    // attribution
    L.control.attribution({ position: 'bottomright' }).addTo(map)

    // scale
    L.control.scale({ position: 'bottomleft' }).addTo(map)

    // 添加地图 (默认--智图矢量)
    const currentLayer = L.layerGroup()
    const currentBaseLayer = []

    // 添加底图
    addBaseMap(map, getters, currentLayer, currentBaseLayer)

    commit(mutationTypes.SET_MAP, { currentLayer, currentBaseLayer })
  },
  setSelectBaseMap ({ commit, getters, state }, { currentSelectBaseLayerName }) {
    commit(mutationTypes.SET_SELECT_BASE_MAP, currentSelectBaseLayerName)

    const currentLayer = state.currentLayer
    let currentBaseLayer = state.currentBaseLayer

    removeBaseMap(currentLayer, currentBaseLayer)

    currentBaseLayer = []

    addBaseMap(this._vm.$map, getters, currentLayer, currentBaseLayer)

    commit(mutationTypes.SET_MAP, { currentLayer, currentBaseLayer })
  },
  setAddBaseMap ({ commit, getters, state }) {
    const currentLayer = state.currentLayer
    const currentBaseLayer = state.currentBaseLayer

    addBaseMap(this._vm.$map, getters, currentLayer, currentBaseLayer)

    commit(mutationTypes.SET_MAP, { currentLayer, currentBaseLayer })
  },
  setDeleteBaseMap ({ commit, state }) {
    const currentLayer = state.currentLayer
    let currentBaseLayer = state.currentBaseLayer

    removeBaseMap(currentLayer, currentBaseLayer)

    currentBaseLayer = []

    commit(mutationTypes.SET_MAP, { currentLayer, currentBaseLayer })
  },
  setFoldSidebar ({ commit, state }) {
    const isFold = !state.isFold
    commit(mutationTypes.SET_FOLD_SIDEBAR, isFold)
  },
  setSelectBaseLayerPage ({ commit }) {
    const selectBaseLayerPage = true
    commit(mutationTypes.SET_SELECT_BASE_LAYER_PAGE, selectBaseLayerPage)
  },
  setBaseLayerHeaderBack ({ commit }) {
    const selectBaseLayerPage = false
    commit(mutationTypes.SET_SELECT_BASE_LAYER_PAGE, selectBaseLayerPage)
  },
  setAnalysisHeader ({ commit }, { currentAnalysisName, currentAnalysisIcon }) {
    const isAnalysisHeader = true
    const analysisName = currentAnalysisName
    const analysisIcon = currentAnalysisIcon
    commit(mutationTypes.SET_ANALYSIS_HEADER, { isAnalysisHeader, analysisName, analysisIcon })
  },
  setAnalysisHeaderBack ({ commit }) {
    const isAnalysisHeader = false
    commit(mutationTypes.SET_ANALYSIS_HEADER_BACK, isAnalysisHeader)
  }
}

export default actions
