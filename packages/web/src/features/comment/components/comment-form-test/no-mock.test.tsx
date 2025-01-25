import { render, type RenderResult } from "@testing-library/react";
import { expect, test as base } from "vitest";

import userEvent, { type UserEvent } from "@testing-library/user-event";
import { SWRConfig } from "swr";
import { CommentForm } from "../comment-form";

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

test("名前が未入力の場合エラーメッセージが表示される", async ({
  user,
  screen,
}) => {
  await user.type(screen.getByRole("textbox", { name: "本文" }), "text");
  await user.click(screen.getByRole("button", { name: "コメントを投稿" }));

  expect(screen.getByText("名前は必須です。")).toBeInTheDocument();
});

test("名前が20文字を超える場合、エラーメッセージが表示される", async ({
  screen,
  user,
}) => {
  await user.type(
    screen.getByRole("textbox", { name: "本文" }),
    "a".repeat(21),
  );
  await user.click(screen.getByRole("button", { name: "コメントを投稿" }));

  expect(screen.getByText("名前は必須です。")).toBeInTheDocument();
});

test("本文が未入力の場合エラーメッセージが表示される", async ({
  screen,
  user,
}) => {
  await user.type(screen.getByRole("textbox", { name: "名前" }), "name");
  await user.click(screen.getByRole("button", { name: "コメントを投稿" }));

  expect(screen.getByText("本文は必須です。")).toBeInTheDocument();
});

test("本文が1024文字を超える場合、エラーメッセージが表示される", async ({
  screen,
  user,
}) => {
  await user.type(screen.getByRole("textbox", { name: "名前" }), "name");
  await user.type(
    screen.getByRole("textbox", { name: "本文" }),
    "a".repeat(1025),
  );
  await user.click(screen.getByRole("button", { name: "コメントを投稿" }));

  expect(
    screen.getByText("本文は1024文字以内にしてください。"),
  ).toBeInTheDocument();
});
