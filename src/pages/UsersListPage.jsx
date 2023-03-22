import React, { useEffect } from 'react';
import {useProfile} from '../contexts/ProfileContextProvider';
import { useUsers } from '../contexts/UsersContextProvider';

const UsersListPage = () => {

    const {user, getCurrentUser} = useProfile();
    const {buyers, executants, getBuyers, getExecutants} = useUsers();
    
    useEffect(() => {
        getCurrentUser();
    }, []);

    useEffect(() => {
        getBuyers();
        getExecutants();
    }, []);

  return (
    <div>
        {user?.is_buyer ? (
            <div>
                <h1>List of executants</h1>
                {executants?.map(item => (
                    <div key={item.id}>
                        <h2>{item.name}</h2>
                        <img src={item.profile_image} alt="error:(" />
                        <p>{item.bio}</p>
                        <h3>{item.ratings.rating__avg}</h3>
                    </div>
                )) }
            </div>
        ) : (
            <div>
            <h1>List of buyers</h1>
            {buyers?.map(item => (
                <div key={item.id}>
                    <h2>{item.name}</h2>
                    <img src={item.profile_image} alt="error:(" />
                    <p>{item.bio}</p>
                    <h3>{item.ratings.rating__avg}</h3>
                </div>
            )) }
        </div>
        )}
    </div>
  )
}

export default UsersListPage