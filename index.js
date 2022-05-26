const express = require("express");
const app = express();
const cors = require("cors");

// routes
const mediumRoutes = require("./routes/mediumRoutes");

app.use(cors());

app.use(express.json());

app.use("/medium", mediumRoutes);

app.use("/public", express.static("public"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`server is listening on port ${PORT}`);
});
