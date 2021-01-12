const app = require('../app')
const config = require('../configs')

app.listen(config.API.PORT, () => console.log(`API rodando na porta ${config.API.PORT}`))