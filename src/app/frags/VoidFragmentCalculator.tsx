"use client";

import { characters } from "@/constants/characters";
import Image from "next/image";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Fragment } from "react";
import { Icon } from "@iconify/react";

const voidFragmentSchema = z.object({
  void1: z.object({
    small: z.number().min(0),
    regular: z.number().min(0),
  }),
  void2: z.object({
    small: z.number().min(0),
    regular: z.number().min(0),
  }),
  void3: z.object({
    small: z.number().min(0),
    regular: z.number().min(0),
  }),
});

type CharacterId = keyof typeof characters;

const formSchema = z.record(
  z.string(),
  voidFragmentSchema
).refine(
  (data): data is Record<CharacterId, z.infer<typeof voidFragmentSchema>> => {
    return Object.keys(data).every(key => key in characters);
  }
);

type FormData = z.infer<typeof formSchema>;

export function VoidFragmentCalculator() {
  const defaultValues = Object.keys(characters).reduce((acc, id) => ({
    ...acc,
    [id]: {
      void1: { small: 0, regular: 0 },
      void2: { small: 0, regular: 0 },
      void3: { small: 0, regular: 0 },
    },
  }), {} as FormData);

  const { control, watch } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: (() => {
      if (typeof window === 'undefined') return defaultValues;
      const savedData = localStorage.getItem('voidFragmentData');
      return savedData ? JSON.parse(savedData) : defaultValues;
    })(),
  });

  const formValues = watch();

  const calculateTotalFragments = (small: number, regular: number) => {
    return Math.floor(regular + (small / 2));
  };

  const handleBlur = () => {
    localStorage.setItem('voidFragmentData', JSON.stringify(formValues));
  };

  const calculateChestsPerCharacter = (void1: { small: number, regular: number }, void2: { small: number, regular: number }, void3: { small: number, regular: number }) => {
    return {
      void1: Math.floor(calculateTotalFragments(void1.small, void1.regular) / 60),
      void2: Math.floor(calculateTotalFragments(void2.small, void2.regular) / 60),
      void3: Math.floor(calculateTotalFragments(void3.small, void3.regular) / 60),
    };
  };

  const numberOfVoid1Chests = Object.values(formValues).reduce((acc, char) => 
    acc + calculateChestsPerCharacter(char.void1, char.void2, char.void3).void1, 0);

  const numberOfVoid2Chests = Object.values(formValues).reduce((acc, char) => 
    acc + calculateChestsPerCharacter(char.void1, char.void2, char.void3).void2, 0);

  const numberOfVoid3Chests = Object.values(formValues).reduce((acc, char) => 
    acc + calculateChestsPerCharacter(char.void1, char.void2, char.void3).void3, 0);
    

  return (
    <div className="w-fit mx-auto">
      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="flex flex-row justify-center gap-2 items-center p-4 bg-gradient-to-br from-[#0a0000] to-[#1a0000] rounded-lg">
          <Icon icon="game-icons:locked-chest" className="w-8 h-8 text-purple-400" />
          <div className="text-4xl font-bold text-purple-400">
            {numberOfVoid1Chests}
          </div>
        </div>
        <div className="flex flex-row justify-center gap-2 items-center p-4 bg-gradient-to-br from-[#0a0000] to-[#1a0000] rounded-lg">
          <Icon icon="game-icons:locked-chest" className="w-8 h-8 text-indigo-400" />
          <div className="text-2xl font-bold text-indigo-400">
            {numberOfVoid2Chests}
          </div>
        </div>
        <div className="flex flex-row justify-center gap-2 items-center p-4 bg-gradient-to-br from-[#0a0000] to-[#1a0000] rounded-lg">
          <Icon icon="game-icons:locked-chest" className="w-8 h-8 text-pink-400" />
          <div className="text-2xl font-bold text-pink-400">
            {numberOfVoid3Chests}
          </div>
        </div>
      </div>
      <div className="grid grid-cols-5 gap-2 w-full" style={{ gridTemplateColumns: 'min-content min-content min-content min-content 1fr' }}>
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
            <div className="flex gap-4 items-center p-4 bg-gradient-to-br from-[#0a0000] to-[#1a0000] rounded-lg flex-row">
              <div className="flex flex-col gap-2">
                <span className="text-sm text-purple-400">Void 1</span>
                <div className="flex gap-2">
                  <div className="flex flex-col gap-1">
                    <span className="text-xs text-purple-500">Pequeno</span>
                    <div className="flex items-center">
                      <Controller
                        name={`${id}.void1.small`}
                        control={control}
                        render={({ field }) => (
                          <>
                            <button
                              type="button"
                              onClick={() => field.onChange(Math.max(0, (field.value || 0) - 1))}
                              className="px-2 py-1 bg-purple-700 border border-purple-700 rounded-l text-white hover:bg-purple-600"
                            >
                              -
                            </button>
                            <input
                              {...field}
                              type="number"
                              className="w-16 p-1 bg-gray-800 border-y border-purple-700 text-purple-400 text-center"
                              placeholder="Small"
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
                              +
                            </button>
                          </>
                        )}
                      />
                    </div>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-xs text-purple-500">Grande</span>
                    <div className="flex items-center">
                      <Controller
                        name={`${id}.void1.regular`}
                        control={control}
                        render={({ field }) => (
                          <>
                            <button
                              type="button"
                              onClick={() => field.onChange(Math.max(0, (field.value || 0) - 1))}
                              className="px-2 py-1 bg-purple-700 border border-purple-700 rounded-l text-white hover:bg-purple-600"
                            >
                              -
                            </button>
                            <input
                              {...field}
                              type="number"
                              className="w-16 p-1 bg-gray-800 border-y border-purple-700 text-purple-400 text-center"
                              placeholder="Regular"
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
                              +
                            </button>
                          </>
                        )}
                      />
                    </div>
                  </div>
                </div>
              </div>
              </div>
              <div className="flex gap-4 items-center p-4 bg-gradient-to-br from-[#0a0000] to-[#1a0000] rounded-lg flex-row">
              <div className="flex flex-col gap-2">
                <span className="text-sm text-indigo-400">Void 2</span>
                <div className="flex gap-2">
                  <div className="flex flex-col gap-1">
                    <span className="text-xs text-indigo-500">Pequeno</span>
                    <div className="flex items-center">
                      <Controller
                        name={`${id}.void2.small`}
                        control={control}
                        render={({ field }) => (
                          <>
                            <button
                              type="button"
                              onClick={() => field.onChange(Math.max(0, (field.value || 0) - 1))}
                              className="px-2 py-1 bg-indigo-700 border border-indigo-700 rounded-l text-white hover:bg-indigo-600"
                            >
                              -
                            </button>
                            <input
                              {...field}
                              type="number"
                              className="w-16 p-1 bg-gray-800 border-y border-indigo-700 text-indigo-400 text-center"
                              placeholder="Small"
                              onBlur={() => {
                                field.onBlur();
                                handleBlur();
                              }}
                            />
                            <button
                              type="button"
                              onClick={() => field.onChange((field.value || 0) + 1)}
                              className="px-2 py-1 bg-indigo-700 border border-indigo-700 rounded-r text-white hover:bg-indigo-600"
                            >
                              +
                            </button>
                          </>
                        )}
                      />
                    </div>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-xs text-indigo-500">Grande</span>
                    <div className="flex items-center">
                      <Controller
                        name={`${id}.void2.regular`}
                        control={control}
                        render={({ field }) => (
                          <>
                            <button
                              type="button"
                              onClick={() => field.onChange(Math.max(0, (field.value || 0) - 1))}
                              className="px-2 py-1 bg-indigo-700 border border-indigo-700 rounded-l text-white hover:bg-indigo-600"
                            >
                              -
                            </button>
                            <input
                              {...field}
                              type="number"
                              className="w-16 p-1 bg-gray-800 border-y border-indigo-700 text-indigo-400 text-center"
                              placeholder="Regular"
                              onBlur={() => {
                                field.onBlur();
                                handleBlur();
                              }}
                            />
                            <button
                              type="button"
                              onClick={() => field.onChange((field.value || 0) + 1)}
                              className="px-2 py-1 bg-indigo-700 border border-indigo-700 rounded-r text-white hover:bg-indigo-600"
                            >
                              +
                            </button>
                          </>
                        )}
                      />
                    </div>
                  </div>
                </div>
              </div>
              </div>
              <div className="flex gap-4 items-center p-4 bg-gradient-to-br from-[#0a0000] to-[#1a0000] rounded-lg flex-row">
              <div className="flex flex-col gap-2">
                <span className="text-sm text-pink-400">Void 3</span>
                <div className="flex gap-2">
                  <div className="flex flex-col gap-1">
                    <span className="text-xs text-pink-500">Pequeno</span>
                    <div className="flex items-center">
                      <Controller
                        name={`${id}.void3.small`}
                        control={control}
                        render={({ field }) => (
                          <>
                            <button
                              type="button"
                              onClick={() => field.onChange(Math.max(0, (field.value || 0) - 1))}
                              className="px-2 py-1 bg-pink-700 border border-pink-700 rounded-l text-white hover:bg-pink-600"
                            >
                              -
                            </button>
                            <input
                              {...field}
                              type="number"
                              className="w-16 p-1 bg-gray-800 border-y border-pink-700 text-pink-400 text-center"
                              placeholder="Small"
                              onBlur={() => {
                                field.onBlur();
                                handleBlur();
                              }}
                            />
                            <button
                              type="button"
                              onClick={() => field.onChange((field.value || 0) + 1)}
                              className="px-2 py-1 bg-pink-700 border border-pink-700 rounded-r text-white hover:bg-pink-600"
                            >
                              +
                            </button>
                          </>
                        )}
                      />
                    </div>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-xs text-pink-500">Grande</span>
                    <div className="flex items-center">
                      <Controller
                        name={`${id}.void3.regular`}
                        control={control}
                        render={({ field }) => (
                          <>
                            <button
                              type="button"
                              onClick={() => field.onChange(Math.max(0, (field.value || 0) - 1))}
                              className="px-2 py-1 bg-pink-700 border border-pink-700 rounded-l text-white hover:bg-pink-600"
                            >
                              -
                            </button>
                            <input
                              {...field}
                              type="number"
                              className="w-16 p-1 bg-gray-800 border-y border-pink-700 text-pink-400 text-center"
                              placeholder="Regular"
                              onBlur={() => {
                                field.onBlur();
                                handleBlur();
                              }}
                            />
                            <button
                              type="button"
                              onClick={() => field.onChange((field.value || 0) + 1)}
                              className="px-2 py-1 bg-pink-700 border border-pink-700 rounded-r text-white hover:bg-pink-600"
                            >
                              +
                            </button>
                          </>
                        )}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Results Column */}
            <div className="flex flex-col gap-2 items-center p-4 bg-gradient-to-br from-[#0a0000] to-[#1a0000] rounded-lg">
              <span className="text-sm text-gray-400">Totais</span>
              <div className="flex gap-2">
                <div className="flex flex-col gap-1 items-center">
                  <span className="text-xs text-purple-500">Void 1</span>
                  <div className="w-16 p-1 text-2xl font-bold text-center text-purple-400">
                    {calculateTotalFragments(formValues[id]?.void1.small || 0, formValues[id]?.void1.regular || 0)}
                  </div>
                </div>
                <div className="flex flex-col gap-1 items-center">
                  <span className="text-xs text-indigo-500">Void 2</span>
                  <div className="w-16 p-1 text-2xl font-bold text-center text-indigo-400">
                    {calculateTotalFragments(formValues[id]?.void2.small || 0, formValues[id]?.void2.regular || 0)}
                  </div>
                </div>
                <div className="flex flex-col gap-1 items-center">
                  <span className="text-xs text-pink-500">Void 3</span>
                  <div className="w-16 p-1 text-2xl font-bold text-center text-pink-400">
                    {calculateTotalFragments(formValues[id]?.void3.small || 0, formValues[id]?.void3.regular || 0)}
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