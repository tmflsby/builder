import * as mutationTypes from './mutationTypes'

const mutations = {
  [mutationTypes.SET_MAP] (state, { currentLayer, currentBaseLayer }) {
    state.currentLayer = currentLayer
    state.currentBaseLayer = currentBaseLayer
  },
  [mutationTypes.SET_SELECT_BASE_MAP] (state, currentSelectBaseLayerName) {
    state.selectBaseLayerName = currentSelectBaseLayerName
  },
  [mutationTypes.SET_FOLD_SIDEBAR] (state, isFold) {
    state.isFold = isFold
  },
  [mutationTypes.SET_SELECT_BASE_LAYER_PAGE] (state, selectBaseLayerPage) {
    state.selectBaseLayerPage = selectBaseLayerPage
  },
  [mutationTypes.SET_BASE_LAYER_HEADER_BACK] (state, selectBaseLayerPage) {
    state.selectBaseLayerPage = selectBaseLayerPage
  },
  [mutationTypes.SET_ANALYSIS_HEADER] (state, { isAnalysisHeader, analysisName, analysisIcon }) {
    state.isAnalysisHeader = isAnalysisHeader
    state.analysisName = analysisName
    state.analysisIcon = analysisIcon
  },
  [mutationTypes.SET_ANALYSIS_HEADER_BACK] (state, isAnalysisHeader) {
    state.isAnalysisHeader = isAnalysisHeader
  }
}

export default mutations
