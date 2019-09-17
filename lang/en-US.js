export default (context) => {
  return new Promise(function (resolve) {
    resolve({
      landing: {
        welcome: 'your preventive medicine platform',
        infotext1: 'Find the therapy adapted to you, identify the right doctor or practitioner.',
        infotext2: 'Book directly online.',
        infotext3: 'Learn about the different therapies and symptoms complementary and alternative medicine can help out.',
        findBtn: 'find',
        bookBtn: 'book',
        discoverBtn: 'discover',
        jointext: 'Are you a doctor or practitioner?',
        registerBtn: 'JOIN YAO',
        bulletpoint1: 'Yao is a network regulated by doctors and practitioners, to improve trust and the link with patients',
        bulletpoint2: 'Reduce rate of absenteeism',
        bulletpoint3: 'Improve your visibility online',
        discovertext: 'Discover more about complementary and alternative medicine',
        content1: 'Therapies',
        content2: 'Symptoms',
        content3: 'Topics',
        doctorhighlights: 'Meet our doctors and practitioners',
        snacktext: 'Subscribe to our Newsletter',
        subscribe: 'subscribe',
        close: 'close'
      },
      resultpage: {
        therapytext: 'Considering the symptoms or conditions you are looking for, these therapies should be the most appropriate for you',
        doctortext: 'Discover {number} Doctors or Practitioners adapted to your needs'
      },
      admin: {
        tab1: {
          header: 'Personal Details',
          title: 'Title',
          firstname: 'Firstname',
          lastname: 'Lastname',
          praxisname: 'Praxisname',
          street: 'Street',
          housenumber: 'Housenumber',
          zipcode: 'Zipcode',
          city: 'City',
          state: 'State',
          country: 'Country'
        },
        tab2: {
          header: 'Media',
          contactmail: 'Contactmail',
          phonenumber: 'Phonenumber',
          website: 'Website'
        },
        tab3: {
          header: 'Description',
          addBtn: 'Add new description'
        },
        tab4: {
          header: 'Specialities',
          label: 'Specialities',
          hint: 'Pick your specialties'
        },
        saveBtn: 'Save'
      },
      navbar: {
        booking: 'booking',
        profile_settings: 'Profile Settings'
      },
      footer: {
        text: 'Follow us'
      },
      searchbar: {
        placeholder: 'SEARCH FOR SYMPTOMS, CONDITIONS, DOCTORS, PRACTITIONERS',
        symptoms: {
          "Headaches": "Headaches",
          "Hearing disorder": "Hearing disorder",
          "Heart disease": "Heart disease",
          "Heart Failure": "Heart Failure",
          "Abdominal Pain": "Abdominal Pain",
          "Acidity": "Acidity",
          "Acne": "Acne",
          "Alcohol dependence": "Alcohol dependence",
          "Allergy": "Allergy",
          "Angina": "Angina",
          "Ankle": "Ankle",
          "Anxiety": "Anxiety",
          "Arthritis": "Arthritis",
          "Arthritis Gouty": "Arthritis Gouty",
          "Asthma": "Asthma",
          "Asthma Bronquial": "Asthma Bronquial",
          "Absence of Sweating": "Absence of Sweating",
          "Alternating Chills": "Alternating Chills",
          "Attention Deficit Hyperactivity Disorder": "Attention Deficit Hyperactivity Disorder",
          "Autism": "Autism",
          "Back Pain": "Back Pain",
          "Back Pain inflamanotry": "Back Pain inflamanotry",
          "Back Pain Lower": "Back Pain Lower",
          "Balance Problems": "Balance Problems",
          "Behavioural Issues": "Behavioural Issues",
          "Bells palsy": "Bells palsy",
          "Biliary Colic": "Biliary Colic",
          "Bites and Stings": "Bites and Stings",
          "Bitter Taste in the Mouth": "Bitter Taste in the Mouth",
          "Bladder": "Bladder",
          "Blepharitis": "Blepharitis",
          "Bloody Stool": "Bloody Stool",
          "Bloody Stool with Mucus and Tenesmus": "Bloody Stool with Mucus and Tenesmus",
          "Bluish Purple Face and Lips with High Fever and Violent Movement of Limbs": "Bluish Purple Face and Lips with High Fever and Violent Movement of Limbs",
          "Bluish Purple Face and Lips with Intermittent Pain Behind the Sternum or Precordial Region": "Bluish Purple Face and Lips with Intermittent Pain Behind the Sternum or Precordial Region",
          "Bluish Purple Lips": "Bluish Purple Lips",
          "Boils": "Boils",
          "Bone fractures": "Bone fractures",
          "Bright Orange": "Bright Orange",
          "Bright Red with Mild Soreness": "Bright Red with Mild Soreness",
          "Bright White with Puffy and Bloated Appearance": "Bright White with Puffy and Bloated Appearance",
          "Bronquial Tubes": "Bronquial Tubes",
          "Bronquitis": "Bronquitis",
          "Bruising": "Bruising",
          "Burning Pain in the Epigastric Region": "Burning Pain in the Epigastric Region",
          "Burning Pain in the Hypochondriac regions": "Burning Pain in the Hypochondriac regions",
          "Burnt Black and Dry and Withered Auricles in Severe Illness": "Burnt Black and Dry and Withered Auricles in Severe Illness",
          "Cancer": "Cancer",
          "Carbuncles": "Carbuncles",
          "Cardiac Neurosis": "Cardiac Neurosis",
          "Carpal Tunnel Syndrome": "Carpal Tunnel Syndrome",
          "Chest Pain": "Chest Pain",
          "Chest pain or distension": "Chest pain or distension",
          "Chilled Appearance": "Chilled Appearance",
          "Chills Accompanied by Fever": "Chills Accompanied by Fever",
          "Cholecystitis": "Cholecystitis",
          "Cholesterol": "Cholesterol",
          "Chronic Obstructive Pulmonary Disease": "Chronic Obstructive Pulmonary Disease",
          "Chronic Pain": "Chronic Pain",
          "Clear and Profuse Urine": "Clear and Profuse Urine",
          "Clear Discharge": "Clear Discharge",
          "Clear Urine with Increased Volume": "Clear Urine with Increased Volume",
          "Cold": "Cold",
          "Cold Limbs": "Cold Limbs",
          "Colicky Pain": "Colicky Pain",
          "Conjunctivis": "Conjunctivis",
          "Connective Tissue": "Connective Tissue",
          "Constipation": "Constipation",
          "Constipation from Dryness of the Stool": "Constipation from Dryness of the Stool",
          "Contractures": "Contractures",
          "Contusions": "Contusions",
          "Cough": "Cough",
          "Craniocebral injury": "Craniocebral injury",
          "Cuts": "Cuts",
          "Dark Gray Blood Stagnation": "Dark Gray Blood Stagnation",
          "Fasziitis": "Fasziitis",
          "Dental Pain": "Dental Pain",
          "Depleted immune defences": "Depleted immune defences",
          "Depression": "Depression",
          "Dermatitis": "Dermatitis",
          "Diabetes": "Diabetes",
          "Diarrhoea": "Diarrhoea",
          "Difficulty Falling Asleep": "Difficulty Falling Asleep",
          "Diggestive Issues": "Diggestive Issues",
          "Dribbling Urination": "Dribbling Urination",
          "Drug Abuse": "Drug Abuse",
          "Drug Withdrawal": "Drug Withdrawal",
          "Dysentery": "Dysentery",
          "Dysmenorrhoea": "Dysmenorrhoea",
          "Ear infections": "Ear infections",
          "Earache": "Earache",
          "Eating disorders": "Eating disorders",
          "Eczema": "Eczema",
          "Educational attainment issues": "Educational attainment issues",
          "Elbow Golfers": "Elbow Golfers",
          "Elbow pain": "Elbow pain",
          "Tennis elbow": "Tennis elbow",
          "Endoscopic Pain": "Endoscopic Pain",
          "Epigastric Pain Upper Middle Lower": "Epigastric Pain Upper Middle Lower",
          "Epilepsy": "Epilepsy",
          "Epistaxis": "Epistaxis",
          "Excessive Appetite": "Excessive Appetite",
          "Extended Neck": "Extended Neck",
          "Eye pain": "Eye pain",
          "Eye problems": "Eye problems",
          "Facial Pain": "Facial Pain",
          "Facial Paralysis": "Facial Paralysis",
          "Facial Spasm": "Facial Spasm",
          "Facing Downward": "Facing Downward",
          "Falls": "Falls",
          "False Gray and White Membrane over Throat": "False Gray and White Membrane over Throat",
          "Fatigue": "Fatigue",
          "Female infertility": "Female infertility",
          "Female urethral syndrome": "Female urethral syndrome",
          "Fever": "Fever",
          "Fever with Constipation and Fullness and Pain in the Abdomen": "Fever with Constipation and Fullness and Pain in the Abdomen",
          "Fever Yellow": "Fever Yellow",
          "Fibromyalgia": "Fibromyalgia",
          "Flapping of Ala Nasi": "Flapping of Ala Nasi",
          "Flatulence": "Flatulence",
          "Food Poisining": "Food Poisining",
          "Foot pain": "Foot pain",
          "Fullness": "Fullness",
          "Gastric Discomfort": "Gastric Discomfort",
          "Gastritis and Gastrospasm": "Gastritis and Gastrospasm",
          "Gastrointestinal Problems": "Gastrointestinal Problems",
          "Gastrokinetic disturbance": "Gastrokinetic disturbance",
          "General Aching": "General Aching",
          "Gonorrhea": "Gonorrhea",
          "Haemorroids": "Haemorroids",
          "Hand pain": "Hand pain",
          "Heartburn": "Heartburn",
          "Hemorrhoids": "Hemorrhoids",
          "Hepatitis B": "Hepatitis B",
          "Heroin dependence": "Heroin dependence",
          "Herpes simple and Zoster": "Herpes simple and Zoster",
          "High Blood Pressure": "High Blood Pressure",
          "Hip pain": "Hip pain",
          "HIV AIDS": "HIV AIDS",
          "Hormonal imbalance": "Hormonal imbalance",
          "Hunger with no Desire to Eat": "Hunger with no Desire to Eat",
          "Hyperlipaemia": "Hyperlipaemia",
          "Hypertension": "Hypertension",
          "Hyperthyroidism": "Hyperthyroidism",
          "Hypochondriac Pain": "Hypochondriac Pain",
          "Hypo-ovarianism": "Hypo-ovarianism",
          "Immune distress": "Immune distress",
          "Impetigo": "Impetigo",
          "Indigestion": "Indigestion",
          "Induction of Labor": "Induction of Labor",
          "Infant Colic": "Infant Colic",
          "Infertility": "Infertility",
          "Inflamation": "Inflamation",
          "Insomnia": "Insomnia",
          "Insomnia with Palpitations and Dizziness": "Insomnia with Palpitations and Dizziness",
          "Intermittent Pain that is Alleviated by Pressure": "Intermittent Pain that is Alleviated by Pressure",
          "Intestinal Worms": "Intestinal Worms",
          "Irregular Menstrual Cycle": "Irregular Menstrual Cycle",
          "Irritable Bowel Syndrome": "Irritable Bowel Syndrome",
          "Itching eyes": "Itching eyes",
          "Jaw disorder": "Jaw disorder",
          "Joint pain": "Joint pain",
          "Joint Temporomandibular dysfunction": "Joint Temporomandibular dysfunction",
          "Kidney Failure": "Kidney Failure",
          "Kidney stones": "Kidney stones",
          "Knee Pain": "Knee Pain",
          "Knocks": "Knocks",
          "Lachrymation": "Lachrymation",
          "Lack of Thirst During an Illness": "Lack of Thirst During an Illness",
          "Lactation deficiency": "Lactation deficiency",
          "Laryngitis": "Laryngitis",
          "Leg Heaviness": "Leg Heaviness",
          "Leg Pain": "Leg Pain",
          "Lethargy Accompanied by Dizziness": "Lethargy Accompanied by Dizziness",
          "Leukopenia": "Leukopenia",
          "Lips and Mouth": "Lips and Mouth",
          "Liver disorders": "Liver disorders",
          "Loose Stools": "Loose Stools",
          "Loss of Weight in Long Term Illness": "Loss of Weight in Long Term Illness",
          "Low Blood Pressure": "Low Blood Pressure",
          "Lumbago": "Lumbago",
          "Lungs": "Lungs",
          "Male sexual dysfunction": "Male sexual dysfunction",
          "Malposition of Fetus": "Malposition of Fetus",
          "Memory problem": "Memory problem",
          "Ménière disease": "Ménière disease",
          "Menopausal (and Perimenopausal) Symptoms": "Menopausal (and Perimenopausal) Symptoms",
          "Menopausal Symptoms": "Menopausal Symptoms",
          "Menopause": "Menopause",
          "Menstrual  disorders": "Menstrual  disorders",
          "Menstrual Cramps": "Menstrual Cramps",
          "Menstrual pain": "Menstrual pain",
          "Mental Developmental Impairment": "Mental Developmental Impairment",
          "Mental Fatigue": "Mental Fatigue",
          "Migraine": "Migraine",
          "Molluscum": "Molluscum",
          "Morning Sickness": "Morning Sickness",
          "Multiple Sclerosis": "Multiple Sclerosis",
          "Muscle disorder": "Muscle disorder",
          "Muscle Soreness": "Muscle Soreness",
          "Muscular Atrophy of Limbs": "Muscular Atrophy of Limbs",
          "Nausea": "Nausea",
          "Neck Pain": "Neck Pain",
          "Neuralgia": "Neuralgia",
          "Neurodermatitis": "Neurodermatitis",
          "Neuroses": "Neuroses",
          "Night Sweats": "Night Sweats",
          "Nosebleeds": "Nosebleeds",
          "Numbness or Impaired Movement of Limbs on One Side of the Body": "Numbness or Impaired Movement of Limbs on One Side of the Body",
          "Obesity": "Obesity",
          "Osteoarthritis": "Osteoarthritis",
          "Osteoporosis": "Osteoporosis",
          "Ostheoarthritis": "Ostheoarthritis",
          "Overweight with Mental Depression": "Overweight with Mental Depression",
          "Pain in the Limbs Joints Muscles or Meridians": "Pain in the Limbs Joints Muscles or Meridians",
          "Pain with a Cold Sensation and a Preference for Warmth in the Head Lumbar  Epigastric and Abdominal Regions": "Pain with a Cold Sensation and a Preference for Warmth in the Head Lumbar  Epigastric and Abdominal Regions",
          "Pain with and Heavy Sensation in the Head Four Limbs and Lumbar Regions": "Pain with and Heavy Sensation in the Head Four Limbs and Lumbar Regions",
          "Pain  Soreness Heaviness and Numbness in Tendons Bones and Muscles": "Pain  Soreness Heaviness and Numbness in Tendons Bones and Muscles",
          "Painful urination": "Painful urination",
          "Pale and Dark with Lumbar Soreness and Cold Feet": "Pale and Dark with Lumbar Soreness and Cold Feet",
          "Pale Gums": "Pale Gums",
          "Pale Lips": "Pale Lips",
          "Pale Yellow": "Pale Yellow",
          "Pediatric Problems": "Pediatric Problems",
          "Period Disorders": "Period Disorders",
          "Peripheral Arterial disease": "Peripheral Arterial disease",
          "Persistent Pain in a Recent Disease": "Persistent Pain in a Recent Disease",
          "Pharyngitis": "Pharyngitis",
          "Pimple": "Pimple",
          "Plantar Warts": "Plantar Warts",
          "Pleural Effusion": "Pleural Effusion",
          "Pleurisy": "Pleurisy",
          "PMT": "PMT",
          "Poly Cystic Ovaries": "Poly Cystic Ovaries",
          "Poor Appetite in a Prolonged Illness": "Poor Appetite in a Prolonged Illness",
          "Poor Appetite with Stuffiness in the Chest and Fullness in the Abdomen": "Poor Appetite with Stuffiness in the Chest and Fullness in the Abdomen",
          "Poor circulation": "Poor circulation",
          "Poor digestion": "Poor digestion",
          "Post Heart Attack Rehabilitation": "Post Heart Attack Rehabilitation",
          "Post Operative Pain": "Post Operative Pain",
          "Post-extubation in children": "Post-extubation in children",
          "Postoperative convalescence": "Postoperative convalescence",
          "Post-Operative Recovery": "Post-Operative Recovery",
          "Post-Polio Syndrome": "Post-Polio Syndrome",
          "Post-Stroke Rehabilitation": "Post-Stroke Rehabilitation",
          "Post-Traumatic Stress Disorder": "Post-Traumatic Stress Disorder",
          "Postural Problems": "Postural Problems",
          "Pregnancy": "Pregnancy",
          "Pregnancy Labor pain": "Pregnancy Labor pain",
          "Premenstrual or Menstrual Distending Pain in the Breasts and Lower Abdomen": "Premenstrual or Menstrual Distending Pain in the Breasts and Lower Abdomen",
          "Premenstrual syndrome": "Premenstrual syndrome",
          "Presence of Thirst During an Illness": "Presence of Thirst During an Illness",
          "Prickling Pain  Sharp and Fixed in Chest Epigastric Hypochondriac and Lower Abdominal Regions": "Prickling Pain  Sharp and Fixed in Chest Epigastric Hypochondriac and Lower Abdominal Regions",
          "Profuse Sweating with High Fever": "Profuse Sweating with High Fever",
          "Profuse Sweating with Listlessness": "Profuse Sweating with Listlessness",
          "Prolonged Turbid Discharge": "Prolonged Turbid Discharge",
          "Prostatis": "Prostatis",
          "Prostatism": "Prostatism",
          "Pruritus": "Pruritus",
          "Psoriasis": "Psoriasis",
          "Pulling Pain": "Pulling Pain",
          "Purulent Discharge": "Purulent Discharge",
          "Pustules": "Pustules",
          "Radicular and Pseudoradicular pain": "Radicular and Pseudoradicular pain",
          "Raynaud syndrome": "Raynaud syndrome",
          "Red and Dry Lips": "Red and Dry Lips",
          "Red Urine": "Red Urine",
          "Redness and Swelling": "Redness and Swelling",
          "Redness and Swelling with Bleeding": "Redness and Swelling with Bleeding",
          "Redness and Swelling with Yellow or White Ulcer Spots": "Redness and Swelling with Yellow or White Ulcer Spots",
          "Redness Swelling and Soreness": "Redness, Swelling, and Soreness",
          "Reflex sympathetic dystrophy": "Reflex sympathetic dystrophy",
          "Renal Colic": "Renal Colic",
          "Retention of Urine": "Retention of Urine",
          "Rheumatism": "Rheumatism",
          "Rheumatoid Arthritis": "Rheumatoid Arthritis",
          "Rhinitis": "Rhinitis",
          "Scanty and Yellow Urine": "Scanty and Yellow Urine",
          "Schizophrenia": "Schizophrenia",
          "Sciatica": "Sciatica",
          "Scoliosis": "Scoliosis",
          "Seizure": "Seizure",
          "Septic wounds": "Septic wounds",
          "Severe Fever Thirst  Sweating and a Superficial Rapid Pulse": "Severe Fever Thirst  Sweating and a Superficial Rapid Pulse",
          "Sexual problems": "Sexual problems",
          "Shingles": "Shingles",
          "Shoulder Pain": "Shoulder Pain",
          "Sialism": "Sialism",
          "Sinusitis": "Sinusitis",
          "Sjögren syndrome": "Sjögren syndrome",
          "Skin irritiation": "Skin irritiation",
          "Skin problems": "Skin problems",
          "Sleep disorders": "Sleep disorders",
          "Smoking": "Smoking",
          "Smoky Dark": "Smoky Dark",
          "Sore throat": "Sore throat",
          "Sores": "Sores",
          "Sour Regurgitation": "Sour Regurgitation",
          "Spine pain": "Spine pain",
          "Spontaneous Sweating": "Spontaneous Sweating",
          "Sport injury": "Sport injury",
          "Sprain": "Sprain",
          "Stiff Neck": "Stiff Neck",
          "Stomach Complaints": "Stomach Complaints",
          "Stomach Discomfort": "Stomach Discomfort",
          "Strain injuries": "Strain injuries",
          "Stress": "Stress",
          "Stroke": "Stroke",
          "Styes and Dacryocistitis": "Styes and Dacryocistitis",
          "Sudden Collapse with Lockjaw": "Sudden Collapse with Lockjaw",
          "Sudden Collapse with Open Mouth": "Sudden Collapse with Open Mouth",
          "Sweet Taste in the Mouth": "Sweet Taste in the Mouth",
          "Tastelessness": "Tastelessness",
          "Teeths problems": "Teeths problems",
          "Tendonitis": "Tendonitis",
          "Testicular Pain": "Testicular Pain",
          "Thin with Dry Skin": "Thin with Dry Skin",
          "Thin Scanty Light Colored Flow": "Thin Scanty Light Colored Flow",
          "Thoratache": "Thoratache",
          "Throat infections": "Throat infections",
          "Thromboangiitis Obliterans Pain": "Thromboangiitis Obliterans Pain",
          "Tidal Fever": "Tidal Fever",
          "Tietze syndrome": "Tietze syndrome",
          "Tinnitus": "Tinnitus",
          "Tobacco dependence": "Tobacco dependence",
          "Tonsillitis": "Tonsillitis",
          "Toothache": "Toothache",
          "Tourette syndrome": "Tourette syndrome",
          "Tracheitis": "Tracheitis",
          "Trauma of ligaments": "Trauma of ligaments",
          "Tuberculosis": "Tuberculosis",
          "Turbid Discharge": "Turbid Discharge",
          "Turbid Urine": "Turbid Urine",
          "Ulcer": "Ulcer",
          "Ulceration or Canthus": "Ulceration or Canthus",
          "Ulcerative colitis": "Ulcerative colitis",
          "Upward Straight Forward  or Sideways Staring": "Upward Straight Forward  or Sideways Staring",
          "Urinary infections": "Urinary infections",
          "Urinay Stress": "Urinay Stress",
          "Urine retention": "Urine retention",
          "Urolithiasis": "Urolithiasis",
          "Urticaria": "Urticaria",
          "Uterus Pain": "Uterus Pain",
          "Uveitis": "Uveitis",
          "Varicose Veins": "Varicose Veins",
          "Vascular dementia": "Vascular dementia",
          "Venous problems": "Venous problems",
          "Vertigo": "Vertigo",
          "Verucas": "Verucas",
          "Violent Movement of Limbs": "Violent Movement of Limbs",
          "Vomiting": "Vomiting",
          "Water retention": "Water retention",
          "Watery Stool with Undigested Food": "Watery Stool with Undigested Food",
          "Weak and slow Pulse": "Weak and slow Pulse",
          "Weakness and Motor Impairment": "Weakness and Motor Impairment",
          "Whooping cough": "Whooping cough",
          "Withered White": "Withered White",
          "Work Strain": "Work Strain",
          "Wounds": "Wounds",
          "Wrist Pain": "Wrist Pain",
          "Yellow Sclera": "Yellow Sclera",
          "Yellow Urine": "Yellow Urine",
          "Hangovers": "Hangovers"
        }
      },
      therapy: {
        Osteopathy: 'Osteopathy',
        TCM: 'TCM',
        Anthroposophy: 'Anthroposophy',
        Homeopathy: 'Homeopathy',
        'Tuina-Massage': 'Tuina-Massage',
        'Herbal Medicine': 'Herbal Medicine',
        Yoga: 'Yoga',
        'Massage Therapy': 'Massage Therapy',
        Chiropractic: 'Chiropractic',
        Acupuncture: 'Acupuncture',
        'Somatic Bodywork': 'Somatic Bodywork',
        Naturopathy: 'Naturopathy',
        'Pain Therapy': 'Pain Therapy',
        Cupping: 'Cupping',
        'Nutrition Therapy': 'Nutrition Therapy',
        Heilpraktiker: 'Heilpraktiker',
        'Podo Orthesiology': 'Podo Orthesiology',
        'Neural Therapy': 'Neural Therapy',
        'Infusion Therapy': 'Infusion Therapy',
        Fasting: 'Fasting',
        'Bach Flower Therapy': 'Bach Flower Therapy',
        'Phytotherapy': 'Phytotherapy',
        'Children Treatment': 'Children Treatment',
        Psychotherapy: 'Psychotherapy',
        'Energetic Massage': 'Energetic Massage',
        'General Medicine': 'General Medicine',
        'Symptom Communication Intuitive Bodywork': 'Symptom Communication Intuitive Bodywork',
        'Life Coaching': 'Life Coaching'
      },
      doctor: {
        component: {
          button: 'BOOKING'
        },
        profile: {
          paymentoptions: 'Payment Options'
        }
      },
      booking: {
        title: 'Book appointment',
        treatment: 'Treatment*',
        firstname: 'Firstname*',
        lastname: 'Lastname*',
        phone: 'Phone*',
        hint: '* indicates the required fields',
        agb: 'accept AGB',
        cancel: 'Cancel',
        book: 'Book'
      }
    })
  })
}