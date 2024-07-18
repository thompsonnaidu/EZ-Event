import {gql} from "@apollo/client";


export const LOGIN_USER = gql`
    query login($email:String!,$password:String!){
        login(email:$email,password:$password){
            userId
            token
            tokenExpiration
        }
    }
 `;

export const GET_EVENTS = gql`
query {
  events{
    _id
    title
    price
    date
    description
    creator{
      _id
      email
    }
  }
}`;

export const GET_BOOKINGS = gql`
query {
  bookings{
    _id
    event{
      _id
      title
      price
      date
      description
    }
    user{
      _id
      email
    }
  }
}`;

