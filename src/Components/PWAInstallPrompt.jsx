import { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { isRunningAsPWA, isMobileDevice, isIOS } from "../utils/pwa";

const PWAInstallPrompt = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isIOSDevice, setIsIOSDevice] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);

  useEffect(() => {
    if (isRunningAsPWA()) return;

    setIsIOSDevice(isIOS());

    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);

      // Check if user previously dismissed the prompt
      const dismissed = localStorage.getItem("pwaPromptDismissed");
      if (!dismissed) {
        setIsVisible(true);
      }
    };

    if (!isIOS()) {
      window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    } else if (isMobileDevice()) {
      const dismissed = localStorage.getItem("pwaPromptDismissed");
      if (!dismissed) {
        setIsVisible(true);
      }
    }

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );
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
      localStorage.setItem("pwaPromptDismissed", "true");
    }
  };

  const handleDismiss = () => {
    setIsVisible(false);
    localStorage.setItem("pwaPromptDismissed", "true");
  };

  const toggleInstructions = () => {
    setShowInstructions(!showInstructions);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-50 flex items-end justify-center p-4 sm:items-center sm:p-6">
      <div className="bg-base-100 rounded-2xl shadow-xl w-full max-w-md transform transition-all duration-300 ease-in-out animate-fade-in-up">
        <div className="p-6">
          <div className="flex items-start gap-4">
            <div className="bg-primary/10 p-3 rounded-full">
              <Icon
                icon={isIOSDevice ? "mdi:apple" : "mdi:cellphone-arrow-down"}
                className="text-3xl text-primary"
              />
            </div>

            <div className="flex-1">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                {isIOSDevice ? "نصب اپلیکیشن چند؟" : "Install Chand App"}
              </h3>

              <p className="mt-1 text-gray-600 dark:text-gray-300">
                {isIOSDevice
                  ? "برای دسترسی سریع به اپلیکیشن روی موبایل"
                  : "For better experience, install the app on your device"}
              </p>

              {isIOSDevice && showInstructions && (
                <div
                  className="mt-3 bg-base-200 rounded-lg p-3 animate-fade-in"
                  dir="rtl"
                >
                  <ol className="list-decimal list-inside space-y-2 text-sm text-gray-700 dark:text-gray-300">
                    <li>روی دکمه Share (اشتراک گذاری) در مرورگر کلیک کنید</li>
                    <li>گزینه "Add to Home Screen" را انتخاب کنید</li>
                    <li>روی "Add" در بالا سمت راست کلیک کنید</li>
                  </ol>
                  <div className="mt-2 flex justify-center">
                    <Icon
                      icon="mdi:arrow-down"
                      className="text-2xl text-primary animate-bounce"
                    />
                  </div>
                </div>
              )}
            </div>

            <button onClick={handleDismiss} className="btn btn-soft btn-ghost ">
              <Icon icon="mdi:close" className="text-lg" />
            </button>
          </div>

          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            {isIOSDevice ? (
              <>
                <button
                  onClick={toggleInstructions}
                  className="btn btn-soft btn-primary flex-1 gap-2"
                >
                  <Icon icon="mdi:information" />
                  {showInstructions ? "بستن راهنما" : "نمایش راهنما"}
                </button>
                <button onClick={handleDismiss} className="btn btn-soft flex-1">
                  بعداً
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={handleInstall}
                  className="btn btn-soft btn-primary flex-1 gap-2"
                >
                  <Icon icon="mdi:download" />
                  نصب اپلیکیشن
                </button>
                <button onClick={handleDismiss} className="btn btn-soft flex-1">
                  شاید بعداً
                </button>
              </>
            )}
          </div>
        </div>

        {!isIOSDevice && (
          <div className="bg-base-200 px-4 py-3 rounded-b-2xl text-center text-sm text-gray-500 dark:text-gray-400">
            <Icon icon="mdi:cloud-download" className="inline mr-1" />
            حجم نصب: کمتر از ۱ مگابایت
          </div>
        )}
      </div>
    </div>
  );
};

export default PWAInstallPrompt;
