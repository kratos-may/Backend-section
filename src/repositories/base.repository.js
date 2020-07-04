class BaseRepository {
  //recibe la entidad de mongodb con la va a interactuar
  constructor(model) {
    this.model = model;
  }
  //Obtinene un documento de mongo mediante su id
  async get(id) {
    return await this.model.findById(id);
  }
  //Retorna todos los elementos que se encuentren en una coleccion especifica, con paginacion
  async getAll(pageSize = 5, pageNum = 1) {
    const skips = pageSize * (pageNum - 1);
    return await this.model
      .find()
      .skip(skips)
      .limit(pageSize);
  }
  //crea una nueva entidad
  async create(entity) {
    return await this.model.create(entity);
  }
  //recibe un id de una entidad y recibe el cuerpo de la entidad que se quiere modificar
  async update(id, entity) {
    return await this.model.findByIdAndUpdate(id, entity, { new: true });
  }
  //elimina una coleecion mediante un parametro llamado id de la entidad
  async delete(id) {
    await this.model.findByIdAndDelete(id);
    return true;
  }
}

module.exports = BaseRepository;
