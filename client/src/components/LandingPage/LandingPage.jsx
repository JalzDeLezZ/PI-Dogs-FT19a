import React from 'react';
import {Link} from 'react-router-dom';
import style from "./LandingPage.module.css";

export default function LandingPage () {
return (
    <div className={style.holder}>
      <div className={style.land}>
        <h1> Welcome! </h1>
        <div className={style.divi}>
          <button className={style.button}>
            <Link className={style.link} to="/Home">
              Home
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
}