"use client";

import { characters } from "@/constants/characters";
import Image from "next/image";
import { useState } from "react";

type ChecklistItem = {
  id: string;
  label: string;
  completed: boolean;
};

type CharacterChecklist = {
  [key: string]: ChecklistItem[];
};

type StorageData = {
  dailyAccountItems: ChecklistItem[];
  weeklyAccountItems: ChecklistItem[];
  dailyCharacterItems: CharacterChecklist;
  weeklyCharacterItems: CharacterChecklist;
  lastUpdatedAt: number;
};

const STORAGE_KEY = 'checklist-data';

export default function ChecklistPage() {
  const [dailyAccountItems, setDailyAccountItems] = useState<ChecklistItem[]>(() => {
    if (typeof window === 'undefined') return [
      { id: "daily-account-1", label: "Infinity Cloyster", completed: false },
      { id: "daily-account-2", label: "Infinity Cloyster", completed: false },
      { id: "daily-account-3", label: "Infinity Cloyster", completed: false },
    ];
    
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const data = JSON.parse(stored);
      return data.dailyAccountItems || [
        { id: "daily-account-1", label: "Infinity Cloyster", completed: false },
        { id: "daily-account-2", label: "Infinity Cloyster", completed: false },
        { id: "daily-account-3", label: "Infinity Cloyster", completed: false },
      ];
    }
    return [
      { id: "daily-account-1", label: "Infinity Cloyster", completed: false },
      { id: "daily-account-2", label: "Infinity Cloyster", completed: false },
      { id: "daily-account-3", label: "Infinity Cloyster", completed: false },
    ];
  });

  const [weeklyAccountItems, setWeeklyAccountItems] = useState<ChecklistItem[]>(() => {
    if (typeof window === 'undefined') return [];
    
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const data = JSON.parse(stored);
      return data.weeklyAccountItems || [];
    }
    return [];
  });

  const [dailyCharacterItems, setDailyCharacterItems] = useState<CharacterChecklist>(() => {
    if (typeof window === 'undefined') return Object.keys(characters).reduce((acc, id) => ({
      ...acc,
      [id]: [
        { id: `${id}-wl`, label: "WL", completed: false },
        { id: `${id}-sanctum`, label: "Sanctum", completed: false },
        { id: `${id}-crucible`, label: "Crucible", completed: false },
        { id: `${id}-berkas`, label: "Berkas", completed: false },
        { id: `${id}-tod-1`, label: "ToD", completed: false },
        { id: `${id}-tod-2`, label: "ToD", completed: false },
        { id: `${id}-tod-3`, label: "ToD", completed: false },
        { id: `${id}-gek-1`, label: "GEK", completed: false },
        { id: `${id}-gek-2`, label: "GEK", completed: false },
      ]
    }), {});
    
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const data = JSON.parse(stored);
      return data.dailyCharacterItems || Object.keys(characters).reduce((acc, id) => ({
        ...acc,
        [id]: [
          { id: `${id}-wl`, label: "WL", completed: false },
          { id: `${id}-sanctum`, label: "Sanctum", completed: false },
          { id: `${id}-crucible`, label: "Crucible", completed: false },
          { id: `${id}-berkas`, label: "Berkas", completed: false },
          { id: `${id}-tod-1`, label: "ToD", completed: false },
          { id: `${id}-tod-2`, label: "ToD", completed: false },
          { id: `${id}-tod-3`, label: "ToD", completed: false },
          { id: `${id}-gek-1`, label: "GEK", completed: false },
          { id: `${id}-gek-2`, label: "GEK", completed: false },
        ]
      }), {});
    }
    return Object.keys(characters).reduce((acc, id) => ({
      ...acc,
      [id]: [
        { id: `${id}-wl`, label: "WL", completed: false },
        { id: `${id}-sanctum`, label: "Sanctum", completed: false },
        { id: `${id}-crucible`, label: "Crucible", completed: false },
        { id: `${id}-berkas`, label: "Berkas", completed: false },
        { id: `${id}-tod-1`, label: "ToD", completed: false },
        { id: `${id}-tod-2`, label: "ToD", completed: false },
        { id: `${id}-tod-3`, label: "ToD", completed: false },
        { id: `${id}-gek-1`, label: "GEK", completed: false },
        { id: `${id}-gek-2`, label: "GEK", completed: false },
      ]
    }), {});
  });

  const [weeklyCharacterItems, setWeeklyCharacterItems] = useState<CharacterChecklist>(() => {
    if (typeof window === 'undefined') return Object.keys(characters).reduce((acc, id) => ({
      ...acc,
      [id]: [
        { id: `${id}-harkyon-1`, label: "Harkyon", completed: false },
        { id: `${id}-harkyon-2`, label: "Harkyon", completed: false },
        { id: `${id}-harkyon-3`, label: "Harkyon", completed: false },
        { id: `${id}-void1-1`, label: "Void 1", completed: false },
        { id: `${id}-void1-2`, label: "Void 1", completed: false },
        { id: `${id}-void1-3`, label: "Void 1", completed: false },
        { id: `${id}-void2-1`, label: "Void 2", completed: false },
        { id: `${id}-void2-2`, label: "Void 2", completed: false },
        { id: `${id}-void2-3`, label: "Void 2", completed: false },
        { id: `${id}-void3-1`, label: "Void 3", completed: false },
        { id: `${id}-void3-2`, label: "Void 3", completed: false },
        { id: `${id}-void3-3`, label: "Void 3", completed: false },
        { id: `${id}-ap`, label: "AP", completed: false },
      ]
    }), {});
    
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const data = JSON.parse(stored);
      return data.weeklyCharacterItems || Object.keys(characters).reduce((acc, id) => ({
        ...acc,
        [id]: [
          { id: `${id}-harkyon-1`, label: "Harkyon", completed: false },
          { id: `${id}-harkyon-2`, label: "Harkyon", completed: false },
          { id: `${id}-harkyon-3`, label: "Harkyon", completed: false },
          { id: `${id}-void1-1`, label: "Void 1", completed: false },
          { id: `${id}-void1-2`, label: "Void 1", completed: false },
          { id: `${id}-void1-3`, label: "Void 1", completed: false },
          { id: `${id}-void2-1`, label: "Void 2", completed: false },
          { id: `${id}-void2-2`, label: "Void 2", completed: false },
          { id: `${id}-void2-3`, label: "Void 2", completed: false },
          { id: `${id}-void3-1`, label: "Void 3", completed: false },
          { id: `${id}-void3-2`, label: "Void 3", completed: false },
          { id: `${id}-void3-3`, label: "Void 3", completed: false },
          { id: `${id}-ap`, label: "AP", completed: false },
        ]
      }), {});
    }
    return Object.keys(characters).reduce((acc, id) => ({
      ...acc,
      [id]: [
        { id: `${id}-harkyon-1`, label: "Harkyon", completed: false },
        { id: `${id}-harkyon-2`, label: "Harkyon", completed: false },
        { id: `${id}-harkyon-3`, label: "Harkyon", completed: false },
        { id: `${id}-void1-1`, label: "Void 1", completed: false },
        { id: `${id}-void1-2`, label: "Void 1", completed: false },
        { id: `${id}-void1-3`, label: "Void 1", completed: false },
        { id: `${id}-void2-1`, label: "Void 2", completed: false },
        { id: `${id}-void2-2`, label: "Void 2", completed: false },
        { id: `${id}-void2-3`, label: "Void 2", completed: false },
        { id: `${id}-void3-1`, label: "Void 3", completed: false },
        { id: `${id}-void3-2`, label: "Void 3", completed: false },
        { id: `${id}-void3-3`, label: "Void 3", completed: false },
        { id: `${id}-ap`, label: "AP", completed: false },
      ]
    }), {});
  });

  const saveToLocalStorage = (data: Omit<StorageData, 'lastUpdatedAt'>) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        ...data,
        lastUpdatedAt: Date.now()
      }));
    }
  };

  const toggleItem = (type: 'daily' | 'weekly', section: 'account' | 'character', id: string, characterId?: string) => {
    if (section === 'account') {
      const setter = type === 'daily' ? setDailyAccountItems : setWeeklyAccountItems;
      const items = type === 'daily' ? dailyAccountItems : weeklyAccountItems;
      const newItems = items.map(item => 
        item.id === id ? { ...item, completed: !item.completed } : item
      );
      setter(newItems);
      saveToLocalStorage({
        dailyAccountItems,
        weeklyAccountItems,
        dailyCharacterItems,
        weeklyCharacterItems,
        [type === 'daily' ? 'dailyAccountItems' : 'weeklyAccountItems']: newItems
      });
    } else if (characterId) {
      const setter = type === 'daily' ? setDailyCharacterItems : setWeeklyCharacterItems;
      const items = type === 'daily' ? dailyCharacterItems : weeklyCharacterItems;
      const newItems = {
        ...items,
        [characterId]: items[characterId].map(item =>
          item.id === id ? { ...item, completed: !item.completed } : item
        )
      };
      setter(newItems);
      saveToLocalStorage({
        dailyAccountItems,
        weeklyAccountItems,
        dailyCharacterItems,
        weeklyCharacterItems,
        [type === 'daily' ? 'dailyCharacterItems' : 'weeklyCharacterItems']: newItems
      });
    }
  };

  const toggleAllInColumn = (type: 'daily' | 'weekly', section: 'account' | 'character', columnIndex: number) => {
    if (section === 'account') {
      const setter = type === 'daily' ? setDailyAccountItems : setWeeklyAccountItems;
      const items = type === 'daily' ? dailyAccountItems : weeklyAccountItems;
      const allChecked = items.every(item => item.completed);
      const newItems = items.map(item => ({ ...item, completed: !allChecked }));
      setter(newItems);
      saveToLocalStorage({
        dailyAccountItems,
        weeklyAccountItems,
        dailyCharacterItems,
        weeklyCharacterItems,
        [type === 'daily' ? 'dailyAccountItems' : 'weeklyAccountItems']: newItems
      });
    } else {
      const setter = type === 'daily' ? setDailyCharacterItems : setWeeklyCharacterItems;
      const items = type === 'daily' ? dailyCharacterItems : weeklyCharacterItems;
      const allChecked = Object.values(items).every(characterItems => 
        characterItems[columnIndex].completed
      );
      const newItems = Object.entries(items).reduce((acc, [id, characterItems]) => ({
        ...acc,
        [id]: characterItems.map((item, index) => 
          index === columnIndex ? { ...item, completed: !allChecked } : item
        )
      }), {});
      setter(newItems);
      saveToLocalStorage({
        dailyAccountItems,
        weeklyAccountItems,
        dailyCharacterItems,
        weeklyCharacterItems,
        [type === 'daily' ? 'dailyCharacterItems' : 'weeklyCharacterItems']: newItems
      });
    }
  };

  return (
    <div className="mx-auto p-4">
      <div className="grid grid-cols-2 gap-4">
        {/* Daily Section */}
        <div className="bg-gray-800 rounded-lg p-6">
          <h2 className="text-2xl font-bold text-blue-400 mb-6">Daily Checklist</h2>
          
          {/* Account Section */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-300 mb-4">Account</h3>
            <div className="space-y-2">
              <div className="flex items-center gap-4">
                <span className="text-gray-300 min-w-[120px]">Infinity Cloyster</span>
                <div className="flex gap-2">
                  {dailyAccountItems.map(item => (
                    <label key={item.id} className="flex items-center gap-2 text-gray-300 hover:text-gray-100 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={item.completed}
                        onChange={() => toggleItem('daily', 'account', item.id)}
                        className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                      />
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Characters Section */}
          <div>
            <h3 className="text-xl font-semibold text-gray-300 mb-4">Characters</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left text-gray-400 text-sm">
                    <th className="p-2">Character</th>
                    <th className="p-2">
                      <div className="flex flex-col gap-2">
                        <span className="text-gray-300">WL</span>
                        <div className="flex gap-1">
                          <label className="flex items-center text-gray-300 hover:text-gray-100 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={Object.values(dailyCharacterItems).every(items => 
                                items?.[0]?.completed
                              )}
                              onChange={() => toggleAllInColumn('daily', 'character', 0)}
                              className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                            />
                          </label>
                        </div>
                      </div>
                    </th>
                    <th className="p-2">
                      <div className="flex flex-col gap-2">
                        <span className="text-gray-300">Sanctum</span>
                        <div className="flex gap-1">
                          <label className="flex items-center text-gray-300 hover:text-gray-100 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={Object.values(dailyCharacterItems).every(items => 
                                items?.[1]?.completed
                              )}
                              onChange={() => toggleAllInColumn('daily', 'character', 1)}
                              className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                            />
                          </label>
                        </div>
                      </div>
                    </th>
                    <th className="p-2">
                      <div className="flex flex-col gap-2">
                        <span className="text-gray-300">Crucible</span>
                        <div className="flex gap-1">
                          <label className="flex items-center text-gray-300 hover:text-gray-100 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={Object.values(dailyCharacterItems).every(items => 
                                items?.[2]?.completed
                              )}
                              onChange={() => toggleAllInColumn('daily', 'character', 2)}
                              className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                            />
                          </label>
                        </div>
                      </div>
                    </th>
                    <th className="p-2">
                      <div className="flex flex-col gap-2">
                        <span className="text-gray-300">Berkas</span>
                        <div className="flex gap-1">
                          <label className="flex items-center text-gray-300 hover:text-gray-100 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={Object.values(dailyCharacterItems).every(items => 
                                items?.[3]?.completed
                              )}
                              onChange={() => toggleAllInColumn('daily', 'character', 3)}
                              className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                            />
                          </label>
                        </div>
                      </div>
                    </th>
                    <th className="p-2">
                      <div className="flex flex-col gap-2">
                        <span className="text-gray-300">ToD</span>
                        <div className="flex gap-1">
                          {[0, 1, 2].map(index => (
                            <label key={index} className="flex items-center text-gray-300 hover:text-gray-100 cursor-pointer">
                              <input
                                type="checkbox"
                                checked={Object.values(dailyCharacterItems).every(items => 
                                  items?.[4 + index]?.completed
                                )}
                                onChange={() => toggleAllInColumn('daily', 'character', 4 + index)}
                                className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                              />
                            </label>
                          ))}
                        </div>
                      </div>
                    </th>
                    <th className="p-2">
                      <div className="flex flex-col gap-2">
                        <span className="text-gray-300">GEK</span>
                        <div className="flex gap-1">
                          {[0, 1].map(index => (
                            <label key={index} className="flex items-center text-gray-300 hover:text-gray-100 cursor-pointer">
                              <input
                                type="checkbox"
                                checked={Object.values(dailyCharacterItems).every(items => 
                                  items?.[7 + index]?.completed
                                )}
                                onChange={() => toggleAllInColumn('daily', 'character', 7 + index)}
                                className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                              />
                            </label>
                          ))}
                        </div>
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(characters).map(([id, character]) => (
                    <tr key={id} className="border-t border-gray-700">
                      <td className="p-2">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 relative">
                            <Image
                              src={character.profilePicture}
                              alt={character.name}
                              fill
                              className="object-cover rounded"
                            />
                          </div>
                          <span className="text-gray-300">{character.name}</span>
                        </div>
                      </td>
                      <td className="p-2">
                        <label className="flex items-center text-gray-300 hover:text-gray-100 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={dailyCharacterItems[id][0].completed}
                            onChange={() => toggleItem('daily', 'character', dailyCharacterItems[id][0].id, id)}
                            className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                          />
                        </label>
                      </td>
                      <td className="p-2">
                        <label className="flex items-center text-gray-300 hover:text-gray-100 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={dailyCharacterItems[id][1].completed}
                            onChange={() => toggleItem('daily', 'character', dailyCharacterItems[id][1].id, id)}
                            className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                          />
                        </label>
                      </td>
                      <td className="p-2">
                        <label className="flex items-center text-gray-300 hover:text-gray-100 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={dailyCharacterItems[id][2].completed}
                            onChange={() => toggleItem('daily', 'character', dailyCharacterItems[id][2].id, id)}
                            className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                          />
                        </label>
                      </td>
                      <td className="p-2">
                        <label className="flex items-center text-gray-300 hover:text-gray-100 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={dailyCharacterItems[id][3].completed}
                            onChange={() => toggleItem('daily', 'character', dailyCharacterItems[id][3].id, id)}
                            className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                          />
                        </label>
                      </td>
                      <td className="p-2">
                        <div className="flex gap-1">
                          {dailyCharacterItems[id].slice(4, 7).map(item => (
                            <label key={item.id} className="flex items-center text-gray-300 hover:text-gray-100 cursor-pointer">
                              <input
                                type="checkbox"
                                checked={item.completed}
                                onChange={() => toggleItem('daily', 'character', item.id, id)}
                                className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                              />
                            </label>
                          ))}
                        </div>
                      </td>
                      <td className="p-2">
                        <div className="flex gap-1">
                          {dailyCharacterItems[id].slice(7, 9).map(item => (
                            <label key={item.id} className="flex items-center text-gray-300 hover:text-gray-100 cursor-pointer">
                              <input
                                type="checkbox"
                                checked={item.completed}
                                onChange={() => toggleItem('daily', 'character', item.id, id)}
                                className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                              />
                            </label>
                          ))}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Weekly Section */}
        <div className="bg-gray-800 rounded-lg p-6">
          <h2 className="text-2xl font-bold text-blue-400 mb-6">Weekly Checklist</h2>
          
          {/* Weekly Account Section */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-300 mb-4">Account</h3>
            <div className="space-y-2">
              {/* Weekly account items will be added here when needed */}
            </div>
          </div>

          {/* Characters Section */}
          <div>
            <h3 className="text-xl font-semibold text-gray-300 mb-4">Characters</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left text-gray-400 text-sm">
                    <th className="p-2">Character</th>
                    <th className="p-2">
                      <div className="flex flex-col gap-2">
                        <span className="text-gray-300">Harkyon</span>
                        <div className="flex gap-1">
                          {[0, 1, 2].map(index => (
                            <label key={index} className="flex items-center text-gray-300 hover:text-gray-100 cursor-pointer">
                              <input
                                type="checkbox"
                                checked={Object.values(weeklyCharacterItems).every(items => 
                                  items?.[index]?.completed
                                )}
                                onChange={() => toggleAllInColumn('weekly', 'character', index)}
                                className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                              />
                            </label>
                          ))}
                        </div>
                      </div>
                    </th>
                    <th className="p-2">
                      <div className="flex flex-col gap-2">
                        <span className="text-gray-300">Void 1</span>
                        <div className="flex gap-1">
                          {[0, 1, 2].map(index => (
                            <label key={index} className="flex items-center text-gray-300 hover:text-gray-100 cursor-pointer">
                              <input
                                type="checkbox"
                                checked={Object.values(weeklyCharacterItems).every(items => 
                                  items?.[3 + index]?.completed
                                )}
                                onChange={() => toggleAllInColumn('weekly', 'character', 3 + index)}
                                className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                              />
                            </label>
                          ))}
                        </div>
                      </div>
                    </th>
                    <th className="p-2">
                      <div className="flex flex-col gap-2">
                        <span className="text-gray-300">Void 2</span>
                        <div className="flex gap-1">
                          {[0, 1, 2].map(index => (
                            <label key={index} className="flex items-center text-gray-300 hover:text-gray-100 cursor-pointer">
                              <input
                                type="checkbox"
                                checked={Object.values(weeklyCharacterItems).every(items => 
                                  items?.[6 + index]?.completed
                                )}
                                onChange={() => toggleAllInColumn('weekly', 'character', 6 + index)}
                                className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                              />
                            </label>
                          ))}
                        </div>
                      </div>
                    </th>
                    <th className="p-2">
                      <div className="flex flex-col gap-2">
                        <span className="text-gray-300">Void 3</span>
                        <div className="flex gap-1">
                          {[0, 1, 2].map(index => (
                            <label key={index} className="flex items-center text-gray-300 hover:text-gray-100 cursor-pointer">
                              <input
                                type="checkbox"
                                checked={Object.values(weeklyCharacterItems).every(items => 
                                  items?.[9 + index]?.completed
                                )}
                                onChange={() => toggleAllInColumn('weekly', 'character', 9 + index)}
                                className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                              />
                            </label>
                          ))}
                        </div>
                      </div>
                    </th>
                    <th className="p-2">
                      <div className="flex flex-col gap-2">
                        <span className="text-gray-300">AP</span>
                        <div className="flex gap-1">
                          <label className="flex items-center text-gray-300 hover:text-gray-100 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={Object.values(weeklyCharacterItems).every(items => 
                                items?.[12]?.completed
                              )}
                              onChange={() => toggleAllInColumn('weekly', 'character', 12)}
                              className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                            />
                          </label>
                        </div>
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(characters).map(([id, character]) => (
                    <tr key={id} className="border-t border-gray-700">
                      <td className="p-2">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 relative">
                            <Image
                              src={character.profilePicture}
                              alt={character.name}
                              fill
                              className="object-cover rounded"
                            />
                          </div>
                          <span className="text-gray-300">{character.name}</span>
                        </div>
                      </td>
                      <td className="p-2">
                        <div className="flex gap-1">
                          {weeklyCharacterItems?.[id]?.slice(0, 3).map(item => (
                            <label key={item.id} className="flex items-center text-gray-300 hover:text-gray-100 cursor-pointer">
                              <input
                                type="checkbox"
                                checked={item?.completed}
                                onChange={() => toggleItem('weekly', 'character', item?.id, id)}
                                className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                              />
                            </label>
                          ))}
                        </div>
                      </td>
                      <td className="p-2">
                        <div className="flex gap-1">
                          {weeklyCharacterItems?.[id]?.slice(3, 6).map(item => (
                            <label key={item.id} className="flex items-center text-gray-300 hover:text-gray-100 cursor-pointer">
                              <input
                                type="checkbox"
                                checked={item?.completed}
                                onChange={() => toggleItem('weekly', 'character', item?.id, id)}
                                className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                              />
                            </label>
                          ))}
                        </div>
                      </td>
                      <td className="p-2">
                        <div className="flex gap-1">
                          {weeklyCharacterItems?.[id]?.slice(6, 9).map(item => (
                            <label key={item.id} className="flex items-center text-gray-300 hover:text-gray-100 cursor-pointer">
                              <input
                                type="checkbox"
                                checked={item?.completed}
                                onChange={() => toggleItem('weekly', 'character', item?.id, id)}
                                className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                              />
                            </label>
                          ))}
                        </div>
                      </td>
                      <td className="p-2">
                        <div className="flex gap-1">
                          {weeklyCharacterItems?.[id]?.slice(9, 12).map(item => (
                            <label key={item.id} className="flex items-center text-gray-300 hover:text-gray-100 cursor-pointer">
                              <input
                                type="checkbox"
                                checked={item?.completed}
                                onChange={() => toggleItem('weekly', 'character', item?.id, id)}
                                className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                              />
                            </label>
                          ))}
                        </div>
                      </td>
                      <td className="p-2">
                        <label className="flex items-center text-gray-300 hover:text-gray-100 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={weeklyCharacterItems?.[id]?.[12]?.completed}
                            onChange={() => toggleItem('weekly', 'character', weeklyCharacterItems?.[id]?.[12]?.id, id)}
                            className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                          />
                        </label>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 