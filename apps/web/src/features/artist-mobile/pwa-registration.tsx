"use client";

import { useEffect, useState } from "react";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>;
}

declare global {
  interface WindowEventMap {
    beforeinstallprompt: BeforeInstallPromptEvent;
  }
}

export function ArtistPwaRegistration() {
  useEffect(() => {
    if (!("serviceWorker" in navigator)) return;

    void navigator.serviceWorker.register("/preview/artist-mobile/sw.js", {
      scope: "/preview/artist-mobile/",
      updateViaCache: "none"
    }).catch((error: unknown) => {
      console.error("نگارین هنرمند: ثبت Service Worker انجام نشد.", error);
    });
  }, []);

  return null;
}

export function ArtistPwaInstallControl() {
  const [installEvent, setInstallEvent] = useState<BeforeInstallPromptEvent | null>(null);
  const [installed, setInstalled] = useState(false);
  const [isIos, setIsIos] = useState(false);

  useEffect(() => {
    const standalone = window.matchMedia("(display-mode: standalone)").matches;
    const ios = /iPad|iPhone|iPod/.test(navigator.userAgent)
      || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
    setInstalled(standalone || (navigator as Navigator & { standalone?: boolean }).standalone === true);
    setIsIos(ios);

    const onBeforeInstall = (event: BeforeInstallPromptEvent) => {
      event.preventDefault();
      setInstallEvent(event);
    };
    const onInstalled = () => {
      setInstalled(true);
      setInstallEvent(null);
    };

    window.addEventListener("beforeinstallprompt", onBeforeInstall);
    window.addEventListener("appinstalled", onInstalled);
    return () => {
      window.removeEventListener("beforeinstallprompt", onBeforeInstall);
      window.removeEventListener("appinstalled", onInstalled);
    };
  }, []);

  async function install() {
    if (!installEvent) return;
    await installEvent.prompt();
    const result = await installEvent.userChoice;
    if (result.outcome === "accepted") setInstalled(true);
    setInstallEvent(null);
  }

  if (installed) {
    return <p className="artist-pwa-status" role="status">اپ نگارین هنرمند روی این دستگاه نصب است.</p>;
  }

  return (
    <div className="artist-pwa-install-control">
      {installEvent ? (
        <button className="artist-pwa-install-button" type="button" onClick={() => void install()}>
          نصب اپ هنرمند
        </button>
      ) : (
        <p className="artist-pwa-install-hint">
          {isIos
            ? "در Safari دکمهٔ اشتراک‌گذاری را بزنید و «افزودن به صفحهٔ اصلی» را انتخاب کنید."
            : "از منوی مرورگر، گزینهٔ «نصب برنامه» یا «افزودن به صفحهٔ اصلی» را انتخاب کنید."}
        </p>
      )}
    </div>
  );
}
