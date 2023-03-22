import React, { useEffect } from 'react';
import {useProfile} from '../contexts/ProfileContextProvider';
import { useUsers } from '../contexts/UsersContextProvider';
import UserCard from '../components/UserCard/UserCard';

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
                    <UserCard key={item.id} item={item}/>
                )) }
            </div>
        ) : (
            <div>
            <h1>List of buyers</h1>
            {buyers?.map(item => (
               <UserCard key={item.id} item={item}/>
            )) }
        </div>
        )}
    </div>
  )
}

export default UsersListPage