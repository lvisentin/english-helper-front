import { useEffect, useState } from 'react';
import { userService } from '../services/user/UserService';
import { User } from '../services/user/UserService.model';

export const useCurrentUser = () => {
  const [currentUser, setCurrentUser] = useState<User>({
    _id: '',
    email: '',
    name: '',
    createdAt: '',
    updatedAt: '',
    plan: '',
    referralCode: '',
  });
  useEffect(() => {
    userService
      .getCurrentUser()
      .then(({ data: { user } }) => setCurrentUser(user));
  }, []);

  return currentUser;
};
