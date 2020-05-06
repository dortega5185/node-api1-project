const express = require("express");

const server = express();

server.use(express.json());

const shortid = require("shortid");

let users = [
  {
    id: shortid.generate(),
    name: "Jane Doe",
    bio: "Not Tarzan's Wife, another Jane",
  },
  {
    id: shortid.generate(),
    name: "Johnny Depp",
    bio: "Bad Boys bad boys, watcha gonna do",
  },
];

server.get("/", (req, res) => {
  res.json({ api: "Up and running!" });
});

server.get("/api/users", (req, res) => {
  // return an array of lessons (id, name)

  if (users) {
    res.json(users);
    res.status(200).json(users);
  } else {
    res
      .status(500)
      .json({ Error: "The users information could not be retrieved" });
  }
});

server.get("/api/users/:id", (req, res) => {
  let id = req.params.id;
  const findUser = users.find((user) => user.id == id);

  if (findUser) {
    res.status(200).json(findUser);
  }
  if (!findUser) {
    res
      .status(404)
      .json({ message: "The user with the specified ID does not exist." });
  } else {
    res
      .status(500)
      .json({ error: "The users information could not be retrieved. " });
  }
});

server.post("/api/users", (req, res) => {
  const userInfo = req.body;
  console.log("userInfo", userInfo);

  if (
    userInfo.name === undefined ||
    userInfo.bio === undefined ||
    userInfo.name === "" ||
    userInfo.bio === ""
  ) {
    res
      .status(400)
      .json({ Error: "Please provide name and bio for the user." });
  } else if (!userInfo) {
    res.status(500).json({
      Error: "There was an error while saving the user to the database.",
    });
  } else {
    users.push(userInfo);
    res.status(201).json(users);
  }
});

server.delete("/api/users/:id", (req, res) => {
  const id = req.params.id;

  users = users.filter((user) => user.id !== id);

  res.status(200).json(users);
});

server.listen(8000, () => console.log("\nAPI is up ==\n"));
