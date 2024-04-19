# Social Media Microservices

This repository contains a collection of microservices designed for a social media platform. Each microservice handles specific functionalities such as authentication, friendships, and posts.

## Microservices

### Authentication Service

This service handles user authentication and related functionalities.

- **Files:**
  - `.env`: Environment variables configuration file.
  - `config.js`: Configuration file for the Mongodb service.
  - `index.js`: Entry point of the authentication service.
  - `controller/`: Contains controllers for handling authentication and user-related operations.
  - `model/`: Contains the user model.
  - `routes/`: Contains routes for authentication and user operations.

- **Routes:**
  - `POST /signup`: Register a new user.
  - `POST /login`: Log in an existing user.

### Friendship Service

This service manages friendships between users.

- **Files:**
  - `.env`: Environment variables configuration file.
  - `config.js`: Configuration file for the Mongodb service.
  - `index.js`: Entry point of the friendship service.
  - `controller/`: Contains controllers for handling friendship-related operations.
  - `middleware/`: Contains middleware for authentication.
  - `model/`: Contains the friendship model.
  - `routes/`: Contains routes for managing friendships.
 
- **Routes:**
  - `POST /add-friend`: Add a new friend.
  - `GET /all-friend`: Retrieve all friends of a user.

### Post Service

This service handles posts made by users.

- **Files:**
  - `.env`: Environment variables configuration file.
  - `config.js`: Configuration file for the Mongodb service.
  - `index.js`: Entry point of the post service.
  - `controller/`: Contains controllers for handling post-related operations.
  - `middleware/`: Contains middleware for authentication.
  - `model/`: Contains the post model.
  - `routes/`: Contains routes for managing posts.
 
- **Routes:**
  - `POST /create-post`: Create a new post.
  - `GET /like/:postId`: Like a post.
  - `POST /add-comment`: Add a comment to a post.
  - `POST /delete-post/:postId`: Delete a post.


## Getting Started

To run each microservice locally, follow these steps:

1. Clone this repository.
2. Navigate to the each directory of the microservice.
3. Install dependencies using `npm install`.
4. Start the microservice using `npm start`.


