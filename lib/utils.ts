import { mappings } from "@/constants";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const techIconBaseURL = "https://cdn.jsdelivr.net/gh/devicons/devicon/icons";

const normalizeTechName = (tech: string) => {
  const key = tech.toLowerCase().replace(/\.js$/, "").replace(/\s+/g, "");
  return mappings[key as keyof typeof mappings];
};

const checkIconExists = async (url: string) => {
  try {
    const response = await fetch(url, { method: "HEAD" });
    return response.ok; // Returns true if the icon exists
  } catch {
    return false;
  }
};

export const getTechLogos = async (techArray: string[]) => {
  const logoURLs = techArray.map((tech) => {
    const normalized = normalizeTechName(tech);
    return {
      tech,
      url: `${techIconBaseURL}/${normalized}/${normalized}-original.svg`,
    };
  });

  const results = await Promise.all(
    logoURLs.map(async ({ tech, url }) => ({
      tech,
      url: (await checkIconExists(url)) ? url : "/tech.svg",
    }))
  );

  return results;
};

export const handleFirebaseError = (error: any) => {
  if (error?.code) {
    switch (error.code) {
      case "auth/email-already-in-use":
        return "This email is already in use.";
      case "auth/invalid-email":
        return "The email address is invalid.";
      case "auth/weak-password":
        return "Password is too weak. Please choose a stronger password.";
      case "auth/user-disabled":
        return "This account has been disabled. Contact support.";
      case "auth/user-not-found":
        return "No account found with this email.";
      case "auth/wrong-password":
        return "Incorrect password. Please try again.";
      case "auth/missing-password":
        return "Password is required.";
      case "auth/too-many-requests":
        return "Too many attempts. Please try again later.";
      case "auth/account-exists-with-different-credential":
        return "An account already exists with the same email but different sign-in method.";
      case "auth/invalid-credential":
        return "The provided authentication credential is invalid.";
      default:
        return "An unexpected error occurred. Please try again.";
    }
  }
  return "An unknown error occurred.";
};
