import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';

export const useUser = () => {
  const [user, setUser] = useState(null);
                                                 
  const fetchUser = async () => {
    try {
      const token = Cookies.get('jwt');
  
      const response = await fetch('http://localhost:5000/profile', 
        {
          method: 'GET',
          headers: {
            'Authorization': 'Bearer ' + token
          }
        }
      );
  
      const data = await response.json();
      console.log(data);
      setUser(data);
    } catch (error) {
      console.error('Error fetch profile:', error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return { user };
};