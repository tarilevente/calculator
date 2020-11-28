import axios from 'axios';

const instance = axios.create({
    baseURL:'https://calculator-91f65.firebaseio.com/'
});
instance.defaults.headers.common['Authorization']='AUTH TOKEN INSTANCE'; //ez mire jó?
instance.defaults.headers.post['Content-Type']='application/json'; 

export default instance;