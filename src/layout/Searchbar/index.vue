<template>
  <div class="searchbar">
    <!--  搜索POI框  -->
    <el-input
      placeholder="请输入内容"
      v-model="searchPOIInputValue"
      :clearable="true"
      @keyup.enter.native="handleClickSearchPOI"
    >
      <template slot="prepend">
        <el-button slot="reference" @click="handleClickIsShowSelectCity">
          {{selectCity}}
          <i class="el-icon-caret-bottom"></i>
        </el-button>
      </template>
      <el-button slot="append" icon="el-icon-search" @click="handleClickSearchPOI"></el-button>
    </el-input>
    <!--  选择行政区划  -->
    <el-tabs type="border-card" tab-position="top" class="select-city" v-if="isShowSelectCity">
      <el-tab-pane label="按拼音搜索城市">
        <el-tabs tab-position="top">
          <el-tab-pane label="HOT">
            <div
              class="city-list"
              v-for="city in CityJson.cityData.hotCities"
              :key="city.adcode"
              :name="city.adcode"
              @click="handleClickSelectCity"
            >
              {{city.name}}
            </div>
          </el-tab-pane>
          <el-tab-pane
            v-for="(cityByLetterItem, cityByLetterIndex) in CityJson.cityByLetter"
            :key="cityByLetterIndex"
            :label="cityByLetterIndex"
          >
            <div
              class="city-list"
              v-for="city in cityByLetterItem"
              :key="city.adcode"
              :name="city.adcode"
              @click="handleClickSelectCity"
            >
              {{city.name}}
            </div>
          </el-tab-pane>
        </el-tabs>
      </el-tab-pane>
      <el-tab-pane label="按省份搜索城市">
        <el-tabs tab-position="top">
          <el-tab-pane label="HOT">
            <div
              class="city-list"
              v-for="city in CityJson.cityData.hotCities"
              :key="city.adcode"
              :name="city.adcode"
              @click="handleClickSelectCity"
            >
              {{city.name}}
            </div>
          </el-tab-pane>
          <el-tab-pane
            v-for="(provinceByLetterItem, provinceByLetterIndex) in CityJson.provinceByLetter"
            :key="provinceByLetterIndex"
            :label="provinceByLetterIndex"
          >
            <div
              class="city-list"
              v-for="city in provinceByLetterItem"
              :key="city.name"
              :name="city.adcode"
              @click="handleClickSelectCity"
            >
              {{city.name}}
            </div>
          </el-tab-pane>
        </el-tabs>
      </el-tab-pane>
      <el-input
        placeholder="请输入城市(行政区域)"
        v-model="searchCityInputValue"
        :clearable="true"
        @keyup.enter.native="searchCity"
      >
        <i slot="prefix" class="el-input__icon el-icon-search" @click="searchCity"></i>
      </el-input>
      <i class="el-icon-close" @click="handleClickIsShowSelectCity"></i>
    </el-tabs>
    <!--  搜索POI结果  -->
    <el-card v-if="isShowPOI" class="search-poi">
      <el-table ref="POITable" :data="currentPOITableData" @row-click="handleRowClick">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column>
          <template slot="header">
            <el-button class="save-poi" @click="handleClickSavePOI">保存所选结果</el-button>
          </template>
          <template slot-scope="scope">
            <div>
              <div style="font-size: 16px">{{scope.row.name}}</div>
              <div style="font-size: 12px">{{scope.row.address}}</div>
            </div>
          </template>
        </el-table-column>
        <el-table-column width="40">
          <template>
            <span class="iconfont icon-builder-biaoji"></span>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        layout="prev, pager, next, jumper"
        :page-size="8"
        :pager-count="5"
        :total="totalPOICount"
        @size-change="handleSizeChange"
        @current-change="handleSizeChange"
      >
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
import L from 'leaflet'
import CityJson from './city.json'
import { getDistrict, getPOI } from '@/api/AMap'
import blueMarker from '@/assets/leaflet/marker_blue.png'
import redMarker from '@/assets/leaflet/marker_red.png'
export default {
  name: 'Searchbar',
  data () {
    return {
      searchPOIInputValue: '',
      searchCityInputValue: '',
      selectCity: '中华人民共和国',
      isShowSelectCity: false,
      isShowPOI: false,
      currentPOITableData: [],
      totalPOICount: null,
      CityJson,
      currentPOICoordinates: [],
      POIMarker: [],
      POISaveMarket: []
    }
  },
  watch: {
    searchPOIInputValue () {
      if (this.searchPOIInputValue === '') {
        this.isShowPOI = false
      }
    },
    isShowPOI () {
      if (this.isShowPOI === false) {
        this.POIMarker.forEach(item => {
          item.remove()
        })
      }
    }
  },
  methods: {
    handleClickIsShowSelectCity () {
      this.searchCityInputValue = ''
      this.isShowSelectCity = !this.isShowSelectCity
    },
    flyToCity (keywords) {
      getDistrict(keywords).then(res => {
        if (res.districts[0] === undefined) {
          this.$message({
            message: '查无此行政区',
            type: 'error',
            showClose: true,
            offset: 10
          })
        } else {
          const cityCenter = res.districts[0].center.split(',')
          const cityLevel = res.districts[0].level
          this.selectCity = res.districts[0].name
          let zoom = null
          if (cityLevel === 'country') {
            zoom = 4
          } else if (cityLevel === 'province') {
            zoom = 6
          } else if (cityLevel === 'city') {
            zoom = 8
          } else if (cityLevel === 'district') {
            zoom = 11
          } else if (cityLevel === 'street') {
            zoom = 13
          }
          this.$map.flyTo([
            Number.parseFloat(cityCenter[1]),
            Number.parseFloat(cityCenter[0])
          ], zoom)
        }
      }).catch(error => {
        console.log(error)
      })
    },
    handleClickSelectCity (e) {
      this.flyToCity(e.target.attributes.name.value)
      this.isShowSelectCity = !this.isShowSelectCity
    },
    searchCity () {
      this.flyToCity(this.searchCityInputValue)
      this.isShowSelectCity = !this.isShowSelectCity
    },
    popupContent (name, tel, address, type) {
      return `
        <div class="POI-marker-popup">
          <div class="name">
            <div class="title">名称</div>
            <div class="des">${name}</div>
          </div>
          <div class="tel">
            <div class="title">电话</div>
            <div class="des">${tel}</div>
          </div>
          <div class="address">
            <div class="title">地址</div>
            <div class="des">${address}</div>
          </div>
          <div class="type">
            <div class="title">类型</div>
            <div class="des">${type}</div>
          </div>
        </div>
      `
    },
    markerIcon (markerUrl) {
      return L.icon({
        iconUrl: markerUrl,
        iconSize: [48, 43],
        iconAnchor: [24, 22]
      })
    },
    searchPOI (page) {
      getPOI(this.selectCity, this.searchPOIInputValue, page).then(res => {
        if (res.pois) {
          this.isShowPOI = true
          this.currentPOITableData = []
          this.currentPOICoordinates = []
          this.totalPOICount = Number.parseInt(res.count)
          this.POIMarker.forEach(item => {
            item.remove()
          })
          res.pois.map((item, index) => {
            const POIMarkerCoordinates = [item.location.split(',')[1], item.location.split(',')[0]]
            const currentPOITableRowData = {
              name: item.name,
              address: item.adname + item.address,
              coordinates: POIMarkerCoordinates,
              tel: item.tel.length === 0 ? '无' : item.tel.split(';')[0],
              type: item.type
            }

            this.currentPOITableData.push(currentPOITableRowData)
            this.POIMarker[index] = L.marker(POIMarkerCoordinates, {
              icon: this.markerIcon(blueMarker)
            }).bindPopup(
              this.popupContent(
                currentPOITableRowData.name,
                currentPOITableRowData.tel,
                currentPOITableRowData.address,
                currentPOITableRowData.type
              )
            ).addTo(this.$map)
            this.currentPOICoordinates.push(POIMarkerCoordinates)
          })
        }
        this.$map.flyToBounds(this.currentPOICoordinates)
      }).catch(error => {
        console.log(error)
      })
    },
    handleClickSearchPOI () {
      this.searchPOI()
    },
    handleSizeChange (page) {
      this.searchPOI(page)
    },
    handleClickSavePOI () {
      this.isShowPOI = false
      this.$refs.POITable.selection.forEach((item, index) => {
        this.POISaveMarket[index] = L.marker(item.coordinates, {
          icon: this.markerIcon(redMarker)
        }).bindPopup(
          this.popupContent(
            item.name,
            item.tel,
            item.address,
            item.type
          )
        ).addTo(this.$map)
      })
    },
    handleRowClick (e) {
      this.$map.flyTo(e.coordinates)
    }
  }
}
</script>

<style lang="scss">
.select-city {
  .el-tabs__content {
    padding: 0 20px;
    .el-tabs__item {
      padding: 0 15px;
    }
  }
}
.search-poi {
  .el-card__body {
    padding: 0;
  }
}
.POI-marker-popup {
  display: flex;
  flex-direction: column;
  font-size: 14px;
  .name, .tel, .address, .type {
    display: flex;
    padding: 5px 0;
    cursor: move;
    &:hover {
      background: #ccc;
    }
    .title {
      width: 30px;
      margin-right: 20px;
    }
    .des {
      width: 270px;
    }
  }
}
</style>
<style lang="scss" scoped>
.searchbar {
  width: 100%;
  height: 100%;
  border-radius: 4px;
  .select-city {
    position: fixed;
    top: 60px;
    right: 60px;
    width: 600px;
    min-height: 150px;
    border-radius: 4px;
    z-index: 10;
    .el-icon-close {
      position: fixed;
      top: 70px;
      right: 75px;
      font-size: 20px;
      cursor: pointer;
    }
    .el-input {
      position: fixed;
      top: 60px;
      right: 120px;
      width: 263px;
      .el-icon-search {
        cursor: pointer;
      }
    }
  }
  .search-poi {
    margin-top: 10px;
    border-radius: 4px;
    .icon-builder-biaoji {
      font-size: 20px;
    }
    .save-poi {
      width: 100%;
    }
  }
}
.el-input__inner {
  min-width: 50px;
}
.city-list {
  font-size: 14px;
  float: left;
  padding: 5px;
  margin: 5px;
  cursor: pointer;
}
</style>
