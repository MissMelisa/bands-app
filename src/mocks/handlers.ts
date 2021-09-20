// src/mocks/handlers.js
import { rest } from "msw";

export const handlers = [
  rest.get("*/bands", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json([
        {
          id: 1,
          name: "Kiss",
          genreCode: "hard-rock",
          year: 1973,
          country: "United States",
          members: [],
        },
        {
          id: 2,
          name: "Miranda",
          genreCode: "pop",
          year: 2000,
          country: "Argentina",
          members: [],
        },
      ])
    );
  }),

  rest.get("*/bands/:id", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        id: 2,
        name: "Miranda",
        genreCode: "pop",
        year: 2000,
        country: "Argentina",
        members: [
          {
            name: "Ale Sergi",
          },
          {
            name: "Julieta Gattas",
          },
          {
            name: "Lolo Fuentes",
          },
          {
            name: "Nicolas Grimaldi",
          },
        ],
      })
    );
  }),

  rest.get("*:id/albums", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json([
        {
          id: 1,
          bandId: 1,
          name: "El disco de tu Corazon",
          year: 2007,
        },
        {
          id: 1,
          bandId: 1,
          name: "Souvenir",
          year: 2021,
        },
        {
          id: 1,
          bandId: 1,
          name: "Sin restricciones",
          year: 2004,
        },
      ])
    );
  }),
];
