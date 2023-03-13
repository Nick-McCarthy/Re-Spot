import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';

import Auth from '../utils/auth';

import './Signup.css'

const Signup = () => {
  const [formState, setFormState] = useState({
    username: '',
    spotUser:'',
    email: '',
    password: '',
  });
  const [addUser, { error, data }] = useMutation(ADD_USER);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);

    try {
      const { data } = await addUser({
        variables: { ...formState },
      });

      Auth.login(data.addUser.token);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <main className="flex-row justify-center mb-4" >
      <div className="col-12 col-lg-10" >
        <div className="card" style={{backgroundImage: 'linear-gradient(green,black)', borderRadius:'5px'}}>
          <h4 className="card-header bg-dark text-light p-2" style={{textAlign: 'center'}}>Sign Up</h4>
          <div className="card-body">
            {data ? (
              <p>
                Success! You may now head{' '}
                <Link to="/">back to the homepage.</Link>
              </p>
            ) : (
              <form onSubmit={handleFormSubmit} >
                <input
                  className="form-input"
                  placeholder="Your username"
                  name="username"
                  type="text"
                  value={formState.name}
                  onChange={handleChange}
                  style= {{
                    backgroundColor:'#92e6a7',
                 }}
                />
                <input
                  className="form-input"
                  placeholder="Your Spotify username"
                  name="spotUser"
                  type="text"
                  value={formState.spotUser}
                  onChange={handleChange}
                />
                <input
                  className="form-input"
                  placeholder="Your email"
                  name="email"
                  type="email"
                  value={formState.email}
                  onChange={handleChange}
                  style= {{backgroundColor:'#92e6a7'}}
                />
                <input
                  className="form-input"
                  placeholder="******"
                  name="password"
                  type="password"
                  value={formState.password}
                  onChange={handleChange}
                  style= {{backgroundColor:'#92e6a7'}}
                />
                <button
                  className="btn btn-block btn-primary"
                  idName='submitButton'
                  style={{ cursor: 'pointer'}}
                  type="submit"
                >
                  Submit
                </button>
              </form>
            )}

            {error && (
              <div className="my-3 p-3 bg-danger text-white">
                {error.message}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Signup;
