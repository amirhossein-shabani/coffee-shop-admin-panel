import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
// اگر پکیج جدید "motion" رو نصب کردی به جای خط بالا از این استفاده کن:
// import { motion, AnimatePresence } from "motion/react";
import { useLogin } from "../hooks/useLogin";
import { AUTHORIZED_ROLES } from "../constants/authRoles";

function Login() {
  const [email, setEmail] = useState(
    () => localStorage.getItem("lastLoginEmail") || "",
  );
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const { mutate: loginUser, isPending } = useLogin();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    setErrorMessage("");

    loginUser(
      { email, password },
      {
        onSuccess: ({ profile }) => {
          localStorage.setItem("lastLoginEmail", email);

          if (AUTHORIZED_ROLES.includes(profile.role)) {
            navigate("/", { replace: true });
          } else {
            navigate("/not-authorized", { replace: true });
          }
        },

        onError: (err) => {
          console.error(err.message);

          if (
            err.message?.toLowerCase().includes("invalid login credentials")
          ) {
            setErrorMessage("ایمیل یا رمز عبور وارد شده اشتباه است.");
          } else if (err.message?.toLowerCase().includes("email")) {
            setErrorMessage("ایمیل وارد شده معتبر نیست.");
          } else {
            setErrorMessage(
              "ورود به حساب کاربری انجام نشد. لطفاً دوباره تلاش کنید.",
            );
          }
        },
      },
    );
  };

  return (
    <div
      dir="rtl"
      className="relative flex items-center justify-center w-full min-h-screen px-4 overflow-hidden bg-coffee-dark"
    >
      {/* پس‌زمینه‌ی اتمسفریک: هاله‌های گرم قهوه‌ای که به آرامی شناورند */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute rounded-full -top-32 -right-24 w-96 h-96 bg-amber-700/20 blur-[120px]"
          animate={{ x: [0, 20, 0], y: [0, 15, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute rounded-full -bottom-40 -left-24 w-96 h-96 bg-coffee-light/10 blur-[120px]"
          animate={{ x: [0, -15, 0], y: [0, -20, 0] }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        />
        {/* بافت دانه‌ای ظریف برای حس ملموس‌تر */}
        <div
          className="absolute inset-0 opacity-[0.03] mix-blend-overlay"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative w-full max-w-md"
      >
        {/* هدر */}
        <div className="mb-8 text-center">
          <motion.div
            className="relative flex items-center justify-center w-16 h-16 mx-auto mb-5 text-3xl rounded-2xl bg-coffee-light/10 text-coffee-light ring-1 ring-coffee-light/20"
            initial={{ scale: 0.7, opacity: 0, rotate: -8 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
          >
            {/* بخارهای فنجان قهوه */}
            <motion.span
              className="absolute w-0.5 h-3 -translate-x-1/2 rounded-full -top-3 left-1/2 bg-coffee-light/40"
              animate={{ opacity: [0, 0.6, 0], y: [0, -6, -10] }}
              transition={{
                duration: 2.4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <motion.span
              className="absolute w-0.5 h-2.5 -top-2.5 rounded-full left-[42%] bg-coffee-light/30"
              animate={{ opacity: [0, 0.5, 0], y: [0, -5, -8] }}
              transition={{
                duration: 2.4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.6,
              }}
            />
            <motion.span
              className="absolute w-0.5 h-2.5 -top-2.5 rounded-full left-[58%] bg-coffee-light/30"
              animate={{ opacity: [0, 0.5, 0], y: [0, -5, -8] }}
              transition={{
                duration: 2.4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1.2,
              }}
            />
            ☕
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="text-3xl font-bold text-coffee-light"
          >
            خوش آمدید
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="mt-2 text-sm text-white/50"
          >
            برای ورود به پنل مدیریت اطلاعات خود را وارد کنید
          </motion.p>
        </div>

        {/* کارت ورود */}
        <motion.form
          onSubmit={handleLogin}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="p-7 border border-white/10 rounded-2xl bg-white/[0.06] shadow-2xl backdrop-blur-xl"
        >
          {/* خطا */}
          <AnimatePresence>
            {errorMessage && (
              <motion.div
                initial={{ opacity: 0, height: 0, marginBottom: 0 }}
                animate={{ opacity: 1, height: "auto", marginBottom: 20 }}
                exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="overflow-hidden"
              >
                <motion.div
                  initial={{ x: 0 }}
                  animate={{ x: [0, -6, 6, -4, 4, 0] }}
                  transition={{ duration: 0.4 }}
                  className="p-3 text-sm text-center text-red-300 border rounded-lg border-red-400/20 bg-red-500/10"
                >
                  {errorMessage}
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="space-y-5">
            {/* ایمیل */}
            <div>
              <label className="block mb-2 text-sm font-medium text-white/70">
                ایمیل
              </label>

              <input
                type="email"
                placeholder="example@email.com"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 text-sm text-white transition-all duration-300 border rounded-xl border-white/10 bg-black/20 placeholder:text-white/30 focus:border-coffee-light/60 focus:outline-none focus:ring-2 focus:ring-coffee-light/10 focus:bg-black/30"
                required
              />
            </div>

            {/* رمز عبور */}
            <div>
              <label className="block mb-2 text-sm font-medium text-white/70">
                رمز عبور
              </label>

              <input
                type="password"
                placeholder="رمز عبور خود را وارد کنید"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 text-sm text-white transition-all duration-300 border rounded-xl border-white/10 bg-black/20 placeholder:text-white/30 focus:border-coffee-light/60 focus:outline-none focus:ring-2 focus:ring-coffee-light/10 focus:bg-black/30"
                required
              />
            </div>

            {/* دکمه */}
            <motion.button
              type="submit"
              disabled={isPending}
              whileHover={!isPending ? { scale: 1.015 } : {}}
              whileTap={!isPending ? { scale: 0.98 } : {}}
              className="relative w-full py-3 mt-2 overflow-hidden font-bold text-white transition-colors duration-300 rounded-xl bg-gradient-to-l from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <AnimatePresence mode="wait" initial={false}>
                {isPending ? (
                  <motion.span
                    key="loading"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center justify-center gap-2"
                  >
                    <motion.span
                      className="w-3.5 h-3.5 border-2 rounded-full border-white/30 border-t-white"
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 0.7,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    />
                    در حال ورود...
                  </motion.span>
                ) : (
                  <motion.span
                    key="idle"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    ورود به پنل
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </motion.form>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="mt-6 text-xs text-center text-white/30"
        >
          دسترسی این بخش فقط برای کاربران مجاز امکان‌پذیر است
        </motion.p>
      </motion.div>
    </div>
  );
}

export default Login;
