import axios from 'axios';


const testHttpConnection = async () => {
    // try {
    //     const response = await axios.get('http://127.0.0.1:8000/api/user');
    //     console.log('Connection successful:', response.data);
    // } catch (error) {
    //     console.error('Connection failed:', error);
    // }
    try {
        const response = await axios.post('http://127.0.0.1:8000/api/user/', {
            "email": "benboben1002@gmail.com",
            "name": "Ben Boben",
            "age": 0,
            "weight": 0,
            "height": 0,
            "gender": "male",
            "activity_level": "sedentary",
            "goal": "lose",
            "target_weight": 0
          });
        console.log('Connection successful:', response.data);
    } catch (error) {
        console.error('Connection failed:', error);
    }
};

testHttpConnection();