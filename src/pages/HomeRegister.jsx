import React from "react";
import ScrollContainer from "react-indiana-drag-scroll";
import { Link, NavLink, Outlet } from "react-router-dom";
import AdminTextinput from "../components/AdminTextinput";
function HomeRegister() {
  return (
    <div className="home-register">
      <form className="home-register--steps" action="post">
        {/* https://dev.to/tywenk/how-to-use-nested-routes-in-react-router-6-4jhd */}
        {/* pass form in outlet  */}
        <Outlet />
      </form>
      <div className="home-register--screenshots">
        {/* <img src="https://picsum.photos/200" alt="" /> */}
        <h4>Images</h4>
      </div>
    </div>
  );
}

export default HomeRegister;

{
  /* <div className="home-register-landing-page">
<p className="home-register-landing-page--introduction">
  Lorem Ipsum is simply dummy text of the printing and typesetting
  industry. Lorem Ipsum has been the industry's standard dummy text ever
  since the 1500s, when an unknown printer took a galley of type and
  scrambled it to make a type specimen book. It has survived not only
  five centuries.
</p>
<ScrollContainer className="home-register-landing-page--scroll-container">
  <div className="home-register-landing-page--scroll-container__image-wrapper">
    {[1, 2, 3, 4, 5, 6].map((item, i) => (
      <img
        src="https://picsum.photos/200"
        alt="sample screenshot"
        srcset=""
      />
    ))}
  </div>
</ScrollContainer>
<Link to="1" className="home-register-landing-page--register-button">
  Register Now
</Link>
<Outlet />
</div> */
}
