'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Brain, Sparkles, Copy, Check, RefreshCw, Zap, Lightbulb, ChevronRight } from 'lucide-react';
import { useLanguage } from '@/components/providers/language-provider';
import { PaywallModal } from '@/components/shared/paywall-modal';
import { useSubscription } from '@/components/providers/subscription-provider';

export default function AIWritingPage() {
  const { t, lang } = useLanguage();

  const getLocalizedData = () => {
    switch (lang) {
      case 'uz':
        return {
          examples: [
            { label: 'Dastur muhandisi', input: 'backend ustida ishladim, xatolarni tuzatdim, deploymentga yordam berdim, testlar yozdim', jobTitle: 'Katta Dastur muhandisi' },
            { label: 'Mahsulot menejeri', input: 'mahsulot rejasini boshqardim, mijozlar bilan gaplashdim, muhandislar jamoasi bilan ishladim, xususiyatlarni ishga tushirdim', jobTitle: 'Mahsulot menejeri' },
            { label: 'Dizayner', input: 'dizaynlar qildim, figma bilan ishladim, foydalanuvchi tadqiqotini qildim, ilova ko\'rinishini yaxshiladim', jobTitle: 'UX Dizayner' },
            { label: 'Ma\'lumotlar tahlilchisi', input: 'ma\'lumotlarni tahlil qildim, dashbordlar qildim, sql so\'rovlarini yozdim, natijalarni jamoaga ko\'rsatdim', jobTitle: 'Ma\'lumotlar tahlilchisi' },
            { label: 'Marketing', input: 'ijtimoiy tarmoqlarni yuritdim, kontent yozdim, kampaniyalarni boshqardim, obunachilar sonini oshirdim', jobTitle: 'Marketing menejeri' },
          ],
          aiOutputs: {
            'Katta Dastur muhandisi': [
              '• Node.js va PostgreSQL yordamida kunlik 50K+ so\'rovlarni ko\'rib chiquvchi kengaytiriladigan backend xizmatlarini ishlab chiqdi va saqladi',
              '• Tizimli asosiy sabablarni tahlil qilish va avtomatlashtirilgan regressiya testlarini joriy etish orqali muhim xatolar orqada qolishini 78% ga kamaytirdi',
              '• CI/CD quvur tarmog\'ini joylashtirish jarayonini soddalashtirdi va o\'rtacha chiqarilish tsiklini 4 soatdan 45 daqiqagacha qisqartirdi',
              '• Jest bilan 200+ birlik va integratsiya testlarini yozish orqali asosiy modullar bo\'ylab 94% test qamroviga erishdi',
            ],
            'Mahsulot menejeri': [
              '• 3 chorak davomida mahsulot yo\'l xaritasini belgilab chiqdi va amalga oshirdi, o\'z vaqtida va byudjet doirasida 12 ta yuqori ta\'sirli xususiyatlarni taqdim etdi',
              '• Og\'riqli nuqtalarni aniqlash uchun 40+ mijozlarni o\'rganish intervyularini o\'tkazdi va NPSni 22 punktga yaxshilagan qayta dizaynga bevosita ma\'lumot berdi',
              '• Faol foydalanuvchilarning 85% tomonidan qabul qilingan flagman xususiyatini yetkazib berish uchun muhandislik, dizayn va ma\'lumotlar jamoalari bilan funksiyalararo hamkorlik qildi',
              '• RICE ball tizimi yordamida funksiyalar orqada qolishini ustuvorlashtirdi va jamoa tezligini chorakdan chorakka 30% ga oshirdi',
            ],
            'UX Dizayner': [
              '• 200K foydalanuvchili SaaS mahsuloti uchun Figma-da uchidan uchigacha foydalanuvchi tajribalarini loyihalashtirdi, vazifalarni bajarish vaqtini 35% ga qisqartirdi',
              '• 50+ ishtirokchilar bilan qulaylikni tekshirish seanslarini o\'tkazdi va tushunchalarni amalga oshirish mumkin bo\'lgan dizayn iteratsiyalariga aylantirdi',
              '• 80+ qayta foydalanish mumkin bo\'lgan komponentlar bilan kengaytiriladigan dizayn tizimini o\'rnatdi, dizayndan topshirishgacha bo\'lgan vaqtni 40% ga qisqartirdi',
              '• Pikselga mukammal interfeyslarni taqdim etish uchun mahsulot va muhandislik bilan hamkorlik qildi, 4.8/5 foydalanuvchi qoniqish bahosiga erishdi',
            ],
            'Ma\'lumotlar tahlilchisi': [
              '• Tableau va Power BI-da 15+ boshqaruv dashbordlarini qurdi va saqlab qoldi, bu esa asosiy biznes KPI-larini real vaqt rejimida ko\'rish imkonini berdi',
              '• 10M+ qatorli ma\'lumotlar to\'plamlari bo\'ylab murakkab SQL so\'rovlarini yozdi, hisobot yaratish vaqtini 6 soatdan 20 daqiqagacha qisqartirdi',
              '• Kogorta tahlili va mijozlar ketishini bashorat qilish modellari orqali xarajatlarni tejash bo\'yicha 1.2M dollarlik imkoniyatlarni aniqladi',
              '• Texnik topilmalarni aniq biznes tavsiyalariga tarjima qilib, oylik ma\'lumotlar tushunchalarini C-darajali manfaatdor tomonlarga taqdim etdi',
            ],
            'Marketing menejeri': [
              '• Ma\'lumotlarga asoslangan kontent strategiyasi va A/B sinovidan o\'tgan e\'lon qilish ritmi orqali LinkedIn va Instagram izdoshlarini 6 oy ichida 340% ga oshirdi',
              '• Oyiga 30+ yuqori samarali kontent ishlab chiqardi va yildan-yilga organik veb-sayt trafigini 65% ga oshirdi',
              '• Google va Meta bo\'ylab 80K dollarlik oylik pullik kampaniya byudjetini boshqardi, o\'rtacha 4.2x ROAS-ga erishdi',
              '• Maqsadli etakchi avlod kampaniyalari va avtomatlashtirilgan oziqlantirish ketma-ketliklari orqali elektron pochta abonentlari ro\'yxatini 5K dan 28K ga ko\'tardi',
            ],
          },
          tips: [
            'Ta\'siringizni miqdoriy baholash uchun raqamlar va foizlardan foydalaning',
            'Har bir bandni kuchli harakat fe\'li bilan boshlang',
            'Faqat faoliyatga emas, natijalarga e\'tibor qarating',
            'Bandlarni qisqa tuting — maksimal 1-2 qator',
            'Tilni ish ta\'rifi kalit so\'zlariga moslashtiring',
          ]
        };
      case 'ru':
        return {
          examples: [
            { label: 'Инженер-программист', input: 'работал над бэкендом, исправлял ошибки, помогал с развертыванием, писал тесты', jobTitle: 'Старший инженер-программист' },
            { label: 'Менеджер по продукту', input: 'управлял дорожной картой продукта, общался с клиентами, работал с командой инженеров, запускал функции', jobTitle: 'Менеджер по продукту' },
            { label: 'Дизайнер', input: 'создавал дизайн, работал с figma, проводил исследования пользователей, улучшал внешний вид приложения', jobTitle: 'UX Дизайнер' },
            { label: 'Аналитик данных', input: 'анализировал данные, создавал дашборды, писал sql запросы, представлял результаты команде', jobTitle: 'Аналитик данных' },
            { label: 'Маркетинг', input: 'вел соцсети, писал контент, управлял кампаниями, увеличивал количество подписчиков', jobTitle: 'Менеджер по маркетингу' },
          ],
          aiOutputs: {
            'Старший инженер-программист': [
              '• Спроектировал и поддерживал масштабируемые бэкенд-сервисы, обрабатывающие более 50 тысяч запросов в день с использованием Node.js и PostgreSQL',
              '• Сократил отставание по критическим ошибкам на 78% за счет систематического анализа первопричин и внедрения автоматизированного набора регрессионного тестирования',
              '• Оптимизировал процесс развертывания конвейера CI/CD, сократив средний цикл выпуска с 4 часов до 45 минут',
              '• Достиг 94% покрытия тестами основных модулей путем создания 200+ модульных и интеграционных тестов с помощью Jest',
            ],
            'Менеджер по продукту': [
              '• Определил и выполнил дорожную карту продукта на протяжении 3 кварталов, предоставив 12 высокоэффективных функций вовремя и в рамках бюджета',
              '• Провел 40+ интервью с клиентами для выявления болевых точек, что напрямую повлияло на редизайн, который улучшил NPS на 22 пункта',
              '• Сотрудничал с командами инженеров, дизайнеров и аналитиков для выпуска флагманской функции, которую внедрили 85% активных пользователей',
              '• Приоритезировал бэклог функций с использованием системы оценки RICE, увеличивая скорость команды на 30% каждый квартал',
            ],
            'UX Дизайнер': [
              '• Разработал сквозной пользовательский опыт в Figma для SaaS-продукта с 200 тыс. пользователей, сократив время выполнения задач на 35%',
              '• Провел сеансы юзабилити-тестирования с 50+ участниками, превратив идеи в практические итерации дизайна',
              '• Создал масштабируемую систему дизайна с 80+ многократно используемыми компонентами, сократив время от дизайна до передачи на 40%',
              '• Сотрудничал с продуктовыми и инженерными отделами для создания идеальных до пикселя интерфейсов, достигнув оценки удовлетворенности пользователей 4.8/5',
            ],
            'Аналитик данных': [
              '• Создал и поддерживал 15+ дашбордов для руководителей в Tableau и Power BI, обеспечив наглядность ключевых KPI бизнеса в реальном времени',
              '• Создавал сложные SQL-запросы к наборам данных размером 10M+ строк, сократив время создания отчетов с 6 часов до менее 20 минут',
              '• Выявил возможности экономии средств на 1.2 млн долларов за счет когортного анализа и моделирования прогнозирования оттока',
              '• Представлял ежемесячные аналитические данные топ-менеджерам, переводя технические выводы в четкие бизнес-рекомендации',
            ],
            'Менеджер по маркетингу': [
              '• Увеличил количество подписчиков в LinkedIn и Instagram на 340% за 6 месяцев за счет стратегии контента на основе данных и A/B-тестирования частоты публикаций',
              '• Создавал 30+ высокоэффективных единиц контента в месяц, что привело к увеличению органического трафика на веб-сайт на 65% по сравнению с прошлым годом',
              '• Управлял ежемесячным бюджетом платных кампаний в размере 80 тысяч долларов в Google и Meta, достигнув среднего показателя ROAS 4.2x',
              '• Увеличил список подписчиков электронной почты с 5 тысяч до 28 тысяч с помощью целевых кампаний по лидогенерации и автоматизированных последовательностей',
            ],
          },
          tips: [
            'Используйте цифры и проценты для количественной оценки вашего влияния',
            'Начинайте каждый пункт с сильного глагола действия',
            'Сосредоточьтесь на результатах, а не только на действиях',
            'Делайте пункты краткими — максимум 1-2 строки',
            'Адаптируйте язык к ключевым словам в описании вакансии',
          ]
        };
      case 'tr':
        return {
          examples: [
            { label: 'Yazılım Mühendisi', input: 'arka uçta çalıştım, hataları düzelttim, dağıtıma yardım ettim, bazı testler yazdım', jobTitle: 'Kıdemli Yazılım Mühendisi' },
            { label: 'Ürün Yöneticisi', input: 'ürün yol haritasını yönettim, müşterilerle konuştum, mühendislik ekibiyle çalıştım, özellikler başlattım', jobTitle: 'Ürün Yöneticisi' },
            { label: 'Tasarımcı', input: 'tasarımlar yaptım, figma ile çalıştım, kullanıcı araştırması yaptım, uygulamanın görünümünü iyileştirdim', jobTitle: 'UX Tasarımcısı' },
            { label: 'Veri Analisti', input: 'verileri analiz ettim, panolar yaptım, sql sorguları yazdım, bulguları ekibe sundum', jobTitle: 'Veri Analisti' },
            { label: 'Pazarlama', input: 'sosyal medyayı yönettim, içerik yazdım, kampanyaları yönettim, takipçi sayısını artırdım', jobTitle: 'Pazarlama Yöneticisi' },
          ],
          aiOutputs: {
            'Kıdemli Yazılım Mühendisi': [
              '• Node.js ve PostgreSQL kullanarak günlük 50B+ isteği işleyen ölçeklenebilir arka uç hizmetleri tasarlandı ve sürdürüldü',
              '• Sistematik kök neden analizi ve otomatikleştirilmiş regresyon test paketinin uygulanması yoluyla kritik hata birikimini %78 oranında azalttı',
              '• CI/CD boru hattı dağıtım sürecini basitleştirerek ortalama yayın döngüsünü 4 saatten 45 dakikaya indirdi',
              '• Jest ile 200\'den fazla birim ve entegrasyon testi yazarak temel modüllerde %94 test kapsamı elde edildi',
            ],
            'Ürün Yöneticisi': [
              '• 3 çeyrek boyunca ürün yol haritasını tanımladı ve yürüttü, zamanında ve bütçe dahilinde 12 yüksek etkili özellik sundu',
              '• Ağrı noktalarını belirlemek için 40\'tan fazla müşteri keşif görüşmesi yaptı ve NPS\'yi 22 puan iyileştiren bir yeniden tasarıma doğrudan bilgi verdi',
              '• Aktif kullanıcıların %85\'i tarafından benimsenen amiral gemisi bir özelliği sunmak için mühendislik, tasarım ve veri ekipleriyle işlevler arası işbirliği yaptı',
              '• RICE puanlama çerçevesini kullanarak özellik birikimini önceliklendirdi, takım hızını çeyrekten çeyreğe %30 artırdı',
            ],
            'UX Tasarımcısı': [
              '• 200B kullanıcılı bir SaaS ürünü için Figma\'da uçtan uca kullanıcı deneyimleri tasarlayarak görev tamamlama süresini %35 azalttı',
              '• 50\'den fazla katılımcıyla kullanılabilirlik testi oturumları düzenleyerek, içgörüleri eyleme geçirilebilir tasarım yinelemelerine dönüştürdü',
              '• 80\'den fazla yeniden kullanılabilir bileşene sahip ölçeklenebilir bir tasarım sistemi kurarak tasarımdan teslime kadar geçen süreyi %40 azalttı',
              '• Mükemmel piksel arayüzleri sunmak için ürün ve mühendislikle ortaklık kurdu, 4.8/5 kullanıcı memnuniyet puanı elde etti',
            ],
            'Veri Analisti': [
              '• Tableau ve Power BI\'da 15\'ten fazla yönetici panosu oluşturup korudu, temel iş KPI\'larına gerçek zamanlı görünürlük sağladı',
              '• 10M+ satırlık veri kümelerinde karmaşık SQL sorguları yazarak, rapor oluşturma süresini 6 saatten 20 dakikanın altına düşürdü',
              '• Kohort analizi ve kayıp tahmini modellemesi yoluyla 1.2 milyon dolarlık maliyet tasarrufu fırsatlarını belirledi',
              '• Teknik bulguları net iş önerilerine dönüştürerek, her ay üst düzey paydaşlara veri analizleri sundu',
            ],
            'Pazarlama Yöneticisi': [
              '• Veriye dayalı içerik stratejisi ve A/B testli yayınlama ritmi ile LinkedIn ve Instagram takipçi sayısını 6 ayda %340 artırdı',
              '• Ayda 30\'dan fazla yüksek performanslı içerik üreterek organik web sitesi trafiğinde yıldan yıla %65 artış sağladı',
              '• Google ve Meta\'da 80 bin dolarlık aylık ücretli kampanya bütçesini yönetti, ortalama 4.2x ROAS elde etti',
              '• Hedefli potansiyel müşteri oluşturma kampanyaları ve otomatik besleme dizileri aracılığıyla e-posta abone listesini 5 binden 28 bine çıkardı',
            ],
          },
          tips: [
            'Etkinizi ölçmek için sayılar ve yüzdeler kullanın',
            'Her bir maddeye güçlü bir eylem fiili ile başlayın',
            'Sadece etkinliklere değil, sonuçlara odaklanın',
            'Maddeleri kısa tutun — en fazla 1-2 satır',
            'Dili iş tanımı anahtar kelimeleriyle eşleşecek şekilde uyarlayın',
          ]
        };
      case 'en':
      default:
        return {
          examples: [
            { label: 'Software Engineer', input: 'worked on backend stuff, fixed bugs, helped with deployment, wrote some tests', jobTitle: 'Senior Software Engineer' },
            { label: 'Product Manager', input: 'managed product roadmap, talked to customers, worked with engineering team, launched features', jobTitle: 'Product Manager' },
            { label: 'Designer', input: 'made designs, worked with figma, did user research, improved app look', jobTitle: 'UX Designer' },
            { label: 'Data Analyst', input: 'analyzed data, made dashboards, wrote sql queries, presented findings to team', jobTitle: 'Data Analyst' },
            { label: 'Marketing', input: 'ran social media, wrote content, managed campaigns, grew follower count', jobTitle: 'Marketing Manager' },
          ],
          aiOutputs: {
            'Senior Software Engineer': [
              '• Architected and maintained scalable backend services handling 50K+ daily requests using Node.js and PostgreSQL',
              '• Reduced critical bug backlog by 78% through systematic root-cause analysis and implementation of automated regression testing suite',
              '• Streamlined CI/CD pipeline deployment process, cutting average release cycle from 4 hours to 45 minutes',
              '• Achieved 94% test coverage across core modules by authoring 200+ unit and integration tests with Jest',
            ],
            'Product Manager': [
              '• Defined and executed product roadmap across 3 quarters, delivering 12 high-impact features on time and within budget',
              '• Conducted 40+ customer discovery interviews to identify pain points, directly informing a redesign that improved NPS by 22 points',
              '• Collaborated cross-functionally with engineering, design, and data teams to ship a flagship feature adopted by 85% of active users',
              '• Prioritized feature backlog using RICE scoring framework, increasing team velocity by 30% quarter-over-quarter',
            ],
            'UX Designer': [
              '• Designed end-to-end user experiences in Figma for a 200K-user SaaS product, reducing task completion time by 35%',
              '• Conducted usability testing sessions with 50+ participants, translating insights into actionable design iterations',
              '• Established a scalable design system with 80+ reusable components, cutting design-to-handoff time by 40%',
              '• Partnered with product and engineering to deliver pixel-perfect interfaces, achieving a 4.8/5 user satisfaction score',
            ],
            'Data Analyst': [
              '• Built and maintained 15+ executive dashboards in Tableau and Power BI, enabling real-time visibility into key business KPIs',
              '• Authored complex SQL queries across 10M+ row datasets, reducing report generation time from 6 hours to under 20 minutes',
              '• Identified $1.2M in cost-saving opportunities through cohort analysis and churn prediction modeling',
              '• Presented monthly data insights to C-suite stakeholders, translating technical findings into clear business recommendations',
            ],
            'Marketing Manager': [
              '• Grew LinkedIn and Instagram following by 340% in 6 months through data-driven content strategy and A/B tested posting cadence',
              '• Produced 30+ high-performing pieces of content per month, driving a 65% increase in organic website traffic year-over-year',
              '• Managed $80K monthly paid campaign budget across Google and Meta, achieving a 4.2x average ROAS',
              '• Scaled email subscriber list from 5K to 28K through targeted lead-generation campaigns and automated nurture sequences',
            ],
          },
          tips: [
            'Use numbers and percentages to quantify your impact',
            'Start each bullet with a strong action verb',
            'Focus on outcomes, not just activities',
            'Keep bullets concise — 1-2 lines maximum',
            'Tailor language to match the job description keywords',
          ]
        };
    }
  };

  const { examples, aiOutputs, tips } = getLocalizedData();
  const [input, setInput] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [output, setOutput] = useState<string[]>([]);
  const [displayedOutput, setDisplayedOutput] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [activeExample, setActiveExample] = useState<number | null>(null);
  const [streamIndex, setStreamIndex] = useState(0);
  const [showPaywall, setShowPaywall] = useState(false);

  const { isPremium } = useSubscription();

  const handleImprove = async () => {
    if (!input.trim()) return;

    // Use secure server-provided subscription state instead of localStorage hack
    if (!isPremium) {
      setShowPaywall(true);
      return;
    }

    setIsLoading(true);
    setOutput([]);
    setDisplayedOutput([]);
    setStreamIndex(0);
    
    await new Promise(r => setTimeout(r, 1400));
    
    const key = Object.keys(aiOutputs).find(k => jobTitle.toLowerCase().includes(k.toLowerCase().split(' ').pop() ?? '')) ?? Object.keys(aiOutputs)[0];
    const bullets = (aiOutputs as unknown as Record<string, string[]>)[key] ?? (aiOutputs as unknown as Record<string, string[]>)[Object.keys(aiOutputs)[0]];
    setOutput(bullets);
    setIsLoading(false);
  };

  useEffect(() => {
    if (output.length > 0 && streamIndex < output.length) {
      const timer = setTimeout(() => {
        setDisplayedOutput(prev => [...prev, output[streamIndex]]);
        setStreamIndex(prev => prev + 1);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [output, streamIndex]);

  const handleCopy = () => {
    navigator.clipboard.writeText(displayedOutput.join('\n'));
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleExample = (idx: number) => {
    setActiveExample(idx);
    setInput(examples[idx].input);
    setJobTitle(examples[idx].jobTitle);
    setOutput([]);
    setDisplayedOutput([]);
  };

  const wordCount = input.trim().split(/\s+/).filter(Boolean).length;

  return (
    <div className="pb-20">
      <PaywallModal isOpen={showPaywall} onClose={() => setShowPaywall(false)} />
      {/* Hero */}
      <div className="relative overflow-hidden border-b border-border">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/4 top-0 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
          <div className="absolute right-1/4 bottom-0 h-72 w-72 rounded-full bg-blue-600/10 blur-3xl" />
        </div>
        <div className="relative mx-auto max-w-7xl px-6 py-12 sm:px-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/20 to-sky-500/10 border border-primary/30">
              <Brain className="h-6 w-6 text-primary" />
            </div>
            <div>
              <div className="text-xs font-semibold uppercase tracking-widest text-primary">{t.aiFeature}</div>
              <h1 className="text-2xl font-bold text-foreground">{t.aiWritingTitle}</h1>
            </div>
          </div>
          <p className="text-foreground-secondary max-w-2xl">{t.aiWritingDesc}</p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-10 sm:px-8">
        {/* Example presets */}
        <div className="mb-8">
          <p className="text-xs font-semibold uppercase tracking-widest text-foreground-secondary mb-3">{t.tryExample}</p>
          <div className="flex flex-wrap gap-2">
            {examples.map((ex, i) => (
              <button
                key={ex.label}
                onClick={() => handleExample(i)}
                className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-all ${
                  activeExample === i
                    ? 'border-primary/60 bg-primary/15 text-primary'
                    : 'border-border bg-surface text-foreground-secondary hover:border-border hover:text-foreground'
                }`}
              >
                {ex.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-[1.2fr_1.5fr_300px]">
          {/* Input */}
          <div className="space-y-4">
            <div className="rounded-2xl border border-border bg-surface-elevated p-5 backdrop-blur-sm">
              <label className="mb-2 block text-sm font-semibold text-foreground">{t.jobTitle}</label>
              <input
                value={jobTitle}
                onChange={e => setJobTitle(e.target.value)}
                placeholder="e.g. Senior Software Engineer"
                className="w-full rounded-xl border border-border bg-surface-elevated px-4 py-2.5 text-sm text-foreground placeholder-slate-500 focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/30"
              />
            </div>
            <div className="rounded-2xl border border-border bg-surface-elevated p-5 backdrop-blur-sm">
              <div className="mb-2 flex items-center justify-between">
                <label className="text-sm font-semibold text-foreground">{t.roughNotes}</label>
                <span className="text-xs text-foreground-secondary">{wordCount} {t.words}</span>
              </div>
              <textarea
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder="Paste your rough experience notes here... e.g. 'worked on backend, fixed bugs, helped with deployments'"
                rows={8}
                className="w-full resize-none rounded-xl border border-border bg-surface-elevated px-4 py-3 text-sm text-foreground placeholder-slate-500 focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/30"
              />
              <div className="mt-3 flex gap-2">
                <button
                  onClick={handleImprove}
                  disabled={!input.trim() || isLoading}
                  className="premium-button flex flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-primary to-blue-600 py-2.5 text-sm font-semibold text-foreground shadow-lg shadow-primary/30 hover:from-primary hover:to-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  {isLoading ? (
                    <span className="flex items-center gap-2"><RefreshCw className="h-4 w-4 animate-spin" /> {t.improving}</span>
                  ) : (
                    <span className="flex items-center gap-2"><Sparkles className="h-4 w-4" /> {t.improveWithAI}</span>
                  )}
                </button>
                <button
                  onClick={() => { setInput(''); setOutput([]); setDisplayedOutput([]); setActiveExample(null); }}
                  className="rounded-xl border border-border px-4 py-2.5 text-sm text-foreground-secondary hover:border-border hover:text-foreground transition-colors"
                >
                  {t.clear}
                </button>
              </div>
            </div>
          </div>

          {/* Output */}
          <div className="rounded-2xl border border-border bg-surface-elevated p-5 backdrop-blur-sm">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Zap className="h-4 w-4 text-primary" />
                <span className="text-sm font-semibold text-foreground">{t.aiOutput}</span>
                {displayedOutput.length > 0 && (
                  <span className="rounded-full bg-emerald-500/15 px-2 py-0.5 text-xs font-semibold text-emerald-400">{t.stronger}</span>
                )}
              </div>
              {displayedOutput.length > 0 && (
                <button onClick={handleCopy} className="flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-xs text-foreground-secondary hover:border-border hover:text-foreground transition-colors">
                  {isCopied ? <span className="flex items-center gap-1.5"><Check className="h-3.5 w-3.5 text-emerald-400" /> {t.copied}</span> : <span className="flex items-center gap-1.5"><Copy className="h-3.5 w-3.5" /> {t.copy}</span>}
                </button>
              )}
            </div>

            {isLoading && (
              <div className="flex flex-col gap-3">
                {[1,2,3,4].map(i => (
                  <div key={i} className="h-12 animate-pulse rounded-xl bg-surface-elevated" style={{ width: `${85 - i * 5}%` }} />
                ))}
              </div>
            )}

            {!isLoading && displayedOutput.length === 0 && (
              <div className="flex h-48 flex-col items-center justify-center gap-3 text-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-border bg-surface-elevated">
                  <Brain className="h-7 w-7 text-foreground-secondary" />
                </div>
                <p className="text-sm text-foreground-secondary">{t.outputPlaceholder}</p>
              </div>
            )}

            <AnimatePresence>
              {displayedOutput.map((bullet, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4 }}
                  className="mb-3 rounded-xl border border-emerald-400/15 bg-emerald-400/5 p-4 text-sm leading-7 text-foreground"
                >
                  {bullet}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Tips sidebar */}
          <div className="rounded-2xl border border-border bg-surface-elevated p-5 backdrop-blur-sm">
            <div className="mb-4 flex items-center gap-2">
              <Lightbulb className="h-4 w-4 text-yellow-400" />
              <span className="text-sm font-semibold text-foreground">{t.writingTips}</span>
            </div>
            <div className="space-y-3">
              {tips.map((tip, i) => (
                <div key={i} className="flex gap-2.5">
                  <ChevronRight className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-primary" />
                  <p className="text-xs leading-5 text-foreground-secondary">{tip}</p>
                </div>
              ))}
            </div>
            <div className="mt-6 rounded-xl border border-primary/20 bg-primary/5 p-4">
              <p className="text-xs font-semibold text-primary mb-1">{t.proTip}</p>
              <p className="text-xs text-foreground-secondary leading-5">{t.proTipText}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
