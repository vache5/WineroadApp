"use client";

import { useMemo } from "react";
import { useParams } from "next/navigation";

type PolicySection = {
  title: string;
  content: string[];
};

const englishSections: PolicySection[] = [
  {
    title: "1. General Provisions",
    content: [
      "This Privacy Policy describes how Wineroad.am (hereinafter - \"we\", \"our\", or \"the Agency\") collects, uses, and protects information about our website users when booking wine tours in Armenia and Yerevan.",
    ],
  },
  {
    title: "2. Information We Collect",
    content: [
      "We collect data necessary to organize your travel:",
      "Personal Data: First name, last name, date of birth (to verify 18+ age for tastings).",
      "Contact Information: Phone number, email address, messaging app handles.",
      "Travel Data: Passport number (required by certain wineries and hotels), information about food allergies or preferences.",
      "Technical Data: IP address and cookies. We use cookies to improve website performance and analyze user preferences to offer the most suitable wine itineraries.",
    ],
  },
  {
    title: "3. Purposes of Data Collection",
    content: [
      "Your data is used exclusively for:",
      "Booking visits to wineries and tasting rooms.",
      "Arranging transfers and accommodation.",
      "Communicating with you to confirm itineraries.",
      "Newsletters regarding new routes (only with your explicit consent).",
      "Marketing: Use of photo and video materials featuring clients taken during the tour for publication on the Agency's social media and website (unless you explicitly object).",
    ],
  },
  {
    title: "4. Third-Party Data Transfer",
    content: [
      "We share your data only with partners essential to the execution of your tour:",
      "Wineries and tasting halls for visit registration.",
      "Hotels and transport companies.",
      "Government authorities (only if required by the legislation of the Republic of Armenia).",
      "Important: We never sell your personal information to third parties.",
    ],
  },
  {
    title: "5. Data Retention Period",
    content: [
      "We store your data for the period necessary to provide the service and fulfill the requirements of the Armenian tax legislation.",
    ],
  },
  {
    title: "6. Your Rights",
    content: [
      "You have the right to:",
      "Request a copy of your data held by us.",
      "Request the correction or deletion of your data.",
      "Withdraw your consent for data processing at any time.",
    ],
  },
  {
    title: "7. Contacts",
    content: [
      "If you have questions regarding your privacy, please contact us:",
      "Email: contact@wineroad.am",
      "Phone/WhatsApp: +374 44 499441",
      "Address: Yerevan, Armenia.",
    ],
  },
];

const armenianSections: PolicySection[] = [
  {
    title: "1. Ընդհանուր դրույթներ",
    content: [
      "Սույն Գաղտնիության քաղաքականությունը նկարագրում է, թե ինչպես է Wineroad.am-ը (այսուհետ` «մենք», «մեր» կամ «Գործակալություն») հավաքագրում, օգտագործում և պաշտպանում մեր կայքի օգտատերերի մասին տեղեկատվությունը Հայաստանում և Երևանում գինու տուրեր ամրագրելիս:",
    ],
  },
  {
    title: "2. Ինչ տեղեկատվություն ենք մենք հավաքագրում",
    content: [
      "Մենք հավաքագրում ենք Ձեր ճամփորդության կազմակերպման համար անհրաժեշտ տվյալները.",
      "Անձնական տվյալներ. Անուն, ազգանուն, ծննդյան ամսաթիվ (համտեսների համար 18+ տարիքը հաստատելու նպատակով):",
      "Կոնտակտային տվյալներ. Հեռախոսահամար, էլեկտրոնային փոստի հասցե, մեսենջերների տվյալներ:",
      "Ճամփորդական տվյալներ. Անձնագրի համար (պահանջվում է որոշ գինեգործարանների և հյուրանոցների կողմից), տեղեկատվություն սննդային ալերգիաների կամ նախասիրությունների մասի:",
      "Տեխնիկական տվյալներ. IP հասցե և քուքի (cookies) ֆայլեր: Մենք օգտագործում ենք քուքիները կայքի աշխատանքը բարելավելու և օգտատերերի նախասիրությունները վերլուծելու համար` Ձեզ առավել համապատասխան գինու երթուղիներ առաջարկելու նպատակով:",
    ],
  },
  {
    title: "3. Տվյալների հավաքագրման նպատակները",
    content: [
      "Ձեր տվյալներն օգտագործվում են բացառապես հետևյալի համար.",
      "Գինեգործարաններ և համտեսի սրահներ այցելությունների ամրագրում:",
      "Տրանսֆերի և կացության կազմակերպում:",
      "Ձեզ հետ կապի հաստատում երթուղիները հաստատելու համար:",
      "Նոր երթուղիների մասին տեղեկությունների ուղարկում (միայն Ձեր համաձայնությամբ):",
      "Մարքեթինգ. Տուրի ընթացքում արված հաճախորդների լուսանկարների և տեսանյութերի օգտագործում Գործակալության սոցիալական էջերում և կայքում հրապարակելու համար (բացառությամբ այն դեպքերի, երբ Դուք հստակ դեմ եք արտահայտվում):",
    ],
  },
];

const russianSections: PolicySection[] = [
  {
    title: "1. Общие положения",
    content: [
      "Настоящая Политика конфиденциальности описывает, как Wineroad.am (далее именуемая «мы», «наш» или «Агентство») собирает, использует и защищает информацию о пользователях нашего веб-сайта при бронировании винных туров в Армении и Ереване.",
    ],
  },
  {
    title: "2. Какую информацию мы собираем",
    content: [
      "Мы собираем данные, необходимые для организации вашей поездки.",
      "Персональные данные: Имя, фамилия, дата рождения (для подтверждения возраста 18+ для дегустаций).",
      "Контактные данные: Номер телефона, адрес электронной почты, данные мессенджера.",
      "Данные о поездке: Номер паспорта (требуется некоторыми винодельнями и отелями), информация о пищевых аллергиях или предпочтениях.",
      "Технические данные: IP-адрес и файлы cookie. Мы используем файлы cookie для улучшения работы веб-сайта и анализа предпочтений пользователей, чтобы предлагать вам наиболее подходящие винные туры.",
    ],
  },
  {
    title: "3. Цели сбора данных",
    content: [
      "Ваши данные используются исключительно для следующих целей:",
      "Бронирование посещений виноделен и дегустационных залов.",
      "Организация трансферов и проживания.",
      "Свяжемся с вами для подтверждения маршрутов.",
      "Отправим информацию о новых маршрутах (только с вашего согласия).",
      "Маркетинг: Использование фотографий и видеозаписей клиентов, сделанных во время тура, для публикации на страницах агентства в социальных сетях и на веб-сайте (если вы прямо не возражаете).",
    ],
  },
];

export default function TermsPage() {
  const params = useParams();
  const locale = (params?.locale as string) ?? "en";
  const isArmenian = locale === "am";
  const isRussian = locale === "ru";

  const sections = useMemo(() => {
    if (isArmenian) return armenianSections;
    if (isRussian) return russianSections;
    return englishSections;
  }, [isArmenian, isRussian]);

  const heading = isArmenian
    ? "Գաղտնիության քաղաքականություն Wineroad.am"
    : isRussian
      ? "Политика конфиденциальности Wineroad.am"
      : "Privacy Policy for Wineroad.am";
  const updated = isArmenian
    ? "Վերջին թարմացումը` 30.03.2026"
    : isRussian
      ? "Последнее обновление: 30.03.2026"
      : "Last updated: 30.03.2026";

  return (
    <div className="min-h-screen bg-[#120D0C] text-[#F5EBDD]">
      <section className="border-b border-[#D4A755]/25 bg-gradient-to-b from-[#201513] to-[#120D0C]">
        <div className="mx-auto max-w-6xl px-4 py-14 md:px-8 md:py-20">
          <div className="mx-auto max-w-4xl text-center">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-[#D4A755]">
              Wineroad
            </p>
            <h1 className="font-playfair text-3xl font-bold leading-tight text-white sm:text-5xl">
              {heading}
            </h1>
            <p className="mt-4 text-sm text-[#E5D8C2]/80">{updated}</p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-10 md:px-8 md:py-14">
        <div className="grid gap-5 md:gap-6">
          {sections.map((section) => (
            <article
              key={section.title}
              className="rounded-2xl border border-[#D4A755]/20 bg-[#1A1210]/80 p-5 shadow-[0_10px_30px_rgba(0,0,0,0.22)] backdrop-blur-sm md:p-7"
            >
              <h2 className="font-playfair text-xl font-semibold text-[#F8EEDB] md:text-2xl">
                {section.title}
              </h2>
              <div className="mt-4 space-y-3">
                {section.content.map((line, index) => (
                  <p
                    key={`${section.title}-${index}`}
                    className={`leading-relaxed text-[#E7DCC8]/90 ${index > 0 ? "text-sm md:text-base" : "text-base md:text-lg"}`}
                  >
                    {line}
                  </p>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
