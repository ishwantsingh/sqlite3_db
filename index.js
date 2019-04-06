const express = require("express");
const knex = require("knex");
const app = express();

const db = knex({
  client: "sqlite",
  useNullAsDefault: true,
  connection: {
    filename: "./data/snowydb3.db"
  }
});

app.use(express.json());

// end points that deal with roles (instructor etc)
// getallRoles [GET] /api/roles
//getRolesById [GET] /api/roles/:id
//updateRolesById [PUT] /api/roles/:id
//addRole [POST] /api/roles
//deleteRolesById /api/roles/:id

// getallRoles [GET] /api/roles
app.get("/api/roles", async (req, res) => {
  try {
    const allRoles = await db("roles");
    // const result = await db("roles")
    //   .select("name")
    //   .first();

    res.json(allRoles);
  } catch (error) {
    res.status.apply(500).json({ error });
  }
});
//getRolesById [GET] /api/roles/:id
app.get("/api/roles/:id", async (req, res) => {
  try {
    const roleById = await db("roles").where({ id: req.params.id });
    if (roleById.length) {
      res.json(roleById);
    } else {
      res.status(404).json({ error });
    }
  } catch (error) {
    res.status(500).json({ error });
  }
});
//updateRolesById [PUT] /api/roles/:id
app.put("/api/roles/:id", (req, res) => {
  res.json({ message: "[PUT] /api/roles/:id" });
});
//addRole [POST] /api/roles
app.post("/api/roles", (req, res) => {
  res.json({ message: "[POST] /api/roles" });
});
//deleteRolesById /api/roles/:id
app.delete("/api/roles/:id", (req, res) => {
  res.json({ message: "[DELETE] /api/roles/:id" });
});

app.listen(5000, () => console.log("Listening on port 5000"));
