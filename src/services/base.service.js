class BaseService {
  //recibe un repositorio
  constructor(repository) {
    this.repository = repository;
  }
  //recibe un id y valida que se meta un id obligatoriamente
  async get(id) {
    if (!id) {
      const error = new Error();
      error.status = 400;
      error.message = "id must be sent";
      throw error;
    }

    const currentEntity = await this.repository.get(id);

    if (!currentEntity) {
      const error = new Error();
      error.status = 404;
      error.message = "entity does not found";
      //este error lo agarra el middlewre error
      throw error;
    }

    return currentEntity;
  }
  
  async getAll(pageSize, pageNum) {
    return await this.repository.getAll(pageSize, pageNum);
  }

  async create(entity) {
    return await this.repository.create(entity);
  }

  async update(id, entity) {
    if (!id) {
      const error = new Error();
      error.status = 400;
      error.message = "id must be sent";
      throw error;
    }

    return await this.repository.update(id, entity);
  }

  async delete(id) {
    if (!id) {
      const error = new Error();
      error.status = 400;
      error.message = "id must be sent";
      throw error;
    }

    return await this.repository.delete(id);
  }
}

module.exports = BaseService;
