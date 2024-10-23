import React, { useMemo, useState } from "react";
import "./HeaderGlass.css";
import { SlMenu } from "react-icons/sl";
import { Link } from "react-router-dom";
import Logo from "../assets/ll2.gif";
import { Button, ConfigProvider, Flex, Popover, Segmented } from "antd";

function HeaderGlass() {
  const [arrow, setArrow] = useState("Show");
  const mergedArrow = useMemo(() => {
    if (arrow === "Hide") {
      return false;
    }
    if (arrow === "Show") {
      return true;
    }
    return {
      pointAtCenter: true,
    };
  }, [arrow]);

  const content = (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <Link>About Moxie 5 Marketing Agency</Link>
      <Link>Introducing Sk!p</Link>
    </div>
  );

  const openLink2 = () => {
    window.open("/register");
  };

  const openLink = () => {
    window.open("/login");
  };

  return (
    <div className="header_">
      <div className="glass">
        <div>This app is highly experiemental and i</div>
        <div className="host-here">
          <img className="header_ic" src={Logo} />
          <Link style={{ textDecoration: "none !important" }}>
            <div className="host glassy">
              <Popover
                placement="bottomLeft"
                content={content}
                arrow={mergedArrow}
              >
                <div
                  style={{
                    display: "flex",
                    gap: "7%",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <SlMenu className="user_ic" />
                  <Link to="/login" target="_parent" className="login-text">
                    Menu
                  </Link>
                </div>
              </Popover>
            </div>
          </Link>
        </div>
        <div className="event-details">
          {/* <p>hello is it me you're looking for</p> */}
          <h2 className="new-event-name">Welcome To Sk!p</h2>
          <p className="new-event-desc">
            Welcome to sk!p Events, Your Dynamic Partner For Corporate Events in
            Kampala, Uganda Through Innovative Solutions That Transcend
            Traditional Boundaries.{" "}
          </p>
          <div className="btn-layer">
            <button onClick={openLink} className="read-more">
              Login
            </button>
            <button onClick={openLink2} className="rsvp">
              Create Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeaderGlass;
