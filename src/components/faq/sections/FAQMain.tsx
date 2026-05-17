"use client";

import { Collapse, Row, Col } from "antd";
import { useLocale, useTranslations } from "next-intl";
import { FiChevronDown } from "react-icons/fi";

const { Panel } = Collapse;

export const FAQMain = () => {
    const t = useTranslations("faq");
    const tp = useTranslations("privacyAndTerms");
    const locale = useLocale();
    const isEnglish = locale === "en";

    const faqItems = [
        {
            question: isEnglish
                ? "How can I create an account in Al-Tai Club Store?"
                : "كيف يمكنني إنشاء حساب في متجر نادي الطائي؟",
            answer: isEnglish
                ? "You can easily create an account by registering on the website or application using your email or phone number, and entering your basic personal information such as name and address. After registering, you will be able to track orders and benefit from special offers."
                : "يمكنك إنشاء حساب بسهولة عن طريق التسجيل في الموقع أو التطبيق باستخدام بريدك الإلكتروني أو رقم الهاتف، وإدخال بياناتك الشخصية الأساسية مثل الاسم والعنوان. بعد التسجيل، ستتمكن من تتبع الطلبات والاستفادة من العروض الخاصة.",
        },
        {
            question: isEnglish ? "How can I place an order?" : "كيف يمكنني تقديم طلب شراء؟",
            answer: isEnglish
                ? "Choose the product you want to buy, add it to your shopping cart, and choose your preferred payment method. After confirming the order, you will receive a confirmation message with the order number."
                : "اختر المنتج الذي ترغب بشرائه، أضفه إلى سلة التسوق، واختر طريقة الدفع المفضلة. بعد تأكيد الطلب، ستتلقى رسالة تأكيد مع رقم الطلب.",
        },
        {
            question: isEnglish ? "What are the available payment methods?" : "ما هي طرق الدفع المتاحة؟",
            answer: isEnglish
                ? "Electronic payment via credit or debit cards (Mada, Visa, MasterCard)."
                : "الدفع الإلكتروني عبر بطاقة الائتمان أو الخصم (مدى، فيزا، ماستركارد).",
        },
        {
            question: isEnglish ? "How can I track my order?" : "كيف يمكنني تتبع طلبي؟",
            answer: isEnglish
                ? "After confirming the order, you can track its status via your account on the website or application using the order number. You will also receive notifications of the shipping and delivery status."
                : "بعد تأكيد الطلب، يمكنك تتبع حالته عبر حسابك في الموقع أو التطبيق باستخدام رقم الطلب. ستصلك أيضًا إشعارات بحالة الشحن والتوصيل.",
        },
        {
            question: isEnglish
                ? "What is the return and exchange policy?"
                : "ما هي سياسة الاسترجاع والاستبدال؟",
            answer: isEnglish
                ? "You can return or exchange products within 7 days of receiving them, provided they are in their original condition and unused, with all original tags and packaging. Some products may be non-returnable or non-exchangeable, and this will be clarified when displaying the product."
                : "يمكنك استرجاع أو استبدال المنتجات خلال 7 أيام من استلامها، بشرط أن تكون في حالتها الأصلية وغير مستخدمة، مع جميع الملصقات والتغليف الأصلي. بعض المنتجات قد تكون غير قابلة للاسترجاع أو الاستبدال، وسيتم توضيح ذلك عند عرض المنتج.",
        },
        {
            question: isEnglish
                ? "Can I order a product with special specifications?"
                : "هل يمكنني طلب منتج بمواصفات خاصة؟",
            answer: isEnglish
                ? "Yes, you can order customized products such as a T-shirt printed with a player's name or a specific number, but these products are non-returnable or non-exchangeable except in the case of a manufacturing defect."
                : "نعم، يمكنك طلب منتجات مخصصة مثل تيشيرت مطبوع باسم لاعب أو رقم معين، لكن هذه المنتجات غير قابلة للاسترجاع أو الاستبدال إلا في حالة وجود عيب صناعي.",
        },
        {
            question: isEnglish
                ? "How can I contact customer service?"
                : "كيف يمكنني التواصل مع خدمة العملاء؟",
            answer: isEnglish
                ? "You can contact us via:\n• Email: support@altaistore.sa\n• WhatsApp: +966550312177\n• 'Contact Us' form on the website or application"
                : "يمكنك التواصل معنا عبر:\n• البريد الإلكتروني : support@altaistore.sa\n• واتساب : 966550312177+\n• نموذج \"تواصل معنا\" في الموقع أو التطبيق",
        },
        {
            question: isEnglish
                ? "Are orders shipped to all regions of the Kingdom and abroad?"
                : "هل يتم شحن الطلبات لجميع مناطق المملكة وخارجها؟",
            answer: isEnglish
                ? "Yes, we provide shipping service inside and outside the Kingdom, with the possibility of following the shipment via the application or website."
                : "نعم، نوفر خدمة الشحن داخل المملكة وخارجها، مع إمكانية متابعة الشحنة عبر التطبيق أو الموقع.",
        },
        {
            question: isEnglish
                ? "Are there offers or advantages for membership?"
                : "هل هناك عروض أو مزايا للعضوية؟",
            answer: isEnglish
                ? "Yes, when registering for membership, you can get exclusive benefits, loyalty points, and special offers for club members."
                : "نعم، عند التسجيل في العضوية، يمكنك الحصول على مزايا حصرية، نقاط ولاء، وعروض خاصة لأعضاء النادي.",
        },
        {
            question: isEnglish
                ? "What do I do if the product arrives damaged or defective?"
                : "ماذا أفعل إذا وصل المنتج معي تالف أو معيب؟",
            answer: isEnglish
                ? "In the case of receiving a damaged or defective product, please contact customer service immediately to submit a return or exchange request according to the store's policy terms."
                : "في حال استلام منتج تالف أو معيب، يرجى التواصل فورًا مع خدمة العملاء لتقديم طلب الاسترجاع أو الاستبدال وفق شروط سياسة المتجر.",
        },
    ];

    const shippingInfo = [
        {
            title: isEnglish ? "Delivery Areas" : "مناطق التوصيل",
            content: isEnglish
                ? [
                    "Inside Saudi Arabia: Delivery is available to all regions of the Kingdom.",
                    "Outside the Kingdom: Products can be shipped to specific countries, which will be clarified upon completing the order.",
                ]
                : [
                    "داخل المملكة العربية السعودية: التوصيل متاح لجميع مناطق المملكة.",
                    "خارج المملكة: يمكن شحن المنتجات إلى دول محددة، وسيتم توضيح ذلك عند إتمام الطلب.",
                ],
        },
        {
            title: isEnglish ? "Delivery Times" : "أوقات التوصيل",
            content: isEnglish
                ? [
                    "Orders are usually prepared within 24-48 hours of payment confirmation.",
                    "Delivery time depends on the customer's geographical location:",
                    "• Major Cities: 2-3 business days",
                    "• Remote Areas: 4-7 business days",
                    "• International Shipping: Depending on the shipment destination and chosen shipping method",
                ]
                : [
                    "عادةً يتم تجهيز الطلبات خلال 24-48 ساعة من تأكيد الدفع.",
                    "مدة التوصيل تعتمد على الموقع الجغرافي للعميل:",
                    "• المدن الكبرى: 2-3 أيام عمل",
                    "• المناطق النائية: 4-7 أيام عمل",
                    "• الشحن الدولي: حسب وجهة الشحنة والشحن المختار",
                ],
        },
        {
            title: isEnglish ? "Shipping Fees" : "رسوم الشحن",
            content: isEnglish
                ? [
                    "Shipping fees vary depending on order size and geographical area.",
                    "Shipping fees are displayed when completing the order before payment confirmation.",
                    "Free shipping offers may be available for orders exceeding a certain amount and will be announced within special offers.",
                ]
                : [
                    "تختلف رسوم الشحن حسب حجم الطلب والمنطقة الجغرافية.",
                    "يتم عرض رسوم الشحن عند إتمام الطلب قبل تأكيد الدفع.",
                    "قد تتوفر عروض شحن مجاني للطلبات التي تتجاوز مبلغًا معينًا، وسيتم الإعلان عنها ضمن العروض الخاصة.",
                ],
        },
        {
            title: isEnglish ? "Order Tracking" : "تتبع الطلب",
            content: isEnglish
                ? [
                    "After confirming the order, you can follow the status of your shipment directly via the application or website using the order number.",
                    "You will receive automatic notifications when the order is prepared, shipped, and arrives at the specified address.",
                ]
                : [
                    "بعد تأكيد الطلب، يمكنك متابعة حالة شحنتك مباشرة عبر التطبيق أو الموقع باستخدام رقم الطلب.",
                    "ستصلك إشعارات تلقائية عند تحضير الطلب وشحنه ووصوله للعنوان المحدد.",
                ],
        },
        {
            title: isEnglish ? "Receipt Procedures" : "إجراءات الإستلام",
            content: isEnglish
                ? [
                    "Please ensure that the product is received in good condition and sign upon receipt.",
                    "In case of any damage or shortage in the product, customer service must be contacted immediately to file a complaint according to the Return and Exchange Policy.",
                ]
                : [
                    "يرجى التأكد من استلام المنتج في حالة سليمة والتوقيع عند الاستلام.",
                    "في حال وجود أي تلف أو نقص في المنتج، يجب التواصل فورًا مع خدمة العملاء لتقديم شكوى وفق سياسة الاسترجاع والاستبدال.",
                ],
        },
        {
            title: isEnglish ? "Important Notes" : "ملاحظات مهمة",
            content: isEnglish
                ? [
                    "Some orders may be delayed during peak times or public holidays, and customers will be contacted in case of any delay.",
                    "We are keen to deliver all orders in a safe and fast manner, and we adhere to packaging quality standards to protect products during shipping.",
                ]
                : [
                    "قد تتأخر بعض الطلبات في أوقات الذروة أو خلال العطلات الرسمية، وسيتم التواصل مع العملاء في حال أي تأخير.",
                    "نحرص على توصيل جميع الطلبات بطريقة آمنة وسريعة، ونلتزم بمعايير جودة التغليف لحماية المنتجات أثناء الشحن.",
                ],
        },
    ];

    return (
        <div className="faq-section py-24">
            <div className="container">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold mb-6">{tp("faqTitle")}</h1>
                    <p className="text-gray-500 text-lg max-w-2xl mx-auto">
                        {t("generalInstructions")}
                    </p>
                </div>

                <Row gutter={[40, 40]}>
                    <Col span={24} lg={12}>
                        <div className="mb-12">
                            <h2 className="text-2xl font-bold mb-8 pb-4 border-b border-gray-100 flex items-center gap-3">
                                <span className="w-2 h-8 bg-primary rounded-full"></span>
                                {t("categories.general")}
                            </h2>
                            <Collapse
                                accordion
                                expandIcon={({ isActive }) => (
                                    <FiChevronDown
                                        className={`text-xl transition-transform duration-300 ${isActive ? "rotate-180 text-primary" : "text-gray-400"
                                            }`}
                                    />
                                )}
                                expandIconPosition="end"
                                className="bg-transparent border-none space-y-4"
                            >
                                {faqItems.map((item, index) => (
                                    <Panel
                                        header={
                                            <span className="text-lg font-medium text-gray-900 leading-tight">
                                                {item.question}
                                            </span>
                                        }
                                        key={index}
                                        className="bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
                                    >
                                        <div className="text-gray-600 leading-relaxed whitespace-pre-line px-2 pb-2">
                                            {item.answer}
                                        </div>
                                    </Panel>
                                ))}
                            </Collapse>
                        </div>
                    </Col>

                    <Col span={24} lg={12}>
                        <div>
                            <h2 className="text-2xl font-bold mb-8 pb-4 border-b border-gray-100 flex items-center gap-3">
                                <span className="w-2 h-8 bg-primary rounded-full"></span>
                                {t("categories.shipping")}
                            </h2>
                            <div className="space-y-8">
                                {shippingInfo.map((info, index) => (
                                    <div key={index} className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
                                        <h3 className="text-xl font-bold mb-4 text-primary">{info.title}</h3>
                                        <ul className="space-y-3">
                                            {info.content.map((line, idx) => (
                                                <li key={idx} className="text-gray-600 flex items-start gap-2">
                                                    <span className="text-primary mt-1.5 flex-shrink-0 w-1.5 h-1.5 rounded-full bg-primary/30"></span>
                                                    <span>{line}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </Col>
                </Row>
            </div>
        </div>
    );
};
