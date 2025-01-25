import { render, waitFor } from "@testing-library/react";
import { http } from "msw";
import { expect, test } from "vitest";

import { SWRConfig } from "swr";
import { CommentListContainer } from "../comment-list-container";
import { server } from "@/mocks/server";

const endpoint = "http://127.0.0.1:24321/rest/v1/article";

test("コメントがあればすべてのコメントが表示される", async () => {
  server.resetHandlers();
  const comments = [
    {
      id: "9ec339c8-90a2-4743-8a56-908b322c5bac",
      text: "コメント1",
      name: "名前1",
      commented_at: "2024-07-01T22:51:57.092501+00:00",
    },
    {
      id: "73f2751f-b2ac-4d90-8a8c-8c1ce85bf5bf",
      text: "コメント2",
      name: "名前2",
      commented_at: "2024-07-01T23:51:57.092501+00:00",
    },
    {
      id: "ca2993aa-c219-403f-a212-b7db39e41150",
      text: "コメント3",
      name: "名前3",
      commented_at: "2024-07-02T23:51:57.092501+00:00",
    },
  ];

  server.use(
    http.get(endpoint, () => Response.json([{ article_comment: comments }])),
  );
  const screen = render(
    <SWRConfig value={{ dedupingInterval: 0 }}>
      <CommentListContainer articleSlug="test" />
    </SWRConfig>,
  );
  await waitFor(() => {
    expect(
      screen.queryByRole("listitem", { name: "読込中" }),
    ).not.toBeInTheDocument();
  });
  const [comment1, comment2, comment3] = screen.getAllByRole("listitem");

  expect(comment1).toHaveTextContent(comments[0].name);
  expect(comment1).toHaveTextContent(comments[0].text);
  expect(comment1).toHaveTextContent("2024-07-02 07:51");
  expect(comment2).toHaveTextContent(comments[1].name);
  expect(comment2).toHaveTextContent(comments[1].text);
  expect(comment2).toHaveTextContent("2024-07-02 08:51");
  expect(comment3).toHaveTextContent(comments[2].name);
  expect(comment3).toHaveTextContent(comments[2].text);
  expect(comment3).toHaveTextContent("2024-07-03 08:51");
});

test("コメントがないときに「コメントはありません」と表示される", async () => {
  server.resetHandlers();
  server.use(
    http.get(endpoint, () => Response.json([{ article_comment: [] }])),
  );

  const screen = render(
    <SWRConfig value={{ dedupingInterval: 0 }}>
      <CommentListContainer articleSlug="test" />
    </SWRConfig>,
  );

  await waitFor(() => {
    expect(screen.getByText("コメントはありません")).toBeInTheDocument();
  });
});

test("存在しない記事のときに「記事が見つかりません」と表示される", async () => {
  server.use(http.get(endpoint, () => Response.json([])));

  const screen = render(
    <SWRConfig value={{ dedupingInterval: 0 }}>
      <CommentListContainer articleSlug="test" />
    </SWRConfig>,
  );

  await waitFor(() => {
    expect(screen.getByText("記事が見つかりません")).toBeInTheDocument();
  });
});
