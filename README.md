Project Overview
SuGaR Media is a full-stack web application designed to provide users with a platform to access and stream media content from top companies like BBC, LBC Radio, ITV4, and more. The application allows users to sign up, sign in, and view a curated list of media streams, including past, current, and upcoming content.

The project leverages a ReactJS frontend, a Flask backend, and an SQLite database. This solution ensures a modern, efficient user experience and seamless streaming capabilities.

Features:
1 User Authentication: Secure sign-up and sign-in functionality for users.
2 Media Streaming: Access to a range of media streams from various top-tier companies.
3 Responsive Design: Built with mobile-first design principles for an optimal viewing experience across all devices.
4 Database Integration: An SQLite database to manage user data.

Tech Stack:
1 Frontend: ReactJS
2 Backend: Flask (Python)
3 Database: SQLite
4 UI Libraries: React Bootstrap & BlueprintJS 

Project Structure
Frontend
The Frontend folder contains all the ReactJS components and related assets.
Inside the UI folder, you will find all the frontend components that support the application’s functionality and user interface.
To run the frontend application locally, navigate to the FE-TECH-TEST/Frontend directory and run:

npm start
This will start the frontend server on your local machine.

Backend
The Backend folder contains the Flask server code that handles the application’s business logic and routes.
To run the backend server, navigate to the Backend directory and execute the following command:
bash
Copy
python main.py
This will start the Flask server and allow the frontend to connect with the backend.

Getting Started
Clone the repository:

git clone <repository_url>

Navigate to the Frontend directory and install dependencies:

cd FE-TECH-TEST/Frontend
npm install

Navigate to the Backend directory and install dependencies (if any):

cd Backend

pip install -r requirements.txt
Run the backend server:

python main.py
In another terminal window, start the frontend application:

cd FE-TECH-TEST/Frontend
npm start

Conclusion
This project aims to deliver a streamlined, user-friendly platform for accessing media content. The use of ReactJS, Flask, and SQLite ensures a lightweight and scalable solution that can be easily expanded with additional features in the future.
