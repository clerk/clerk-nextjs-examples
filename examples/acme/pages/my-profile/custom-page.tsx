import React from "react";
import { HomeLayout } from "../../layouts/HomeLayout";
import { Navbar } from "../../components/NavBar";

export default function UserCustomPage1() {
  return (
    <HomeLayout>
      <Navbar />
      <div style={{ marginTop: "3em" }}>Custom page goes here</div>
    </HomeLayout>
  );
}
