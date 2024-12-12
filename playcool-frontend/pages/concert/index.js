import {useEffect, useState} from "react";
import {
    Box,
    Button,
    Card,
    CardContent,
    CardMedia,
    Modal, Stack,
    Typography,
} from "@mui/material";
import {useRouter} from "next/router";
import {fetchConcerts} from "@/src/components/api";
import EventIcon from "@mui/icons-material/Event";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import HouseIcon from "@mui/icons-material/House";
import Pagination from "@mui/material/Pagination";

const ConcertPage = () => {
    const [concerts, setConcerts] = useState([]);
    const [selectedBackground, setSelectedBackground] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const router = useRouter();
    const concertsPerPage = 6;

    const handleConcertClick = (imgUrl) => {
        setSelectedBackground(imgUrl);
    };


    useEffect(() => {
        // Fetch concert data
        fetchConcerts().then((data) => {
            setConcerts(data);
        });
    }, []);

    const totalConcerts = concerts.length;
    const totalPages = Math.ceil(totalConcerts / concertsPerPage);

    const indexOfLastConcert = currentPage * concertsPerPage;
    const indexOfFirstConcert = indexOfLastConcert - concertsPerPage;
    const currentConcerts = concerts.slice(
        indexOfFirstConcert,
        indexOfLastConcert
    );

  return (
      <Box>
          <Box sx={{ maxWidth: "60%", marginLeft: "20%", marginTop:1}}>
              <Typography variant="h4" component="h1" gutterBottom textAlign="center" sx={{color:"white"}}>
                  Concerts
              </Typography>
              <Box>
                  {currentConcerts &&
                      currentConcerts.length > 0 &&
                      currentConcerts.map((concert) => (
                          <Card
                              key={concert.concertId}
                              onClick={() => handleConcertClick(concert.concertImage)}
                              sx={{
                                  display: "flex",
                                  flexDirection: "row",
                                  alignItems: "center",
                                  borderRadius: 2,
                                  overflow: "hidden",
                                  marginBottom: 2,
                              }}
                          >
                              <Box
                                  sx={{
                                      backgroundColor: new Date(concert.dateTime) < new Date() ? "gray" : "#3337BF",
                                      color: "white",
                                      padding: 2,
                                      borderTopLeftRadius: 8,
                                      borderBottomLeftRadius: 8,
                                      display: "flex",
                                      flexDirection: "column",
                                      alignItems: "center",
                                      justifyContent: "center",
                                      minWidth: 100,
                                      height: "160px",
                                      width: "200px",
                                  }}
                              >
                                  <EventIcon />
                                  <Typography variant="body2" sx={{ mt: "5px", mb: "5px" }}>
                                      {new Date(concert.dateTime).toLocaleDateString()}
                                  </Typography>
                                  <Typography variant="body2">
                                      {new Date(concert.dateTime).toLocaleTimeString([], {
                                          hour: "2-digit",
                                          minute: "2-digit",
                                      })}
                                  </Typography>
                              </Box>

                              <CardContent  sx={{flex: 1,backgroundColor: "rgba(255, 255, 255, 0)"}}>

                                  <Typography variant="h5" component="div">
                                      {concert.title}
                                  </Typography>
                                  <Box
                                      sx={{ display: "flex", alignItems: "center", marginTop: 1 }}
                                  >
                                      <LocationOnIcon />
                                      <Typography
                                          variant="body2"
                                          color="text.secondary"
                                          sx={{ marginLeft: 1 }}
                                      >
                                          {concert.venue.city}
                                      </Typography>
                                  </Box>
                                  <Box
                                      sx={{ display: "flex", alignItems: "center", marginTop: 1 }}
                                  >
                                      <HouseIcon />
                                      <Typography
                                          variant="body2"
                                          color="text.secondary"
                                          sx={{ marginLeft: 1 }}
                                      >
                                          {concert.venue.name}
                                      </Typography>
                                  </Box>
                                  <Box
                                      sx={{ display: "flex", alignItems: "center", marginTop: 1 }}
                                  >
                                      <ConfirmationNumberIcon />
                                      <Typography
                                          variant="body2"
                                          color="text.secondary"
                                          sx={{ marginLeft: 1 }}
                                      >
                                          <Typography
                                              variant="body2"
                                              color={
                                                  new Date(concert.dateTime) < new Date()
                                                      ? "red"
                                                      : concert.availableSeats <= 0
                                                          ? "text.secondary"
                                                          : "green"
                                              }
                                          >
                                              {new Date(concert.dateTime) < new Date()
                                                  ? "Event Passed"
                                                  : concert.availableSeats <= 0
                                                      ? "Sold Out!"
                                                      : concert.availableSeats === 1
                                                          ? "1 Ticket Available!"
                                                          : concert.availableSeats + " Tickets Available!"}
                                          </Typography>
                                      </Typography>
                                  </Box>
                              </CardContent>
                              <Button
                                  variant="outlined"
                                  color="primary"
                                  onClick={(e) => {
                                      e.stopPropagation();
                                      router.push(`/concert-detail/${concert.concertId}`);
                                  }}
                                  disabled={new Date(concert.dateTime) < new Date()}
                                  sx={{
                                      marginRight: 2,
                                      marginBottom: 2,
                                      alignSelf: "flex-end",
                                      backgroundColor: new Date(concert.dateTime) < new Date()
                                          ? ""
                                          : "#3337BF",
                                      backColor: "#3337BF",
                                      color: "white",
                                      fontSize: "1rem",
                                      padding: "5px 10px",
                                      borderRadius: "10px",
                                      "&:hover": {
                                          borderColor: "lightpurple",
                                          backgroundColor: "rgba(0, 0, 119, 0.1)",
                                      },
                                  }}
                              >
                                  {new Date(concert.dateTime) < new Date()
                                      ? "Passed"
                                      : "PRE-SALE"}
                              </Button>
                          </Card>
                      ))}
              </Box>

              <Box
                  sx={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "center",
                      marginTop: 2,
                  }}
              >
                  <Stack spacing={2}>
                      <Pagination
                          count={totalPages}
                          page={currentPage}
                          onChange={(event, value) => setCurrentPage(value)}
                          showFirstButton
                          showLastButton
                          variant="outlined"
                          color="secondary"
                      />
                  </Stack>
              </Box>
          </Box>
      </Box>

  );
};

export default ConcertPage;
