import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      appName: "Government Scheme Finder",
      heroTitle: "Find welfare schemes you may qualify for",
      heroSubtitle: "Enter a few details and discover relevant central and state schemes with documents, benefits, and official links.",
      checkEligibility: "Check Eligibility",
      reset: "Reset",
      allSchemes: "All Schemes",
      eligibleSchemes: "Eligible Schemes",
      noResults: "No eligible schemes found. Try reviewing your details or browse all schemes.",
      chatbot: "Scheme Assistant",
      askPlaceholder: "Ask: What schemes for students?",
      send: "Send",
      voice: "Voice input",
      listening: "Listening...",
      form: {
        age: "Age",
        gender: "Gender",
        state: "State",
        income: "Annual Income",
        category: "Category",
        occupation: "Occupation"
      },
      gender: { male: "Male", female: "Female", other: "Other" },
      category: { SC: "SC", ST: "ST", OBC: "OBC", General: "General" },
      sections: { benefits: "Benefits", eligibility: "Eligibility", documents: "Required Documents" },
      apply: "Apply"
    }
  },
  hi: {
    translation: {
      appName: "सरकारी योजना खोजक",
      heroTitle: "अपनी पात्रता के आधार पर योजनाएं खोजें",
      heroSubtitle: "कुछ जानकारी भरें और लाभ, दस्तावेजों और आधिकारिक लिंक के साथ उपयुक्त केंद्रीय और राज्य योजनाएं देखें।",
      checkEligibility: "पात्रता जांचें",
      reset: "रीसेट",
      allSchemes: "सभी योजनाएं",
      eligibleSchemes: "पात्र योजनाएं",
      noResults: "कोई पात्र योजना नहीं मिली। जानकारी जांचें या सभी योजनाएं देखें।",
      chatbot: "योजना सहायक",
      askPlaceholder: "पूछें: छात्रों के लिए कौन सी योजनाएं हैं?",
      send: "भेजें",
      voice: "वॉइस इनपुट",
      listening: "सुन रहा है...",
      form: {
        age: "आयु",
        gender: "लिंग",
        state: "राज्य",
        income: "वार्षिक आय",
        category: "श्रेणी",
        occupation: "व्यवसाय"
      },
      gender: { male: "पुरुष", female: "महिला", other: "अन्य" },
      category: { SC: "SC", ST: "ST", OBC: "OBC", General: "General" },
      sections: { benefits: "लाभ", eligibility: "पात्रता", documents: "आवश्यक दस्तावेज" },
      apply: "आवेदन करें"
    }
  }
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en",
  fallbackLng: "en",
  interpolation: { escapeValue: false }
});

export default i18n;
