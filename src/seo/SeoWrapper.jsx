import MetaTags from "./MetaTags";
import SchemaMarkup from "./SchemaMarkup";

const SeoWrapper = ({ children, seoProps }) => {
  return (
    <>
      <MetaTags {...seoProps} />
      <SchemaMarkup />
      {children}
    </>
  );
};

export default SeoWrapper;
