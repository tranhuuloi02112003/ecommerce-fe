declare module "*.svg" {
  const content: string;
  export default content;
}

declare module "@/*";

declare module "*.png" {
  const content: string;
  export default content;
}

declare module "swiper/css";
declare module "swiper/css/*";
