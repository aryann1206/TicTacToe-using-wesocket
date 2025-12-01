const exp = require("express");
let app =exp();
let v1Router = require("./httpserver");
app.use(exp.json());

app.use("/api/v1", v1Router);

app.listen(3000);