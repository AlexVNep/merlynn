"use client";

import { ExclamationCircleIcon } from "@heroicons/react/24/outline";
import { ArrowUpTrayIcon } from "@heroicons/react/20/solid";
import {
  batchSubmit,
  getBatchState,
  deleteBatch,
  getSingleBatch,
} from "@/app/lib/action";
import { useActionState, useEffect, useState, useCallback } from "react";

export default function BatchForm({ modelsData }) {
  const models = modelsData.data;
  console.log(models);

  const [model, setModel] = useState("");
  console.log(model);

  const [batches, setBatches] = useState([]);

  const fetchBatches = useCallback(async () => {
    console.log(model);
    if (!model) return; // Skip fetching if no model is selected
    try {
      const response = await getBatchState(model); // Pass the selected model ID
      console.log(response);
      setBatches(response?.data?.data?.data?.files || []);
    } catch (err) {
      console.error("Error fetching batches:", err);
    }
  }, [model]);

  const deleteHandler = async (fileId) => {
    try {
      await deleteBatch(model, fileId); // Perform the delete operation
      fetchBatches(); // Reload the batches after deletion
    } catch (err) {
      console.error("Error deleting batch:", err);
    }
  };

  // Load batches whenever the deleteHandler is called
  useEffect(() => {
    fetchBatches();
  }, [model, fetchBatches]);

  if (batches) {
    console.log(batches);
  }

  // const [downloadState, downloadAction, downloadError] = useActionState(
  //   getSingleBatch,
  //   null
  // );

  // if (downloadState) {
  //   console.log(downloadState);
  // }

  return (
    <>
      <div className="w-full">
        <form className="space-y-3">
          <div className="flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-4">
            <div className="w-full">
              <div>
                <label
                  className="mb-3 mt-5 block text-4xl font-medium text-gray-900"
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
                    {models.map((model) => (
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
            </div>
          </div>
        </form>
      </div>

      {batches && (
        <div className="flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-1 mt-8">
          <div className="mt-4">
            <h2 className="mb-3 mt-5 block text-3xl font-medium text-gray-900">
              Batches for Selected Model
            </h2>
            <div className="relative">
              {batches.map((file) => (
                <div
                  key={file.id}
                  className="peer text-black block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                >
                  <h3>{file.filename}</h3>
                  <p>File ID: {file.id}</p>
                  <p>Date Created: {file.timestamp}</p>
                  <div className="flex gap-5">
                    <button
                      className="flex h-10  mt-4 items-center rounded-lg bg-blue-500 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 active:bg-blue-600 aria-disabled:cursor-not-allowed aria-disabled:opacity-50"
                      type="button"
                      onClick={() => deleteHandler(file.id)}
                    >
                      Delete
                    </button>
                    <button
                      className="flex h-10  mt-4 items-center rounded-lg bg-blue-500 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 active:bg-blue-600 aria-disabled:cursor-not-allowed aria-disabled:opacity-50"
                      type="button"
                      onClick={() => downloadHandler(file.id)}
                    >
                      Download
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
