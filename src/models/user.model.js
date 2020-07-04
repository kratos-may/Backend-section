const mongoose = require("mongoose");
const { Schema } = mongoose;
//encriptaciones compareSync: compara contraseñas- hashSync: crea has de contraseña - genSaltSync: 
const { compareSync, hashSync, genSaltSync } = require("bcryptjs");

const UserSchema = new Schema({
  name: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true }
});
//Mongoose utiliza Tojson y aqui se utiliza esto para eliminar la contraseña de cuando mongoose responda la peticion
UserSchema.methods.toJSON = function() {
  //toObject nos convierte el user en un objeto
  let user = this.toObject();
  delete user.password;
  return user;
};
//metodo que compara contraseña una vez se encripta
UserSchema.methods.comparePasswords = function(password) {
  return compareSync(password, this.password);
};
//validacion de que antes que se ejecute un save se ejecute una funcion
UserSchema.pre("save", async function(next) {
  //creo usuario con this
  const user = this;
  //aqui se valida que se esta modificacndo la contraseña
  if (!user.isModified("password")) {
    return next();
  }
  //genera el salt si se esta modificando la contra
  const salt = genSaltSync(10);
  //se hashea la contra
  const hashedPassword = hashSync(user.password, salt);
  user.password = hashedPassword;
  next();
});

module.exports = mongoose.model("user", UserSchema);
