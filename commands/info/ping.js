module.exports = (program) => {
  return program
    .command("ping")
    .arguments("[str...]")
    .description("simple ping command")
    .action((str) => {
      console.log("msg: " + (str.join(" ") || "pong!"));
      process.exit(1);
    });
};
