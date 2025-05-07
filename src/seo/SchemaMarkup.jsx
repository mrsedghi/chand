import { Helmet } from "react-helmet";

const SchemaMarkup = () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "چند؟ | ردیاب بازارهای مالی",
    description: "اپلیکیشن ردیاب قیمت طلا، ارز و ارزهای دیجیتال به زبان فارسی",
    url: "https://chand-beta.vercel.app",
    inLanguage: "fa-IR",
    operatingSystem: "Any",
    applicationCategory: "FinancialApplication",
    creator: {
      "@type": "Person",
      name: "MohammadReza Sedghi",
    },
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  );
};

export default SchemaMarkup;
