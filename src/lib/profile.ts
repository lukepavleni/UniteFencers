export type ProfileRole = "adult" | "minor";

export interface Profile {
  id: string;
  name: string;
  role: ProfileRole;
  date_of_birth: string | null;
}

export interface ProfileInput {
  name: string;
  role: ProfileRole | "";
  dateOfBirth: string;
}

export function parseProfileInput(formData: FormData): ProfileInput {
  return {
    name: (formData.get("name") as string | null)?.trim() ?? "",
    role: (formData.get("role") as ProfileRole | null) ?? "",
    dateOfBirth: (formData.get("dateOfBirth") as string | null) ?? "",
  };
}

export function validateProfileInput(input: ProfileInput): string | null {
  if (!input.name) {
    return "Please enter your name.";
  }

  if (input.role !== "adult" && input.role !== "minor") {
    return "Please select whether you're a parent/adult or a minor.";
  }

  if (input.role === "minor") {
    if (!input.dateOfBirth) {
      return "Please enter your date of birth.";
    }

    const dob = new Date(`${input.dateOfBirth}T00:00:00`);
    if (Number.isNaN(dob.getTime()) || dob > new Date()) {
      return "Please enter a valid date of birth.";
    }
  }

  return null;
}

export function getCurrentAge(dateOfBirth: string): number {
  const today = new Date();
  const dob = new Date(`${dateOfBirth}T00:00:00`);
  let age = today.getFullYear() - dob.getFullYear();

  const hasHadBirthdayThisYear =
    today.getMonth() > dob.getMonth() ||
    (today.getMonth() === dob.getMonth() && today.getDate() >= dob.getDate());

  if (!hasHadBirthdayThisYear) {
    age -= 1;
  }

  return age;
}

export function getInitial(name: string): string {
  const trimmed = name.trim();
  return trimmed ? trimmed.charAt(0).toUpperCase() : "?";
}
