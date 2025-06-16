"use client"
import { DataTable } from "@/components/shadcn-comps/data-table"
import { useState } from "react";
import { z } from "zod";
import { credentialsSchema } from "../../../types/credentialsSchema";
import data from "../../mocks/data.json"

export default function LocalCredentialsManager() {
  const initialData: z.infer<typeof credentialsSchema>[] = data;

  return (
    <DataTable data={initialData}/>
  );
}