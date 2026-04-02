"use client"
import React from "react";
import style from "./style.module.css";
import { useRouter } from "next/navigation";
import useAppStore from "@/store/useAppStore";

function Navbar() {
    const router = useRouter();
    const {isAuthenticated, logoutUser} = useAppStore();

    const handleLogout = ()=>{
      logoutUser();
      router.push("/auth");
    }

  return (
    <div className={style.container}>
      <div className={style.navbar}>
        <h2 onClick={()=> {router.push("/")}} className={style.navbarTitle}>Career Mesh</h2>

        <div className={style.navbarOptionContainer}>
            {isAuthenticated ? (
                <button className={style.navbarOption} onClick={handleLogout}>
                    Logout
                </button>
            ) : (
                <button className={style.navbarOption} onClick={()=> {router.push("/auth")}}>
                    Login
                </button>
            )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
