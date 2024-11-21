import React from "react";
import { Route, Routes } from "react-router-dom";
import LocationSender from "./LocationSender";

export default function EmergencyApp() {
  return (
    <Routes>
      <Route path="/" element={<LocationSender />} />
    </Routes>
  );
}
