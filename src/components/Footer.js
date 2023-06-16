import React from "react";
import SiteLogo from "./logo192.png";

function Footer() {
    return (
        <div>

            <div className="jss8">
                <footer className="site-footer" id="footer">
                    <div className="bottom-footer">
                        <div className="container">
                            <div className="text-center" >
                                <div className="footer-logo"style={{ display: "flex", justifyContent: "center" }}>
                                    <a title="logo" href="/">
                                        <img height={100} src={SiteLogo} alt="sitelogo" />
                                    </a>
                                </div>
                                <p  className="copyright-text" style={{display: "flex", justifyContent:"center"}}>© 2015 Tatvasoft.com. All rights reserved.
                                </p>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
            {/* <h1>This is footer</h1> */}
        </div>
    );
}

export default Footer;

