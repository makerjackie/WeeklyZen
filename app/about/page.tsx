"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/language-context";
import { SiteHeader } from "@/components/site-header";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useAppTheme } from "@/contexts/theme-context";

export default function AboutPage() {
  const { t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const { isDarkTheme, themeStyles } = useAppTheme();

  // 监听滚动事件
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrolled]);

  return (
    <div className={`min-h-screen ${themeStyles.background} ${themeStyles.text}`}>
      <SiteHeader scrolled={scrolled} />

      {/* 页面头部 */}
      <section className="py-16 sm:py-20 relative overflow-hidden">
        {/* 背景效果 */}
        <div className="absolute inset-0 -z-10 opacity-30">
          <div className={`absolute inset-0 ${isDarkTheme ? 'bg-gradient-to-b from-blue-950/50 to-indigo-950/80' : 'bg-gradient-to-b from-blue-100/50 to-indigo-100/80'}`} />
          <div className={`absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent ${isDarkTheme ? 'via-indigo-500/20' : 'via-blue-500/20'} to-transparent`} />

          {/* 添加星空效果 */}
          <div className="absolute inset-0 opacity-60">
            {Array.from({ length: 50 }).map(() => {
              // 为每个星星生成唯一ID
              const uniqueId = Math.random().toString(36).substring(2, 9);
              const size = Math.random() * 2 + 1;
              const top = Math.random() * 100;
              const left = Math.random() * 100;
              const duration = Math.random() * 5 + 5;
              const delay = Math.random() * 5;

              return (
                <motion.div
                  key={uniqueId}
                  className="absolute rounded-full bg-white"
                  style={{
                    width: `${size}px`,
                    height: `${size}px`,
                    top: `${top}%`,
                    left: `${left}%`,
                  }}
                  animate={{
                    opacity: [0.3, 0.8, 0.3],
                  }}
                  transition={{
                    duration,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                    delay,
                  }}
                />
              );
            })}
          </div>
        </div>

        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className={`text-3xl sm:text-4xl md:text-5xl font-light ${themeStyles.primaryText} mb-6 leading-tight`}>
              {t("关于我们", "About Us")}
            </h1>
            <p className={`${themeStyles.secondaryText} max-w-2xl mx-auto`}>
              {t(
                "了解这个小网站为什么存在，以及你可以怎样使用它。",
                "Learn why this small website exists and how you can use it."
              )}
            </p>
          </motion.div>
        </div>
      </section>

      {/* 内容区域 */}
      <section className="pb-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className={`${themeStyles.cardBackground} rounded-2xl p-8 md:p-12 backdrop-blur-md border ${themeStyles.cardBorder} shadow-lg ${isDarkTheme ? 'shadow-indigo-900/5' : 'shadow-blue-300/5'}`}
          >
            {/* 第一部分：我们的故事 */}
            <div className="mb-12">
              <h2 className={`text-2xl font-light ${themeStyles.primaryText} mb-6 pb-2 border-b ${isDarkTheme ? 'border-indigo-800/30' : 'border-blue-200/50'}`}>
                {t("我们的故事", "Our Story")}
              </h2>
              <div className="space-y-4">
                <p className={`${isDarkTheme ? 'text-indigo-100/90' : 'text-slate-700'} leading-relaxed`}>
                  {t(
                    "WeeklyZen 起初只是一个很小的想法：做一个安静、好用、不打扰人的冥想网站，让人们在忙碌的一天里随时停下来，回到呼吸。",
                    "WeeklyZen started as a very small idea: build a quiet, useful meditation website that lets people pause during a busy day and return to their breath."
                  )}
                </p>
                <p className={`${isDarkTheme ? 'text-indigo-100/90' : 'text-slate-700'} leading-relaxed`}>
                  {t(
                    "这个网站不试图把冥想包装得很复杂。它只是把计时、引导和入门说明放在一起，让第一次练习和日常复练都更轻松一些。",
                    "This website does not try to make meditation feel complicated. It simply brings a timer, guidance, and beginner-friendly explanations together so both first sessions and repeat practice feel easier."
                  )}
                </p>
              </div>
            </div>

            {/* 第二部分：我们的价值观 */}
            <div className="mb-12">
              <h2 className={`text-2xl font-light ${themeStyles.primaryText} mb-6 pb-2 border-b ${isDarkTheme ? 'border-indigo-800/30' : 'border-blue-200/50'}`}>
                {t("我们的价值观", "Our Values")}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className={`${isDarkTheme ? 'bg-indigo-900/20' : 'bg-blue-50/80'} p-6 rounded-xl border ${isDarkTheme ? 'border-indigo-600/10' : 'border-blue-200/50'}`}>
                  <h3 className={`text-xl font-medium ${themeStyles.primaryText} mb-3`}>
                    {t("简单与纯粹", "Simplicity & Purity")}
                  </h3>
                  <p className={`${isDarkTheme ? 'text-indigo-100/90' : 'text-slate-700'} leading-relaxed`}>
                    {t(
                      "我们相信冥想应该是简单易行的，不需要复杂的仪式或设备。我们专注于呼吸和专注力练习的核心，使冥想变得容易上手和坚持。",
                      "We believe meditation should be simple and actionable, without complex rituals or equipment. We focus on the core of breathing and concentration practices, making meditation easy to start and maintain."
                    )}
                  </p>
                </div>
                <div className={`${isDarkTheme ? 'bg-indigo-900/20' : 'bg-blue-50/80'} p-6 rounded-xl border ${isDarkTheme ? 'border-indigo-600/10' : 'border-blue-200/50'}`}>
                  <h3 className={`text-xl font-medium ${themeStyles.primaryText} mb-3`}>
                    {t("轻量与安静", "Lightweight & Quiet")}
                  </h3>
                  <p className={`${isDarkTheme ? 'text-indigo-100/90' : 'text-slate-700'} leading-relaxed`}>
                    {t(
                      "没有复杂流程，没有信息轰炸，也没有多余装饰。我们希望你一打开页面，就能很快进入练习状态。",
                      "No complex flow, no information overload, and no unnecessary decoration. The goal is to help you get into practice quickly."
                    )}
                  </p>
                </div>
                <div className={`${isDarkTheme ? 'bg-indigo-900/20' : 'bg-blue-50/80'} p-6 rounded-xl border ${isDarkTheme ? 'border-indigo-600/10' : 'border-blue-200/50'}`}>
                  <h3 className={`text-xl font-medium ${themeStyles.primaryText} mb-3`}>
                    {t("可持续与一致", "Sustainability & Consistency")}
                  </h3>
                  <p className={`${isDarkTheme ? 'text-indigo-100/90' : 'text-slate-700'} leading-relaxed`}>
                    {t(
                      "我们注重培养可持续的冥想习惯，而不是短暂的热情。每天5分钟的一致练习胜过偶尔的长时间冥想。我们帮助成员建立适合自己生活节奏的冥想习惯。",
                      "We focus on cultivating sustainable meditation habits rather than temporary enthusiasm. Consistent 5-minute daily practice is better than occasional long meditation sessions. We help members establish meditation habits that fit their own life rhythms."
                    )}
                  </p>
                </div>
                <div className={`${isDarkTheme ? 'bg-indigo-900/20' : 'bg-blue-50/80'} p-6 rounded-xl border ${isDarkTheme ? 'border-indigo-600/10' : 'border-blue-200/50'}`}>
                  <h3 className={`text-xl font-medium ${themeStyles.primaryText} mb-3`}>
                    {t("开放与易用", "Open & Accessible")}
                  </h3>
                  <p className={`${isDarkTheme ? 'text-indigo-100/90' : 'text-slate-700'} leading-relaxed`}>
                    {t(
                      "你可以直接开始，不需要加入群组、参加活动或完成注册。只要愿意留一点时间给自己，这里就已经够用了。",
                      "You can begin right away without joining a group, attending events, or creating an account. If you're willing to give yourself a little time, this site is already enough."
                    )}
                  </p>
                </div>
              </div>
            </div>

            {/* 第三部分：可以做什么 */}
            <div className="mb-12">
              <h2 className={`text-2xl font-light ${themeStyles.primaryText} mb-6 pb-2 border-b ${isDarkTheme ? 'border-indigo-800/30' : 'border-blue-200/50'}`}>
                {t("在这里你可以做什么", "What You Can Do Here")}
              </h2>
              <div className="space-y-8">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className={`flex-1 ${isDarkTheme ? 'bg-indigo-900/20' : 'bg-blue-50/80'} p-6 rounded-xl border ${isDarkTheme ? 'border-indigo-600/10' : 'border-blue-200/50'}`}>
                    <h3 className={`text-xl font-medium ${themeStyles.primaryText} mb-3`}>
                      {t("直接开始练习", "Start Practicing Right Away")}
                    </h3>
                    <ul className={`space-y-3 ${isDarkTheme ? 'text-indigo-100/90' : 'text-slate-700'}`}>
                      <li className="flex items-start">
                        <span className={`${isDarkTheme ? 'text-indigo-400' : 'text-blue-500'} mr-2`}>•</span>
                        <div>
                          <strong>{t("使用冥想计时器", "Use the Meditation Timer")}</strong>
                          <p>{t("从 5 分钟开始，跟随呼吸球慢慢稳定下来。", "Start with 5 minutes and settle in with the breathing sphere.")}</p>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <span className={`${isDarkTheme ? 'text-indigo-400' : 'text-blue-500'} mr-2`}>•</span>
                        <div>
                          <strong>{t("选择引导语", "Choose a Guidance Track")}</strong>
                          <p>{t("可以使用基础引导、呼吸练习，或尝试 AI 生成的个性化内容。", "Use a basic guide, a breathing practice, or try AI-generated personalized content.")}</p>
                        </div>
                      </li>
                    </ul>
                  </div>
                  <div className={`flex-1 ${isDarkTheme ? 'bg-indigo-900/20' : 'bg-blue-50/80'} p-6 rounded-xl border ${isDarkTheme ? 'border-indigo-600/10' : 'border-blue-200/50'}`}>
                    <h3 className={`text-xl font-medium ${themeStyles.primaryText} mb-3`}>
                      {t("慢慢了解冥想", "Learn Meditation Gently")}
                    </h3>
                    <ul className={`space-y-3 ${isDarkTheme ? 'text-indigo-100/90' : 'text-slate-700'}`}>
                      <li className="flex items-start">
                        <span className={`${isDarkTheme ? 'text-indigo-400' : 'text-blue-500'} mr-2`}>•</span>
                        <div>
                          <strong>{t("阅读入门说明", "Read the Beginner Guide")}</strong>
                          <p>{t("从姿势、呼吸到常见问题，先建立一个温和的开始。", "Build a gentle start with guidance on posture, breathing, and common beginner questions.")}</p>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <span className={`${isDarkTheme ? 'text-indigo-400' : 'text-blue-500'} mr-2`}>•</span>
                        <div>
                          <strong>{t("按自己的节奏练习", "Practice at Your Own Pace")}</strong>
                          <p>{t("哪怕只是短短几分钟，稳定而重复的练习也很有价值。", "Even a few minutes at a time can be valuable when your practice is steady and repeatable.")}</p>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* 开始练习 */}
            <div className={`${isDarkTheme ? 'bg-indigo-900/30' : 'bg-blue-50/80'} p-8 rounded-2xl border ${isDarkTheme ? 'border-indigo-600/20' : 'border-blue-200/50'} mb-10 text-center`}>
              <h2 className={`text-2xl font-light ${themeStyles.primaryText} mb-4`}>
                {t("准备开始了吗？", "Ready to Begin?")}
              </h2>
              <p className={`${isDarkTheme ? 'text-indigo-100/90' : 'text-slate-700'} leading-relaxed mb-6 max-w-2xl mx-auto`}>
                {t(
                  "如果你愿意，现在就可以从一段简短练习开始；如果你还想先了解一点背景，也可以先去看入门页。",
                  "If you'd like, you can start with a short session right now. If you'd rather get some context first, the introduction page is a good place to begin."
                )}
              </p>
              <div className="flex justify-center gap-4">
                <Link href="/meditation">
                  <Button
                    variant="outline"
                    className={`px-8 py-2 rounded-full ${isDarkTheme
                      ? " bg-blue-600/95 text-indigo-100 hover:bg-blue-400/95"
                      : " bg-blue-600/95 text-indigo-100 hover:bg-blue-400/95"
                      } backdrop-blur-sm transition-all duration-200`}
                  >
                    {t("开始冥想", "Start Meditating")}
                  </Button>
                </Link>
                <Link href="/introduction">
                  <Button variant="outline" className={`px-8 py-2 rounded-full ${isDarkTheme ? 'text-indigo-300 border-indigo-600/30 hover:bg-indigo-950/50' : 'text-blue-600 border-blue-300/50 hover:bg-blue-50'}`}>
                    {t("阅读入门指南", "Read the Introduction")}
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
