import apiAdress from "../main";
import React, { useEffect, useState } from "react";
import {
  TextField,
  Button,
  Container,
  Grid,
  Typography,
  FormControlLabel,
  Checkbox,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  TextareaAutosize,
} from "@mui/material";
import {
  LocalizationProvider,
  DateTimePicker,
  TimeField,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

export default function Addcategoryform() {
  const [categories, setCategories] = useState([]);
  const [eventDuration, setEventDuration] = React.useState(dayjs(0));
  const [eventDate, setEventDate] = React.useState(dayjs(new Date()));

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoriesResponse = await fetch(apiAdress + "/api/categories");
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

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormValues((prevState) => ({
      ...prevState,
      [name]: checked,
    }));
  };

  const handleSubmit = async (e) => {
    event.preventDefault();

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
    <Container maxWidth="md">
      <Typography variant="h4" align="center" gutterBottom>
        Add Event
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid
          container
          spacing={1}
          direction="column"
          justifyContent="center"
          alignItems="stretch"
        >
          <Grid item xs={12} md={8}>
            <TextField
              id="outlined-basic"
              label="Event Name"
              variant="outlined"
              required
              name="name"
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              id="outlined-basic"
              label="Event location"
              variant="outlined"
              required
              name="location"
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel>Event Category</InputLabel>
              <Select
                name="category"
                label="Event Category"
                required
                value={formValues.category}
                onChange={handleChange}
              >
                {categories.map((category) => (
                  <MenuItem key={category.id} value={category.id}>
                    {category.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={6}>
            <Button variant="contained" component="label">
              Upload Event Image
              <input type="file" hidden />
            </Button>
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              id="outlined-basic"
              label="Event Description"
              variant="outlined"
              required
              name="description"
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateTimePicker
                defaultValue={dayjs(eventDate)}
                value={eventDate}
                onChange={(newValue) => handleDateTimeChange(newValue)}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={12} md={6}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <TimeField
                label="Duration"
                value={eventDuration}
                onChange={(newValue) => handleDurationChange(newValue)}
                format="HH:mm"
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" color="primary" type="submit">
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
}
