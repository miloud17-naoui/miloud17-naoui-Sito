import { Router, type IRouter } from "express";

const router: IRouter = Router();

router.post("/join", async (req, res) => {
  const accessKey = process.env["VITE_WEB3FORMS_KEY"];
  if (!accessKey) {
    res.status(500).json({ success: false, message: "مفتاح الإرسال غير مضبوط على الخادم." });
    return;
  }

  const { fullName, birthDate, birthPlace, faculty, year, contribution, contact } = req.body;

  if (!fullName || !faculty || !year || !contact) {
    res.status(400).json({ success: false, message: "يرجى تعبئة جميع الحقول المطلوبة." });
    return;
  }

  try {
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        access_key: accessKey,
        subject: `طلب انضمام جديد — ${fullName}`,
        from_name: "رواد كلية الطب ورقلة",
        "الاسم واللقب": fullName,
        "تاريخ الميلاد": birthDate,
        "مكان الميلاد": birthPlace,
        "الكلية": faculty,
        "السنة الدراسية": year,
        "ما يمكن تقديمه": contribution,
        "وسيلة التواصل": contact,
      }),
    });

    const data = await response.json() as { success: boolean; message?: string };
    req.log.info({ success: data.success }, "Web3Forms response");

    if (data.success) {
      res.json({ success: true });
    } else {
      res.status(400).json({ success: false, message: data.message || "فشل الإرسال." });
    }
  } catch (err) {
    req.log.error({ err }, "Web3Forms fetch error");
    res.status(500).json({ success: false, message: "خطأ في الاتصال بخدمة البريد." });
  }
});

export default router;
