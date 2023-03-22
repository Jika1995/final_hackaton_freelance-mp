import React, { useEffect } from "react";
import { useProfile } from "../contexts/ProfileContextProvider";
import { useUsers } from "../contexts/UsersContextProvider";
import UserCard from "../components/UserCard/UserCard";
import "../styles/UsersListPage.css";

const UsersListPage = () => {
  const { user, getCurrentUser } = useProfile();
  const { buyers, executants, getBuyers, getExecutants } = useUsers();

  useEffect(() => {
    getCurrentUser();
  }, []);

  useEffect(() => {
    getBuyers();
    getExecutants();
  }, []);

  return (
    <div className="users-page">
      <div className="users-page-list">
        {user?.is_buyer ? (
          <>
            {executants?.map((item) => (
              <UserCard key={item.id} item={item} />
            ))}
          </>
        ) : (
          <>
            {buyers?.map((item) => (
              <UserCard key={item.id} item={item} />
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default UsersListPage;
