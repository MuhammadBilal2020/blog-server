import dotenv from "dotenv"
import express from "express"
import connectDB from "./src/db/index.js"
import cors from "cors"
import userRoutes from "./src/routes/users.route.js"
import blogRoutes from "./src/routes/blogs.route.js"


const app = express()

dotenv.config()
app.use(cors())
app.use(express.json());

app.use("/api/v1", userRoutes , blogRoutes);

app.get('/', (req, res) => {
  res.send('Blogginng web')
})



connectDB()

.then(() => {
    app.listen(process.env.PORT, () => {
        console.log(`Example app listening on port ${process.env.PORT}`)
      })
      
})

.catch((error) => {
    console.log(`connection failed ${error}`);
    
})



