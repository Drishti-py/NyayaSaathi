import { DocumentItem, ProcessJourney, EvidenceRecord, TrustedHelper, TaskReminder, LanguageCode } from '../types';

// Mutation Notice (Form 135-D) localized data for all 11 supported languages
export function getSampleMutationDoc(lang: LanguageCode): DocumentItem {
  const dataMap: Record<LanguageCode, {
    title: string;
    whatIsThis: string;
    issuingAuthority: string;
    meaningSimple: string;
    actionableSteps: string[];
    importantDates: Array<{ label: string; date: string; isUrgent: boolean }>;
    importantNumbers: Array<{ label: string; value: string }>;
    whatToKeep: string[];
    safetyScreening: {
      category: 'consistent';
      statusLabel: string;
      explanation: string;
      warningSignals: string[];
      officialVerificationChannel: string;
    };
  }> = {
    hi: {
      title: 'जमीन की वारसाई नोटिस (फॉर्म 135-डी)',
      whatIsThis: 'जमीन की वारसाई / नाम दर्ज कराने की सरकारी नोटिस (फॉर्म 135-डी)',
      issuingAuthority: 'कार्यालय मामलतदार / तलाटी, राजस्व विभाग',
      meaningSimple: 'यह कोई जुर्माना या मुकदमा नहीं है। यह आपके पूर्वज की जमीन आपके नाम दर्ज कराने (म्यूटेशन) की सामान्य सरकारी सूचना है ताकि कोई आपत्ति हो तो 15 दिनों में दर्ज की जा सके।',
      actionableSteps: [
        'नोटिस में दी गई तारीख (15 अक्टूबर) से पहले तलाटी कार्यालय में उपस्थिति दर्ज करें।',
        'अपने पहचान पत्र (आधार कार्ड या पहचान पत्र) और मूल वारिसनामा की प्रति साथ रखें।',
        'तलाटी से मुहर लगी पावती (रसीद) अवश्य लें।',
      ],
      importantDates: [{ label: 'आपत्ति दर्ज कराने की अंतिम तिथि', date: '15 अक्टूबर 2026', isUrgent: true }],
      importantNumbers: [
        { label: 'केस / नोटिस क्रमांक', value: 'REV/2026/8492' },
        { label: 'सर्वे / खाता क्रमांक', value: 'खाता नं. 142/3' },
      ],
      whatToKeep: ['नोटिस की मूल प्रति', 'आवेदन की मुहरबंद रसीद (पावती)', 'तलाटी द्वारा दिया गया पावती नंबर'],
      safetyScreening: {
        category: 'consistent',
        statusLabel: 'उपलब्ध सरकारी संदर्भों के अनुसार सुसंगत प्रतीत होता है',
        explanation: 'इस नोटिस का प्रारूप, सरकारी शीर्षक, 15 दिन का नियत समय और मामलतदार कार्यालय का पता मानक राजस्व प्रक्रियाओं के अनुरूप है।',
        warningSignals: [],
        officialVerificationChannel: 'तहसीलदार / मामलतदार राजस्व सेवा केंद्र',
      },
    },
    en: {
      title: 'Land Mutation Notice (Form 135-D)',
      whatIsThis: 'Public Notice for Agricultural Land Title Succession (Form 135-D)',
      issuingAuthority: 'Office of Mamlatdar / Talati, Revenue Department',
      meaningSimple: 'This is not a penalty, fine, or legal lawsuit. It is a standard public notice to enter ancestral agricultural land in your name through succession. It allows 15 days for any stakeholder to raise objections if applicable.',
      actionableSteps: [
        'If you agree with the succession details, attend or submit confirmation at the Talati office before 15 October.',
        'Carry your identity proof (Aadhaar or Voter ID) and succession certificate copy.',
        'Always collect a stamped acknowledgment slip from the revenue officer.',
      ],
      importantDates: [{ label: 'Objection / Response Deadline', date: '15 October 2026', isUrgent: true }],
      importantNumbers: [
        { label: 'Notice / Case Number', value: 'REV/2026/8492' },
        { label: 'Khata / Survey Number', value: 'Survey No. 142/3' },
      ],
      whatToKeep: ['Original Notice Paper', 'Official stamped acknowledgment receipt', 'Application reference number and date'],
      safetyScreening: {
        category: 'consistent',
        statusLabel: 'Looks consistent with available references',
        explanation: 'The structure, revenue header, standard 15-day statutory window, and Talati office credentials align with standard state revenue protocols.',
        warningSignals: [],
        officialVerificationChannel: 'Talati-cum-Mantri or Mamlatdar Revenue Office',
      },
    },
    gu: {
      title: 'જમીન વારસાઈ નોટિસ (હકપત્રક નોંધ નં. ૧૩૫-ડી)',
      whatIsThis: 'જમીનની વારસાઈ નોંધણીની સરકારી નોટિસ (હકપત્રક નોંધ નં. ૧૩૫-ડી)',
      issuingAuthority: 'મામલતદાર / તલાટી કચેરી, મહેસૂલ વિભાગ',
      meaningSimple: 'આ કોઈ દંડ કે કોર્ટ કેસ નથી. આ તમારા વડીલોપાર્જિત જમીન તમારા નામે ચડાવવાની સામાન્ય કાયદેસર પ્રક્રિયા છે. જો કોઈને વાંધો હોય તો ૧૫ દિવસમાં જણાવવા નોટિસ અપાઈ છે.',
      actionableSteps: [
        'નોટિસમાં જણાવ્યા મુજબ ૧૫ ઓક્ટોબર પહેલા તલાટી કચેરીમાં હાજરી આપો અથવા સંમતિ પત્ર આપો.',
        'ઓળખપત્ર (આધાર કાર્ડ અથવા ચૂંટણી કાર્ડ) અને વારસાઈ પેઢીનામાની નકલ સાથે રાખો.',
        'તલાટી સાહેબ પાસેથી સિક્કાવાળી પહોંચ જરૂર મેળવી લો.',
      ],
      importantDates: [{ label: 'વાંધા અરજી કરવાની છેલ્લી તારીખ', date: '૧૫ ઓક્ટોબર ૨૦૨૬', isUrgent: true }],
      importantNumbers: [
        { label: 'નોંધ / નોટિસ ક્રમાંક', value: 'REV/2026/8492' },
        { label: 'સર્વે / ખાતા નંબર', value: 'ખાતા નં. ૧૪૨/૩' },
      ],
      whatToKeep: ['આ નોટિસનો અસલ કાગળ', 'તલાટી દ્વારા અપાતી સિક્કાવાળી પહોંચ', 'અરજી ક્રમાંક અને તારીખ'],
      safetyScreening: {
        category: 'consistent',
        statusLabel: 'ઉપલબ્ધ સરકારી સંદર્ભો સાથે સુસંગત જણાય છે',
        explanation: 'આ નોટિસનું માળખું, સરકારી શીર્ષક, ૧૫ દિવસનો વાંધા સમયગાળો અને તલાટી કચેરીની વિગતો સામાન્ય મહેસૂલી નિયમો મુજબ જણાય છે.',
        warningSignals: [],
        officialVerificationChannel: 'તાલુકા મામલતદાર કચેરી / જનસેવા કેન્દ્ર',
      },
    },
    bn: {
      title: 'জমির উত্তরাধিকার নামপত্তনের নোটিশ (ফর্ম ১৩৫-ডি)',
      whatIsThis: 'জমির উত্তরাধিকার নামপত্তনের সরকারি নোটিশ (ফর্ম ১৩৫-ডি)',
      issuingAuthority: 'রাজস্ব দপ্তর / তহশিলদার / পঞ্চায়েত কার্যালয়',
      meaningSimple: 'এটি কোনো জরিমানা বা আদালতের মামলা নয়। এটি আপনার পূর্বপুরুষের জমি আপনার নামে রেকর্ড (নামজারি বা মিউটেশন) করার একটি সাধারণ সরকারি প্রক্রিয়া। কারো আপত্তি থাকলে তা জানাতে এই নোটিশ দেওয়া হয়েছে।',
      actionableSteps: [
        'নোটিশে উল্লেখিত ১৫ অক্টোবরের পূর্বে তহশিলদার বা রাজস্ব কার্যালয়ে গিয়ে সম্মতি নিশ্চিত করুন।',
        'পরিচয়পত্র (আধার কার্ড বা ভোটার কার্ড) এবং ওয়ারিশান সনদের কপি সাথে রাখুন।',
        'আধিকারিকের কাছ থেকে সিলমোহরযুক্ত প্রাপ্তিস্বীকার পত্র (রসিদ) অবশ্যই গ্রহণ করুন।',
      ],
      importantDates: [{ label: 'আপত্তি জানানোর শেষ তারিখ', date: '১৫ অক্টোবর ২০২৬', isUrgent: true }],
      importantNumbers: [
        { label: 'কেস / নোটিশ নম্বর', value: 'REV/2026/8492' },
        { label: 'খতিয়ান / দাগ নম্বর', value: 'দাগ নং ১৪২/৩' },
      ],
      whatToKeep: ['মূল নোটিশের কাগজ', 'সিলমোহরযুক্ত প্রাপ্তিস্বীকার রসিদ', 'আবেদন নম্বর ও তারিখ'],
      safetyScreening: {
        category: 'consistent',
        statusLabel: 'সরকারি প্রামাণিক কাঠামোর সাথে সংগতিপূর্ণ',
        explanation: 'এই নোটিশের বিন্যাস, সরকারি রাজস্ব শিরোনাম, ১৫ দিনের সংবিধিবদ্ধ সময়সীমা এবং রাজস্ব কার্যালয়ের বিবরণ স্বাভাবিক নিয়মের সাথে সঙ্গতিপূর্ণ।',
        warningSignals: [],
        officialVerificationChannel: 'স্থানীয় তহশিলদার / রাজস্ব সহায়তা কেন্দ্র',
      },
    },
    mr: {
      title: 'जमिनीची वारसा नोंदणी सरकारी नोटीस (फॉर्म १३५-डी)',
      whatIsThis: 'जमिनीची वारसा नोंदणी सरकारी नोटीस (फॉर्म १३५-डी)',
      issuingAuthority: 'कार्यालय मामलेदार / तलाठी, महसूल विभाग',
      meaningSimple: 'हा कोणताही दंड किंवा न्यायालयीन खटला नाही. ही वडिलोपार्जित जमीन आपल्या नावावर वारसा हक्काने नोंदवण्याची (फेरफार नोंद) अधिकृत प्रक्रिया आहे. कोणाची काही हरकत असल्यास ती नोंदवण्यासाठी ही सूचना दिली आहे.',
      actionableSteps: [
        'नोटीसमध्ये नमूद केलेल्या १५ ऑक्टोबरच्या आधी तलाठी कार्यालयात संपर्क साधा.',
        'ओळखपत्र (आधार कार्ड / मतदान ओळखपत्र) आणि वारस दाखल्याची प्रत सोबत ठेवा.',
        'तलाठ्याकडून शिक्का असलेली पोचपावती (पावती) नक्की घ्या.',
      ],
      importantDates: [{ label: 'हरकत नोंदवण्याची अंतिम मुदत', date: '१५ ऑक्टोबर २०२६', isUrgent: true }],
      importantNumbers: [
        { label: 'केस / नोटीस क्रमांक', value: 'REV/2026/8492' },
        { label: 'खाते / सर्व्हे क्रमांक', value: 'सर्व्हे क्र. १४२/३' },
      ],
      whatToKeep: ['मूळ नोटीस कागदपत्र', 'अधिकृत शिक्का असलेली पोचपावती', 'अर्ज संदर्भ क्रमांक'],
      safetyScreening: {
        category: 'consistent',
        statusLabel: 'अधिकृत सरकारी नोंदीनुसार सुसंगत',
        explanation: 'या नोटीसचा नमुना, सरकारी महसूल मथळा, १५ दिवसांची कायदेशीर मुदत आणि तलाठी कार्यालयाचा पत्ता महसूल नियमांनुसार आहे.',
        warningSignals: [],
        officialVerificationChannel: 'तहसीलदार / मामलेदार महसूल जनसेवा केंद्र',
      },
    },
    ta: {
      title: 'நில வாரிசு உரிமை பெயர் மாற்ற அறிவிப்பு (படிவம் 135-D)',
      whatIsThis: 'நில வாரிசு உரிமை பெயர் மாற்ற அறிவிப்பு (படிவம் 135-D)',
      issuingAuthority: 'வட்டாட்சியர் / கிராம நிர்வாக அலுவலர் அலுவலகம், வருவாய்த்துறை',
      meaningSimple: 'இது எந்தவித அபராதமும் அல்லது நீதிமன்ற வழக்கும் அல்ல. உங்கள் பரம்பரை நிலத்தை உங்கள் பெயருக்கு பட்டா மாற்றம் செய்வதற்கான சாதாரண அரசாங்க நடைமுறையாகும். யாருக்காவது ஆட்சேபனை இருந்தால் 15 நாட்களுக்குள் தெரிவிக்க இந்த நோட்டீஸ் வழங்கப்பட்டுள்ளது.',
      actionableSteps: [
        'அறிவிப்பில் குறிப்பிட்டுள்ள அக்டோபர் 15-க்குள் கிராம நிர்வாக அலுவலர் (VAO) அலுவலகத்தில் ஆஜராகி உறுதிப்படுத்தவும்.',
        'அடையாள அட்டை (ஆதார் / வாக்காளர் அட்டை) மற்றும் வாரிசு சான்றிதழ் நகலை தயாராக வைத்திருக்கவும்.',
        'அதிகாரியிடம் இருந்து முத்திரையிடப்பட்ட ரசீதை (ஒப்புகை சீட்டு) கட்டாயம் பெற்றுக்கொள்ளவும்.',
      ],
      importantDates: [{ label: 'ஆட்சேபனை தெரிவிக்க கடைசி நாள்', date: '15 அக்டோபர் 2026', isUrgent: true }],
      importantNumbers: [
        { label: 'நோட்டீஸ் / வழக்கு எண்', value: 'REV/2026/8492' },
        { label: 'சர்வே / பட்டா எண்', value: 'சர்வே எண் 142/3' },
      ],
      whatToKeep: ['அசல் நோட்டீஸ் கடிதம்', 'முத்திரையிடப்பட்ட அதிகாரப்பூர்வ ரசீது', 'விண்ணப்ப பதிவு எண்'],
      safetyScreening: {
        category: 'consistent',
        statusLabel: 'அரசாங்க நடைமுறைகளுடன் பொருந்தி வருகின்றது',
        explanation: 'நோட்டீஸின் வடிவம், வருவாய்த்துறை தலைப்பு, 15 நாட்கள் அவகாசம் ஆகியவை அதிகாரப்பூர்வ நில நிர்வாக விதிகளுடன் ஒத்துப்போகின்றன.',
        warningSignals: [],
        officialVerificationChannel: 'வட்டாட்சியர் / இ-சேவை மையம்',
      },
    },
    te: {
      title: 'భూమి వారసత్వ హక్కు నమోదు నోటీసు (ఫారం 135-D)',
      whatIsThis: 'భూమి వారసత్వ హక్కు నమోదు నోటీసు (ఫారం 135-D)',
      issuingAuthority: 'తహశీల్దార్ / గ్రామ రెవెన్యూ అధికారి కార్యాలయం, రెవెన్యూ విభాగం',
      meaningSimple: 'ఇది ఎటువంటి జరిమానా లేదా కోర్టు కేసు కాదు. మీ పూర్వీకుల వ్యవసాయ భూమిని మీ పేరుపై నమోదు చేయడానికి (మ్యుటేషన్) సంబంధించిన సాధారణ ప్రభుత్వ ప్రక్రియ. ఎవరికైనా అభ్యంతరం ఉంటే తెలియజేయడానికి ఈ నోటీసు ఇచ్చారు.',
      actionableSteps: [
        'నోటీసులో పేర్కొన్న అక్టోబర్ 15 లోపు తహశీల్దార్ లేదా వీఆర్వో కార్యాలయంలో సంప్రదించండి.',
        'గుర్తింపు కార్డు (ఆధార్ లేదా ఓటర్ ఐడీ) మరియు వారసత్వ ధృవీకరణ పత్రం ప్రతిని సిద్ధంగా ఉంచుకోండి.',
        'అధికారి నుండి అధికారిక స్టాంప్ వేసిన రసీదును తప్పనిసరిగా తీసుకోండి.',
      ],
      importantDates: [{ label: 'అభ్యంతరం తెలపడానికి చివరి తేదీ', date: '15 అక్టోబర్ 2026', isUrgent: true }],
      importantNumbers: [
        { label: 'కేసు / నోటీసు సంఖ్య', value: 'REV/2026/8492' },
        { label: 'సర్వే / ఖాతా సంఖ్య', value: 'సర్వే నం. 142/3' },
      ],
      whatToKeep: ['అసలు నోటీసు కాగితం', 'స్టాంప్ వేసిన అధికారిక రసీదు', 'దరఖాస్తు సంఖ్య'],
      safetyScreening: {
        category: 'consistent',
        statusLabel: 'అధికారిక ప్రభుత్వ రికార్డులకు అనుగుణంగా ఉంది',
        explanation: 'నోటీసు రూపకల్పన, రెవెన్యూ శాఖ హెడర్, 15 రోజుల చట్టబద్ధమైన గడువు ప్రభుత్వ నిబంధనలకు అనుగుణంగా ఉన్నాయి.',
        warningSignals: [],
        officialVerificationChannel: 'తహశీల్దార్ / మీసేవ కేంద్రం',
      },
    },
    kn: {
      title: 'ಭೂಮಿ ವಾರಸುದಾರಿಕೆ ಹಕ್ಕು ದಾಖಲಾತಿ ನೋಟಿಸ್ (ಫಾರ್ಮ್ 135-ಡಿ)',
      whatIsThis: 'ಭೂಮಿ ವಾರಸುದಾರಿಕೆ ಹಕ್ಕು ದಾಖಲಾತಿ ನೋಟಿಸ್ (ಫಾರ್ಮ್ 135-ಡಿ)',
      issuingAuthority: 'ತಹಶೀಲ್ದಾರ್ / ಗ್ರಾಮ ಲೆಕ್ಕಿಗರ ಕಾರ್ಯಾಲಯ, ಕಂದಾಯ ಇಲಾಖೆ',
      meaningSimple: 'ಇದು ಯಾವುದೇ ದಂಡ ಅಥವಾ ನ್ಯಾಯಾಲಯದ ಮೊಕದ್ದಮೆ ಅಲ್ಲ. ನಿಮ್ಮ ಪೂರ್ವಜರ ಭೂಮಿಯನ್ನು ನಿಮ್ಮ ಹೆಸರಿಗೆ ವರ್ಗಾಯಿಸುವ (ಫೌತಿ ಖಾತೆ ಬದಲಾವಣೆ) ಸಾಮಾನ್ಯ ಕಾನೂನುಬದ್ಧ ಪ್ರಕ್ರಿಯೆಯಾಗಿದೆ.',
      actionableSteps: [
        'ನೋಟಿಸ್‌ನಲ್ಲಿ ತಿಳಿಸಲಾದ ಅಕ್ಟೋಬರ್ 15 ಕ್ಕಿಂತ ಮೊದಲು ಕಂದಾಯ ಕಚೇರಿಗೆ ಭೇಟಿ ನೀಡಿ.',
        'ಗುರುತಿನ ಚೀಟಿ (ಆಧಾರ್ ಅಥವಾ ಮತದಾರರ ಚೀಟಿ) ಮತ್ತು ವಾರಸುದಾರಿಕೆ ಪ್ರಮಾಣಪತ್ರವನ್ನು ಜೊತೆಯಲ್ಲಿಟ್ಟುಕೊಳ್ಳಿ.',
        'ಅಧಿಕಾರಿಯಿಂದ ಅಧಿಕೃತ ಮೊಹರು ಮಾಡಿದ ಸ್ವೀಕೃತಿ ಪಾವತಿಯನ್ನು ತಪ್ಪದೇ ಪಡೆಯಿರಿ.',
      ],
      importantDates: [{ label: 'ಆಕ್ಷೇಪಣೆ ಸಲ್ಲಿಸಲು ಕೊನೆಯ ದಿನಾಂಕ', date: '15 ಅಕ್ಟೋಬರ್ 2026', isUrgent: true }],
      importantNumbers: [
        { label: 'ಪ್ರಕರಣ / ನೋಟಿಸ್ ಸಂಖ್ಯೆ', value: 'REV/2026/8492' },
        { label: 'ಸರ್ವೇ / ಖಾತೆ ಸಂಖ್ಯೆ', value: 'ಸರ್ವೇ ನಂ. 142/3' },
      ],
      whatToKeep: ['ಮೂಲ ನೋಟಿಸ್ ಪ್ರತಿ', 'ಮೊಹರು ಮಾಡಿದ ರಸೀದಿ', 'ಅರ್ಜಿ ಸಂಖ್ಯೆ'],
      safetyScreening: {
        category: 'consistent',
        statusLabel: 'ಸರ್ಕಾರಿ ಮಾನದಂಡಗಳೊಂದಿಗೆ ಹೊಂದಿಕೆಯಾಗುತ್ತಿದೆ',
        explanation: 'ಈ ನೋಟಿಸ್‌ನ ನಮೂನೆ, ಕಂದಾಯ ಶೀರ್ಷಿಕೆ ಮತ್ತು 15 ದಿನಗಳ ಕಾನೂನುಬದ್ಧ ಗಡುವು ನಿಯಮಾನುಸಾರವಾಗಿದೆ.',
        warningSignals: [],
        officialVerificationChannel: 'ತಹಶೀಲ್ದಾರ್ ಕಾರ್ಯಾಲಯ / ನಾಡಕಚೇರಿ',
      },
    },
    ml: {
      title: 'ഭൂമി അനന്തരാവകാശ പോക്കുവരവ് നോട്ടീസ് (ഫോം 135-ഡി)',
      whatIsThis: 'ഭൂമി അനന്തരാവകാശ പോക്കുവരവ് നോട്ടീസ് (ഫോം 135-ഡി)',
      issuingAuthority: 'തഹസിൽദാർ / വില്ലേജ് ഓഫീസ്, റവന്യൂ വകുപ്പ്',
      meaningSimple: 'ഇതൊരു പിഴയോ കോടതി കേസുകളോ അല്ല. കുടുംബ സ്വത്ത് നിങ്ങളുടെ പേരിലേക്ക് പോക്കുവരവ് ചെയ്യുന്നതിനുള്ള (മ്യൂട്ടേഷൻ) സാധാരണ സർക്കാർ അറിയിപ്പാണ്. ആർക്കെങ്കിലും തടസ്സവാദങ്ങൾ ഉണ്ടെങ്കിൽ അറിയിക്കാനാണ് ഈ നോട്ടീസ്.',
      actionableSteps: [
        'നോട്ടീസിൽ പറഞ്ഞിരിക്കുന്ന ഒക്ടോബർ 15-ന് മുൻപായി വില്ലേജ് ഓഫീസിൽ വിവരങ്ങൾ അറിയിക്കുക.',
        'തിരിച്ചറിയൽ രേഖ (ആധാർ / വോട്ടർ ഐഡി), അവകാശ സർട്ടിഫിക്കറ്റ് എന്നിവ കൂടെ കരുതുക.',
        'ഉദ്യോഗസ്ഥനിൽ നിന്ന് മുദ്ര പതിപ്പിച്ച കൈപ്പറ്റ് രസീത് നിർബന്ധമായും വാങ്ങുക.',
      ],
      importantDates: [{ label: 'തടസ്സവാദം ബോധിപ്പിക്കാനുള്ള അവസാന തീയതി', date: '15 ഒക്ടോബർ 2026', isUrgent: true }],
      importantNumbers: [
        { label: 'നോട്ടീസ് / കേസ് നമ്പർ', value: 'REV/2026/8492' },
        { label: 'സർവേ നമ്പർ / തണ്ടപ്പേര്', value: 'സർവേ നം. 142/3' },
      ],
      whatToKeep: ['അസ്സൽ നോട്ടീസ്', 'മുദ്ര പതിപ്പിച്ച രസീത്', 'അപേക്ഷാ നമ്പർ'],
      safetyScreening: {
        category: 'consistent',
        statusLabel: 'ഔദ്യോഗിക സർക്കാർ ചട്ടങ്ങൾക്ക് അനുസൃതമാണ്',
        explanation: 'നോട്ടീസിന്റെ ഘടന, റവന്യൂ ശീർഷകം, 15 ദിവസത്തെ സമയം എന്നിവ ഔദ്യോഗിക ചട്ടങ്ങളുമായി യോജിക്കുന്നു.',
        warningSignals: [],
        officialVerificationChannel: 'താലൂക്ക് ഓഫീസ് / വില്ലേജ് അക്ഷയ കേന്ദ്രം',
      },
    },
    pa: {
      title: 'ਜ਼ਮੀਨ ਦੀ ਵਰਾਸਤ / ਇੰਤਕਾਲ ਸਬੰਧੀ ਸਰਕਾਰੀ ਨੋਟਿਸ (ਫ਼ਾਰਮ 135-ਡੀ)',
      whatIsThis: 'ਜ਼ਮੀਨ ਦੀ ਵਰਾਸਤ / ਇੰਤਕਾਲ ਸਬੰਧੀ ਸਰਕਾਰੀ ਨੋਟਿਸ (ਫ਼ਾਰਮ 135-ਡੀ)',
      issuingAuthority: 'ਤਹਿਸੀਲਦਾਰ / ਪਟਵਾਰੀ ਦਫ਼ਤਰ, ਮਾਲ ਵਿਭਾਗ',
      meaningSimple: 'ਇਹ ਕੋਈ ਜੁਰਮਾਨਾ ਜਾਂ ਅਦਾਲਤੀ ਕੇਸ ਨਹੀਂ ਹੈ। ਇਹ ਤੁਹਾਡੀ ਜੱਦੀ ਜ਼ਮੀਨ ਤੁਹਾਡੇ ਨਾਮ ਤੇ ਚੜ੍ਹਾਉਣ (ਇੰਤਕਾਲ ਦਰਜ ਕਰਨ) ਦੀ ਆਮ ਸਰਕਾਰੀ ਪ੍ਰਕਿਰਿਆ ਹੈ। ਜੇਕਰ ਕਿਸੇ ਨੂੰ ਕੋਈ ਇਤਰਾਜ਼ ਹੋਵੇ ਤਾਂ 15 ਦਿਨਾਂ ਵਿੱਚ ਦੱਸਣ ਲਈ ਇਹ ਨੋਟਿਸ ਜਾਰੀ ਕੀਤਾ ਗਿਆ ਹੈ।',
      actionableSteps: [
        'ਨੋਟਿਸ ਮੁਤਾਬਕ 15 ਅਕਤੂਬਰ ਤੋਂ ਪਹਿਲਾਂ ਪਟਵਾਰੀ ਜਾਂ ਤਹਿਸੀਲ ਦਫ਼ਤਰ ਵਿੱਚ ਸੰਪਰਕ ਕਰੋ।',
        'ਆਪਣਾ ਪਛਾਣ ਪੱਤਰ (ਆਧਾਰ ਕਾਰਡ) ਅਤੇ ਵਾਰਸਨਾਮੇ ਦੀ ਨਕਲ ਨਾਲ ਰੱਖੋ।',
        'ਅਧਿਕਾਰੀ ਕੋਲੋਂ ਮੋਹਰ ਲੱਗੀ ਹੋਈ ਰਸੀਦ (ਪਹੁੰਚ) ਜ਼ਰੂਰ ਲਵੋ।',
      ],
      importantDates: [{ label: 'ਇਤਰਾਜ਼ ਦਰਜ ਕਰਨ ਦੀ ਆਖ਼ਰੀ ਮਿਤੀ', date: '15 ਅਕਤੂਬਰ 2026', isUrgent: true }],
      importantNumbers: [
        { label: 'ਕੇਸ / ਨੋਟਿਸ ਨੰਬਰ', value: 'REV/2026/8492' },
        { label: 'ਖੇਵਟ / ਖਸਰਾ ਨੰਬਰ', value: 'ਖਸਰਾ ਨੰ. 142/3' },
      ],
      whatToKeep: ['ਅਸਲ ਨੋਟਿਸ ਕਾਗਜ਼', 'ਮੋਹਰ ਲੱਗੀ ਹੋਈ ਸਰਕਾਰੀ ਰਸੀਦ', 'ਦਰਖਾਸਤ ਨੰਬਰ'],
      safetyScreening: {
        category: 'consistent',
        statusLabel: 'ਸਰਕਾਰੀ ਨਿਯਮਾਂ ਅਨੁਸਾਰ ਬਿਲਕੁਲ ਠੀਕ ਜਾਪਦਾ ਹੈ',
        explanation: 'ਨੋਟਿਸ ਦਾ ਫਾਰਮੈਟ, ਮਾਲ ਵਿਭਾਗ ਦਾ ਸਿਰਲੇਖ ਅਤੇ 15 ਦਿਨਾਂ ਦੀ ਕਾਨੂੰਨੀ ਮਿਆਦ ਮਿਆਰੀ ਪ੍ਰਕਿਰਿਆ ਅਨੁਸਾਰ ਹੈ।',
        warningSignals: [],
        officialVerificationChannel: 'ਤਹਿਸੀਲਦਾਰ / ਫ਼ਰਦ ਕੇਂਦਰ / ਸੇਵਾ ਕੇਂਦਰ',
      },
    },
    or: {
      title: 'ଜମି ଉତ୍ତରାଧିକାର ନାମଜାରୀ ସରକାରୀ ନୋଟିସ (ଫର୍ମ ୧୩୫-ଡି)',
      whatIsThis: 'ଜମି ଉତ୍ତରାଧିକାର ନାମଜାରୀ ସରକାରୀ ନୋଟିସ (ଫର୍ମ ୧୩୫-ଡି)',
      issuingAuthority: 'ତହସିଲଦାର / ରାଜସ୍ୱ ନିରୀକ୍ଷକ (RI) କାର୍ଯ୍ୟାଳୟ, ରାଜସ୍ୱ ବିଭାଗ',
      meaningSimple: 'ଏହା କୌଣସି ଜରିମାନା କିମ୍ବା ମକଦ୍ଦମା ନୁହେଁ। ଏହା ଆପଣଙ୍କ ପୈତୃକ ଜମି ଆପଣଙ୍କ ନାମରେ ରେକର୍ଡ (ମ୍ୟୁଟେସନ) କରିବାର ସାଧାରଣ ସରକାରୀ ପ୍ରକ୍ରିୟା। ଯଦି କାହାର ଆପତ୍ତି ଥାଏ ତେବେ ଜଣାଇବା ପାଇଁ ଏହି ନୋଟିସ ଦିଆଯାଇଛି।',
      actionableSteps: [
        'ନୋଟିସ ଅନୁଯାୟୀ ୧୫ ଅକ୍ଟୋବର ପୂର୍ବରୁ ତହସିଲ କିମ୍ବା RI କାର୍ଯ୍ୟାଳୟରେ ଯୋଗାଯୋଗ କରନ୍ତୁ।',
        'ପରିଚୟ ପତ୍ର (ଆଧାର କାର୍ଡ) ଏବଂ ଉତ୍ତରାଧିକାର ପ୍ରମାଣପତ୍ରର ନକଲ ସାଥିରେ ରଖନ୍ତୁ।',
        'ଅଧିକାରୀଙ୍କଠାରୁ ସିଲ୍ ମୋହର ଥିବା ରସିଦ ନିଶ୍ଚିତ ଭାବେ ସଂଗ୍ରହ କରନ୍ତୁ।',
      ],
      importantDates: [{ label: 'ଆପତ୍ତି ଦାଖଲ କରିବାର ଶେଷ ତାରିଖ', date: '୧୫ ଅକ୍ଟୋବର ୨୦୨୬', isUrgent: true }],
      importantNumbers: [
        { label: 'କେସ / ନୋଟିସ ନମ୍ବର', value: 'REV/2026/8492' },
        { label: 'ଖାତା / ପ୍ଲଟ ନମ୍ବର', value: 'ପ୍ଲଟ ନଂ. ୧୪୨/୩' },
      ],
      whatToKeep: ['ମୂଳ ନୋଟିସ କାଗଜ', 'ସିଲ୍ ଥିବା ଅଫିସିଆଲ ରସିଦ', 'ଦରଖାସ୍ତ ନମ୍ବର'],
      safetyScreening: {
        category: 'consistent',
        statusLabel: 'ସରକାରୀ ନିୟମାନୁଯାୟୀ ଠିକ୍ ଜଣାପଡୁଛି',
        explanation: 'ନୋଟିସର ଢାଞ୍ଚା, ରାଜସ୍ୱ ବିଭାଗ ଶୀର୍ଷକ, ୧୫ ଦିନର ସମୟସୀମା ସାଧାରଣ ନିୟମ ସହିତ ମେଳ ଖାଉଛି।',
        warningSignals: [],
        officialVerificationChannel: 'ତହସିଲଦାର କାର୍ଯ୍ୟାଳୟ / ଜନସେବା କେନ୍ଦ୍ର',
      },
    },
  };

  const item = dataMap[lang] || dataMap.hi;
  return {
    id: 'doc-mutation-001',
    title: item.title,
    originalFileName: 'Notice_Form_135D_Talati_Office.pdf',
    uploadedAt: '2026-09-24',
    sampleType: 'mutation_notice',
    isDemoNotice: true,
    analysis: {
      whatIsThis: item.whatIsThis,
      issuingAuthority: item.issuingAuthority,
      meaningSimple: item.meaningSimple,
      actionableSteps: item.actionableSteps,
      importantDates: item.importantDates,
      importantNumbers: item.importantNumbers,
      whatToKeep: item.whatToKeep,
      safetyScreening: item.safetyScreening,
    },
  };
}

// Suspicious Notice localized data for all 11 supported languages
export function getSampleSuspiciousDoc(lang: LanguageCode): DocumentItem {
  const dataMap: Record<LanguageCode, {
    title: string;
    whatIsThis: string;
    issuingAuthority: string;
    meaningSimple: string;
    actionableSteps: string[];
    importantDates: Array<{ label: string; date: string; isUrgent: boolean }>;
    importantNumbers: Array<{ label: string; value: string }>;
    whatToKeep: string[];
    safetyScreening: {
      category: 'warning_signs';
      statusLabel: string;
      explanation: string;
      warningSignals: string[];
      officialVerificationChannel: string;
    };
  }> = {
    hi: {
      title: 'संदिग्ध मांग पत्र (24 घंटे में पैसे जमा करने का नोटिस)',
      whatIsThis: 'अवैध वसूली / संदिग्ध नोटिस',
      issuingAuthority: 'अज्ञात निजी मोबाइल नंबर व अनधिकृत खाता',
      meaningSimple: 'इस पत्र में 24 घंटे के भीतर सीधे यूपीआई पर ₹12,500 जमा करने की धमकी दी गई है। सरकारी विभाग कभी भी निजी यूपीआई पर पैसे नहीं मांगते।',
      actionableSteps: [
        'किसी भी निजी यूपीआई या खाते में पैसे न भेजें।',
        'अपने नजदीकी तहसील या पंचायत कार्यालय में जाकर इस नोटिस की जांच कराएं।',
        'साइबर हेल्पलाइन 1930 या नजदीकी पुलिस थाने में शिकायत दर्ज कराएं।',
      ],
      importantDates: [{ label: 'धमकी भरी समय सीमा', date: '24 घंटे के अंदर', isUrgent: true }],
      importantNumbers: [
        { label: 'संदिग्ध यूपीआई आईडी', value: 'revenue-dept-pay@okaxis' },
        { label: 'मोबाइल नंबर', value: '+91 99099 XXXXX' },
      ],
      whatToKeep: ['इस पत्र की मूल प्रति सुरक्षित रखें, किसी को न सौंपें।'],
      safetyScreening: {
        category: 'warning_signs',
        statusLabel: 'मजबूत चेतावनी संकेत — तुरंत आधिकारिक कार्यालय से जांचें',
        explanation: 'इस पत्र में निजी यूपीआई पर तुरंत पैसे जमा करने का दबाव और धमकी है, जो सामान्य सरकारी प्रक्रिया के विपरीत है।',
        warningSignals: [
          '24 घंटे में भुगतान न करने पर जमीन जब्ती की धमकी',
          'सरकारी मुहर के स्थान पर निजी मोबाइल नंबर',
          'अनधिकृत यूपीआई पेमेंट पता',
        ],
        officialVerificationChannel: 'स्थानीय तहसील / ब्लॉक विकास कार्यालय',
      },
    },
    en: {
      title: 'Suspicious 24-Hour Payment Demand Letter',
      whatIsThis: 'Suspicious Financial Demand Notice',
      issuingAuthority: 'Unverified Private UPI / Mobile Number',
      meaningSimple: 'This letter threatens property seizure unless ₹12,500 is paid within 24 hours to a private UPI handle. Government revenue departments never demand immediate payment through personal UPI addresses.',
      actionableSteps: [
        'Do NOT send any money to the personal UPI or bank account.',
        'Visit your local Tehsil or Talati office to verify this document.',
        'Report this number to the national cyber helpline (1930) or local police.',
      ],
      importantDates: [{ label: 'Urgent Payment Demand', date: 'Within 24 Hours', isUrgent: true }],
      importantNumbers: [
        { label: 'Suspicious UPI ID', value: 'revenue-dept-pay@okaxis' },
        { label: 'Mobile Number', value: '+91 99099 XXXXX' },
      ],
      whatToKeep: ['Keep the original paper safely as physical evidence.'],
      safetyScreening: {
        category: 'warning_signs',
        statusLabel: 'Strong warning signs — verify with official authority',
        explanation: 'Contains urgent threats of auction and demands direct payment to a private UPI handle, which violates standard government procedure.',
        warningSignals: [
          'Immediate 24-hour threat of property auction',
          'Private mobile number instead of official office telephone',
          'Non-government personal UPI handle for revenue collection',
        ],
        officialVerificationChannel: 'Sub-Divisional Magistrate / Tehsil Revenue Office',
      },
    },
    gu: {
      title: 'શંકાસ્પદ તાત્કાલિક નોટિસ (૨૪ કલાકમાં પૈસા માંગતો પત્ર)',
      whatIsThis: 'શંકાસ્પદ નાણાકીય માંગણી નોટિસ',
      issuingAuthority: 'અજાણ્યો ખાનગી નંબર અને ખાનગી યુપીઆઈ આઈડી',
      meaningSimple: 'આ પત્રમાં ૨૪ કલાકમાં ₹૧૨,૫૦૦ અંગત યુપીઆઈ પર જમા નહીં કરો તો જમીન હરાજી કરવાની ધમકી આપી છે. સરકારી કચેરીઓ ક્યારેય અંગત યુપીઆઈ પર પૈસા માંગતી નથી.',
      actionableSteps: [
        'કોઈપણ સંજોગોમાં અંગત યુપીઆઈ પર પૈસા મોકલશો નહીં.',
        'તમારા ગામના તલાટી અથવા તાલુકા મામલતદાર કચેરી જઈને આ કાગળની ખરાઈ કરો.',
        'સાયબર હેલ્પલાઇન ૧૯૩૦ પર આ શંકાસ્પદ નંબરની જાણ કરો.',
      ],
      importantDates: [{ label: 'ધમકીભરી મુદત', date: '૨૪ કલાકમાં (તાત્કાલિક)', isUrgent: true }],
      importantNumbers: [
        { label: 'શંકાસ્પદ યુપીઆઈ આઈડી', value: 'revenue-dept-pay@okaxis' },
        { label: 'મોબાઈલ નંબર', value: '+91 99099 XXXXX' },
      ],
      whatToKeep: ['આ પત્રની મૂળ પ્રત સાચવીને રાખો (પોલીસ ફરિયાદ કે પુરાવા માટે)'],
      safetyScreening: {
        category: 'warning_signs',
        statusLabel: 'મજબૂત ચેતવણી સંકેતો — સત્તાવાર કચેરીથી ચકાસો',
        explanation: 'આ કાગળમાં તાત્કાલિક પૈસા ભરવાની ધમકી અને અંગત યુપીઆઈ છે, જે સામાન્ય સરકારી નિયમ નથી.',
        warningSignals: [
          '૨૪ કલાકમાં પૈસા ન ભરો તો જમીન જપ્તીની ધમકી',
          'અધિકૃત સરકારી લેટરપેડના બદલે ખાનગી મોબાઈલ નંબર',
          'ખાનગી યુપીઆઈ દ્વારા નાણાંની માંગણી',
        ],
        officialVerificationChannel: 'તાલુકા મામલતદાર કચેરી / જનસેવા કેન્દ્ર',
      },
    },
    bn: {
      title: 'সন্দেহজনক ২৪ ঘণ্টার অর্থ দাবি নোটিশ',
      whatIsThis: 'অবৈধ অর্থ দাবি / সন্দেহজনক নোটিশ',
      issuingAuthority: 'অজ্ঞাত ব্যক্তিগত মোবাইল নম্বর ও অননুমোদিত ইউপিআই',
      meaningSimple: 'এই চিঠিতে ২৪ ঘণ্টার মধ্যে একটি ব্যক্তিগত ইউপিআই নম্বরে ₹১২,৫০০ জমা না দিলে জমি বাজেয়াপ্তের হুমকি দেওয়া হয়েছে। সরকারি দপ্তর কখনোই ব্যক্তিগত ইউপিআইতে টাকা দাবি করে না।',
      actionableSteps: [
        'কোনো অবস্থাতেই ব্যক্তিগত ইউপিআই বা অ্যাকাউন্টে টাকা পাঠাবেন না।',
        'স্থানীয় তহশিলদার বা পঞ্চায়েত অফিসে গিয়ে এই চিঠির সত্যতা যাচাই করুন।',
        'জাতীয় সাইবার হেল্পলাইন ১৯৩০ বা নিকটস্থ থানায় অভিযোগ দায়ের করুন।',
      ],
      importantDates: [{ label: 'হুমকিমূলক সময়সীমা', date: '২৪ ঘণ্টার মধ্যে', isUrgent: true }],
      importantNumbers: [
        { label: 'সন্দেহজনক ইউপিআই আইডি', value: 'revenue-dept-pay@okaxis' },
        { label: 'মোবাইল নম্বর', value: '+91 99099 XXXXX' },
      ],
      whatToKeep: ['এই চিঠির মূল কপিটি প্রমাণের জন্য নিরাপদে সংরক্ষণ করুন।'],
      safetyScreening: {
        category: 'warning_signs',
        statusLabel: 'কঠোর সতর্কবার্তা সংকেত — সরকারি দপ্তর থেকে যাচাই করুন',
        explanation: 'এতে অবিলম্বে অর্থ প্রদানের চাপ ও জমি নিলামের হুমকি রয়েছে, যা সরকারি বিধিবহির্ভূত।',
        warningSignals: [
          '২৪ ঘণ্টার মধ্যে জমি নিলামের হুমকি',
          'সরকারি সিলের পরিবর্তে ব্যক্তিগত মোবাইল নম্বর',
          'ব্যক্তিগত ইউপিআই ঠিকানায় টাকা দাবি',
        ],
        officialVerificationChannel: 'স্থানীয় মহকুমা শাসক / তহশিল রাজস্ব কার্যালয়',
      },
    },
    mr: {
      title: 'संशयास्पद मागणी पत्र (२४ तासांत पैसे भरण्याची नोटीस)',
      whatIsThis: 'संशयास्पद आर्थिक मागणी नोटीस',
      issuingAuthority: 'अज्ञात खाजगी मोबाईल क्रमांक व अनधिकृत यूपीआय',
      meaningSimple: 'या पत्रात २४ तासांत खाजगी यूपीआयवर ₹१२,५०० न भरल्यास जमीन जप्तीची धमकी दिली आहे. सरकारी कार्यालये कधीही खाजगी यूपीआयवर पैसे मागत नाहीत.',
      actionableSteps: [
        'कोणत्याही परिस्थितीत खाजगी यूपीआयवर पैसे पाठवू नका.',
        'आपल्या गावातील तलाठी किंवा तहसील कार्यालयात जाऊन खात्री करा.',
        'सायबर हेल्पलाईन १९३० किंवा जवळच्या पोलीस ठाण्यात तक्रार करा.',
      ],
      importantDates: [{ label: 'धमकीची मुदत', date: '२४ तासांच्या आत', isUrgent: true }],
      importantNumbers: [
        { label: 'संशयास्पद यूपीआय आयडी', value: 'revenue-dept-pay@okaxis' },
        { label: 'मोबाईल क्रमांक', value: '+91 99099 XXXXX' },
      ],
      whatToKeep: ['हे मूळ पत्र पुराव्यासाठी सुरक्षित ठेवा.'],
      safetyScreening: {
        category: 'warning_signs',
        statusLabel: 'धोक्याचे तीव्र संकेत — अधिकृत कार्यालयातून खात्री करा',
        explanation: 'या पत्रात तातडीने पैसे भरण्याचा दबाव आणि खाजगी यूपीआय दिला आहे, जे सरकारी नियमांच्या विरुद्ध आहे.',
        warningSignals: [
          '२४ तासांत पैसे न भरल्यास जमीन जप्तीची धमकी',
          'अधिकृत सरकारी शिक्क्याऐवजी खाजगी मोबाईल नंबर',
          'खाजगी यूपीआयद्वारे पैशांची मागणी',
        ],
        officialVerificationChannel: 'तहसीलदार कार्यालय / महसूल जनसेवा केंद्र',
      },
    },
    ta: {
      title: 'சந்தேகத்திற்கிடமான 24 மணி நேர பணக்கோரிக்கை கடிதம்',
      whatIsThis: 'சட்டவிரோத பணப்பறிப்பு / சந்தேகத்திற்கிடமான அறிவிப்பு',
      issuingAuthority: 'அடையாளம் தெரியாத தனிநபர் மொபைல் எண் & யுபிஐ',
      meaningSimple: 'இந்தக் கடிதத்தில் 24 மணி நேரத்திற்குள் ஒரு தனிநபர் யுபிஐ-க்கு ₹12,500 கட்டவில்லை என்றால் நிலம் ஏலம் விடப்படும் என்று மிரட்டப்பட்டுள்ளது. அரசு அலுவலகங்கள் ஒருபோதும் தனிநபர் யுபிஐ-க்கு பணம் கேட்காது.',
      actionableSteps: [
        'எந்தவொரு சூழ்நிலையிலும் தனிநபர் யுபிஐ அல்லது வங்கிக் கணக்கிற்கு பணம் அனுப்பாதீர்கள்.',
        'உங்கள் உள்ளூர் வட்டாட்சியர் அல்லது கிராம நிர்வாக அலுவலகத்திற்குச் சென்று இதை சரிபார்க்கவும்.',
        'சைபர் உதவி எண் 1930 அல்லது காவல் நிலையத்தில் புகார் அளிக்கவும்.',
      ],
      importantDates: [{ label: 'அச்சுறுத்தல் அவகாசம்', date: '24 மணி நேரத்திற்குள்', isUrgent: true }],
      importantNumbers: [
        { label: 'சந்தேகத்திற்கிடமான யுபிஐ', value: 'revenue-dept-pay@okaxis' },
        { label: 'மொபைல் எண்', value: '+91 99099 XXXXX' },
      ],
      whatToKeep: ['இந்தக் கடிதத்தை ஆதாரமாக பத்திரமாக வைத்திருக்கவும்.'],
      safetyScreening: {
        category: 'warning_signs',
        statusLabel: 'தீவிர எச்சரிக்கை அறிகுறிகள் — அதிகாரப்பூர்வ அலுவலகத்தில் சரிபார்க்கவும்',
        explanation: 'உடனடி பண மிரட்டல் மற்றும் தனிநபர் யுபிஐ முகவரி இருப்பதால் இது அரசு நடைமுறைக்கு முரணானது.',
        warningSignals: [
          '24 மணி நேரத்தில் நிலம் ஏலம் விடப்படும் என்ற மிரட்டல்',
          'அரசு முத்திரைக்குப் பதிலாக தனிநபர் மொபைல் எண்',
          'தனிநபர் யுபிஐ மூலம் பணம் செலுத்துமாறு வற்புறுத்தல்',
        ],
        officialVerificationChannel: 'வட்டாட்சியர் அலுவலகம் / இ-சேவை மையம்',
      },
    },
    te: {
      title: 'అనుమానాస్పద 24 గంటల చెల్లింపు డిమాండ్ నోటీసు',
      whatIsThis: 'అనుమానాస్పద నగదు డిమాండ్ నోటీసు',
      issuingAuthority: 'గుర్తుతెలియని ప్రైవేట్ మొబైల్ నంబర్ & యూపీఐ',
      meaningSimple: 'ఈ లేఖలో 24 గంటల్లో ప్రైవేట్ యూపీఐకి ₹12,500 చెల్లించకపోతే భూమి వేలం వేస్తామని బెదిరించారు. ప్రభుత్వ విభాగాలు ఎప్పుడూ ప్రైవేట్ యూపీఐలకు డబ్బులు అడగవు.',
      actionableSteps: [
        'ఎట్టి పరిస్థితుల్లోనూ ప్రైవేట్ యూపీఐకి డబ్బులు పంపవద్దు.',
        'మీ స్థానిక తహశీల్దార్ లేదా రెవెన్యూ కార్యాలయానికి వెళ్లి ధృవీకరించుకోండి.',
        'సైబర్ హెల్ప్‌లైన్ 1930 లేదా సమీప పోలీస్ స్టేషన్‌లో ఫిర్యాదు చేయండి.',
      ],
      importantDates: [{ label: 'బెదిరింపు గడువు', date: '24 గంటల్లోగా', isUrgent: true }],
      importantNumbers: [
        { label: 'అనుమానాస్పద యూపీఐ ఐడీ', value: 'revenue-dept-pay@okaxis' },
        { label: 'మొబైల్ నంబర్', value: '+91 99099 XXXXX' },
      ],
      whatToKeep: ['ఈ అసలు పత్రాన్ని ఆధారంగా భద్రంగా దాచుకోండి.'],
      safetyScreening: {
        category: 'warning_signs',
        statusLabel: 'తీవ్రమైన హెచ్చరిక సంకేతాలు — తహశీల్దార్ కార్యాలయంలో నిర్ధారించుకోండి',
        explanation: 'వెంటనే డబ్బులు చెల్లించాలనే బెదిరింపు మరియు ప్రైవేట్ యూపీఐ ఇవ్వడం ప్రభుత్వ నియమాలకు విరుద్ధం.',
        warningSignals: [
          '24 గంటల్లో భూమి వేలం వేస్తామనే బెదిరింపు',
          'అధికారిక స్టాంప్‌కు బదులుగా ప్రైవేట్ మొబైల్ నంబర్',
          'ప్రైవేట్ యూపీఐ ద్వారా నగదు వసూలు ప్రయత్నం',
        ],
        officialVerificationChannel: 'తహశీల్దార్ కార్యాలయం / మీసేవ కేంద్రం',
      },
    },
    kn: {
      title: 'ಅನುಮಾನಾಸ್ಪದ 24 ಗಂಟೆಗಳ ಹಣ ಪಾವತಿ ಬೇಡಿಕೆ ಪತ್ರ',
      whatIsThis: 'ಅನುಮಾನಾಸ್ಪದ ಹಣ ವಸೂಲಾತಿ ನೋಟಿಸ್',
      issuingAuthority: 'ಅಪರಿಚಿತ ಖಾಸಗಿ ಮೊಬೈಲ್ ಸಂಖ್ಯೆ & ಯುಪಿಐ',
      meaningSimple: 'ಈ ಪತ್ರದಲ್ಲಿ 24 ಗಂಟೆಗಳಲ್ಲಿ ಖಾಸಗಿ ಯುಪಿಐಗೆ ₹12,500 ಪಾವತಿಸದಿದ್ದರೆ ಜಮೀನು ಹರಾಜು ಹಾಕುವುದಾಗಿ ಬೆದರಿಕೆ ಹಾಕಲಾಗಿದೆ. ಸರ್ಕಾರಿ ಇಲಾಖೆಗಳು ಎಂದಿಗೂ ಖಾಸಗಿ ಯುಪಿಐಗೆ ಹಣ ಕೇಳುವುದಿಲ್ಲ.',
      actionableSteps: [
        'ಯಾವುದೇ ಕಾರಣಕ್ಕೂ ಖಾಸಗಿ ಯುಪಿಐಗೆ ಹಣ ಕಳುಹಿಸಬೇಡಿ.',
        'ನಿಮ್ಮ ತಾಲೂಕು ತಹಶೀಲ್ದಾರ್ ಅಥವಾ ಕಂದಾಯ ಕಚೇರಿಗೆ ತೆರಳಿ ಪರಿಶೀಲಿಸಿ.',
        'ರಾಷ್ಟ್ರೀಯ ಸೈಬರ್ ಸಹಾಯವಾಣಿ 1930 ಅಥವಾ ಪೊಲೀಸ್ ಠಾಣೆಗೆ ದೂರು ನೀಡಿ.',
      ],
      importantDates: [{ label: 'ಬೆದರಿಕೆಯ ಗಡುವು', date: '24 ಗಂಟೆಯೊಳಗೆ', isUrgent: true }],
      importantNumbers: [
        { label: 'ಅನುಮಾನಾಸ್ಪದ ಯುಪಿಐ ಐಡಿ', value: 'revenue-dept-pay@okaxis' },
        { label: 'ಮೊಬೈಲ್ ಸಂಖ್ಯೆ', value: '+91 99099 XXXXX' },
      ],
      whatToKeep: ['ಈ ಮೂಲ ಪತ್ರವನ್ನು ಸಾಕ್ಷಿಯಾಗಿ ಸುರಕ್ಷಿತವಾಗಿಡಿ.'],
      safetyScreening: {
        category: 'warning_signs',
        statusLabel: 'ತೀವ್ರ ಎಚ್ಚರಿಕೆಯ ಸಂಕೇತ — ಅಧಿಕೃತ ಕಚೇರಿಯಿಂದ ಪರಿಶೀಲಿಸಿ',
        explanation: 'ತುರ್ತು ಹಣದ ಬೇಡಿಕೆ ಮತ್ತು ಖಾಸಗಿ ಯುಪಿಐ ನಮೂದಿಸಿರುವುದು ಸರ್ಕಾರಿ ನಿಯಮಗಳಿಗೆ ಸಂಪೂರ್ಣ ವಿರುದ್ಧವಾಗಿದೆ.',
        warningSignals: [
          '24 ಗಂಟೆಗಳಲ್ಲಿ ಜಮೀನು ಹರಾಜು ಹಾಕುವ ಬೆದರಿಕೆ',
          'ಸರ್ಕಾರಿ ಮುದ್ರೆಯ ಬದಲಿಗೆ ಖಾಸಗಿ ಮೊಬೈಲ್ ಸಂಖ್ಯೆ',
          'ಖಾಸಗಿ ಯುಪಿಐ ಮೂಲಕ ಹಣದ ಬೇಡಿಕೆ',
        ],
        officialVerificationChannel: 'ತಹಶೀಲ್ದಾರ್ ಕಾರ್ಯಾಲಯ / ನಾಡಕಚೇರಿ',
      },
    },
    ml: {
      title: 'സംശയാസ്പദമായ 24 മണിക്കൂർ പണമിടപാട് ആവശ്യപ്പെടൽ നോട്ടീസ്',
      whatIsThis: 'വ്യാജ പണപ്പിരിവ് / സംശയാസ്പദമായ നോട്ടീസ്',
      issuingAuthority: 'വ്യക്തിഗത മൊബൈൽ നമ്പറും വ്യാജ യുപിഐയും',
      meaningSimple: 'ഈ കത്തിൽ 24 മണിക്കൂറിനകം സ്വകാര്യ യുപിഐയിലേക്ക് ₹12,500 അടച്ചില്ലെങ്കിൽ ഭൂമി ലേലം ചെയ്യുമെന്ന് ഭീഷണിപ്പെടുത്തുന്നു. സർക്കാർ ഓഫീസുകൾ ഒരിക്കലും സ്വകാര്യ യുപിഐ വഴി പണം ആവശ്യപ്പെടില്ല.',
      actionableSteps: [
        'ഒരു കാരണവശാലും സ്വകാര്യ യുപിഐയിലേക്ക് പണം അയക്കരുത്.',
        'താലൂക്ക് തഹസിൽദാർ അല്ലെങ്കിൽ വില്ലേജ് ഓഫീസുമായി ബന്ധപ്പെട്ട് പരിശോധിക്കുക.',
        'സൈബർ ഹെൽപ്പ് ലൈനായ 1930-ലോ അടുത്തുള്ള പോലീസ് സ്റ്റേഷനിലോ പരാതി നൽകുക.',
      ],
      importantDates: [{ label: 'ഭീഷണിപ്പെടുത്തുന്ന സമയം', date: '24 മണിക്കൂറിനകം', isUrgent: true }],
      importantNumbers: [
        { label: 'സംശയാസ്പദമായ യുപിഐ ഐഡി', value: 'revenue-dept-pay@okaxis' },
        { label: 'മൊബൈൽ നമ്പർ', value: '+91 99099 XXXXX' },
      ],
      whatToKeep: ['ഈ കത്തിന്റെ അസ്സൽ തെളിവായി സൂക്ഷിക്കുക.'],
      safetyScreening: {
        category: 'warning_signs',
        statusLabel: 'ഗുരുതരമായ മുന്നറിയിപ്പ് — ഔദ്യോഗിക ഓഫീസിൽ അന്വേഷിക്കുക',
        explanation: 'ഉടൻ പണം അടയ്ക്കാനുള്ള ഭീഷണിയും സ്വകാര്യ യുപിഐ വിലാസവും സർക്കാർ ചട്ടങ്ങൾക്ക് വിരുദ്ധമാണ്.',
        warningSignals: [
          '24 മണിക്കൂറിനകം ഭൂമി ലേലം ചെയ്യുമെന്ന ഭീഷണി',
          'ഔദ്യോഗിക മുദ്രയ്ക്ക് പകരം സ്വകാര്യ മൊബൈൽ നമ്പർ',
          'സ്വകാര്യ യുപിഐ വഴി പണം ആവശ്യപ്പെടൽ',
        ],
        officialVerificationChannel: 'താലൂക്ക് ഓഫീസ് / വില്ലേജ് ഓഫീസ്',
      },
    },
    pa: {
      title: 'ਸ਼ੱਕੀ 24 ਘੰਟੇ ਵਿੱਚ ਪੈਸੇ ਮੰਗਣ ਵਾਲਾ ਨੋਟਿਸ',
      whatIsThis: 'ਗ਼ੈਰ-ਕਾਨੂੰਨੀ ਵਸੂਲੀ / ਸ਼ੱਕੀ ਨੋਟਿਸ',
      issuingAuthority: 'ਅਣਪਛਾਤਾ ਨਿੱਜੀ ਮੋਬਾਈਲ ਨੰਬਰ ਅਤੇ ਜਾਅਲੀ ਯੂਪੀਆਈ',
      meaningSimple: 'ਇਸ ਚਿੱਠੀ ਵਿੱਚ 24 ਘੰਟਿਆਂ ਦੇ ਅੰਦਰ ਨਿੱਜੀ ਯੂਪੀਆਈ ਤੇ ₹12,500 ਜਮ੍ਹਾਂ ਨਾ ਕਰਵਾਉਣ ਤੇ ਜ਼ਮੀਨ ਨਿਲਾਮ ਕਰਨ ਦੀ ਧਮਕੀ ਦਿੱਤੀ ਗਈ ਹੈ। ਸਰਕਾਰੀ ਦਫ਼ਤਰ ਕਦੇ ਵੀ ਨਿੱਜੀ ਯੂਪੀਆਈ ਤੇ ਪੈਸੇ ਨਹੀਂ ਮੰਗਦੇ।',
      actionableSteps: [
        'ਕਿਸੇ ਵੀ ਹਾਲਤ ਵਿੱਚ ਨਿੱਜੀ ਯੂਪੀਆਈ ਜਾਂ ਖਾਤੇ ਵਿੱਚ ਪੈਸੇ ਨਾ ਭੇਜੋ।',
        'ਆਪਣੇ ਤਹਿਸੀਲਦਾਰ ਜਾਂ ਪਟਵਾਰੀ ਦਫ਼ਤਰ ਜਾ ਕੇ ਇਸ ਨੋਟਿਸ ਦੀ ਜਾਂਚ ਕਰਵਾਓ।',
        'ਸਾਈਬਰ ਹੈਲਪਲਾਈਨ 1930 ਜਾਂ ਨੇੜਲੇ ਪੁਲਿਸ ਥਾਣੇ ਵਿੱਚ ਸ਼ਿਕਾਇਤ ਦਰਜ ਕਰੋ।',
      ],
      importantDates: [{ label: 'ਧਮਕੀ ਭਰੀ ਮਿਆਦ', date: '24 ਘੰਟਿਆਂ ਦੇ ਅੰਦਰ', isUrgent: true }],
      importantNumbers: [
        { label: 'ਸ਼ੱਕੀ ਯੂਪੀਆਈ ਆਈਡੀ', value: 'revenue-dept-pay@okaxis' },
        { label: 'ਮੋਬਾਈਲ ਨੰਬਰ', value: '+91 99099 XXXXX' },
      ],
      whatToKeep: ['ਇਸ ਚਿੱਠੀ ਦੀ ਅਸਲ ਕਾਪੀ ਸਬੂਤ ਵਜੋਂ ਸੰਭਾਲ ਕੇ ਰੱਖੋ।'],
      safetyScreening: {
        category: 'warning_signs',
        statusLabel: 'ਸਖ਼ਤ ਚੇਤਾਵਨੀ ਸੰਕੇਤ — ਸਰਕਾਰੀ ਦਫ਼ਤਰ ਤੋਂ ਪੜਤਾਲ ਕਰੋ',
        explanation: 'ਇਸ ਵਿੱਚ ਤੁਰੰਤ ਪੈਸੇ ਮੰਗਣ ਦਾ ਦਬਾਅ ਅਤੇ ਨਿੱਜੀ ਯੂਪੀਆਈ ਦਿੱਤਾ ਗਿਆ ਹੈ ਜੋ ਸਰਕਾਰੀ ਨਿਯਮਾਂ ਦੇ ਉਲਟ ਹੈ।',
        warningSignals: [
          '24 ਘੰਟਿਆਂ ਵਿੱਚ ਜ਼ਮੀਨ ਨਿਲਾਮ ਕਰਨ ਦੀ ਧਮਕੀ',
          'ਸਰਕਾਰੀ ਮੋਹਰ ਦੀ ਥਾਂ ਨਿੱਜੀ ਮੋਬਾਈਲ ਨੰਬਰ',
          'ਨਿੱਜੀ ਯੂਪੀਆਈ ਰਾਹੀਂ ਪੈਸਿਆਂ ਦੀ ਮੰਗ',
        ],
        officialVerificationChannel: 'ਤਹਿਸੀਲਦਾਰ / ਫ਼ਰਦ ਕੇਂਦਰ / ਸੇਵਾ ਕੇਂਦਰ',
      },
    },
    or: {
      title: 'ସନ୍ଦେହଜନକ ୨୪ ଘଣ୍ଟା ମଧ୍ୟରେ ଟଙ୍କା ଦାବି ନୋଟିସ',
      whatIsThis: 'ବେଆଇନ ଆଦାୟ / ସନ୍ଦେହଜନକ ନୋଟିସ',
      issuingAuthority: 'ଅଜ୍ଞାତ ବ୍ୟକ୍ତିଗତ ମୋବାଇଲ ନମ୍ବର ଏବଂ ୟୁପିଆଇ',
      meaningSimple: 'ଏହି ପତ୍ରରେ ୨୪ ଘଣ୍ଟା ମଧ୍ୟରେ ବ୍ୟକ୍ତିଗତ ୟୁପିଆଇରେ ₹୧୨,୫୦୦ ଜମା ନକଲେ ଜମି ନିଲାମ କରିବାକୁ ଧମକ ଦିଆଯାଇଛି। ସରକାରୀ ବିଭାଗ କେବେହେଲେ ବ୍ୟକ୍ତିଗତ ୟୁପିଆଇରେ ଟଙ୍କା ମାଗନ୍ତି ନାହିଁ।',
      actionableSteps: [
        'କୌଣସି ପରିସ୍ଥିତିରେ ବ୍ୟକ୍ତିଗତ ୟୁପିଆଇକୁ ଟଙ୍କା ପଠାନ୍ତୁ ନାହିଁ।',
        'ସ୍ଥାନୀୟ ତହସିଲ କିମ୍ବା ରାଜସ୍ୱ କାର୍ଯ୍ୟାଳୟକୁ ଯାଇ ଏହି ଚିଠିର ସତ୍ୟତା ଯାଞ୍ଚ କରନ୍ତୁ।',
        'ସାଇବର ହେଲ୍ପଲାଇନ ୧୯୩୦ କିମ୍ବା ପୋଲିସ ଷ୍ଟେସନରେ ଅଭିଯୋଗ କରନ୍ତୁ।',
      ],
      importantDates: [{ label: 'ଧମକପୂର୍ଣ୍ଣ ସମୟସୀମା', date: '୨୪ ଘଣ୍ଟା ମଧ୍ୟରେ', isUrgent: true }],
      importantNumbers: [
        { label: 'ସନ୍ଦେହଜନକ ୟୁପିଆଇ ଆଇଡି', value: 'revenue-dept-pay@okaxis' },
        { label: 'ମୋବାଇଲ ନମ୍ବର', value: '+91 99099 XXXXX' },
      ],
      whatToKeep: ['ଏହି ଚିଠିର ମୂଳ କପି ପ୍ରମାଣ ଭାବରେ ସୁରକ୍ଷିତ ରଖନ୍ତୁ।'],
      safetyScreening: {
        category: 'warning_signs',
        statusLabel: 'ଦୃଢ଼ ସତର୍କତା ସଙ୍କେତ — ସରକାରୀ କାର୍ଯ୍ୟାଳୟରୁ ଯାଞ୍ଚ କରନ୍ତୁ',
        explanation: 'ତୁରନ୍ତ ଟଙ୍କା ଦେବା ପାଇଁ ଚାପ ଏବଂ ବ୍ୟକ୍ତିଗତ ୟୁପିଆଇ ଉଲ୍ଲେଖ ଥିବାରୁ ଏହା ସରକାରୀ ନିୟମ ବିରୋଧୀ।',
        warningSignals: [
          '୨୪ ଘଣ୍ଟା ମଧ୍ୟରେ ଜମି ନିଲାମ କରିବାର ଧମକ',
          'ସରକାରୀ ମୋହର ବଦଳରେ ବ୍ୟକ୍ତିଗତ ମୋବାଇଲ ନମ୍ବର',
          'ବ୍ୟକ୍ତିଗତ ୟୁପିଆଇ ମାଧ୍ୟମରେ ଟଙ୍କା ଦାବି',
        ],
        officialVerificationChannel: 'ତହସିଲଦାର କାର୍ଯ୍ୟାଳୟ / ଜନସେବା କେନ୍ଦ୍ର',
      },
    },
  };

  const item = dataMap[lang] || dataMap.hi;
  return {
    id: 'doc-suspicious-002',
    title: item.title,
    originalFileName: 'Urgent_Tax_Recovery_Notice.jpg',
    uploadedAt: '2026-09-25',
    sampleType: 'suspicious',
    isDemoNotice: true,
    analysis: {
      whatIsThis: item.whatIsThis,
      issuingAuthority: item.issuingAuthority,
      meaningSimple: item.meaningSimple,
      actionableSteps: item.actionableSteps,
      importantDates: item.importantDates,
      importantNumbers: item.importantNumbers,
      whatToKeep: item.whatToKeep,
      safetyScreening: item.safetyScreening,
    },
  };
}

// Initial Process Journey localized for all 11 supported languages
export function getInitialProcessJourney(lang: LanguageCode): ProcessJourney {
  const journeys: Record<LanguageCode, {
    title: string;
    category: string;
    steps: Array<{
      title: string;
      description: string;
      requiredDocuments: string[];
      authorityName: string;
      nextActionPrompt: string;
    }>;
  }> = {
    hi: {
      title: 'जमीन वारसाई एवं नाम दर्ज प्रक्रिया',
      category: 'राजस्व विभाग',
      steps: [
        {
          title: 'आवश्यक दस्तावेज तैयार करना',
          description: 'मृत्यु प्रमाण पत्र, वारिसनामा और पहचान पत्र तैयार किए गए।',
          requiredDocuments: ['मृत्यु प्रमाण पत्र', 'वारिसनामा', 'पहचान पत्र'],
          authorityName: 'ग्राम पंचायत / तलाटी',
          nextActionPrompt: 'कागजात तैयार हो चुके हैं।',
        },
        {
          title: 'कार्यालय में आवेदन जमा करना',
          description: 'जमीन नाम दर्ज कराने हेतु तलाटी कार्यालय में आवेदन दिया गया।',
          requiredDocuments: ['आवेदन पत्र', 'सहमति शपथ पत्र'],
          authorityName: 'तलाटी कार्यालय',
          nextActionPrompt: 'आवेदन जमा हो चुका है।',
        },
        {
          title: 'आधिकारिक मुहरबंद पावती प्राप्त करना',
          description: 'आवेदन जमा करने के बाद अधिकारी से मुहरबंद रसीद या SMS सूचना प्राप्त की।',
          requiredDocuments: ['मुहरबंद पावती'],
          authorityName: 'राजस्व सेवा केंद्र',
          nextActionPrompt: 'यदि आपके पास रसीद है, तो नीचे "रसीद जोड़ें" पर क्लिक करें।',
        },
        {
          title: '15 दिन की सार्वजनिक आपत्ति अवधि',
          description: 'यदि किसी को आपत्ति हो तो 15 दिन (15 अक्टूबर तक) में आपत्ति दर्ज करने का समय।',
          requiredDocuments: ['नोटिस प्रति'],
          authorityName: 'तहसीलदार कार्यालय',
          nextActionPrompt: '15 अक्टूबर तक प्रतीक्षा करें।',
        },
        {
          title: 'राजस्व अभिलेख में नाम दर्ज होना',
          description: 'आपत्ति न आने पर आदेश पारित होगा और खतौनी में नाम दर्ज हो जाएगा।',
          requiredDocuments: ['अद्यतन खतौनी प्रति'],
          authorityName: 'अभिलेख शाखा',
          nextActionPrompt: 'अंतिम चरण।',
        },
      ],
    },
    en: {
      title: 'Land Mutation & Title Succession Process',
      category: 'Revenue Department',
      steps: [
        {
          title: 'Prepare Required Documents',
          description: 'Death certificate of previous holder, legal pedigree certificate, and ID proof prepared.',
          requiredDocuments: ['Death Certificate', 'Succession Tree', 'Aadhaar Card'],
          authorityName: 'Gram Panchayat / Talati',
          nextActionPrompt: 'Documents preparation completed.',
        },
        {
          title: 'Submit Application to Authority',
          description: 'Application submitted to Talati-cum-Mantri for mutation of land rights.',
          requiredDocuments: ['Application Form', 'Consent Affidavit'],
          authorityName: 'Office of Talati-cum-Mantri',
          nextActionPrompt: 'Application submitted successfully.',
        },
        {
          title: 'Obtain Official Acknowledgment Receipt',
          description: 'Obtain stamped physical acknowledgment slip or SMS entry confirmation from the office.',
          requiredDocuments: ['Stamped Acknowledgment Slip'],
          authorityName: 'e-Dhara / Revenue Office',
          nextActionPrompt: 'If you have an acknowledgment slip, click "Attach Receipt" below.',
        },
        {
          title: 'Statutory Notice Period (15 Days)',
          description: 'Public 15-day objection period for other legal heirs or stakeholders (until 15 October).',
          requiredDocuments: ['Public Notice Copy'],
          authorityName: 'Mamlatdar Office',
          nextActionPrompt: 'Wait until the statutory notice period expires on 15 October.',
        },
        {
          title: 'Final Record Update in Land Title',
          description: 'Once no objections are received, revenue officer approves mutation and title is updated.',
          requiredDocuments: ['Updated Land Title Copy'],
          authorityName: 'Revenue Records Office',
          nextActionPrompt: 'Final step upon approval.',
        },
      ],
    },
    gu: {
      title: 'જમીન વારસાઈ નોંધણી પ્રક્રિયા',
      category: 'મહેસૂલ વિભાગ',
      steps: [
        {
          title: 'જરૂરી કાગળો એકત્ર કરવા',
          description: 'મૃતકનું મરણ પ્રમાણપત્ર, વારસાઈ પેઢીનામું અને ઓળખપત્ર તૈયાર કર્યા.',
          requiredDocuments: ['મરણ દાખલો', 'પેઢીનામું', 'આધાર કાર્ડ'],
          authorityName: 'ગ્રામ પંચાયત / તલાટી',
          nextActionPrompt: 'કાગળો પૂર્ણ થયા છે.',
        },
        {
          title: 'તલાટી કચેરીમાં અરજી આપવી',
          description: 'ગામના તલાટી કમ મંત્રી સમક્ષ વારસાઈ હક દાખલ કરવા અરજી આપી.',
          requiredDocuments: ['અરજી પત્રક', 'સંમતિ દર્શક સોગંદનામું'],
          authorityName: 'તલાટી કમ મંત્રી કચેરી',
          nextActionPrompt: 'અરજી જમા થઈ ગઈ છે.',
        },
        {
          title: 'સત્તાવાર પહોંચ / રસીદ મેળવવી',
          description: 'અરજી આપ્યા પછી તલાટી સાહેબ પાસેથી સિક્કાવાળી પાવતી અથવા SMS નોંધ મેળવી.',
          requiredDocuments: ['સિક્કાવાળી પહોંચ'],
          authorityName: 'ઈ-ધરા / તલાટી કચેરી',
          nextActionPrompt: 'જો તમારી પાસે પહોંચ હોય તો "પહોંચ જોડો" પર ક્લિક કરો.',
        },
        {
          title: '૧૩૫-ડી વાંધા અરજી સમયગાળો (૧૫ દિવસ)',
          description: 'અન્ય કોઈ ખાતેદાર કે હિતધારકને વાંધો હોય તો ૧૫ દિવસમાં રજૂઆત કરવાનો સમય (૧૫ ઓક્ટોબર સુધી).',
          requiredDocuments: ['નોટિસ નકલ'],
          authorityName: 'મામલતદાર કચેરી',
          nextActionPrompt: '૧૫ ઓક્ટોબર સુધી પ્રતીક્ષા કરો.',
        },
        {
          title: '૭/૧૨ અને ૮-અ માં નામ દાખલ',
          description: 'કોઈ વાંધો ન આવે એટલે મામલતદાર દ્વારા નોંધ મંજૂર થશે અને નવા ૭/૧૨માં નામ ચડી જશે.',
          requiredDocuments: ['નવી ૭/૧૨ ની નકલ'],
          authorityName: 'મહેસૂલ રેકોર્ડ શાખા',
          nextActionPrompt: 'છેલ્લું પગલું.',
        },
      ],
    },
    bn: {
      title: 'জমির উত্তরাধিকার নামপত্তন প্রক্রিয়া',
      category: 'রাজস্ব দপ্তর',
      steps: [
        {
          title: 'প্রয়োজনীয় কাগজপত্র প্রস্তুত করা',
          description: 'মৃত্যু সনদ, ওয়ারিশান সার্টিফিকেট এবং আধার কার্ড প্রস্তুত করা হয়েছে।',
          requiredDocuments: ['মৃত্যু সনদ', 'ওয়ারিশান সনদ', 'আধার কার্ড'],
          authorityName: 'গ্রাম পঞ্চায়েত / তহশিল',
          nextActionPrompt: 'কাগজপত্র তৈরি সম্পন্ন হয়েছে।',
        },
        {
          title: 'কার্যালয়ে আবেদনপত্র জমা দেওয়া',
          description: 'জমির নামজারি বা মিউটেশনের জন্য তহশিল অফিসে আবেদন জমা দেওয়া হয়েছে।',
          requiredDocuments: ['আবেদন ফরম', 'সম্মতি হলফনামা'],
          authorityName: 'তহশিলদার কার্যালয়',
          nextActionPrompt: 'আবেদন জমা সম্পন্ন হয়েছে।',
        },
        {
          title: 'অফিসিয়াল সিলমোহরযুক্ত রসিদ গ্রহণ',
          description: 'আবেদন জমার পর আধিকারিকের থেকে সিলমোহরযুক্ত রসিদ বা এসএমএস প্রাপ্তি।',
          requiredDocuments: ['সিলমোহরযুক্ত রসিদ'],
          authorityName: 'রাজস্ব তথ্য কেন্দ্র',
          nextActionPrompt: 'রসিদ থাকলে নিচে "রসিদ সংযুক্ত করুন" বাটনে ক্লিক করুন।',
        },
        {
          title: '১৫ দিনের সংবিধিবদ্ধ আপত্তি সময়কাল',
          description: 'অন্য কোনো অংশীদারের আপত্তি থাকলে জানানোর ১৫ দিনের সময় (১৫ অক্টোবর পর্যন্ত)।',
          requiredDocuments: ['নোটিশ কপি'],
          authorityName: 'তহশিলদার অফিস',
          nextActionPrompt: '১৫ অক্টোবর পর্যন্ত অপেক্ষা করুন।',
        },
        {
          title: 'খতিয়ানে চূড়ান্ত নাম অন্তর্ভুক্তি',
          description: 'কোনো আপত্তি না থাকলে আদেশ পাশ হবে এবং রেকর্ডে নাম উঠবে।',
          requiredDocuments: ['সংশোধিত পর্চা / খতিয়ান'],
          authorityName: 'রাজস্ব রেকর্ড শাখা',
          nextActionPrompt: 'চূড়ান্ত ধাপ।',
        },
      ],
    },
    mr: {
      title: 'जमीन वारसा नोंदणी व फेरफार प्रक्रिया',
      category: 'महसूल विभाग',
      steps: [
        {
          title: 'आवश्यक कागदपत्रे गोळा करणे',
          description: 'मृत्यू दाखला, वारस दाखला आणि आधार कार्ड तयार केले आहे.',
          requiredDocuments: ['मृत्यू दाखला', 'वारस दाखला', 'आधार कार्ड'],
          authorityName: 'ग्रामपंचायत / तलाठी',
          nextActionPrompt: 'कागदपत्रे तयार झाली आहेत.',
        },
        {
          title: 'तलाठी कार्यालयात अर्ज देणे',
          description: 'वारसा हक्क नोंदीसाठी तलाठी कार्यालयात अधिकृत अर्ज सादर केला.',
          requiredDocuments: ['अर्ज नमुना', 'संमती शपथपत्र'],
          authorityName: 'तलाठी कार्यालय',
          nextActionPrompt: 'अर्ज सादर झाला आहे.',
        },
        {
          title: 'अधिकृत शिक्का असलेली पावती घेणे',
          description: 'अर्ज दिल्यानंतर तलाठ्यांकडून शिक्का असलेली पावती किंवा एसएमएस नोंद घेतली.',
          requiredDocuments: ['शिक्का असलेली पावती'],
          authorityName: 'ई-फेरफार केंद्र',
          nextActionPrompt: 'पावती असल्यास खाली "पावती जोडा" वर क्लिक करा.',
        },
        {
          title: '१५ दिवसांची हरकत नोंदणी मुदत',
          description: 'इतर कोणाला हरकत असल्यास १५ दिवसांत (१५ ऑक्टोबरपर्यंत) नोंदवण्याची मुदत.',
          requiredDocuments: ['नोटीस प्रत'],
          authorityName: 'तहसीलदार कार्यालय',
          nextActionPrompt: '१५ ऑक्टोबरपर्यंत प्रतीक्षा करा.',
        },
        {
          title: '७/१२ वर अंतिम नाव नोंदणी',
          description: 'हरकत न आल्यास फेरफार मंजूर होऊन नवीन ७/१२ वर नाव नोंदवले जाईल.',
          requiredDocuments: ['नवीन ७/१२ प्रत'],
          authorityName: 'महसूल अभिलेख कक्ष',
          nextActionPrompt: 'अंतिम टप्पा.',
        },
      ],
    },
    ta: {
      title: 'நில வாரிசு உரிமை பட்டா மாற்ற செயல்முறை',
      category: 'வருவாய்த்துறை',
      steps: [
        {
          title: 'தேவையான ஆவணங்களை தயார் செய்தல்',
          description: 'இறப்பு சான்றிதழ், வாரிசு சான்றிதழ் மற்றும் ஆதார் அட்டை தயார் செய்யப்பட்டது.',
          requiredDocuments: ['இறப்பு சான்றிதழ்', 'வாரிசு சான்றிதழ்', 'ஆதார் அட்டை'],
          authorityName: 'கிராம நிர்வாகம் / VAO',
          nextActionPrompt: 'ஆவணங்கள் தயார் செய்யப்பட்டுள்ளன.',
        },
        {
          title: 'அலுவலகத்தில் விண்ணப்பம் சமர்ப்பித்தல்',
          description: 'நில உரிமை மாற்றத்திற்காக கிராம நிர்வாக அலுவலகத்தில் விண்ணப்பம் அளிக்கப்பட்டது.',
          requiredDocuments: ['விண்ணப்ப படிவம்', 'ஒப்புதல் பத்திரம்'],
          authorityName: 'VAO அலுவலகம்',
          nextActionPrompt: 'விண்ணப்பம் சமர்ப்பிக்கப்பட்டது.',
        },
        {
          title: 'முத்திரையிடப்பட்ட அதிகாரப்பூர்வ ரசீது பெறுதல்',
          description: 'விண்ணப்பித்த பின் முத்திரையிடப்பட்ட ரசீது அல்லது SMS உறுதிப்படுத்தல் பெறுதல்.',
          requiredDocuments: ['முத்திரையிடப்பட்ட ரசீது'],
          authorityName: 'வருவாய் சேவை மையம்',
          nextActionPrompt: 'ரசீது இருந்தால் கீழே "ரசீதை இணைக்கவும்" என்பதை கிளிக் செய்யவும்.',
        },
        {
          title: '15 நாட்கள் ஆட்சேபனை கால அவகாசம்',
          description: 'மற்ற வாரிசுகள் ஆட்சேபனை தெரிவிக்க 15 நாட்கள் அவகாசம் (அக்டோபர் 15 வரை).',
          requiredDocuments: ['நோட்டீஸ் நகல்'],
          authorityName: 'வட்டாட்சியர் அலுவலகம்',
          nextActionPrompt: 'அக்டோபர் 15 வரை காத்திருக்கவும்.',
        },
        {
          title: 'பட்டாவில் பெயர் மாற்றம் நிறைவு',
          description: 'ஆட்சேபனை எதுவும் வரவில்லை என்றால் ஆணை பிறப்பிக்கப்பட்டு பட்டா புதுப்பிக்கப்படும்.',
          requiredDocuments: ['புதிய பட்டா நகல்'],
          authorityName: 'நில அளவை மற்றும் பதிவேடு துறை',
          nextActionPrompt: 'இறுதி கட்டம்.',
        },
      ],
    },
    te: {
      title: 'భూమి వారసత్వ హక్కు మ్యుటేషన్ ప్రక్రియ',
      category: 'రెవెన్యూ విభాగం',
      steps: [
        {
          title: 'అవసరమైన పత్రాలు సిద్ధం చేయడం',
          description: 'మరణ ధృవీకరణ పత్రం, వారసత్వ ధృవీకరణ మరియు ఆధార్ కార్డు సిద్ధం చేయబడ్డాయి.',
          requiredDocuments: ['మరణ ధృవీకరణ పత్రం', 'వారసత్వ పత్రం', 'ఆధార్ కార్డు'],
          authorityName: 'గ్రామ పంచాయతీ / వీఆర్వో',
          nextActionPrompt: 'పత్రాలు సిద్ధమయ్యాయి.',
        },
        {
          title: 'కార్యాలయంలో దరఖాస్తు సమర్పించడం',
          description: 'భూమి వారసత్వ నమోదు కొరకు రెవెన్యూ కార్యాలయంలో దరఖాస్తు ఇవ్వబడింది.',
          requiredDocuments: ['దరఖాస్తు ఫారం', 'సమ్మతి పత్రం'],
          authorityName: 'తహశీల్దార్ కార్యాలయం',
          nextActionPrompt: 'దరఖాస్తు సమర్పించబడింది.',
        },
        {
          title: 'అధికారిక స్టాంప్ వేసిన రసీదు పొందడం',
          description: 'దరఖాస్తు సమర్పించిన తర్వాత అధికారి నుండి రసీదు లేదా ఎస్ఎంఎస్ పొందబడింది.',
          requiredDocuments: ['స్టాంప్ వేసిన రసీదు'],
          authorityName: 'రెవెన్యూ సేవా కేంద్రం',
          nextActionPrompt: 'రసీదు ఉంటే క్రింద "రసీదు జతచేయి" బటన్ నొక్కండి.',
        },
        {
          title: '15 రోజుల అభ్యంతరాల గడువు',
          description: 'ఎవరికైనా అభ్యంతరం ఉంటే తెలపడానికి 15 రోజుల చట్టబద్ధమైన సమయం (అక్టోబర్ 15 వరకు).',
          requiredDocuments: ['నోటీసు ప్రతి'],
          authorityName: 'తహశీల్దార్ కార్యాలయం',
          nextActionPrompt: 'అక్టోబర్ 15 వరకు వేచి ఉండండి.',
        },
        {
          title: 'రికార్డుల్లో తుది పేరు నమోదు',
          description: 'అభ్యంతరాలు లేకుంటే ఉత్తర్వులు జారీ చేయబడి కొత్త పాస్‌బుక్‌లో పేరు చేరుతుంది.',
          requiredDocuments: ['కొత్త పట్టాదారు పాస్‌బుక్'],
          authorityName: 'రికార్డుల విభాగం',
          nextActionPrompt: 'చివరి దశ.',
        },
      ],
    },
    kn: {
      title: 'ಭೂಮಿ ವಾರಸುದಾರಿಕೆ ಹಕ್ಕು ಬದಲಾವಣೆ ಪ್ರಕ್ರಿಯೆ',
      category: 'ಕಂದಾಯ ಇಲಾಖೆ',
      steps: [
        {
          title: 'ಅಗತ್ಯ ದಾಖಲೆಗಳನ್ನು ಸಿದ್ಧಪಡಿಸುವುದು',
          description: 'ಮರಣ ಪ್ರಮಾಣಪತ್ರ, ವಾರಸುದಾರಿಕೆ ಪತ್ರ ಮತ್ತು ಆಧಾರ್ ಕಾರ್ಡ್ ಸಿದ್ಧಪಡಿಸಲಾಗಿದೆ.',
          requiredDocuments: ['ಮರಣ ಪ್ರಮಾಣಪತ್ರ', 'ವಾರಸುದಾರಿಕೆ ಪತ್ರ', 'ಆಧಾರ್ ಕಾರ್ಡ್'],
          authorityName: 'ಗ್ರಾಮ ಪಂಚಾಯಿತಿ / ಗ್ರಾಮ ಲೆಕ್ಕಿಗ',
          nextActionPrompt: 'ದಾಖಲೆಗಳು ಸಿದ್ಧವಾಗಿವೆ.',
        },
        {
          title: 'ಕಚೇರಿಯಲ್ಲಿ ಅರ್ಜಿ ಸಲ್ಲಿಸುವುದು',
          description: 'ಹಕ್ಕು ಬದಲಾವಣೆಗಾಗಿ ಕಂದಾಯ ಕಚೇರಿಗೆ ಅರ್ಜಿ ಸಲ್ಲಿಸಲಾಗಿದೆ.',
          requiredDocuments: ['ಅರ್ಜಿ ನಮೂನೆ', 'ಒಪ್ಪಿಗೆ ಅಫಿಡವಿಟ್'],
          authorityName: 'ತಹಶೀಲ್ದಾರ್ ಕಾರ್ಯಾಲಯ',
          nextActionPrompt: 'ಅರ್ಜಿ ಸಲ್ಲಿಸಲಾಗಿದೆ.',
        },
        {
          title: 'ಅಧಿಕೃತ ಮೊಹರು ಮಾಡಿದ ರಸೀದಿ ಪಡೆಯುವುದು',
          description: 'ಅರ್ಜಿ ನೀಡಿದ ನಂತರ ಮೊಹರು ಮಾಡಿದ ಸ್ವೀಕೃತಿ ರಸೀದಿ ಅಥವಾ ಎಸ್‌ಎಂಎಸ್ ಪಡೆಯಲಾಗಿದೆ.',
          requiredDocuments: ['ಮೊಹರು ಮಾಡಿದ ರಸೀದಿ'],
          authorityName: 'ಕಂದಾಯ ಸೇವಾ ಕೇಂದ್ರ',
          nextActionPrompt: 'ರಸೀದಿ ಇದ್ದರೆ ಕೆಳಗೆ "ರಸೀದಿ ಲಗತ್ತಿಸಿ" ಕ್ಲಿಕ್ ಮಾಡಿ.',
        },
        {
          title: '15 ದಿನಗಳ ಆಕ್ಷೇಪಣೆ ಅವಧಿ',
          description: 'ಯಾರಿಗಾದರೂ ಆಕ್ಷೇಪಣೆ ಇದ್ದರೆ ತಿಳಿಸಲು 15 ದಿನಗಳ ಕಾಲಾವಕಾಶ (ಅಕ್ಟೋಬರ್ 15 ರವರೆಗೆ).',
          requiredDocuments: ['ನೋಟಿಸ್ ಪ್ರತಿ'],
          authorityName: 'ತಹಶೀಲ್ದಾರ್ ಕಾರ್ಯಾಲಯ',
          nextActionPrompt: 'ಅಕ್ಟೋಬರ್ 15 ರವರೆಗೆ ಕಾಯಿರಿ.',
        },
        {
          title: 'ಆರ್‌ಟಿಸಿಯಲ್ಲಿ ಅಂತಿಮ ಹೆಸರು ದಾಖಲಾತಿ',
          description: 'ಯಾವುದೇ ಆಕ್ಷೇಪಣೆ ಬಾರದಿದ್ದಲ್ಲಿ ಆದೇಶ ಹೊರಡಿಸಿ ಹೊಸ ಪಹಣಿಯಲ್ಲಿ ಹೆಸರು ದಾಖಲಾಗುತ್ತದೆ.',
          requiredDocuments: ['ಹೊಸ ಪಹಣಿ (ಆರ್‌ಟಿಸಿ)'],
          authorityName: 'ದಾಖಲೆಗಳ ವಿಭಾಗ',
          nextActionPrompt: 'ಅಂತಿಮ ಹಂತ.',
        },
      ],
    },
    ml: {
      title: 'ഭൂമി അനന്തരാവകാശ പോക്കുവരവ് പ്രക്രിയ',
      category: 'റവന്യൂ വകുപ്പ്',
      steps: [
        {
          title: 'ആവശ്യമായ രേഖകൾ തയ്യാറാക്കുക',
          description: 'മരണ സർട്ടിഫിക്കറ്റ്, അനന്തരാവകാശ സർട്ടിഫിക്കറ്റ്, ആധാർ കാർഡ് എന്നിവ തയ്യാറാക്കി.',
          requiredDocuments: ['മരണ സർട്ടിഫിക്കറ്റ്', 'അവകാശ സർട്ടിഫിക്കറ്റ്', 'ആധാർ കാർഡ്'],
          authorityName: 'ഗ്രാമപഞ്ചായത്ത് / വില്ലേജ് ഓഫീസ്',
          nextActionPrompt: 'രേഖകൾ തയ്യാറാക്കിക്കഴിഞ്ഞു.',
        },
        {
          title: 'വില്ലേജ് ഓഫീസിൽ അപേക്ഷ സമർപ്പിക്കുക',
          description: 'പോക്കുവരവ് നടത്തുന്നതിനായി വില്ലേജ് ഓഫീസിൽ അപേക്ഷ നൽകി.',
          requiredDocuments: ['അപേക്ഷാ ഫോറം', 'സമ്മതപത്രം'],
          authorityName: 'വില്ലേജ് ഓഫീസ്',
          nextActionPrompt: 'അപേക്ഷ സമർപ്പിച്ചു.',
        },
        {
          title: 'മുദ്ര പതിപ്പിച്ച രസീത് വാങ്ങുക',
          description: 'അപേക്ഷ നൽകിയ ശേഷം ഉദ്യോഗസ്ഥനിൽ നിന്ന് മുദ്ര പതിപ്പിച്ച രസീത് വാങ്ങി.',
          requiredDocuments: ['മുദ്ര പതിപ്പിച്ച രസീത്'],
          authorityName: 'റവന്യൂ കേന്ദ്രം',
          nextActionPrompt: 'രസീത് ഉണ്ടെങ്കിൽ താഴെ "രസീത് ചേർക്കുക" ക്ലിക്ക് ചെയ്യുക.',
        },
        {
          title: '15 ദിവസത്തെ തടസ്സവാദ സമയം',
          description: 'ആർക്കെങ്കിലും തടസ്സവാദങ്ങൾ ഉണ്ടെങ്കിൽ അറിയിക്കാനുള്ള 15 ദിവസത്തെ സമയം (ഒക്ടോബർ 15 വരെ).',
          requiredDocuments: ['നോട്ടീസ് കോപ്പി'],
          authorityName: 'താലൂക്ക് ഓഫീസ്',
          nextActionPrompt: 'ഒക്ടോബർ 15 വരെ കാത്തിരിക്കുക.',
        },
        {
          title: 'റവന്യൂ രേഖകളിൽ പേര് മാറ്റം',
          description: 'തടസ്സങ്ങൾ ഒന്നും ഇല്ലെങ്കിൽ പോക്കുവരവ് അംഗീകരിച്ച് പുതിയ തണ്ടപ്പേര് ലഭിക്കും.',
          requiredDocuments: ['പുതിയ കരം രസീത്'],
          authorityName: 'റവന്യൂ റെക്കോർഡ്സ് ഓഫീസ്',
          nextActionPrompt: 'അവസാന ഘട്ടം.',
        },
      ],
    },
    pa: {
      title: 'ਜ਼ਮੀਨ ਦੀ ਵਰਾਸਤ / ਇੰਤਕਾਲ ਦਰਜ ਕਰਨ ਦੀ ਪ੍ਰਕਿਰਿਆ',
      category: 'ਮਾਲ ਵਿਭਾਗ',
      steps: [
        {
          title: 'ਲੋੜੀਂਦੇ ਦਸਤਾਵੇਜ਼ ਤਿਆਰ ਕਰਨਾ',
          description: 'ਮੌਤ ਦਾ ਸਰਟੀਫਿਕੇਟ, ਵਾਰਸਨਾਮਾ ਅਤੇ ਆਧਾਰ ਕਾਰਡ ਤਿਆਰ ਕੀਤੇ ਗਏ।',
          requiredDocuments: ['ਮੌਤ ਦਾ ਸਰਟੀਫਿਕੇਟ', 'ਵਾਰਸਨਾਮਾ', 'ਆਧਾਰ ਕਾਰਡ'],
          authorityName: 'ਗ੍ਰਾਮ ਪੰਚਾਇਤ / ਪਟਵਾਰੀ',
          nextActionPrompt: 'ਕਾਗਜ਼ਾਤ ਤਿਆਰ ਹੋ ਚੁੱਕੇ ਹਨ।',
        },
        {
          title: 'ਦਫ਼ਤਰ ਵਿੱਚ ਅਰਜ਼ੀ ਜਮ੍ਹਾਂ ਕਰਵਾਉਣੀ',
          description: 'ਜ਼ਮੀਨ ਦਾ ਇੰਤਕਾਲ ਦਰਜ ਕਰਵਾਉਣ ਲਈ ਪਟਵਾਰੀ ਦਫ਼ਤਰ ਵਿੱਚ ਅਰਜ਼ੀ ਦਿੱਤੀ ਗਈ।',
          requiredDocuments: ['ਅਰਜ਼ੀ ਫ਼ਾਰਮ', 'ਸਹਿਮਤੀ ਹਲਫ਼ਨਾਮਾ'],
          authorityName: 'ਪਟਵਾਰੀ ਦਫ਼ਤਰ',
          nextActionPrompt: 'ਅਰਜ਼ੀ ਜਮ੍ਹਾਂ ਹੋ ਚੁੱਕੀ ਹੈ।',
        },
        {
          title: 'ਸਰਕਾਰੀ ਮੋਹਰ ਵਾਲੀ ਰਸੀਦ ਪ੍ਰਾਪਤ ਕਰਨਾ',
          description: 'ਅਰਜ਼ੀ ਦੇਣ ਤੋਂ ਬਾਅਦ ਅਧਿਕਾਰੀ ਕੋਲੋਂ ਮੋਹਰ ਲੱਗੀ ਰਸੀਦ ਜਾਂ ਐਸਐਮਐਸ ਪ੍ਰਾਪਤ ਕੀਤਾ।',
          requiredDocuments: ['ਮੋਹਰ ਲੱਗੀ ਰਸੀਦ'],
          authorityName: 'ਮਾਲ ਸੇਵਾ ਕੇਂਦਰ',
          nextActionPrompt: 'ਜੇਕਰ ਤੁਹਾਡੇ ਕੋਲ ਰਸੀਦ ਹੈ ਤਾਂ ਹੇਠਾਂ "ਰਸੀਦ ਸ਼ਾਮਲ ਕਰੋ" ਤੇ ਕਲਿੱਕ ਕਰੋ।',
        },
        {
          title: '15 ਦਿਨਾਂ ਦੀ ਇਤਰਾਜ਼ ਦਰਜ ਕਰਨ ਦੀ ਮਿਆਦ',
          description: 'ਕਿਸੇ ਹੋਰ ਹਿੱਸੇਦਾਰ ਨੂੰ ਇਤਰਾਜ਼ ਹੋਵੇ ਤਾਂ ਦੱਸਣ ਲਈ 15 ਦਿਨਾਂ ਦਾ ਸਮਾਂ (15 ਅਕਤੂਬਰ ਤੱਕ)।',
          requiredDocuments: ['ਨੋਟਿਸ ਕਾਪੀ'],
          authorityName: 'ਤਹਿਸੀਲਦਾਰ ਦਫ਼ਤਰ',
          nextActionPrompt: '15 ਅਕਤੂਬਰ ਤੱਕ ਉਡੀਕ ਕਰੋ।',
        },
        {
          title: 'ਜਮ੍ਹਾਂਬੰਦੀ ਵਿੱਚ ਨਾਮ ਦਰਜ ਹੋਣਾ',
          description: 'ਕੋਈ ਇਤਰਾਜ਼ ਨਾ ਆਉਣ ਤੇ ਇੰਤਕਾਲ ਮਨਜ਼ੂਰ ਹੋਵੇਗਾ ਅਤੇ ਨਵੀਂ ਜਮ੍ਹਾਂਬੰਦੀ ਵਿੱਚ ਨਾਮ ਚੜ੍ਹ ਜਾਵੇਗਾ।',
          requiredDocuments: ['ਨਵੀਂ ਜਮ੍ਹਾਂਬੰਦੀ ਦੀ ਨਕਲ'],
          authorityName: 'ਮਾਲ ਰਿਕਾਰਡ ਸ਼ਾਖਾ',
          nextActionPrompt: 'ਆਖ਼ਰੀ ਪੜਾਅ।',
        },
      ],
    },
    or: {
      title: 'ଜମି ଉତ୍ତରାଧିକାର ନାମଜାରୀ (ମ୍ୟୁଟେସନ) ପ୍ରକ୍ରିୟା',
      category: 'ରାଜସ୍ୱ ବିଭାଗ',
      steps: [
        {
          title: 'ଆବଶ୍ୟକୀୟ କାଗଜପତ୍ର ପ୍ରସ୍ତୁତ କରିବା',
          description: 'ମୃତ୍ୟୁ ପ୍ରମାଣପତ୍ର, ଉତ୍ତରାଧିକାର ପ୍ରମାଣପତ୍ର ଏବଂ ଆଧାର କାର୍ଡ ପ୍ରସ୍ତୁତ କରାଗଲା।',
          requiredDocuments: ['ମୃତ୍ୟୁ ପ୍ରମାଣପତ୍ର', 'ଉତ୍ତରାଧିକାର ପତ୍ର', 'ଆଧାର କାର୍ଡ'],
          authorityName: 'ଗ୍ରାମ ପଞ୍ଚାୟତ / ରାଜସ୍ୱ ନିରୀକ୍ଷକ',
          nextActionPrompt: 'କାଗଜପତ୍ର ପ୍ରସ୍ତୁତ ହୋଇସାରିଛି।',
        },
        {
          title: 'କାର୍ଯ୍ୟାଳୟରେ ଦରଖାସ୍ତ ଦାଖଲ କରିବା',
          description: 'ଜମି ନାମଜାରୀ ପାଇଁ ତହସିଲ କାର୍ଯ୍ୟାଳୟରେ ଦରଖାସ୍ତ ପ୍ରଦାନ କରାଗଲା।',
          requiredDocuments: ['ଦରଖାସ୍ତ ଫର୍ମ', 'ସମ୍ମତି ଶପଥପତ୍ର'],
          authorityName: 'ତହସିଲଦାର କାର୍ଯ୍ୟାଳୟ',
          nextActionPrompt: 'ଦରଖାସ୍ତ ଦାଖଲ ସମ୍ପନ୍ନ ହୋଇଛି।',
        },
        {
          title: 'ସିଲ୍ ଥିବା ଅଫିସିଆଲ ରସିଦ ପାଇବା',
          description: 'ଦରଖାସ୍ତ ଦେବା ପରେ ଅଧିକାରୀଙ୍କଠାରୁ ସିଲ୍ ଥିବା ରସିଦ କିମ୍ବା ଏସଏମଏସ ଗ୍ରହଣ କରାଗଲା।',
          requiredDocuments: ['ସିଲ୍ ଥିବା ରସିଦ'],
          authorityName: 'ରାଜସ୍ୱ ସେବା କେନ୍ଦ୍ର',
          nextActionPrompt: 'ରସିଦ ଥିଲେ ତଳେ "ରସିଦ ସଂଯୋଗ କରନ୍ତୁ" ଉପରେ କ୍ଲିକ୍ କରନ୍ତୁ।',
        },
        {
          title: '୧୫ ଦିନର ଆପତ୍ତି ଦାଖଲ ସମୟସୀମା',
          description: 'ଅନ୍ୟ କାହାର ଆପତ୍ତି ଥିଲେ ଜଣାଇବା ପାଇଁ ୧୫ ଦିନର ସମୟ (୧୫ ଅକ୍ଟୋବର ପର୍ଯ୍ୟନ୍ତ)।',
          requiredDocuments: ['ନୋଟିସ ନକଲ'],
          authorityName: 'ତହସିଲଦାର କାର୍ଯ୍ୟାଳୟ',
          nextActionPrompt: '୧୫ ଅକ୍ଟୋବର ପର୍ଯ୍ୟନ୍ତ ଅପେକ୍ଷା କରନ୍ତୁ।',
        },
        {
          title: 'ପଟ୍ଟାରେ ଚୂଡ଼ାନ୍ତ ନାମ ପଞ୍ଜୀକରଣ',
          description: 'କୌଣସି ଆପତ୍ତି ନଆସିଲେ ଆଦେଶ ପାରିତ ହୋଇ ନୂତନ ପଟ୍ଟାରେ ନାମ ଦରଜ ହେବ।',
          requiredDocuments: ['ନୂତନ ପଟ୍ଟା ନକଲ'],
          authorityName: 'ରାଜସ୍ୱ ରେକର୍ଡ ଶାଖା',
          nextActionPrompt: 'ଚୂଡ଼ାନ୍ତ ପର୍ଯ୍ୟାୟ।',
        },
      ],
    },
  };

  const currentJourney = journeys[lang] || journeys.hi;
  return {
    id: 'process-land-mutation',
    title: currentJourney.title,
    category: currentJourney.category,
    currentStepIndex: 2,
    updatedAt: '2026-09-26',
    steps: currentJourney.steps.map((st, idx) => ({
      id: `step-${idx + 1}`,
      stepNumber: idx + 1,
      title: st.title,
      description: st.description,
      requiredDocuments: st.requiredDocuments,
      authorityName: st.authorityName,
      evidenceLevel: idx === 0 ? 'uploaded_doc' : idx === 1 || idx === 2 ? 'official_proof' : 'no_proof',
      status: idx < 2 ? 'completed' : idx === 2 ? 'in_progress' : 'pending',
      nextActionPrompt: st.nextActionPrompt,
    })),
  };
}

// Initial Evidence Records localized for all 11 supported languages
export function getInitialRecords(lang: LanguageCode): EvidenceRecord[] {
  const recordsMap: Record<LanguageCode, [EvidenceRecord, EvidenceRecord]> = {
    hi: [
      {
        id: 'rec-001',
        title: 'तलाटी कार्यालय की मुहरबंद आवेदन पावती',
        date: '2026-09-24',
        receiptNumber: 'TAL/RAMP/2026/0912',
        sourceType: 'official_receipt',
        evidenceLevel: 'official_proof',
        notes: 'तलाटी अधिकारी द्वारा जारी मूल मुहरबंद रसीद।',
        relatedProcessStepId: 'step-3',
      },
      {
        id: 'rec-002',
        title: 'वारिसनामा की प्रमाणित प्रति',
        date: '2026-09-20',
        receiptNumber: 'PEDHI/2026/41',
        sourceType: 'stamped_copy',
        evidenceLevel: 'uploaded_doc',
        notes: 'पंचायत सदस्यों के हस्ताक्षर युक्त वारिसनामा।',
        relatedProcessStepId: 'step-1',
      },
    ],
    en: [
      {
        id: 'rec-001',
        title: 'Revenue Office Stamped Acknowledgment Slip',
        date: '2026-09-24',
        receiptNumber: 'TAL/RAMP/2026/0912',
        sourceType: 'official_receipt',
        evidenceLevel: 'official_proof',
        notes: 'Original stamped physical slip issued by Talati officer.',
        relatedProcessStepId: 'step-3',
      },
      {
        id: 'rec-002',
        title: 'Scanned Succession Tree Certificate',
        date: '2026-09-20',
        receiptNumber: 'PEDHI/2026/41',
        sourceType: 'stamped_copy',
        evidenceLevel: 'uploaded_doc',
        notes: 'Succession certificate bearing official signatures of Panchayat members.',
        relatedProcessStepId: 'step-1',
      },
    ],
    gu: [
      {
        id: 'rec-001',
        title: 'તલાટી કચેરી સિક્કાવાળી અરજી પહોંચ',
        date: '2026-09-24',
        receiptNumber: 'TAL/RAMP/2026/0912',
        sourceType: 'official_receipt',
        evidenceLevel: 'official_proof',
        notes: 'તલાટી સાહેબ પાસેથી મેળવેલ અસલ સિક્કાવાળી પાવતી.',
        relatedProcessStepId: 'step-3',
      },
      {
        id: 'rec-002',
        title: 'પેઢીનામાની સ્કેન કરેલ નકલ',
        date: '2026-09-20',
        receiptNumber: 'PEDHI/2026/41',
        sourceType: 'stamped_copy',
        evidenceLevel: 'uploaded_doc',
        notes: 'પંચાયત સભ્ય અને સરપંચના સહી-સિક્કાવાળું પેઢીનામું.',
        relatedProcessStepId: 'step-1',
      },
    ],
    bn: [
      {
        id: 'rec-001',
        title: 'তহশিল কার্যালয়ের সিলমোহরযুক্ত রসিদ',
        date: '2026-09-24',
        receiptNumber: 'TAL/RAMP/2026/0912',
        sourceType: 'official_receipt',
        evidenceLevel: 'official_proof',
        notes: 'রাজস্ব কর্মকর্তা কর্তৃক প্রদত্ত সিলমোহরযুক্ত মূল প্রাপ্তিস্বীকার রসিদ।',
        relatedProcessStepId: 'step-3',
      },
      {
        id: 'rec-002',
        title: 'ওয়ারিশান সনদের স্ক্যান কপি',
        date: '2026-09-20',
        receiptNumber: 'PEDHI/2026/41',
        sourceType: 'stamped_copy',
        evidenceLevel: 'uploaded_doc',
        notes: 'পঞ্চায়েত প্রধানের স্বাক্ষর সম্বলিত ওয়ারিশান সনদ।',
        relatedProcessStepId: 'step-1',
      },
    ],
    mr: [
      {
        id: 'rec-001',
        title: 'तलाठी कार्यालयाची शिक्का असलेली पोचपावती',
        date: '2026-09-24',
        receiptNumber: 'TAL/RAMP/2026/0912',
        sourceType: 'official_receipt',
        evidenceLevel: 'official_proof',
        notes: 'तलाठी अधिकाऱ्याने दिलेली मूळ शिक्का असलेली पोचपावती.',
        relatedProcessStepId: 'step-3',
      },
      {
        id: 'rec-002',
        title: 'वारस दाखल्याची स्कॅन प्रत',
        date: '2026-09-20',
        receiptNumber: 'PEDHI/2026/41',
        sourceType: 'stamped_copy',
        evidenceLevel: 'uploaded_doc',
        notes: 'ग्रामपंचायत सदस्यांच्या स्वाक्षरीचा वारस दाखला.',
        relatedProcessStepId: 'step-1',
      },
    ],
    ta: [
      {
        id: 'rec-001',
        title: 'வருவாய் அலுவலக முத்திரையிடப்பட்ட ரசீது',
        date: '2026-09-24',
        receiptNumber: 'TAL/RAMP/2026/0912',
        sourceType: 'official_receipt',
        evidenceLevel: 'official_proof',
        notes: 'அதிகாரியால் வழங்கப்பட்ட முத்திரையிடப்பட்ட அசல் ஒப்புகைச் சீட்டு.',
        relatedProcessStepId: 'step-3',
      },
      {
        id: 'rec-002',
        title: 'வாரிசு சான்றிதழ் நகல்',
        date: '2026-09-20',
        receiptNumber: 'PEDHI/2026/41',
        sourceType: 'stamped_copy',
        evidenceLevel: 'uploaded_doc',
        notes: 'அதிகாரப்பூர்வ கையொப்பமிட்ட வாரிசு சான்றிதழ்.',
        relatedProcessStepId: 'step-1',
      },
    ],
    te: [
      {
        id: 'rec-001',
        title: 'రెవెన్యూ కార్యాలయ అధికారిక స్టాంప్ రసీదు',
        date: '2026-09-24',
        receiptNumber: 'TAL/RAMP/2026/0912',
        sourceType: 'official_receipt',
        evidenceLevel: 'official_proof',
        notes: 'అధికారి అందించిన ఒరిజినల్ స్టాంప్ రసీదు.',
        relatedProcessStepId: 'step-3',
      },
      {
        id: 'rec-002',
        title: 'వారసత్వ ధృవీకరణ పత్రం ప్రతి',
        date: '2026-09-20',
        receiptNumber: 'PEDHI/2026/41',
        sourceType: 'stamped_copy',
        evidenceLevel: 'uploaded_doc',
        notes: 'పంచాయతీ సభ్యుల సంతకాలతో కూడిన వారసత్వ పత్రం.',
        relatedProcessStepId: 'step-1',
      },
    ],
    kn: [
      {
        id: 'rec-001',
        title: 'ಕಂದಾಯ ಕಚೇರಿ ಮೊಹರು ಮಾಡಿದ ಅರ್ಜಿ ರಸೀದಿ',
        date: '2026-09-24',
        receiptNumber: 'TAL/RAMP/2026/0912',
        sourceType: 'official_receipt',
        evidenceLevel: 'official_proof',
        notes: 'ಕಂದಾಯ ಅಧಿಕಾರಿಯಿಂದ ನೀಡಲಾದ ಅಧಿಕೃತ ಮೊಹರಿನ ರಸೀದಿ.',
        relatedProcessStepId: 'step-3',
      },
      {
        id: 'rec-002',
        title: 'ವಾರಸುದಾರಿಕೆ ಪ್ರಮಾಣಪತ್ರದ ಪ್ರತಿ',
        date: '2026-09-20',
        receiptNumber: 'PEDHI/2026/41',
        sourceType: 'stamped_copy',
        evidenceLevel: 'uploaded_doc',
        notes: 'ಪಂಚಾಯಿತಿ ಸದಸ್ಯರ ಸಹಿ ಹೊಂದಿರುವ ವಾರಸುದಾರಿಕೆ ಪತ್ರ.',
        relatedProcessStepId: 'step-1',
      },
    ],
    ml: [
      {
        id: 'rec-001',
        title: 'വില്ലേജ് ഓഫീസ് മുദ്ര പതിപ്പിച്ച കൈപ്പറ്റ് രസീത്',
        date: '2026-09-24',
        receiptNumber: 'TAL/RAMP/2026/0912',
        sourceType: 'official_receipt',
        evidenceLevel: 'official_proof',
        notes: 'വില്ലേജ് ഓഫീസിൽ നിന്ന് ലഭിച്ച മുദ്ര പതിപ്പിച്ച അസ്സൽ രസീത്.',
        relatedProcessStepId: 'step-3',
      },
      {
        id: 'rec-002',
        title: 'അവകാശ സർട്ടിഫിക്കറ്റിന്റെ കോപ്പി',
        date: '2026-09-20',
        receiptNumber: 'PEDHI/2026/41',
        sourceType: 'stamped_copy',
        evidenceLevel: 'uploaded_doc',
        notes: 'പഞ്ചായത്ത് അധികാരി ഒപ്പിട്ട അനന്തരാവകാശ സർട്ടിഫിക്കറ്റ്.',
        relatedProcessStepId: 'step-1',
      },
    ],
    pa: [
      {
        id: 'rec-001',
        title: 'ਪਟਵਾਰੀ ਦਫ਼ਤਰ ਦੀ ਮੋਹਰ ਲੱਗੀ ਰਸੀਦ',
        date: '2026-09-24',
        receiptNumber: 'TAL/RAMP/2026/0912',
        sourceType: 'official_receipt',
        evidenceLevel: 'official_proof',
        notes: 'ਪਟਵਾਰੀ ਵੱਲੋਂ ਜਾਰੀ ਕੀਤੀ ਗਈ ਅਸਲ ਮੋਹਰ ਵਾਲੀ ਰਸੀਦ।',
        relatedProcessStepId: 'step-3',
      },
      {
        id: 'rec-002',
        title: 'ਵਾਰਸਨਾਮੇ ਦੀ ਸਕੈਨ ਕੀਤੀ ਨਕਲ',
        date: '2026-09-20',
        receiptNumber: 'PEDHI/2026/41',
        sourceType: 'stamped_copy',
        evidenceLevel: 'uploaded_doc',
        notes: 'ਪੰਚਾਇਤ ਮੈਂਬਰਾਂ ਦੇ ਦਸਤਖ਼ਤਾਂ ਵਾਲਾ ਵਾਰਸਨਾਮਾ।',
        relatedProcessStepId: 'step-1',
      },
    ],
    or: [
      {
        id: 'rec-001',
        title: 'ତହସିଲ କାର୍ଯ୍ୟାଳୟର ସିଲ୍ ଥିବା ଦରଖାସ୍ତ ରସିଦ',
        date: '2026-09-24',
        receiptNumber: 'TAL/RAMP/2026/0912',
        sourceType: 'official_receipt',
        evidenceLevel: 'official_proof',
        notes: 'ରାଜସ୍ୱ ଅଧିକାରୀଙ୍କ ଦ୍ୱାରା ପ୍ରଦତ୍ତ ମୂଳ ସିଲ୍ ଥିବା ରସିଦ।',
        relatedProcessStepId: 'step-3',
      },
      {
        id: 'rec-002',
        title: 'ଉତ୍ତରାଧିକାର ପ୍ରମାଣପତ୍ରର ନକଲ',
        date: '2026-09-20',
        receiptNumber: 'PEDHI/2026/41',
        sourceType: 'stamped_copy',
        evidenceLevel: 'uploaded_doc',
        notes: 'ପଞ୍ଚାୟତ ସଦସ୍ୟଙ୍କ ଦସ୍ତଖତ ଥିବା ଉତ୍ତରାଧିକାର ପତ୍ର।',
        relatedProcessStepId: 'step-1',
      },
    ],
  };

  return recordsMap[lang] || recordsMap.hi;
}

// Initial Trusted Helper localized for all 11 supported languages
export function getInitialHelper(lang: LanguageCode): TrustedHelper {
  const relMap: Record<LanguageCode, { rel: string; desc: string; time: string }> = {
    hi: {
      rel: 'पुत्र',
      desc: 'महेश आपकी ओर से वारसाई फॉर्म जमा करना चाहता है।',
      time: 'आज, सुबह 10:15',
    },
    en: {
      rel: 'Son',
      desc: 'Mahesh wants to submit the inheritance response form on your behalf.',
      time: 'Today, 10:15 AM',
    },
    gu: {
      rel: 'દીકરો',
      desc: 'મહેશ તમારા વતી વારસાઈ ફોર્મ જમા કરવા માંગે છે.',
      time: 'આજે, સવારે ૧૦:૧૫',
    },
    bn: {
      rel: 'পুত্র',
      desc: 'মহেশ আপনার পক্ষ থেকে উত্তরাধিকার ফরম জমা দিতে চায়।',
      time: 'আজ, সকাল ১০:১৫',
    },
    mr: {
      rel: 'मुलगा',
      desc: 'महेश आपल्या वतीने वारसा अर्ज सादर करू इच्छितो.',
      time: 'आज, सकाळी १०:१५',
    },
    ta: {
      rel: 'மகன்',
      desc: 'மகேஷ் உங்கள் சார்பாக வாரிசு உரிமை படிவத்தை சமர்ப்பிக்க விரும்புகிறார்.',
      time: 'இன்று, காலை 10:15',
    },
    te: {
      rel: 'కుమారుడు',
      desc: 'మహేష్ మీ తరపున వారసత్వ దరఖాస్తును సమర్పించాలనుకుంటున్నారు.',
      time: 'ఈరోజు, ఉదయం 10:15',
    },
    kn: {
      rel: 'ಮಗ',
      desc: 'ಮಹೇಶ್ ನಿಮ್ಮ ಪರವಾಗಿ ವಾರಸುದಾರಿಕೆ ಅರ್ಜಿಯನ್ನು ಸಲ್ಲಿಸಲು ಬಯಸುತ್ತಾರೆ.',
      time: 'ಇಂದು, ಬೆಳಗ್ಗೆ 10:15',
    },
    ml: {
      rel: 'മകൻ',
      desc: 'മഹേഷ് നിങ്ങളുടെ പേരിൽ അനന്തരാവകാശ ഫോറം സമർപ്പിക്കാൻ ആഗ്രഹിക്കുന്നു.',
      time: 'ഇന്ന്, രാവിലെ 10:15',
    },
    pa: {
      rel: 'ਪੁੱਤਰ',
      desc: 'ਮਹੇਸ਼ ਤੁਹਾਡੇ ਵੱਲੋਂ ਵਰਾਸਤ ਦਾ ਫ਼ਾਰਮ ਜਮ੍ਹਾਂ ਕਰਵਾਉਣਾ ਚਾਹੁੰਦਾ ਹੈ।',
      time: 'ਅੱਜ, ਸਵੇਰੇ 10:15',
    },
    or: {
      rel: 'ପୁଅ',
      desc: 'ମହେଶ ଆପଣଙ୍କ ତରଫରୁ ଉତ୍ତରାଧିକାର ଫର୍ମ ଦାଖଲ କରିବାକୁ ଚାହୁଁଛନ୍ତି।',
      time: 'ଆଜି, ସକାଳ ୧୦:୧୫',
    },
  };

  const item = relMap[lang] || relMap.hi;
  return {
    id: 'helper-001',
    name: 'Mahesh Patel',
    relationship: item.rel,
    phone: '+91 98250 14892',
    permissions: {
      canViewStatus: true,
      canViewDocuments: true,
      canUploadProof: true,
      canDeleteRecords: false,
      canChangeInfoWithoutApproval: false,
    },
    pendingApproval: {
      actionId: 'act-submit-succession',
      description: item.desc,
      requestedTime: item.time,
      status: 'pending',
    },
  };
}

// Initial Reminders localized for all 11 supported languages
export function getInitialReminders(lang: LanguageCode): TaskReminder[] {
  const remMap: Record<LanguageCode, [TaskReminder, TaskReminder]> = {
    hi: [
      {
        id: 'rem-001',
        title: 'जमीन वारसाई नोटिस आपत्ति की अंतिम तिथि',
        dueDate: '15 अक्टूबर 2026',
        isUrgent: true,
        documentTitle: 'नोटिस क्रमांक: REV/2026/8492',
        smsPreview: 'न्यायसाथी: आपके जमीन के काम के लिए 15 अक्टूबर एक महत्वपूर्ण तारीख है। विवरण देखने के लिए न्यायसाथी खोलें।',
        isCompleted: false,
      },
      {
        id: 'rem-002',
        title: 'नए खतौनी रिकॉर्ड की स्थिति जांच',
        dueDate: '25 अक्टूबर 2026',
        isUrgent: false,
        documentTitle: 'खाता नं. 142/3',
        smsPreview: 'न्यायसाथी: आपके जमीन के नए रिकॉर्ड की स्थिति जांचने का समय हो गया है।',
        isCompleted: false,
      },
    ],
    en: [
      {
        id: 'rem-001',
        title: 'Land Mutation Notice Objection Deadline',
        dueDate: '15 October 2026',
        isUrgent: true,
        documentTitle: 'Notice Number: REV/2026/8492',
        smsPreview: 'NyayaSaathi: 15 October is an important date for your land process. Open NyayaSaathi to view details.',
        isCompleted: false,
      },
      {
        id: 'rem-002',
        title: 'Check Updated Title Verification',
        dueDate: '25 October 2026',
        isUrgent: false,
        documentTitle: 'Survey No. 142/3',
        smsPreview: 'NyayaSaathi: It is time to check the status of your new land title record.',
        isCompleted: false,
      },
    ],
    gu: [
      {
        id: 'rem-001',
        title: 'જમીનની વારસાઈ નોટિસ વાંધા મુદત',
        dueDate: '૧૫ ઓક્ટોબર ૨૦૨૬',
        isUrgent: true,
        documentTitle: 'નોટિસ ક્રમાંક: REV/2026/8492',
        smsPreview: 'ન્યાયસાથી: તમારા જમીનના કામ માટે ૧૫ ઓક્ટોબર મહત્વપૂર્ણ તારીખ છે. વિગત જોવા ન્યાયસાથી ખોલો.',
        isCompleted: false,
      },
      {
        id: 'rem-002',
        title: 'નવી ૭/૧૨ નકલની ચકાસણી',
        dueDate: '૨૫ ઓક્ટોબર ૨૦૨૬',
        isUrgent: false,
        documentTitle: 'ખાતા નં. ૧૪૨/૩',
        smsPreview: 'ન્યાયસાથી: તમારી જમીનની નવી નોંધની સ્થિતિ ચકાસવાનો સમય થયો છે.',
        isCompleted: false,
      },
    ],
    bn: [
      {
        id: 'rem-001',
        title: 'জমির উত্তরাধিকার নোটিশের আপত্তির শেষ তারিখ',
        dueDate: '১৫ অক্টোবর ২০২৬',
        isUrgent: true,
        documentTitle: 'নোটিশ নম্বর: REV/2026/8492',
        smsPreview: 'ন্যায়সাথী: আপনার জমির কাজের জন্য ১৫ অক্টোবর একটি গুরুত্বপূর্ণ তারিখ। বিস্তারিত দেখতে ন্যায়সাথী খুলুন।',
        isCompleted: false,
      },
      {
        id: 'rem-002',
        title: 'নতুন খতিয়ান রেকর্ডের অবস্থা যাচাই',
        dueDate: '২৫ অক্টোবর ২০২৬',
        isUrgent: false,
        documentTitle: 'দাগ নং ১৪২/৩',
        smsPreview: 'ন্যায়সাথী: আপনার জমির নতুন রেকর্ডের অবস্থা যাচাই করার সময় হয়েছে।',
        isCompleted: false,
      },
    ],
    mr: [
      {
        id: 'rem-001',
        title: 'जमीन वारसा नोटीस हरकत मुदत',
        dueDate: '१५ ऑक्टोबर २०२६',
        isUrgent: true,
        documentTitle: 'नोटीस क्रमांक: REV/2026/8492',
        smsPreview: 'न्यायसाथी: आपल्या जमिनीच्या कामासाठी १५ ऑक्टोबर ही महत्त्वाची तारीख आहे. माहिती पाहण्यासाठी न्यायसाथी उघडा.',
        isCompleted: false,
      },
      {
        id: 'rem-002',
        title: 'नवीन ७/१२ नोंदीची तपासणी',
        dueDate: '२५ ऑक्टोबर २०२६',
        isUrgent: false,
        documentTitle: 'सर्व्हे क्र. १४२/३',
        smsPreview: 'न्यायसाथी: आपल्या जमिनीच्या नवीन नोंदीची स्थिती तपासण्याची वेळ झाली आहे.',
        isCompleted: false,
      },
    ],
    ta: [
      {
        id: 'rem-001',
        title: 'நில வாரிசு நோட்டீஸ் ஆட்சேபனை கடைசி நாள்',
        dueDate: '15 அக்டோபர் 2026',
        isUrgent: true,
        documentTitle: 'நோட்டீஸ் எண்: REV/2026/8492',
        smsPreview: 'நியாயசாதி: உங்கள் நிலப் பணிக்கு அக்டோபர் 15 முக்கியமான தேதி. விவரங்களை அறிய நியாயசாதியைத் திறக்கவும்.',
        isCompleted: false,
      },
      {
        id: 'rem-002',
        title: 'புதிய பட்டா விவரங்கள் சரிபார்த்தல்',
        dueDate: '25 அக்டோபர் 2026',
        isUrgent: false,
        documentTitle: 'சர்வே எண் 142/3',
        smsPreview: 'நியாயசாதி: உங்கள் புதிய பட்டா பதிவின் நிலையை சரிபார்க்கும் நேரம் இது.',
        isCompleted: false,
      },
    ],
    te: [
      {
        id: 'rem-001',
        title: 'భూమి వారసత్వ నోటీసు అభ్యంతరాల గడువు',
        dueDate: '15 అక్టోబర్ 2026',
        isUrgent: true,
        documentTitle: 'నోటీసు సంఖ్య: REV/2026/8492',
        smsPreview: 'న్యాయసాథి: మీ భూమి పనికి అక్టోబర్ 15 ముఖ్యమైన తేదీ. వివరాలు చూడటానికి న్యాయసాథి తెరవండి.',
        isCompleted: false,
      },
      {
        id: 'rem-002',
        title: 'కొత్త రికార్డుల స్థితి పరిశీలన',
        dueDate: '25 అక్టోబర్ 2026',
        isUrgent: false,
        documentTitle: 'సర్వే నం. 142/3',
        smsPreview: 'న్యాయసాథి: మీ భూమి కొత్త రికార్డు స్థితిని తనిఖీ చేసుకునే సమయం వచ్చింది.',
        isCompleted: false,
      },
    ],
    kn: [
      {
        id: 'rem-001',
        title: 'ಭೂಮಿ ವಾರಸುದಾರಿಕೆ ನೋಟಿಸ್ ಆಕ್ಷೇಪಣೆ ಕೊನೆಯ ದಿನಾಂಕ',
        dueDate: '15 ಅಕ್ಟೋಬರ್ 2026',
        isUrgent: true,
        documentTitle: 'ನೋಟಿಸ್ ಸಂಖ್ಯೆ: REV/2026/8492',
        smsPreview: 'ನ್ಯಾಯಸಾಥಿ: ನಿಮ್ಮ ಜಮೀನಿನ ಕೆಲಸಕ್ಕೆ ಅಕ್ಟೋಬರ್ 15 ಮುಖ್ಯವಾದ ದಿನಾಂಕ. ವಿವರ ನೋಡಲು ನ್ಯಾಯಸಾಥಿ ತೆರೆಯಿರಿ.',
        isCompleted: false,
      },
      {
        id: 'rem-002',
        title: 'ಹೊಸ ಪಹಣಿ ದಾಖಲೆ ಪರಿಶೀಲನೆ',
        dueDate: '25 ಅಕ್ಟೋಬರ್ 2026',
        isUrgent: false,
        documentTitle: 'ಸರ್ವೇ ನಂ. 142/3',
        smsPreview: 'ನ್ಯಾಯಸಾಥಿ: ನಿಮ್ಮ ಜಮೀನಿನ ಹೊಸ ದಾಖಲೆಯ ಸ್ಥಿತಿಯನ್ನು ಪರಿಶೀಲಿಸುವ ಸಮಯ ಬಂದಿದೆ.',
        isCompleted: false,
      },
    ],
    ml: [
      {
        id: 'rem-001',
        title: 'ഭൂമി പോക്കുവരവ് നോട്ടീസ് തടസ്സവാദ അവസാന തീയതി',
        dueDate: '15 ഒക്ടോബർ 2026',
        isUrgent: true,
        documentTitle: 'നോട്ടീസ് നമ്പർ: REV/2026/8492',
        smsPreview: 'ന്യായസാഥി: നിങ്ങളുടെ ഭൂമി സംബന്ധമായ ജോലിക്ക് ഒക്ടോബർ 15 പ്രധാനപ്പെട്ട തീയതിയാണ്. കൂടുതൽ വിവരങ്ങൾക്ക് ന്യായസാഥി തുറക്കുക.',
        isCompleted: false,
      },
      {
        id: 'rem-002',
        title: 'പുതിയ റവന്യൂ റെക്കോർഡ് പരിശോധന',
        dueDate: '25 ഒക്ടോബർ 2026',
        isUrgent: false,
        documentTitle: 'സർവേ നം. 142/3',
        smsPreview: 'ന്യായസാഥി: നിങ്ങളുടെ പുതിയ ഭൂമി റെക്കോർഡിന്റെ അവസ്ഥ പരിശോധിക്കേണ്ട സമയമായി.',
        isCompleted: false,
      },
    ],
    pa: [
      {
        id: 'rem-001',
        title: 'ਜ਼ਮੀਨ ਇੰਤਕਾਲ ਨੋਟਿਸ ਇਤਰਾਜ਼ ਦਰਜ ਕਰਨ ਦੀ ਆਖ਼ਰੀ ਮਿਤੀ',
        dueDate: '15 ਅਕਤੂਬਰ 2026',
        isUrgent: true,
        documentTitle: 'ਨੋਟਿਸ ਨੰਬਰ: REV/2026/8492',
        smsPreview: 'ਨਿਆਇਸਾਥੀ: ਤੁਹਾਡੇ ਜ਼ਮੀਨ ਦੇ ਕੰਮ ਲਈ 15 ਅਕਤੂਬਰ ਇੱਕ ਅਹਿਮ ਤਾਰੀਖ਼ ਹੈ। ਵੇਰਵੇ ਦੇਖਣ ਲਈ ਨਿਆਇਸਾਥੀ ਖੋਲ੍ਹੋ।',
        isCompleted: false,
      },
      {
        id: 'rem-002',
        title: 'ਨਵੀਂ ਜਮ੍ਹਾਂਬੰਦੀ ਰਿਕਾਰਡ ਦੀ ਜਾਂਚ',
        dueDate: '25 ਅਕਤੂਬਰ 2026',
        isUrgent: false,
        documentTitle: 'ਖਸਰਾ ਨੰ. 142/3',
        smsPreview: 'ਨਿਆਇਸਾਥੀ: ਤੁਹਾਡੀ ਜ਼ਮੀਨ ਦੇ ਨਵੇਂ ਰਿਕਾਰਡ ਦੀ ਸਥਿਤੀ ਦੇਖਣ ਦਾ ਸਮਾਂ ਹੋ ਗਿਆ ਹੈ।',
        isCompleted: false,
      },
    ],
    or: [
      {
        id: 'rem-001',
        title: 'ଜମି ନାମଜାରୀ ନୋଟିସ ଆପତ୍ତି ଶେଷ ତାରିଖ',
        dueDate: '୧୫ ଅକ୍ଟୋବର ୨୦୨୬',
        isUrgent: true,
        documentTitle: 'ନୋଟିସ ନମ୍ବର: REV/2026/8492',
        smsPreview: 'ନ୍ୟାୟସାଥୀ: ଆପଣଙ୍କ ଜମି କାମ ପାଇଁ ୧୫ ଅକ୍ଟୋବର ଏକ ଗୁରୁତ୍ୱପୂର୍ଣ୍ଣ ତାରିଖ। ବିବରଣୀ ଦେଖିବାକୁ ନ୍ୟାୟସାଥୀ ଖୋଲନ୍ତୁ।',
        isCompleted: false,
      },
      {
        id: 'rem-002',
        title: 'ନୂତନ ପଟ୍ଟା ସ୍ଥିତି ଯାଞ୍ଚ',
        dueDate: '୨୫ ଅକ୍ଟୋବର ୨୦୨୬',
        isUrgent: false,
        documentTitle: 'ପ୍ଲଟ ନଂ. ୧୪୨/୩',
        smsPreview: 'ନ୍ୟାୟସାଥୀ: ଆପଣଙ୍କ ନୂତନ ଜମି ରେକର୍ଡର ସ୍ଥିତି ଯାଞ୍ଚ କରିବାର ସମୟ ହୋଇଛି।',
        isCompleted: false,
      },
    ],
  };

  return remMap[lang] || remMap.hi;
}
