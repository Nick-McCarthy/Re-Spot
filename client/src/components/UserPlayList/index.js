import React from 'react';
import { useState, useEffect } from 'react';
import ReviewForm from '../ReviewForm';
// import { Link } from 'react-router-dom';
import API from '../../utils/API';
// import axios from 'axios';

const UserPlayList = ({spotUser}) => {

  const [result, setResult] = useState({});
  // const [search, setSearch] = useState('');

  console.log(spotUser);

  const searchUser = (user) =>
    API.search(user)
      .then((res) => {
        console.log(res.data);
        setResult(res.data)
      })
      .catch((err) => console.log(err));

  useEffect(() => {
    searchUser(spotUser);
  }, []);

  const {public_playlists:playlists} = result;


  return (   
    <div>
      {
        (playlists?.length && spotUser) ? <div>
        {playlists.map( (playList) => (<div><iframe key={playList.uri.replace('spotify:playlist:','')} src={`https://open.spotify.com/embed/playlist/${playList.uri.replace('spotify:playlist:','')}?utm_source=generator`} allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
        <ReviewForm reviewId={playList.uri} />
        
        </div>
        ))}
        </div>  : (<h3>No playlist</h3>)
      }
    </div>
  );
};

export default UserPlayList;