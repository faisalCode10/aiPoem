import axios from 'axios';

export async function fetchPoemData(obj) {
  console.log(JSON.stringify(obj));

  const apiUrl = 'https://us-central1-courseai-9b4f6.cloudfunctions.net/generatePoem';
  
  try {
    const response = await axios.post(apiUrl, JSON.stringify(obj), {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching poem data:', error);
    throw error;
  }
}
