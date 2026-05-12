import { ReactNode, useState } from "react";
import { motion } from "framer-motion";
import { 
  Heart, 
  Stethoscope, 
  BookOpen, 
  Users, 
  Bus, 
  Megaphone,
  UserPlus,
  Mail,
  ChevronLeft,
  MapPin,
  CheckCircle2,
  Send,
  Crown,
  Shield,
  Calendar,
  Activity,
  ClipboardList,
  Radio,
  GraduationCap,
  CalendarDays,
  Clock,
  MapPin as MapPinIcon,
  Sparkles
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import heroImg from "../assets/images/hero.png";
import volunteerImg from "../assets/images/volunteer.png";
import teamImg from "../assets/images/team.png";
import logoImg from "../assets/images/logo.jpg";

const EVENTS = [
  {
    id: 1,
    title: "يوم التبرع بالدم",
    desc: "حملة تبرع بالدم بالتنسيق مع المستشفى الجامعي لورقلة — انضم وأنقذ حياة.",
    date: "20 مايو 2026",
    time: "09:00 — 14:00",
    location: "مستشفى ورقلة",
    badge: "حملة إنسانية",
    badgeClass: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
    color: "bg-red-500",
  },
  {
    id: 2,
    title: "ورشة الإسعافات الأولية",
    desc: "تدريب عملي على مهارات الإسعاف الأساسية لطلاب السنة الأولى والثانية.",
    date: "28 مايو 2026",
    time: "10:00 — 13:00",
    location: "كلية الطب — قاعة المحاضرات",
    badge: "تطوير أكاديمي",
    badgeClass: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
    color: "bg-blue-500",
  },
  {
    id: 3,
    title: "زيارة المرضى في دار العجزة",
    desc: "مبادرة إنسانية لزيارة كبار السن وتقديم الدعم النفسي والمادي لهم.",
    date: "5 يونيو 2026",
    time: "09:30 — 12:00",
    location: "دار العجزة — ورقلة",
    badge: "نشاط تطوعي",
    badgeClass: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
    color: "bg-green-500",
  },
];

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

export default function Home() {
  const [open, setOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    fullName: "",
    birthDate: "",
    birthPlace: "",
    faculty: "",
    year: "",
    contribution: "",
    contact: "",
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${import.meta.env.BASE_URL}api/join`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          fullName: form.fullName,
          birthDate: form.birthDate,
          birthPlace: form.birthPlace,
          faculty: form.faculty,
          year: form.year,
          contribution: form.contribution,
          contact: form.contact,
        }),
      });
      const data = await res.json() as { success: boolean; message?: string };
      if (data.success) {
        setSubmitted(true);
      } else {
        setError(data.message || "حدث خطأ أثناء الإرسال. يرجى المحاولة مجدداً.");
      }
    } catch {
      setError("تعذّر الاتصال. تحقق من الإنترنت وحاول مجدداً.");
    } finally {
      setLoading(false);
    }
  }

  function handleClose(val: boolean) {
    setOpen(val);
    if (!val) {
      setTimeout(() => {
        setSubmitted(false);
        setError("");
        setForm({ fullName: "", birthDate: "", birthPlace: "", faculty: "", year: "", contribution: "", contact: "" });
      }, 300);
    }
  }

  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden font-sans selection:bg-accent/30">
      
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={logoImg} alt="شعار كلية الطب" className="w-11 h-11 rounded-full object-cover shadow-md border border-border" />
            <span className="font-bold text-xl tracking-tight text-primary">رواد كلية الطب ورقلة</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-semibold">
            <a href="#about" className="hover:text-primary transition-colors">من نحن</a>
            <a href="#goals" className="hover:text-primary transition-colors">أهدافنا</a>
            <a href="#events" className="hover:text-primary transition-colors">أحداثنا</a>
            <a href="#bureau" className="hover:text-primary transition-colors">المكتب</a>
            <a href="#values" className="hover:text-primary transition-colors">قيمنا</a>
            <a href="#join" className="bg-accent text-accent-foreground px-5 py-2 rounded-full hover:brightness-110 transition-all shadow-sm">انضم إلينا</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center pt-20">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-transparent z-10" />
          <img src={heroImg} alt="Medical students in corridor" className="w-full h-full object-cover object-center" />
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="max-w-3xl"
          >
            <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/10 text-secondary border border-secondary/20 mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-secondary"></span>
              </span>
              <span className="text-sm font-semibold">التسجيل مفتوح للدفعة الجديدة</span>
            </motion.div>
            
            <motion.h1 variants={fadeInUp} className="text-5xl md:text-7xl font-black leading-[1.1] mb-6 text-foreground">
              رواد في <span className="text-primary">العلم</span>... <br/>
              رواد في <span className="text-secondary">العطاء</span>...
            </motion.h1>
            
            <motion.p variants={fadeInUp} className="text-xl md:text-2xl text-muted-foreground mb-10 font-medium max-w-2xl leading-relaxed">
              ومخلصون للمهنة. نحن خلية طلابية تجمع طلاب الطب لدعم مسيرتهم الأكاديمية والمهنية، وتعزيز التعاون، وتجسيد القيم الإنسانية النبيلة.
            </motion.p>
            
            <motion.div variants={fadeInUp} className="flex flex-wrap gap-4">
              <a href="#join" className="bg-primary text-primary-foreground px-8 py-4 rounded-full font-bold text-lg hover:bg-primary/90 transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 flex items-center gap-2">
                كن جزءاً منا <ChevronLeft size={20} />
              </a>
              <a href="#about" className="bg-card text-card-foreground border border-border px-8 py-4 rounded-full font-bold text-lg hover:bg-muted transition-all flex items-center gap-2">
                اكتشف المزيد
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 bg-card">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
            >
              <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold mb-6 text-primary">أين يلتقي العلم بالإنسانية</motion.h2>
              <motion.p variants={fadeInUp} className="text-lg text-muted-foreground mb-6 leading-relaxed">
                في "رواد كلية الطب ورقلة"، نؤمن بأن الطب ليس مجرد مهنة نكتسبها بعد سنوات من الدراسة، بل هو رسالة نبيلة تبدأ منذ اليوم الأول في الكلية.
              </motion.p>
              <motion.p variants={fadeInUp} className="text-lg text-muted-foreground leading-relaxed mb-8">
                نحن بيئة حاضنة للطلاب، نسعى لسد الفجوة بين الحياة الأكاديمية والعمل المجتمعي، لبناء طبيب متكامل يمتلك المعرفة، المهارة، والرحمة.
              </motion.p>
              <motion.div variants={fadeInUp} className="grid grid-cols-2 gap-6">
                <div className="border-r-4 border-accent pr-4">
                  <h4 className="text-3xl font-black text-foreground mb-1">+500</h4>
                  <p className="text-sm text-muted-foreground font-semibold">طالب مستفيد</p>
                </div>
                <div className="border-r-4 border-secondary pr-4">
                  <h4 className="text-3xl font-black text-foreground mb-1">+20</h4>
                  <p className="text-sm text-muted-foreground font-semibold">حملة إنسانية</p>
                </div>
              </motion.div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="absolute -inset-4 bg-gradient-to-tr from-primary/20 to-secondary/20 rounded-3xl blur-2xl -z-10" />
              <img src={teamImg} alt="Students studying" className="rounded-2xl shadow-2xl relative z-10 w-full object-cover" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Goals / Activities */}
      <section id="goals" className="py-24 bg-background relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-primary/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-secondary/5 blur-[120px] rounded-full" />
        
        <div className="container mx-auto px-6 relative z-10">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-black mb-6 text-foreground">مجالات عملنا</h2>
            <p className="text-lg text-muted-foreground">نعمل من خلال مسارات متعددة لضمان التطور الشامل لطالب الطب، من مقاعد الدراسة إلى خدمة المجتمع.</p>
          </motion.div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={staggerContainer}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <GoalCard 
              icon={<BookOpen />} 
              title="الدعم الأكاديمي والتطوير" 
              desc="ورش عمل، دورات تدريبية، وجلسات مراجعة لمساعدة الطلاب على التفوق الأكاديمي."
              color="bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20"
            />
            <GoalCard 
              icon={<Heart />} 
              title="الحملات الإنسانية" 
              desc="حملات التبرع بالدم، التوعية الصحية، والمبادرات التطوعية لخدمة المجتمع."
              color="bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20"
            />
            <GoalCard 
              icon={<Bus />} 
              title="القوافل والرحلات" 
              desc="رحلات ميدانية للمناطق النائية لتقديم الرعاية وتعزيز الحس المجتمعي."
              color="bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20"
            />
            <GoalCard 
              icon={<UserPlus />} 
              title="زيارات المرضى" 
              desc="زيارات دورية للمستشفيات لتقديم الدعم النفسي والمعنوي للمرضى."
              color="bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20"
            />
            <GoalCard 
              icon={<Users />} 
              title="المؤتمرات والندوات" 
              desc="تنظيم والمشاركة في الفعاليات الطبية لتوسيع المدارك ومواكبة التطورات."
              color="bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20"
            />
            <GoalCard 
              icon={<Megaphone />} 
              title="التواصل مع الإدارة" 
              desc="نكون همزة الوصل بين الطلاب وإدارة الكلية لإيصال وتلبية احتياجاتهم."
              color="bg-teal-500/10 text-teal-600 dark:text-teal-400 border-teal-500/20"
            />
          </motion.div>
        </div>
      </section>

      {/* Events Section */}
      <section id="events" className="py-24 bg-card relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-secondary/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-accent/5 blur-[120px] rounded-full" />

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center max-w-2xl mx-auto mb-16"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/10 text-secondary border border-secondary/20 mb-4">
              <Sparkles size={14} />
              <span className="text-sm font-semibold">ما يجري عندنا</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black mb-4 text-foreground">أحداثنا وفعالياتنا</h2>
            <p className="text-lg text-muted-foreground">آخر النشاطات والتظاهرات التي تنظمها خلية رواد كلية الطب ورقلة.</p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={staggerContainer}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {EVENTS.map((ev) => (
              <motion.div
                key={ev.id}
                variants={fadeInUp}
                className="bg-background border border-border rounded-2xl overflow-hidden hover:shadow-xl transition-all hover:-translate-y-2 group flex flex-col"
              >
                {/* Colour stripe */}
                <div className={`h-2 w-full ${ev.color}`} />

                <div className="p-6 flex flex-col flex-1 gap-4">
                  {/* Date + location row */}
                  <div className="flex flex-wrap gap-3 text-xs font-semibold text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <CalendarDays size={13} className="text-secondary" />
                      {ev.date}
                    </span>
                    {ev.time && (
                      <span className="flex items-center gap-1">
                        <Clock size={13} className="text-secondary" />
                        {ev.time}
                      </span>
                    )}
                    {ev.location && (
                      <span className="flex items-center gap-1">
                        <MapPinIcon size={13} className="text-accent" />
                        {ev.location}
                      </span>
                    )}
                  </div>

                  {/* Badge */}
                  <span className={`self-start text-xs font-bold px-2 py-0.5 rounded-full ${ev.badgeClass}`}>
                    {ev.badge}
                  </span>

                  <h3 className="text-lg font-black text-foreground leading-snug group-hover:text-primary transition-colors">
                    {ev.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed flex-1">{ev.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Bureau Section */}
      <section id="bureau" className="py-24 bg-card relative overflow-hidden">
        <div className="absolute top-0 left-0 w-1/3 h-1/3 bg-accent/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 right-0 w-1/3 h-1/3 bg-primary/5 blur-[120px] rounded-full" />

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center max-w-2xl mx-auto mb-16"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-accent border border-accent/20 mb-4">
              <Crown size={14} />
              <span className="text-sm font-semibold">الهيئة الإدارية</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black mb-4 text-foreground">المكتب التنفيذي</h2>
            <p className="text-lg text-muted-foreground">الفريق المشرف على قيادة الخلية وتنظيم نشاطاتها.</p>
          </motion.div>

          {/* President — centred & larger */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="flex justify-center mb-8"
          >
            <div className="bg-background border-2 border-accent/40 rounded-2xl p-8 flex flex-col items-center gap-4 shadow-xl w-64 hover:-translate-y-2 transition-transform">
              <div className="w-16 h-16 rounded-full bg-accent/10 border-2 border-accent/30 flex items-center justify-center text-accent">
                <Crown size={28} />
              </div>
              <div className="text-center">
                <p className="text-xs font-bold uppercase tracking-widest text-accent mb-1">رئيس الخلية</p>
                <h3 className="text-2xl font-black text-foreground">حسنى</h3>
              </div>
            </div>
          </motion.div>

          {/* Vice president */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="flex justify-center mb-10"
          >
            <div className="bg-background border border-border rounded-2xl p-6 flex flex-col items-center gap-3 shadow-md w-56 hover:-translate-y-2 transition-transform">
              <div className="w-12 h-12 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                <Shield size={22} />
              </div>
              <div className="text-center">
                <p className="text-xs font-semibold text-muted-foreground mb-1">النائب</p>
                <h3 className="text-xl font-black text-foreground">نوي ميلود</h3>
              </div>
            </div>
          </motion.div>

          {/* Rest of bureau */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={staggerContainer}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4"
          >
            {[
              { role: "مسؤول التظاهرات", name: "ياسمين", icon: <Calendar size={20} /> },
              { role: "مسؤول النشاطات",  name: "هدى",    icon: <Activity size={20} /> },
              { role: "مسؤول الإدارة والتنظيم", name: "آية", icon: <ClipboardList size={20} /> },
              { role: "مسؤول الإعلام",   name: "تقوى",   icon: <Radio size={20} /> },
              { role: "مسؤول بيداغوجيا", name: "فاطمة",  icon: <GraduationCap size={20} /> },
            ].map(({ role, name, icon }) => (
              <motion.div
                key={name}
                variants={fadeInUp}
                className="bg-background border border-border rounded-2xl p-5 flex flex-col items-center gap-3 text-center hover:-translate-y-2 transition-transform hover:shadow-lg"
              >
                <div className="w-11 h-11 rounded-full bg-secondary/10 border border-secondary/20 flex items-center justify-center text-secondary">
                  {icon}
                </div>
                <div>
                  <p className="text-xs text-muted-foreground font-semibold mb-1 leading-tight">{role}</p>
                  <h3 className="text-lg font-black text-foreground">{name}</h3>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Values Section */}
      <section id="values" className="py-24 bg-primary text-primary-foreground relative">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              <motion.h2 variants={fadeInUp} className="text-3xl md:text-5xl font-black mb-8 leading-tight">الطب ليس مجرد دراسة،<br/>إنه أسلوب حياة.</motion.h2>
              
              <div className="space-y-6">
                <motion.div variants={fadeInUp} className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                    <span className="font-bold text-xl text-accent">1</span>
                  </div>
                  <div>
                    <h4 className="text-xl font-bold mb-2">روح الفريق</h4>
                    <p className="text-primary-foreground/80 leading-relaxed">العمل الجماعي هو أساس نجاحنا. نتعاون وندعم بعضنا البعض في كل خطوة.</p>
                  </div>
                </motion.div>
                
                <motion.div variants={fadeInUp} className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                    <span className="font-bold text-xl text-accent">2</span>
                  </div>
                  <div>
                    <h4 className="text-xl font-bold mb-2">المبادرة</h4>
                    <p className="text-primary-foreground/80 leading-relaxed">لا ننتظر التغيير، بل نصنعه. نبادر في تقديم الحلول والمشاريع الهادفة.</p>
                  </div>
                </motion.div>
                
                <motion.div variants={fadeInUp} className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                    <span className="font-bold text-xl text-accent">3</span>
                  </div>
                  <div>
                    <h4 className="text-xl font-bold mb-2">الإنسانية أولاً</h4>
                    <p className="text-primary-foreground/80 leading-relaxed">الرحمة والتعاطف هما البوصلة التي توجه جميع نشاطاتنا وتفاعلاتنا.</p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <img src={volunteerImg} alt="Volunteering" className="rounded-2xl shadow-2xl w-full border-4 border-white/10" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA / Join */}
      <section id="join" className="py-32 bg-card text-center">
        <div className="container mx-auto px-6">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="max-w-2xl mx-auto"
          >
            <div className="w-20 h-20 bg-secondary/10 text-secondary rounded-full flex items-center justify-center mx-auto mb-8">
              <Mail size={32} />
            </div>
            <h2 className="text-4xl md:text-5xl font-black mb-6 text-foreground">هل أنت مستعد لتكون رائداً؟</h2>
            <p className="text-xl text-muted-foreground mb-10 leading-relaxed">
              انضم إلينا اليوم لتكن جزءاً من التغيير، طور مهاراتك، وساهم في بناء مجتمع طبي واعٍ ومسؤول.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button
                data-testid="button-join-form"
                onClick={() => setOpen(true)}
                className="bg-primary text-primary-foreground px-8 py-4 rounded-full font-bold text-lg hover:bg-primary/90 transition-all shadow-lg hover:-translate-y-1 w-full sm:w-auto flex items-center justify-center gap-2"
              >
                <Send size={18} />
                نموذج الانضمام
              </button>
              <button data-testid="button-contact-us" className="bg-transparent border-2 border-primary text-primary px-8 py-4 rounded-full font-bold text-lg hover:bg-primary/5 transition-all w-full sm:w-auto">
                تواصل معنا
              </button>
            </div>

            <Dialog open={open} onOpenChange={handleClose}>
              <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto" dir="rtl">
                {submitted ? (
                  <div className="flex flex-col items-center justify-center py-12 text-center gap-4">
                    <CheckCircle2 size={64} className="text-secondary" />
                    <h3 className="text-2xl font-black text-foreground">تم إرسال طلبك بنجاح!</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      شكراً لاهتمامك بالانضمام إلى خلية رواد كلية الطب ورقلة.<br />
                      سنتواصل معك قريباً.
                    </p>
                    <button
                      onClick={() => handleClose(false)}
                      className="mt-4 bg-primary text-primary-foreground px-8 py-3 rounded-full font-bold hover:bg-primary/90 transition-all"
                    >
                      إغلاق
                    </button>
                  </div>
                ) : (
                  <>
                    <DialogHeader className="mb-2">
                      <DialogTitle className="text-2xl font-black text-primary text-right">نموذج الانضمام</DialogTitle>
                      <DialogDescription className="text-right">
                        انضم إلى خلية رواد كلية الطب ورقلة — أكمل البيانات أدناه وسنتواصل معك.
                      </DialogDescription>
                    </DialogHeader>

                    <form onSubmit={handleSubmit} className="space-y-5">

                      {/* الاسم واللقب */}
                      <div>
                        <label className="block text-sm font-bold text-foreground mb-1">الاسم واللقب <span className="text-destructive">*</span></label>
                        <input
                          data-testid="input-full-name"
                          name="fullName"
                          value={form.fullName}
                          onChange={handleChange}
                          required
                          placeholder="مثال: محمد بن علي"
                          className="w-full border border-border rounded-xl px-4 py-3 bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary text-right"
                        />
                      </div>

                      {/* تاريخ ومكان الميلاد */}
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-sm font-bold text-foreground mb-1">تاريخ الميلاد <span className="text-destructive">*</span></label>
                          <input
                            data-testid="input-birth-date"
                            name="birthDate"
                            type="date"
                            value={form.birthDate}
                            onChange={handleChange}
                            required
                            className="w-full border border-border rounded-xl px-4 py-3 bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary text-right"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-bold text-foreground mb-1">مكان الميلاد <span className="text-destructive">*</span></label>
                          <input
                            data-testid="input-birth-place"
                            name="birthPlace"
                            value={form.birthPlace}
                            onChange={handleChange}
                            required
                            placeholder="مثال: ورقلة"
                            className="w-full border border-border rounded-xl px-4 py-3 bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary text-right"
                          />
                        </div>
                      </div>

                      {/* الكلية */}
                      <div>
                        <label className="block text-sm font-bold text-foreground mb-2">الكلية <span className="text-destructive">*</span></label>
                        <div className="flex gap-3">
                          {["كلية الطب", "كلية الصيدلة"].map(opt => (
                            <label
                              key={opt}
                              data-testid={`radio-faculty-${opt}`}
                              className={`flex-1 flex items-center justify-center gap-2 border-2 rounded-xl py-3 px-4 cursor-pointer font-semibold transition-all ${form.faculty === opt ? "border-primary bg-primary/5 text-primary" : "border-border text-muted-foreground hover:border-primary/40"}`}
                            >
                              <input
                                type="radio"
                                name="faculty"
                                value={opt}
                                checked={form.faculty === opt}
                                onChange={handleChange}
                                required
                                className="hidden"
                              />
                              {opt}
                            </label>
                          ))}
                        </div>
                      </div>

                      {/* السنة الدراسية */}
                      <div>
                        <label className="block text-sm font-bold text-foreground mb-1">السنة الدراسية <span className="text-destructive">*</span></label>
                        <select
                          data-testid="select-year"
                          name="year"
                          value={form.year}
                          onChange={handleChange}
                          required
                          className="w-full border border-border rounded-xl px-4 py-3 bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary text-right"
                        >
                          <option value="">اختر السنة</option>
                          <option value="السنة الأولى">السنة الأولى</option>
                          <option value="السنة الثانية">السنة الثانية</option>
                          <option value="السنة الثالثة">السنة الثالثة</option>
                          <option value="السنة الرابعة">السنة الرابعة</option>
                          <option value="السنة الخامسة">السنة الخامسة</option>
                          <option value="السنة السادسة">السنة السادسة</option>
                        </select>
                      </div>

                      {/* ما يمكنك تقديمه */}
                      <div>
                        <label className="block text-sm font-bold text-foreground mb-1">ما الذي يمكنك تقديمه للخلية؟ <span className="text-destructive">*</span></label>
                        <textarea
                          data-testid="textarea-contribution"
                          name="contribution"
                          value={form.contribution}
                          onChange={handleChange}
                          required
                          rows={3}
                          placeholder="مثال: التصميم الجرافيكي، التنظيم، الإعلام، العمل الميداني..."
                          className="w-full border border-border rounded-xl px-4 py-3 bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary text-right resize-none"
                        />
                      </div>

                      {/* وسيلة التواصل */}
                      <div>
                        <label className="block text-sm font-bold text-foreground mb-1">رقم الهاتف أو Gmail للتواصل <span className="text-destructive">*</span></label>
                        <input
                          data-testid="input-contact"
                          name="contact"
                          value={form.contact}
                          onChange={handleChange}
                          required
                          placeholder="مثال: 0770000000 أو example@gmail.com"
                          className="w-full border border-border rounded-xl px-4 py-3 bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary text-right"
                        />
                      </div>

                      {error && (
                        <p className="text-destructive text-sm text-center font-medium">{error}</p>
                      )}

                      <button
                        type="submit"
                        data-testid="button-submit-form"
                        disabled={loading}
                        className="w-full bg-primary text-primary-foreground py-4 rounded-xl font-bold text-lg hover:bg-primary/90 transition-all flex items-center justify-center gap-2 shadow-md hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed"
                      >
                        {loading ? (
                          <>
                            <span className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                            جاري الإرسال...
                          </>
                        ) : (
                          <>
                            <Send size={18} />
                            إرسال الطلب
                          </>
                        )}
                      </button>
                    </form>
                  </>
                )}
              </DialogContent>
            </Dialog>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-background border-t border-border py-12">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-3">
                <img src={logoImg} alt="شعار كلية الطب" className="w-10 h-10 rounded-full object-cover border border-border" />
                <span className="font-bold text-xl text-foreground">رواد كلية الطب ورقلة</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground text-sm">
                <MapPin size={14} className="text-accent shrink-0" />
                <span>ولاية ورقلة، الجزائر</span>
              </div>
            </div>
            <p className="text-muted-foreground font-medium text-center">
              رواد في العلم... رواد في العطاء... ومخلصون للمهنة.
            </p>
            <div className="flex gap-4 text-muted-foreground">
              {/* Social links placeholders */}
              <div className="w-10 h-10 rounded-full bg-card border border-border flex items-center justify-center hover:bg-muted cursor-pointer transition-colors">
                <span className="font-bold text-sm">X</span>
              </div>
              <div className="w-10 h-10 rounded-full bg-card border border-border flex items-center justify-center hover:bg-muted cursor-pointer transition-colors">
                <span className="font-bold text-sm">In</span>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-border text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} رواد كلية الطب ورقلة. جميع الحقوق محفوظة.
          </div>
        </div>
      </footer>
    </div>
  );
}

function GoalCard({ icon, title, desc, color }: { icon: ReactNode, title: string, desc: string, color: string }) {
  return (
    <motion.div 
      variants={fadeInUp}
      className="bg-card border border-border rounded-2xl p-8 hover:shadow-xl transition-all hover:-translate-y-2 group"
    >
      <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 border ${color} transition-transform group-hover:scale-110`}>
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-4 text-foreground">{title}</h3>
      <p className="text-muted-foreground leading-relaxed">{desc}</p>
    </motion.div>
  );
}
