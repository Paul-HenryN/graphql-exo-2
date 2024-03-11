import { GraphQLError } from "graphql";
import { getClosestColor } from "./colors.js";
import { Resolvers } from "./types.js";

export const resolvers: Resolvers = {
  Query: {
    divide: (parent, { number1, number2 }, context, info) => {
      if (number2 === 0) {
        throw new GraphQLError("cannot divide by 0");
      }
      return number1 / number2;
    },
    multiply: (parent, { number1, number2 }, context, info) =>
      number1 * number2,
    closestColor: (parent, { hexa }) => {
      if (!hexa.match(/^#[0-9a-fA-F]{6}/)) {
        throw new GraphQLError(`${hexa} does not match a color pattern`);
      }
      return getClosestColor(hexa, ["#FF5733", "#33FF57", "#3357FF"]);
    },
    getTracks: (_, __, { dataSources }) => {
      return dataSources.trackAPI.getTracks();
    },
    getFilms: (_, __, { dataSources }) => {
      return dataSources.ghibliAPI.getFilms();
    },
    getPeople: (_, __, { dataSources }) => {
      return dataSources.ghibliAPI.getPeople();
    },
  },
  Track: {
    author: (parent, _, { dataSources }) => {
      return dataSources.trackAPI.getAuthorBy(parent.authorId);
    },
  },
  Film: {
    people: (parent, _, { dataSources }) => {
      return;
    },
  },
};
