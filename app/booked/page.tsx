"use client";
import Image from "next/image";
import React from "react";
import { useRouter } from "next/navigation";
import styles from "@/pages/ticket/tickets.module.css";

const Page = () => {
  const router = useRouter();

  const handleBookAnother = () => {
    router.push("/tickets"); 
  };

  return (
    <div className={styles.container}>
      <div className={styles.card_one}>
        <div className={styles.header}>
          <h2 className={styles.title}>Ready</h2>
          <span className={styles.step}>Step 3/3</span>
        </div>
        <div className={styles.progress_bar}>
          <div className={styles.progress}></div>
        </div>
        <div className={styles.box}>
          <h2 className={styles.title}>Your Ticket is Booked!</h2>
          <p className={styles.subtitle}>
            Check your email for a copy or you can <span className={styles.span}>download</span>
          </p>
        </div>
        

        <div className={styles.ticketCard}>
          <div className={styles.contain}>
            <div className={styles.ticketHeader}>
              <h1 className={styles.head}>Techember Fest &quot;&quot;25</h1>
              <p className={styles.p}>📍 04 Rumens road, Ikoyi, Lagos</p>
              <p className={styles.p}>📅 March 15, 2025 | 7:00 PM</p>
            </div>
            <div className={styles.ticketBody}>
            <Image 
              src="/image/navbar/User.img.png" 
              alt="User" 
              className={styles.img} 
              width={140}
              height={140}
            />
              <div className={styles.details}>
                <div className={styles.info}>
                  <div className={styles.one}>
                    <p className={styles.p}>Enter your name</p>
                    <h4 className={styles.h4}>Avi Chukwu</h4>
                  </div>
                  <div className={styles.one}>
                    <p className={styles.p}>Enter your email *</p>
                    <h4 className={styles.h4}>User@email.com</h4>
                  </div>
                
                
                  <div className={styles.ticket}>
                    <p className={styles.p}>Ticket Type: </p>
                    <h4 className={styles.h4}><strong>VIP</strong></h4>
                  </div>
                  <div className={styles.ticket}>
                    <p className={styles.p}>Ticket for: </p>
                    <h4 className={styles.h4}><strong>1</strong></h4>
                  </div>
                </div>
              
                <div className={styles.list} >
                  <p>Special request?</p>
                  <p className={styles.specialRequest}>
                    Nil ? Or the user&apos;s sad story they write in here gets this whole space, Max of three rows
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.barcodeSection}>
            <Image 
              src="/image/navbar/bar.png" 
              alt="Profile Preview" 
              className={styles.img} 
              width={250}
             height={75}
            />
          </div>
          
        </div>
        <div className={styles.action}>
          <button className={styles.cancel} onClick={handleBookAnother}>Book Another Ticket</button>
          <button className={styles.next}>Download Ticket</button>
        </div>
      </div>
    </div>
  );
};

export default Page;

