import axios from "axios";

interface User {
  id: string;
  email: string;
  verified_email: boolean;
  name: string;
  given_name: string;
  picture: string;
  locale: string;
}

async function getGoogleUser({ id_token, access_token }: {id_token: string, access_token: string}): Promise<User> {
  const url = "https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=";

  try {
    const { data } = await axios.get<User>(`${url}${access_token}`, {
      headers: {
        Authorization: `Bearer ${id_token}`
      }
    });
  
    return data;
  } catch (err: any) {
    console.error(err, 'Error fetching Google user');
    throw new Error(err.massage);
  }
}