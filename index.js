const { analize } = require("./logic");

const sintac = [
  "<var>",
  "<asign>",
  "<num>",
  "<distinct>",
  "<num>",
  "<term>",
  "<var>",
  "<equals>",
  "<num>",
  "<term>",
  "<var>",
  "<asign>",
  "<num>",
  "<equals>",
  "<num>",
  "<greather than>",
  "<num>",
  "<lower than>",
  "<var>",
  "<term>",
];

console.log(analize(sintac));
