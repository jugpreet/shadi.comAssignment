import axios from 'axios';

export const getUsersInfo = async () => {
    const result = await axios.get("https://randomuser.me/api/")
    console.log(result?.data?.results)
    return result?.data?.results
}