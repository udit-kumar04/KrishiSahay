import { Languages } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { LANGUAGES, LanguageCode } from "@/lib/constants";

interface LanguageSelectorProps {
  value: LanguageCode;
  onChange: (value: LanguageCode) => void;
}

const LanguageSelector = ({ value, onChange }: LanguageSelectorProps) => {
  return (
    <div className="flex items-center gap-2">
      <Languages className="h-4 w-4 text-muted-foreground" />
      <Select value={value} onValueChange={(v) => onChange(v as LanguageCode)}>
        <SelectTrigger className="w-[140px] h-8 text-sm bg-background border-border">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {LANGUAGES.map((lang) => (
            <SelectItem key={lang.code} value={lang.code}>
              {lang.native}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default LanguageSelector;
