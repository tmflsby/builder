import baseLayerUrl from './baseLayer/baseLayerUrl.json'

const state = {
  isFold: false,
  isAnalysisHeader: false,
  analysisName: '',
  analysisIcon: '',
  selectBaseLayerPage: false,
  selectBaseLayerName: '智图矢量',
  baseLayerUrl,
  currentLayer: undefined,
  currentBaseLayer: undefined
}

export default state
