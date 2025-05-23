import axios from "axios";
import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import Footer from "./Components/Footer";
import { registerSW } from "./sw";
import PWAInstallPrompt from "./Components/PWAInstallPrompt";
import SeoWrapper from "./seo/SeoWrapper";
import shib from "../public/icons/shib.png";
registerSW();
function App() {
  const Key = "FreeFusNYvmUj8BOKoqzaZSlwYnQONdS";
  const URL = `https://brsapi.ir/Api/Market/Gold_Currency.php?key=${Key}`;
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(URL);
        setData(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [URL]);

  // Set initial theme based on system preference
  useEffect(() => {
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    setDarkMode(prefersDark);
    document.documentElement.setAttribute(
      "data-theme",
      prefersDark ? "dark" : "light"
    );
  }, []);

  const filteredData = () => {
    if (!data) return [];

    const allItems = [
      ...data.gold.map((item) => ({ ...item, type: "gold" })),
      ...data.currency.map((item) => ({ ...item, type: "currency" })),
      ...data.cryptocurrency.map((item) => ({ ...item, type: "crypto" })),
    ];

    return allItems.filter(
      (item) =>
        (activeTab === "all" || item.type === activeTab) &&
        (item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.name_en.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.symbol.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  };

  const formatPrice = (price) => {
    if (typeof price === "string") return price;
    return new Intl.NumberFormat("fa-IR").format(price);
  };

  const formatPriceDollar = (price) => {
    if (typeof price === "string") return price;
    return new Intl.NumberFormat("en-US").format(price);
  };

  const getChangeColor = (change) => {
    if (change > 0) return "text-success";
    if (change < 0) return "text-error";
    return "text-neutral";
  };

  const getChangeIcon = (change) => {
    if (change > 0) return "mdi:trending-up";
    if (change < 0) return "mdi:trending-down";
    return "mdi:trending-neutral";
  };

  const getItemIcon = (item) => {
    // Gold icons - more detailed and premium icons
    if (item.type === "gold") {
      const goldIcons = {
        IR_GOLD_18K: "mdi:gold",
        IR_GOLD_24K: "mdi:gold",
        IR_GOLD_MELTED: "mdi:gold",
        IR_COIN_1G: "fluent-emoji-flat:coin",
        IR_COIN_QUARTER: "fluent-emoji-flat:coin",
        IR_COIN_HALF: "fluent-emoji-flat:coin",
        IR_COIN_EMAMI: "fluent-emoji-flat:coin",
        IR_COIN_BAHAR: "fluent-emoji-flat:coin",
        XAUUSD: "game-icons:gold-bar",
      };
      return goldIcons[item.symbol] || "game-icons:gold-bar";
    }

    // Currency icons - detailed flag icons
    if (item.type === "currency") {
      const currencyIcons = {
        USD: "circle-flags:us",
        EUR: "circle-flags:eu",
        GBP: "circle-flags:gb",
        JPY: "circle-flags:jp",
        CAD: "circle-flags:ca",
        AUD: "circle-flags:au",
        KWD: "circle-flags:kw",
        CHF: "circle-flags:ch",
        PKR: "circle-flags:pk",
        IQD: "circle-flags:iq",
        SYP: "circle-flags:sy",
        SEK: "circle-flags:se",
        QAR: "circle-flags:qa",
        OMR: "circle-flags:om",
        BHD: "circle-flags:bh",
        AFN: "circle-flags:af",
        MYR: "circle-flags:my",
        THB: "circle-flags:th",
        AZN: "circle-flags:az",
        AMD: "circle-flags:am",
        GEL: "circle-flags:ge",
        CNY: "circle-flags:cn",
        AED: "circle-flags:ae",
        SAR: "circle-flags:sa",
        TRY: "circle-flags:tr",
        RUB: "circle-flags:ru",
        INR: "circle-flags:in",
        USDT_IRT: "cryptocurrency-color:usdt",
      };
      return currencyIcons[item.symbol] || "heroicons:currency-dollar-20-solid";
    }

    // Crypto icons - colored crypto icons
    if (item.type === "crypto") {
      const cryptoIcons = {
        BTC: "cryptocurrency-color:btc",
        ETH: "cryptocurrency-color:eth",
        USDT: "cryptocurrency-color:usdt",
        XRP: "cryptocurrency-color:xrp",
        BNB: "cryptocurrency-color:bnb",
        SOL: "cryptocurrency-color:sol",
        USDC: "cryptocurrency-color:usdc",
        DOGE: "cryptocurrency-color:doge",
        ADA: "cryptocurrency-color:ada",
        TRX: "cryptocurrency-color:trx",
        LINK: "cryptocurrency-color:link",
        AVAX: "cryptocurrency-color:avax",
        XLM: "cryptocurrency-color:xlm",
        SHIB: "cryptocurrency-color:shib",
        LTC: "cryptocurrency-color:ltc",
        DOT: "cryptocurrency-color:dot",
        UNI: "cryptocurrency-color:uni",
        FIL: "cryptocurrency-color:fil",
        ATOM: "cryptocurrency-color:atom",
      };
      return cryptoIcons[item.symbol] || "ph:coin-fill";
    }

    return "mdi:finance";
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.setAttribute(
      "data-theme",
      darkMode ? "light" : "dark"
    );
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-base-200">
        <div className="text-center">
          <span className="loading loading-spinner loading-lg text-primary"></span>
          <p className="mt-4 text-lg font-medium">
            در حال دریافت اطلاعات بازار...
          </p>
          <p className="text-sm opacity-70">لطفاً چند لحظه صبر کنید</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-base-200 p-4">
        <div className="alert alert-error shadow-lg max-w-xl">
          <div>
            <Icon
              icon="solar:danger-triangle-bold-duotone"
              className="text-3xl"
            />
            <div>
              <h3 className="font-bold">خطا در دریافت اطلاعات</h3>
              <div className="text-sm">{error}</div>
            </div>
          </div>
          <button
            className="btn btn-sm"
            onClick={() => window.location.reload()}
          >
            تلاش مجدد
          </button>
        </div>
      </div>
    );
  }

  return (
    <SeoWrapper
      seoProps={{
        title: "چند؟ | ردیاب لحظه‌ای بازارهای مالی",
        description:
          "پیگیری لحظه‌ای قیمت طلا، سکه، ارز و ارزهای دیجیتال به زبان فارسی",
        keywords: "قیمت طلا, قیمت سکه, قیمت دلار, نرخ ارز, بیت کوین, تتر",
        canonical: "https://chand-beta.vercel.app",
      }}
    >
      <div className={`min-h-screen ${darkMode ? "dark" : ""}`}>
        <div className="min-h-screen bg-base-200 text-base-content">
          {/* Header with glass effect */}
          <div className="navbar backdrop-blur-md bg-base-100/80 text-base-content sticky top-0 z-50 shadow-lg">
            <div className="navbar-start">
              <div className="bg-base-300 rounded-xl p-2">
                <h1
                  className={`text-2xl font-bold ${
                    darkMode ? "text-gray-300" : "text-gray-800"
                  }`}
                >
                  chand!?
                </h1>
              </div>
            </div>

            <div className="navbar-center hidden lg:flex">
              <ul className="menu menu-horizontal px-1">
                <li>
                  <a
                    onClick={() => setActiveTab("all")}
                    className={activeTab === "all" ? "bg-base-300/50" : ""}
                  >
                    <Icon icon="mdi:view-dashboard" className="text-xl" />
                    همه
                  </a>
                </li>
                <li>
                  <a
                    onClick={() => setActiveTab("gold")}
                    className={activeTab === "gold" ? "bg-base-300/50" : ""}
                  >
                    <Icon
                      icon="game-icons:gold-bar"
                      className="text-xl text-yellow-500"
                    />
                    طلا و سکه
                  </a>
                </li>
                <li>
                  <a
                    onClick={() => setActiveTab("currency")}
                    className={activeTab === "currency" ? "bg-base-300/50" : ""}
                  >
                    <Icon
                      icon="heroicons:currency-dollar-20-solid"
                      className="text-xl text-green-500"
                    />
                    ارز خارجی
                  </a>
                </li>
                <li>
                  <a
                    onClick={() => setActiveTab("crypto")}
                    className={activeTab === "crypto" ? "bg-base-300/50" : ""}
                  >
                    <Icon
                      icon="ph:coin-fill"
                      className="text-xl text-blue-500"
                    />
                    ارز دیجیتال
                  </a>
                </li>
              </ul>
            </div>

            <div className="navbar-end">
              <div className="form-control mr-2">
                <input
                  type="text"
                  placeholder="جستجو..."
                  className="input input-bordered input-sm md:w-56 w-24"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <button
                className="btn btn-ghost btn-circle"
                onClick={toggleDarkMode}
                title={darkMode ? "حالت روشن" : "حالت تاریک"}
              >
                <Icon
                  icon={darkMode ? "ph:sun-fill" : "ph:moon-fill"}
                  className="text-xl"
                />
              </button>
            </div>
          </div>

          {/* Market Stats Summary */}
          <div className="container mx-auto px-4 py-5">
            {/* Category Filter Pills - Mobile Only */}
            <div className="flex overflow-x-auto gap-2 py-3 md:hidden">
              <button
                className={`btn btn-sm  ${
                  activeTab === "all" ? "btn-primary" : "btn-ghost btn-soft"
                }`}
                onClick={() => setActiveTab("all")}
              >
                <Icon icon="mdi:view-dashboard" />
                همه
              </button>
              <button
                className={`btn btn-sm ${
                  activeTab === "gold" ? "btn-primary" : "btn-ghost btn-soft"
                }`}
                onClick={() => setActiveTab("gold")}
              >
                <Icon icon="game-icons:gold-bar" className="text-yellow-500" />
                طلا و سکه
              </button>
              <button
                className={`btn btn-sm ${
                  activeTab === "currency"
                    ? "btn-primary"
                    : "btn-ghost btn-soft"
                }`}
                onClick={() => setActiveTab("currency")}
              >
                <Icon
                  icon="heroicons:currency-dollar-20-solid"
                  className="text-green-500"
                />
                ارز
              </button>
              <button
                className={`btn btn-sm ${
                  activeTab === "crypto" ? "btn-primary" : "btn-ghost btn-soft"
                }`}
                onClick={() => setActiveTab("crypto")}
              >
                <Icon icon="ph:coin-fill" className="text-blue-500" />
                ارز دیجیتال
              </button>
            </div>

            {/* Items Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredData().map((item) => (
                <div
                  key={`${item.type}-${item.symbol}`}
                  className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden group"
                >
                  <div className="card-body p-5">
                    <div className="flex items-center gap-4">
                      <div
                        className=" p-1
                      bg-base-300 w-12 h-fit rounded-full flex items-center justify-center gap-5"
                      >
                        {item.symbol == "SHIB" ? (
                          <img src={shib} className="w-full h-full" />
                        ) : (
                          <Icon
                            icon={getItemIcon(item)}
                            className="text-3xl w-full h-full"
                          />
                        )}
                      </div>

                      <div className="mr-4">
                        <h2 className="card-title text-base font-bold">
                          {item.name}
                        </h2>
                        <div className="flex items-center text-xs opacity-70">
                          <span>{item.name_en}</span>
                        </div>
                      </div>
                    </div>

                    <div className="divider my-2"></div>

                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-2xl font-bold">
                          {formatPrice(item.price)}{" "}
                          {item.change_value && (
                            <span
                              className={`mr-2 text-sm ${getChangeColor(
                                item.change_percent
                              )}`}
                            >
                              ({formatPrice(item.change_value)})
                            </span>
                          )}
                        </span>
                        <span className="text-sm font-bold opacity-80 badge badge-soft badge-accent">
                          {item.unit}
                        </span>
                      </div>

                      <div
                        className={`flex flex-col-reverse  ${getChangeColor(
                          item.change_percent
                        )}`}
                      >
                        <span
                          className={`badge badge-soft !w-fit  ${
                            item.change_percent > 0
                              ? "badge-success"
                              : "badge-error"
                          } font-medium flex`}
                        >
                          %{item.change_percent}
                          <Icon
                            icon={getChangeIcon(item.change_percent)}
                            className="text-xl mr-1"
                          />
                        </span>
                      </div>

                      {item.market_cap && (
                        <div className="badge badge-soft badge-info mt-2 text-xs ">
                          <Icon
                            icon="simple-icons:coinmarketcap"
                            width="16"
                            height="16"
                          />{" "}
                          ${formatPriceDollar(item.market_cap)}
                        </div>
                      )}
                    </div>

                    <div className="mt-4 flex justify-between items-center text-xs">
                      <div className="badge badge-primary badge-soft">
                        {item.type === "gold"
                          ? "طلا"
                          : item.type === "currency"
                          ? "ارز"
                          : "کریپتو"}
                      </div>
                      <div className="flex gap-1">
                        <div className="badge badge-soft">
                          <Icon icon="ph:calendar" className="mr-1" />
                          {item.date}
                        </div>
                        {item.time && (
                          <div className="badge badge-soft">
                            <Icon icon="ph:clock" className="mr-1" />
                            {item.time}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* No Results Message */}
            {filteredData().length === 0 && (
              <div className="card bg-base-100 shadow-lg p-8 text-center my-8">
                <Icon
                  icon="solar:document-search-broken"
                  className="text-8xl opacity-30 mx-auto"
                />
                <h3 className="mt-4 text-xl font-bold">نتیجه‌ای یافت نشد</h3>
                <p className="mt-2 opacity-70">
                  لطفاً عبارت جستجوی خود را تغییر دهید یا دسته‌بندی دیگری را
                  انتخاب کنید
                </p>
                <button
                  className="btn btn-primary btn-sm mt-4"
                  onClick={() => {
                    setSearchTerm("");
                    setActiveTab("all");
                  }}
                >
                  نمایش همه
                </button>
              </div>
            )}

            <Footer />
          </div>
        </div>
        <PWAInstallPrompt />
      </div>
    </SeoWrapper>
  );
}

export default App;
