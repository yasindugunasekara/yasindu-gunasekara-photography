export interface Service {
  id: string;
  title: string;
  description: string;
  image: string;
  icon: string;
}

export interface PortfolioImage {
  id: string;
  src: string;
  alt: string;
  category: string;
}

export interface Award {
  id: string;
  title: string;
  organization: string;
  year: string;
  image: string;
  description: string;
}

export interface ContactForm {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
}