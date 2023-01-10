import { rest } from "msw";
import { setupServer } from "msw/node";
import { render, screen, waitForElementToBeRemoved } from "@testing-library/react";
import { Home } from ".";
import userEvent from "@testing-library/user-event";

const handlers = [
	rest.get("*jsonplaceholder.typicode.com*", async (req, res, ctx) => {
		return res(
			ctx.json([
				{
					userId: 1,
					id: 1,
					title: "title 1",
					body: "body 1",
					url: "img1.jpg"
				},
				{
					userId: 2,
					id: 2,
					title: "title 2",
					body: "body 2",
					url: "img2.jpg"
				},
				{
					userId: 3,
					id: 3,
					title: "title 3",
					body: "body 3",
					url: "img3.jpg"
				}
			])
		);
	})
];

const server = setupServer(...handlers);

describe("<Home />", () => {
	beforeAll(() => {
		server.listen();
	});

	afterEach(() => server.resetHandlers());

	afterAll(() => {
		server.close();
	});

	it("should render search, post and load more", async () => {
		render(<Home />);
		const noMorePosts = screen.getByText("Não existem posts =(");

		expect.assertions(3);

		await waitForElementToBeRemoved(noMorePosts);

		const search = screen.getByPlaceholderText(/type your search/i);

		expect(search).toBeInTheDocument();

		const images = screen.getAllByRole("img", { name: /title/i });

		expect(images).toHaveLength(2);

		const button = screen.getByRole("button", { name: /load more posts/i });

		expect(button).toBeInTheDocument();
	});

	it("should search for posts", async () => {
		render(<Home />);
		const noMorePosts = screen.getByText("Não existem posts =(");

		expect.assertions(10);

		await waitForElementToBeRemoved(noMorePosts);

		const search = screen.getByPlaceholderText(/type your search/i);

		expect(screen.getByRole("heading", { name: "title 1" })).toBeInTheDocument();
		expect(screen.getByRole("heading", { name: "title 2" })).toBeInTheDocument();
		expect(screen.queryByRole("heading", { name: "title 3" })).not.toBeInTheDocument();

		userEvent.type(search, "title 1");

		expect(screen.getByRole("heading", { name: "title 1" })).toBeInTheDocument();
		expect(screen.queryByRole("heading", { name: "title 2" })).not.toBeInTheDocument();
		expect(screen.queryByRole("heading", { name: "title 3" })).not.toBeInTheDocument();
		expect(screen.getByRole("heading", { name: "title 1" })).toBeInTheDocument();

		userEvent.clear(search);

		expect(screen.getByRole("heading", { name: "title 1" })).toBeInTheDocument();
		expect(screen.getByRole("heading", { name: "title 2" })).toBeInTheDocument();

		userEvent.type(search, "posts does not exist");

		expect(screen.getByText("Não existem posts =(")).toBeInTheDocument();
	});

	it("should load more posts when click in button 'load more posts'", async () => {
		render(<Home />);
		const noMorePosts = screen.getByText("Não existem posts =(");

		expect.assertions(2);

		await waitForElementToBeRemoved(noMorePosts);

		const button = screen.getByRole("button", { name: /load more posts/i });

		userEvent.click(button);
		expect(button).toBeDisabled();
		expect(screen.getByRole("heading", { name: "title 3" })).toBeInTheDocument();
	});
});
