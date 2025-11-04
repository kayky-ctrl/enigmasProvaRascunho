const app = Vue.createApp({
  data() {
    return {
      enigmas: [],
      currentPage: "home",
      selectedLevel: 1,
      selectedEnigma: null,
      showSolution: false,
      isMenuOpen: false,
    };
  },

  computed: {
    filteredEnigmas() {
      return this.enigmas.filter(
        (enigma) => Number(enigma.dificuldade) === this.selectedLevel
      );
    },
  },

  methods: {
    async getJson() {
      try {
        const response = await fetch("enimas.json");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        this.enigmas = data;
      } catch (error) {
        console.error("Não foi possível carregar os enigmas:", error);
      }
    },

    changePage(page) {
      this.currentPage = page;
      this.isMenuOpen = false;
      window.scrollTo(0, 0);
    },

    selectLevel(level) {
      this.selectedLevel = level;
    },

    showDetails(enigma) {
      this.selectedEnigma = enigma;
      this.showSolution = false;
      this.changePage("details");
    },

    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
    },
  },

  mounted() {
    this.getJson();
  },
});

app.mount("#app");
