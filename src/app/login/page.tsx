"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { KeyRound, ShieldCheck, Loader2 } from "lucide-react";

export default function LoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password) {
      setError("Vui lòng nhập mật khẩu");
      return;
    }
    
    setIsLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      
      const data = await res.json();
      
      if (res.ok && data.success) {
        // Reload lại hoàn toàn để middleware bắt được Cookie và cho phép vào trang chủ
        window.location.href = "/";
      } else {
        setError(data.message || "Mật khẩu không hợp lệ");
        setIsLoading(false);
      }
    } catch (err) {
      setError("Mất kết nối với máy chủ, hãy thử lại");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-950 relative overflow-hidden">
      {/* Hiệu ứng mờ ảo phông nền, thiết kế cao cấp */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/20 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="relative w-full max-w-sm p-8 bg-zinc-900/50 backdrop-blur-xl border border-zinc-800 rounded-3xl shadow-[0_0_50px_rgba(0,0,0,0.5)]">
        <div className="flex flex-col items-center mb-8 text-center space-y-4">
          <div className="w-16 h-16 bg-blue-500/10 rounded-2xl flex items-center justify-center border border-blue-500/20 shadow-inner">
            <ShieldCheck className="w-8 h-8 text-blue-400" />
          </div>
          <div>
            <h1 className="text-xl font-bold font-cal bg-gradient-to-br from-white to-zinc-400 bg-clip-text text-transparent mb-1.5">
              Cổng quy trình ISO
            </h1>
            <p className="text-zinc-400 text-xs">Mạng lưới P. Tài chính Kế toán</p>
          </div>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-2">
            <div className="relative">
              <KeyRound className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
              <Input
                type="password"
                placeholder="Nhập khóa để truy cập..."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10 h-12 bg-zinc-950/50 border-zinc-800 text-zinc-200 placeholder:text-zinc-600 focus-visible:ring-1 focus-visible:ring-blue-500 rounded-xl"
              />
            </div>
            {error && <p className="text-red-400 text-xs font-medium pl-1 animate-in fade-in">{error}</p>}
          </div>

          <Button 
            type="submit" 
            disabled={isLoading}
            className="w-full h-11 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl transition-all shadow-lg shadow-blue-900/20"
          >
            {isLoading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
            Xác nhận
          </Button>
        </form>
      </div>
    </div>
  );
}
