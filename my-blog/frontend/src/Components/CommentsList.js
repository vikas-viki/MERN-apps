import React from "react";

export  const CommentsList = ({ comments }) => {
    return (
        <div className="shadow rounded px-8 pt-6 pb-8 mb-4">
            <h3 className="text-2xl font-bold mb-4">Comments</h3>
            {comments.map((comment, key) => (
                <div className="mb-4" key={key}>
                    <h4 className="font-bold">{comment.username}</h4>
                    <p>{comment.text}</p>
                </div>
            ))}
        </div>
    );
}