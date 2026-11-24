// EDIT THIS FILE to change the brand name and contact details everywhere.
export const siteConfig = {
  brandName: "LUCY DISCOVERY",
  tagline: "Stay. Travel. Experience.",
  whatsappNumber: "251993171758", // digits only, with country code, no + sign
  telegramUsername: "mengedegnaw_1", // without the @ sign
  email: "davidtariku7623@gmail.com",
};

export function whatsappLink(message: string) {
  return `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(message)}`;
}
export function telegramLink() {
  return `https://t.me/${siteConfig.telegramUsername}`;
}
