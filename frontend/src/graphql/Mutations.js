



import {gql} from "@apollo/client";


export const BOOK_EVENT = gql`
    mutation bookEvent($eventId:ID!,$userId:ID!){
        bookEvent(eventId:$eventId,userId:$userId){
            _id
            event{
                _id
            }
            user{
                _id
            }
            createdAt
            updatedAt
        }
    }
 `;


export const CREATE_USER=gql`
    mutation createUser($user:UserInput!){
        createUser(user:$user){
          email
          password
        }
    }`
export const CREATE_EVENT= gql`
    mutation createEvent($event:EventInput!){
        createEvent(event:$event){
            _id
            title
            price
            date
            description
            creator {
            _id
            email
            }
        
        }
    }
`

export const CANCEL_BOOKING=gql`
    mutation cancelBooking($bookingID:ID!){
        cancelBooking(bookingID:$bookingID){
            _id
            title
            description
            price
            date
        }
    }
`