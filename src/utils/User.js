class User {
  constructor(name, lastname, email, favorites) {
    this.name = name;
    this.lastname = lastname;
    this.email = email;
    this.favorites = favorites;
  }
  toString() {
    return this.name + ", " + this.lastname;
  }
}

// Firestore data converter
const userConverter = {
  toFirestore: (user) => {
    return {
      name: user.name,
      lastname: user.lastname,
      email: user.email,
      favorites: user.favorites,
    };
  },
  fromFirestore: (snapshot, options) => {
    const data = snapshot.data(options);
    return new User(data.name, data.lastname, data.email, data.favorites);
  },
};

export { User, userConverter };
