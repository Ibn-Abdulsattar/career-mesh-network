"use client";
import Image from "next/image";
import styles from "./Home.module.css";
import UserLayout from "@/layout/userLayout";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const navigate = ()=>{
    router.push("/login");
  }
  return (
    <UserLayout>
      <div className={styles.container}>
        <div className={styles.mainContainer}>
          <div className={styles.mainContainer_left}>
            <p>Connect with friends without Exaggregation</p>
            <p>A social media plateform with stories no blufs!</p>
            <button onClick={navigate} className={styles.buttonJoin}>
              {" "}
              Join Now
            </button>
          </div>
          <div className={styles.mainContainer_right}>
            <Image className={styles.mainContainer_right_img}
              src="/image/img-1.avif"
              width={500}
              height={400}
              alt="connection_illustration"
            />
          </div>
        </div>
      </div>
    </UserLayout>
  );
}
