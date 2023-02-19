"use client";
import "client-only";

import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { SourceChecker } from "./SourceChecker";

export const formSchema = z.object({});

export type FormSchema = z.infer<typeof formSchema>;

export const RegisterForm: React.FC<{
  className?: string;
  sourceId: string | undefined;
}> = ({ className, sourceId }) => {
  const {
    control,
    formState: { errors },
    handleSubmit,
    register,
    setValue,
    watch,
    getValues,
    reset,
  } = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
  });

  return <form>{sourceId && <SourceChecker sourceId={sourceId} />}</form>;
};
