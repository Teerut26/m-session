export interface RoomFirebaseInterface {
  name: string;
  owner: string;
  password: string;
  users: User[];
  musicQueue: Music[];
  currentMusic: Music | null;
  id: string;
}

export interface Music {
  id: string;
  title: string;
}

export interface User {
  id: string;
  image: string;
  name: string;
}
