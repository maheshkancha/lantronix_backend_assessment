const app = require('./app');
const db = require('./db');

// const app = express();
const PORT = process.env.PORT || 3000;

// Connecting to MongoDB and listening for the request
db.connect().then(() => {
    app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));
});
