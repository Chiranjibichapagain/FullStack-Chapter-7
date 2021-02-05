import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent } from "@testing-library/react";
import Blog from "./Blog";

test("render only title and author as default", () => {
  const blog = {
    title: "testing title",
    author: "random author",
    likes: 0,
    url: "www.test.com",
  };

  const component = render(<Blog blog={blog} />);

  expect(component.container).toHaveTextContent(
    "Deltesting title | | random authorview more"
  );
});

test("render shows all details when view more is clicked", () => {
  const blog = {
    title: "testing title",
    author: "random author",
    likes: 0,
    url: "www.test.com",
  };
 
  const component = render(<Blog blog={blog}  />);
  const button = component.getByText("view more");
  fireEvent.click(button);

  
  expect(component.container).toHaveTextContent(
    "DelTitle: testing title Author: random author Likes: 0 like Url: www.test.comhide"
  );
});

test("if like buttton clicked twice, props is called twice", () => {
  const blog = {
    title: "testing title",
    author: "random author",
    likes: 0,
    url: "www.test.com",
  };

  const mockHandler = jest.fn();

  const component = render(<Blog blog={blog} handleLikes={mockHandler} />);
  const viewButton = component.getByText("view more");
  fireEvent.click(viewButton);
  const likeButton = component.getByText("like");
  fireEvent.click(likeButton);
  fireEvent.click(likeButton);

  expect(mockHandler.mock.calls).toHaveLength(2);
});
