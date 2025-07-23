import { Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";

const roles = [
  { name: "Guest", value: "guest" },
  { name: "Admin", value: "admin" },
];

export default function DropdownRole({ role, setRole }) {
  return (
    <Listbox value={role} onChange={setRole}>
      <div className="relative mt-1">
        <Listbox.Button className="relative w-full cursor-pointer rounded-lg bg-white/10 py-2 pl-4 pr-10 text-left text-white border border-white focus:outline-none focus:ring-2 focus:ring-blue-400">
          <span className="block truncate">
            {roles.find((r) => r.value === role)?.name}
          </span>
          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
            <ChevronUpDownIcon className="h-5 w-5 text-white" />
          </span>
        </Listbox.Button>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-lg bg-gray-900 text-white shadow-lg ring-1 ring-white/10 focus:outline-none text-sm z-50">
            {roles.map((r) => (
              <Listbox.Option
                key={r.value}
                className={({ active }) =>
                  `cursor-pointer select-none py-2 px-4 ${
                    active ? "bg-blue-600 text-white" : "text-white"
                  }`
                }
                value={r.value}
              >
                {({ selected }) => (
                  <span className={`flex justify-between ${selected ? "font-medium" : "font-normal"}`}>
                    {r.name}
                    {selected && (
                      <CheckIcon className="h-5 w-5 text-white" />
                    )}
                  </span>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  );
}
