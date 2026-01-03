import { notFound } from "next/navigation";

export default function Custom404Page() {
  // Redirect to the proper not-found page
  notFound();
}
