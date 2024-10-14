import React, { useContext, useMemo, useState } from "react";
import "./HeaderGlass.css";
import { SlMenu } from "react-icons/sl";
import { Link } from "react-router-dom";
import Logo from "../assets/ll2.gif";
import { AuthContext } from "../logic/AuthContext";
import { Button, ConfigProvider, Flex, Popover, Segmented } from "antd";

function HeaderGlass() {
  const [arrow, setArrow] = useState("Show");
  const { logout } = useContext(AuthContext);

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
      <Link>Logout</Link>
    </div>
  );

  const openLink2 = () => {
    window.open("/register");
  };

  const openLink = () => {
    window.open("/login");
  };

  return (
    <dvi className="header_">
      <div className="glass">
        <dvi className="host-here">
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
        </dvi>
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
    </dvi>
  );
}

export default HeaderGlass;
