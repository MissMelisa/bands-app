import React from "react";
import { screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { Home } from "pages";
import { renderWithProviders } from "utils/tests";

test("lists  bands", async () => {
  renderWithProviders(<Home />);

  screen.getByRole("heading", { name: /bands challenge/i });

  const bandsCards = await screen.findAllByRole("listbox");
  expect(bandsCards).toHaveLength(2);

  screen.getByRole("heading", { name: /kiss/i });
  screen.getByRole("heading", { name: /miranda/i });
});

test("sort  bands", async () => {
  renderWithProviders(<Home />);

  const buttonSortBy = screen.getByRole("button", { name: /sort by/i });

  userEvent.click(buttonSortBy);
  const sortByOption = screen.getByRole("option", {
    name: /country/i,
  });

  userEvent.click(sortByOption);

  const sortedBandsCards = await screen.findAllByRole("listbox");
  expect(
    within(sortedBandsCards[0]).getByRole("heading", { name: /Miranda/i })
  ).toHaveTextContent("Miranda");
});

test("filter  bands", async () => {
  renderWithProviders(<Home />);

  const buttonFilterBy = screen.getByRole("button", { name: /filter by/i });

  userEvent.click(buttonFilterBy);
  const FilterByOption = screen.getByRole("option", {
    name: /pop/i,
  });

  userEvent.click(FilterByOption);

  const bandsCards = await screen.findAllByRole("listbox");
  expect(bandsCards).toHaveLength(1);

  expect(screen.getByRole("heading", { name: /miranda/i })).toHaveTextContent(
    "Miranda"
  );
});
