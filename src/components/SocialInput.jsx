// Extract a raw username from various possible stored values
export function extractUsername(val) {
  if (!val && val !== 0) return "";
  let s = String(val).trim();
  // remove leading @
  s = s.replace(/^@/, "");
  // remove protocol and domains for instagram and telegram
  s = s.replace(/^(https?:\/\/)?(www\.)?(instagram\.com|instagr\.am)\//i, "");
  s = s.replace(/^(https?:\/\/)?(www\.)?t\.me\//i, "");
  // strip anything after first slash or query
  s = s.split(/[/?#]/)[0];
  return s;
}

export function makeInstaUrl(u) {
  const name = (u || "").toString().trim().replace(/^@/, "");
  return name ? `https://www.instagram.com/${name}` : null;
}

export function makeTelegramUrl(u) {
  const name = (u || "").toString().trim().replace(/^@/, "");
  return name ? `https://t.me/${name}` : null;
}

// SocialInput integrates with react-hook-form register
export default function SocialInput({
  label,
  name,
  register,
  placeholder,
  style,
}) {
  const { onChange, onBlur, ref, ...rest } = register(name || "");

  const handleChange = (e) => {
    // keep only username part when user types or pastes a full url
    e.target.value = extractUsername(e.target.value);
    onChange?.(e);
  };

  return (
    <div className={style}>
      <input
        {...rest}
        ref={ref}
        placeholder={placeholder || label}
        onChange={handleChange}
        onBlur={onBlur}
        className="w-full p-1 px-2 text-sm font-normal rounded-lg"
      />
    </div>
  );
}
