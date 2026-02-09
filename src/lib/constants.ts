export const LANGUAGES = [
  { code: "auto", label: "Auto Detect", native: "🌐 Auto" },
  { code: "en", label: "English", native: "English" },
  { code: "hi", label: "Hindi", native: "हिन्दी" },
  { code: "hinglish", label: "Hinglish", native: "Hinglish" },
  { code: "ta", label: "Tamil", native: "தமிழ்" },
  { code: "te", label: "Telugu", native: "తెలుగు" },
  { code: "mr", label: "Marathi", native: "मराठी" },
  { code: "bn", label: "Bengali", native: "বাংলা" },
  { code: "kn", label: "Kannada", native: "ಕನ್ನಡ" },
  { code: "pa", label: "Punjabi", native: "ਪੰਜਾਬੀ" },
  { code: "gu", label: "Gujarati", native: "ગુજરાતી" },
] as const;

export type LanguageCode = typeof LANGUAGES[number]["code"];

export const TOPIC_CARDS = [
  {
    emoji: "🌾",
    title: "Crop Management",
    desc: "Best practices for sowing, irrigation, and harvesting across seasons.",
    prompt: "Tell me about crop management best practices for sowing, irrigation, and harvesting across seasons.",
  },
  {
    emoji: "🐛",
    title: "Pest & Disease",
    desc: "Identify pests and diseases, get treatment recommendations instantly.",
    prompt: "How can I identify common pests and diseases in my crops and what are the treatment recommendations?",
  },
  {
    emoji: "🌱",
    title: "Fertilizers & Soil",
    desc: "Soil health tips, fertilizer recommendations, and nutrient management.",
    prompt: "Give me soil health tips, fertilizer recommendations, and nutrient management advice.",
  },
  {
    emoji: "💰",
    title: "Government Schemes",
    desc: "Latest subsidies, schemes, and financial support for farmers.",
    prompt: "What are the latest government subsidies, schemes, and financial support available for farmers?",
  },
];

export const QUICK_PROMPTS = [
  { emoji: "🌾", text: "How to increase wheat yield?", hi: "गेहूं की पैदावार कैसे बढ़ाएं?" },
  { emoji: "🐛", text: "How to control pests naturally?", hi: "कीटों को प्राकृतिक रूप से कैसे नियंत्रित करें?" },
  { emoji: "🌱", text: "Best fertilizer for rice?", hi: "चावल के लिए सबसे अच्छा उर्वरक?" },
  { emoji: "💰", text: "PM-KISAN scheme details", hi: "पीएम-किसान योजना की जानकारी" },
  { emoji: "📸", text: "Upload a plant photo for diagnosis", hi: "रोग जांच के लिए पौधे की फोटो अपलोड करें" },
  { emoji: "💧", text: "Water management tips", hi: "जल प्रबंधन के सुझाव" },
  { emoji: "🌤️", text: "Weather impact on crops", hi: "फसलों पर मौसम का प्रभाव" },
  { emoji: "🏪", text: "How to get better market price?", hi: "बेहतर बाजार मूल्य कैसे प्राप्त करें?" },
];
