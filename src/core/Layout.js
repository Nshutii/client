import React from "react";
import { MDBCarousel, MDBCarouselCaption, MDBCarouselInner, MDBCarouselItem, MDBView, MDBMask } from
  "mdbreact";
import Menu from "./Menu";




const Layout = ({
  title = "Title",
  description = "Description",
  className,
  children
}) => (
    <div>
      <Menu />

      <div className={className}>{children}</div>
    </div>
  );

export default Layout;