import axios from 'axios';

// 
const search = async (spotUser) => {
     return axios({
        method: 'GET',
        url: 'https://spotify23.p.rapidapi.com/user_profile/',
        headers: {
            'X-RapidAPI-Key': process.env.REACT_APP_RAPIDAPI_KEY,
            'X-RapidAPI-Host': 'spotify23.p.rapidapi.com'
        },
        params: {
            id: `${spotUser}`, playlistLimit: '10', artistLimit: '10'
        },
    })
}

export default { search };

// Export an object with a "search" method that searches the Giphy API for the passed query