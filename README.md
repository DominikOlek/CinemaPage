# CinemaPage
This project is a simple page for cinemas, made in React.js, Node.js and SQLite. GUI design is simple now and requires improvement in the future.

## User Roles

The system supports two user roles:
- **Employee**
- **Manager**

### Registration Process
- Users can create an account, which must be **approved by a manager**.
- During approval, the manager assigns the user's role.
- **Customers do not create accounts** — they purchase tickets as guests.

---

## Cinema Halls and Movies

### Cinema Halls
Cinema halls can be created and managed within the system. Each hall includes:
- Supported technologies: **3D, 4D, IMAX, ScreenX**
- Seating layout represented as a rectangular matrix:
  - `0` – available seat  
  - `1` – occupied seat  
  - `-1` – non-existent seat (e.g., for irregular layouts or aisles)

### Movies
Each movie contains the following attributes:
- **Language versions**: combinations of **audio language** and **subtitle language**
- **Age categories**:
  - `'All'`
  - `'Child'`
  - `'Teen'`
  - `'Adult'`
- **Genres**:
  - Stored in the database
  - Can be added or fetched using system methods
  - Genre IDs are used for assigning
- **Technologies**:
  - 3D, 4D, IMAX, ScreenX — determines which formats the movie supports

> **Note**: Languages (both audio and subtitles) are predefined in the database. Their IDs are used when creating language versions of movies.

---

## Screenings

A screening is a scheduled showing of a specific movie version in a selected hall.

When creating a screening:
- Provide **hall ID** and **movie version ID**
- The system checks:
  - **Compatibility** between the movie and hall technologies
  - **Time overlap** – ensuring the hall is free during the proposed screening time
- A **copy of the seating layout** from the selected hall is created and assigned to the screening, allowing independent seat reservations.

---

## Ticket Purchase

The ticket purchasing process includes:

1. The user selects seats — the system checks their availability (`0`).
2. The system calculates the **ticket price** on the server.
3. After a successful purchase, the system returns:
   - **Ticket ID** — required for verification
   - **Email address** — must be provided during checkout and is used by staff for ticket control

> The server stores the final price in the database.

## Run
In FrontEnd run:

    npm run dev
In BackEnd run:

    node Lab.js