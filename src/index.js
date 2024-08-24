import express from "express"
import cors from "cors"
import dotenv from "dotenv"
const app = express()

app.use(cors())
dotenv.config()
app.use(express.json())

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, () => console.log(`Server running on port ${PORT}`)))
  .catch((error) => console.log(error.message));



app.listen(3000, () => console.log("Server running on port 3000"))