import React from 'react';

// Import the `useParams()` hook
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import CommentList from '../components/CommentList';
import CommentForm from '../components/CommentForm';
import ReviewList from '../components/ReviewList';

import { QUERY_SINGLE_REVIEW } from '../utils/queries';
const SingleReview = () => {
  // Use `useParams()` to retrieve value of the route parameter `:profileId`
  const { reviewId } = useParams();

  const { loading, data } = useQuery(QUERY_SINGLE_REVIEW, {
    // pass URL parameter
    variables: { reviewId: reviewId },
  });

  const review = data?.review || {};

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="my-3">
      <h3 className="card-header bg-dark text-light p-2 m-0">
        {review.reviewAuthor} <br />
        <span style={{ fontSize: '1rem' }}>
          had this review on {review.createdAt}
        </span>
      </h3>
      <div className="bg-light py-4">
        <blockquote
          className="p-4"
          style={{
            fontSize: '1.5rem',
            fontStyle: 'italic',
            lineHeight: '1.5',
          }}
        >
          <p>{review.reviewText}</p>
        </blockquote>
      </div>

      <div className="my-5">
        <CommentList comments={review.comments} />
      </div>
      <div className="m-3 p-4" style={{}}>
        <CommentForm reviewId={review._id} />
      </div>
    </div>
  );
};

export default SingleReview;
