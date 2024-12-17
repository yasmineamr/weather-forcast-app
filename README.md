# Weather App

## Task Overview

This task involves setting up a backend application with Docker, implementing user authentication, and integrating caching for an external weather API.

## Instructions

### 1. Clone the Repository

Start by cloning the repository to your local machine.


### 2. Set Up the Application

You will be using Docker to build and run the application. Follow these steps:

- **Build the Docker images:**

  ```bash
  docker-compose build
  ```

- **Start the application:**

  ```bash
  docker-compose up
  ```

### 3. Running Tests

To run the test cases for the application, use the following commands:

- **Enter the container as the root user:**

  ```bash
  docker exec -it -u 0 nest-app /bin/sh
  ```

- **Run the test case for the user controller:**

  ```bash
  npm test /src/user/user.controller.spec.ts
  ```

## API Endpoints
All endpoints are found in the repo in a postman collection.
To start using the endpoints, you need to create a new account first:

### 1. Create a New User
- **Endpoint**: `POST localhost:5000/auth/signup`
- **Description**: Creates a new user account.

### 2. Login
- **Endpoint**: `POST localhost:5000/auth/login`
- **Description**: Logs in a user and returns a token.
- **Request**: The body should include a `username` and `password`.

### 3. Use the Token for Authenticated Requests
- After logging in, you will receive a token in the response.
- Add this token to the `Authorization` header in subsequent requests to access protected routes.

## Improvements & Future Enhancements

There are several improvements that I wanted to implement but didn't have time to complete:

1. **Rate Limiting with Redis**  
   Implement Redis-based caching for rate limiting.

2. **Expand Test Coverage**  
   While I've added test cases for the user controller, additional tests should be written for other application parts.

3. **Weather API Caching with TTL**  
   Implement a TTL for weather API responses, caching data until the end of the day, after which it expires.  
   - Only the temperature data would be cached, not the entire weather API response.

4. **Validation and Error Handling**  
   Improve validation and error handling for all API endpoint payloads and query parameters.

5. **Environment Variables**  
   Move from direct `process.env` access to using a configuration file to define all environment variables.

6. **GraphQL Integration**  
   Add a GraphQL layer to allow flexible querying of user and weather data.
