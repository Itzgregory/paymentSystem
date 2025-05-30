"use client";
import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import developerAnimation from "../../../public/asset/coming-soon.png";
import styles from "./ComingSoon.module.css";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const CountdownTimer = ({ targetDate }: { targetDate: string }) => {
  const calculateTimeLeft = useCallback((): TimeLeft => {
    const difference = new Date(targetDate).getTime() - new Date().getTime();
    if (difference <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / (1000 * 60)) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  }, [targetDate]);

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, [calculateTimeLeft]);

  return (
    <div className={styles.subtitle}>
      {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s
    </div>
  );
};

const ComingSoon = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>🚀 Coming Soon!</h1>
      <p className={styles.subtitle}>We are working on something amazing.</p>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <Image
          src={developerAnimation}
          alt="Developer at work"
          className={styles.image}
          width={0} 
          height={0}
          sizes="100vw" 
          priority
        />
      </motion.div>
      <CountdownTimer targetDate="2025-06-01T00:00:00" />
    </div>
  );
};

export default ComingSoon;