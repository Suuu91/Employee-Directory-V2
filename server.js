const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.json())

app.get("/", (req, res) => {
  res.send("Hello employees!");
});

const employees = require("./employees");

app.use(`/employees`,require(`./api/employees-router.js`))

app.use((req, res, next) => {
  next({status:404, message: `we couldn't find the endpoint ${req.originalUrl}`})
})

app.use((err,req,res,next) => {
  console.error(err)
  res.send(err.message ?? `error`)
  res.status(err.status ?? 500)
})

app.listen(PORT, () => {
  `Listening on port ${PORT}...`;
});
