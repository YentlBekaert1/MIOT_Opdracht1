import path from 'path'
import express from 'express'

const activityRoutes = require('../api/routes/activities');

const app = express(),
            DIST_DIR = __dirname,
            HTML_FILE = path.join(DIST_DIR, 'index.html')
            
app.use(express.static(DIST_DIR))
app.get('/', (req, res) => {
    res.sendFile(HTML_FILE)
})
app.get("/get", (req, res) => {
    res.json("test");
})
app.get("/calendar", (req, res) => {
    res.sendFile(HTML_FILE)
})
app.get("/foodcorner", (req, res) => {
    res.sendFile(HTML_FILE)
})
app.get("/weather", (req, res) => {
    res.sendFile(HTML_FILE)
})
app.get("/performances", (req, res) => {
    res.sendFile(HTML_FILE)
})
app.use('/activities', activityRoutes);

const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
    console.log(`App listening to ${PORT}....`)
    console.log('Press Ctrl+C to quit.')
})




