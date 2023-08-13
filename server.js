const express = require("express")
const PORT = 1212

const DB = require("./config/leagueDB")
const clubRouter = require("./routers/clubRouter")

const app = express()
app.use( express.json() );
app.use(clubRouter)

app.listen(PORT, (req, res) => {
    console.log(`server is listening to port ${PORT}`); 
})



