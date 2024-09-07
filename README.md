[Postman API documentation](https://documenter.getpostman.com/view/8371510/2sA3sAh7dZ)

# Contact Management System

Built as a take-home assessment for KNOTAPI.com (New York), this contact management system is designed for managing and interacting with a list of contacts. It features real-time updates, allowing multiple users to interact with the contact list simultaneously.

## Features

- **Real-time Notifications:** Receive instant updates when contacts are modified by other users.
- **Contact Management:** Add, update, delete, and search contacts.
- **History Tracking:** View the historical changes made to contacts.

## Technologies

- **Frontend:** ReactJS with ContextAPI
- **Backend:** Laravel PHP
- **Real-time Updates:** Reverb WebSockets
- **Database:** MySQL (Docker)
- **Cache + WS cients:** Redis (Docker)
- **Containerization:** Docker and Docker Compose

## Directory Structure

- `backend/` - Contains the Laravel PHP backend code.
- `frontend/` - Contains the ReactJS frontend code.
- `docker-compose.yml` - Docker Compose file to set up and manage Docker containers.


## Installation

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/ankitmhatre/knotapitest.git
   cd knotapitest
   docker compose build
   docker compose up
