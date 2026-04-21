"use client";

import { useState } from "react";
import { useAuth } from "@/components/AuthProvider";
import type { Locale } from "@/lib/i18n";

export function HeaderAuthControls({ locale }: { locale: Locale }) {
  const { user, loginDemo, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("demo@voi.news");
  const [password, setPassword] = useState("demo123");
  const [error, setError] = useState("");

  if (user) {
    return (
      <div className="auth-inline">
        <span className="auth-chip">{locale === "ur" ? "ڈیمو صارف" : "Demo User"}</span>
        <button className="auth-btn" onClick={logout} type="button">
          {locale === "ur" ? "لاگ آؤٹ" : "Logout"}
        </button>
      </div>
    );
  }

  return (
    <div className="auth-inline">
      <button className="auth-btn" onClick={() => setOpen((v) => !v)} type="button">
        {locale === "ur" ? "ڈیمو لاگ اِن" : "Demo Login"}
      </button>

      {open ? (
        <form
          className="auth-popover"
          onSubmit={(event) => {
            event.preventDefault();
            const ok = loginDemo(email, password);
            if (!ok) {
              setError(locale === "ur" ? "غلط اسناد" : "Invalid credentials");
              return;
            }
            setError("");
            setOpen(false);
          }}
        >
          <label>
            Email
            <input value={email} onChange={(event) => setEmail(event.target.value)} />
          </label>
          <label>
            Password
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </label>
          {error ? <p className="auth-error">{error}</p> : null}
          <button className="auth-btn" type="submit">
            {locale === "ur" ? "سائن اِن" : "Sign In"}
          </button>
        </form>
      ) : null}
    </div>
  );
}
