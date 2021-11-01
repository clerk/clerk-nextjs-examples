import React from "react";
import { UserProfile } from "@clerk/nextjs";
import { HomeLayout } from "../../layouts/HomeLayout";
import { Navbar } from "../../components/NavBar";

export default function UserSecurityPage() {
  return (
    <HomeLayout>
      <Navbar />
      <UserProfile routing="path" path="/my-profile" hideNavigation />
    </HomeLayout>
  );
}
