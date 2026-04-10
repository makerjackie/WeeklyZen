'use client'

import { ReactNode } from 'react'
import { Button } from '@/components/ui/button'
import { BookOpen, ChevronRight, VolumeX, Volume2 } from 'lucide-react'
import { cn } from '@/lib/utils'

interface GuidanceType {
  content: ReactNode
  id: string
  title: string
  description: string
  paragraphs: string[]
  audioUrl?: string | null
}

interface GuidanceSelectorProps {
  guidances: GuidanceType[]
  selectedGuidance: GuidanceType | null
  onGuidanceSelect: (guidance: GuidanceType) => void
  onShowFullText: () => void
  isDarkTheme: boolean
  t: (zh: string, en: string) => string
  onCloseDialog?: () => void
  onPlay?: () => void
  onCustomAudioGenerated?: (audioUrl: string | undefined) => void
  customAudioUrl?: string
  volume?: number
  isMuted?: boolean
  guidanceHistory: GuidanceType[]
  showHistory: boolean
}

// 创建"无引导语"选项
const createNoGuidanceOption = (
  t: (zh: string, en: string) => string
): GuidanceType => ({
  id: 'no-guidance',
  title: t('无引导语', 'No Guidance'),
  description: t(
    '专注于呼吸，无语音引导',
    'Focus on your breath without voice guidance'
  ),
  paragraphs: [],
  content: <></>,
})

// 音频资源映射
const guidanceAudioMap: Record<string, string> = {
  basic:
    'https://objectstorageapi.gzg.sealos.run/e36y8btp-weeklyzen/audio/ai-sounds/meditation.mp3',
  breath:
    'https://objectstorageapi.gzg.sealos.run/e36y8btp-weeklyzen/audio/ai-sounds/breathtrain.mp3',
  body: 'https://objectstorageapi.gzg.sealos.run/e36y8btp-weeklyzen/audio/ai-sounds/bodyscan.mp3',
  'custom-guidance':
    'https://objectstorageapi.gzg.sealos.run/e36y8btp-weeklyzen/audio/ai-sounds/start.mp3',
}

export function GuidanceSelector({
  guidances,
  selectedGuidance,
  onGuidanceSelect,
  onShowFullText,
  isDarkTheme,
  t,
}: GuidanceSelectorProps) {
  // 创建无引导语和自定义引导语选项
  const noGuidanceOption = createNoGuidanceOption(t)

  // 处理引导语选择
  const handleGuidanceSelect = (guidance: GuidanceType) => {
    console.log('[GuidanceSelector] 选择引导语:', {
      id: guidance.id,
      title: guidance.title,
    })

    // 如果是"无引导语"选项，不设置音频URL
    if (guidance.id === 'no-guidance') {
      console.log('[GuidanceSelector] 选择无引导语，不设置音频')
      const updatedGuidance = {
        ...guidance,
        audioUrl: null,
      }
      onGuidanceSelect(updatedGuidance)
      return
    }

    // 检查是否存在对应的音频资源
    let audioUrl = guidance.audioUrl
    if (!audioUrl && guidanceAudioMap[guidance.id]) {
      audioUrl = guidanceAudioMap[guidance.id]
      console.log('[GuidanceSelector] 使用预设音频URL:', audioUrl)
    }

    // 如果是自定义引导语,强制使用 start.mp3
    if (guidance.id === 'custom-guidance') {
      audioUrl =
        'https://objectstorageapi.gzg.sealos.run/e36y8btp-weeklyzen/audio/ai-sounds/start.mp3'
      console.log('[GuidanceSelector] 使用自定义引导语音频:', audioUrl)
    }

    // 更新选中的引导语，确保包含正确的音频URL
    const updatedGuidance = {
      ...guidance,
      audioUrl: audioUrl,
    }

    onGuidanceSelect(updatedGuidance)
  }

  // 为每个引导语添加音频图标
  const renderGuidanceIcon = (guidance: GuidanceType) => {
    // 检查是否有音频
    const hasAudio = guidanceAudioMap[guidance.id] || guidance.audioUrl

    if (hasAudio) {
      return (
        <Volume2
          size={18}
          className={`mr-2 ${isDarkTheme ? 'text-indigo-400' : 'text-blue-500'}`}
        />
      )
    }

    return null
  }

  return (
    <div className="w-full space-y-4">
      <div className="flex items-center justify-between">
        <h3
          className={`text-lg font-medium ${isDarkTheme ? 'text-indigo-200' : 'text-blue-800'}`}
        >
          {t('引导语', 'Guidance')}
        </h3>

        {selectedGuidance && selectedGuidance.id !== 'no-guidance' && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onShowFullText}
            className={`text-xs ${isDarkTheme ? 'text-indigo-300 hover:text-indigo-200' : 'text-blue-600 hover:text-blue-700'}`}
          >
            <BookOpen size={16} className="mr-1" />
            {t('查看引导语', 'View Guidance')}
          </Button>
        )}
      </div>

      <div className="scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-transparent hover:scrollbar-thumb-gray-500 grid max-h-[calc(65vh-80px)] grid-cols-1 gap-2 overflow-y-auto pr-2">
        {/* 无引导语选项 */}
        <Button
          key={noGuidanceOption.id}
          variant="outline"
          className={cn(
            'flex h-auto items-center justify-between p-3 text-left',
            selectedGuidance?.id === noGuidanceOption.id
              ? isDarkTheme
                ? 'border-indigo-600 bg-indigo-800/30'
                : 'border-blue-400 bg-blue-100'
              : isDarkTheme
                ? 'border-indigo-800/30 hover:bg-indigo-900/50'
                : 'border-blue-200 hover:bg-blue-50'
          )}
          onClick={() => handleGuidanceSelect(noGuidanceOption)}
        >
          <div className="flex items-center">
            <VolumeX
              size={18}
              className={`mr-2 ${isDarkTheme ? 'text-indigo-400' : 'text-blue-500'}`}
            />
            <div>
              <div className="font-medium">{noGuidanceOption.title}</div>
              <div className="mt-1 line-clamp-2 text-xs opacity-70">
                {noGuidanceOption.description}
              </div>
            </div>
          </div>
          <ChevronRight size={16} className="ml-2 flex-shrink-0" />
        </Button>

        {/* 预设引导语选项 */}
        {guidances.map((guidance) => (
          <Button
            key={guidance.id}
            variant="outline"
            className={cn(
              'flex h-auto items-center justify-between p-3 text-left',
              selectedGuidance?.id === guidance.id
                ? isDarkTheme
                  ? 'border-indigo-600 bg-indigo-800/30'
                  : 'border-blue-400 bg-blue-100'
                : isDarkTheme
                  ? 'border-indigo-800/30 hover:bg-indigo-900/50'
                  : 'border-blue-200 hover:bg-blue-50'
            )}
            onClick={() => handleGuidanceSelect(guidance)}
          >
            <div className="flex items-center">
              {renderGuidanceIcon(guidance)}
              <div>
                <div className="font-medium">{guidance.title}</div>
                <div className="mt-1 line-clamp-2 text-xs opacity-70">
                  {guidance.description}
                </div>
              </div>
            </div>
            <ChevronRight size={16} className="ml-2 flex-shrink-0" />
          </Button>
        ))}
      </div>
    </div>
  )
}
