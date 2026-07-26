"use client";

import { useTheme } from "next-themes";
import { useState } from "react";
import { useClerk, useUser } from "@clerk/nextjs";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useProgress } from "@/hooks/use-progress";
import { progressService } from "@/services/progress-service";
import { toast } from "sonner";
import { Download, Upload, Trash2 } from "lucide-react";
import { useRef } from "react";

export default function SettingsPage() {
  const { theme, setTheme } = useTheme();
  const { signOut } = useClerk();
  const { user } = useUser();
  const { progress } = useProgress();
  const [animations, setAnimations] = useState(true);
  const [notifications, setNotifications] = useState(true);
  const importInputRef = useRef<HTMLInputElement>(null);

  function handleImportClick() {
    importInputRef.current?.click();
  }

  function handleImportFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const parsed = JSON.parse(String(reader.result));
        progressService.save(parsed);
        toast.success("Progress imported — refresh to see the change");
      } catch {
        toast.error("Couldn't parse that file");
      }
    };
    reader.readAsText(file);
    e.target.value = "";
  }

  function handleExport() {
    const blob = new Blob([JSON.stringify(progress, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "codeforge-progress.json";
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Progress exported");
  }

  function handleReset() {
    progressService.reset();
    toast.success("Progress reset — refresh to see the change");
  }

  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h1 className="font-display text-2xl font-semibold text-bone">Settings</h1>
        <p className="text-[13px] text-bone-muted">Manage your preferences, data, and account.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Appearance</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label>Dark mode</Label>
              <p className="text-[12px] text-bone-faint">CodeForge AI is designed dark-first.</p>
            </div>
            <Switch checked={theme !== "light"} onCheckedChange={(v) => setTheme(v ? "dark" : "light")} />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div>
              <Label>Animations</Label>
              <p className="text-[12px] text-bone-faint">Micro-interactions and transitions.</p>
            </div>
            <Switch checked={animations} onCheckedChange={setAnimations} />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Notifications</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-between">
          <div>
            <Label>Streak & goal reminders</Label>
            <p className="text-[12px] text-bone-faint">Get nudged before your streak breaks.</p>
          </div>
          <Switch checked={notifications} onCheckedChange={setNotifications} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Keyboard shortcuts</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {[
            ["Command palette", "⌘K"],
            ["Toggle theme", "⌘J"],
            ["Search", "/"],
          ].map(([label, key]) => (
            <div key={label} className="flex items-center justify-between text-[13px] text-bone-muted">
              {label}
              <kbd className="rounded border border-white/10 bg-white/[0.04] px-2 py-0.5 font-mono text-[11px]">{key}</kbd>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Data</CardTitle>
          <CardDescription>Your progress lives in this browser's local storage.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm" onClick={handleExport}>
            <Download className="h-3.5 w-3.5" /> Export progress
          </Button>
          <Button variant="outline" size="sm" onClick={handleImportClick}>
            <Upload className="h-3.5 w-3.5" /> Import progress
          </Button>
          <input ref={importInputRef} type="file" accept="application/json" className="hidden" onChange={handleImportFile} />
          <Button variant="outline" size="sm" onClick={handleReset} className="text-ember-400 hover:text-ember-300">
            <Trash2 className="h-3.5 w-3.5" /> Reset progress
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Account</CardTitle>
          <CardDescription>{user?.primaryEmailAddress?.emailAddress}</CardDescription>
        </CardHeader>
        <CardContent>
          <Button variant="outline" size="sm" onClick={() => signOut()}>
            Sign out
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
