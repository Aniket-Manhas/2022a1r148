export async function shortenUrl(
  originalUrl: string,
  shortcode?: string,
  expiryMinutes?: string
) {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  // Generate a fake short URL
  const code = shortcode || Math.random().toString(36).substring(2, 8);
  const shortUrl = `http://short.ly/${code}`;

  // Calculate expiry
  let expiry = new Date();
  if (expiryMinutes) {
    expiry.setMinutes(expiry.getMinutes() + parseInt(expiryMinutes));
  } else {
    expiry.setDate(expiry.getDate() + 1); // default: 1 day
  }

  return {
    shortUrl,
    expiry: expiry.toISOString(),
    originalUrl,
  };
}
