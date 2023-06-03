import React, { useState } from 'react';
import './NeoTool.css'; // make sure to import the CSS file


function NeoTool() {
  const [treatmentText, setTreatmentText] = useState('');
  const [gestAge, setGestAge] = useState();
  const [remainingGestAgeDays, setRemainingGestAgeDays] = useState();
  const [dob, setDob] = useState();
  const [weight, setWeight] = useState();

  const calculateTreatmentDate = (dob, gestAge, remainingGestAgeDays, weeksToAdd, prefixText) => {
    let dobDate = new Date(dob);

    // Subtract the gestational age at birth
    let gestAgeInDays = gestAge * 7 + parseInt(remainingGestAgeDays);
    
    // Create new date strings to avoid timezone issues
    dobDate.setUTCDate(dobDate.getUTCDate() - gestAgeInDays);

    // Add the desired number of weeks
    dobDate.setUTCDate(dobDate.getUTCDate() + weeksToAdd * 7);

    // Format date as MM-DD-YYYY
    let treatmentDateFormatted = (dobDate.getUTCMonth() + 1).toString().padStart(2, '0') + '-' 
                                + dobDate.getUTCDate().toString().padStart(2, '0') + '-' 
                                + dobDate.getUTCFullYear();

    return `${prefixText} ${treatmentDateFormatted}`;
  };

  const calculatePostMenstrualExamDate = (dob, gestAge, remainingGestAgeDays) => {
    let postMenstrualAge;
  
    if (gestAge < 28) {
      postMenstrualAge = 31;
    } else if (gestAge >= 28 && gestAge < 29) {
      postMenstrualAge = 32;
    } else if (gestAge >= 29 && gestAge < 30) {
      postMenstrualAge = 33;
    } else if (gestAge >= 30 && gestAge < 31) {
      postMenstrualAge = 34;
    } else if (gestAge >= 31 && gestAge < 32) {
      postMenstrualAge = 35;
    } else if (gestAge >= 32 && gestAge < 33) {
      postMenstrualAge = 36;
    } else {
      postMenstrualAge = 36;
    }
  
    let totalGestAgeInDays = gestAge * 7 + parseInt(remainingGestAgeDays);
    let totalPostMenstrualAgeInDays = postMenstrualAge * 7;
    
    let dobDate = new Date(dob);
    dobDate.setUTCDate(dobDate.getUTCDate() + totalPostMenstrualAgeInDays - totalGestAgeInDays); 
  
    let examDateFormatted = (dobDate.getUTCMonth() + 1).toString().padStart(2, '0') + '-' 
                            + dobDate.getUTCDate().toString().padStart(2, '0') + '-' 
                            + dobDate.getUTCFullYear();
  
    return `First ROP Exam Due near week of: ${examDateFormatted}`;
  };
  
  const calculateHUSDates = (dob, gestAge, remainingGestAgeDays) => {
    let dobDate = new Date(dob);
    let husDates = [];
  
    // First HUS date after 7 days
    let firstHusDate = new Date(dobDate);
    firstHusDate.setUTCDate(dobDate.getUTCDate() + 7);
    let firstHusDateFormatted = (firstHusDate.getUTCMonth() + 1).toString().padStart(2, '0') + '-' 
                              + firstHusDate.getUTCDate().toString().padStart(2, '0') + '-' 
                              + firstHusDate.getUTCFullYear();
    husDates.push(`First HUS date @ 7 days: ${firstHusDateFormatted}`);
  
    // Second HUS date after 28 days
    let secondHusDate = new Date(dobDate);
    secondHusDate.setUTCDate(dobDate.getUTCDate() + 28);
    let secondHusDateFormatted = (secondHusDate.getUTCMonth() + 1).toString().padStart(2, '0') + '-' 
                               + secondHusDate.getUTCDate().toString().padStart(2, '0') + '-' 
                               + secondHusDate.getUTCFullYear();
    husDates.push(`Second HUS date @ 28 days: ${secondHusDateFormatted}`);
  
    // Third HUS date after 40 weeks
    let totalGestAgeInDays = gestAge * 7 + parseInt(remainingGestAgeDays);
    let thirdHusDate = new Date(dobDate);
    thirdHusDate.setUTCDate(dobDate.getUTCDate() - totalGestAgeInDays + 40 * 7);
    let thirdHusDateFormatted = (thirdHusDate.getUTCMonth() + 1).toString().padStart(2, '0') + '-' 
                              + thirdHusDate.getUTCDate().toString().padStart(2, '0') + '-' 
                              + thirdHusDate.getUTCFullYear();
    husDates.push(`Third HUS date @ 40 weeks: ${thirdHusDateFormatted}`);
  
    return husDates;
  };
  
  const addDaysToDOB = (dob, daysToAdd, prefixText) => {
    let dobDate = new Date(dob);
    
    // Add the desired number of days
    dobDate.setUTCDate(dobDate.getUTCDate() + daysToAdd);
    
    // Format date as MM-DD-YYYY
    let newDateFormatted = (dobDate.getUTCMonth() + 1).toString().padStart(2, '0') + '-' 
                         + dobDate.getUTCDate().toString().padStart(2, '0') + '-' 
                         + dobDate.getUTCFullYear();
  
    return `${prefixText} ${newDateFormatted}`;
  };
  
  const printText = (text) => {
    return text;
  };
  
  
  

  const submitData = () => {
    if (gestAge && remainingGestAgeDays && dob && weight) {
      let totalGestAgeDays = gestAge * 7 + parseInt(remainingGestAgeDays);
      let calculatedTexts = []; // This array will store all calculated texts
      if (weight > 0 && weight <= 1250 && totalGestAgeDays > 0 && totalGestAgeDays <= 195) {
        calculatedTexts.push(calculateTreatmentDate(dob, gestAge, remainingGestAgeDays, 35, "DEBM stop at 1500g+35w:"));
        calculatedTexts.push(calculateTreatmentDate(dob, gestAge, remainingGestAgeDays, 33, "Prolacta stop at 1500g+33w:"));
        calculatedTexts.push(calculateTreatmentDate(dob, gestAge, remainingGestAgeDays, 35, "Probiotics stop at 1500g+35w:"));
        calculatedTexts.push(addDaysToDOB(dob, 14, "MVI/Fe at full feed and ≥14dol:"));
        calculatedTexts.push(printText("Vit K 0.3-0.5mg/kg IM"));
        calculatedTexts.push(calculatePostMenstrualExamDate(dob, gestAge, remainingGestAgeDays));
        calculatedTexts.push(...calculateHUSDates(dob, gestAge, remainingGestAgeDays));
        calculatedTexts.push(calculateTreatmentDate(dob, gestAge, remainingGestAgeDays, 32, "ECHO @32w if vent or SGA:"));
        calculatedTexts.push(calculateTreatmentDate(dob, gestAge, remainingGestAgeDays, 36, "ECHO @36w if on resp supp:"));
        calculatedTexts.push(printText("PNS:mod/sev BPD risk>60% at 14,21,28d"));
        calculatedTexts.push(addDaysToDOB(dob, 14, "(14 days)"));
        calculatedTexts.push(addDaysToDOB(dob, 21, "(21 days)"));
        calculatedTexts.push(addDaysToDOB(dob, 28, "(28 days)"));
        calculatedTexts.push(printText("NIPPV"));
        calculatedTexts.push(calculateTreatmentDate(dob, gestAge, remainingGestAgeDays, 32, "caffeine til 32w+no apnea off PP:"));
        calculatedTexts.push(printText("Synagis "));
        calculatedTexts.push(printText("NEST f/u Tier 1b"));



      } else if (weight > 1250 && weight <= 1500 && totalGestAgeDays > 0 && totalGestAgeDays <= 195) {
        calculatedTexts.push(calculateTreatmentDate(dob, gestAge, remainingGestAgeDays, 35, "DEBM stop at 1500g+35w:"));
        calculatedTexts.push(printText("HMF/PTF until 3.5kg then D/C feeds"));
        calculatedTexts.push(calculateTreatmentDate(dob, gestAge, remainingGestAgeDays, 35, "Probiotics stop at 1500g+35w:"));
        calculatedTexts.push(addDaysToDOB(dob, 14, "VitD/Fe at full feed and ≥14dol:"));
        calculatedTexts.push(printText("Vit K 0.3-0.5mg/kg IM, 1mg if 1500g"));
        calculatedTexts.push(calculatePostMenstrualExamDate(dob, gestAge, remainingGestAgeDays));
        calculatedTexts.push(...calculateHUSDates(dob, gestAge, remainingGestAgeDays));
        calculatedTexts.push(calculateTreatmentDate(dob, gestAge, remainingGestAgeDays, 32, "ECHO @32w if vent or SGA:"));
        calculatedTexts.push(calculateTreatmentDate(dob, gestAge, remainingGestAgeDays, 36, "ECHO @36w if on resp supp:"));
        calculatedTexts.push(printText("PNS:mod/sev BPD risk>60% at 14,21,28d"));
        calculatedTexts.push(addDaysToDOB(dob, 14, "(14 days)"));
        calculatedTexts.push(addDaysToDOB(dob, 21, "(21 days)"));
        calculatedTexts.push(addDaysToDOB(dob, 28, "(28 days)"));
        calculatedTexts.push(printText("NIPPV"));
        calculatedTexts.push(calculateTreatmentDate(dob, gestAge, remainingGestAgeDays, 32, "caffeine til 32w+no apnea off PP:"));
        calculatedTexts.push(printText("Synagis "));
        calculatedTexts.push(printText("NEST f/u Tier 1b"));

      } else if (weight > 1500 && weight <= 1800 && totalGestAgeDays > 0 && totalGestAgeDays <= 195) {
        calculatedTexts.push(calculateTreatmentDate(dob, gestAge, remainingGestAgeDays, 35, "DEBM stop at 35w:"));
        calculatedTexts.push(printText("HMF/PTF until 3.5kg then D/C feeds"));
        calculatedTexts.push(calculateTreatmentDate(dob, gestAge, remainingGestAgeDays, 35, "Probiotics stop at 35w:"));
        calculatedTexts.push(addDaysToDOB(dob, 14, "VitD/Fe at full feed and ≥14dol:"));
        calculatedTexts.push(printText("Vit K 1mg IM"));
        calculatedTexts.push(calculatePostMenstrualExamDate(dob, gestAge, remainingGestAgeDays));
        calculatedTexts.push(...calculateHUSDates(dob, gestAge, remainingGestAgeDays));
        calculatedTexts.push(calculateTreatmentDate(dob, gestAge, remainingGestAgeDays, 32, "ECHO @32w if vent or SGA:"));
        calculatedTexts.push(calculateTreatmentDate(dob, gestAge, remainingGestAgeDays, 36, "ECHO @36w if on resp supp:"));
        calculatedTexts.push(printText("PNS:mod/sev BPD risk>60% at 14,21,28d"));
        calculatedTexts.push(addDaysToDOB(dob, 14, "(14 days)"));
        calculatedTexts.push(addDaysToDOB(dob, 21, "(21 days)"));
        calculatedTexts.push(addDaysToDOB(dob, 28, "(28 days)"));
        calculatedTexts.push(printText("NIPPV"));
        calculatedTexts.push(calculateTreatmentDate(dob, gestAge, remainingGestAgeDays, 32, "caffeine til 32w+no apnea off PP:"));
        calculatedTexts.push(printText("Synagis "));
        calculatedTexts.push(printText("NEST f/u Tier 1b"));

      } else if (weight > 1800 && weight <= 2000 && totalGestAgeDays > 0 && totalGestAgeDays <= 195) {
        calculatedTexts.push(calculateTreatmentDate(dob, gestAge, remainingGestAgeDays, 35, "DEBM stop at 35w:"));
        calculatedTexts.push(printText("HMF/PTF until 3.5kg then D/C feeds"));
        calculatedTexts.push(calculateTreatmentDate(dob, gestAge, remainingGestAgeDays, 35, "Probiotics stop at 35w:"));
        calculatedTexts.push(addDaysToDOB(dob, 14, "VitD/Fe at full feed and ≥14dol:"));
        calculatedTexts.push(printText("Vit K 1mg IM"));
        calculatedTexts.push(calculatePostMenstrualExamDate(dob, gestAge, remainingGestAgeDays));
        calculatedTexts.push(...calculateHUSDates(dob, gestAge, remainingGestAgeDays));
        calculatedTexts.push(calculateTreatmentDate(dob, gestAge, remainingGestAgeDays, 32, "ECHO @32w if vent or SGA:"));
        calculatedTexts.push(calculateTreatmentDate(dob, gestAge, remainingGestAgeDays, 36, "ECHO @36w if on resp supp:"));
        calculatedTexts.push(printText("PNS:mod/sev BPD risk>60% at 14,21,28d"));
        calculatedTexts.push(addDaysToDOB(dob, 14, "(14 days)"));
        calculatedTexts.push(addDaysToDOB(dob, 21, "(21 days)"));
        calculatedTexts.push(addDaysToDOB(dob, 28, "(28 days)"));
        calculatedTexts.push(printText("NIPPV"));
        calculatedTexts.push(calculateTreatmentDate(dob, gestAge, remainingGestAgeDays, 32, "caffeine til 32w+no apnea off PP:"));
        calculatedTexts.push(printText("Synagis "));
        calculatedTexts.push(printText("NEST f/u Tier 1b"));

      } else if (weight > 2000 && weight <= 2200 && totalGestAgeDays > 0 && totalGestAgeDays <= 195) {
        calculatedTexts.push(calculateTreatmentDate(dob, gestAge, remainingGestAgeDays, 35, "DEBM stop at 35w:"));
        calculatedTexts.push(printText("HMF/PTF until 3.5kg then D/C feeds"));
        calculatedTexts.push(calculateTreatmentDate(dob, gestAge, remainingGestAgeDays, 35, "Probiotics stop at 35w:"));
        calculatedTexts.push(addDaysToDOB(dob, 14, "VitD/Fe at full feed and ≥14dol:"));
        calculatedTexts.push(printText("Vit K 1mg IM"));
        calculatedTexts.push(calculatePostMenstrualExamDate(dob, gestAge, remainingGestAgeDays));
        calculatedTexts.push(...calculateHUSDates(dob, gestAge, remainingGestAgeDays));
        calculatedTexts.push(calculateTreatmentDate(dob, gestAge, remainingGestAgeDays, 32, "ECHO @32w if vent or SGA:"));
        calculatedTexts.push(calculateTreatmentDate(dob, gestAge, remainingGestAgeDays, 36, "ECHO @36w if on resp supp:"));
        calculatedTexts.push(printText("PNS:mod/sev BPD risk>60% at 14,21,28d"));
        calculatedTexts.push(addDaysToDOB(dob, 14, "(14 days)"));
        calculatedTexts.push(addDaysToDOB(dob, 21, "(21 days)"));
        calculatedTexts.push(addDaysToDOB(dob, 28, "(28 days)"));
        calculatedTexts.push(printText("NIPPV"));
        calculatedTexts.push(calculateTreatmentDate(dob, gestAge, remainingGestAgeDays, 32, "caffeine til 32w+no apnea off PP:"));
        calculatedTexts.push(printText("Synagis "));
        calculatedTexts.push(printText("NEST f/u Tier 1b"));

// END OF ROW 1

} else if (weight > 0 && weight <= 1250 && totalGestAgeDays > 195 && totalGestAgeDays <= 202) {
  calculatedTexts.push(calculateTreatmentDate(dob, gestAge, remainingGestAgeDays, 35, "DEBM stop at 1500g+35w:"));
  calculatedTexts.push(calculateTreatmentDate(dob, gestAge, remainingGestAgeDays, 33, "Prolacta stop at 1500g+33w:"));
  calculatedTexts.push(calculateTreatmentDate(dob, gestAge, remainingGestAgeDays, 35, "Probiotics stop at 1500g+35w:"));
  calculatedTexts.push(addDaysToDOB(dob, 14, "MVI/Fe at full feed and ≥14dol:"));
  calculatedTexts.push(printText("Vit K 0.3-0.5mg/kg IM"));
  calculatedTexts.push(calculatePostMenstrualExamDate(dob, gestAge, remainingGestAgeDays));
  calculatedTexts.push(...calculateHUSDates(dob, gestAge, remainingGestAgeDays));
  calculatedTexts.push(calculateTreatmentDate(dob, gestAge, remainingGestAgeDays, 36, "ECHO @36w if on resp supp:"));
  calculatedTexts.push(printText("PNS:mod/sev BPD risk>60% at 14,21,28d"));
  calculatedTexts.push(addDaysToDOB(dob, 14, "(14 days)"));
  calculatedTexts.push(addDaysToDOB(dob, 21, "(21 days)"));
  calculatedTexts.push(addDaysToDOB(dob, 28, "(28 days)"));
  calculatedTexts.push(printText("NIPPV"));
  calculatedTexts.push(calculateTreatmentDate(dob, gestAge, remainingGestAgeDays, 32, "caffeine til 32w+no apnea off PP:"));
  calculatedTexts.push(printText("Synagis "));
  calculatedTexts.push(printText("NEST f/u Tier 1b"));

} else if (weight > 1250 && weight <= 1500 && totalGestAgeDays > 195 && totalGestAgeDays <= 202) {
  calculatedTexts.push(calculateTreatmentDate(dob, gestAge, remainingGestAgeDays, 35, "DEBM stop at 1500g+35w:"));
  calculatedTexts.push(printText("HMF/PTF until 3.5kg then D/C feeds"));
  calculatedTexts.push(calculateTreatmentDate(dob, gestAge, remainingGestAgeDays, 35, "Probiotics stop at 1500g+35w:"));
  calculatedTexts.push(addDaysToDOB(dob, 14, "VitD/Fe at full feed and ≥14dol:"));
  calculatedTexts.push(printText("Vit K 0.3-0.5mg/kg IM, 1mg if 1500g"));
  calculatedTexts.push(calculatePostMenstrualExamDate(dob, gestAge, remainingGestAgeDays));
  calculatedTexts.push(...calculateHUSDates(dob, gestAge, remainingGestAgeDays));
  calculatedTexts.push(calculateTreatmentDate(dob, gestAge, remainingGestAgeDays, 36, "ECHO @36w if on resp supp:"));
  calculatedTexts.push(printText("PNS:mod/sev BPD risk>60% at 14,21,28d"));
  calculatedTexts.push(addDaysToDOB(dob, 14, "(14 days)"));
  calculatedTexts.push(addDaysToDOB(dob, 21, "(21 days)"));
  calculatedTexts.push(addDaysToDOB(dob, 28, "(28 days)"));
  calculatedTexts.push(printText("NIPPV"));
  calculatedTexts.push(calculateTreatmentDate(dob, gestAge, remainingGestAgeDays, 32, "caffeine til 32w+no apnea off PP:"));
  calculatedTexts.push(printText("Synagis "));
  calculatedTexts.push(printText("NEST f/u Tier 1b"));

} else if (weight > 1500 && weight <= 1800 && totalGestAgeDays > 195 && totalGestAgeDays <= 202) {
  calculatedTexts.push(calculateTreatmentDate(dob, gestAge, remainingGestAgeDays, 35, "DEBM stop at 35w:"));
  calculatedTexts.push(printText("HMF/PTF until 3.5kg then D/C feeds"));
  calculatedTexts.push(calculateTreatmentDate(dob, gestAge, remainingGestAgeDays, 35, "Probiotics stop at 35w:"));
  calculatedTexts.push(addDaysToDOB(dob, 14, "VitD/Fe at full feed and ≥14dol:"));
  calculatedTexts.push(printText("Vit K 1mg IM"));
  calculatedTexts.push(calculatePostMenstrualExamDate(dob, gestAge, remainingGestAgeDays));
  calculatedTexts.push(...calculateHUSDates(dob, gestAge, remainingGestAgeDays));
  calculatedTexts.push(calculateTreatmentDate(dob, gestAge, remainingGestAgeDays, 36, "ECHO @36w if on resp supp:"));
  calculatedTexts.push(printText("PNS:mod/sev BPD risk>60% at 14,21,28d"));
  calculatedTexts.push(addDaysToDOB(dob, 14, "(14 days)"));
  calculatedTexts.push(addDaysToDOB(dob, 21, "(21 days)"));
  calculatedTexts.push(addDaysToDOB(dob, 28, "(28 days)"));
  calculatedTexts.push(printText("NIPPV"));
  calculatedTexts.push(calculateTreatmentDate(dob, gestAge, remainingGestAgeDays, 32, "caffeine til 32w+no apnea off PP:"));
  calculatedTexts.push(printText("Synagis "));
  calculatedTexts.push(printText("NEST f/u Tier 1b"));

} else if (weight > 1800 && weight <= 2000 && totalGestAgeDays > 195 && totalGestAgeDays <= 202) {
  calculatedTexts.push(calculateTreatmentDate(dob, gestAge, remainingGestAgeDays, 35, "DEBM stop at 35w:"));
  calculatedTexts.push(printText("HMF/PTF until 3.5kg then D/C feeds"));
  calculatedTexts.push(calculateTreatmentDate(dob, gestAge, remainingGestAgeDays, 35, "Probiotics stop at 35w:"));
  calculatedTexts.push(addDaysToDOB(dob, 14, "VitD/Fe at full feed and ≥14dol:"));
  calculatedTexts.push(printText("Vit K 1mg IM"));
  calculatedTexts.push(calculatePostMenstrualExamDate(dob, gestAge, remainingGestAgeDays));
  calculatedTexts.push(...calculateHUSDates(dob, gestAge, remainingGestAgeDays));
  calculatedTexts.push(calculateTreatmentDate(dob, gestAge, remainingGestAgeDays, 36, "ECHO @36w if on resp supp:"));
  calculatedTexts.push(printText("PNS:mod/sev BPD risk>60% at 14,21,28d"));
  calculatedTexts.push(addDaysToDOB(dob, 14, "(14 days)"));
  calculatedTexts.push(addDaysToDOB(dob, 21, "(21 days)"));
  calculatedTexts.push(addDaysToDOB(dob, 28, "(28 days)"));
  calculatedTexts.push(printText("NIPPV"));
  calculatedTexts.push(calculateTreatmentDate(dob, gestAge, remainingGestAgeDays, 32, "caffeine til 32w+no apnea off PP:"));
  calculatedTexts.push(printText("Synagis "));
  calculatedTexts.push(printText("NEST f/u Tier 1b"));

} else if (weight > 2000 && weight <= 2200 && totalGestAgeDays > 195 && totalGestAgeDays <= 202) {
  calculatedTexts.push(calculateTreatmentDate(dob, gestAge, remainingGestAgeDays, 35, "DEBM stop at 35w:"));
  calculatedTexts.push(printText("HMF/PTF until 3.5kg then D/C feeds"));
  calculatedTexts.push(calculateTreatmentDate(dob, gestAge, remainingGestAgeDays, 35, "Probiotics stop at 35w:"));
  calculatedTexts.push(addDaysToDOB(dob, 14, "VitD/Fe at full feed and ≥14dol:"));
  calculatedTexts.push(printText("Vit K 1mg IM"));
  calculatedTexts.push(calculatePostMenstrualExamDate(dob, gestAge, remainingGestAgeDays));
  calculatedTexts.push(...calculateHUSDates(dob, gestAge, remainingGestAgeDays));
  calculatedTexts.push(calculateTreatmentDate(dob, gestAge, remainingGestAgeDays, 36, "ECHO @36w if on resp supp:"));
  calculatedTexts.push(printText("PNS:mod/sev BPD risk>60% at 14,21,28d"));
  calculatedTexts.push(addDaysToDOB(dob, 14, "(14 days)"));
  calculatedTexts.push(addDaysToDOB(dob, 21, "(21 days)"));
  calculatedTexts.push(addDaysToDOB(dob, 28, "(28 days)"));
  calculatedTexts.push(printText("NIPPV"));
  calculatedTexts.push(calculateTreatmentDate(dob, gestAge, remainingGestAgeDays, 32, "caffeine til 32w+no apnea off PP:"));
  calculatedTexts.push(printText("Synagis "));
  calculatedTexts.push(printText("NEST f/u Tier 1b"));

  // END OF ROW 2

} else if (weight > 0 && weight <= 1250 && totalGestAgeDays > 202 && totalGestAgeDays <= 216) {
  calculatedTexts.push(calculateTreatmentDate(dob, gestAge, remainingGestAgeDays, 35, "DEBM stop at 1500g+35w:"));
  calculatedTexts.push(calculateTreatmentDate(dob, gestAge, remainingGestAgeDays, 33, "Prolacta stop at 1500g+33w:"));
  calculatedTexts.push(calculateTreatmentDate(dob, gestAge, remainingGestAgeDays, 35, "Probiotics stop at 1500g+35w:"));
  calculatedTexts.push(addDaysToDOB(dob, 14, "MVI/Fe at full feed and ≥14dol:"));
  calculatedTexts.push(printText("Vit K 0.3-0.5mg/kg IM"));
  calculatedTexts.push(calculatePostMenstrualExamDate(dob, gestAge, remainingGestAgeDays));
  calculatedTexts.push(...calculateHUSDates(dob, gestAge, remainingGestAgeDays));
  calculatedTexts.push(calculateTreatmentDate(dob, gestAge, remainingGestAgeDays, 36, "ECHO @36w if on resp supp:"));
  calculatedTexts.push(printText("PNS:mod/sev BPD risk>60% at 14,21,28d"));
  calculatedTexts.push(addDaysToDOB(dob, 14, "(14 days)"));
  calculatedTexts.push(addDaysToDOB(dob, 21, "(21 days)"));
  calculatedTexts.push(addDaysToDOB(dob, 28, "(28 days)"));
  calculatedTexts.push(calculateTreatmentDate(dob, gestAge, remainingGestAgeDays, 30, "NIPPV if under 30w+0d:"));
  calculatedTexts.push(calculateTreatmentDate(dob, gestAge, remainingGestAgeDays, 32, "caffeine til 32w+no apnea off PP:"));
  calculatedTexts.push(addDaysToDOB(dob, 28, "Synagis if  O2 at least 28d after  birth"));
  calculatedTexts.push(printText("NEST f/u Tier 2"));

} else if (weight > 1250 && weight <= 1500 && totalGestAgeDays > 202 && totalGestAgeDays <= 216) {
  calculatedTexts.push(calculateTreatmentDate(dob, gestAge, remainingGestAgeDays, 35, "DEBM stop at 1500g+35w:"));
  calculatedTexts.push(printText("HMF/PTF until 3.5kg then D/C feeds"));
  calculatedTexts.push(calculateTreatmentDate(dob, gestAge, remainingGestAgeDays, 35, "Probiotics stop at 1500g+35w:"));
  calculatedTexts.push(addDaysToDOB(dob, 14, "VitD/Fe at full feed and ≥14dol:"));
  calculatedTexts.push(printText("Vit K 0.3-0.5mg/kg IM, 1mg if 1500g"));
  calculatedTexts.push(calculatePostMenstrualExamDate(dob, gestAge, remainingGestAgeDays));
  calculatedTexts.push(...calculateHUSDates(dob, gestAge, remainingGestAgeDays));
  calculatedTexts.push(calculateTreatmentDate(dob, gestAge, remainingGestAgeDays, 36, "ECHO @36w if on resp supp:"));
  calculatedTexts.push(printText("PNS:mod/sev BPD risk>60% at 14,21,28d"));
  calculatedTexts.push(addDaysToDOB(dob, 14, "(14 days)"));
  calculatedTexts.push(addDaysToDOB(dob, 21, "(21 days)"));
  calculatedTexts.push(addDaysToDOB(dob, 28, "(28 days)"));
  calculatedTexts.push(calculateTreatmentDate(dob, gestAge, remainingGestAgeDays, 30, "NIPPV if under 30w+0d:"));
  calculatedTexts.push(calculateTreatmentDate(dob, gestAge, remainingGestAgeDays, 32, "caffeine til 32w+no apnea off PP:"));
  calculatedTexts.push(addDaysToDOB(dob, 28, "Synagis if  O2 at least 28d after  birth"));
  calculatedTexts.push(printText("NEST f/u Tier 2"));

} else if (weight > 1500 && weight <= 1800 && totalGestAgeDays > 202 && totalGestAgeDays <= 216) {
  calculatedTexts.push(calculateTreatmentDate(dob, gestAge, remainingGestAgeDays, 35, "DEBM stop at 35w:"));
  calculatedTexts.push(printText("HMF/PTF until 3.5kg then D/C feeds"));
  calculatedTexts.push(calculateTreatmentDate(dob, gestAge, remainingGestAgeDays, 35, "Probiotics stop at 35w:"));
  calculatedTexts.push(addDaysToDOB(dob, 14, "VitD/Fe at full feed and ≥14dol:"));
  calculatedTexts.push(printText("Vit K 1mg IM"));
  calculatedTexts.push(calculatePostMenstrualExamDate(dob, gestAge, remainingGestAgeDays));
  calculatedTexts.push(...calculateHUSDates(dob, gestAge, remainingGestAgeDays));
  calculatedTexts.push(calculateTreatmentDate(dob, gestAge, remainingGestAgeDays, 36, "ECHO @36w if on resp supp:"));
  calculatedTexts.push(printText("PNS:mod/sev BPD risk>60% at 14,21,28d"));
  calculatedTexts.push(addDaysToDOB(dob, 14, "(14 days)"));
  calculatedTexts.push(addDaysToDOB(dob, 21, "(21 days)"));
  calculatedTexts.push(addDaysToDOB(dob, 28, "(28 days)"));
  calculatedTexts.push(calculateTreatmentDate(dob, gestAge, remainingGestAgeDays, 30, "NIPPV if under 30w+0d:"));
  calculatedTexts.push(calculateTreatmentDate(dob, gestAge, remainingGestAgeDays, 32, "caffeine til 32w+no apnea off PP:"));
  calculatedTexts.push(addDaysToDOB(dob, 28, "Synagis if  O2 at least 28d after  birth"));
  calculatedTexts.push(printText("NEST f/u Tier 2"));

} else if (weight > 1800 && weight <= 2000 && totalGestAgeDays > 202 && totalGestAgeDays <= 216) {
  calculatedTexts.push(calculateTreatmentDate(dob, gestAge, remainingGestAgeDays, 35, "DEBM stop at 35w:"));
  calculatedTexts.push(printText("HMF/PTF until 3.5kg then D/C feeds"));
  calculatedTexts.push(calculateTreatmentDate(dob, gestAge, remainingGestAgeDays, 35, "Probiotics stop at 35w:"));
  calculatedTexts.push(addDaysToDOB(dob, 14, "VitD/Fe at full feed and ≥14dol:"));
  calculatedTexts.push(printText("Vit K 1mg IM"));
  calculatedTexts.push(calculatePostMenstrualExamDate(dob, gestAge, remainingGestAgeDays));
  calculatedTexts.push(...calculateHUSDates(dob, gestAge, remainingGestAgeDays));
  calculatedTexts.push(calculateTreatmentDate(dob, gestAge, remainingGestAgeDays, 36, "ECHO @36w if on resp supp:"));
  calculatedTexts.push(printText("PNS:mod/sev BPD risk>60% at 14,21,28d"));
  calculatedTexts.push(addDaysToDOB(dob, 14, "(14 days)"));
  calculatedTexts.push(addDaysToDOB(dob, 21, "(21 days)"));
  calculatedTexts.push(addDaysToDOB(dob, 28, "(28 days)"));
  calculatedTexts.push(calculateTreatmentDate(dob, gestAge, remainingGestAgeDays, 30, "NIPPV if under 30w+0d:"));
  calculatedTexts.push(calculateTreatmentDate(dob, gestAge, remainingGestAgeDays, 32, "caffeine til 32w+no apnea off PP:"));
  calculatedTexts.push(addDaysToDOB(dob, 28, "Synagis if  O2 at least 28d after  birth"));
  calculatedTexts.push(printText("NEST f/u Tier 2"));

} else if (weight > 2000 && weight <= 2200 && totalGestAgeDays > 202 && totalGestAgeDays <= 216) {
  calculatedTexts.push(calculateTreatmentDate(dob, gestAge, remainingGestAgeDays, 35, "DEBM stop at 35w:"));
  calculatedTexts.push(printText("HMF/PTF until 3.5kg then D/C feeds"));
  calculatedTexts.push(calculateTreatmentDate(dob, gestAge, remainingGestAgeDays, 35, "Probiotics stop at 35w:"));
  calculatedTexts.push(addDaysToDOB(dob, 14, "VitD/Fe at full feed and ≥14dol:"));
  calculatedTexts.push(printText("Vit K 1mg IM"));
  calculatedTexts.push(calculatePostMenstrualExamDate(dob, gestAge, remainingGestAgeDays));
  calculatedTexts.push(...calculateHUSDates(dob, gestAge, remainingGestAgeDays));
  calculatedTexts.push(calculateTreatmentDate(dob, gestAge, remainingGestAgeDays, 36, "ECHO @36w if on resp supp:"));
  calculatedTexts.push(printText("PNS:mod/sev BPD risk>60% at 14,21,28d"));
  calculatedTexts.push(addDaysToDOB(dob, 14, "(14 days)"));
  calculatedTexts.push(addDaysToDOB(dob, 21, "(21 days)"));
  calculatedTexts.push(addDaysToDOB(dob, 28, "(28 days)"));
  calculatedTexts.push(calculateTreatmentDate(dob, gestAge, remainingGestAgeDays, 30, "NIPPV if under 30w+0d:"));
  calculatedTexts.push(calculateTreatmentDate(dob, gestAge, remainingGestAgeDays, 32, "caffeine til 32w+no apnea off PP:"));
  calculatedTexts.push(addDaysToDOB(dob, 28, "Synagis if  O2 at least 28d after  birth"));
  calculatedTexts.push(printText("NEST f/u Tier 2"));

  // END OF ROW 3

} else if (weight > 0 && weight <= 1250 && totalGestAgeDays > 216 && totalGestAgeDays <= 223) {
  calculatedTexts.push(calculateTreatmentDate(dob, gestAge, remainingGestAgeDays, 35, "DEBM stop at 1500g+35w:"));
  calculatedTexts.push(calculateTreatmentDate(dob, gestAge, remainingGestAgeDays, 33, "Prolacta stop at 1500g+33w:"));
  calculatedTexts.push(calculateTreatmentDate(dob, gestAge, remainingGestAgeDays, 35, "Probiotics stop at 1500g+35w:"));
  calculatedTexts.push(addDaysToDOB(dob, 14, "MVI/Fe at full feed and ≥14dol:"));
  calculatedTexts.push(printText("Vit K 0.3-0.5mg/kg IM"));
  calculatedTexts.push(calculatePostMenstrualExamDate(dob, gestAge, remainingGestAgeDays));
  calculatedTexts.push(calculateTreatmentDate(dob, gestAge, remainingGestAgeDays, 36, "ECHO @36w if on resp supp:"));
  calculatedTexts.push(calculateTreatmentDate(dob, gestAge, remainingGestAgeDays, 32, "caffeine til 32w+no apnea off PP:"));
  calculatedTexts.push(addDaysToDOB(dob, 28, "Synagis if  O2 at least 28d after  birth"));
  calculatedTexts.push(printText("NEST f/u Tier 2"));

} else if (weight > 1250 && weight <= 1500 && totalGestAgeDays > 216 && totalGestAgeDays <= 223) {
  calculatedTexts.push(calculateTreatmentDate(dob, gestAge, remainingGestAgeDays, 35, "DEBM stop at 1500g+35w:"));
  calculatedTexts.push(printText("HMF/PTF until 3.5kg then D/C feeds"));
  calculatedTexts.push(calculateTreatmentDate(dob, gestAge, remainingGestAgeDays, 35, "Probiotics stop at 1500g+35w:"));
  calculatedTexts.push(addDaysToDOB(dob, 14, "VitD/Fe at full feed and ≥14dol"));
  calculatedTexts.push(printText("Vit K 0.3-0.5mg/kg IM, 1mg if 1500g"));
  calculatedTexts.push(calculatePostMenstrualExamDate(dob, gestAge, remainingGestAgeDays));
  calculatedTexts.push(calculateTreatmentDate(dob, gestAge, remainingGestAgeDays, 36, "ECHO @36w if on resp supp:"));
  calculatedTexts.push(calculateTreatmentDate(dob, gestAge, remainingGestAgeDays, 32, "caffeine til 32w+no apnea off PP:"));
  calculatedTexts.push(addDaysToDOB(dob, 28, "Synagis if  O2 at least 28d after  birth"));
  calculatedTexts.push(printText("NEST f/u Tier 2"));

} else if (weight > 1500 && weight <= 1800 && totalGestAgeDays > 216 && totalGestAgeDays <= 223) {
  calculatedTexts.push(calculateTreatmentDate(dob, gestAge, remainingGestAgeDays, 35, "DEBM stop at 35w:"));
  calculatedTexts.push(printText("HMF/PTF until 3.5kg then D/C feeds"));
  calculatedTexts.push(calculateTreatmentDate(dob, gestAge, remainingGestAgeDays, 35, "Probiotics stop at 35w:"));
  calculatedTexts.push(addDaysToDOB(dob, 14, "VitD/Fe at full feed and ≥14dol"));
  calculatedTexts.push(printText("Vit K 1mg IM"));
  calculatedTexts.push(printText("ROP EXAM ONLY NESSESSARY IF UNSTABLE"));
  calculatedTexts.push(calculatePostMenstrualExamDate(dob, gestAge, remainingGestAgeDays));
  calculatedTexts.push(calculateTreatmentDate(dob, gestAge, remainingGestAgeDays, 36, "ECHO @36w if on resp supp:"));
  calculatedTexts.push(addDaysToDOB(dob, 28, "Synagis if  O2 at least 28d after  birth"));
  calculatedTexts.push(printText("NEST f/u Tier 2"));

} else if (weight > 1800 && weight <= 2000 && totalGestAgeDays > 216 && totalGestAgeDays <= 223) {
  calculatedTexts.push(calculateTreatmentDate(dob, gestAge, remainingGestAgeDays, 35, "DEBM stop at 35w:"));
  calculatedTexts.push(printText("HMF/PTF until 3.5kg then D/C feeds"));
  calculatedTexts.push(calculateTreatmentDate(dob, gestAge, remainingGestAgeDays, 35, "Probiotics stop at 35w:"));
  calculatedTexts.push(addDaysToDOB(dob, 14, "VitD/Fe at full feed and ≥14dol"));
  calculatedTexts.push(printText("Vit K 1mg IM"));
  calculatedTexts.push(printText("ROP EXAM ONLY NESSESSARY IF UNSTABLE"));
  calculatedTexts.push(calculatePostMenstrualExamDate(dob, gestAge, remainingGestAgeDays));
  calculatedTexts.push(calculateTreatmentDate(dob, gestAge, remainingGestAgeDays, 36, "ECHO @36w if on resp supp:"));
  calculatedTexts.push(addDaysToDOB(dob, 28, "Synagis if  O2 at least 28d after  birth"));
  calculatedTexts.push(printText("NEST f/u Tier 2"));

} else if (weight > 2000 && weight <= 2200 && totalGestAgeDays > 216 && totalGestAgeDays <= 223) {
  calculatedTexts.push(calculateTreatmentDate(dob, gestAge, remainingGestAgeDays, 35, "DEBM stop at 35w:"));
  calculatedTexts.push(printText("HMF/PTF until 3.5kg then D/C feeds"));
  calculatedTexts.push(calculateTreatmentDate(dob, gestAge, remainingGestAgeDays, 35, "Probiotics stop at 35w:"));
  calculatedTexts.push(addDaysToDOB(dob, 14, "VitD/Fe at full feed and ≥14dol"));
  calculatedTexts.push(printText("Vit K 1mg IM"));
  calculatedTexts.push(printText("ROP EXAM ONLY NESSESSARY IF UNSTABLE"));
  calculatedTexts.push(calculatePostMenstrualExamDate(dob, gestAge, remainingGestAgeDays));
  calculatedTexts.push(calculateTreatmentDate(dob, gestAge, remainingGestAgeDays, 36, "ECHO @36w if on resp supp:"));
  calculatedTexts.push(addDaysToDOB(dob, 28, "Synagis if  O2 at least 28d after  birth"));
  calculatedTexts.push(printText("NEST f/u Tier 2"));

  // END OF ROW 4

} else if (weight > 0 && weight <= 1250 && totalGestAgeDays > 223 && totalGestAgeDays <= 230) {
  calculatedTexts.push(calculateTreatmentDate(dob, gestAge, remainingGestAgeDays, 35, "DEBM stop at 1500g+35w:"));
  calculatedTexts.push(calculateTreatmentDate(dob, gestAge, remainingGestAgeDays, 33, "Prolacta stop at 1500g+33w:"));
  calculatedTexts.push(calculateTreatmentDate(dob, gestAge, remainingGestAgeDays, 35, "Probiotics stop at 1500g+35w:"));
  calculatedTexts.push(addDaysToDOB(dob, 14, "MVI/Fe at full feed and ≥14dol:"));
  calculatedTexts.push(printText("Vit K 0.3-0.5mg/kg IM"));
  calculatedTexts.push(calculatePostMenstrualExamDate(dob, gestAge, remainingGestAgeDays));
  calculatedTexts.push(calculateTreatmentDate(dob, gestAge, remainingGestAgeDays, 36, "ECHO @36w ONLY IF 32+0w & on resp supp:"));
  calculatedTexts.push(printText("caffeine til apnea free off PP"));
  calculatedTexts.push(printText("NEST f/u Tier 2"));

} else if (weight > 1250 && weight <= 1500 && totalGestAgeDays > 223 && totalGestAgeDays <= 230) {
  calculatedTexts.push(calculateTreatmentDate(dob, gestAge, remainingGestAgeDays, 35, "DEBM stop at 1500g+35w:"));
  calculatedTexts.push(printText("HMF/PTF until 3.5kg then D/C feeds"));
  calculatedTexts.push(calculateTreatmentDate(dob, gestAge, remainingGestAgeDays, 35, "Probiotics stop at 1500g+35w:"));
  calculatedTexts.push(addDaysToDOB(dob, 14, "VitD/Fe at full feed and ≥14dol:"));
  calculatedTexts.push(printText("Vit K 0.3-0.5mg/kg IM, 1mg if 1500g"));
  calculatedTexts.push(calculatePostMenstrualExamDate(dob, gestAge, remainingGestAgeDays));
  calculatedTexts.push(calculateTreatmentDate(dob, gestAge, remainingGestAgeDays, 36, "ECHO @36w ONLY IF 32+0w & on resp supp:"));
  calculatedTexts.push(printText("caffeine til apnea free off PP"));
  calculatedTexts.push(printText("NEST f/u Tier 2"));

} else if (weight > 1500 && weight <= 1800 && totalGestAgeDays > 223 && totalGestAgeDays <= 230) {
  calculatedTexts.push(calculateTreatmentDate(dob, gestAge, remainingGestAgeDays, 35, "DEBM stop at 35w:"));
  calculatedTexts.push(printText("HMF/PTF until 3.5kg then D/C feeds"));
  calculatedTexts.push(addDaysToDOB(dob, 14, "VitD/Fe at full feed and ≥14dol:"));
  calculatedTexts.push(printText("Vit K 1mg IM"));
  calculatedTexts.push(printText("ROP EXAM ONLY NESSESSARY IF UNSTABLE"));
  calculatedTexts.push(calculatePostMenstrualExamDate(dob, gestAge, remainingGestAgeDays));
  calculatedTexts.push(calculateTreatmentDate(dob, gestAge, remainingGestAgeDays, 36, "ECHO @36w ONLY IF 32+0w & on resp supp:"));
  calculatedTexts.push(printText("NEST f/u Tier 2"));

} else if (weight > 1800 && weight <= 2000 && totalGestAgeDays > 223 && totalGestAgeDays <= 230) {
  calculatedTexts.push(calculateTreatmentDate(dob, gestAge, remainingGestAgeDays, 35, "DEBM stop at 35w:"));
  calculatedTexts.push(printText("HMF/PTF until 3.5kg then D/C feeds"));
  calculatedTexts.push(addDaysToDOB(dob, 14, "VitD/Fe at full feed and ≥14dol:"));
  calculatedTexts.push(printText("Vit K 1mg IM"));
  calculatedTexts.push(printText("ROP EXAM ONLY NESSESSARY IF UNSTABLE"));
  calculatedTexts.push(calculatePostMenstrualExamDate(dob, gestAge, remainingGestAgeDays));
  calculatedTexts.push(calculateTreatmentDate(dob, gestAge, remainingGestAgeDays, 36, "ECHO @36w ONLY IF 32+0w & on resp supp:"));
  calculatedTexts.push(printText("NEST f/u Tier 2"));

} else if (weight > 2000 && weight <= 2200 && totalGestAgeDays > 223 && totalGestAgeDays <= 230) {
  calculatedTexts.push(calculateTreatmentDate(dob, gestAge, remainingGestAgeDays, 35, "DEBM stop at 35w:"));
  calculatedTexts.push(printText("HMF/PTF until 3.5kg then D/C feeds"));
  calculatedTexts.push(addDaysToDOB(dob, 14, "VitD/Fe at full feed and ≥14dol:"));
  calculatedTexts.push(printText("Vit K 1mg IM"));
  calculatedTexts.push(printText("ROP EXAM ONLY NESSESSARY IF UNSTABLE"));
  calculatedTexts.push(calculatePostMenstrualExamDate(dob, gestAge, remainingGestAgeDays));
  calculatedTexts.push(calculateTreatmentDate(dob, gestAge, remainingGestAgeDays, 36, "ECHO @36w ONLY IF 32+0w & on resp supp:"));
  calculatedTexts.push(printText("NEST f/u Tier 2"));

  // END OF ROW 5

} else if (weight > 0 && weight <= 1250 && totalGestAgeDays > 230) {
  calculatedTexts.push(calculateTreatmentDate(dob, gestAge, remainingGestAgeDays, 35, "<35w:DEBM stop at 1500g+35w:"));
  calculatedTexts.push(printText(">=35+0w:DEBM stop at 1500g"));
  calculatedTexts.push(printText("Prolacta stop at 1500g"));
  calculatedTexts.push(calculateTreatmentDate(dob, gestAge, remainingGestAgeDays, 35, "<35w: Probiotics stop at 1500g+35w:"));
  calculatedTexts.push(printText(">35+0w: Probiotics stop at 1500g"));
  calculatedTexts.push(addDaysToDOB(dob, 14, "MVI/Fe at full feed and ≥14dol:"));
  calculatedTexts.push(printText("Vit K 0.3-0.5mg/kg IM"));
  calculatedTexts.push(calculatePostMenstrualExamDate(dob, gestAge, remainingGestAgeDays));
  calculatedTexts.push(printText("caffeine til apnea free off PP"));
  calculatedTexts.push(printText("NEST f/u Tier 2"));

} else if (weight > 1250 && weight <= 1500 && totalGestAgeDays > 230) {
  calculatedTexts.push(calculateTreatmentDate(dob, gestAge, remainingGestAgeDays, 35, "<35w:DEBM stop at 1500g+35w:"));
  calculatedTexts.push(printText(">=35+0w:DEBM stop at 1500g"));
  calculatedTexts.push(printText("HMF/PTF until 3.5kg then D/C feeds"));
  calculatedTexts.push(calculateTreatmentDate(dob, gestAge, remainingGestAgeDays, 35, "<35w: Probiotics stop at 1500g+35w:"));
  calculatedTexts.push(printText(">35+0w: Probiotics stop at 1500g"));
  calculatedTexts.push(addDaysToDOB(dob, 14, "VitD/Fe at full feed and ≥14dol:"));
  calculatedTexts.push(printText("Vit K 0.3-0.5mg/kg IM, 1mg if 1500g"));
  calculatedTexts.push(calculatePostMenstrualExamDate(dob, gestAge, remainingGestAgeDays));
  calculatedTexts.push(printText("caffeine til apnea free off PP"));
  calculatedTexts.push(printText("NEST f/u Tier 2"));

} else if (weight > 1500 && weight <= 1800 && totalGestAgeDays > 230) {
  calculatedTexts.push(calculateTreatmentDate(dob, gestAge, remainingGestAgeDays, 35, "<35w:DEBM stop at 1500g or max 7d:"));
  calculatedTexts.push(printText(">=35+0w:DEBM stop after max 7d"));
  calculatedTexts.push(printText("HMF/PTF until 3.5kg then D/C feeds"));
  calculatedTexts.push(addDaysToDOB(dob, 14, "VitD/Fe at full feed and ≥14dol:"));
  calculatedTexts.push(printText("Vit K 1mg IM"));
  calculatedTexts.push(printText("ROP EXAM ONLY NESSESSARY IF UNSTABLE"));
  calculatedTexts.push(calculatePostMenstrualExamDate(dob, gestAge, remainingGestAgeDays));
  calculatedTexts.push(printText("ECI  (Nest if meet criteria)"));

} else if (weight > 1800 && weight <= 2000 && totalGestAgeDays > 230) {
  calculatedTexts.push(calculateTreatmentDate(dob, gestAge, remainingGestAgeDays, 35, "<35w:DEBM stop at 1500g or max 7d:"));
  calculatedTexts.push(printText(">=35+0w:DEBM stop after max 7d"));
  calculatedTexts.push(printText("HMF/PTF until 3.5kg then D/C feeds"));
  calculatedTexts.push(addDaysToDOB(dob, 14, "VitD/Fe at full feed and ≥14dol:"));
  calculatedTexts.push(printText("Vit K 1mg IM"));
  calculatedTexts.push(printText("ROP EXAM ONLY NESSESSARY IF UNSTABLE"));
  calculatedTexts.push(calculatePostMenstrualExamDate(dob, gestAge, remainingGestAgeDays));
  calculatedTexts.push(printText("ECI if SGA, (ECI/Nest if meet criteria)"));

} else if (weight > 2000 && weight <= 2200 && totalGestAgeDays > 230) {
  calculatedTexts.push(calculateTreatmentDate(dob, gestAge, remainingGestAgeDays, 35, "<35w:DEBM stop at 1500g or max 7d:"));
  calculatedTexts.push(printText(">=35+0w:DEBM stop after max 7d"));
  calculatedTexts.push(printText("HMF/PTF until 3.5kg then D/C feeds"));
  calculatedTexts.push(addDaysToDOB(dob, 14, "VitD/Fe at full feed and ≥14dol:"));
  calculatedTexts.push(printText("Vit K 1mg IM"));
  calculatedTexts.push(printText("ECI if SGA, (ECI/Nest if meet criteria)"));

} else if (weight > 2200 || weight < 0) {
  calculatedTexts.push(printText("Invalid weight, please enter a birthweight between 0 and 2200"));

} else if (totalGestAgeDays < 0) {
  calculatedTexts.push(printText("Invalid Age, please enter an age greater than 0"));

      } else {
        alert("Invalid weight or gestational age.");
        return; // return early to prevent the remaining code from executing
      }
  
      // Join all calculated texts into a single string separated by '<br />' and set the treatment text
      setTreatmentText(calculatedTexts.join('<br />'));
    } else {
      alert("Please fill out all the fields.");
    }
  };
  
  

  return (
    <div>
      <h2>NICUCARECALCULATOR</h2>
      <form>
      <div>
    <label>Birth Gestational Age:</label>
    <br/>
    <input type="number" onChange={(e) => setGestAge(e.target.value)} />w
    <input type="number" onChange={(e) => setRemainingGestAgeDays(e.target.value)} />d
</div>
        <div>
          <label>DOB: </label>
          <input type="date" onChange={(e) => setDob(e.target.value)} />
        </div>
  
        <div>
          <label>Birth weight: </label>
          <input type="number" onChange={(e) => setWeight(e.target.value)} /> g
        </div>
  
        <button type="button" onClick={submitData}>Submit</button>
      </form>
      <p dangerouslySetInnerHTML={{ __html: treatmentText }}></p>
    </div>
  );

}

export default NeoTool;
