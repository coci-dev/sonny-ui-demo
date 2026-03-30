import { User } from '../models/user';

export const MOCK_USERS: User[] = [
  {
    id: 'u1',
    name: 'Walter White',
    email: 'heisenberg@lospolloshermanos.com',
    avatarUrl: 'https://i.pravatar.cc/150?u=walter',
    role: 'Tech Lead',
  },
  {
    id: 'u2',
    name: 'Jesse Pinkman',
    email: 'jesse@yeah-science.com',
    avatarUrl: 'https://i.pravatar.cc/150?u=jesse',
    role: 'Frontend Dev',
  },
  {
    id: 'u3',
    name: 'Tony Soprano',
    email: 'tony@badabing.com',
    avatarUrl: 'https://i.pravatar.cc/150?u=tony',
    role: 'Backend Dev',
  },
  {
    id: 'u4',
    name: 'Michael Scott',
    email: 'michael@dundermifflin.com',
    avatarUrl: 'https://i.pravatar.cc/150?u=michael',
    role: 'Product Manager',
  },
  {
    id: 'u5',
    name: 'Dwight Schrute',
    email: 'dwight@schrutefarms.com',
    avatarUrl: 'https://i.pravatar.cc/150?u=dwight',
    role: 'QA Engineer',
  },
  {
    id: 'u6',
    name: 'Gustavo Fring',
    email: 'gus@lospolloshermanos.com',
    avatarUrl: 'https://i.pravatar.cc/150?u=gus',
    role: 'Designer',
  },
];
