import healthy1 from '../assets/healthy_1.png'
import healthy2 from '../assets/healthy_2.png'
import healthy3 from '../assets/healthy_3.png'
import healthy4 from '../assets/healthy_4.png'

import bakanae1 from '../assets/bakanae_1.png'
import bakanae2 from '../assets/bakanae_2.png'


import brownSpot1 from '../assets/brown_spot_1.png'
import brownSpot2 from '../assets/brown_spot_2.png'
import brownSpot3 from '../assets/brown_spot_3.png'
import brownSpot4 from '../assets/brown_spot_4.png'

import falseSmut1 from '../assets/false_smut_1.png'
import falseSmut2 from '../assets/false_smut_2.png'
import falseSmut3 from '../assets/false_smut_3.png'


// Add these when the files exist in src/assets
import leafBlast1 from '../assets/rice_blast_1.png'
import leafBlast2 from '../assets/rice_blast_2.png'
import leafBlast3 from '../assets/rice_blast_3.png'


import leafScald1 from '../assets/leaf_scald_1.png'
import leafScald2 from '../assets/leaf_scald_2.png'
import leafScald3 from '../assets/leaf_scald_3.png'


import narrowBrownSpot1 from '../assets/narrow_bs_1.png'
import narrowBrownSpot2 from '../assets/narrow_bs_2.png'
import narrowBrownSpot3 from '../assets/narrow_bs_3.png'


import neckBlast1 from '../assets/neck_blast_1.png'
import neckBlast2 from '../assets/neck_blast_2.png'
import neckBlast3 from '../assets/neck_blast_3.png'


import sheathBlight1 from '../assets/sheath_blight_1.png'
import sheathBlight2 from '../assets/sheath_blight_2.png'
import sheathBlight3 from '../assets/sheath_blight_3.png'


import stemRot1 from '../assets/stem_rot_1.png'
import stemRot2 from '../assets/stem_rot_2.png'
import stemRot3 from '../assets/stem_rot_3.png'

export type DiseaseId =
  | 'healthy'
  | 'bakanae'
  | 'brown-spot'
  | 'false-smut'
  | 'leaf-blast'
  | 'leaf-scald'
  | 'narrow-brown-spot'
  | 'neck-blast'
  | 'sheath-blight'
  | 'stem-rot'


export type LocalizedText = {
  en: string
  te: string
}


export type LocalizedList = {
  en: string[]
  te: string[]
}


export type Disease = {
  id: DiseaseId

  name: LocalizedText

  scientificName: string

  category: LocalizedText

  affectedParts: LocalizedText

  symptoms: LocalizedText

  description: LocalizedText

  causes: LocalizedText

  management: LocalizedList

  prevention: LocalizedList

  // Four separate images for the disease carousel
  images: string[]
}


// ============================================================
// HELPER FUNCTION
// ============================================================

const disease = (
  id: DiseaseId,
  name: LocalizedText,
  scientificName: string,
  category: LocalizedText,
  affectedParts: LocalizedText,
  symptoms: LocalizedText,
  description: LocalizedText,
  causes: LocalizedText,
  management: LocalizedList,
  prevention: LocalizedList,
  images: string[],
): Disease => ({
  id,
  name,
  scientificName,
  category,
  affectedParts,
  symptoms,
  description,
  causes,
  management,
  prevention,
  images,
})


// ============================================================
// 1. HEALTHY
// ============================================================

const healthy = disease(
  'healthy',

  {
    en: 'Healthy Rice Plant',
    te: 'ఆరోగ్యకరమైన వరి మొక్క',
  },

  'No visible disease detected',

  {
    en: 'Healthy Crop',
    te: 'ఆరోగ్యకరమైన పంట',
  },

  {
    en: 'Leaves, stems and panicles',
    te: 'ఆకులు, కాండాలు మరియు కంకులు',
  },

  {
    en:
      'Leaves appear green and well developed, with normal plant growth and no obvious disease lesions visible in the image.',

    te:
      'ఆకులు పచ్చగా మరియు బాగా అభివృద్ధి చెంది కనిపిస్తాయి. మొక్క సాధారణంగా పెరుగుతూ ఉండి, చిత్రంలో స్పష్టమైన తెగులు మచ్చలు కనిపించవు.',
  },

  {
    en:
      'The uploaded image does not show obvious visible symptoms of the rice diseases covered by Vari Raksha AI. Based on the visible features in the image, the plant appears healthy.',

    te:
      'అప్‌లోడ్ చేసిన చిత్రంలో Vari Raksha AI గుర్తించే వరి తెగుళ్లకు సంబంధించిన స్పష్టమైన లక్షణాలు కనిపించలేదు. చిత్రంలో కనిపించే లక్షణాల ఆధారంగా మొక్క ఆరోగ్యంగా కనిపిస్తోంది.',
  },

  {
    en:
      'A healthy-looking image does not guarantee that the entire crop is completely free from disease, insects, nutrient deficiencies or root problems. Early or hidden problems may not be visible in a photograph.',

    te:
      'ఆరోగ్యంగా కనిపించే చిత్రం మొత్తం పంటకు ఎలాంటి తెగులు, పురుగు, పోషక లోపం లేదా వేరు సమస్య లేదని పూర్తిగా నిర్ధారించదు. ప్రారంభ దశలో లేదా చిత్రంలో కనిపించని సమస్యలు ఫోటోలో గుర్తించబడకపోవచ్చు.',
  },

  {
    en: [
      'Continue checking the crop regularly throughout the season.',
      'Adjust irrigation according to crop stage, soil condition and local recommendations.',
      'Use soil-test information when making fertilizer decisions.',
      'Inspect leaves and panicles for new abnormal changes.',
      'Check the crop for insect activity even when the leaves look healthy.',
      'Use quality seed and follow recommended crop-management practices.',
    ],

    te: [
      'పంట కాలం మొత్తం పంటను క్రమం తప్పకుండా పరిశీలించండి.',
      'పంట దశ, నేల పరిస్థితి మరియు స్థానిక సిఫార్సుల ఆధారంగా నీటి నిర్వహణ చేయండి.',
      'ఎరువుల నిర్ణయాలు తీసుకునేటప్పుడు నేల పరీక్ష ఫలితాలను పరిగణించండి.',
      'ఆకులు మరియు కంకుల్లో కొత్తగా కనిపించే అసాధారణ మార్పులను గమనించండి.',
      'ఆకులు ఆరోగ్యంగా కనిపించినప్పటికీ పురుగుల ఉనికిని పరిశీలించండి.',
      'నాణ్యమైన విత్తనాలను ఉపయోగించి సిఫార్సు చేసిన పంట నిర్వహణ పద్ధతులను పాటించండి.',
    ],
  },

  {
    en: [
      'Start the crop with healthy and quality seed.',
      'Maintain suitable plant population for good growth and air movement.',
      'Avoid unnecessary fertilizer application.',
      'Keep the field and surrounding area manageable and clean.',
      'Pay additional attention during tillering, booting and heading stages.',
      'Record unusual symptoms when they first appear.',
      'Seek local agricultural advice if symptoms become severe or spread rapidly.',
    ],

    te: [
      'ఆరోగ్యకరమైన మరియు నాణ్యమైన విత్తనాలతో పంటను ప్రారంభించండి.',
      'మంచి పెరుగుదల మరియు గాలి ప్రసరణ కోసం తగిన మొక్కల సాంద్రతను పాటించండి.',
      'అనవసరమైన ఎరువుల వినియోగాన్ని నివారించండి.',
      'పొలం మరియు పరిసరాలను సక్రమంగా, పరిశుభ్రంగా నిర్వహించండి.',
      'పిలకలు, కంకి ఏర్పడే దశ మరియు కంకి బయటకు వచ్చే దశల్లో ఎక్కువ శ్రద్ధ వహించండి.',
      'అసాధారణ లక్షణాలు మొదట కనిపించినప్పుడు వాటిని నమోదు చేయండి.',
      'లక్షణాలు తీవ్రంగా లేదా వేగంగా వ్యాపిస్తే స్థానిక వ్యవసాయ నిపుణుల సలహా తీసుకోండి.',
    ],
  },

  [
    healthy1,
  healthy2,
  healthy3,
  healthy4,
  ],
)


// ============================================================
// 2. BAKANAE
// ============================================================

const bakanae = disease(
  'bakanae',

  {
    en: 'Bakanae / Foot Rot',
    te: 'బకానే / కాలు కుళ్లు తెగులు',
  },

  'Fusarium fujikuroi',

  {
    en: 'Disease',
    te: 'తెగులు',
  },

  {
    en: 'Seedlings, roots and stems',
    te: 'నారు మొక్కలు, వేర్లు మరియు కాండాలు',
  },

  {
    en:
      'Affected seedlings may become unusually tall, thin and weak. Leaves can become pale, and severely affected seedlings may die before or after transplanting.',

    te:
      'ప్రభావిత నారు మొక్కలు అసాధారణంగా పొడవుగా, సన్నగా మరియు బలహీనంగా పెరగవచ్చు. ఆకులు లేత రంగులోకి మారవచ్చు. తీవ్రంగా ప్రభావితమైన నారు మొక్కలు నాటే ముందు లేదా తరువాత చనిపోవచ్చు.',
  },

  {
    en:
      'Bakanae mainly affects rice seedlings and young plants. The abnormal elongation of infected plants can make them weak and poorly established.',

    te:
      'బకానే ప్రధానంగా వరి నారు మొక్కలు మరియు చిన్న మొక్కలను ప్రభావితం చేస్తుంది. సోకిన మొక్కలు అసాధారణంగా పొడవుగా పెరగడం వల్ల బలహీనంగా మారి సరిగా స్థిరపడకపోవచ్చు.',
  },

  {
    en:
      'The disease is caused by Fusarium fujikuroi. Infected seed can introduce the pathogen into nursery beds and later into the field.',

    te:
      'ఈ తెగులు Fusarium fujikuroi అనే శిలీంధ్రం వల్ల వస్తుంది. సోకిన విత్తనాల ద్వారా వ్యాధికారకం నర్సరీలోకి మరియు తరువాత పొలంలోకి ప్రవేశించవచ్చు.',
  },

  {
    en: [
      'Use certified or quality-assured seed from a reliable source.',
      'Inspect nursery beds for unusually tall and weak seedlings.',
      'Remove clearly affected seedlings before transplanting.',
      'Do not move visibly diseased seedlings into healthy areas.',
      'Maintain nursery cleanliness and suitable drainage.',
      'Follow locally approved seed-treatment recommendations when required.',
    ],

    te: [
      'నమ్మకమైన వనరు నుంచి ధృవీకరించబడిన లేదా నాణ్యత నిర్ధారించిన విత్తనాలను ఉపయోగించండి.',
      'అసాధారణంగా పొడవుగా మరియు బలహీనంగా ఉన్న నారు మొక్కల కోసం నర్సరీని పరిశీలించండి.',
      'స్పష్టంగా ప్రభావితమైన నారు మొక్కలను నాటే ముందు తొలగించండి.',
      'సోకిన నారు మొక్కలను ఆరోగ్యకరమైన ప్రాంతాలకు తరలించవద్దు.',
      'నర్సరీని పరిశుభ్రంగా ఉంచి తగిన నీటి పారుదల కల్పించండి.',
      'అవసరమైనప్పుడు స్థానికంగా ఆమోదించిన విత్తన శుద్ధి సూచనలను పాటించండి.',
    ],
  },

  {
    en: [
      'Begin with clean and reliable planting material.',
      'Separate suspicious seedlings during nursery inspection.',
      'Avoid carrying infected nursery material into clean areas.',
      'Keep nursery tools and surroundings clean.',
      'Monitor newly transplanted fields for abnormal plant height and weakness.',
    ],

    te: [
      'శుభ్రమైన మరియు నమ్మకమైన నాటే పదార్థంతో సాగును ప్రారంభించండి.',
      'నర్సరీ పరిశీలనలో అనుమానాస్పద నారు మొక్కలను వేరుగా గుర్తించండి.',
      'సోకిన నర్సరీ పదార్థాన్ని ఆరోగ్యకరమైన ప్రాంతాలకు తరలించవద్దు.',
      'నర్సరీ పరికరాలు మరియు పరిసరాలను పరిశుభ్రంగా ఉంచండి.',
      'నాటిన తరువాత అసాధారణ మొక్క ఎత్తు మరియు బలహీనత కోసం పొలాన్ని పరిశీలించండి.',
    ],
  },

  [
    bakanae1,
  bakanae2,
  ],
)


// ============================================================
// 3. BROWN SPOT
// ============================================================

const brownSpot = disease(
  'brown-spot',

  {
    en: 'Brown Spot',
    te: 'గోధుమ మచ్చ తెగులు',
  },

  'Bipolaris oryzae',

  {
    en: 'Disease',
    te: 'తెగులు',
  },

  {
    en: 'Leaves and sometimes grains',
    te: 'ఆకులు మరియు కొన్ని సందర్భాల్లో గింజలు',
  },

  {
    en:
      'Small brown spots can appear on leaves and gradually become larger. Older lesions may become darker, and severe infection can affect grain quality.',

    te:
      'ఆకులపై చిన్న గోధుమ మచ్చలు ఏర్పడి క్రమంగా పెద్దవవుతాయి. పాత మచ్చలు ముదురు రంగులోకి మారవచ్చు. తీవ్రంగా సోకినప్పుడు గింజల నాణ్యత ప్రభావితమవుతుంది.',
  },

  {
    en:
      'Brown Spot is a fungal disease that primarily affects rice foliage and can become more damaging when the crop is under stress.',

    te:
      'గోధుమ మచ్చ తెగులు ప్రధానంగా వరి ఆకులను ప్రభావితం చేసే శిలీంధ్ర తెగులు. పంట ఒత్తిడికి గురైనప్పుడు దీని ప్రభావం ఎక్కువ కావచ్చు.',
  },

  {
    en:
      'The disease is caused by Bipolaris oryzae. Poor crop nutrition and plant stress can increase susceptibility.',

    te:
      'ఈ తెగులు Bipolaris oryzae అనే శిలీంధ్రం వల్ల వస్తుంది. పంటలో పోషక అసమతుల్యత మరియు మొక్కలపై ఒత్తిడి తెగులుకు సున్నితత్వాన్ని పెంచవచ్చు.',
  },

  {
    en: [
      'Improve crop nutrition according to soil-test results.',
      'Pay attention to potassium and other nutrients when deficiency is suspected.',
      'Avoid prolonged water stress.',
      'Observe whether the number and size of spots are increasing.',
      'Compare affected and unaffected areas to check spread.',
      'Seek local advice when symptoms become widespread.',
    ],

    te: [
      'నేల పరీక్ష ఫలితాల ఆధారంగా పంట పోషణను మెరుగుపరచండి.',
      'పోషక లోపం అనుమానం ఉన్నప్పుడు పొటాషియం మరియు ఇతర పోషకాలపై శ్రద్ధ వహించండి.',
      'పంట ఎక్కువకాలం నీటి ఒత్తిడికి గురికాకుండా చూడండి.',
      'మచ్చల సంఖ్య మరియు పరిమాణం పెరుగుతున్నాయా అని గమనించండి.',
      'తెగులు వ్యాప్తిని తెలుసుకోవడానికి ప్రభావిత మరియు ఆరోగ్యకరమైన ప్రాంతాలను పోల్చండి.',
      'లక్షణాలు విస్తృతంగా కనిపిస్తే స్థానిక నిపుణుల సలహా తీసుకోండి.',
    ],
  },

  {
    en: [
      'Choose varieties suitable for local growing conditions.',
      'Avoid severe nutrient imbalance.',
      'Maintain good seed and nursery practices.',
      'Manage infected crop residues according to local guidance.',
      'Record recurring Brown Spot problems for future planning.',
    ],

    te: [
      'స్థానిక సాగు పరిస్థితులకు అనుకూలమైన రకాలను ఎంచుకోండి.',
      'తీవ్రమైన పోషక అసమతుల్యతను నివారించండి.',
      'మంచి విత్తన మరియు నర్సరీ నిర్వహణ పద్ధతులను పాటించండి.',
      'స్థానిక సూచనలకు అనుగుణంగా సోకిన పంట అవశేషాలను నిర్వహించండి.',
      'భవిష్యత్ పంట ప్రణాళిక కోసం గోధుమ మచ్చ తెగులు పునరావృతాన్ని నమోదు చేయండి.',
    ],
  },

  [
     brownSpot1,
  brownSpot2,
  brownSpot3,
  brownSpot4,
  ],
)


// ============================================================
// 4. FALSE SMUT
// ============================================================

const falseSmut = disease(
  'false-smut',

  {
    en: 'False Smut',
    te: 'తప్పుడు కాటుక తెగులు',
  },

  'Ustilaginoidea virens',

  {
    en: 'Disease',
    te: 'తెగులు',
  },

  {
    en: 'Individual grains within the panicle',
    te: 'కంకిలోని వ్యక్తిగత గింజలు',
  },

  {
    en:
      'Affected grains are replaced by rounded greenish to yellowish fungal masses. These structures become larger as infection develops.',

    te:
      'ప్రభావిత గింజల స్థానంలో ఆకుపచ్చ నుంచి పసుపు రంగులో కనిపించే గుండ్రని శిలీంధ్రపు గడ్డలు ఏర్పడతాయి. తెగులు అభివృద్ధి చెందుతున్న కొద్దీ ఇవి పెద్దవవుతాయి.',
  },

  {
    en:
      'False Smut mainly affects individual rice grains around flowering and grain development. Severe infection can reduce grain quality.',

    te:
      'తప్పుడు కాటుక తెగులు ప్రధానంగా పూత మరియు గింజల అభివృద్ధి సమయంలో వ్యక్తిగత వరి గింజలను ప్రభావితం చేస్తుంది. తీవ్రంగా సోకినప్పుడు గింజల నాణ్యత తగ్గవచ్చు.',
  },

  {
    en:
      'The disease is caused by Ustilaginoidea virens. Weather conditions around flowering and grain development can influence infection.',

    te:
      'ఈ తెగులు Ustilaginoidea virens అనే శిలీంధ్రం వల్ల వస్తుంది. పూత మరియు గింజల అభివృద్ధి సమయంలోని వాతావరణ పరిస్థితులు సంక్రమణను ప్రభావితం చేయవచ్చు.',
  },

  {
    en: [
      'Inspect panicles when grains begin developing.',
      'Pay extra attention to fields with previous False Smut history.',
      'Avoid unnecessary nitrogen application.',
      'Use locally recommended varieties in recurring areas.',
      'Record the number of affected panicles.',
      'Follow regional crop-protection advice if infection increases.',
    ],

    te: [
      'గింజలు ఏర్పడటం ప్రారంభమైనప్పుడు కంకులను పరిశీలించండి.',
      'గతంలో తప్పుడు కాటుక తెగులు కనిపించిన పొలాలపై ప్రత్యేక శ్రద్ధ పెట్టండి.',
      'అవసరం లేని నత్రజని ఎరువుల వినియోగాన్ని నివారించండి.',
      'తెగులు తరచుగా కనిపించే ప్రాంతాల్లో స్థానికంగా సిఫార్సు చేసిన రకాలను ఉపయోగించండి.',
      'ప్రభావిత కంకుల సంఖ్యను నమోదు చేయండి.',
      'తెగులు పెరుగుతున్నప్పుడు ప్రాంతీయ పంట సంరక్షణ సలహాలను పాటించండి.',
    ],
  },

  {
    en: [
      'Maintain balanced fertilizer use.',
      'Avoid excessive nitrogen during reproductive development.',
      'Use clean planting material.',
      'Keep visibly contaminated material separate from healthy seed lots.',
      'Record disease occurrence from season to season.',
    ],

    te: [
      'సమతుల్య ఎరువుల వినియోగాన్ని పాటించండి.',
      'పునరుత్పత్తి దశలో అధిక నత్రజని వినియోగాన్ని నివారించండి.',
      'శుభ్రమైన నాటే పదార్థాన్ని ఉపయోగించండి.',
      'కలుషితమైన పదార్థాన్ని ఆరోగ్యకరమైన విత్తన నిల్వతో కలపవద్దు.',
      'ప్రతి సీజన్‌లో తెగులు సంభవించిన వివరాలను నమోదు చేయండి.',
    ],
  },

  [
     falseSmut1,
  falseSmut2,
  falseSmut3,

  ],
)


// ============================================================
// 5. LEAF BLAST
// ============================================================

const leafBlast = disease(
  'leaf-blast',

  {
    en: 'Leaf Blast',
    te: 'ఆకు అగ్గి తెగులు',
  },

  'Pyricularia oryzae',

  {
    en: 'Disease',
    te: 'తెగులు',
  },

  {
    en: 'Rice leaves',
    te: 'వరి ఆకులు',
  },

  {
    en:
      'Spindle- or diamond-shaped lesions may develop on leaves. They can have pale or gray centres with darker margins and may merge when numerous.',

    te:
      'ఆకులపై కుదురు లేదా వజ్రాకారపు మచ్చలు ఏర్పడవచ్చు. మచ్చల మధ్యభాగం లేత లేదా బూడిద రంగులో ఉండి అంచులు ముదురు రంగులో ఉండవచ్చు. మచ్చలు ఎక్కువైతే కలిసిపోవచ్చు.',
  },

  {
    en:
      'Leaf Blast is the leaf form of rice blast. Severe infection can reduce healthy leaf area and weaken crop growth.',

    te:
      'ఆకు అగ్గి తెగులు వరి అగ్గి తెగులులో ఆకులను ప్రభావితం చేసే రూపం. తీవ్రంగా సోకితే ఆరోగ్యకరమైన ఆకు భాగం తగ్గి పంట పెరుగుదల బలహీనపడవచ్చు.',
  },

  {
    en:
      'The disease is caused by Pyricularia oryzae. Variety susceptibility, crop stage and environmental conditions influence disease development.',

    te:
      'ఈ తెగులు Pyricularia oryzae అనే శిలీంధ్రం వల్ల వస్తుంది. రకం సున్నితత్వం, పంట దశ మరియు వాతావరణ పరిస్థితులు తెగులు అభివృద్ధిని ప్రభావితం చేస్తాయి.',
  },

  {
    en: [
      'Inspect leaves carefully during vegetative and tillering stages.',
      'Avoid unnecessary nitrogen that promotes excessively lush growth.',
      'Use locally recommended blast-tolerant varieties where available.',
      'Pay closer attention after periods of prolonged leaf wetness.',
      'Seek local agricultural advice if lesions spread quickly.',
    ],

    te: [
      'పెరుగుదల మరియు పిలకలు వచ్చే దశల్లో ఆకులను జాగ్రత్తగా పరిశీలించండి.',
      'అతి దట్టమైన పెరుగుదలకు దారితీసే అనవసర నత్రజని వినియోగాన్ని నివారించండి.',
      'అందుబాటులో ఉంటే స్థానికంగా సిఫార్సు చేసిన అగ్గి తెగులు సహనశీల రకాలను ఉపయోగించండి.',
      'ఆకులు ఎక్కువసేపు తడిగా ఉన్న పరిస్థితుల తర్వాత మరింత జాగ్రత్తగా పరిశీలించండి.',
      'మచ్చలు వేగంగా వ్యాపిస్తే స్థానిక వ్యవసాయ నిపుణుల సలహా తీసుకోండి.',
    ],
  },

  {
    en: [
      'Choose suitable blast-tolerant varieties.',
      'Maintain balanced nutrition.',
      'Do not transfer infected planting material into clean areas.',
      'Inspect high-risk fields more frequently.',
      'Record recurring blast locations for future planning.',
    ],

    te: [
      'అనుకూలమైన అగ్గి తెగులు సహనశీల రకాలను ఎంచుకోండి.',
      'సమతుల్య పోషణను నిర్వహించండి.',
      'సోకిన నాటే పదార్థాన్ని ఆరోగ్యకరమైన ప్రాంతాలకు తరలించవద్దు.',
      'ప్రమాదం ఎక్కువగా ఉన్న పొలాలను తరచుగా పరిశీలించండి.',
      'భవిష్యత్ పంట ప్రణాళిక కోసం తరచుగా అగ్గి తెగులు కనిపించే ప్రాంతాలను నమోదు చేయండి.',
    ],
  },

  [
    leafBlast1,
  leafBlast2,
  leafBlast3,
  
  ],
)


// ============================================================
// 6. LEAF SCALD
// ============================================================

const leafScald = disease(
  'leaf-scald',

  {
    en: 'Leaf Scald',
    te: 'ఆకు స్కాల్డ్ తెగులు',
  },

  'Microdochium albescens',

  {
    en: 'Disease',
    te: 'తెగులు',
  },

  {
    en: 'Mature leaves, especially leaf tips and margins',
    te: 'పరిపక్వ ఆకులు, ముఖ్యంగా ఆకు కొనలు మరియు అంచులు',
  },

  {
    en:
      'Light and dark bands may develop from the leaf tip or margin. Lesions can enlarge and merge, giving the leaf a scorched or scalded appearance.',

    te:
      'ఆకు కొన లేదా అంచు నుంచి లేత మరియు ముదురు రంగు పట్టీలతో కూడిన మచ్చలు ఏర్పడవచ్చు. మచ్చలు పెద్దవై కలిసిపోవడంతో ఆకులు కాలినట్లుగా కనిపించవచ్చు.',
  },

  {
    en:
      'Leaf Scald is a fungal disease mainly affecting mature rice leaves. Extensive lesions can reduce healthy leaf tissue available for photosynthesis.',

    te:
      'ఆకు స్కాల్డ్ తెగులు ప్రధానంగా పరిపక్వ వరి ఆకులను ప్రభావితం చేసే శిలీంధ్ర తెగులు. ఎక్కువ మచ్చలు ఏర్పడితే కిరణజన్య సంయోగక్రియకు ఉపయోగపడే ఆరోగ్యకరమైన ఆకు కణజాలం తగ్గవచ్చు.',
  },

  {
    en:
      'The disease is associated with Microdochium species, with Microdochium albescens used in modern rice disease references. Moist crop conditions may favour development.',

    te:
      'ఈ తెగులు Microdochium జాతులకు సంబంధించిన శిలీంధ్రాలతో సంబంధం కలిగి ఉంటుంది. ఆధునిక వరి తెగులు సూచనల్లో Microdochium albescens అనే పేరు ఉపయోగించబడుతుంది. తేమతో కూడిన పంట పరిస్థితులు దీని అభివృద్ధికి అనుకూలంగా ఉండవచ్చు.',
  },

  {
    en: [
      'Look for the characteristic banded pattern instead of treating every brown mark as the same disease.',
      'Inspect older leaves carefully.',
      'Reduce unnecessarily prolonged leaf wetness where practical.',
      'Maintain adequate crop nutrition.',
      'Seek confirmation when symptoms are unusual because several rice diseases can look similar.',
    ],

    te: [
      'ప్రతి గోధుమ మచ్చను ఒకే తెగులుగా భావించకుండా ప్రత్యేకమైన పట్టీ ఆకారాన్ని గమనించండి.',
      'పాత ఆకులను జాగ్రత్తగా పరిశీలించండి.',
      'సాధ్యమైనంత వరకు ఆకులు ఎక్కువసేపు అనవసరంగా తడిగా ఉండే పరిస్థితులను తగ్గించండి.',
      'తగిన పంట పోషణను నిర్వహించండి.',
      'లక్షణాలు అసాధారణంగా ఉంటే నిపుణుల నిర్ధారణ తీసుకోండి, ఎందుకంటే కొన్ని వరి తెగుళ్లు ఒకేలా కనిపించవచ్చు.',
    ],
  },

  {
    en: [
      'Manage crop residues properly.',
      'Avoid unnecessarily humid crop conditions where practical.',
      'Choose suitable local varieties where the disease recurs.',
      'Inspect older leaves before symptoms become widespread.',
      'Record recurring problems for future field management.',
    ],

    te: [
      'పంట అవశేషాలను సక్రమంగా నిర్వహించండి.',
      'సాధ్యమైనంత వరకు అనవసరమైన అధిక తేమ పరిస్థితులను నివారించండి.',
      'తెగులు తరచుగా కనిపించే ప్రాంతాల్లో అనుకూలమైన స్థానిక రకాలను ఎంచుకోండి.',
      'లక్షణాలు విస్తరించే ముందు పాత ఆకులను పరిశీలించండి.',
      'భవిష్యత్ పొల నిర్వహణ కోసం పదేపదే కనిపించే సమస్యలను నమోదు చేయండి.',
    ],
  },

  [
   leafScald1,
  leafScald2,
  leafScald3,
  ],
)


// ============================================================
// 7. NARROW BROWN SPOT
// ============================================================

const narrowBrownSpot = disease(
  'narrow-brown-spot',

  {
    en: 'Narrow Brown Spot',
    te: 'ఇరుకైన గోధుమ ఆకు మచ్చ తెగులు',
  },

  'Cercospora janseana',

  {
    en: 'Disease',
    te: 'తెగులు',
  },

  {
    en: 'Leaves and leaf sheaths',
    te: 'ఆకులు మరియు ఆకు తొడుగులు',
  },

  {
    en:
      'Short, narrow brown linear lesions develop mainly along rice leaves. Severe infection can cause yellowing, premature drying and reduced healthy leaf area.',

    te:
      'వరి ఆకులపై ప్రధానంగా చిన్న, ఇరుకైన, పొడవైన గోధుమ మచ్చలు ఏర్పడతాయి. తీవ్రంగా సోకినప్పుడు ఆకులు పసుపు రంగులోకి మారి ముందుగానే ఎండిపోవచ్చు.',
  },

  {
    en:
      'Narrow Brown Spot is a fungal disease that often becomes more noticeable as rice approaches maturity. Severe disease can reduce crop performance.',

    te:
      'ఇరుకైన గోధుమ మచ్చ తెగులు వరి పంట పరిపక్వతకు చేరువలో ఎక్కువగా కనిపించే శిలీంధ్ర తెగులు. తీవ్రంగా ఉన్నప్పుడు పంట పనితీరుపై ప్రభావం పడవచ్చు.',
  },

  {
    en:
      'The causal fungus is Cercospora janseana. Warm, humid conditions and infected plant material can support disease development.',

    te:
      'ఈ తెగులుకు కారణమైన శిలీంధ్రం Cercospora janseana. వేడి, తేమతో కూడిన పరిస్థితులు మరియు సోకిన మొక్కల పదార్థం తెగులు అభివృద్ధికి సహాయపడవచ్చు.',
  },

  {
    en: [
      'Inspect lower and upper leaves as the crop approaches maturity.',
      'Look specifically for narrow linear lesions.',
      'Maintain adequate potassium and other nutrients according to soil-test recommendations.',
      'Avoid unnecessary crop stress during later growth.',
      'Manage infected residues after harvest according to local practice.',
    ],

    te: [
      'పంట పరిపక్వతకు చేరువలో దిగువ మరియు పై ఆకులను పరిశీలించండి.',
      'ఇరుకైన పొడవైన మచ్చలను ప్రత్యేకంగా గమనించండి.',
      'నేల పరీక్ష సిఫార్సుల ప్రకారం తగిన పొటాషియం మరియు ఇతర పోషకాలను అందించండి.',
      'పంట చివరి పెరుగుదల దశల్లో అనవసరమైన ఒత్తిడిని నివారించండి.',
      'కోత తర్వాత స్థానిక పద్ధతికి అనుగుణంగా సోకిన పంట అవశేషాలను నిర్వహించండి.',
    ],
  },

  {
    en: [
      'Use cultivars recommended for the local area.',
      'Prevent infected residues from accumulating between seasons.',
      'Control volunteer rice plants and relevant weeds where recommended.',
      'Use clean planting material for the next crop.',
      'Record disease severity near maturity.',
    ],

    te: [
      'స్థానిక ప్రాంతానికి సిఫార్సు చేసిన రకాలను ఉపయోగించండి.',
      'సీజన్ల మధ్య సోకిన పంట అవశేషాలు పేరుకుపోకుండా నిర్వహించండి.',
      'సిఫార్సు ఉన్నప్పుడు స్వయంగా పెరిగే వరి మొక్కలు మరియు సంబంధిత కలుపు మొక్కలను నియంత్రించండి.',
      'తదుపరి పంటకు శుభ్రమైన నాటే పదార్థాన్ని ఉపయోగించండి.',
      'పంట పరిపక్వత సమయంలో తెగులు తీవ్రతను నమోదు చేయండి.',
    ],
  },

  [
     narrowBrownSpot1,
  narrowBrownSpot2,
  narrowBrownSpot3,
  ],
)


// ============================================================
// 8. NECK BLAST
// ============================================================

const neckBlast = disease(
  'neck-blast',

  {
    en: 'Neck Blast',
    te: 'మెడ అగ్గి తెగులు',
  },

  'Pyricularia oryzae',

  {
    en: 'Disease',
    te: 'తెగులు',
  },

  {
    en: 'Panicle neck and upper stem area',
    te: 'కంకి మెడ మరియు పై కాండం భాగం',
  },

  {
    en:
      'Dark brown to grayish lesions may develop around the panicle neck. The infected area becomes weak, causing the panicle to droop, break or produce poorly filled grains.',

    te:
      'కంకి మెడ భాగంలో ముదురు గోధుమ నుంచి బూడిద రంగు మచ్చలు ఏర్పడవచ్చు. సోకిన భాగం బలహీనపడటంతో కంకి వంగిపోవచ్చు, విరిగిపోవచ్చు లేదా గింజలు సరిగా నిండకపోవచ్చు.',
  },

  {
    en:
      'Neck Blast is a serious form of rice blast because infection occurs in the structure supporting the panicle. Severe infection can directly affect grain formation and yield.',

    te:
      'మెడ అగ్గి తెగులు వరి అగ్గి తెగులులో తీవ్రమైన రూపం. కంకిని మోసే భాగం సోకడం వల్ల గింజల ఏర్పాటుపై మరియు దిగుబడిపై నేరుగా ప్రభావం పడవచ్చు.',
  },

  {
    en:
      'It is caused by Pyricularia oryzae. Variety susceptibility, crop stage and environmental conditions around heading influence infection risk.',

    te:
      'ఈ తెగులు Pyricularia oryzae అనే శిలీంధ్రం వల్ల వస్తుంది. రకం సున్నితత్వం, పంట దశ మరియు కంకి బయటకు వచ్చే సమయంలోని వాతావరణ పరిస్థితులు సంక్రమణ ప్రమాదాన్ని ప్రభావితం చేస్తాయి.',
  },

  {
    en: [
      'Inspect the panicle neck from heading through early grain development.',
      'Give special attention to fields with previous blast history.',
      'Avoid excessive nitrogen that encourages overly lush susceptible growth.',
      'Use locally recommended blast-tolerant varieties.',
      'Seek timely agricultural advice when neck lesions appear.',
    ],

    te: [
      'కంకి బయటకు వచ్చే దశ నుంచి గింజల ప్రారంభ అభివృద్ధి వరకు కంకి మెడను పరిశీలించండి.',
      'గతంలో అగ్గి తెగులు కనిపించిన పొలాలకు ప్రత్యేక శ్రద్ధ ఇవ్వండి.',
      'అతి దట్టమైన మరియు సున్నితమైన పెరుగుదలకు దారితీసే అధిక నత్రజని వినియోగాన్ని నివారించండి.',
      'స్థానికంగా సిఫార్సు చేసిన అగ్గి తెగులు సహనశీల రకాలను ఉపయోగించండి.',
      'కంకి ఏర్పడే సమయంలో మెడ మచ్చలు కనిపిస్తే సమయానికి వ్యవసాయ నిపుణుల సలహా తీసుకోండి.',
    ],
  },

  {
    en: [
      'Select varieties with good neck-blast resistance in recurring areas.',
      'Avoid using seed from severely affected crops without quality assessment.',
      'Complete crop nutrition planning before reproductive development.',
      'Identify fields with repeated Neck Blast history.',
      'Seek advice before widespread panicle collapse occurs.',
    ],

    te: [
      'తెగులు తరచుగా కనిపించే ప్రాంతాల్లో మెడ అగ్గి తెగులును తట్టుకునే రకాలను ఎంచుకోండి.',
      'తీవ్రంగా ప్రభావితమైన పంట నుంచి నాణ్యత పరీక్ష లేకుండా విత్తనాన్ని ఉపయోగించవద్దు.',
      'పునరుత్పత్తి దశకు ముందే పంట పోషక నిర్వహణను ప్రణాళిక చేయండి.',
      'మెడ అగ్గి తెగులు పదేపదే కనిపించే పొలాలను గుర్తించండి.',
      'కంకులు విస్తృతంగా వాలిపోయే ముందు వ్యవసాయ సలహా పొందండి.',
    ],
  },

  [
    neckBlast1,
  neckBlast2,
  neckBlast3,
  ],
)


// ============================================================
// 9. SHEATH BLIGHT
// ============================================================

const sheathBlight = disease(
  'sheath-blight',

  {
    en: 'Sheath Blight',
    te: 'కాండపు తొడుగు తెగులు',
  },

  'Rhizoctonia solani',

  {
    en: 'Disease',
    te: 'తెగులు',
  },

  {
    en: 'Leaf sheaths and lower to middle portions of the plant',
    te: 'ఆకు తొడుగులు మరియు మొక్క దిగువ నుంచి మధ్య భాగాలు',
  },

  {
    en:
      'Oval or irregular greenish-gray to brown lesions develop on leaf sheaths, often beginning near the waterline and spreading upward.',

    te:
      'ఆకు తొడుగులపై అండాకార లేదా అసమాన ఆకారంలో ఆకుపచ్చ-బూడిద నుంచి గోధుమ రంగు మచ్చలు ఏర్పడతాయి. ఇవి సాధారణంగా నీటి మట్టానికి సమీపంలో ప్రారంభమై పైకి వ్యాపించవచ్చు.',
  },

  {
    en:
      'Sheath Blight is a fungal disease favoured by dense crop canopies and humid conditions. Severe infection can reduce healthy leaf area and interfere with grain development.',

    te:
      'కాండపు తొడుగు తెగులు దట్టమైన పంట మరియు తేమతో కూడిన పరిస్థితుల్లో తీవ్రతరమయ్యే శిలీంధ్ర తెగులు. తీవ్రంగా సోకితే ఆరోగ్యకరమైన ఆకు భాగం తగ్గి గింజల అభివృద్ధిపై ప్రభావం పడవచ్చు.',
  },

  {
    en:
      'The disease is caused by Rhizoctonia solani. Dense planting, high humidity and excessive nitrogen can create conditions favourable for disease development.',

    te:
      'ఈ తెగులు Rhizoctonia solani అనే శిలీంధ్రం వల్ల వస్తుంది. దట్టమైన నాట్లు, అధిక తేమ మరియు అధిక నత్రజని తెగులు అభివృద్ధికి అనుకూలమైన పరిస్థితులను కల్పించవచ్చు.',
  },

  {
    en: [
      'Inspect leaf sheaths close to the waterline.',
      'Avoid unnecessary nitrogen application.',
      'Maintain suitable plant spacing.',
      'Manage irrigation to avoid prolonged excessive moisture.',
      'Act early when lesions begin moving upward.',
    ],

    te: [
      'నీటి మట్టానికి సమీపంలోని ఆకు తొడుగులను పరిశీలించండి.',
      'అవసరం లేని నత్రజని ఎరువుల వినియోగాన్ని నివారించండి.',
      'తగిన మొక్కల దూరాన్ని పాటించండి.',
      'ఎక్కువకాలం అధిక తేమ ఉండకుండా నీటి నిర్వహణ చేయండి.',
      'మచ్చలు పైకి వ్యాపించడం ప్రారంభించినప్పుడు ముందుగానే చర్య తీసుకోండి.',
    ],
  },

  {
    en: [
      'Avoid unnecessarily dense planting.',
      'Keep field drainage channels functional.',
      'Do not repeatedly apply high nitrogen without crop need.',
      'Inspect shaded and poorly ventilated areas carefully.',
      'Manage crop residue according to local guidance.',
    ],

    te: [
      'అవసరం లేని దట్టమైన నాట్లను నివారించండి.',
      'పొలంలోని నీటి పారుదల కాలువలు సక్రమంగా పనిచేసేలా చూడండి.',
      'పంట అవసరం లేకుండా అధిక నత్రజనిని పదేపదే ఇవ్వవద్దు.',
      'నీడ ఎక్కువగా మరియు గాలి ప్రసరణ తక్కువగా ఉన్న ప్రాంతాలను జాగ్రత్తగా పరిశీలించండి.',
      'స్థానిక సూచనలకు అనుగుణంగా పంట అవశేషాలను నిర్వహించండి.',
    ],
  },

  [
    sheathBlight1,
  sheathBlight2,
  sheathBlight3,
  ],
)


// ============================================================
// 10. STEM ROT
// ============================================================

const stemRot = disease(
  'stem-rot',

  {
    en: 'Stem Rot',
    te: 'కాండం కుళ్లు తెగులు',
  },

  'Nakataea oryzae',

  {
    en: 'Disease',
    te: 'తెగులు',
  },

  {
    en: 'Lower leaf sheaths and stems',
    te: 'దిగువ ఆకు తొడుగులు మరియు కాండాలు',
  },

  {
    en:
      'Small dark lesions can begin on the lower leaf sheath near the waterline. As infection progresses, sheath and stem tissue may rot, weaken and collapse.',

    te:
      'నీటి మట్టానికి సమీపంలోని దిగువ ఆకు తొడుగుపై చిన్న ముదురు మచ్చలు మొదలవుతాయి. తెగులు పెరిగేకొద్దీ ఆకు తొడుగు మరియు కాండ కణజాలం కుళ్లి బలహీనపడి కూలిపోవచ్చు.',
  },

  {
    en:
      'Stem Rot affects the lower portions of rice plants. Severe infection can cause lodging, weakened tillers and poorly filled panicles.',

    te:
      'కాండం కుళ్లు తెగులు వరి మొక్కల దిగువ భాగాలను ప్రభావితం చేస్తుంది. తీవ్రంగా సోకితే మొక్కలు నేలపై వాలిపోవడం, పిలకలు బలహీనపడటం మరియు కంకుల్లో గింజలు సరిగా నిండకపోవడం జరుగవచ్చు.',
  },

  {
    en:
      'The disease is caused by Nakataea oryzae, historically known as Sclerotium oryzae. The pathogen can survive in infected crop residues.',

    te:
      'ఈ తెగులు Nakataea oryzae అనే శిలీంధ్రం వల్ల వస్తుంది. పాత సాహిత్యంలో దీనిని Sclerotium oryzae అని కూడా పేర్కొన్నారు. వ్యాధికారకం సోకిన పంట అవశేషాల్లో నిలిచి ఉండవచ్చు.',
  },

  {
    en: [
      'Inspect lower leaf sheaths around the waterline.',
      'Check whether affected tillers are becoming weak or lodging.',
      'Avoid unnecessarily prolonged standing water where local conditions permit.',
      'Maintain balanced crop nutrition.',
      'Manage infected crop residues after harvest according to local guidance.',
    ],

    te: [
      'నీటి మట్టానికి సమీపంలోని దిగువ ఆకు తొడుగులను పరిశీలించండి.',
      'ప్రభావిత పిలకలు బలహీనపడుతున్నాయా లేదా నేలపై వాలుతున్నాయా అని గమనించండి.',
      'స్థానిక పరిస్థితులు అనుమతించే మేరకు ఎక్కువకాలం నీరు నిలిచే పరిస్థితులను నివారించండి.',
      'సమతుల్య పంట పోషణను పాటించండి.',
      'కోత తర్వాత స్థానిక సూచనలకు అనుగుణంగా సోకిన పంట అవశేషాలను నిర్వహించండి.',
    ],
  },

  {
    en: [
      'Reduce carryover of infected crop residue where practical.',
      'Keep field drainage functioning properly.',
      'Avoid excessive nitrogen-driven vegetative growth.',
      'Give additional attention to fields with repeated Stem Rot history.',
      'Inspect the lower plant canopy before symptoms become widespread.',
    ],

    te: [
      'సాధ్యమైన చోట సోకిన పంట అవశేషాలు తదుపరి పంటకు చేరకుండా నిర్వహించండి.',
      'పొలంలోని నీటి పారుదల వ్యవస్థ సక్రమంగా పనిచేసేలా చూడండి.',
      'అధిక నత్రజని వల్ల కలిగే అనవసర శాకీయ పెరుగుదలను నివారించండి.',
      'కాండం కుళ్లు తెగులు పదేపదే కనిపించే పొలాలపై అదనపు శ్రద్ధ వహించండి.',
      'లక్షణాలు విస్తరించే ముందు మొక్క దిగువ భాగాలను పరిశీలించండి.',
    ],
  },

  [
    stemRot1,
  stemRot2,
  stemRot3,
  ],
)


// ============================================================
// FINAL DISEASE ARRAY
// ============================================================

export const diseases: Disease[] = [
  healthy,
  bakanae,
  brownSpot,
  falseSmut,
  leafBlast,
  leafScald,
  narrowBrownSpot,
  neckBlast,
  sheathBlight,
  stemRot,
]


// ============================================================
// DISEASE MAP
// ============================================================

export const diseaseMap = Object.fromEntries(
  diseases.map((item) => [item.id, item]),
) as Record<DiseaseId, Disease>


// ============================================================
// DISEASE IDS
// ============================================================

export const diseaseIds = diseases.map(
  (item) => item.id,
)


// ============================================================
// TOTAL NUMBER OF CLASSES
// ============================================================

export const DISEASE_CLASS_COUNT = diseases.length