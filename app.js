import express from 'express'
import { getBooks, getBook, getTitlesAndSubseries } from './database.js'
import { fileURLToPath } from 'url'
import path from 'path'


const app = express();
const __dirname = import.meta.dirname;
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));


// app.get('/', (req, res) => {
//   app.sendFile();  
// });

app.get('/books', async (req, res) => {
  const books = await getBooks();
  res.send(books);
});

//get singe note
app.get('/book/:id', async (req, res) => {  
    const id = req.params.id;
    const book = await getBook(id);  
    res.send(book); 
});

app.get('/subseries', async (req, res) => {
  const subseries = await getTitlesAndSubseries();
  res.send(subseries);
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!')
});

app.listen(8080, () => {
  console.log('server is running on port: 8080');
});