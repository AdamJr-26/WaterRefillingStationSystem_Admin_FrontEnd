import { NavLink } from 'react-router-dom'
function NavLinks({ styleClass }) {
    return (
      <div className={styleClass}>
        <NavLink className={({isActive})=> (isActive? `${styleClass}__link active`:`${styleClass}__link`)} to="/">
          <span>Home</span>
        </NavLink>
        <NavLink className={({isActive})=> (isActive? `${styleClass}__link active`:`${styleClass}__link`)} to="/login">
          <span>Login</span>
        </NavLink>
        <NavLink className={({isActive})=> (isActive? `${styleClass}__link active`:`${styleClass}__link`)} to="/register">
          <span>Register</span>
        </NavLink>
        <NavLink className={({isActive})=> (isActive? `${styleClass}__link active`:`${styleClass}__link`)}to="/about-us">
          <span>About Us</span>
        </NavLink>
        <NavLink className={({isActive})=> (isActive? `${styleClass}__link active`:`${styleClass}__link`)} to="/contact-us">
          <span>Contact Us</span>
        </NavLink>
        <div className="animation start-home"></div>
      </div>
    );
  }
export default NavLinks  