import apiAdress from "../main";
import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Container,
  Typography,
} from "@mui/material";
import Spinner from "react-activity/dist/Dots";
import "../assets/viewEvents.css";

function SponthanList() {
  const [events, setEvents] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const sponthanResponse = await fetch(apiAdress + "/api/events");
        if (!sponthanResponse.ok) {
          throw new Error("Failed to fetch categories.");
        }
        const sponthanData = await sponthanResponse.json();
        setEvents(sponthanData);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);
  return events ? (
    events.map((element) => (
      <Card
        id={element.id}
        className="eventCard"
        style={{
          width: "400px",
          margin: "10px",
        }}
      >
        <CardHeader
          title={element.name}
          subheader={new Date(element.date).toLocaleString()}
        />
        <CardMedia component="img" height="194" image={element.image.image} />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {element.description}
          </Typography>
        </CardContent>
      </Card>
    ))
  ) : (
    <Spinner />
  );
}

export default function Viewevents() {
  return (
    <Container style={{ minWidth: "400px", marginTop: "40px" }}>
      <SponthanList style={{ width: "400px" }} />
    </Container>
  );
}
