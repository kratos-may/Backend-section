const BaseService = require("./base.service");
let _commentRepository = null,
  _ideaRepository = null;

class CommentService extends BaseService {
  constructor({ CommentRepository, IdeaRepository }) {
    super(CommentRepository);
    _commentRepository = CommentRepository;
    _ideaRepository = IdeaRepository;
  }

  async getIdeaComments(ideaId) {
    //validamos si existe la idea
    if (!ideaId) {
      const error = new Error();
      error.status = 400;
      error.message = "ideaId must be sent";
      throw error;
    }
    //capturamos la idea
    const idea = await _ideaRepository.get(ideaId);

    if (!idea) {
      const error = new Error();
      error.status = 404;
      error.message = "idea does not exist";
      throw error;
    }
    //se destructura los comentarios de la idea
    const { comments } = idea;
    return comments;
  }
  //se crea un comentario en una idea y quien es el autor de dcho comentario
  async createComment(comment, ideaId, userId) {
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
    //se crea un comentario
    const createdComment = await _commentRepository.create({
      ...comment,
      author: userId
    });
    idea.comments.push(createdComment);

    return await _ideaRepository.update(ideaId, { comments: idea.comments });
  }
}

module.exports = CommentService;
