import apiAdress from "../main";
import React, { useEffect, useState } from "react";
import {
  TextField,
  Button,
  Container,
  Grid,
  Typography,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import {
  LocalizationProvider,
  DateTimePicker,
  TimeField,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { FaUpload } from "react-icons/fa";

export default function Addeventform() {
  const [categories, setCategories] = useState([]);
  const [eventDuration, setEventDuration] = React.useState(dayjs(0));
  const [eventDate, setEventDate] = React.useState(dayjs(new Date()));

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoriesResponse = await fetch(apiAdress + "/api/categories");
        if (!categoriesResponse.ok) {
          throw new Error("Failed to fetch categories.");
        }
        const categoriesData = await categoriesResponse.json();
        setCategories(categoriesData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const [formValues, setFormValues] = useState({
    name: "",
    description: "",
    category: "",
    location: "",
    is_unique: null,
    organiser: 1,
    image: null,
    date: new Date(),
    duration: new Date().getTime() / 1000,
    is_premium: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    setFormValues((prevState) => ({
      ...prevState,
      image: e.target.files[0],
    }));
  };

  const handleDateTimeChange = (date) => {
    setFormValues({ ...formValues, date });
  };

  const handleDurationChange = (newValue) => {
    setFormValues((prevState) => ({
      ...prevState,
      duration: new Date(newValue).getTime() / 1000,
    }));
  };

  // const handleCheckboxChange = (e) => {
  //   const { name, checked } = e.target;
  //   setFormValues((prevState) => ({
  //     ...prevState,
  //     [name]: checked,
  //   }));
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formValues),
    };

    console.log(requestOptions);

    try {
      const response = await fetch(apiAdress + "/api/events/", requestOptions);
      const data = await response.json();
      console.log(data); // do something with the response data
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container>
      <Typography
        variant="h4"
        align="center"
        gutterBottom
        style={{ fontSize: "20px" }}
      >
        Add Event
      </Typography>
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItem: "stretch",
        }}
      >
        <Grid
          container
          spacing={2}
          direction="column"
          justifyContent="space-evenly"
          alignItems="stretch"
        >
          <Grid item xs={12} md={6} style={{ minWidth: "250px" }}>
            <TextField
              id="outlined-basic"
              label="Event Name"
              variant="outlined"
              required
              name="name"
              onChange={handleChange}
              style={{ width: "100%" }}
            />
          </Grid>
          <Grid item xs={12} md={6} style={{ minWidth: "250px" }}>
            <TextField
              id="outlined-basic"
              label="Event location"
              variant="outlined"
              required
              name="location"
              onChange={handleChange}
              style={{ width: "100%" }}
            />
          </Grid>
          <Grid item xs={12} md={6} style={{ minWidth: "250px" }}>
            <FormControl fullWidth>
              <InputLabel>Event Category</InputLabel>
              <Select
                name="category"
                label="Event Category"
                required
                value={formValues.category}
                onChange={handleChange}
                style={{ width: "100%", textAlign: "left" }}
              >
                {categories.map((category) => (
                  <MenuItem
                    key={category.id}
                    value={category.id}
                    style={{ width: "100%" }}
                  >
                    {category.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={6} style={{ minWidth: "250px" }}>
            <TextField
              id="outlined-basic"
              label="Event Description"
              variant="outlined"
              required
              name="description"
              onChange={handleChange}
              style={{ width: "100%" }}
            />
          </Grid>
          <Grid item xs={12} md={6} style={{ minWidth: "250px" }}>
            <LocalizationProvider
              dateAdapter={AdapterDayjs}
              style={{ width: "100%" }}
            >
              <DateTimePicker
                label="Event Date"
                defaultValue={dayjs(eventDate)}
                value={eventDate}
                onChange={(newValue) => handleDateTimeChange(newValue)}
                style={{ width: "100%" }}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={12} md={6} style={{ minWidth: "250px" }}>
            <LocalizationProvider
              dateAdapter={AdapterDayjs}
              style={{ width: "100%" }}
            >
              <TimeField
                label="Duration"
                value={eventDuration}
                onChange={(newValue) => handleDurationChange(newValue)}
                format="HH:mm"
                style={{ width: "100%" }}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={12} md={6} style={{ minWidth: "250px" }}>
            <Button
              variant="contained"
              component="label"
              style={{ width: "100%", padding: "10px 14px", fontSize: "14px" }}
            >
              <span>
                <FaUpload /> Upload Event Image
              </span>
              <input
                type="file"
                hidden
                accept="image/*"
                id="event-image"
                name="image"
                onChange={handleImageChange}
              />
            </Button>
          </Grid>
          <Grid item xs={12} style={{ minWidth: "250px" }}>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              style={{ width: "100%", padding: "10px 14px" }}
            >
              Add Event
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
}
