
import axios from 'axios';

export default async function fetchData(req,res) {
  const apiUrl = 'https://api-football-v1.p.rapidapi.com/v3/teams';
  const searchCountry = req.query.eng|| 'default-value-if-not-present';
  const searchLeague = req.query.lea|| 'default-value-if-not-present';

  try {
    // リクエストのヘッダーにRapid APIキーを含める
    const response = await axios.get(apiUrl, {
      params: {
        league: searchLeague,
        season:"2023",
        country: searchCountry,
        
      },
      headers: {
        'X-RapidAPI-Key': 'ea55e722f8msh2fd3cb06768de2bp1d6537jsne9964b9d433e',
        'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
      }
    });
    res.status(200).json(response.data);
    // console.log(searchCountry)
      console.log(response.data.response)
    } catch (error) {
      console.error('Error fetching data:', error);
    } 
  };
