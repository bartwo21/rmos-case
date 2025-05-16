"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { BlacklistAddUpdateRequest, BlacklistItem } from "@/types/blacklist";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { blacklistService } from "@/services/blacklistService";
import { FormValues, blacklistFormSchema } from "../schemas/blacklist.schemas";
import { useTranslations } from "next-intl";
import { Spinner } from "@/components/ui/spinner";

interface BlacklistFormProps {
  selectedItem?: BlacklistItem;
  onSuccess?: () => void;
  db_Id: number;
}

export default function BlacklistForm({
  selectedItem,
  onSuccess,
  db_Id,
}: BlacklistFormProps) {
  const queryClient = useQueryClient();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const t = useTranslations();

  const schema = blacklistFormSchema;

  const getDefaultValues = () => {
    if (!selectedItem) return { Adi: "", Soy: "", Aciklama: "" };

    return {
      Adi: selectedItem.Adi?.toString() || "",
      Soy: selectedItem.Soy?.toString() || "",
      Aciklama: selectedItem.Aciklama?.toString() || "",
    };
  };

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: getDefaultValues(),
  });

  useEffect(() => {
    form.reset(getDefaultValues());
  }, [selectedItem, form]);

  const blacklistMutation = useMutation({
    mutationFn: (data: BlacklistAddUpdateRequest) => {
      return blacklistService.addOrUpdateBlacklistItem(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blacklist"] });
      if (onSuccess) onSuccess();
    },
    onError: (error) => {
      console.error("Form submission error:", error);
    },
    onSettled: () => {
      setIsSubmitting(false);
    },
  });

  function onSubmit(values: FormValues) {
    setIsSubmitting(true);

    const requestData: BlacklistAddUpdateRequest = {
      ...values,
      db_Id,
      Id: selectedItem?.Id || 0,
    };

    blacklistMutation.mutate(requestData);
  }

  const renderFormFields = () => {
    const editableFields = ["Adi", "Soy", "Aciklama"] as const;

    return editableFields.map((fieldName) => (
      <FormField
        key={fieldName}
        control={form.control}
        name={fieldName}
        render={({ field }) => (
          <FormItem>
            <FormLabel>{fieldName}</FormLabel>
            <FormControl>
              {fieldName === "Aciklama" ? (
                <Textarea placeholder={fieldName} {...field} />
              ) : (
                <Input placeholder={fieldName} {...field} />
              )}
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    ));
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {renderFormFields()}

        <Button type="submit" disabled={isSubmitting} className="w-full">
          {isSubmitting ? (
            <Spinner size="sm" />
          ) : selectedItem ? (
            t("blacklist.update")
          ) : (
            t("blacklist.add")
          )}
        </Button>
      </form>
    </Form>
  );
}
