"use client";

import Navbar from "@/components/Navbar";
import CreatedGPTs from "@/components/CreatedGPTs";
import React from "react";
// import GPTForm from "@/components/GPTForm";

const Dashboard = () => {
  return (
    <div>
      <Navbar />
      <CreatedGPTs />
      {/* <GPTForm/> */}
    </div>
  );
};

export default Dashboard;
