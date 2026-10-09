// EDIT THIS FILE to change the brand name and contact details everywhere.
export const siteConfig = {
  brandName: "Addis Apartment Project",
  tagline: "Find a verified apartment in Addis Ababa, without the endless searching.",
  whatsappNumber: "251900000000", // digits only, with country code, no + sign
  telegramUsername: "your_username", // without the @ sign
  email: "hello@example.com",
};

export function whatsappLink(message: string) {
  return `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(message)}`;
}
export function telegramLink() {
  return `https://t.me/${siteConfig.telegramUsername}`;
}
