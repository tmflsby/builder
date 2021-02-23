import service from './service'

// 高德地图Web服务key
const AMapKey = '45456879c806d0c3d78f551c0d2f25e9'

// 高德地图baseUrl
const AMapBaseUrl = 'https://restapi.amap.com/v3'

export const getDistrict = (keywords) => service({
  url: `${AMapBaseUrl}/config/district`,
  method: 'get',
  params: {
    key: AMapKey,
    subdistrict: 0,
    keywords
  }
})

export const getPOI = (city, keywords, page) => service({
  url: `${AMapBaseUrl}/place/text`,
  method: 'get',
  params: {
    key: AMapKey,
    extensions: 'all',
    offset: 8,
    city,
    keywords,
    page
  }
})
