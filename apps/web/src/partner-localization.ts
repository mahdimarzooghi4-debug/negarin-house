import type { PartnerLocale } from "@negarin/i18n";

export type PartnerMessages = {
  title: string;
  description: string;
  returnLabel: string;
  navigationLabel: string;
  sectionsLabel: string;
  brandDescription: string;
  accountLabel: string;
  accountDescription: string;
  workspaceLabel: string;
  connectionInactive: string;
  shellReady: string;
  shellDescription: string;
  dataNotice: string;
  navigation: readonly string[];
};

const messages: Record<PartnerLocale, PartnerMessages> = {
  "tr-TR": {
    title: "İhracat Ortağı",
    description: "Uluslararası pazar operasyonlarınızı yönetin.",
    returnLabel: "Negarin'e dön",
    navigationLabel: "Portal gezintisi",
    sectionsLabel: "Portal bölümleri",
    brandDescription: "Sanat ve fırsat pazaryeri",
    accountLabel: "Hesap",
    accountDescription: "Giriş yaptıktan sonra görüntülenir",
    workspaceLabel: "Negarin House / Çalışma Alanı",
    connectionInactive: "Hesap bağlantısı etkin değil",
    shellReady: "Portal arayüzü hazır",
    shellDescription: "Güvenli oturum açma ve canlı veriler bağlandığında bu bölümde rolünüze özel içerik gösterilecektir.",
    dataNotice: "Bu önizlemede örnek operasyon veya finans verisi gösterilmez.",
    navigation: ["Kontrol Paneli", "Sanatçı Ağı", "İhracat Ürünleri", "Siparişler", "Sipariş Taslakları", "Raporlar", "Hesap"]
  },
  ar: {
    title: "شريك التصدير",
    description: "إدارة عمليات الأسواق الدولية.",
    returnLabel: "العودة إلى نگارین",
    navigationLabel: "التنقل في البوابة",
    sectionsLabel: "أقسام البوابة",
    brandDescription: "سوق الفن والفرص",
    accountLabel: "الحساب",
    accountDescription: "يظهر بعد تسجيل الدخول",
    workspaceLabel: "بيت نگارین / مساحة العمل",
    connectionInactive: "اتصال الحساب غير نشط",
    shellReady: "واجهة البوابة جاهزة",
    shellDescription: "سيظهر المحتوى الخاص بدورك هنا بعد ربط تسجيل الدخول الآمن والبيانات المباشرة.",
    dataNotice: "لا يعرض هذا المعاين بيانات تشغيلية أو مالية تجريبية.",
    navigation: ["لوحة التحكم", "شبكة الفنانين", "منتجات التصدير", "الطلبات", "مسودات الطلبات", "التقارير", "الحساب"]
  },
  ru: {
    title: "Партнёр по экспорту",
    description: "Управление операциями на международных рынках.",
    returnLabel: "Вернуться в Negarin",
    navigationLabel: "Навигация портала",
    sectionsLabel: "Разделы портала",
    brandDescription: "Площадка искусства и возможностей",
    accountLabel: "Аккаунт",
    accountDescription: "Появится после входа",
    workspaceLabel: "Negarin House / Рабочее пространство",
    connectionInactive: "Подключение аккаунта неактивно",
    shellReady: "Оболочка портала готова",
    shellDescription: "После подключения защищённого входа и актуальных данных здесь появится содержимое для вашей роли.",
    dataNotice: "В этом просмотре нет примерных операционных или финансовых данных.",
    navigation: ["Обзор", "Сеть художников", "Экспортные товары", "Заказы", "Черновики заказов", "Отчёты", "Аккаунт"]
  },
  en: {
    title: "Export Partner",
    description: "Manage international market operations.",
    returnLabel: "Return to Negarin",
    navigationLabel: "Portal navigation",
    sectionsLabel: "Portal sections",
    brandDescription: "Art & opportunity marketplace",
    accountLabel: "Account",
    accountDescription: "Shown after sign-in",
    workspaceLabel: "Negarin House / Workspace",
    connectionInactive: "Account connection is inactive",
    shellReady: "Portal shell is ready",
    shellDescription: "This section will show your role-specific content after secure sign-in and live data are connected.",
    dataNotice: "This preview contains no sample operational or financial data.",
    navigation: ["Dashboard", "Artist network", "Export products", "Orders", "Order drafts", "Reports", "Account"]
  },
  "zh-CN": {
    title: "出口合作伙伴",
    description: "管理国际市场业务。",
    returnLabel: "返回 Negarin",
    navigationLabel: "合作伙伴导航",
    sectionsLabel: "门户栏目",
    brandDescription: "艺术与机遇平台",
    accountLabel: "账户",
    accountDescription: "登录后显示",
    workspaceLabel: "Negarin House / 工作区",
    connectionInactive: "账户连接未启用",
    shellReady: "合作伙伴门户已就绪",
    shellDescription: "安全登录和实时数据接入后，此处将显示与您角色对应的内容。",
    dataNotice: "此预览不显示示例业务或财务数据。",
    navigation: ["仪表盘", "艺术家网络", "出口产品", "订单", "订单草稿", "报告", "账户"]
  },
  fr: {
    title: "Partenaire export",
    description: "Gérez les opérations sur les marchés internationaux.",
    returnLabel: "Retour à Negarin",
    navigationLabel: "Navigation du portail",
    sectionsLabel: "Rubriques du portail",
    brandDescription: "Marché de l’art et des opportunités",
    accountLabel: "Compte",
    accountDescription: "Affiché après connexion",
    workspaceLabel: "Negarin House / Espace de travail",
    connectionInactive: "Compte non connecté",
    shellReady: "Le portail est prêt",
    shellDescription: "Les contenus correspondant à votre rôle apparaîtront ici après la connexion sécurisée et l’accès aux données à jour.",
    dataNotice: "Cet aperçu ne contient aucune donnée opérationnelle ou financière fictive.",
    navigation: ["Tableau de bord", "Réseau d’artistes", "Produits d’exportation", "Commandes", "Brouillons de commandes", "Rapports", "Compte"]
  },
  es: {
    title: "Socio exportador",
    description: "Gestione las operaciones en mercados internacionales.",
    returnLabel: "Volver a Negarin",
    navigationLabel: "Navegación del portal",
    sectionsLabel: "Secciones del portal",
    brandDescription: "Mercado de arte y oportunidades",
    accountLabel: "Cuenta",
    accountDescription: "Se mostrará al iniciar sesión",
    workspaceLabel: "Negarin House / Espacio de trabajo",
    connectionInactive: "La cuenta no está conectada",
    shellReady: "El portal está listo",
    shellDescription: "El contenido correspondiente a su función aparecerá aquí cuando se conecten el inicio de sesión seguro y los datos actualizados.",
    dataNotice: "Esta vista previa no contiene datos operativos ni financieros de ejemplo.",
    navigation: ["Panel", "Red de artistas", "Productos de exportación", "Pedidos", "Borradores de pedidos", "Informes", "Cuenta"]
  }
};

export function getPartnerMessages(locale: PartnerLocale): PartnerMessages {
  return messages[locale];
}
