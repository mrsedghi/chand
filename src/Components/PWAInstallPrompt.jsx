import { useEffect, useState } from "react";
import { Icon } from "@iconify/react";

export default function PWAInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setIsVisible(true);
    };

    window.addEventListener("beforeinstallprompt", handler);

    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
    };
  }, []);

  const handleInstall = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === "accepted") {
        console.log("User accepted the install prompt");
      }
      setIsVisible(false);
    }
  };

  const handleDismiss = () => {
    setIsVisible(false);
    // You can store in localStorage that user dismissed the prompt
    localStorage.setItem("pwaPromptDismissed", "true");
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 bg-primary text-primary-content p-4 rounded-lg shadow-xl z-50 max-w-md mx-auto">
      <div className="flex items-center justify-between gap-3">
        <Icon icon="mdi:cellphone-arrow-down" className="text-2xl" />
        <div className="flex-1">
          <h3 className="font-bold">نصب اپلیکیشن چند؟</h3>
          <p className="text-sm">برای تجربه بهتر، اپلیکیشن را نصب کنید</p>
        </div>
        <div className="flex gap-2">
          <button onClick={handleInstall} className="btn btn-sm btn-success">
            نصب
          </button>
          <button onClick={handleDismiss} className="btn btn-sm btn-ghost">
            بعداً
          </button>
        </div>
      </div>
    </div>
  );
}
