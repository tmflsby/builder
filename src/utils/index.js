import L from 'leaflet'

export const addBaseMap = (map, getters, currentLayer, currentBaseLayer) => {
  getters.currentLayerUrl.forEach(url => {
    currentBaseLayer.push(L.tileLayer(url, { subdomains: [1, 2, 3, 4] }))
  })
  currentBaseLayer.forEach(layer => {
    currentLayer.addLayer(layer).addTo(map)
  })
}

export const removeBaseMap = (currentLayer, currentBaseLayer) => {
  currentBaseLayer.forEach(layer => {
    currentLayer.removeLayer(layer)
  })
}
