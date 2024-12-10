import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Modal,
  Typography,
} from "@mui/material";
import styles from "./concert.module.css";
import { useRouter } from "next/router";
import { fetchConcerts } from "@/src/components/api";

const ConcertPage = () => {
  const [concerts, setConcerts] = useState([]);
  const [selectedConcert, setSelectedConcert] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const router = useRouter();
  const concertsPerPage = 6;

  const handleConcertClick = (concert) => {
    setSelectedConcert(concert);
  };

  const handleClose = () => {
    setSelectedConcert(null);
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
    <Box className="page-container">
      <Typography variant="h4" component="h1" gutterBottom textAlign="center">
        Concerts
      </Typography>
      <Box className="concert-cards-container">
        {currentConcerts.map((concert) => (
          <Card
            key={concert.concertId}
            onClick={() => handleConcertClick(concert)}
            className="concert-card"
          >
            <CardContent sx={{ display: "flex", flexDirection: "row" }}>
              <CardMedia
                component="img"
                height="140"
                sx={{
                  width: "auto",
                  height: "auto",
                  maxHeight: 200,
                  maxWidth: 200,
                }}
                image={concert.concertImage}
                alt={concert.title}
              />
              <CardContent sx={{ width: 500 }}>
                <Typography variant="h5" component="div">
                  {concert.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Venue: {concert.venue.city}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Date: {new Date(concert.dateTime).toLocaleString()}
                </Typography>
                <Typography
                  variant="body2"
                  color={concert.finished ? "error.main" : "primary.main"}
                >
                  Status: {concert.finished ? "Finished" : "Upcoming"}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ marginTop: 1 }}
                >
                  {concert.description && concert.description.length > 100
                    ? `${concert.description.substring(0, 100)}...`
                    : concert.description}
                </Typography>
              </CardContent>
              {concert.finished ? (
                <br />
              ) : (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() =>
                    router.push(`/concert-detail/${concert.concertId}`)
                  }
                  sx={{
                    marginLeft: "50%",
                    marginTop: 20,
                    width: 20,
                    height: 40,
                  }}
                >
                  Buy
                </Button>
              )}
            </CardContent>
          </Card>
        ))}
      </Box>

      <Box className="pagination-container">
        <Button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          variant="contained"
          className="pagination-button"
        >
          Previous
        </Button>
        <Typography variant="h6">{`Page ${currentPage} of ${totalPages}`}</Typography>
        <Button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
          variant="contained"
          className="pagination-button"
        >
          Next
        </Button>
      </Box>

      {selectedConcert && (
        <Modal open={!!selectedConcert} onClose={handleClose}>
          <Box className="modal-style">
            <Typography variant="h6" component="h2">
              {selectedConcert.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Venue: {selectedConcert.venue.city}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Date: {new Date(selectedConcert.dateTime).toLocaleString()}
            </Typography>
            <Typography
              variant="body2"
              color={selectedConcert.finished ? "error.main" : "primary.main"}
            >
              Status: {selectedConcert.finished ? "Finished" : "Upcoming"}
            </Typography>
            <Typography variant="body2" sx={{ marginTop: 2 }}>
              {selectedConcert.description}
            </Typography>
          </Box>
        </Modal>
      )}
    </Box>
  );
};

export default ConcertPage;
