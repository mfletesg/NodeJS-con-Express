const express = require('express');
const routerApi = require('./routes');
const cors = require('cors');

const { logErrors, errorHandler, boomErrorHandler } = require('./middlewares/error.handler')

const app = express();
const port = 3000;

app.use(express.json())

const whitelist = ['http://localhost:8080', 'http://myapp.co']
const options = {
  origin : (origin, callback) => {
    if (whitelist.includes(origin)) {
      callback(null, true);
    }
    else{
      callback(new Error('no permitido'));
    }
  }
}
app.use(cors())


app.get('/', (req, res) => {
  res.send('Hola mi server en express');
});

app.get('/nueva-ruta', (req, res) => {
  res.send('Hola, soy una nueva ruta');
}); 

routerApi(app);

app.use(logErrors)
app.use(boomErrorHandler)
app.use(errorHandler)



// app.get('/users', (req, res) => {
//   const { limit, offset } = req.query;
//   if (limit && offset) {
//     res.json({
//       limit,
//       offset
//     });
//   } else {
//     res.send('No hay parametros');
//   }
// });

// app.get('/categories/:categoryId/products/:productId', (req, res) => {
//   const { categoryId, productId } = req.params;
//   res.json({
//     categoryId,
//     productId,
//   });
// })

app.listen(port, () => {
  console.log('Mi port' +  port);
});
