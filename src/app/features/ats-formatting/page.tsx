'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShieldCheck, CheckCircle, XCircle, AlertCircle, Lightbulb, RefreshCw, FileText, TrendingUp } from 'lucide-react';
import { useLanguage } from '@/components/providers/language-provider';


function CircularProgress({ score, size = 140, label }: { score: number; size?: number; label: string }) {
  const radius = (size - 20) / 2;
  const circumference = 2 * Math.PI * radius;
  const [animated, setAnimated] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setAnimated(score), 100);
    return () => clearTimeout(timer);
  }, [score]);

  const strokeDash = (animated / 100) * circumference;
  const color = score < 50 ? '#ef4444' : score < 75 ? '#f59e0b' : '#22c55e';

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
        <circle cx={size/2} cy={size/2} r={radius} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="10" />
        <circle
          cx={size/2} cy={size/2} r={radius}
          fill="none"
          stroke={color}
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={circumference - strokeDash}
          style={{ transition: 'stroke-dashoffset 1.2s cubic-bezier(0.4,0,0.2,1)', filter: `drop-shadow(0 0 8px ${color}60)` }}
        />
      </svg>
      <div className="absolute flex flex-col items-center">
        <span className="text-3xl font-bold text-foreground">{animated}</span>
        <span className="text-xs font-medium" style={{ color }}>{label}</span>
      </div>
    </div>
  );
}

export default function ATSFormattingPage() {
  const { t, lang } = useLanguage();

  const getLocalizedData = () => {
    switch (lang) {
      case 'uz':
        return {
          scoreDesc: "Resumeyingiz o'rtacha darajadan past baholandi. Balingizni 80 dan oshirish uchun quyidagi tavsiyalarni qo'llang.",
          sampleResume: `Jon Smit - Dastur muhandisi\n\nTajriba:\nTechCorp da Dasturchi (2021-2024)\n- React yordamida veb ilovalar qildim\n- Ma'lumotlar bazasi so'rovlari ustida ishladim\n- Xatolarni tuzatdim va kod yozdim\n- Uchrashuvlarda qatnashdim va hisobot berdim\n\nTa'lim:\nBS Kompyuter fanlari, Davlat universiteti 2021\n\nKo'nikmalar: JavaScript, HTML, CSS, Git`,
          allKeywords: [
            { word: 'React', found: true },
            { word: 'JavaScript', found: true },
            { word: 'Git', found: true },
            { word: 'Python', found: false },
            { word: 'SQL', found: false },
            { word: 'API', found: false },
            { word: 'TypeScript', found: false },
            { word: 'Agile', found: false },
            { word: 'Node.js', found: false },
            { word: 'Testing', found: false },
          ],
          issues: [
            'Bandlarda miqdoriy ko\'rsatkichlar yo\'q (raqamlar, foizlar)',
            'Ish nomida norasmiy til ishlatilgan ("qildim", "tuzatdim")',
            'LinkedIn yoki GitHub profil havolasi yo\'q',
            'Tajriba bo\'limida o\'lchanadigan yutuqlar yo\'q',
            'Ko\'nikmalar bo\'limi juda siyrak — tegishli vositalar bilan kengaytiring',
          ],
          suggestions: [
            'Ko\'rsatkichlarni qo\'shing: "tezlikni oshirdim" o\'rniga "ish faoliyatini 40% ga oshirdim"',
            'Ko\'nikmalar bo\'limiga ish ta\'rifidagi kalit so\'zlarni kiriting',
            'Butun davomida izchil sana formatidan foydalaning (masalan, Yan 2021 – Mar 2024)',
            'Yuqorida professional qisqacha ma\'lumot bo\'limini qo\'shing',
            'Maqsadli rolingizga tegishli sertifikatlar yoki kurslarni ro\'yxatga kiriting',
            'Kuchsiz fe\'llarni ("ustida ishladim") kuchlilariga ("loyihalashtirdim", "ishlab chiqdim") almashtiring',
          ]
        };
      case 'ru':
        return {
          scoreDesc: "Ваше резюме набрало ниже среднего балла. Примените рекомендации ниже, чтобы увеличить балл выше 80.",
          sampleResume: `Джон Смит - Инженер-программист\n\nОпыт:\nРазработчик ПО в TechCorp (2021-2024)\n- Создавал веб-приложения с использованием React\n- Работал над запросами к базе данных\n- Исправлял ошибки и писал код\n- Посещал встречи и давал отчеты\n\nОбразование:\nБакалавр компьютерных наук, Государственный университет 2021\n\nНавыки: JavaScript, HTML, CSS, Git`,
          allKeywords: [
            { word: 'React', found: true },
            { word: 'JavaScript', found: true },
            { word: 'Git', found: true },
            { word: 'Python', found: false },
            { word: 'SQL', found: false },
            { word: 'API', found: false },
            { word: 'TypeScript', found: false },
            { word: 'Agile', found: false },
            { word: 'Node.js', found: false },
            { word: 'Testing', found: false },
          ],
          issues: [
            'В пунктах отсутствуют количественные показатели (цифры, проценты)',
            'В названии должности используется неформальный язык ("Создавал", "Исправлял ошибки")',
            'Отсутствует URL-адрес профиля LinkedIn или GitHub',
            'В разделе опыта нет измеримых достижений',
            'Раздел навыков слишком скудный — расширьте его с помощью соответствующих инструментов',
          ],
          suggestions: [
            'Добавьте метрики: "Увеличил производительность на 40%" вместо "улучшил скорость"',
            'Включите ключевые слова из описания вакансии в раздел навыков',
            'Используйте единый формат дат (например, Янв 2021 – Мар 2024)',
            'Добавьте раздел профессионального резюме в самом начале',
            'Укажите сертификаты или курсы, соответствующие вашей целевой роли',
            'Замените слабые глаголы ("работал над") на сильные ("спроектировал", "разработал")',
          ]
        };
      case 'tr':
        return {
          scoreDesc: "Özgeçmişiniz ortalamanın altında puan aldı. Puanınızı 80'in üzerine çıkarmak için aşağıdaki önerileri uygulayın.",
          sampleResume: `John Smith - Yazılım Mühendisi\n\nDeneyim:\nTechCorp'ta Yazılım Geliştirici (2021-2024)\n- React kullanarak web uygulamaları oluşturdu\n- Veritabanı sorguları üzerinde çalıştı\n- Hataları düzeltti ve kod yazdı\n- Toplantılara katıldı ve güncellemeler verdi\n\nEğitim:\nBS Bilgisayar Bilimleri, Eyalet Üniversitesi 2021\n\nBeceriler: JavaScript, HTML, CSS, Git`,
          allKeywords: [
            { word: 'React', found: true },
            { word: 'JavaScript', found: true },
            { word: 'Git', found: true },
            { word: 'Python', found: false },
            { word: 'SQL', found: false },
            { word: 'API', found: false },
            { word: 'TypeScript', found: false },
            { word: 'Agile', found: false },
            { word: 'Node.js', found: false },
            { word: 'Testing', found: false },
          ],
          issues: [
            'Madde işaretlerinde ölçülebilir metrikler eksik (sayılar, yüzdeler)',
            'İş unvanı gayri resmi dil kullanıyor ("Oluşturdu", "Hataları düzeltti")',
            'LinkedIn veya GitHub profil URL\'si eksik',
            'Deneyim bölümünün ölçülebilir başarıları yok',
            'Beceriler bölümü çok seyrek — ilgili araçlarla genişletin',
          ],
          suggestions: [
            'Metrikler ekleyin: "hızı artırdı" yerine "performansı %40 artırdı"',
            'Beceriler bölümünüze iş tanımından anahtar kelimeler ekleyin',
            'Tutarlı tarih biçimi kullanın (örneğin, Oca 2021 – Mar 2024)',
            'En üste profesyonel bir özet bölümü ekleyin',
            'Hedef rolünüzle ilgili sertifikaları veya kursları listeleyin',
            'Zayıf fiilleri ("üzerinde çalıştı") güçlü fiillerle ("tasarladı", "geliştirdi") değiştirin',
          ]
        };
      case 'en':
      default:
        return {
          scoreDesc: "Your resume scored below average. Apply the suggestions below to increase your score above 80.",
          sampleResume: `John Smith - Software Engineer\n\nExperience:\nSoftware Developer at TechCorp (2021-2024)\n- Built web applications using React\n- Worked on database queries\n- Fixed bugs and wrote code\n- Attended meetings and gave updates\n\nEducation:\nBS Computer Science, State University 2021\n\nSkills: JavaScript, HTML, CSS, Git`,
          allKeywords: [
            { word: 'React', found: true },
            { word: 'JavaScript', found: true },
            { word: 'Git', found: true },
            { word: 'Python', found: false },
            { word: 'SQL', found: false },
            { word: 'API', found: false },
            { word: 'TypeScript', found: false },
            { word: 'Agile', found: false },
            { word: 'Node.js', found: false },
            { word: 'Testing', found: false },
          ],
          issues: [
            'Bullet points lack quantifiable metrics (numbers, percentages)',
            'Job title uses informal language ("Built", "Fixed bugs")',
            'Missing LinkedIn or GitHub profile URL',
            'Experience section has no measurable achievements',
            'Skills section is too sparse — expand with relevant tools',
          ],
          suggestions: [
            'Add metrics: "Increased performance by 40%" instead of "improved speed"',
            'Include keywords from the job description in your skills section',
            'Use consistent date format throughout (e.g., Jan 2021 – Mar 2024)',
            'Add a professional summary section at the top',
            'List certifications or courses relevant to your target role',
            'Replace weak verbs ("worked on") with strong ones ("architected", "engineered")',
          ]
        };
    }
  };

  const { sampleResume, allKeywords, issues, suggestions, scoreDesc } = getLocalizedData();
  const [resumeText, setResumeText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [score] = useState(42);

  const handleCheck = async () => {
    if (!resumeText.trim()) return;
    setIsLoading(true);
    setShowResults(false);
    await new Promise(r => setTimeout(r, 1600));
    setIsLoading(false);
    setShowResults(true);
  };

  const handleSample = () => {
    setResumeText(sampleResume);
    setShowResults(false);
  };

  const handleReset = () => {
    setResumeText('');
    setShowResults(false);
  };

  return (
    <div className="min-h-screen bg-transparent pb-20">
      {/* Hero */}
      <div className="relative overflow-hidden border-b border-border">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/3 top-0 h-64 w-64 rounded-full bg-violet-500/10 blur-3xl" />
        </div>
        <div className="relative mx-auto max-w-7xl px-6 py-12 sm:px-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500/20 to-purple-500/10 border border-violet-400/30">
              <ShieldCheck className="h-6 w-6 text-violet-400" />
            </div>
            <div>
              <div className="text-xs font-semibold uppercase tracking-widest text-violet-400">{t.atsFeature}</div>
              <h1 className="text-2xl font-bold text-foreground">{t.atsTitle}</h1>
            </div>
          </div>
          <p className="text-foreground-secondary max-w-2xl">{t.atsDesc}</p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-10 sm:px-8">
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Input */}
          <div className="rounded-2xl border border-border bg-surface-elevated p-6 backdrop-blur-sm">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-violet-400" />
                <span className="text-sm font-semibold text-foreground">{t.pasteResume}</span>
              </div>
              <button onClick={handleSample} className="rounded-lg border border-border px-3 py-1.5 text-xs text-foreground-secondary hover:border-white/20 hover:text-foreground transition-colors">
                {t.useSample}
              </button>
            </div>
            <textarea
              value={resumeText}
              onChange={e => setResumeText(e.target.value)}
              placeholder={t.atsPlaceholder}
              rows={14}
              className="w-full resize-none rounded-xl border border-border bg-surface-elevated px-4 py-3 text-sm text-foreground placeholder-slate-500 focus:border-violet-400/50 focus:outline-none focus:ring-1 focus:ring-violet-400/30"
            />
            <div className="mt-4 flex gap-3">
              <button
                onClick={handleCheck}
                disabled={!resumeText.trim() || isLoading}
                className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-500 to-purple-600 py-2.5 text-sm font-semibold text-foreground shadow-lg shadow-violet-500/30 hover:from-violet-400 hover:to-purple-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                {isLoading ? <span className="flex items-center gap-2"><RefreshCw className="h-4 w-4 animate-spin" /> {t.analyzing}</span> : <span className="flex items-center gap-2"><ShieldCheck className="h-4 w-4" /> {t.checkATS}</span>}
              </button>
              <button onClick={handleReset} className="rounded-xl border border-border px-4 py-2.5 text-sm text-foreground-secondary hover:text-foreground transition-colors">
                {t.reset}
              </button>
            </div>
          </div>

          {/* Results */}
          <div>
            {!showResults && !isLoading && (
              <div className="flex h-full min-h-[300px] flex-col items-center justify-center rounded-2xl border border-border bg-surface-elevated/40 text-center p-8">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-border bg-surface-elevated mb-4">
                  <ShieldCheck className="h-8 w-8 text-foreground-secondary" />
                </div>
                <p className="text-foreground-secondary text-sm">{t.atsWaiting}</p>
              </div>
            )}

            {isLoading && (
              <div className="flex h-full min-h-[300px] flex-col items-center justify-center rounded-2xl border border-border bg-surface-elevated gap-4">
                <RefreshCw className="h-10 w-10 text-violet-400 animate-spin" />
                <p className="text-foreground-secondary text-sm">{t.atsAnalyzing}</p>
              </div>
            )}

            <AnimatePresence>
              {showResults && (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
                  {/* Score card */}
                  <div className="rounded-2xl border border-border bg-surface-elevated p-6 backdrop-blur-sm">
                    <div className="flex items-center gap-6">
                      <CircularProgress score={score} label={t.needsWork} />
                      <div>
                        <div className="mb-1 text-xs font-semibold uppercase tracking-widest text-foreground-secondary">{t.atsScore}</div>
                        <div className="text-2xl font-bold text-red-400">{t.needsWork}</div>
                        <p className="mt-2 text-sm text-foreground-secondary">{scoreDesc}</p>
                        <div className="mt-3 flex items-center gap-1.5 text-xs text-emerald-400">
                          <TrendingUp className="h-3.5 w-3.5" />
                          {t.potentialScore}: <span className="font-bold">87/100</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Keywords */}
                  <div className="rounded-2xl border border-border bg-surface-elevated p-5 backdrop-blur-sm">
                    <h3 className="mb-3 text-sm font-semibold text-foreground">{t.keywordAnalysis}</h3>
                    <div className="flex flex-wrap gap-2">
                      {allKeywords.map(kw => (
                        <span key={kw.word} className={`rounded-full border px-3 py-1 text-xs font-medium flex items-center gap-1.5 ${
                          kw.found ? 'border-emerald-400/30 bg-emerald-400/10 text-emerald-300' : 'border-red-400/30 bg-red-400/10 text-red-300'
                        }`}>
                          {kw.found ? <CheckCircle className="h-3 w-3" /> : <XCircle className="h-3 w-3" />}
                          {kw.word}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Issues */}
                  <div className="rounded-2xl border border-red-500/15 bg-red-500/5 p-5">
                    <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-foreground">
                      <XCircle className="h-4 w-4 text-red-400" /> {t.issuesFound} ({issues.length})
                    </h3>
                    <div className="space-y-2">
                      {issues.map((issue, i) => (
                        <div key={i} className="flex gap-2.5 text-sm text-slate-300">
                          <AlertCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-red-400" />
                          {issue}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Suggestions */}
                  <div className="rounded-2xl border border-primary/15 bg-primary/5 p-5">
                    <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-foreground">
                      <Lightbulb className="h-4 w-4 text-primary" /> {t.suggestions}
                    </h3>
                    <div className="space-y-2">
                      {suggestions.map((s, i) => (
                        <div key={i} className="flex gap-2.5 text-sm text-slate-300">
                          <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
                          {s}
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
