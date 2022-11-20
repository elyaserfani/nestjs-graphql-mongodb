# Simple Nest.js GraphQL Backend With MongoDB

## Installation :

```
docker-compose up -d
yarn install
yarn start
```

---

## Queries and Mutations :

</br>

Go to GraphQL playground in `http://localhost:3000/graphql`

</br>

### Create :

`mutation{ createUser(createUserInput:{ firstName:"Elyas", lastName:"Erfani", email:"elyaserfani2@gmail.com", role:"User" }){ _id firstName lastName email role } }`

</br>

### Find :

`query{ user(_id:"id"){ firstName lastName email role } }`

</br>

### Find All With Pagination :

`query{ users(listUsersInput:{limit:1000,offset:0}){ firstName lastName email role } }`

</br>

### Update :

`mutation{ updateUser(updatUserInput:{ firstName:"Elyas", lastName:"Erfani", email:"elyaserfani2@gmail.com", role:"User" }){ _id firstName lastName email role } }`

</br>

### Delete :

`mutation{ removeUser(_id:"id"){ _id } } `
