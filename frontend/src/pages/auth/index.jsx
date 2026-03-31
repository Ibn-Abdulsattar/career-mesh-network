import UserLayout from "@/layout/userLayout";
import React from "react";
import style from "./style.module.css";
export default function login() {
  return (
    <UserLayout>
      <div className={style.container}>
        <div className={style.mainContainer}>
          <div className={style.leftContainer}>
            <h1>Login</h1>
            <form>
              <input type="email" placeholder="Email" />
              <input type="password" placeholder="Password" />
              <button type="submit">Login</button>
            </form>
          </div>

          <div className={style.rightContainer}></div>
        </div>
      </div>
    </UserLayout>
  );
}
