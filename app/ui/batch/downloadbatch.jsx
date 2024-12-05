"use client";
import {
  batchSubmit,
  getBatchState,
  deleteBatch,
  getSingleBatch,
} from "@/app/lib/action";
import { useActionState, useEffect, useState, useCallback } from "react";
export default function DownloadBatch({ modelsData }) {
  const models = modelsData.data;
  console.log(models);

  const [model, setModel] = useState("");
  const [state, action] = useActionState(getSingleBatch, null);
  console.log(model);
  return (
    <div className="w-full pt-10">
      <form action={action} className="space-y-3">
        <div className="flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8">
          <h1 className="mb-3 text-black text-2xl">Download a Batch File</h1>
          <div className="w-full">
            <div>
              <label
                className="mb-3 mt-5 block text-xs font-medium text-gray-900"
                htmlFor="model"
              >
                Select Model
              </label>
              <div className="relative">
                <select
                  className="peer text-black block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                  id="model"
                  name="model"
                  value={model}
                  onChange={(e) => setModel(e.target.value)}
                >
                  <option value="" disabled>
                    -- Select a Model --
                  </option>
                  {models.map((model, i) => (
                    <option
                      key={model.attributes.name + model.id}
                      value={model.id}
                    >
                      {model.attributes.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="mt-4">
              <label
                className="mb-3 mt-5 block text-xs font-medium text-gray-900"
                htmlFor="batchId"
              >
                Input Batch File ID
              </label>
              <div className="relative">
                <input
                  className="peer text-black block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                  id="fileId"
                  type="text"
                  name="fileId"
                />
              </div>
            </div>
          </div>
          <button
            className="flex h-10  mt-4 items-center rounded-lg bg-blue-500 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 active:bg-blue-600 aria-disabled:cursor-not-allowed aria-disabled:opacity-50"
            type="submit"
            // aria-disabled={isPending}
          >
            Download File
          </button>
        </div>
      </form>
    </div>
  );
}
