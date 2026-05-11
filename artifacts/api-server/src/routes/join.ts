import { Router, type IRouter } from "express";

const router: IRouter = Router();

router.post("/join", async (req, res) => {
  const apiKey = process.env["RESEND_API_KEY"];
  if (!apiKey) {
    res.status(500).json({ success: false, message: "مفتاح البريد غير مضبوط على الخادم." });
    return;
  }

  const { fullName, birthDate, birthPlace, faculty, year, contribution, contact } = req.body;

  if (!fullName || !faculty || !year || !contact) {
    res.status(400).json({ success: false, message: "يرجى تعبئة جميع الحقول المطلوبة." });
    return;
  }

  const htmlBody = `
    <div dir="rtl" style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #1a3a6e; border-bottom: 2px solid #f59e0b; padding-bottom: 8px;">
        طلب انضمام جديد — رواد كلية الطب ورقلة
      </h2>
      <table style="width:100%; border-collapse: collapse; margin-top: 16px;">
        <tr style="background:#f0f4ff">
          <td style="padding:10px 14px; font-weight:bold; width:40%">الاسم واللقب</td>
          <td style="padding:10px 14px;">${fullName}</td>
        </tr>
        <tr>
          <td style="padding:10px 14px; font-weight:bold;">تاريخ الميلاد</td>
          <td style="padding:10px 14px;">${birthDate || "—"}</td>
        </tr>
        <tr style="background:#f0f4ff">
          <td style="padding:10px 14px; font-weight:bold;">مكان الميلاد</td>
          <td style="padding:10px 14px;">${birthPlace || "—"}</td>
        </tr>
        <tr>
          <td style="padding:10px 14px; font-weight:bold;">الكلية</td>
          <td style="padding:10px 14px;">${faculty}</td>
        </tr>
        <tr style="background:#f0f4ff">
          <td style="padding:10px 14px; font-weight:bold;">السنة الدراسية</td>
          <td style="padding:10px 14px;">${year}</td>
        </tr>
        <tr>
          <td style="padding:10px 14px; font-weight:bold;">ما يمكن تقديمه</td>
          <td style="padding:10px 14px;">${contribution || "—"}</td>
        </tr>
        <tr style="background:#f0f4ff">
          <td style="padding:10px 14px; font-weight:bold;">وسيلة التواصل</td>
          <td style="padding:10px 14px;">${contact}</td>
        </tr>
      </table>
      <p style="margin-top:24px; color:#6b7280; font-size:13px;">
        تم الإرسال تلقائياً من موقع رواد كلية الطب ورقلة
      </p>
    </div>
  `;

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        from: "رواد كلية الطب ورقلة <onboarding@resend.dev>",
        to: ["nmylwd66@gmail.com"],
        subject: `طلب انضمام جديد — ${fullName}`,
        html: htmlBody,
      }),
    });

    const data = await response.json() as { id?: string; name?: string; message?: string };
    req.log.info({ status: response.status, id: data.id }, "Resend response");

    if (response.ok && data.id) {
      res.json({ success: true });
    } else {
      req.log.error({ data }, "Resend error");
      res.status(400).json({ success: false, message: "فشل إرسال البريد الإلكتروني." });
    }
  } catch (err) {
    req.log.error({ err }, "Resend fetch error");
    res.status(500).json({ success: false, message: "خطأ في الاتصال بخدمة البريد." });
  }
});

export default router;
