import axios from 'axios';

export default async (req, res) => {
    const { searchQuery } = req.query;
    const apiUrl = 'https://api-football-v1.p.rapidapi.com/v3/teams';

    console.log(searchQuery);
    if (!searchQuery) {
        res.status(400).json({ message: '検査文字がありません' });
    }
    try {
        // リクエストのヘッダーにRapid APIキーを含める
        const response = await axios.get(apiUrl, {
            params: {
                search: searchQuery,
            },
            headers: {
                'X-RapidAPI-Key':
                    'ea55e722f8msh2fd3cb06768de2bp1d6537jsne9964b9d433e',
                'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com',
            },
        });
        res.status(200).json(response.data.response);
        console.log(response.data.response);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};
