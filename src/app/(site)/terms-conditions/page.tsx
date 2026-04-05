"use client";

import { useMemo } from "react";
import { usePathname } from "next/navigation";

import { defaultLocale, locales } from "@/i18n/config";
import type { Locale } from "@/i18n/config";

type TermsSection = {
  title: string;
  /** Intro or standalone paragraphs (no bullet). */
  paragraphs?: string[];
  bullets?: string[];
};

const englishSections: TermsSection[] = [
  {
    title: "1. Booking & Payment",
    bullets: [
      "Full (100%) prepayment is required at the time of booking to confirm participation in any Wineroad.am tour.",
      "A booking is considered confirmed only after receiving an electronic voucher or confirmation via email/messenger.",
      "All prices are quoted in AMD and include taxes.",
    ],
  },
  {
    title: "2. Cancellation & Refund Policy",
    bullets: [
      "Cancellation more than 3 days (72 hours) before the tour starts: full refund (minus bank commissions).",
      "Cancellation less than 3 days (72 hours) before the tour starts: the paid amount is non-refundable.",
      "In the event of a client's failure to appear at the designated starting point at the appointed time (No-show), the tour shall be cancelled without any refund.",
    ],
  },
  {
    title: "3. Punctuality and Waiting Time",
    paragraphs: [
      "The waiting time for late participants is 15 minutes. After this period, the tour begins as scheduled. Any costs incurred to catch up with the group are the sole responsibility of the client.",
    ],
  },
  {
    title: "4. Itinerary Changes",
    bullets: [
      "We reserve the right to change the order of visits or replace wineries with equivalent ones in case of force majeure (road closures, technical works, weather conditions).",
      "If a tour is cancelled due to the Agency's fault, an alternative date or a 100% refund will be offered.",
    ],
  },
  {
    title: "5. Restrictions and Documentation",
    bullets: [
      "Participation in tastings is strictly permitted for persons over 18 years of age.",
      'IMPORTANT: An original passport is mandatory for visiting the "ARARAT" factory. Entry is impossible without it (no refund will be provided).',
      "The client is required to notify the Agency of any food allergies in advance.",
    ],
  },
  {
    title: "6. Conduct and Safety",
    bullets: [
      "The Agency reserves the right to terminate the tour for any client displaying inappropriate behavior without a refund.",
      "The client bears financial liability for any damage to the property of the Agency or its partners.",
    ],
  },
  {
    title: "7. Force Majeure",
    paragraphs: [
      "The parties shall be released from liability in the event of circumstances beyond their reasonable control (force majeure).",
    ],
  },
];

const russianSections: TermsSection[] = [
  {
    title: "1. Бронирование и Оплата",
    bullets: [
      "Для подтверждения участия в любом туре Wineroad.am требуется полная (100%) предоплата в момент бронирования.",
      "Бронирование считается подтвержденным только после получения электронного ваучера или подтверждения на email/мессенджер.",
      "Все цены указаны в AMD и включают налоги.",
    ],
  },
  {
    title: "2. Политика отмены и возврата",
    bullets: [
      "Отмена более чем за 3 дня (72 часа) до начала тура: полный возврат средств (за вычетом банковских комиссий).",
      "Отмена менее чем за 3 дня (72 часа) до начала тура: оплаченная сумма не возвращается.",
      "В случае неявки клиента к месту старта в назначенное время (No-show), тур аннулируется без возврата средств.",
    ],
  },
  {
    title: "3. Пунктуальность и ожидание",
    paragraphs: [
      "Время ожидания опоздавших участников составляет 15 минут. По истечении этого времени тур начинается по расписанию. Расходы на то, чтобы догнать группу, клиент несет самостоятельно.",
    ],
  },
  {
    title: "4. Изменения в программе",
    bullets: [
      "Мы оставляем за собой право менять порядок посещения объектов или заменять винодельни на равнозначные в случае форс-мажора (перекрытие дорог, технические работы, погода).",
      "При отмене тура по вине Агентства предлагается альтернативная дата или возврат 100% суммы.",
    ],
  },
  {
    title: "5. Ограничения и паспортный режим",
    bullets: [
      "Участие в дегустациях разрешено строго лицам старше 18 лет.",
      "ВАЖНО: Для посещения завода «АРАРАТ» наличие оригинала паспорта обязательно. Без него вход невозможен (оплата не возвращается).",
      "Клиент обязан заранее сообщить о наличии пищевых аллергий.",
    ],
  },
  {
    title: "6. Поведение и безопасность",
    bullets: [
      "Агентство вправе прервать тур для клиента при неадекватном поведении без возврата средств.",
      "Клиент несет материальную ответственность за порчу имущества Агентства или партнеров.",
    ],
  },
  {
    title: "7. Форс-мажор",
    paragraphs: [
      "Стороны освобождаются от ответственности при обстоятельствах непреодолимой силы.",
    ],
  },
];

const armenianSections: TermsSection[] = [
  {
    title: "1. Ամրագրում և վճարում",
    bullets: [
      "Wineroad.am-ի ցանկացած տուրի մասնակցությունը հաստատելու համար ամրագրման պահին անհրաժեշտ է ամբողջական (100%) կանխավճար:",
      "Ամրագրումը համարվում է հաստատված միայն էլեկտրոնային վաուչերի կամ էլեկտրոնային փոստով/մեսենջերով հաստատում ստանալուց հետո:",
      "Բոլոր գները նշված են ՀՀ դրամով (AMD) և ներառում են հարկերը:",
    ],
  },
  {
    title: "2. Չեղարկում և վերադարձ",
    bullets: [
      "Տուրի մեկնարկից ավելի քան 3 օր (72 ժամ) առաջ չեղարկման դեպքում կատարվում է գումարի ամբողջական վերադարձ (հանած բանկային միջնորդավճարները):",
      "Տուրի մեկնարկից պակաս քան 3 օր (72 ժամ) առաջ չեղարկման դեպքում վճարված գումարը վերադարձի ենթակա չէ:",
      "Հաճախորդի՝ նշված ժամին մեկնարկի վայր չներկայանալու դեպքում (No-show), տուրը չեղարկվում է առանց գումարի վերադարձի:",
    ],
  },
  {
    title: "3. Ճշտապահություն և սպասման ժամանակ",
    paragraphs: [
      "Ուշացած մասնակիցների սպասման ժամանակը 15 րոպե է: Այս ժամանակահատվածից հետո տուրը սկսվում է ըստ ժամանակացույցի: Ուշանալու դեպքում խմբին հասնելու հետ կապված ծախսերը հոգում է հաճախորդը:",
    ],
  },
  {
    title: "4. Փոփոխություններ ծրագրում",
    bullets: [
      "Մենք իրավունք ենք վերապահում փոխել այցելությունների հաջորդականությունը կամ գինեգործարանները փոխարինել համարժեքներով ֆորսմաժորային իրավիճակներում (ճանապարհների փակում, տեխնիկական աշխատանքներ, եղանակային պայմաններ):",
      "Գործակալության մեղքով տուրի չեղարկման դեպքում առաջարկվում է այլընտրանքային ամսաթիվ կամ գումարի 100% վերադարձ:",
    ],
  },
  {
    title: "5. Սահմանափակումներ և անձնագրային ռեժիմ",
    bullets: [
      "Համտեսներին մասնակցությունը թույլատրվում է խստիվ 18 տարեկանից բարձր անձանց:",
      "ԿԱՐԵՎՈՐ. «ԱՐԱՐԱՏ» գործարան այցելելու համար անձնագրի բնօրինակի առկայությունը պարտադիր է: Առանց դրա մուտքն արգելվում է (գումարը չի վերադարձվում):",
      "Հաճախորդը պարտավոր է նախապես տեղեկացնել սննդային ալերգիաների առկայության մասին:",
    ],
  },
  {
    title: "6. Վարքագիծ և անվտանգություն",
    bullets: [
      "Գործակալությունն իրավունք ունի ընդհատել տուրը ոչ պատշաճ վարքագիծ դրսևորող հաճախորդի համար՝ առանց գումարի վերադարձի:",
      "Հաճախորդը կրում է նյութական պատասխանատվություն Գործակալության կամ գործընկերների գույքին հասցված վնասի համար:",
    ],
  },
  {
    title: "7. Ֆորսմաժոր",
    paragraphs: [
      "Կողմերն ազատվում են պատասխանատվությունից անհաղթահարելի ուժի հանգամանքների դեպքում:",
    ],
  },
];

function localeFromPathname(pathname: string | null): Locale {
  const first = pathname?.split("/").filter(Boolean)[0];
  if (first && locales.includes(first as Locale)) return first as Locale;
  return defaultLocale;
}

export default function TermsConditionsPage() {
  const pathname = usePathname();
  const locale = localeFromPathname(pathname);
  const isArmenian = locale === "am";
  const isRussian = locale === "ru";

  const sections = useMemo(() => {
    if (isArmenian) return armenianSections;
    if (isRussian) return russianSections;
    return englishSections;
  }, [isArmenian, isRussian]);

  const heading = isArmenian
    ? "Ծառայությունների մատուցման պայմաններ"
    : isRussian
      ? "Условия обслуживания"
      : "Terms & Conditions";

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
              {section.paragraphs?.length ? (
                <div className="mt-4 space-y-3">
                  {section.paragraphs.map((p, i) => (
                    <p
                      key={`${section.title}-p-${i}`}
                      className="leading-relaxed text-[#E7DCC8]/90 text-base md:text-lg"
                    >
                      {p}
                    </p>
                  ))}
                </div>
              ) : null}
              {section.bullets?.length ? (
                <ul className="mt-4 list-disc space-y-3 pl-5 text-[#E7DCC8]/90 marker:text-[#D4A755]">
                  {section.bullets.map((item, i) => (
                    <li
                      key={`${section.title}-li-${i}`}
                      className="leading-relaxed text-sm md:text-base pl-1"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              ) : null}
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
