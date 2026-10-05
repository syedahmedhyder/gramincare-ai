"use client";

import { useState, useEffect, useCallback } from "react";

export function useNetworkStatus() {
  const [isOnline, setIsOnline] = useState<boolean>(true);
  const [isChecking, setIsChecking] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    setIsOnline(window.navigator.onLine);

    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  const checkConnection = useCallback(async () => {
    setIsChecking(true);
    try {
      if (typeof window !== "undefined") {
        if (!window.navigator.onLine) {
          setIsOnline(false);
          setIsChecking(false);
          return false;
        }
      }
      // Quick fetch ping with cache buster
      const res = await fetch("/icon-64.png?t=" + Date.now(), { method: "HEAD", cache: "no-store" });
      const online = res.ok;
      setIsOnline(online);
      setIsChecking(false);
      return online;
    } catch {
      setIsOnline(false);
      setIsChecking(false);
      return false;
    }
  }, []);

  return { isOnline, isChecking, checkConnection };
}
