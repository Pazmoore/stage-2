"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { IoCloudUploadOutline } from "react-icons/io5";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Script from "next/script"; 
import styles from "./tickets.module.css";
import { Cloudinary } from "@cloudinary/url-gen";

declare global {
  interface Window {
    cloudinary?: Cloudinary;
  }
}

const schema = yup.object().shape({
  fullName: yup.string().required("Full Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  avatarUrl: yup.string().url("Must be a valid URL").required("Avatar URL is required"),
});

type FormData = {
  fullName: string;
  email: string;
  avatarUrl: string;
};


const Tickets = () => {
    const router = useRouter();
    const [step, setStep] = useState(1);
    const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<FormData>({
    resolver: yupResolver(schema),
    mode: "onChange",
    
  });

  const [cloudinaryReady, setCloudinaryReady] = useState(false); // ✅ Track if Cloudinary is loaded

  useEffect(() => {
    const savedData = localStorage.getItem("formData");
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      setValue("fullName", parsedData.fullName || "");
      setValue("email", parsedData.email || "");
      setValue("avatarUrl", parsedData.avatarUrl || "");
    }
  }, [setValue]);

  useEffect(() => {
    if (watch()) {
      localStorage.setItem("formData", JSON.stringify(watch()));
    }
  });

  // ✅ Ensure Cloudinary script is available before usage
  useEffect(() => {
    const checkCloudinary = () => {
        if ('cloudinary' in window && window.cloudinary) {
        setCloudinaryReady(true);
      } else {
        console.error("Cloudinary SDK not loaded yet.");
      }
    };

    setTimeout(checkCloudinary, 1000);
  }, []);

  const handleNext = () => setStep(step + 1);
  const handleBack = () => setStep(step - 1);

  const onSubmit = (data: FormData) => {
    console.log("Form submitted:", data);
    localStorage.removeItem("formData");
    handleNext();
    router.push("/booked");
  };

  const handleUpload = () => {
    if (!cloudinaryReady) {
      console.error("Cloudinary is not loaded yet. Please wait.");
      return;
    }
}
   
    const openUploadWidget = () => {
      if (typeof window !== "undefined" && window.cloudinary) {
          const cloudinary = (window as unknown as { 
            cloudinary: { 
              createUploadWidget: (
                options: object, 
                callback: (error: Error | null, result: { event: string; info: { secure_url: string } } | null) => void
              ) => { open: () => void } 
            } 
          }).cloudinary;
    
          const widget = cloudinary.createUploadWidget(
            {
              cloudName: "YOUR_CLOUD_NAME",
              uploadPreset: "YOUR_UPLOAD_PRESET",
              multiple: false,
              folder: "user_avatars",
            },
            (error, result) => {
              if (!error && result?.event === "success") {
                setValue("avatarUrl", result.info.secure_url);
                console.log("Uploaded Image URL:", result.info.secure_url);
              }
            }
          );
    
          widget.open(); // Open the upload widget
        } else {
          console.error("Cloudinary is not available.");
        }
      };


  return (
    <>
      <Script
        src="https://widget.cloudinary.com/v2.0/global/all.js"
        strategy="afterInteractive"
        onLoad={() => setCloudinaryReady(true)}
      />

      <div className={styles.container}>
        {step === 1 && (
          <div className={styles.card}>
            <div className={styles.header}>
              <h2 className={styles.title}>Ticket Selection</h2>
              <span className={styles.step}>Step 1/3</span>
            </div>
            <div className={styles.progress_bar}>
              <div className={styles.progress}></div>
            </div>

            <div className={styles.contain}>
                <div className={styles.event_info}>
                    <h1 className={styles.head}>Techember Fest &apos;&apos;25</h1>
                    <p className={styles.p}>Join us for an unforgettable experience at [Event Name]! Secure your spot now.</p>
                    <div className={styles.event_details}>
                    <span className={styles.span}>📍 [Event Location]</span>
                    <span className={styles.span}>|| March 15, 2025 7:00 PM</span>
                    </div>
                </div>

              <div className={styles.ticket_selection}>
                <h4 className={styles.h4}>Select Ticket Type:</h4>
                <div className={styles.ticket_options}>
                  <div className={styles.ticket_option} onClick={handleNext}>
                    <p className={styles.ticket_price}>Free</p>
                    <p className={styles.ticket_type}>REGULAR ACCESS</p>
                    <p className={styles.availability}>20/52</p>
                  </div>
                  <div className={styles.ticket_option} onClick={handleNext}>
                    <p className={styles.ticket_price}>$150</p>
                    <p className={styles.ticket_type}>VIP ACCESS</p>
                    <p className={styles.availability}>20/52</p>
                  </div>
                  <div className={styles.ticket_option} onClick={handleNext}>
                    <p className={styles.ticket_price}>$150</p>
                    <p className={styles.ticket_type}>VVIP ACCESS</p>
                    <p className={styles.availability}>20/52</p>
                  </div>
                </div>
              </div>

              <div className={styles.ticket_quantity}>
                <h4 className={styles.h4}>Number of Tickets:</h4>
                <select className={styles.select}>
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                </select>
              </div>

              <div className={styles.action}>
                <button className={styles.cancel}>Cancel</button>
                <button className={styles.next} onClick={handleNext}>Next</button>
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className={styles.card}>
            <div className={styles.header}>
              <h2 className={styles.title}>Attendee Details</h2>
              <span className={styles.step}>Step 2/3</span>
            </div>
            <div className={styles.progress_bar}>
              <div className={`${styles.progress} ${styles.step_two}`}></div>
            </div>

            <div className={styles.contain}>
              <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
                <div className={styles.img}>
                  <h4 className={styles.h4}>Upload Profile Photo</h4>
                  <div className={styles.upload} onClick={handleUpload}>
                    <div onClick={openUploadWidget} className={styles.image}>
                      <IoCloudUploadOutline size={32} />
                      <p>Click to upload</p>
                    </div>
                  </div>
                  {watch("avatarUrl") && (
                    <div className={styles.preview}>
                      <Image 
                      src={watch("avatarUrl")} 
                      alt="Profile Preview" 
                      className={styles.previewImage} 
                      width={200}
                      height={200}
                      />
                      
                    </div>
                  )}
                  {errors.avatarUrl && <p className={styles.error}>{errors.avatarUrl.message}</p>}
                </div>

                <div className={styles.box}>
                    <div className={styles.box_form}>
                        <label className={styles.label}>Full Name</label>
                        <input className={styles.input}type="text" placeholder="Full Name" {...register("fullName")} />
                        {errors.fullName && <p>{errors.fullName.message}</p>}
                    </div>
                    <div className={styles.box_form}>
                        <label className={styles.label}>Email</label>
                        <input className={styles.input}  type="email" placeholder="hello@avioflagos.io" {...register("email")} />
                        {errors.email && <p>{errors.email.message}</p>}
                    </div>
                    <div className={styles.box_form_one}>
                        <label className={styles.label}>Special Request?</label>
                        <textarea className={styles.textarea}  placeholder="textarea.io" />  
                    </div>
                </div>
              </form>
              <div className={styles.action}>
                <button className={styles.cancel} onClick={handleBack}>Back</button>
                <button className={styles.next} type="submit" onClick={handleSubmit(onSubmit)}>Get My Free Ticket</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Tickets;
