import { render, type RenderResult } from "@testing-library/react";
import { test as base, expect, vi } from "vitest";

import userEvent, { type UserEvent } from "@testing-library/user-event";
import { SWRConfig } from "swr";
import { CommentForm } from "../comment-form";

const mocks = vi.hoisted(() => ({
  postComment: vi.fn(),
}));

vi.mock("../../infrastractures/supabase", () => ({
  postComment: mocks.postComment,
}));

// eslint-disable-next-line vitest/expect-expect, vitest/valid-title
const test = base.extend<{ user: UserEvent; screen: RenderResult }>({
  // eslint-disable-next-line no-empty-pattern
  user: ({}, use) => {
    const user = userEvent.setup();
    return use(user);
  },
  // eslint-disable-next-line no-empty-pattern
  screen: ({}, use) => {
    const screen = render(
      <SWRConfig value={{ dedupingInterval: 0 }}>
        <CommentForm slug="test" />
      </SWRConfig>,
    );
    return use(screen);
  },
});

test("コメント投稿中は「コメントを投稿中」と表示される", async ({
  screen,
  user,
}) => {
  mocks.postComment.mockReturnValueOnce(new Promise(() => {}));

  await user.type(screen.getByRole("textbox", { name: "名前" }), "name");
  await user.type(screen.getByRole("textbox", { name: "本文" }), "text");
  await user.click(screen.getByRole("button", { name: "コメントを投稿" }));

  expect(
    screen.getByRole("button", { name: "コメントを投稿中" }),
  ).toBeInTheDocument();
});

test("名前と本文を最小文字数で投稿できる", async ({ user, screen }) => {
  mocks.postComment.mockReset();

  await user.type(screen.getByRole("textbox", { name: "名前" }), "a");
  await user.type(screen.getByRole("textbox", { name: "本文" }), "b");
  await user.click(screen.getByRole("button", { name: "コメントを投稿" }));

  expect(mocks.postComment).toBeCalledWith("test", "a", "b");
});

test("名前と本文を最大文字数で投稿できる", async ({ user, screen }) => {
  mocks.postComment.mockReset();

  const name = "a".repeat(20);
  const text = "b".repeat(1024);
  await user.type(screen.getByRole("textbox", { name: "名前" }), name);
  await user.type(screen.getByRole("textbox", { name: "本文" }), text);
  await user.click(screen.getByRole("button", { name: "コメントを投稿" }));

  expect(mocks.postComment).toBeCalledWith("test", name, text);
});
