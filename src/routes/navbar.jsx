import "../assets/navbar.css";

export default function Navbar() {
  return (
    <nav className="navigation">
      <div className="navigation-menu">
        <a href="/routes/home">
          <button className="navbtn">Home</button>
        </a>
        <a href="/routes/viewEvents">
          <button className="navbtn">View Events</button>
        </a>
        <a href="/routes/addEventForm">
          <button className="navbtn">Add Event</button>
        </a>
      </div>
    </nav>
  );
}
