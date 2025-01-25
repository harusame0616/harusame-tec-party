import { render } from "@testing-library/react";
import { expect, test, vi } from "vitest";

import { SWRConfig } from "swr";
import { CommentListContainer } from "../comment-list-container";

const mocks = vi.hoisted(() => ({
  queryComments: vi.fn(),
}));

vi.mock("../../infrastractures/get-comments", () => ({
  queryComments: mocks.queryComments,
}));

test("読込中のときにローディングが表示される", () => {
  const screen = render(
    <SWRConfig value={{ dedupingInterval: 0 }}>
      <CommentListContainer articleSlug="test" />
    </SWRConfig>,
  );
  const loadingItem = screen.getByRole("listitem", { name: "読込中" });
  expect(loadingItem).toBeVisible();
});
