module.exports = function(req, res, next) {
  const queryStrings = req.query;
  //recorremos todas las propiedades de nuestro objeto
  for (const key in queryStrings) {
    const length = queryStrings[key].length;
    //is valid si el length es mayor que 20, si lo es retornamos un false, si no lo transfroma en un int
    const isValid = length > 20 ? false : !isNaN(parseInt(queryStrings[key]));

    if (isValid) {
      queryStrings[key] = parseInt(queryStrings[key]);
    }
  }

  req.query = queryStrings;
  next();
};
