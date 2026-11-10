

export type Language = 'en' | 'te'

type TranslationSet = {
  appName: string
  home: string
  library: string
  about: string
  language: string
  back: string
  backToLibrary: string
  searchDiseases: string
  all: string
  healthy: string
  disease: string
  uploadRiceImage: string
  chooseImage: string
  takePhoto: string
  changeImage: string
  remove: string
  analyzeImage: string
  analyzeAnother: string
  viewDetails: string
  uploadClearImage: string
  dropImage: string
  dragDrop: string
  tips: string
  analyzing: string
  analyzingDescription: string
  pleaseWait: string
  upload: string
  analyze: string
  result: string
  diseaseDetected: string
  healthyCrop: string
  confidence: string
  aboutDisease: string
  affectedParts: string
  symptoms: string
  causes: string
  recommendations: string
  prevention: string
  cropNotDetected: string
  tryAgain: string
  aboutTitle: string
  aboutDescription: string
  howItWorks: string
  howItWorksText: string
  noResult: string
  diseaseNotFound: string
  overview: string
  management: string
  generalGuidance: string
  followGuidance: string
  keepHealthy: string
  healthyMessage: string
  recommendedActions: string
  recommendedMessage: string
  reviewImage: string
  reviewDescription: string
  cropNotDetectedTitle: string
  clearImageMessage: string
  makeSureImage: string
  clearImageTip: string
  avoidBlurry: string
  riceLeafTip: string
  predictionUncertain: string
  clearerImageMessage: string
  imageNotClear: string
  clearTip: string
  leafTip: string
  unrelatedTip: string
  uploadError: string
  fileTypeError: string
  fileSizeError: string
  downloadImage: string
}
const baseTranslations: Record<Language, TranslationSet> = {
  en: {
    appName: 'Vari Raksha AI', home: 'Home', library: 'Disease Library', about: 'About', language: 'Language', back: 'Back', backToLibrary: 'Back to Library', searchDiseases: 'Search diseases...', all: 'All', healthy: 'Healthy', disease: 'Disease', uploadRiceImage: 'Deep Learning Based Rice Crop Disease Detection and Recommendation System', chooseImage: 'Choose Image', takePhoto: 'Take Photo', changeImage: 'Change Image', remove: 'Remove', analyzeImage: 'Analyze Image', analyzeAnother: 'Analyze Another Image', viewDetails: 'View Full Details', uploadClearImage: 'Upload Clear Rice Crop Image', dropImage: 'Drop image here', dragDrop: 'or drag & drop here', tips: 'Tips for best results', analyzing: 'Analyzing your rice crop image...', analyzingDescription: 'Our AI model is checking for visible patterns in your image.', pleaseWait: 'Please wait...', upload: 'Upload', analyze: 'Analyze', result: 'Result', diseaseDetected: 'Disease Detected', healthyCrop: 'Healthy Crop', confidence: 'Confidence', aboutDisease: 'About this disease', affectedParts: 'Affected Parts', symptoms: 'Symptoms', causes: 'Causes', recommendations: 'Recommendations', prevention: 'Prevention', cropNotDetected: 'Crop Not Detected', tryAgain: 'Try Again', aboutTitle: 'About Vari Raksha AI', aboutDescription: 'AI-powered rice crop disease detection for farmers.', howItWorks: 'How it works', howItWorksText: 'Users upload a clear leaf image, and the system checks the visual pattern to identify possible disease signs or healthy plant conditions.', noResult: 'No result available yet.', diseaseNotFound: 'Disease not found.', overview: 'Overview', management: 'Management', generalGuidance: 'General Guidance', followGuidance: 'Follow recommended crop management practices.', keepHealthy: 'Keep it healthy', healthyMessage: 'Your rice crop appears healthy!', recommendedActions: 'Recommended Actions', recommendedMessage: 'Follow best management practices for healthier crops.', reviewImage: 'Review Image', reviewDescription: 'Make sure the selected image is clear and contains a rice crop leaf.', cropNotDetectedTitle: 'Please upload a clear rice crop image.', clearImageMessage: 'Crop Not Detected', makeSureImage: 'Make sure the image:', clearImageTip: 'Upload a clear, well-lit image', avoidBlurry: 'Avoid blurry or unrelated images', riceLeafTip: 'Make sure it is a rice crop leaf', predictionUncertain: 'Prediction Uncertain', clearerImageMessage: 'Please upload a clearer rice crop image.', imageNotClear: 'The image is not clear enough for a reliable prediction.', clearTip: 'Use a clear, well-lit image', leafTip: 'Make sure it is a rice crop leaf', unrelatedTip: 'Avoid blurry or unrelated images', uploadError: 'Please upload an image first.',     fileTypeError: 'Unsupported file type. Please use JPG, JPEG, or PNG.', fileSizeError: 'Image is too large. Please upload a file smaller than 10 MB.', downloadImage: 'Download image',
  },
  te: {
    appName: 'వరి రక్ష AI', downloadImage: 'చిత్రాన్ని డౌన్‌లోడ్ చేయండి', home: 'హోమ్', library: 'తెగుళ్ల గ్రంథాలయం', about: 'మా గురించి', language: 'భాష', back: 'వెనుకకు', backToLibrary: 'గ్రంథాలయానికి తిరిగి వెళ్లండి', searchDiseases: 'తెగుళ్లను వెతకండి...', all: 'అన్నీ', healthy: 'ఆరోగ్యకరం', disease: 'తెగులు', uploadRiceImage: 'వరి పంట తెగులు గుర్తింపు', chooseImage: 'చిత్రాన్ని ఎంచుకోండి', takePhoto: 'ఫోటో తీయండి', changeImage: 'చిత్రాన్ని మార్చండి', remove: 'తొలగించండి', analyzeImage: 'చిత్రాన్ని విశ్లేషించండి', analyzeAnother: 'మరో చిత్రాన్ని విశ్లేషించండి', viewDetails: 'పూర్తి వివరాలను చూడండి', uploadClearImage: 'స్పష్టమైన వరి పంట చిత్రాన్ని అప్‌లోడ్ చేయండి', dropImage: 'చిత్రాన్ని ఇక్కడ వదలండి', dragDrop: 'లేదా లాగి ఇక్కడ వదలండి', tips: 'మంచి ఫలితాల కోసం సూచనలు', analyzing: 'మీ వరి పంట చిత్రాన్ని విశ్లేషిస్తున్నాము...', analyzingDescription: 'మీ చిత్రంలోని కనిపించే లక్షణాలను మా AI మోడల్ పరిశీలిస్తోంది.', pleaseWait: 'దయచేసి వేచి ఉండండి...', upload: 'అప్‌లోడ్', analyze: 'విశ్లేషణ', result: 'ఫలితం', diseaseDetected: 'తెగులు గుర్తించబడింది', healthyCrop: 'ఆరోగ్యకరమైన పంట', confidence: 'నమ్మక స్థాయి', aboutDisease: 'ఈ తెగులు గురించి', affectedParts: 'ప్రభావిత భాగాలు', symptoms: 'లక్షణాలు', causes: 'కారణాలు', recommendations: 'సిఫార్సులు', prevention: 'నివారణ', cropNotDetected: 'పంట గుర్తించబడలేదు', tryAgain: 'మళ్లీ ప్రయత్నించండి', aboutTitle: 'వరి రక్ష AI గురించి', aboutDescription: 'రైతులకు వరి పంట తెగుళ్లను గుర్తించడంలో సహాయపడే AI వేదిక.', howItWorks: 'ఇది ఎలా పనిచేస్తుంది', howItWorksText: 'వినియోగదారులు స్పష్టమైన ఆకు చిత్రాన్ని అప్‌లోడ్ చేస్తారు. సిస్టమ్ దృశ్య లక్షణాలను పరిశీలించి తెగులు లేదా ఆరోగ్యకరమైన పంటను గుర్తిస్తుంది.', noResult: 'ఇంకా ఫలితం అందుబాటులో లేదు.', diseaseNotFound: 'తెగులు కనుగొనబడలేదు.', overview: 'సారాంశం', management: 'నిర్వహణ', generalGuidance: 'సాధారణ మార్గదర్శకం', followGuidance: 'సిఫార్సు చేసిన పంట నిర్వహణ పద్ధతులను పాటించండి.', keepHealthy: 'పంటను ఆరోగ్యంగా ఉంచండి', healthyMessage: 'మీ వరి పంట ఆరోగ్యంగా కనిపిస్తోంది!', recommendedActions: 'సిఫార్సు చేసిన చర్యలు', recommendedMessage: 'ఆరోగ్యకరమైన పంట కోసం మంచి నిర్వహణ పద్ధతులను పాటించండి.', reviewImage: 'చిత్రాన్ని పరిశీలించండి', reviewDescription: 'ఎంచుకున్న చిత్రం స్పష్టంగా ఉండి వరి ఆకు కనిపించేలా చూసుకోండి.', cropNotDetectedTitle: 'స్పష్టమైన వరి పంట చిత్రాన్ని అప్‌లోడ్ చేయండి.', clearImageMessage: 'పంట గుర్తించబడలేదు', makeSureImage: 'చిత్రం ఇలా ఉండాలి:', clearImageTip: 'స్పష్టమైన, మంచి వెలుతురు ఉన్న చిత్రాన్ని అప్‌లోడ్ చేయండి', avoidBlurry: 'మసకబారిన లేదా సంబంధం లేని చిత్రాలను నివారించండి', riceLeafTip: 'ఇది వరి ఆకు చిత్రం అని నిర్ధారించండి', predictionUncertain: 'అంచనా స్పష్టంగా లేదు', clearerImageMessage: 'దయచేసి మరింత స్పష్టమైన వరి పంట చిత్రాన్ని అప్‌లోడ్ చేయండి.', imageNotClear: 'నమ్మదగిన అంచనాకు చిత్రం తగినంత స్పష్టంగా లేదు.', clearTip: 'స్పష్టమైన మరియు తగినంత వెలుతురు ఉన్న చిత్రాన్ని ఉపయోగించండి', leafTip: 'అది వరి పంట ఆకు చిత్రమే అని నిర్ధారించుకోండి', unrelatedTip: 'అస్పష్టమైన లేదా సంబంధం లేని చిత్రాలను నివారించండి', uploadError: 'ముందుగా ఒక చిత్రాన్ని అప్‌లోడ్ చేయండి.', fileTypeError: 'మద్దతు లేని ఫైల్ రకం. JPG, JPEG లేదా PNG ఉపయోగించండి.', fileSizeError: 'చిత్రం చాలా పెద్దది. 10 MB కంటే చిన్న చిత్రాన్ని అప్‌లోడ్ చేయండి.',
  },
}

const supplementalTranslations = {
  en: {
    scientificName: 'Scientific Name', downloadImage: 'Download image', openMenu: 'Open menu', closeMenu: 'Close menu', goHome: 'Go to home page', logoAlt: 'Vari Raksha AI logo', selectedImageAlt: 'Selected rice crop', cropPreviewAlt: 'Crop preview', lowConfidenceAlt: 'Low-confidence crop preview', selectedLeafAlt: 'Selected rice crop leaf', chooseImageFile: 'Choose an image file', languagePrompt: 'Choose your language', english: 'English', telugu: 'తెలుగు', continue: 'Continue', history: 'History', noHistory: 'No analyzed images yet.', delete: 'Delete', analyzedOn: 'Analyzed on', previousImage: 'Previous image', nextImage: 'Next image', imageOf: 'Image', aboutWhat: 'What is Vari Raksha AI?', aboutWhatText: 'Vari Raksha AI is a simple mobile-first tool designed to help farmers quickly assess rice crop health from a photo.', aboutClear: 'Why clear images matter', aboutClearText: 'Sharp and well-lit images help the analysis and improve confidence in the prediction. Blurry or unrelated images can lead to uncertainty.', aboutAudience: 'Who is it for?', aboutAudienceText: 'It is designed for farmers, agronomists, and agricultural field staff who need a quick crop health check in the field.',     aboutLimits: 'Limitations of AI predictions', aboutLimitsText: 'Predictions run locally using the exported Kaggle-trained model and should not replace expert field diagnosis.', healthyTipManagement: 'Follow good crop management practices', healthyTipMonitor: 'Monitor regularly', healthyTipIrrigation: 'Ensure proper irrigation', healthyTipHygiene: 'Maintain field hygiene',
  },
  te: {
    appName: 'Vari Raksha AI', scientificName: 'శాస్త్రీయ పేరు', downloadImage: 'చిత్రాన్ని డౌన్‌లోడ్ చేయండి', openMenu: 'మెనూను తెరవండి', closeMenu: 'మెనూను మూసివేయండి', goHome: 'హోమ్ పేజీకి వెళ్లండి', logoAlt: 'Vari Raksha AI లోగో', selectedImageAlt: 'ఎంచుకున్న వరి పంట చిత్రం', cropPreviewAlt: 'పంట ముందస్తు వీక్షణ', lowConfidenceAlt: 'తక్కువ నమ్మక స్థాయి పంట ముందస్తు వీక్షణ', selectedLeafAlt: 'ఎంచుకున్న వరి ఆకు చిత్రం', chooseImageFile: 'చిత్ర ఫైల్‌ను ఎంచుకోండి', languagePrompt: 'మీ భాషను ఎంచుకోండి', english: 'English', telugu: 'తెలుగు', continue: 'కొనసాగించండి', history: 'చరిత్ర', noHistory: 'ఇంకా విశ్లేషించిన చిత్రాలు లేవు.', delete: 'తొలగించండి', analyzedOn: 'విశ్లేషించిన తేదీ', previousImage: 'మునుపటి చిత్రం', nextImage: 'తదుపరి చిత్రం', imageOf: 'చిత్రం', aboutTitle: 'Vari Raksha AI గురించి', aboutWhat: 'Vari Raksha AI అంటే ఏమిటి?', aboutWhatText: 'Vari Raksha AI రైతులు ఫోటో ద్వారా వరి పంట ఆరోగ్యాన్ని త్వరగా అంచనా వేయడానికి సహాయపడే మొబైల్ సాధనం.', aboutClear: 'స్పష్టమైన చిత్రాలు ఎందుకు ముఖ్యం', aboutClearText: 'స్పష్టమైన మరియు మంచి వెలుతురు ఉన్న చిత్రాలు విశ్లేషణకు సహాయపడతాయి మరియు అంచనా నమ్మకాన్ని మెరుగుపరుస్తాయి. అస్పష్టమైన లేదా సంబంధం లేని చిత్రాలు అనిశ్చితికి దారితీయవచ్చు.', aboutAudience: 'ఇది ఎవరి కోసం?', aboutAudienceText: 'పొలంలో పంట ఆరోగ్యాన్ని త్వరగా తనిఖీ చేయాల్సిన రైతులు, వ్యవసాయ శాస్త్రవేత్తలు మరియు వ్యవసాయ క్షేత్ర సిబ్బంది కోసం ఇది రూపొందించబడింది.', aboutLimits: 'AI అంచనాల పరిమితులు', aboutLimitsText: 'అంచనాలు స్థానికంగా శిక్షణ పొందిన మోడల్‌ను ఉపయోగిస్తాయి మరియు నిపుణుల క్షేత్ర నిర్ధారణకు ప్రత్యామ్నాయం కావు.', healthyTipManagement: 'మంచి పంట నిర్వహణ పద్ధతులను పాటించండి', healthyTipMonitor: 'క్రమం తప్పకుండా పరిశీలించండి', healthyTipIrrigation: 'సరైన నీటి పారుదలను నిర్ధారించండి', healthyTipHygiene: 'పొలంలో పరిశుభ్రతను పాటించండి',
  },
}

export const translations = {
  en: { ...baseTranslations.en, ...supplementalTranslations.en },
  te: { ...baseTranslations.te, ...supplementalTranslations.te },
}


export const getLanguage = (value: string): Language => value === 'te' || value === 'తెలుగు' ? 'te' : 'en'
