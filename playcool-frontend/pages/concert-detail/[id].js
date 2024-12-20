import React, { useEffect, useState } from "react";
import {
  Typography,
  Button,
  Box,
  CardMedia,
  CardContent,
  Card,
} from "@mui/material";
import { fetchAvailableSeats, fetchConcert } from "@/src/components/api";
import { useRouter } from "next/router";
import StepperBar from "@/src/components/StepperBar";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";

const ConcertDetail = () => {
  const route = useRouter();
  const [concert, setConcert] = useState(null);
  const [ticketData, setTicketData] = useState([]);
  const [selectedAreaId, setSelectedAreaId] = useState(null); // 用于记录被点击的 areaId
  const router = useRouter();
  const [hostUrl, setHostUrl] = useState("");

  useEffect(() => {
    if (window) {
      setHostUrl(window.location.protocol + "//" + window.location.host + "/");
    }
  }, []);

  useEffect(() => {
    if (!route.query.id) {
      return;
    }
    const concertId = route.query.id;
    fetchConcert(concertId).then((data) => {
      setConcert(data);
      fetchAvailableSeats(data.venue.venueId).then((availableSeats) => {
        setTicketData(availableSeats);
      });
    });
  }, [route]);

  if (!concert) {
    return <div>No concert details available.</div>;
  }

  return (
    <div>
      <StepperBar index={1}></StepperBar>
      <div>
        <Card
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "auto",
            marginTop: 6,
              backgroundColor: "transparent"
          //     gradient: "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 0%, rgba(0,212,255,1) 100%)",



          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "auto",
              flexDirection: "row",
            }}
          >
            <CardMedia
              component="img"
              alt="Concert"
              height="140"
              image={hostUrl + concert.concertImage}
              title="Concert"
              sx={{ width: 140 }}
            />
            <CardContent sx={{ textAlign: "center" }}>
              <Typography
                variant="h3"
                component="h2"
                sx={{ fontWeight: "bold", color: "white" }}
              >
                {concert.title}
              </Typography>
              <Typography variant="body" color="white" component="p">
                {concert.venue.city +
                  ", " +
                  concert.venue.location +
                  ", " +
                  concert.venue.name}
              </Typography>
              <Typography variant="body" color="white" component="p">
                Time: {concert.dateTime}
              </Typography>
              <Typography variant="body" color="white" component="p">
                {concert.description}
              </Typography>
            </CardContent>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "auto",
              flexDirection: "column",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "auto",
                flexDirection: "row",
              }}
            >
              <Button
                sx={{ marginRight: 10, fontSize: "3rem", color: "white" }}
                variant="text"
                onClick={() => router.push(`/concert`)}
              >
                {"<<"}
              </Button>
              <CardMedia
                component="img"
                alt="Concert"
                height="250"
                image={"/img.png"}
                title="Concert"
                sx={{
                  width: 900,
                  marginTop: 10,
                  marginLeft: "auto",
                  marginRight: "auto",
                }}
              />
              <Button
                sx={{ marginLeft: 10, fontSize: "3rem", color: "white" }}
                variant="text"
                onClick={() => {
                  if (selectedAreaId === null) {
                    alert("Please select an area first.");
                    return;
                  }
                  router.push({
                    pathname: `/create-order/${concert.concertId}`,
                    query: { selectedAreaId: selectedAreaId },
                  });
                }}
              >
                {">>"}
              </Button>
            </Box>

            <Box
              display="flex"
              flexWrap="wrap"
              justifyContent="center"
              sx={{ marginTop: 10, marginBottom: 10 }}
            >
              {ticketData &&
                ticketData.length > 0 &&
                ticketData.map((area) => (
                  <Card
                    key={area.areaId} // 添加 key 属性
                    sx={{
                      width: "200px",
                      height: "100px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      border: "1px solid #ccc",
                      borderRadius: "8px",
                      marginLeft: 10,
                      backgroundColor:
                        selectedAreaId === area.areaId
                          ? "lightskyblue"
                          : area.availableSeatsCount === 0
                          ? "lightgray"
                          : "white",
                      cursor:
                        area.availableSeatsCount > 0
                          ? "pointer"
                          : "not-allowed",
                    }}
                    onClick={() => {
                      if (area.availableSeatsCount > 0) {
                        setSelectedAreaId(area.areaId);
                      }
                    }}
                  >
                    <CardContent>
                      <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                        ${area.price}
                      </Typography>
                      <Typography
                        variant="body"
                        sx={{ color: "#666", marginLeft: 2 }}
                      >
                        {area.areaName}
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{
                          color:
                            area.availableSeatsCount < 100 ? "red" : "green",
                        }}
                      >
                        Seat{area.availableSeatsCount > 1 && "s"}:{" "}
                        {area.availableSeatsCount}
                      </Typography>
                    </CardContent>
                  </Card>
                ))}
            </Box>
          </Box>
        </Card>
      </div>
    </div>
  );
};

export default ConcertDetail;
