import { Helmet } from "react-helmet";

const MetaTags = ({ title, description, keywords, canonical }) => {
  return (
    <Helmet>
      <html lang="fa" />
      <title>{title || "چند؟ | ردیاب بازارهای مالی"}</title>
      <meta
        name="description"
        content={
          description ||
          "اپلیکیشن ردیاب قیمت طلا، ارز و ارزهای دیجیتال به زبان فارسی"
        }
      />
      <meta
        name="keywords"
        content={
          keywords ||
          "قیمت طلا, قیمت ارز, قیمت دلار, قیمت سکه, قیمت بیت کوین, بازار مالی"
        }
      />
      <meta name="author" content="MohammadReza Sedghi" />
      <link
        rel="canonical"
        href={canonical || "https://chand-beta.vercel.app"}
      />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta
        property="og:url"
        content={canonical || "https://chand-beta.vercel.app"}
      />
      <meta
        property="og:title"
        content={title || "چند؟ | ردیاب بازارهای مالی"}
      />
      <meta
        property="og:description"
        content={
          description ||
          "اپلیکیشن ردیاب قیمت طلا، ارز و ارزهای دیجیتال به زبان فارسی"
        }
      />
      <meta
        property="og:image"
        content="https://chand-beta.vercel.app/og-image.jpg"
      />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta
        property="twitter:url"
        content={canonical || "https://chand-beta.vercel.app"}
      />
      <meta
        property="twitter:title"
        content={title || "چند؟ | ردیاب بازارهای مالی"}
      />
      <meta
        property="twitter:description"
        content={
          description ||
          "اپلیکیشن ردیاب قیمت طلا، ارز و ارزهای دیجیتال به زبان فارسی"
        }
      />
      <meta
        property="twitter:image"
        content="https://chand-beta.vercel.app/og-image.jpg"
      />

      {/* Persian SEO */}
      <meta name="robots" content="index, follow" />
      <meta http-equiv="content-language" content="fa-ir" />
      <meta name="geo.region" content="IR" />
      <meta name="geo.placename" content="Iran" />
    </Helmet>
  );
};

export default MetaTags;
