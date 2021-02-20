import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent } from "@testing-library/react";
import Newblog from "./Newblog";

test("new blog creating", () => {
  const blog = {
    title: "testing title",
    author: "random author",
    url: "www.test.com",
  };

  const createBlog = jest.fn();
  const component = render(<Newblog createBlog={createBlog} />);
  const author = component.container.querySelector("#author");
  const title = component.container.querySelector("#title");
  const url = component.container.querySelector("#url");
  const form = component.container.querySelector('form')
 

  fireEvent.change(author, { 
    target: { value: blog.author } 
  })
  fireEvent.change(title, { 
    target: { value: blog.title} 
  })
  fireEvent.change(url, { 
    target: { value: blog.url } 
  })
  fireEvent.submit(form)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0]).toEqual(blog)
});
                                                                                                  