import React from "react";
import { useStateContext } from "../contexts/ContextProvider";
import { Navigate } from "react-router-dom";

export default function GuestLayout() {
  const { currentUser, userToken } = useStateContext();

  return <div>GuestLayout</div>;
}
