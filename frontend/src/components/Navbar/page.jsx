import React from "react";
import style from "./style.module.css";
import { useRouter } from "next/navigation";

function Navbar() {
    const router = useRouter();

  return (
    <div className={style.container}>
      <div className={style.navbar}>
        <h2 onClick={()=> {router.push("/")}} className={style.navbarTitle}>Career Mesh</h2>

        <div className={style.navbarOptionContainer}>
            <button className={style.navbarOption} onClick={()=> {router.push("/auth")}}>Login</button>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
