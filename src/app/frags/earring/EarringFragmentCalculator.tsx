"use client";

import { characters } from "@/constants/characters";
import Image from "next/image";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Fragment } from "react";
import { Icon } from "@iconify/react";
import { dismantleEarrings } from "@/constants/dismantleItems";

const earringFragmentSchema = z.object({
  earring: z.number().min(0),
  piercing: z.number().min(0),
  rareEarring: z.number().min(0),
  rarePiercing: z.number().min(0),
  epicEarring: z.number().min(0),
  epicPiercing: z.number().min(0),
  relicEarring: z.number().min(0),
  relicPiercing: z.number().min(0),
  orderEarring: z.number().min(0),
  orderPiercing: z.number().min(0),
  chaosEarring: z.number().min(0),
  chaosPiercing: z.number().min(0),
});

type CharacterId = keyof typeof characters;

const formSchema = z.record(
  z.string(),
  earringFragmentSchema
).refine(
  (data): data is Record<CharacterId, z.infer<typeof earringFragmentSchema>> => {
    return Object.keys(data).every(key => key in characters);
  }
);

type FormData = z.infer<typeof formSchema>;

export function EarringFragmentCalculator() {
  const defaultValues = Object.keys(characters).reduce((acc, id) => ({
    ...acc,
    [id]: {
      earring: 0,
      piercing: 0,
      rareEarring: 0,
      rarePiercing: 0,
      epicEarring: 0,
      epicPiercing: 0,
      relicEarring: 0,
      relicPiercing: 0,
      orderEarring: 0,
      orderPiercing: 0,
      chaosEarring: 0,
      chaosPiercing: 0,
    },
  }), {} as FormData);

  const { control, watch } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: (() => {
      if (typeof window === 'undefined') return defaultValues;
      const savedData = localStorage.getItem('earringFragmentData');
      return savedData ? JSON.parse(savedData) : defaultValues;
    })(),
  });

  const formValues = watch();

  const calculateTotalFragments = (fragments: z.infer<typeof earringFragmentSchema>) => {
    // Calculate earring fragments
    const earringFrags = fragments.earring + // Normal earrings give 1:1
      (fragments.rareEarring * dismantleEarrings["rare-dimensional-earring"].fragments["dimension-earring-fragment"]!) +
      (fragments.epicEarring * dismantleEarrings["epic-dimensional-earring"].fragments["dimension-earring-fragment"]!) +
      (fragments.relicEarring * dismantleEarrings["relic-dimensional-earring"].fragments["dimension-earring-fragment"]!) +
      (fragments.orderEarring * dismantleEarrings["order-earring"].fragments["dimension-earring-fragment"]!) +
      (fragments.chaosEarring * dismantleEarrings["chaos-earring"].fragments["dimension-earring-fragment"]!);

    // Calculate piercing fragments
    const piercingFrags = fragments.piercing + // Normal piercings give 1:1
      (fragments.rarePiercing * dismantleEarrings["rare-dimensional-piercing"].fragments["dimension-piercing-fragment"]!) +
      (fragments.epicPiercing * dismantleEarrings["epic-dimensional-piercing"].fragments["dimension-piercing-fragment"]!) +
      (fragments.relicPiercing * dismantleEarrings["relic-dimensional-piercing"].fragments["dimension-piercing-fragment"]!) +
      (fragments.orderPiercing * dismantleEarrings["order-piercing"].fragments["dimension-piercing-fragment"]!) +
      (fragments.chaosPiercing * dismantleEarrings["chaos-piercing"].fragments["dimension-piercing-fragment"]!);

    // Calculate cores
    const cores = (fragments.relicEarring * dismantleEarrings["relic-dimensional-earring"].fragments["dimension-core"]!) +
      (fragments.relicPiercing * dismantleEarrings["relic-dimensional-piercing"].fragments["dimension-core"]!) +
      (fragments.orderEarring * dismantleEarrings["order-earring"].fragments["dimension-core"]!) +
      (fragments.orderPiercing * dismantleEarrings["order-piercing"].fragments["dimension-core"]!) +
      (fragments.chaosEarring * dismantleEarrings["chaos-earring"].fragments["dimension-core"]!) +
      (fragments.chaosPiercing * dismantleEarrings["chaos-piercing"].fragments["dimension-core"]!);

    return {
      earring: earringFrags,
      piercing: piercingFrags,
      cores: cores
    };
  };

  const handleBlur = () => {
    localStorage.setItem('earringFragmentData', JSON.stringify(formValues));
  };

  return (
    <div className="w-fit mx-auto">
      <div className="grid grid-cols-3 gap-2 w-full" style={{ gridTemplateColumns: 'min-content max-content 1fr' }}>
        {Object.entries(characters).map(([id, character]) => (
          <Fragment key={id}>
            {/* Character Portrait Column */}
            <div className="flex items-center p-4 bg-gradient-to-br from-[#0a0000] to-[#1a0000] rounded-lg flex-col gap-2">
              <div className="w-16 h-16 relative">
                <Image
                  src={character.profilePicture}
                  alt={character.name}
                  fill
                  className="object-cover rounded"
                />
              </div>
              <span className="text-lg font-medium">{character.name}</span>
            </div>

            {/* Inputs Column */}
            <div className="flex gap-4 items-center p-4 bg-gradient-to-br from-[#0a0000] to-[#1a0000] rounded-lg flex-row flex-nowrap">
                {/* Normal Earring & Piercing */}
                <div className="flex flex-col gap-2">
                  <div className="flex flex-col gap-1">
                    <span className="text-xs text-teal-500">Earring Fragments</span>
                    <div className="flex items-center">
                      <Controller
                        name={`${id}.earring`}
                        control={control}
                        render={({ field }) => (
                          <>
                            <button
                              type="button"
                              onClick={() => field.onChange(Math.max(0, (field.value || 0) - 1))}
                              className="px-2 py-1 bg-teal-700 border border-teal-700 rounded-l text-white hover:bg-teal-600"
                            >
                              <Icon icon="mdi:minus" className="w-4 h-4" />
                            </button>
                            <input
                              {...field}
                              type="number"
                              className="w-16 p-1 bg-gray-800 border-y border-teal-700 text-teal-400 text-center"
                              placeholder="Earring"
                              onBlur={() => {
                                field.onBlur();
                                handleBlur();
                              }}
                            />
                            <button
                              type="button"
                              onClick={() => field.onChange((field.value || 0) + 1)}
                              className="px-2 py-1 bg-teal-700 border border-teal-700 rounded-r text-white hover:bg-teal-600"
                            >
                              <Icon icon="mdi:plus" className="w-4 h-4" />
                            </button>
                          </>
                        )}
                      />
                    </div>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-xs text-teal-500">Piercing Fragments</span>
                    <div className="flex items-center">
                      <Controller
                        name={`${id}.piercing`}
                        control={control}
                        render={({ field }) => (
                          <>
                            <button
                              type="button"
                              onClick={() => field.onChange(Math.max(0, (field.value || 0) - 1))}
                              className="px-2 py-1 bg-teal-700 border border-teal-700 rounded-l text-white hover:bg-teal-600"
                            >
                              <Icon icon="mdi:minus" className="w-4 h-4" />
                            </button>
                            <input
                              {...field}
                              type="number"
                              className="w-16 p-1 bg-gray-800 border-y border-teal-700 text-teal-400 text-center"
                              placeholder="Piercing"
                              onBlur={() => {
                                field.onBlur();
                                handleBlur();
                              }}
                            />
                            <button
                              type="button"
                              onClick={() => field.onChange((field.value || 0) + 1)}
                              className="px-2 py-1 bg-teal-700 border border-teal-700 rounded-r text-white hover:bg-teal-600"
                            >
                              <Icon icon="mdi:plus" className="w-4 h-4" />
                            </button>
                          </>
                        )}
                      />
                    </div>
                  </div>
                </div>

                {/* Rare Earring & Piercing */}
                <div className="flex flex-col gap-2">
                  <div className="flex flex-col gap-1">
                    <span className="text-xs text-blue-500">Rare Earring</span>
                    <div className="flex items-center">
                      <Controller
                        name={`${id}.rareEarring`}
                        control={control}
                        render={({ field }) => (
                          <>
                            <button
                              type="button"
                              onClick={() => field.onChange(Math.max(0, (field.value || 0) - 1))}
                              className="px-2 py-1 bg-blue-700 border border-blue-700 rounded-l text-white hover:bg-blue-600"
                            >
                              <Icon icon="mdi:minus" className="w-4 h-4" />
                            </button>
                            <input
                              {...field}
                              type="number"
                              className="w-16 p-1 bg-gray-800 border-y border-blue-700 text-blue-400 text-center"
                              placeholder="Rare Earring"
                              onBlur={() => {
                                field.onBlur();
                                handleBlur();
                              }}
                            />
                            <button
                              type="button"
                              onClick={() => field.onChange((field.value || 0) + 1)}
                              className="px-2 py-1 bg-blue-700 border border-blue-700 rounded-r text-white hover:bg-blue-600"
                            >
                              <Icon icon="mdi:plus" className="w-4 h-4" />
                            </button>
                          </>
                        )}
                      />
                    </div>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-xs text-blue-500">Rare Piercing</span>
                    <div className="flex items-center">
                      <Controller
                        name={`${id}.rarePiercing`}
                        control={control}
                        render={({ field }) => (
                          <>
                            <button
                              type="button"
                              onClick={() => field.onChange(Math.max(0, (field.value || 0) - 1))}
                              className="px-2 py-1 bg-blue-700 border border-blue-700 rounded-l text-white hover:bg-blue-600"
                            >
                              <Icon icon="mdi:minus" className="w-4 h-4" />
                            </button>
                            <input
                              {...field}
                              type="number"
                              className="w-16 p-1 bg-gray-800 border-y border-blue-700 text-blue-400 text-center"
                              placeholder="Rare Piercing"
                              onBlur={() => {
                                field.onBlur();
                                handleBlur();
                              }}
                            />
                            <button
                              type="button"
                              onClick={() => field.onChange((field.value || 0) + 1)}
                              className="px-2 py-1 bg-blue-700 border border-blue-700 rounded-r text-white hover:bg-blue-600"
                            >
                              <Icon icon="mdi:plus" className="w-4 h-4" />
                            </button>
                          </>
                        )}
                      />
                    </div>
                  </div>
                </div>

                {/* Epic Earring & Piercing */}
                <div className="flex flex-col gap-2">
                  <div className="flex flex-col gap-1">
                    <span className="text-xs text-yellow-500">Epic Earring</span>
                    <div className="flex items-center">
                      <Controller
                        name={`${id}.epicEarring`}
                        control={control}
                        render={({ field }) => (
                          <>
                            <button
                              type="button"
                              onClick={() => field.onChange(Math.max(0, (field.value || 0) - 1))}
                              className="px-2 py-1 bg-yellow-700 border border-yellow-700 rounded-l text-white hover:bg-yellow-600"
                            >
                              <Icon icon="mdi:minus" className="w-4 h-4" />
                            </button>
                            <input
                              {...field}
                              type="number"
                              className="w-16 p-1 bg-gray-800 border-y border-yellow-700 text-yellow-400 text-center"
                              placeholder="Epic Earring"
                              onBlur={() => {
                                field.onBlur();
                                handleBlur();
                              }}
                            />
                            <button
                              type="button"
                              onClick={() => field.onChange((field.value || 0) + 1)}
                              className="px-2 py-1 bg-yellow-700 border border-yellow-700 rounded-r text-white hover:bg-yellow-600"
                            >
                              <Icon icon="mdi:plus" className="w-4 h-4" />
                            </button>
                          </>
                        )}
                      />
                    </div>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-xs text-yellow-500">Epic Piercing</span>
                    <div className="flex items-center">
                      <Controller
                        name={`${id}.epicPiercing`}
                        control={control}
                        render={({ field }) => (
                          <>
                            <button
                              type="button"
                              onClick={() => field.onChange(Math.max(0, (field.value || 0) - 1))}
                              className="px-2 py-1 bg-yellow-700 border border-yellow-700 rounded-l text-white hover:bg-yellow-600"
                            >
                              <Icon icon="mdi:minus" className="w-4 h-4" />
                            </button>
                            <input
                              {...field}
                              type="number"
                              className="w-16 p-1 bg-gray-800 border-y border-yellow-700 text-yellow-400 text-center"
                              placeholder="Epic Piercing"
                              onBlur={() => {
                                field.onBlur();
                                handleBlur();
                              }}
                            />
                            <button
                              type="button"
                              onClick={() => field.onChange((field.value || 0) + 1)}
                              className="px-2 py-1 bg-yellow-700 border border-yellow-700 rounded-r text-white hover:bg-yellow-600"
                            >
                              <Icon icon="mdi:plus" className="w-4 h-4" />
                            </button>
                          </>
                        )}
                      />
                    </div>
                  </div>
                </div>

                {/* Relic Earring & Piercing */}
                <div className="flex flex-col gap-2">
                  <div className="flex flex-col gap-1">
                    <span className="text-xs text-purple-500">Relic Earring</span>
                    <div className="flex items-center">
                      <Controller
                        name={`${id}.relicEarring`}
                        control={control}
                        render={({ field }) => (
                          <>
                            <button
                              type="button"
                              onClick={() => field.onChange(Math.max(0, (field.value || 0) - 1))}
                              className="px-2 py-1 bg-purple-700 border border-purple-700 rounded-l text-white hover:bg-purple-600"
                            >
                              <Icon icon="mdi:minus" className="w-4 h-4" />
                            </button>
                            <input
                              {...field}
                              type="number"
                              className="w-16 p-1 bg-gray-800 border-y border-purple-700 text-purple-400 text-center"
                              placeholder="Relic Earring"
                              onBlur={() => {
                                field.onBlur();
                                handleBlur();
                              }}
                            />
                            <button
                              type="button"
                              onClick={() => field.onChange((field.value || 0) + 1)}
                              className="px-2 py-1 bg-purple-700 border border-purple-700 rounded-r text-white hover:bg-purple-600"
                            >
                              <Icon icon="mdi:plus" className="w-4 h-4" />
                            </button>
                          </>
                        )}
                      />
                    </div>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-xs text-purple-500">Relic Piercing</span>
                    <div className="flex items-center">
                      <Controller
                        name={`${id}.relicPiercing`}
                        control={control}
                        render={({ field }) => (
                          <>
                            <button
                              type="button"
                              onClick={() => field.onChange(Math.max(0, (field.value || 0) - 1))}
                              className="px-2 py-1 bg-purple-700 border border-purple-700 rounded-l text-white hover:bg-purple-600"
                            >
                              <Icon icon="mdi:minus" className="w-4 h-4" />
                            </button>
                            <input
                              {...field}
                              type="number"
                              className="w-16 p-1 bg-gray-800 border-y border-purple-700 text-purple-400 text-center"
                              placeholder="Relic Piercing"
                              onBlur={() => {
                                field.onBlur();
                                handleBlur();
                              }}
                            />
                            <button
                              type="button"
                              onClick={() => field.onChange((field.value || 0) + 1)}
                              className="px-2 py-1 bg-purple-700 border border-purple-700 rounded-r text-white hover:bg-purple-600"
                            >
                              <Icon icon="mdi:plus" className="w-4 h-4" />
                            </button>
                          </>
                        )}
                      />
                    </div>
                  </div>
                </div>

                {/* Order Earring & Piercing */}
                <div className="flex flex-col gap-2">
                  <div className="flex flex-col gap-1">
                    <span className="text-xs text-sky-500">Order Earring</span>
                    <div className="flex items-center">
                      <Controller
                        name={`${id}.orderEarring`}
                        control={control}
                        render={({ field }) => (
                          <>
                            <button
                              type="button"
                              onClick={() => field.onChange(Math.max(0, (field.value || 0) - 1))}
                              className="px-2 py-1 bg-sky-700 border border-sky-700 rounded-l text-white hover:bg-sky-600"
                            >
                              <Icon icon="mdi:minus" className="w-4 h-4" />
                            </button>
                            <input
                              {...field}
                              type="number"
                              className="w-16 p-1 bg-gray-800 border-y border-sky-700 text-sky-400 text-center"
                              placeholder="Order Earring"
                              onBlur={() => {
                                field.onBlur();
                                handleBlur();
                              }}
                            />
                            <button
                              type="button"
                              onClick={() => field.onChange((field.value || 0) + 1)}
                              className="px-2 py-1 bg-sky-700 border border-sky-700 rounded-r text-white hover:bg-sky-600"
                            >
                              <Icon icon="mdi:plus" className="w-4 h-4" />
                            </button>
                          </>
                        )}
                      />
                    </div>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-xs text-sky-500">Order Piercing</span>
                    <div className="flex items-center">
                      <Controller
                        name={`${id}.orderPiercing`}
                        control={control}
                        render={({ field }) => (
                          <>
                            <button
                              type="button"
                              onClick={() => field.onChange(Math.max(0, (field.value || 0) - 1))}
                              className="px-2 py-1 bg-sky-700 border border-sky-700 rounded-l text-white hover:bg-sky-600"
                            >
                              <Icon icon="mdi:minus" className="w-4 h-4" />
                            </button>
                            <input
                              {...field}
                              type="number"
                              className="w-16 p-1 bg-gray-800 border-y border-sky-700 text-sky-400 text-center"
                              placeholder="Order Piercing"
                              onBlur={() => {
                                field.onBlur();
                                handleBlur();
                              }}
                            />
                            <button
                              type="button"
                              onClick={() => field.onChange((field.value || 0) + 1)}
                              className="px-2 py-1 bg-sky-700 border border-sky-700 rounded-r text-white hover:bg-sky-600"
                            >
                              <Icon icon="mdi:plus" className="w-4 h-4" />
                            </button>
                          </>
                        )}
                      />
                    </div>
                  </div>
                </div>

                {/* Chaos Earring & Piercing */}
                <div className="flex flex-col gap-2">
                  <div className="flex flex-col gap-1">
                    <span className="text-xs text-violet-500">Chaos Earring</span>
                    <div className="flex items-center">
                      <Controller
                        name={`${id}.chaosEarring`}
                        control={control}
                        render={({ field }) => (
                          <>
                            <button
                              type="button"
                              onClick={() => field.onChange(Math.max(0, (field.value || 0) - 1))}
                              className="px-2 py-1 bg-violet-700 border border-violet-700 rounded-l text-white hover:bg-violet-600"
                            >
                              <Icon icon="mdi:minus" className="w-4 h-4" />
                            </button>
                            <input
                              {...field}
                              type="number"
                              className="w-16 p-1 bg-gray-800 border-y border-violet-700 text-violet-400 text-center"
                              placeholder="Chaos Earring"
                              onBlur={() => {
                                field.onBlur();
                                handleBlur();
                              }}
                            />
                            <button
                              type="button"
                              onClick={() => field.onChange((field.value || 0) + 1)}
                              className="px-2 py-1 bg-violet-700 border border-violet-700 rounded-r text-white hover:bg-violet-600"
                            >
                              <Icon icon="mdi:plus" className="w-4 h-4" />
                            </button>
                          </>
                        )}
                      />
                    </div>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-xs text-violet-500">Chaos Piercing</span>
                    <div className="flex items-center">
                      <Controller
                        name={`${id}.chaosPiercing`}
                        control={control}
                        render={({ field }) => (
                          <>
                            <button
                              type="button"
                              onClick={() => field.onChange(Math.max(0, (field.value || 0) - 1))}
                              className="px-2 py-1 bg-violet-700 border border-violet-700 rounded-l text-white hover:bg-violet-600"
                            >
                              <Icon icon="mdi:minus" className="w-4 h-4" />
                            </button>
                            <input
                              {...field}
                              type="number"
                              className="w-16 p-1 bg-gray-800 border-y border-violet-700 text-violet-400 text-center"
                              placeholder="Chaos Piercing"
                              onBlur={() => {
                                field.onBlur();
                                handleBlur();
                              }}
                            />
                            <button
                              type="button"
                              onClick={() => field.onChange((field.value || 0) + 1)}
                              className="px-2 py-1 bg-violet-700 border border-violet-700 rounded-r text-white hover:bg-violet-600"
                            >
                              <Icon icon="mdi:plus" className="w-4 h-4" />
                            </button>
                          </>
                        )}
                      />
                    </div>
                  </div>
                </div>
            </div>

            {/* Results Column */}
            <div className="flex flex-col gap-2 items-center p-4 bg-gradient-to-br from-[#0a0000] to-[#1a0000] rounded-lg">
              <span className="text-sm text-gray-400">Totals</span>
              <div className="flex gap-4">
                <div className="flex flex-col items-center">
                  <span className="text-xs text-teal-500">Earring</span>
                  <div className="w-16 p-1 text-xl font-bold text-center text-teal-400">
                    {calculateTotalFragments(formValues[id] || defaultValues[id]).earring}
                  </div>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-xs text-teal-500">Piercing</span>
                  <div className="w-16 p-1 text-xl font-bold text-center text-teal-400">
                    {calculateTotalFragments(formValues[id] || defaultValues[id]).piercing}
                  </div>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-xs text-teal-500">Cores</span>
                  <div className="w-16 p-1 text-xl font-bold text-center text-teal-400">
                    {calculateTotalFragments(formValues[id] || defaultValues[id]).cores}
                  </div>
                </div>
              </div>
            </div>
          </Fragment>
        ))}
      </div>
    </div>
  );
} 