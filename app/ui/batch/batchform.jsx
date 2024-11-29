"use client";

// import { ExclamationCircleIcon } from "@heroicons/react/24/outline";
import { ArrowUpTrayIcon } from "@heroicons/react/20/solid";
import { batchSubmit, getBatchState } from "@/app/lib/action";
import { useActionState } from "react";

export default function BatchForm({ modelsData }) {
  const [state, formAction] = useActionState(batchSubmit, undefined);
  const [batchState, batchStateAction, error] = useActionState(
    getBatchState,
    null
  );

  const models = modelsData.data;
  console.log(models);

  if (batchState) {
    console.log(batchState);
  }

  console.log(state);

  return (
    <>
      <div className="w-full">
        <form action={formAction} className="space-y-3">
          <div className="flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8">
            <h1 className="mb-3 text-black text-2xl">
              Select a model and upload a .csv file to begin batch processing
            </h1>
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
                    defaultValue=""
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
                {/* {errorMessage && (
              <p className="text-sm text-red-500">{errorMessage}</p>
            )} */}
              </div>
              <div className="mt-4">
                <label
                  className="mb-3 mt-5 block text-xs font-medium text-gray-900"
                  htmlFor="file"
                >
                  Choose File to Upload
                </label>
                <div className="relative">
                  <input
                    className="peer text-black block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                    id="file"
                    type="file"
                    name="file"
                    accept=".csv"
                  />
                  <ArrowUpTrayIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                </div>
                {/* {errorMessage && (
              <p className="text-sm text-red-500">{errorMessage}</p>
            )} */}
              </div>
            </div>
            <button
              className="flex h-10  mt-4 items-center rounded-lg bg-blue-500 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 active:bg-blue-600 aria-disabled:cursor-not-allowed aria-disabled:opacity-50"
              type="submit"
              // aria-disabled={isPending}
            >
              Submit
            </button>
            <div
              className="flex h-8 items-end space-x-1"
              aria-live="polite"
              aria-atomic="true"
            >
              {/* {errorMessage && (
            <>
              <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
              <p className="text-sm text-red-500">{errorMessage}</p>
            </>
          )} */}
            </div>
          </div>
        </form>
      </div>
      <div className="w-full pt-10">
        <form action={batchStateAction} className="space-y-3">
          <div className="flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8">
            <h1 className="mb-3 text-black text-2xl">
              Select a model and upload and return the current state of the
              Batch
            </h1>
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
                    defaultValue=""
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
            </div>
            <button
              className="flex h-10  mt-4 items-center rounded-lg bg-blue-500 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 active:bg-blue-600 aria-disabled:cursor-not-allowed aria-disabled:opacity-50"
              type="submit"
              // aria-disabled={isPending}
            >
              Submit
            </button>
            <div
              className="flex h-8 items-end space-x-1"
              aria-live="polite"
              aria-atomic="true"
            ></div>
            {batchState ? (
              <div className="mt-4">
                <h2 className="mb-3 mt-5 block text-xs font-medium text-gray-900">
                  State of Batch
                </h2>
                <div className="relative">
                  {batchState.data.data.files?.map((file) => (
                    <div
                      key={file.id}
                      className="peer text-black block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                    >
                      <h3>{file.filename}</h3>
                      <p>File ID: {file.id}</p>
                      <p>Date Created: {file.timestamp}</p>
                      <button
                        className="flex h-10  mt-4 items-center rounded-lg bg-blue-500 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 active:bg-blue-600 aria-disabled:cursor-not-allowed aria-disabled:opacity-50"
                        type="submit"
                        // aria-disabled={isPending}
                      >
                        Delete Batch{" "}
                      </button>
                    </div>
                  ))}
                  {error && <p className="text-sm text-red-500">{error}</p>}
                </div>
              </div>
            ) : null}
          </div>
        </form>
      </div>
    </>
  );
}
