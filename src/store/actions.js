import * as mutationTypes from './mutationTypes'

const actions = {
  setFoldSidebar ({ commit, state }) {
    const isFold = !state.isFold
    commit(mutationTypes.SET_FOLD_SIDEBAR, isFold)
  }
}

export default actions
