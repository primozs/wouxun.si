interface SocialProps {
  title: string;
  description: string;
  href: string;
  hasMetaImage: boolean;
}

export const Social = ({
  title,
  description,
  href,
  hasMetaImage,
}: SocialProps) => {
  const img = new URL('/logos/wouxun.jpg?v=3', href).href;

  return (
    <>
      {/*  Open Graph: https://ogp.me/  */}
      <meta property="og:url" content={href} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      {!hasMetaImage && <meta property="og:image" content={img} />}

      <meta property="og:image:alt" content={title} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="600" />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={title} />
      <meta property="og:locale" content="en_US" />

      {/*  Twitter: https://developer.twitter.com/en/docs/twitter-for-websites/cards/overview/abouts-cards  */}
      <meta name="twitter:card" content="summary_large_image" />
      {/* <meta name="twitter:site" content="@stenarsi" /> */}
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={img} />
      <meta name="twitter:image:alt" content={title} />

      {/*  Facebook  */}
      {/* <meta property="fb:app_id" content="3212323" /> */}
    </>
  );
};
