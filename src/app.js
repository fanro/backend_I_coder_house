const express = require('express');

const PORT = 3000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Bienvenidos');
});

const server = app.listen(PORT, () => {
  console.log(`Server on line en pueto ${PORT}`);
});
