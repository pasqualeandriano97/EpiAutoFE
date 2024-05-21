import { Image } from "react-bootstrap";

const HomeComponent = () => {
  return (
    <>
      {/* <div style={{ height: "500px" }}></div>
      <Container fluid className="image"></Container> */}

      <Image
        style={{ marginTop: "60px", height: "94vh", width: "100%" }}
        className="p-0 mx-0"
        src={"hero.png"}
        fluid
      ></Image>
    </>
  );
};

export default HomeComponent;
