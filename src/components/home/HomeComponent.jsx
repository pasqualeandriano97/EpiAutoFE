import { Image } from "react-bootstrap";
import { useState, useEffect } from "react";
import debounce from "lodash/debounce";

const HomeComponent = () => {
  const [viewportWidth, setViewportWidth] = useState(window.innerWidth);
  const token = window.localStorage.getItem("token");

  useEffect(() => {
    const handleResize = () => {
      setViewportWidth(window.innerWidth);
      console.log(viewportWidth);
    };

    const debouncedHandleResize = debounce(handleResize, 100);

    window.addEventListener("resize", debouncedHandleResize);

    return () => {
      window.removeEventListener("resize", debouncedHandleResize);
    };
  }, []);
  return (
    <>
      {viewportWidth > 1670 ? (
        <div
          className="image"
          style={{
            marginTop: "70px",
            height: "calc(100vh - 70px)",
            width: "100%",
          }}
        >
          {token ? (
            <Image
              src="fullWideHero2.png"
              style={{ maxHeight: "100%", width: "100%" }}
            ></Image>
          ) : (
            <Image
              src="homePage.png"
              style={{ maxHeight: "100%", width: "100%" }}
            ></Image>
          )}
        </div>
      ) : (
        <div className="image"></div>
      )}
    </>
  );
};

export default HomeComponent;
