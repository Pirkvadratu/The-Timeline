const express = require('express');
const app = express();
const timelineRoutes = require('./routes/timeline');

app.use('/', timelineRoutes);

app.listen(3000, () => {
    console.log('Server running on port 3000');
});