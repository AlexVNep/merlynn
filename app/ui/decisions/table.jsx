import { fetchFilteredDecisions } from "@/app/lib/data";
import Image from "next/image";
import { FaceSmileIcon } from "@heroicons/react/24/outline";

export default async function DecisionsTable() {
  const decisions = JSON.parse(await fetchFilteredDecisions());

  console.log("Decisions in Table:", decisions); // Debugging

  const icons = [
    {
      icon: FaceSmileIcon,
    },
  ];

  if (decisions && decisions.length > 0) {
    return (
      <div className="mt-6 flow-root">
        <div className="inline-block min-w-full align-middle">
          <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
            <div className="md:hidden">
              {decisions.map((decision) => (
                <div
                  key={decision._id}
                  className="mb-2 w-full rounded-md bg-white p-4"
                >
                  <div className="flex items-center justify-between border-b pb-4">
                    <div>
                      <div className="mb-2 flex items-center">
                        <Image
                          src="/next.svg"
                          className="mr-2 rounded-full"
                          width={28}
                          height={28}
                          alt={`${decision._id}'s profile picture`}
                        />
                        <p>{decision._id}</p>
                      </div>
                      <p className="text-sm text-gray-500">
                        {decision.decision}
                      </p>
                    </div>
                    <p>{decision.confidence}</p>
                  </div>
                  <div className="flex w-full items-center justify-between pt-4">
                    <p>{decision.createdAt}</p>
                  </div>
                </div>
              ))}
            </div>
            <table className="hidden min-w-full text-gray-900 md:table">
              <thead className="rounded-lg text-left text-sm font-normal">
                <tr>
                  <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                    User
                  </th>
                  <th scope="col" className="px-3 py-5 font-medium">
                    Decision
                  </th>
                  <th scope="col" className="px-3 py-5 font-medium">
                    Confidence
                  </th>
                  <th scope="col" className="px-3 py-5 font-medium">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {decisions?.map((decision) => (
                  <tr
                    key={decision._id}
                    className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                  >
                    <td className="whitespace-nowrap py-3 pl-6 pr-3">
                      <div className="flex items-center gap-3">
                        <Image
                          src="/next.svg"
                          className="rounded-full"
                          width={28}
                          height={28}
                          alt={`${decision._id}'s profile picture`}
                        />
                        <p>{decision._id}</p>
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-3 py-3">
                      {decision.decision}
                    </td>
                    <td className="whitespace-nowrap px-3 py-3">
                      {decision.confidence}
                    </td>
                    <td className="whitespace-nowrap px-3 py-3">
                      {decision.createdAt}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <p>No decisions found</p>
      </div>
    );
  }
}
