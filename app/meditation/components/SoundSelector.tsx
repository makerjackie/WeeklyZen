"use client";

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { VolumeX } from 'lucide-react';
import { SoundIcon } from '@/app/SoundIcon';
import { SoundData } from '@/app/sounds';

interface SoundSelectorProps {
  sounds: SoundData[];
  selectedSound: SoundData | null;
  onSoundSelect: (sound: SoundData | null) => void;
  isDarkTheme: boolean;
  t: (zh: string, en: string) => string;
}

export function SoundSelector({
  sounds,
  selectedSound,
  onSoundSelect,
  isDarkTheme,
  t
}: SoundSelectorProps) {
  const getCategorySounds = (category: string) =>
    sounds
      .filter((sound) => sound.category === category)
      .sort(
        (left, right) =>
          Number(Boolean(right.isDefault)) - Number(Boolean(left.isDefault))
      );

  const renderSoundGrid = (category: string) => (
    <div className="grid grid-cols-2 gap-2">
      {getCategorySounds(category).map((sound) => (
        <Button
          key={sound.id}
          variant="outline"
          className={`relative flex h-auto flex-col items-center justify-center p-4 ${
            selectedSound?.id === sound.id
              ? isDarkTheme
                ? 'border-indigo-600 bg-indigo-800/30'
                : 'border-blue-400 bg-blue-100'
              : isDarkTheme
                ? 'border-indigo-800/30 hover:bg-indigo-900/50'
                : 'border-blue-200 hover:bg-blue-50'
          }`}
          onClick={() => onSoundSelect(sound)}
        >
          {sound.isDefault && (
            <Badge
              variant="outline"
              className={`absolute right-2 top-2 px-2 py-0 text-[10px] font-medium ${
                isDarkTheme
                  ? 'border-indigo-400/30 bg-indigo-400/10 text-indigo-100'
                  : 'border-blue-200 bg-blue-50 text-blue-700'
              }`}
            >
              {t('默认', 'Default')}
            </Badge>
          )}
          <SoundIcon
            iconType={sound.iconType}
            className={`mb-2 text-2xl ${isDarkTheme ? 'text-indigo-300' : 'text-blue-600'}`}
          />
          <span className="text-sm">{t(sound.name, sound.name)}</span>
        </Button>
      ))}
    </div>
  );

  return (
    <div className="w-full">
      {/* 无声选项 */}
      <Button
        variant="outline"
        className={`mb-4 flex h-auto w-full flex-col items-center justify-center p-4 ${
          !selectedSound
            ? isDarkTheme
              ? 'border-indigo-600 bg-indigo-800/30'
              : 'border-blue-400 bg-blue-100'
            : isDarkTheme
              ? 'border-indigo-800/30 hover:bg-indigo-900/50'
              : 'border-blue-200 hover:bg-blue-50'
        }`}
        onClick={() => onSoundSelect(null)}
      >
        <VolumeX
          size={24}
          className={isDarkTheme ? 'mb-2 text-indigo-300' : 'mb-2 text-blue-600'}
        />
        <span className="text-sm">{t('关闭环境音', 'Background Off')}</span>
      </Button>

      {/* 分类标签页 */}
      <Tabs defaultValue="nature" className="w-full">
        <TabsList className="grid grid-cols-3 mb-4">
          <TabsTrigger 
            value="nature" 
            className={`${isDarkTheme ? 'data-[state=active]:bg-indigo-800/50' : 'data-[state=active]:bg-blue-100'}`}
          >
            {t("自然", "Nature")}
          </TabsTrigger>
          <TabsTrigger 
            value="rain" 
            className={`${isDarkTheme ? 'data-[state=active]:bg-indigo-800/50' : 'data-[state=active]:bg-blue-100'}`}
          >
            {t("雨声", "Rain")}
          </TabsTrigger>
          <TabsTrigger 
            value="city" 
            className={`${isDarkTheme ? 'data-[state=active]:bg-indigo-800/50' : 'data-[state=active]:bg-blue-100'}`}
          >
            {t("城市", "City")}
          </TabsTrigger>
        </TabsList>

        {/* 自然音效 */}
        <TabsContent value="nature" className="mt-0 max-h-[240px] overflow-y-auto pr-2">
          {renderSoundGrid('自然')}
        </TabsContent>

        {/* 雨声 */}
        <TabsContent value="rain" className="mt-0 max-h-[240px] overflow-y-auto pr-2">
          {renderSoundGrid('雨声')}
        </TabsContent>

        {/* 城市 */}
        <TabsContent value="city" className="mt-0 max-h-[240px] overflow-y-auto pr-2">
          {renderSoundGrid('城市')}
        </TabsContent>
      </Tabs>
    </div>
  );
}
