"use client";
import { useActionState, useEffect, useState, useCallback } from "react";
import { ArrowUpTrayIcon } from "@heroicons/react/24/outline";
import { batchSubmit } from "@/app/lib/action";

export default function BatchForm({ modelsData }) {
  const models = modelsData.data;
  console.log(models);
  const [model, setModel] = useState("");
  console.log(model);
  const [state, formAction] = useActionState(batchSubmit, null);

  return (
    <div className="w-full">
      <form action={formAction} className="space-y-3">
        {/* Model Selection */}
        <div className="flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-4">
          <div className="w-full">
            <label
              className="mb-3 mt-5 block text-4xl font-medium text-gray-900"
              htmlFor="model"
            >
              Select Model
            </label>
            <div className="relative">
              <select
                className="peer block w-full rounded-md border border-gray-200 bg-white py-[9px] pl-10 text-sm text-black outline-2 placeholder:text-gray-500"
                id="model"
                name="model"
                value={model}
                onChange={(e) => setModel(e.target.value)}
              >
                <option value="" disabled>
                  -- Select a Model --
                </option>
                {models.map((model) => (
                  <option
                    key={`${model.attributes.name}-${model.id}`}
                    value={model.id}
                  >
                    {model.attributes.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          {/* File Upload */}
          <div className="mt-4">
            <label
              className="mb-3 block text-xs font-medium text-gray-900"
              htmlFor="file"
            >
              Choose File to Upload
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm text-black outline-2 placeholder:text-gray-500"
                id="file"
                type="file"
                name="file"
                accept=".csv"
              />
              <ArrowUpTrayIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
          <button
            className="flex h-10  mt-4 items-center rounded-lg bg-blue-500 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 active:bg-blue-600 aria-disabled:cursor-not-allowed aria-disabled:opacity-50"
            type="submit"
            // aria-disabled={isPending}
          >
            Upload File
          </button>
        </div>
      </form>
      {/* Success Message */}
      {state?.data?.data?.jobs && (
        <div className="mb-3 mt-5 block bg-gray-50 rounded-lg text-l font-medium text-gray-900 px-6 pb-4 pt-4">
          <h3 className="text-xl pb-2">Submit Successful</h3>
          <p>Filename: {state.data.data.jobs[0].filename}</p>
          <p>ID: {state.data.data.jobs[0].id}</p>
          <p>Uploaded: {state.data.data.jobs[0].uploaded}</p>
        </div>
      )}
    </div>
  );
}
