const chartStudio = {
  state: {
    files: []
  },
  mutations: {
    SET_FILES: (state, fileLink) => {
      state.files.append(fileLink)
    }
  },
  actions: {

  }
}

export default chartStudio
