import React from "react";

import { Cards, Footer, Header, Main } from "../domains/common/components";

const Home: React.FC = () => {
  return (
    <div
      style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
    >
      <Header />
      <Main />
      <Cards />
      <Footer />
    </div>
  );
};

export default Home;
