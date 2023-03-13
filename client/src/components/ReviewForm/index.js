import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { ADD_REVIEW} from '../../utils/mutations';

import { QUERY_REVIEWS, QUERY_ME } from '../../utils/queries';

import Auth from '../../utils/auth';

import './ReviewForm.css';

const ReviewForm = () => {
  console.log({reviewId: prop?.reviewId})

  const [reviewText, setReviewText] = useState('');

  const [characterCount, setCharacterCount] = useState(0);

  const [addReview, { error }] = useMutation(ADD_REVIEW, {
    update(cache, { data: { addReview } }) {
      try {
        const { reviews } = cache.readQuery({ query: QUERY_REVIEWS });

        cache.writeQuery({
          query: QUERY_REVIEWS,
          data: { reviews: [addReview, ...reviews] },
        });
      } catch (e) {
        console.error(e);
      }
      cache.writeQuery({
        query: QUERY_ME,
        data: { me: addReview },
      });
    },
  });



  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await addReview({
        variables: {
          reviewText,
          reviewAuthor: Auth.getProfile().data.username,
        },
      });
      setReviewText('');
    } catch (err) {
      console.error(err);
    }
  };


  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === 'reviewText' && value.length <= 280) {
      setReviewText(value);
      setCharacterCount(value.length);
    }
  };

  return (
    <div className="review-form">
      <h3>What do you think about this?</h3>

      {Auth.loggedIn() ? (
        <>
          <p
            className={`m-0 ${characterCount === 280 || error ? 'text-danger' : ''
              }`}
          >
            Character Count: {characterCount}/280 
          </p>
          <form
            className="flex-row justify-center justify-space-between-md align-center"
            onSubmit={handleFormSubmit}
          >
            <div className="col-12 col-lg-9">
              <textarea
                name="reviewText"
                placeholder="Here's a new review..."
                value={reviewText}
                className="form-input w-100"
                style={{ lineHeight: '1.5', resize: 'vertical', border: '1px solid grey', backgroundColor: '#f7f7f7' }}
                onChange={handleChange}
              ></textarea>
            </div>

            <div className="col-12 col-lg-3">
              <button className="btn btn-primary btn-block py-3 add-review-btn" type="submit" style={{border : 'blue' , backgroundColor: 'green'}}>
                Add review
              </button>
            </div>
            {error && (
              <div className="col-12 my-3 bg-danger text-white p-3">
                {error.message}
              </div>
            )}
          </form>
        </>
      ) : (
        <p>
          You need to be logged in to share your review. Please{' '}
          <Link to="/login" style={{ color: 'lightgreen'}}>login</Link>
          
          {' '}or{' '}
          
          <Link to="/signup" style={{ color: 'lightgreen'}}>signup.</Link>
        </p>
      )}
    </div>
  );
};

export default ReviewForm;
