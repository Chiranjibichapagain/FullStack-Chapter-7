import React from "react";
import { useParams } from "react-router-dom";

const Anecdote = ({ anecdotes }) => {
  const id = useParams().id;
  const anecdote = anecdotes.find((anecdote) => anecdote.id === id);
  return (
    <div>
      aa.....
      <h2>{anecdote.content}</h2>
      <span>has{anecdote.votes} votes.</span>
      <p>
        For more info see <a href={`${anecdote.info}`}>{anecdote.info}</a>{" "}
      </p>
    </div>
  );
};

export default Anecdote;
