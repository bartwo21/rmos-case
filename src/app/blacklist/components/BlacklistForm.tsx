"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
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
import { blacklistFormSchema } from "../schemas/blacklist.schemas";

type BlacklistFormValues = z.infer<typeof blacklistFormSchema>;

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

  const form = useForm<BlacklistFormValues>({
    resolver: zodResolver(blacklistFormSchema),
    defaultValues: {
      Adi: selectedItem?.Adi || "",
      Soy: selectedItem?.Soy || "",
      Aciklama: selectedItem?.Aciklama || "",
    },
  });

  const blacklistMutation = useMutation({
    mutationFn: (data: BlacklistAddUpdateRequest) => {
      return blacklistService.addOrUpdateBlacklistItem(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blacklist"] });
      if (onSuccess) onSuccess();
      form.reset();
    },
    onError: (error) => {
      console.error("Form submission error:", error);
    },
    onSettled: () => {
      setIsSubmitting(false);
    },
  });

  function onSubmit(values: BlacklistFormValues) {
    setIsSubmitting(true);

    const requestData: BlacklistAddUpdateRequest = {
      db_Id,
      Id: selectedItem?.Id || 0,
      Adi: values.Adi,
      Soy: values.Soy,
      Aciklama: values.Aciklama || "",
    };

    blacklistMutation.mutate(requestData);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="Adi"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="Soy"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Surname</FormLabel>
              <FormControl>
                <Input placeholder="Surname" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="Aciklama"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder="Description" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Processing..." : selectedItem ? "Update" : "Add"}
        </Button>
      </form>
    </Form>
  );
}
