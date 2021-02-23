const getters = {
  currentLayerUrl: state => state.baseLayerUrl[state.selectBaseLayerName]
}

export default getters
