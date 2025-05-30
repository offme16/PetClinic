import style from "./Footer.module.css";
import { NavLink } from "react-router-dom";
import icon from "../../../shared/assets/love_icon.svg";
export const Footer = () => {
  return (
    <footer className={style.footer}>
      <div className={style.footer__box}>
        <NavLink to={"/"}>
          <div className={style.footer__logo}>
            <img src={icon} alt="images" />
            <h2>PetClinic</h2>
          </div>
        </NavLink>
        <nav className={style.footer__navigate}>
          <ul>
            <NavLink to={`/shelter`}>
              <li>ПРИЮТ</li>
            </NavLink>
            <NavLink to={`/service`}>
              <li>ПРОФИЛЬ</li>
            </NavLink>
          </ul>
        </nav>
      </div>
      <div className={style.called}>
        <h5>Связаться с нами</h5>
        <div className={style.call}>
          <span>E-MAIL: </span>
          <p> fostii@petclinic.com</p>
        </div>
        <div className={style.call}>
          <span>ПОЗВОНИТЬ: </span>
          <p> 8(999)-430-74-32</p>
        </div>
      </div>
    </footer>
  );
};
