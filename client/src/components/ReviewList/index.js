import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from'reactstrap';
import {REMOVE_REVIEW } from '../../utils/mutations';
import { useMutation } from '@apollo/client';

import { QUERY_REVIEWS, QUERY_ME } from '../../utils/queries';



const ReviewList = ({
  reviews,
  title,
  showTitle = true,
  showUsername = true,
}) => {


  const [removeReview] = useMutation(REMOVE_REVIEW, {
    update(cache, { data: { removeReview } }) {
      try {
        const { reviews } = cache.readQuery({ query: QUERY_REVIEWS });
  
        cache.writeQuery({
          query: QUERY_REVIEWS,
          data: { reviews: [removeReview, ...reviews] },
        });
      } catch (e) {
        console.error(e);
      }
      try{
        cache.writeQuery({
          query: QUERY_ME,
          data: { me: removeReview },
        });
      } catch (e){
        console.error(e);
      }
      
    },
  });
  
  const handleRemoveReview = async (reviewId) => {
    //event.preventDefault();
      //const {reviewId} = event.target;
      console.log(`handleRemoveReview clicked! ${reviewId}`);
      try {
        const { data } = await removeReview({
          variables: {
            reviewId
            },
            });
  
        // setReviewText('');
      } catch (err) {
        console.error(err);
      }
    };


  if (!reviews.length) {
    return <h3></h3>;
  }

  return (
    <div>
      {showTitle && <h3>{title}</h3>}
      {reviews &&
        reviews.map((review) => (
          <div key={review._id} className="card mb-3">
            <h4 className="card-header bg-primary text-light p-2 m-0">
              {showUsername ? (
                <Link
                  className="text-light"
                  to={`/profiles/${review.reviewAuthor}`}
                >
                  {review.reviewAuthor} <br />
                  <span style={{ fontSize: '1rem' }}>
                    had this review on {review.createdAt}
                  </span>
                </Link>
              ) : (
                <>
                  <span style={{ fontSize: '1rem' }}>
                    You had this review on {review.createdAt}
                  </span>
                </>
              )}
            </h4>
            <div className="card-body bg-light p-2">
              <p>{review.reviewText}</p>
            </div>
            <Link
              className="btn btn-primary btn-block btn-squared"
              to={`/reviews/${review._id}`}
            >
              Join the discussion on this review.
            </Link>
            <Button color="primary" onClick={()=>handleRemoveReview(review._id)}>
              Remove Review
            </Button>
          </div>
        ))}
    </div>
  );
};

export default ReviewList;