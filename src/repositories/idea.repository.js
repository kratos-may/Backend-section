const BaseRepository = require("./base.repository");
let _idea = null;

class IdeaRepository extends BaseRepository {
  constructor({ Idea }) {
    super(Idea);
    _idea = Idea;
  }
  //metodo que muestra las ideas de un autor en particular
  async getUserIdeas(author) {
    return await _idea.find({ author });
  }
}

module.exports = IdeaRepository;
