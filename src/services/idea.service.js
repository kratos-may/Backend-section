const BaseService = require("./base.service");
let _ideaRepository = null;
//hereda de bseSERVICES
class IdeaService extends BaseService {
  //solicita la idea de repository
  constructor({ IdeaRepository }) {
    super(IdeaRepository);
    _ideaRepository = IdeaRepository;
  }
  //metodo que regresa la idea de un autor, si existe el autor retorna lo que consifa si no, un error
  async getUserIdeas(author) {
    if (!author) {
      const error = new Error();
      error.status = 400;
      error.message = "userId must be sent";
      throw error;
    }

    return await _ideaRepository.getUserIdeas(author);
  }

  async upvoteIdea(ideaId) {
    if (!ideaId) {
      const error = new Error();
      error.status = 400;
      error.message = "ideaId must be sent";
      throw error;
    }

    const idea = await _ideaRepository.get(ideaId);

    if (!idea) {
      const error = new Error();
      error.status = 404;
      error.message = "idea does not exist";
      throw error;
    }
    //la idea trae todos los votos que tiene, y pues actualiza los vtoos
    idea.upvotes.push(true);

    return await _ideaRepository.update(ideaId, { upvotes: idea.upvotes });
  }

  async downvoteIdea(ideaId) {
    if (!ideaId) {
      const error = new Error();
      error.status = 400;
      error.message = "ideaId must be sent";
      throw error;
    }

    const idea = await _ideaRepository.get(ideaId);

    if (!idea) {
      const error = new Error();
      error.status = 404;
      error.message = "idea does not exist";
      throw error;
    }

    idea.downvotes.push(true);

    return await _ideaRepository.update(ideaId, { downvotes: idea.downvotes });
  }
}

module.exports = IdeaService;
