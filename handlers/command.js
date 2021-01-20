const { readdirSync } = require("fs");

// const ascii = require("ascii-table");

// let table = new ascii("Commands");
// table.setHeading("Command", "Load status");

module.exports = (program) => {
  readdirSync("./commands/").forEach((dir) => {
    const commands = readdirSync(`./commands/${dir}/`).filter((file) =>
      file.endsWith(".js")
    );

    for (let file of commands) {
      let pull = require(`../commands/${dir}/${file}`);
      try {
        program.addCommand(pull(program));
        // table.addRow(file, "🟢");
      } catch (err) {
        // table.addRow(file, "🔴");
        console.error(err);
      }
    }
  });

  // console.log(table.toString());
};
