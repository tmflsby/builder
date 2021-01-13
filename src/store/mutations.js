import * as mutationTypes from './mutationTypes'

const mutations = {
  [mutationTypes.SET_FOLD_SIDEBAR] (state, isFold) {
    state.isFold = isFold
  }
}

export default mutations
