export const exportLanguages = [
 {code:"en",label:"English",menu:"Partner navigation",sample:"Preview only. Server operations are not connected.",close:"Close message",language:"Language",search:"Search",saved:"Changes are kept in this preview only."},
 {code:"ar",label:"العربية",menu:"قائمة الشريك",sample:"هذه معاينة فقط. العمليات غير متصلة بالخادم.",close:"إغلاق الرسالة",language:"اللغة",search:"بحث",saved:"تم الاحتفاظ بالتغييرات في هذه المعاينة فقط."},
 {code:"tr-TR",label:"Türkçe",menu:"İş ortağı menüsü",sample:"Yalnızca önizleme. Sunucu işlemleri bağlı değil.",close:"Mesajı kapat",language:"Dil",search:"Ara",saved:"Değişiklikler yalnızca bu önizlemede saklanır."},
 {code:"ru",label:"Русский",menu:"Меню партнёра",sample:"Только предпросмотр. Серверные операции не подключены.",close:"Закрыть сообщение",language:"Язык",search:"Поиск",saved:"Изменения сохранены только в этом предпросмотре."},
 {code:"zh-CN",label:"简体中文",menu:"合作伙伴导航",sample:"仅供预览。尚未连接服务器操作。",close:"关闭消息",language:"语言",search:"搜索",saved:"更改仅保存在此预览中。"},
 {code:"fr",label:"Français",menu:"Navigation partenaire",sample:"Aperçu uniquement. Les opérations serveur ne sont pas connectées.",close:"Fermer le message",language:"Langue",search:"Rechercher",saved:"Les modifications sont conservées dans cet aperçu uniquement."},
 {code:"es",label:"Español",menu:"Navegación del socio",sample:"Solo vista previa. Las operaciones del servidor no están conectadas.",close:"Cerrar mensaje",language:"Idioma",search:"Buscar",saved:"Los cambios se conservan solo en esta vista previa."},
] as const;

export const exportPending = {
 en:"The original images for this screen could not be exported because Figma's tool quota was reached. This screen is pending.",
 ar:"هذه الشاشة قيد الانتظار: تعذر تصدير الصور الأصلية بسبب بلوغ حد استخدام أداة Figma.",
 "tr-TR":"Figma araç kotası dolduğu için bu ekranın özgün görselleri dışa aktarılamadı. Ekran beklemede.",
 ru:"Экран ожидает экспорта исходных изображений: достигнут лимит инструмента Figma.",
 "zh-CN":"已达到 Figma 工具调用限额，无法导出此页面的原始图片。页面待完成。",
 fr:"Cet écran est en attente : le quota Figma empêche l’export des images originales.",
 es:"Esta pantalla está pendiente: se alcanzó la cuota de Figma al exportar las imágenes originales.",
} as const;
