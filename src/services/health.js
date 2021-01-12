const getHealth = (_req, res) => {
  res.status(200).send({
    health: true
  })
}

module.exports = { getHealth }