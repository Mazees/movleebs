document.addEventListener("alpine:init", () => {
  Alpine.data("movieApp", () => ({
    movies: [],
    moviesCopy: [],
    status: { isLoading: true, geminiLoading: false },
    recommendedMovies: [],
    page: 50,
    async init() {
      this.movies = await window.fetchMovies(50, this.status);
      this.moviesCopy = [...this.movies];
      const movie = this.moviesCopy[0];
      console.log(movie.genreids);
    },
    searchMovie(query) {
      this.moviesCopy = jumpSearch(this.movies, query);
    },
    sortMovie(props, asc) {
      this.moviesCopy = mergeSort(this.movies, props, asc);
    },
    openMovie(idMovie) {
      localStorage.setItem("idMovie", JSON.stringify(idMovie));
      window.location.href = "./detail-movie/";
    },
    async getDataSurvey(surveyResults, nama, umur, story) {
      return await fetchAI(surveyResults, nama, umur, story, loading);
    },
    async getQuestion() {
      let questions = await fetchQuestion("../data/question.json");
      let randomQuestion = [];
      let question;
      let i = 0;
      while (i < 10) {
        question = questions[Math.floor(Math.random() * questions.length)].text;
        console.log(question);
        if (!randomQuestion.includes(question)) {
          randomQuestion.push(question);
          i++;
        }
      }
      console.log(randomQuestion);
      return randomQuestion;
    },
    getRecommendation(userGenres) {
      temp = hashTableLookup(this.moviesCopy, userGenres);
      this.recommendedMovies = mergeSort(temp, 'vote_average', false);
    },
  }));
});
