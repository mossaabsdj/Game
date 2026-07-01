"use client";

import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    if (!navigator.geolocation) {
      console.log("Geolocation is not supported.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const data = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };

        console.log(data);

        await fetch("/api/location", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
      },
      (error) => {
        console.error(error);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      },
    );
  }, []);

  return <h1>Loading...</h1>;
}
