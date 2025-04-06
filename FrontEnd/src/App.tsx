import { Route, Routes } from "react-router-dom";
import Home from "./pages/main";
import SeansPage from "./pages/SeansPage";
import AddReserv from "./pages/AddReservation";
import Login from "./pages/Login";
import Register from "./pages/Register";
import EMain from "./pages/EmployMain";
import Movies from "./pages/Movies";
import Movie from "./pages/MoviePage";
import AddMovie from "./pages/AddMovie";
import Room from "./pages/Rooms";
import AddRoom from "./pages/AddRoom";
import EditRoom from "./pages/RoomPage";
import AddShow from "./pages/AddShow";
import EditShow from "./pages/EditShow";
import Checking from "./pages/Checking";
import Users from "./pages/Users";
import './App.css'

function App() {
    return (
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/seans/:id" element={<SeansPage />} />
        <Route path="/reservationForm" element={<AddReserv />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/main" element={<EMain />} />
            <Route path="/movies" element={<Movies />} />
            <Route path="/movie/:id" element={<Movie />} />
            <Route path="/movie/add" element={<AddMovie />} />
            <Route path="/rooms" element={<Room />} />
            <Route path="/rooms/add" element={<AddRoom />} />
            <Route path="/rooms/:id" element={<EditRoom />} />
            <Route path="/shows/add" element={<AddShow />} />
            <Route path="/shows/:id" element={<EditShow />} />
            <Route path="/check" element={<Checking />} />
            <Route path="/users" element={<Users />} />
    </Routes>
    )
}

export default App
