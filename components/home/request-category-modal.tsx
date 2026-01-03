"use client";

import { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { FormInput } from "@/components/ui/form-input";
import { Textarea } from "@/components/ui/textarea";
import { Field, FieldLabel, FieldDescription } from "@/components/ui/field";
import {
  PlusSignIcon,
  Tag01Icon,
  User02Icon,
  Mail01Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

interface RequestCategoryModalProps {
  children: React.ReactNode;
}

export function RequestCategoryModal({ children }: RequestCategoryModalProps) {
  const [categoryName, setCategoryName] = useState("");
  const [description, setDescription] = useState("");
  const [yourName, setYourName] = useState("");
  const [yourEmail, setYourEmail] = useState("");
  const [open, setOpen] = useState(false);

  const handleSubmit = () => {
    const subject = `New Category Request: ${categoryName}`;
    const body = `Hello avantmag team,

I would like to request a new category for the magazine:

Category Name: ${categoryName}
Description: ${description}

My Details:
Name: ${yourName}
Email: ${yourEmail}

Thank you for considering this request!`;

    const mailtoLink = `mailto:teeydigba@gmail.com?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;

    window.location.href = mailtoLink;

    setOpen(false);
    setCategoryName("");
    setDescription("");
    setYourName("");
    setYourEmail("");
  };

  const isFormValid =
    categoryName.trim() &&
    description.trim() &&
    yourName.trim() &&
    yourEmail.trim();

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild className="h-full">
        {children}
      </AlertDialogTrigger>
      <AlertDialogContent className="min-w-full sm:min-w-auto max-h-[90vh] max-w-full sm:max-w-[480px] rounded-lg">
        <AlertDialogHeader>
          <AlertDialogTitle className="lowercase text-xl sm:text-2xl font-medium">
            request new category
          </AlertDialogTitle>
          <AlertDialogDescription className="lowercase text-sm sm:text-base">
            have an idea for a new category? share your suggestion with us and
            we&apos;ll review it.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div className="grid gap-5">
          <Field>
            <FieldLabel
              htmlFor="category-name"
              className="lowercase text-sm font-medium"
            >
              category name
            </FieldLabel>
            <FormInput
              id="category-name"
              placeholder="e.g., space exploration"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              autoComplete="off"
              startIcon={Tag01Icon}
            />
          </Field>

          <Field>
            <FieldLabel
              htmlFor="description"
              className="lowercase text-sm font-medium"
            >
              description
            </FieldLabel>
            <Textarea
              id="description"
              placeholder="explain what this category would cover and why it would be valuable…"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="min-h-24 text-base"
            />
            <FieldDescription className="lowercase text-sm">
              tell us about the topics this category would explore
            </FieldDescription>
          </Field>

          <Field>
            <FieldLabel
              htmlFor="your-name"
              className="lowercase text-sm font-medium"
            >
              your name
            </FieldLabel>
            <FormInput
              id="your-name"
              placeholder="john doe"
              value={yourName}
              onChange={(e) => setYourName(e.target.value)}
              autoComplete="name"
              startIcon={User02Icon}
            />
          </Field>

          <Field>
            <FieldLabel
              htmlFor="your-email"
              className="lowercase text-sm font-medium"
            >
              your email
            </FieldLabel>
            <FormInput
              id="your-email"
              type="email"
              placeholder="you@example.com"
              value={yourEmail}
              onChange={(e) => setYourEmail(e.target.value)}
              autoComplete="email"
              inputMode="email"
              startIcon={Mail01Icon}
            />
          </Field>
        </div>

        <AlertDialogFooter>
          <AlertDialogCancel className="min-w-[30%] lowercase text-sm">
            cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleSubmit}
            disabled={!isFormValid}
            className="flex-1 lowercase text-sm"
          >
            send request
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
