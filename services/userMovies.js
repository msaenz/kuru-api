const MongoLib = require('../lib/mongo');

class UserMoviesService {
  Constructor() {
    this.collection = 'use-movies';
    this.mongoDB = MongoLib();
  }

  async getUserMovies({ userId }) {
    const query = userId && { userId };
    const userMovies = await this.MongoLib.getAll(this.collection, query);

    return userMovies || [];
  }

  async createUserMovie({ userMovie }) {
    const createUserMovieId = await this.mongoDB.create(
      this.collection,
      userMovie
    );
    return createUserMovieId;
  }

  async deleteUserMovie({ userMovie }) {
    const deleteUserMovieId = await this.mongoDB.delete(
      this.collection,
      userMovie
    );
    return deleteUserMovieId;
  }
}

module.exports = UserMoviesService;
