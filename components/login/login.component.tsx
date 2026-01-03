"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  MailIcon,
  EyeIcon,
  UserIcon,
  Loading03Icon,
  LockPasswordIcon,
} from "@hugeicons/core-free-icons";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Field,
  FieldContent,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { FormInput } from "@/components/ui/form-input";
import { PageContainer } from "@/components/ui/page-container";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  rememberMe: z.boolean(),
});

type LoginFormData = z.infer<typeof loginSchema>;

export const Login = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);

    console.log({ data });
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-md"
      >
        Skip to content
      </a>
      <PageContainer className="flex-1 flex flex-col">
        <div className="flex items-center justify-between py-8">
          <div className="w-10 h-10 bg-foreground rounded flex items-center justify-center">
            <span className="text-background font-bold text-xl">M</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">
              Don&apos;t have an account?
            </span>
            <Button variant="outline" size="sm" asChild>
              <a href="/register">Register</a>
            </Button>
          </div>
        </div>

        <main
          id="main-content"
          className="flex-1 flex flex-col items-center justify-center w-full max-w-md mx-auto py-12 scroll-mt-8"
          style={{
            paddingTop: "env(safe-area-inset-top, 0)",
            paddingBottom: "env(safe-area-inset-bottom, 0)",
          }}
        >
          <div className="w-20 h-20 rounded-full border-2 border-border flex items-center justify-center mb-6">
            <HugeiconsIcon
              icon={UserIcon}
              strokeWidth={1.5}
              className="size-10 text-muted-foreground"
              aria-hidden="true"
            />
          </div>

          <h1 className="text-3xl font-bold mb-2 scroll-mt-8">
            Login to your account
          </h1>
          <p className="text-muted-foreground mb-8">
            Enter your details to login.
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-6">
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="email">Email Address *</FieldLabel>
                <FieldContent>
                  <FormInput
                    id="email"
                    type="email"
                    inputMode="email"
                    placeholder="hello@mimicdesign.co…"
                    autoComplete="off"
                    spellCheck={false}
                    aria-invalid={!!errors.email}
                    startIcon={MailIcon}
                    {...register("email")}
                  />
                  {errors.email && (
                    <FieldError role="alert" aria-live="polite">
                      {errors.email.message}
                    </FieldError>
                  )}
                </FieldContent>
              </Field>

              <Field>
                <FieldLabel htmlFor="password">Password *</FieldLabel>
                <FieldContent>
                  <FormInput
                    id="password"
                    type={showPassword ? "text" : "password"}
                    inputMode="text"
                    placeholder="Enter your password…"
                    autoComplete="current-password"
                    aria-invalid={!!errors.password}
                    startIcon={LockPasswordIcon}
                    endIcon={EyeIcon}
                    onEndIconClick={() => setShowPassword(!showPassword)}
                    endIconAriaLabel={
                      showPassword ? "Hide password" : "Show password"
                    }
                    {...register("password")}
                  />
                  {errors.password && (
                    <FieldError role="alert" aria-live="polite">
                      {errors.password.message}
                    </FieldError>
                  )}
                </FieldContent>
              </Field>

              <div className="flex items-center justify-between">
                <Label
                  htmlFor="rememberMe"
                  className="text-sm font-normal cursor-pointer flex items-center gap-2 min-h-[44px] touch-manipulation"
                >
                  <input
                    type="checkbox"
                    id="rememberMe"
                    {...register("rememberMe")}
                    className="size-4 rounded border-input accent-primary"
                  />
                  Keep me logged in
                </Label>
                <Button
                  type="button"
                  variant="link"
                  className="text-sm h-auto p-0"
                >
                  Forgot password?
                </Button>
              </div>

              <Button
                type="submit"
                className="w-full min-h-[44px] touch-manipulation"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <HugeiconsIcon
                      icon={Loading03Icon}
                      strokeWidth={2}
                      className="size-4 animate-spin motion-reduce:animate-none"
                    />
                    <span className="sr-only">Logging in</span>
                    Login
                  </>
                ) : (
                  "Login"
                )}
              </Button>
            </FieldGroup>
          </form>
        </main>
      </PageContainer>
    </div>
  );
};
