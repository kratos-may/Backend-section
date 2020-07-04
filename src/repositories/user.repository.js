const BaseRepository = require("./base.repository");
//variable privada para inicializar user entidad
let _user = null;
//hereda de nuestro baseRepository, por eso se importa aqui
class UserRepository extends BaseRepository {
  //
  constructor({ User }) {
    //llama el constructor de la clase padre a la de la clase hijo con super
    super(User);
    _user = User;
  }

  async getUserByUsername(username) {
    return await _user.findOne({ username });
  }
}

module.exports = UserRepository;
