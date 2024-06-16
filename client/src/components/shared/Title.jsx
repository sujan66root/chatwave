import React from "react";
import { Helmet } from "react-helmet-async";

const Title = ({
  title = "Chatwave",
  description = "this is the Chat Application named Chatwave",
}) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
    </Helmet>
  );
};

export default Title;
