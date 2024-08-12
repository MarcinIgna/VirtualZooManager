# Virtual Zoo Hologram Manager

Welcome to the Virtual Zoo Hologram Manager! This application allows you to manage holograms in a virtual zoo. You can view, add, edit, and delete holograms, with a user-friendly interface that provides real-time feedback on your actions.

## Features

- **View Holograms:** Display a list of all holograms in the virtual zoo with their details.
- **Add New Holograms:** Create new holograms with details such as name, weight, superpower, and extinct since.
- **Edit Holograms:** Update details of existing holograms.
- **Delete Holograms:** Remove holograms from the zoo.
- **Filter and Sort:** Easily filter and sort holograms by name, weight, superpower, and extinct since.
- **Real-Time Feedback:** Receive notifications for actions like creation, updating, and deletion of holograms.

## Tech Stack

- **Frontend:** React, React Router, React Toastify
- **Backend:** Django
- **Styling:** CSS
- **Routing:** React Router for navigation
- **Notifications:** React Toastify for user feedback

## Getting Started

### Prerequisites

- Node.js and npm installed on your machine.
- Python and pip installed on your machine.

### Installation

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/MarcinIgna/VirtualZooManager.git
   cd VirtualZooManager
   ```

2. **Set Up the Backend:**

   - create a `.env` file with the following content:

     ```plaintext
     SECRET_KEY=your_super_secret_key_here
     ```

   - Install the Python dependencies:

     ```bash
     pip install -r requirements.txt
     ```

   - Run the Django development server:

     ```bash
     python manage.py runserver
     ```

   - The backend will be available at `http://localhost:8000` (or whichever port Django is configured to use).

3. **Set Up the Frontend:**

   - Install the JavaScript dependencies:

     ```bash
     npm install
     ```

   - Run the React development server:

     ```bash
     npm start
     ```

   - The frontend will be available at `http://localhost:3000`.

## Folder Structure

- **`/src`**: Source code for the React application.
  - **`/components`**: React components for the application.
    - **`HologramList.js`**: Component to list all holograms.
    - **`HologramForm.js`**: Component to add or edit holograms.
  - **`/api`**: API functions to interact with the backend.
  - **`/styles`**: CSS files for styling.
  - **`App.js`**: Main application component and routing setup.
  - **`index.js`**: Entry point for the React application.

## API Endpoints

**Note:** The API server is not included in this repository. You need to set up a backend server with the following endpoints:

- `GET /api/holograms` - Fetch all holograms
- `POST /api/holograms` - Create a new hologram
- `GET /api/holograms/:id` - Fetch a hologram by ID
- `PUT /api/holograms/:id` - Update a hologram by ID
- `DELETE /api/holograms/:id` - Delete a hologram by ID

