function errorHandling (err, req, res, next) {
  console.error(err);
  res.status(500).send('Erro inesperado :/');
}

export { errorHandling };