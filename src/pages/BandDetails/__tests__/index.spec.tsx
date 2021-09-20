import { screen, within } from "@testing-library/react";
import { BandDetails } from "pages";
import { renderWithProviders } from "utils/tests";

test("band's details", async () => {
  renderWithProviders(<BandDetails />);

  const title = await screen.findByRole("heading", { name: /miranda/i });
  expect(title).toBeVisible();

  const subTitleMember = await screen.findByRole("heading", {
    name: /members/i,
  });
  expect(subTitleMember).toBeVisible();

  const membersList = screen.getByRole("listbox", { name: "Members" });

  expect(within(membersList).getAllByRole("listitem")).toHaveLength(4);

  const albumsList = screen.getByRole("listbox", { name: "Albums" });
  expect(within(albumsList).getAllByRole("listitem")).toHaveLength(3);
});
