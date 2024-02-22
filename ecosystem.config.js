module.exports = {
    apps: ["backend", "bot", "web"].map((name) => ({ name, cwd: `./${name}`, script: "npm start" })),
};
