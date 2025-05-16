"use client";

import React, { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { blacklistService } from "@/services/blacklistService";
import { Loading } from "@/components/ui/loading";
import {
  BlacklistDataProps,
  BlacklistItem,
  BlacklistResponse,
} from "@/types/blacklist";
import { createBlacklistColumns } from "./BlacklistColumns";
import { DataTable } from "@/components/data-table/DataTable";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Plus, Edit } from "lucide-react";
import BlacklistForm from "./BlacklistForm";
import { useTranslations } from "next-intl";

export default function BlacklistData({ requestData }: BlacklistDataProps) {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<BlacklistItem | undefined>(
    undefined
  );

  const t = useTranslations();

  const blacklistQuery = useQuery<BlacklistResponse>({
    queryKey: ["blacklist", requestData],
    queryFn: async () => {
      const response = await blacklistService.getBlacklistData(requestData);
      return response.data;
    },
  });

  const handleAddNew = () => {
    setSelectedItem(undefined);
    setIsFormOpen(true);
  };

  const handleEdit = (item: BlacklistItem) => {
    setSelectedItem(item);
    setIsFormOpen(true);
  };

  const handleFormClose = () => {
    setIsFormOpen(false);
    setSelectedItem(undefined);
  };

  const columns = useMemo(() => {
    if (!blacklistQuery.data?.value) {
      return [];
    }

    const baseColumns = createBlacklistColumns(blacklistQuery.data.value);

    baseColumns.push({
      id: "actions",
      header: t("blacklist.edit"),
      cell: ({ row }) => {
        const item = row.original as BlacklistItem;
        return (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleEdit(item)}
            className="flex items-center gap-1 mx-auto"
          >
            <Edit className="h-4 w-4" />
            <span>{t("blacklist.edit")}</span>
          </Button>
        );
      },
      size: 100,
    });

    return baseColumns;
  }, [blacklistQuery.data?.value]);

  if (blacklistQuery.isLoading) {
    return <Loading />;
  }

  if (blacklistQuery.isError) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
        <p>{t("blacklist.errorLoading")}</p>
      </div>
    );
  }

  const blacklistData = blacklistQuery.data;

  if (!blacklistData?.value?.length) {
    return (
      <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded">
        <p>{t("blacklist.noData")}</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow lg:p-6 p-3">
      <div className="flex justify-start lg:-mb-[32px] mb-3">
        <Button
          onClick={handleAddNew}
          className="flex items-center gap-1 lg:w-fit w-full"
          size="sm"
        >
          <Plus />
          <span>{t("blacklist.addNew")}</span>
        </Button>
      </div>

      <DataTable columns={columns} data={blacklistData.value} />

      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="sm:max-w-[425px] max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {selectedItem
                ? t("blacklist.editRecord")
                : t("blacklist.addRecord")}
            </DialogTitle>
          </DialogHeader>
          <BlacklistForm
            selectedItem={selectedItem}
            onSuccess={handleFormClose}
            db_Id={requestData.db_Id}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
