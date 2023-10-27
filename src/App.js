import React, { useState } from 'react';
import './NeoTool.css'; // make sure to import the CSS file


function NeoTool() {
  const [treatmentText, setTreatmentText] = useState('');
  const [gestAge, setGestAge] = useState();
  const [remainingGestAgeDays, setRemainingGestAgeDays] = useState();
  const [dob, setDob] = useState();
  const [weight, setWeight] = useState();
  const [showTreatment, setShowTreatment] = useState(false);

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
  
    // Get the current date without time for comparison
    let currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
  
    // Convert dobDate to a local date (without time) for comparison
    let localTreatmentDate = new Date(dobDate.getUTCFullYear(), dobDate.getUTCMonth(), dobDate.getUTCDate());
  
    // Determine the CSS class for the date text
    let cssClass = '';
    if (localTreatmentDate < currentDate) {
      cssClass = 'past-date';
    } else if (localTreatmentDate.getTime() === currentDate.getTime()) {
      cssClass = 'current-date';
    }
  
    // Return the date wrapped in HTML with the relevant CSS class.
    return `<span class="${cssClass}">${prefixText} ${treatmentDateFormatted}</span>`;
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
    } else if (gestAge >= 33 && gestAge < 34) {
      postMenstrualAge = 37;
    } else if (gestAge >= 34 && gestAge < 35) {
      postMenstrualAge = 38;
    } else if (gestAge >= 35 && gestAge < 36) {
      postMenstrualAge = 39;
    } else if (gestAge >= 36 && gestAge < 37) {
      postMenstrualAge = 40;
    } else if (gestAge >= 37 && gestAge < 38) {
      postMenstrualAge = 41;
    } else if (gestAge >= 38 && gestAge < 39) {
      postMenstrualAge = 42;
    } else if (gestAge >= 39 && gestAge < 40) {
      postMenstrualAge = 43;
    } else if (gestAge >= 40 && gestAge < 41) {
      postMenstrualAge = 44;
    } else if (gestAge >= 41 && gestAge < 42) {
      postMenstrualAge = 45;
    } else if (gestAge >= 42 && gestAge < 43) {
      postMenstrualAge = 46;
    } else if (gestAge >= 43 && gestAge < 44) {
      postMenstrualAge = 47;
    } else if (gestAge >= 44 && gestAge < 45) {
      postMenstrualAge = 48;
    } else if (gestAge >= 45 && gestAge < 46) {
      postMenstrualAge = 49;
    } else if (gestAge >= 46 && gestAge < 47) {
      postMenstrualAge = 50;
    } else {
      postMenstrualAge = 50;
    }
  
    let totalGestAgeInDays = gestAge * 7 + parseInt(remainingGestAgeDays);
    let totalPostMenstrualAgeInDays = postMenstrualAge * 7;
  
    let dobDate = new Date(dob);
dobDate.setUTCDate(dobDate.getUTCDate() + totalPostMenstrualAgeInDays - totalGestAgeInDays);

let examDate = new Date(dobDate.getUTCFullYear(), dobDate.getUTCMonth(), dobDate.getUTCDate());

    // Format date as MM-DD-YYYY
    let examDateFormatted = (dobDate.getUTCMonth() + 1).toString().padStart(2, '0') + '-'
                            + dobDate.getUTCDate().toString().padStart(2, '0') + '-'
                            + dobDate.getUTCFullYear();
  
    // Check if the date is today or in the past
    let today = new Date();
    today.setHours(0, 0, 0, 0);
  
    let color;
    if (examDate < today) {
      color = 'red';
    } else if (examDate.getTime() === today.getTime()) {
      color = 'green';
    } else {
      color = 'black';
    }
    
  
    return `<span style="color: ${color};"><b>ROP</b> First Exam Due near week of: ${examDateFormatted}</span>`;
  };
  

  
  const calculateHUSDates = (dob, gestAge, remainingGestAgeDays) => {
    let dobDate = new Date(dob);
    let husDates = [];

    // Get the current date without time for comparison
    let currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);

    // Helper function to format dates and apply CSS classes
    const formatAndApplyCssClass = (date, prefixText) => {
        let formattedDate = (date.getUTCMonth() + 1).toString().padStart(2, '0') + '-'
                            + date.getUTCDate().toString().padStart(2, '0') + '-'
                            + date.getUTCFullYear();

        // Convert date to a local date (without time) for comparison
        let localDate = new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate());

        // Determine the CSS class for the date text
        let cssClass = '';
        if (localDate < currentDate) {
            cssClass = 'past-date';
        } else if (localDate.getTime() === currentDate.getTime()) {
            cssClass = 'current-date';
        }

        // Return the date wrapped in HTML with the relevant CSS class.
        return `<span class="${cssClass}">${prefixText} ${formattedDate}</span>`;
    }

    // First HUS date after 7 days
    let firstHusDate = new Date(dobDate);
    firstHusDate.setUTCDate(dobDate.getUTCDate() + 7);
    husDates.push(formatAndApplyCssClass(firstHusDate, '&nbsp;&nbsp;First HUS date @ 7 days:'));

    // Second HUS date after 28 days
    let secondHusDate = new Date(dobDate);
    secondHusDate.setUTCDate(dobDate.getUTCDate() + 28);
    husDates.push(formatAndApplyCssClass(secondHusDate, '&nbsp;&nbsp;Second HUS date @ 28 days:'));

    // Third HUS date after 40 weeks
    let totalGestAgeInDays = gestAge * 7 + parseInt(remainingGestAgeDays);
    let thirdHusDate = new Date(dobDate);
    thirdHusDate.setUTCDate(dobDate.getUTCDate() - totalGestAgeInDays + 40 * 7);
    husDates.push(formatAndApplyCssClass(thirdHusDate, '&nbsp;&nbsp;Third HUS date @ 40 weeks:'));

    // Add a prefix to the array for the bold "HUS"
    husDates.unshift('<b>HUS:</b>');

    return husDates;
};

  
  

  
const addDaysToDOB = (dob, daysToAdd, prefixText) => {
  let dobDate = new Date(dob);

  // Add the desired number of days
  dobDate.setUTCDate(dobDate.getUTCDate() + daysToAdd);

  // Current date to compare
  let today = new Date();
  today.setHours(0, 0, 0, 0);

  // Format date as MM-DD-YYYY
  let newDateFormatted = (dobDate.getUTCMonth() + 1).toString().padStart(2, '0') + '-' 
                       + dobDate.getUTCDate().toString().padStart(2, '0') + '-' 
                       + dobDate.getUTCFullYear();

  // Create a new date for comparison
  let compareDate = new Date(dobDate.getUTCFullYear(), dobDate.getUTCMonth(), dobDate.getUTCDate());

  // Determine color
  let color;
  if (compareDate < today) {
    color = 'red';
  } else if (compareDate.getTime() === today.getTime()) {
    color = 'green';
  } else {
    color = 'black';
  }

  // Wrapping both prefix text and date in a span and applying the color styling to it
  return `<span style="color: ${color};">${prefixText} ${newDateFormatted}</span>`;
};


const printText = (text) => {
    return text;
};



  const submitData = () => {
    if (gestAge && remainingGestAgeDays && dob && weight) {
      let totalGestAgeDays = gestAge * 7 + parseInt(remainingGestAgeDays);
      let calculatedTexts = []; // This array will store all calculated texts

      if (weight > 0 && weight <= 1250 && ((totalGestAgeDays > 0 && totalGestAgeDays <= 153) || (totalGestAgeDays > 167 && totalGestAgeDays <= 195))) {
        calculatedTexts.push(calculateTreatmentDate(dob, gestAge, remainingGestAgeDays, 35, "<b>DEBM</b> stop at 1500g+35w:"));
        calculatedTexts.push(calculateTreatmentDate(dob, gestAge, remainingGestAgeDays, 33, "<b>Prolacta</b> stop at 1500g+33w:"));
        calculatedTexts.push(addDaysToDOB(dob, 14, "<b>MVI/Fe</b> at full feed and ≥14dol:"));
        calculatedTexts.push(printText("<b>Vit K</b> 0.3-0.5mg/kg IM"));
        calculatedTexts.push(calculatePostMenstrualExamDate(dob, gestAge, remainingGestAgeDays));
        calculatedTexts.push(...calculateHUSDates(dob, gestAge, remainingGestAgeDays));
        calculatedTexts.push(printText("<b>ECHO:</b>"));
        calculatedTexts.push(calculateTreatmentDate(dob, gestAge, remainingGestAgeDays, 32, "&nbsp;&nbsp;&nbsp;@32w if vent or SGA:"));
        calculatedTexts.push(calculateTreatmentDate(dob, gestAge, remainingGestAgeDays, 36, "&nbsp;&nbsp;&nbsp;@36w if on resp supp:"));
        calculatedTexts.push(printText("<b>PNS</b>:mod/sev BPD risk>60% at 14,21,28d"));
        calculatedTexts.push(addDaysToDOB(dob, 14, "&nbsp;&nbsp;&nbsp;(14 days)"));
        calculatedTexts.push(addDaysToDOB(dob, 21, "&nbsp;&nbsp;&nbsp;(21 days)"));
        calculatedTexts.push(addDaysToDOB(dob, 28, "&nbsp;&nbsp;&nbsp;(28 days)"));
        calculatedTexts.push(printText("<b>NIPPV</b>"));
        calculatedTexts.push(calculateTreatmentDate(dob, gestAge, remainingGestAgeDays, 32, "<b>Caffeine</b> til 32w+no apnea off PP:"));
        calculatedTexts.push(printText("<b>Synagis</b> "));
        calculatedTexts.push(printText("<b>NEST</b> f/u Tier 1b"));
        calculatedTexts.push(addDaysToDOB(dob, 30, "<b>Hep B Vac</b> @30 days"));

//INSERTING 22 TO 23 WEEKER PROTOCALL

      } else if (weight > 0 && weight <= 1250 && totalGestAgeDays > 153 && totalGestAgeDays <= 167) {
        calculatedTexts.push(calculateTreatmentDate(dob, gestAge, remainingGestAgeDays, 35, "<b>DEBM</b> stop at 1500g+35w:"));
        calculatedTexts.push(calculateTreatmentDate(dob, gestAge, remainingGestAgeDays, 33, "<b>Prolacta</b> stop at 1500g+33w:"));
        calculatedTexts.push(addDaysToDOB(dob, 14, "<b>VitD/Fe</b> at full feed and ≥14dol:"));
        calculatedTexts.push(printText("<b>Vit K</b> 0.3mg IV q72h x4 doses"));
        calculatedTexts.push(addDaysToDOB(dob, 14, "&nbsp;&nbsp;&nbsp;0.5mg IM @ 14 DOL"));
        calculatedTexts.push(calculatePostMenstrualExamDate(dob, gestAge, remainingGestAgeDays));
        calculatedTexts.push(...calculateHUSDates(dob, gestAge, remainingGestAgeDays));
        calculatedTexts.push(printText("<b>ECHO:</b>"));
        calculatedTexts.push(calculateTreatmentDate(dob, gestAge, remainingGestAgeDays, 32, "&nbsp;&nbsp;&nbsp;@32w if vent or SGA:"));
        calculatedTexts.push(calculateTreatmentDate(dob, gestAge, remainingGestAgeDays, 36, "&nbsp;&nbsp;&nbsp;@36w if on resp supp:"));
        calculatedTexts.push(printText("<b>PNS:</b>mod/sev BPD risk>60% at 14,21,28d"));
        calculatedTexts.push(addDaysToDOB(dob, 14, "&nbsp;&nbsp;&nbsp;(14 days)"));
        calculatedTexts.push(addDaysToDOB(dob, 21, "&nbsp;&nbsp;&nbsp;(21 days)"));
        calculatedTexts.push(addDaysToDOB(dob, 28, "&nbsp;&nbsp;&nbsp;(28 days)"));
        calculatedTexts.push(printText("<b>NIPPV</b>"));
        calculatedTexts.push(calculateTreatmentDate(dob, gestAge, remainingGestAgeDays, 32, "<b>Caffeine</b> til 32w+no apnea off PP:"));
        calculatedTexts.push(printText("<b>Synagis</b>"));
        calculatedTexts.push(printText("<b>NEST</b> f/u Tier 1b"));
        calculatedTexts.push(addDaysToDOB(dob, 30, "<b>Hep B Vac</b> @30 days"));

      } else if (weight > 1250 && weight <= 1500 && totalGestAgeDays > 153 && totalGestAgeDays <= 167) {
        calculatedTexts.push(calculateTreatmentDate(dob, gestAge, remainingGestAgeDays, 35, "<b>DEBM</b> stop at 1500g+35w:"));
        calculatedTexts.push(printText("<b>HMF/PTF</b> until 3.5kg then D/C feeds"));
        calculatedTexts.push(addDaysToDOB(dob, 14, "<b>VitD/Fe</b> at full feed and ≥14dol:"));
        calculatedTexts.push(printText("<b>Vit K</b> 0.3-0.5mg/kg IM, 1mg if 1500g"));
        calculatedTexts.push(calculatePostMenstrualExamDate(dob, gestAge, remainingGestAgeDays));
        calculatedTexts.push(...calculateHUSDates(dob, gestAge, remainingGestAgeDays));
        calculatedTexts.push(printText("<b>ECHO:</b>"));
        calculatedTexts.push(calculateTreatmentDate(dob, gestAge, remainingGestAgeDays, 32, "&nbsp;&nbsp;&nbsp;@32w if vent or SGA:"));
        calculatedTexts.push(calculateTreatmentDate(dob, gestAge, remainingGestAgeDays, 36, "&nbsp;&nbsp;&nbsp;@36w if on resp supp:"));
        calculatedTexts.push(printText("<b>PNS:</b>mod/sev BPD risk>60% at 14,21,28d"));
        calculatedTexts.push(addDaysToDOB(dob, 14, "&nbsp;&nbsp;&nbsp;(14 days)"));
        calculatedTexts.push(addDaysToDOB(dob, 21, "&nbsp;&nbsp;&nbsp;(21 days)"));
        calculatedTexts.push(addDaysToDOB(dob, 28, "&nbsp;&nbsp;&nbsp;(28 days)"));
        calculatedTexts.push(printText("<b>NIPPV</b>"));
        calculatedTexts.push(calculateTreatmentDate(dob, gestAge, remainingGestAgeDays, 32, "<b>Caffeine</b> til 32w+no apnea off PP:"));
        calculatedTexts.push(printText("<b>Synagis</b>"));
        calculatedTexts.push(printText("<b>NEST</b> f/u Tier 1b"));
        calculatedTexts.push(addDaysToDOB(dob, 30, "<b>Hep B Vac</b> @30 days"));
        
      } else if (weight > 1500 && weight <= 1800 && totalGestAgeDays > 153 && totalGestAgeDays <= 167) {
        calculatedTexts.push(calculateTreatmentDate(dob, gestAge, remainingGestAgeDays, 35, "<b>DEBM</b> stop at 35w:"));
        calculatedTexts.push(printText("<b>HMF/PTF</b> until 3.5kg then D/C feeds"));
        calculatedTexts.push(addDaysToDOB(dob, 14, "<b>VitD/Fe</b> at full feed and ≥14dol:"));
        calculatedTexts.push(printText("<b>Vit K</b> 1mg IM"));
        calculatedTexts.push(calculatePostMenstrualExamDate(dob, gestAge, remainingGestAgeDays));
        calculatedTexts.push(...calculateHUSDates(dob, gestAge, remainingGestAgeDays));
        calculatedTexts.push(printText("<b>ECHO:</b>"));
        calculatedTexts.push(calculateTreatmentDate(dob, gestAge, remainingGestAgeDays, 32, "&nbsp;&nbsp;&nbsp;@32w if vent or SGA:"));
        calculatedTexts.push(calculateTreatmentDate(dob, gestAge, remainingGestAgeDays, 36, "&nbsp;&nbsp;&nbsp;@36w if on resp supp:"));
        calculatedTexts.push(printText("<b>PNS</b>:mod/sev BPD risk>60% at 14,21,28d"));
        calculatedTexts.push(addDaysToDOB(dob, 14, "&nbsp;&nbsp;&nbsp;(14 days)"));
        calculatedTexts.push(addDaysToDOB(dob, 21, "&nbsp;&nbsp;&nbsp;(21 days)"));
        calculatedTexts.push(addDaysToDOB(dob, 28, "&nbsp;&nbsp;&nbsp;(28 days)"));
        calculatedTexts.push(printText("<b>NIPPV</b>"));
        calculatedTexts.push(calculateTreatmentDate(dob, gestAge, remainingGestAgeDays, 32, "<b>Caffeine</b> til 32w+no apnea off PP:"));
        calculatedTexts.push(printText("<b>Synagis</b> "));
        calculatedTexts.push(printText("<b>NEST</b> f/u Tier 1b"));
        calculatedTexts.push(addDaysToDOB(dob, 30, "<b>Hep B Vac</b> @30 days"));
        

      } else if (weight > 1800 && weight <= 2000 && totalGestAgeDays > 153 && totalGestAgeDays <= 167) {
        calculatedTexts.push(calculateTreatmentDate(dob, gestAge, remainingGestAgeDays, 35, "<b>DEBM</b> stop at 35w:"));
        calculatedTexts.push(printText("<b>HMF/PTF</b> until 3.5kg then D/C feeds"));
        calculatedTexts.push(addDaysToDOB(dob, 14, "<b>VitD/Fe</b> at full feed and ≥14dol:"));
        calculatedTexts.push(printText("<b>Vit K</b> 1mg IM"));
        calculatedTexts.push(calculatePostMenstrualExamDate(dob, gestAge, remainingGestAgeDays));
        calculatedTexts.push(...calculateHUSDates(dob, gestAge, remainingGestAgeDays));
        calculatedTexts.push(printText("<b>ECHO:</b>"));
        calculatedTexts.push(calculateTreatmentDate(dob, gestAge, remainingGestAgeDays, 32, "&nbsp;&nbsp;&nbsp;@32w if vent or SGA:"));
        calculatedTexts.push(calculateTreatmentDate(dob, gestAge, remainingGestAgeDays, 36, "&nbsp;&nbsp;&nbsp;@36w if on resp supp:"));
        calculatedTexts.push(printText("<b>PNS</b>:mod/sev BPD risk>60% at 14,21,28d"));
        calculatedTexts.push(addDaysToDOB(dob, 14, "&nbsp;&nbsp;&nbsp;(14 days)"));
        calculatedTexts.push(addDaysToDOB(dob, 21, "&nbsp;&nbsp;&nbsp;(21 days)"));
        calculatedTexts.push(addDaysToDOB(dob, 28, "&nbsp;&nbsp;&nbsp;(28 days)"));
        calculatedTexts.push(printText("<b>NIPPV</b>"));
        calculatedTexts.push(calculateTreatmentDate(dob, gestAge, remainingGestAgeDays, 32, "<b>Caffeine</b> til 32w+no apnea off PP:"));
        calculatedTexts.push(printText("<b>Synagis</b> "));
        calculatedTexts.push(printText("<b>NEST</b> f/u Tier 1b"));
        calculatedTexts.push(addDaysToDOB(dob, 30, "<b>Hep B Vac</b> @30 days"));
        

      } else if (weight > 2000 && weight <= 9999 && totalGestAgeDays > 153 && totalGestAgeDays <= 167) {
        calculatedTexts.push(calculateTreatmentDate(dob, gestAge, remainingGestAgeDays, 35, "<b>DEBM</b> stop at 35w:"));
        calculatedTexts.push(printText("<b>HMF/PTF</b> until 3.5kg then D/C feeds"));
        calculatedTexts.push(addDaysToDOB(dob, 14, "<b>VitD/Fe</b> at full feed and ≥14dol:"));
        calculatedTexts.push(printText("<b>Vit K</b> 1mg IM"));
        calculatedTexts.push(calculatePostMenstrualExamDate(dob, gestAge, remainingGestAgeDays));
        calculatedTexts.push(...calculateHUSDates(dob, gestAge, remainingGestAgeDays));
        calculatedTexts.push(printText("<b>ECHO:</b>"));
        calculatedTexts.push(calculateTreatmentDate(dob, gestAge, remainingGestAgeDays, 32, "&nbsp;&nbsp;&nbsp;@32w if vent or SGA:"));
        calculatedTexts.push(calculateTreatmentDate(dob, gestAge, remainingGestAgeDays, 36, "&nbsp;&nbsp;&nbsp;@36w if on resp supp:"));
        calculatedTexts.push(printText("<b>PNS</b>:mod/sev BPD risk>60% at 14,21,28d"));
        calculatedTexts.push(addDaysToDOB(dob, 14, "&nbsp;&nbsp;&nbsp;(14 days)"));
        calculatedTexts.push(addDaysToDOB(dob, 21, "&nbsp;&nbsp;&nbsp;(21 days)"));
        calculatedTexts.push(addDaysToDOB(dob, 28, "&nbsp;&nbsp;&nbsp;(28 days)"));
        calculatedTexts.push(printText("<b>NIPPV</b>"));
        calculatedTexts.push(calculateTreatmentDate(dob, gestAge, remainingGestAgeDays, 32, "<b>Caffeine</b> til 32w+no apnea off PP:"));
        calculatedTexts.push(printText("<b>Synagis</b> "));
        calculatedTexts.push(printText("<b>NEST</b> f/u Tier 1b"));
        

//END OF 22 TO 23 WEEKER PROTOCALL

        
      } else if (weight > 1250 && weight <= 1500 && ((totalGestAgeDays > 0 && totalGestAgeDays <= 153) || (totalGestAgeDays > 167 && totalGestAgeDays <= 195))) {
        calculatedTexts.push(calculateTreatmentDate(dob, gestAge, remainingGestAgeDays, 35, "<b>DEBM</b> stop at 1500g+35w:"));
        calculatedTexts.push(printText("<b>HMF/PTF</b> until 3.5kg then D/C feeds"));
        calculatedTexts.push(addDaysToDOB(dob, 14, "<b>VitD/Fe</b> at full feed and ≥14dol:"));
        calculatedTexts.push(printText("<b>Vit K</b> 0.3-0.5mg/kg IM, 1mg if 1500g"));
        calculatedTexts.push(calculatePostMenstrualExamDate(dob, gestAge, remainingGestAgeDays));
        calculatedTexts.push(...calculateHUSDates(dob, gestAge, remainingGestAgeDays));
        calculatedTexts.push(printText("<b>ECHO:</b>"));
        calculatedTexts.push(calculateTreatmentDate(dob, gestAge, remainingGestAgeDays, 32, "&nbsp;&nbsp;&nbsp;@32w if vent or SGA:"));
        calculatedTexts.push(calculateTreatmentDate(dob, gestAge, remainingGestAgeDays, 36, "&nbsp;&nbsp;&nbsp;@36w if on resp supp:"));
        calculatedTexts.push(printText("<b>PNS:</b>mod/sev BPD risk>60% at 14,21,28d"));
        calculatedTexts.push(addDaysToDOB(dob, 14, "&nbsp;&nbsp;&nbsp;(14 days)"));
        calculatedTexts.push(addDaysToDOB(dob, 21, "&nbsp;&nbsp;&nbsp;(21 days)"));
        calculatedTexts.push(addDaysToDOB(dob, 28, "&nbsp;&nbsp;&nbsp;(28 days)"));
        calculatedTexts.push(printText("<b>NIPPV</b>"));
        calculatedTexts.push(calculateTreatmentDate(dob, gestAge, remainingGestAgeDays, 32, "<b>Caffeine</b> til 32w+no apnea off PP:"));
        calculatedTexts.push(printText("<b>Synagis</b>"));
        calculatedTexts.push(printText("<b>NEST</b> f/u Tier 1b"));
        calculatedTexts.push(addDaysToDOB(dob, 30, "<b>Hep B Vac</b> @30 days"));
        
      } else if (weight > 1500 && weight <= 1800 && ((totalGestAgeDays > 0 && totalGestAgeDays <= 153) || (totalGestAgeDays > 167 && totalGestAgeDays <= 195))) {
        calculatedTexts.push(calculateTreatmentDate(dob, gestAge, remainingGestAgeDays, 35, "<b>DEBM</b> stop at 35w:"));
        calculatedTexts.push(printText("<b>HMF/PTF</b> until 3.5kg then D/C feeds"));
        calculatedTexts.push(addDaysToDOB(dob, 14, "<b>VitD/Fe</b> at full feed and ≥14dol:"));
        calculatedTexts.push(printText("<b>Vit K</b> 1mg IM"));
        calculatedTexts.push(calculatePostMenstrualExamDate(dob, gestAge, remainingGestAgeDays));
        calculatedTexts.push(...calculateHUSDates(dob, gestAge, remainingGestAgeDays));
        calculatedTexts.push(printText("<b>ECHO:</b>"));
        calculatedTexts.push(calculateTreatmentDate(dob, gestAge, remainingGestAgeDays, 32, "&nbsp;&nbsp;&nbsp;@32w if vent or SGA:"));
        calculatedTexts.push(calculateTreatmentDate(dob, gestAge, remainingGestAgeDays, 36, "&nbsp;&nbsp;&nbsp;@36w if on resp supp:"));
        calculatedTexts.push(printText("<b>PNS</b>:mod/sev BPD risk>60% at 14,21,28d"));
        calculatedTexts.push(addDaysToDOB(dob, 14, "&nbsp;&nbsp;&nbsp;(14 days)"));
        calculatedTexts.push(addDaysToDOB(dob, 21, "&nbsp;&nbsp;&nbsp;(21 days)"));
        calculatedTexts.push(addDaysToDOB(dob, 28, "&nbsp;&nbsp;&nbsp;(28 days)"));
        calculatedTexts.push(printText("<b>NIPPV</b>"));
        calculatedTexts.push(calculateTreatmentDate(dob, gestAge, remainingGestAgeDays, 32, "<b>Caffeine</b> til 32w+no apnea off PP:"));
        calculatedTexts.push(printText("<b>Synagis</b> "));
        calculatedTexts.push(printText("<b>NEST</b> f/u Tier 1b"));
        calculatedTexts.push(addDaysToDOB(dob, 30, "<b>Hep B Vac</b> @30 days"));
        

      } else if (weight > 1800 && weight <= 2000 && ((totalGestAgeDays > 0 && totalGestAgeDays <= 153) || (totalGestAgeDays > 167 && totalGestAgeDays <= 195))) {
        calculatedTexts.push(calculateTreatmentDate(dob, gestAge, remainingGestAgeDays, 35, "<b>DEBM</b> stop at 35w:"));
        calculatedTexts.push(printText("<b>HMF/PTF</b> until 3.5kg then D/C feeds"));
        calculatedTexts.push(addDaysToDOB(dob, 14, "<b>VitD/Fe</b> at full feed and ≥14dol:"));
        calculatedTexts.push(printText("<b>Vit K</b> 1mg IM"));
        calculatedTexts.push(calculatePostMenstrualExamDate(dob, gestAge, remainingGestAgeDays));
        calculatedTexts.push(...calculateHUSDates(dob, gestAge, remainingGestAgeDays));
        calculatedTexts.push(printText("<b>ECHO:</b>"));
        calculatedTexts.push(calculateTreatmentDate(dob, gestAge, remainingGestAgeDays, 32, "&nbsp;&nbsp;&nbsp;@32w if vent or SGA:"));
        calculatedTexts.push(calculateTreatmentDate(dob, gestAge, remainingGestAgeDays, 36, "&nbsp;&nbsp;&nbsp;@36w if on resp supp:"));
        calculatedTexts.push(printText("<b>PNS</b>:mod/sev BPD risk>60% at 14,21,28d"));
        calculatedTexts.push(addDaysToDOB(dob, 14, "&nbsp;&nbsp;&nbsp;(14 days)"));
        calculatedTexts.push(addDaysToDOB(dob, 21, "&nbsp;&nbsp;&nbsp;(21 days)"));
        calculatedTexts.push(addDaysToDOB(dob, 28, "&nbsp;&nbsp;&nbsp;(28 days)"));
        calculatedTexts.push(printText("<b>NIPPV</b>"));
        calculatedTexts.push(calculateTreatmentDate(dob, gestAge, remainingGestAgeDays, 32, "<b>Caffeine</b> til 32w+no apnea off PP:"));
        calculatedTexts.push(printText("<b>Synagis</b> "));
        calculatedTexts.push(printText("<b>NEST</b> f/u Tier 1b"));
        calculatedTexts.push(addDaysToDOB(dob, 30, "<b>Hep B Vac</b> @30 days"));
        

      } else if (weight > 2000 && weight <= 9999 && ((totalGestAgeDays > 0 && totalGestAgeDays <= 153) || (totalGestAgeDays > 167 && totalGestAgeDays <= 195))) {
        calculatedTexts.push(calculateTreatmentDate(dob, gestAge, remainingGestAgeDays, 35, "<b>DEBM</b> stop at 35w:"));
        calculatedTexts.push(printText("<b>HMF/PTF</b> until 3.5kg then D/C feeds"));
        calculatedTexts.push(addDaysToDOB(dob, 14, "<b>VitD/Fe</b> at full feed and ≥14dol:"));
        calculatedTexts.push(printText("<b>Vit K</b> 1mg IM"));
        calculatedTexts.push(calculatePostMenstrualExamDate(dob, gestAge, remainingGestAgeDays));
        calculatedTexts.push(...calculateHUSDates(dob, gestAge, remainingGestAgeDays));
        calculatedTexts.push(printText("<b>ECHO:</b>"));
        calculatedTexts.push(calculateTreatmentDate(dob, gestAge, remainingGestAgeDays, 32, "&nbsp;&nbsp;&nbsp;@32w if vent or SGA:"));
        calculatedTexts.push(calculateTreatmentDate(dob, gestAge, remainingGestAgeDays, 36, "&nbsp;&nbsp;&nbsp;@36w if on resp supp:"));
        calculatedTexts.push(printText("<b>PNS</b>:mod/sev BPD risk>60% at 14,21,28d"));
        calculatedTexts.push(addDaysToDOB(dob, 14, "&nbsp;&nbsp;&nbsp;(14 days)"));
        calculatedTexts.push(addDaysToDOB(dob, 21, "&nbsp;&nbsp;&nbsp;(21 days)"));
        calculatedTexts.push(addDaysToDOB(dob, 28, "&nbsp;&nbsp;&nbsp;(28 days)"));
        calculatedTexts.push(printText("<b>NIPPV</b>"));
        calculatedTexts.push(calculateTreatmentDate(dob, gestAge, remainingGestAgeDays, 32, "<b>Caffeine</b> til 32w+no apnea off PP:"));
        calculatedTexts.push(printText("<b>Synagis</b> "));
        calculatedTexts.push(printText("<b>NEST</b> f/u Tier 1b"));
        

// END OF ROW 1


} else if (weight > 0 && weight <= 1250 && totalGestAgeDays > 195 && totalGestAgeDays <= 202) {
  calculatedTexts.push(calculateTreatmentDate(dob, gestAge, remainingGestAgeDays, 35, "<b>DEBM</b> stop at 1500g+35w:"));
  calculatedTexts.push(calculateTreatmentDate(dob, gestAge, remainingGestAgeDays, 33, "<b>Prolacta</b> stop at 1500g+33w:"));
  calculatedTexts.push(addDaysToDOB(dob, 14, "<b>MVI/Fe</b> at full feed and ≥14dol:"));
  calculatedTexts.push(printText("<b>Vit K</b> 0.3-0.5mg/kg IM"));
  calculatedTexts.push(calculatePostMenstrualExamDate(dob, gestAge, remainingGestAgeDays));
  calculatedTexts.push(...calculateHUSDates(dob, gestAge, remainingGestAgeDays));
  calculatedTexts.push(printText("<b>ECHO:</b>"));
  calculatedTexts.push(calculateTreatmentDate(dob, gestAge, remainingGestAgeDays, 36, "&nbsp;&nbsp;&nbsp;@36w if on resp supp:"));
  calculatedTexts.push(printText("<b>PNS</b>:mod/sev BPD risk>60% at 14,21,28d"));
  calculatedTexts.push(addDaysToDOB(dob, 14, "&nbsp;&nbsp;&nbsp;(14 days)"));
  calculatedTexts.push(addDaysToDOB(dob, 21, "&nbsp;&nbsp;&nbsp;(21 days)"));
  calculatedTexts.push(addDaysToDOB(dob, 28, "&nbsp;&nbsp;&nbsp;(28 days)"));
  calculatedTexts.push(printText("<b>NIPPV</b>"));
  calculatedTexts.push(calculateTreatmentDate(dob, gestAge, remainingGestAgeDays, 32, "<b>Caffeine</b> til 32w+no apnea off PP:"));
  calculatedTexts.push(printText("<b>Synagis</b>"));
  calculatedTexts.push(printText("<b>NEST</b> f/u Tier 1b"));
  calculatedTexts.push(addDaysToDOB(dob, 30, "<b>Hep B Vac</b> @30 days"));
  

} else if (weight > 1250 && weight <= 1500 && totalGestAgeDays > 195 && totalGestAgeDays <= 202) {
  calculatedTexts.push(calculateTreatmentDate(dob, gestAge, remainingGestAgeDays, 35, "<b>DEBM</b> stop at 1500g+35w:"));
  calculatedTexts.push(printText("<b>HMF/PTF</b> until 3.5kg then D/C feeds"));
  calculatedTexts.push(addDaysToDOB(dob, 14, "<b>VitD/Fe</b> at full feed and ≥14dol:"));
  calculatedTexts.push(printText("<b>Vit K</b> 0.3-0.5mg/kg IM, 1mg if 1500g"));
  calculatedTexts.push(calculatePostMenstrualExamDate(dob, gestAge, remainingGestAgeDays));
  calculatedTexts.push(...calculateHUSDates(dob, gestAge, remainingGestAgeDays));
  calculatedTexts.push(printText("<b>ECHO:</b>"));
  calculatedTexts.push(calculateTreatmentDate(dob, gestAge, remainingGestAgeDays, 36, "&nbsp;&nbsp;&nbsp;@36w if on resp supp:"));
  calculatedTexts.push(printText("<b>PNS</b>:mod/sev BPD risk>60% at 14,21,28d"));
  calculatedTexts.push(addDaysToDOB(dob, 14, "&nbsp;&nbsp;&nbsp;(14 days)"));
  calculatedTexts.push(addDaysToDOB(dob, 21, "&nbsp;&nbsp;&nbsp;(21 days)"));
  calculatedTexts.push(addDaysToDOB(dob, 28, "&nbsp;&nbsp;&nbsp;(28 days)"));
  calculatedTexts.push(printText("<b>NIPPV</b>"));
  calculatedTexts.push(calculateTreatmentDate(dob, gestAge, remainingGestAgeDays, 32, "<b>Caffeine</b> til 32w+no apnea off PP:"));
  calculatedTexts.push(printText("<b>Synagis</b> "));
  calculatedTexts.push(printText("<b>NEST</b> f/u Tier 1b"));
  calculatedTexts.push(addDaysToDOB(dob, 30, "<b>Hep B Vac</b> @30 days"));


} else if (weight > 1500 && weight <= 1800 && totalGestAgeDays > 195 && totalGestAgeDays <= 202) {
  calculatedTexts.push(calculateTreatmentDate(dob, gestAge, remainingGestAgeDays, 35, "<b>DEBM</b> stop at 35w:"));
  calculatedTexts.push(printText("<b>HMF/PTF</b> until 3.5kg then D/C feeds"));
  calculatedTexts.push(addDaysToDOB(dob, 14, "<b>VitD/Fe</b> at full feed and ≥14dol:"));
  calculatedTexts.push(printText("<b>Vit K</b> 1mg IM"));
  calculatedTexts.push(calculatePostMenstrualExamDate(dob, gestAge, remainingGestAgeDays));
  calculatedTexts.push(...calculateHUSDates(dob, gestAge, remainingGestAgeDays));
  calculatedTexts.push(printText("<b>ECHO:</b>"));
  calculatedTexts.push(calculateTreatmentDate(dob, gestAge, remainingGestAgeDays, 36, "&nbsp;&nbsp;&nbsp;@36w if on resp supp:"));
  calculatedTexts.push(printText("<b>PNS</b>:mod/sev BPD risk>60% at 14,21,28d"));
  calculatedTexts.push(addDaysToDOB(dob, 14, "&nbsp;&nbsp;&nbsp;(14 days)"));
  calculatedTexts.push(addDaysToDOB(dob, 21, "&nbsp;&nbsp;&nbsp;(21 days)"));
  calculatedTexts.push(addDaysToDOB(dob, 28, "&nbsp;&nbsp;&nbsp;(28 days)"));
  calculatedTexts.push(printText("<b>NIPPV</b>"));
  calculatedTexts.push(calculateTreatmentDate(dob, gestAge, remainingGestAgeDays, 32, "<b>Caffeine</b> til 32w+no apnea off PP:"));
  calculatedTexts.push(printText("<b>Synagis</b> "));
  calculatedTexts.push(printText("<b>NEST</b> f/u Tier 1b"));
  calculatedTexts.push(addDaysToDOB(dob, 30, "<b>Hep B Vac</b> @30 days"));


} else if (weight > 1800 && weight <= 2000 && totalGestAgeDays > 195 && totalGestAgeDays <= 202) {
  calculatedTexts.push(calculateTreatmentDate(dob, gestAge, remainingGestAgeDays, 35, "<b>DEBM</b> stop at 35w:"));
  calculatedTexts.push(printText("<b>HMF/PTF</b> until 3.5kg then D/C feeds"));
  calculatedTexts.push(addDaysToDOB(dob, 14, "<b>VitD/Fe</b> at full feed and ≥14dol:"));
  calculatedTexts.push(printText("<b>Vit K</b> 1mg IM"));
  calculatedTexts.push(calculatePostMenstrualExamDate(dob, gestAge, remainingGestAgeDays));
  calculatedTexts.push(...calculateHUSDates(dob, gestAge, remainingGestAgeDays));
  calculatedTexts.push(printText("<b>ECHO:</b>"));
  calculatedTexts.push(calculateTreatmentDate(dob, gestAge, remainingGestAgeDays, 36, "&nbsp;&nbsp;&nbsp;@36w if on resp supp:"));
  calculatedTexts.push(printText("<b>PNS:</b>mod/sev BPD risk>60% at 14,21,28d"));
  calculatedTexts.push(addDaysToDOB(dob, 14, "&nbsp;&nbsp;&nbsp;(14 days)"));
  calculatedTexts.push(addDaysToDOB(dob, 21, "&nbsp;&nbsp;&nbsp;(21 days)"));
  calculatedTexts.push(addDaysToDOB(dob, 28, "&nbsp;&nbsp;&nbsp;(28 days)"));
  calculatedTexts.push(printText("<b>NIPPV</b>"));
  calculatedTexts.push(calculateTreatmentDate(dob, gestAge, remainingGestAgeDays, 32, "<b>Caffeine</b> til 32w+no apnea off PP:"));
  calculatedTexts.push(printText("<b>Synagis</b> "));
  calculatedTexts.push(printText("<b>NEST</b> f/u Tier 1b"));
  calculatedTexts.push(addDaysToDOB(dob, 30, "<b>Hep B Vac</b> @30 days"));

} else if (weight > 2000 && weight <= 9999 && totalGestAgeDays > 195 && totalGestAgeDays <= 202) {
  calculatedTexts.push(calculateTreatmentDate(dob, gestAge, remainingGestAgeDays, 35, "<b>DEBM</b> stop at 35w:"));
  calculatedTexts.push(printText("<b>HMF/PTF</b> until 3.5kg then D/C feeds"));
  calculatedTexts.push(addDaysToDOB(dob, 14, "<b>VitD/Fe</b> at full feed and ≥14dol:"));
  calculatedTexts.push(printText("<b>Vit K</b> 1mg IM"));
  calculatedTexts.push(calculatePostMenstrualExamDate(dob, gestAge, remainingGestAgeDays));
  calculatedTexts.push(...calculateHUSDates(dob, gestAge, remainingGestAgeDays));
  calculatedTexts.push(printText("<b>ECHO:</b>"));
  calculatedTexts.push(calculateTreatmentDate(dob, gestAge, remainingGestAgeDays, 36, "&nbsp;&nbsp;&nbsp;@36w if on resp supp:"));
  calculatedTexts.push(printText("<b>PNS:</b>mod/sev BPD risk>60% at 14,21,28d"));
  calculatedTexts.push(addDaysToDOB(dob, 14, "&nbsp;&nbsp;&nbsp;(14 days)"));
  calculatedTexts.push(addDaysToDOB(dob, 21, "&nbsp;&nbsp;&nbsp;(21 days)"));
  calculatedTexts.push(addDaysToDOB(dob, 28, "&nbsp;&nbsp;&nbsp;(28 days)"));
  calculatedTexts.push(printText("<b>NIPPV</b>"));
  calculatedTexts.push(calculateTreatmentDate(dob, gestAge, remainingGestAgeDays, 32, "<b>Caffeine</b> til 32w+no apnea off PP:"));
  calculatedTexts.push(printText("<b>Synagis</b> "));
  calculatedTexts.push(printText("<b>NEST</b> f/u Tier 1b"));


  // END OF ROW 2

} else if (weight > 0 && weight <= 1250 && totalGestAgeDays > 202 && totalGestAgeDays <= 216) {
  calculatedTexts.push(calculateTreatmentDate(dob, gestAge, remainingGestAgeDays, 35, "<b>DEBM</b> stop at 1500g+35w:"));
  calculatedTexts.push(calculateTreatmentDate(dob, gestAge, remainingGestAgeDays, 33, "<b>Prolacta</b> stop at 1500g+33w:"));
  calculatedTexts.push(addDaysToDOB(dob, 14, "<b>MVI/Fe</b> at full feed and ≥14dol:"));
  calculatedTexts.push(printText("<b>Vit K</b> 0.3-0.5mg/kg IM"));
  calculatedTexts.push(calculatePostMenstrualExamDate(dob, gestAge, remainingGestAgeDays));
  calculatedTexts.push(...calculateHUSDates(dob, gestAge, remainingGestAgeDays));
  calculatedTexts.push(printText("<b>ECHO:</b>"));
  calculatedTexts.push(calculateTreatmentDate(dob, gestAge, remainingGestAgeDays, 36, "&nbsp;&nbsp;&nbsp;@36w if on resp supp:"));
  calculatedTexts.push(printText("<b>PNS:</b>mod/sev BPD risk>60% at 14,21,28d"));
  calculatedTexts.push(addDaysToDOB(dob, 14, "&nbsp;&nbsp;&nbsp;(14 days)"));
  calculatedTexts.push(addDaysToDOB(dob, 21, "&nbsp;&nbsp;&nbsp;(21 days)"));
  calculatedTexts.push(addDaysToDOB(dob, 28, "&nbsp;&nbsp;&nbsp;(28 days)"));
  calculatedTexts.push(printText("<b>NIPPV</b>"));
  calculatedTexts.push(calculateTreatmentDate(dob, gestAge, remainingGestAgeDays, 32, "<b>Caffeine</b> til 32w+no apnea off PP:"));
  calculatedTexts.push(addDaysToDOB(dob, 28, "<b>Synagis</b> if O2 at least 28d after birth"));
  calculatedTexts.push(printText("<b>NEST</b> f/u Tier 2"));
  calculatedTexts.push(addDaysToDOB(dob, 30, "<b>Hep B Vac</b> @30 days"));


} else if (weight > 1250 && weight <= 1500 && totalGestAgeDays > 202 && totalGestAgeDays <= 216) {
  calculatedTexts.push(calculateTreatmentDate(dob, gestAge, remainingGestAgeDays, 35, "<b>DEBM</b> stop at 1500g+35w:"));
  calculatedTexts.push(printText("<b>HMF/PTF</b> until 3.5kg then D/C feeds"));
  calculatedTexts.push(addDaysToDOB(dob, 14, "<b>VitD/Fe</b> at full feed and ≥14dol:"));
  calculatedTexts.push(printText("<b>Vit K</b> 0.3-0.5mg/kg IM, 1mg if 1500g"));
  calculatedTexts.push(calculatePostMenstrualExamDate(dob, gestAge, remainingGestAgeDays));
  calculatedTexts.push(...calculateHUSDates(dob, gestAge, remainingGestAgeDays));
  calculatedTexts.push(printText("<b>ECHO:</b>"));
  calculatedTexts.push(calculateTreatmentDate(dob, gestAge, remainingGestAgeDays, 36, "&nbsp;&nbsp;&nbsp;@36w if on resp supp:"));
  calculatedTexts.push(printText("<b>PNS:</b> mod/sev BPD risk >60% at 14,21,28d"));
  calculatedTexts.push(addDaysToDOB(dob, 14, "&nbsp;&nbsp;&nbsp;(14 days)"));
  calculatedTexts.push(addDaysToDOB(dob, 21, "&nbsp;&nbsp;&nbsp;(21 days)"));
  calculatedTexts.push(addDaysToDOB(dob, 28, "&nbsp;&nbsp;&nbsp;(28 days)"));
  calculatedTexts.push(printText("<b>NIPPV</b>"));
  calculatedTexts.push(calculateTreatmentDate(dob, gestAge, remainingGestAgeDays, 32, "<b>Caffeine</b> til 32w+no apnea off PP:"));
  calculatedTexts.push(addDaysToDOB(dob, 28, "<b>Synagis</b> if O2 at least 28d after birth"));
  calculatedTexts.push(printText("<b>NEST</b> f/u Tier 2"));
  calculatedTexts.push(addDaysToDOB(dob, 30, "<b>Hep B Vac</b> @30 days"));


} else if (weight > 1500 && weight <= 1800 && totalGestAgeDays > 202 && totalGestAgeDays <= 216) {
  calculatedTexts.push(calculateTreatmentDate(dob, gestAge, remainingGestAgeDays, 35, "<b>DEBM</b> stop at 35w:"));
  calculatedTexts.push(printText("<b>HMF/PTF</b> until 3.5kg then D/C feeds"));
  calculatedTexts.push(addDaysToDOB(dob, 14, "<b>VitD/Fe</b> at full feed and ≥14dol:"));
  calculatedTexts.push(printText("<b>Vit K</b> 1mg IM"));
  calculatedTexts.push(calculatePostMenstrualExamDate(dob, gestAge, remainingGestAgeDays));
  calculatedTexts.push(...calculateHUSDates(dob, gestAge, remainingGestAgeDays));
  calculatedTexts.push(printText("<b>ECHO:</b>"));
  calculatedTexts.push(calculateTreatmentDate(dob, gestAge, remainingGestAgeDays, 36, "&nbsp;&nbsp;&nbsp;@36w if on resp supp:"));
  calculatedTexts.push(printText("<b>PNS:</b> mod/sev BPD risk >60% at 14,21,28d"));
  calculatedTexts.push(addDaysToDOB(dob, 14, "&nbsp;&nbsp;&nbsp;(14 days)"));
  calculatedTexts.push(addDaysToDOB(dob, 21, "&nbsp;&nbsp;&nbsp;(21 days)"));
  calculatedTexts.push(addDaysToDOB(dob, 28, "&nbsp;&nbsp;&nbsp;(28 days)"));
  calculatedTexts.push(printText("<b>NIPPV</b>"));
  calculatedTexts.push(calculateTreatmentDate(dob, gestAge, remainingGestAgeDays, 32, "<b>Caffeine</b> til 32w+no apnea off PP:"));
  calculatedTexts.push(addDaysToDOB(dob, 28, "<b>Synagis</b> if O2 at least 28d after birth"));
  calculatedTexts.push(printText("<b>NEST</b> f/u Tier 2"));
  calculatedTexts.push(addDaysToDOB(dob, 30, "<b>Hep B Vac</b> @30 days"));


} else if (weight > 1800 && weight <= 2000 && totalGestAgeDays > 202 && totalGestAgeDays <= 216) {
  calculatedTexts.push(calculateTreatmentDate(dob, gestAge, remainingGestAgeDays, 35, "<b>DEBM</b> stop at 35w:"));
  calculatedTexts.push(printText("<b>HMF/PTF</b> until 3.5kg then D/C feeds"));
  calculatedTexts.push(addDaysToDOB(dob, 14, "<b>VitD/Fe</b> at full feed and ≥14dol:"));
  calculatedTexts.push(printText("<b>Vit K</b> 1mg IM"));
  calculatedTexts.push(calculatePostMenstrualExamDate(dob, gestAge, remainingGestAgeDays));
  calculatedTexts.push(...calculateHUSDates(dob, gestAge, remainingGestAgeDays));
  calculatedTexts.push(printText("<b>ECHO:</b>"));
  calculatedTexts.push(calculateTreatmentDate(dob, gestAge, remainingGestAgeDays, 36, "&nbsp;&nbsp;&nbsp;@36w if on resp supp:"));
  calculatedTexts.push(printText("<b>PNS:</b> mod/sev BPD risk >60% at 14,21,28d"));
  calculatedTexts.push(addDaysToDOB(dob, 14, "&nbsp;&nbsp;&nbsp;(14 days)"));
  calculatedTexts.push(addDaysToDOB(dob, 21, "&nbsp;&nbsp;&nbsp;(21 days)"));
  calculatedTexts.push(addDaysToDOB(dob, 28, "&nbsp;&nbsp;&nbsp;(28 days)"));
  calculatedTexts.push(printText("<b>NIPPV</b>"));
  calculatedTexts.push(calculateTreatmentDate(dob, gestAge, remainingGestAgeDays, 32, "<b>Caffeine</b> til 32w+no apnea off PP:"));
  calculatedTexts.push(addDaysToDOB(dob, 28, "<b>Synagis</b> if O2 at least 28d after birth"));
  calculatedTexts.push(printText("<b>NEST</b> f/u Tier 2"));
  calculatedTexts.push(addDaysToDOB(dob, 30, "<b>Hep B Vac</b> @30 days"));


} else if (weight > 2000 && weight <= 9999 && totalGestAgeDays > 202 && totalGestAgeDays <= 216) {
  calculatedTexts.push(calculateTreatmentDate(dob, gestAge, remainingGestAgeDays, 35, "<b>DEBM</b> stop at 35w:"));
  calculatedTexts.push(printText("<b>HMF/PTF</b> until 3.5kg then D/C feeds"));
  calculatedTexts.push(addDaysToDOB(dob, 14, "<b>VitD/Fe</b> at full feed and ≥14dol:"));
  calculatedTexts.push(printText("<b>Vit K</b> 1mg IM"));
  calculatedTexts.push(calculatePostMenstrualExamDate(dob, gestAge, remainingGestAgeDays));
  calculatedTexts.push(...calculateHUSDates(dob, gestAge, remainingGestAgeDays));
  calculatedTexts.push(printText("<b>ECHO:</b>"));
  calculatedTexts.push(calculateTreatmentDate(dob, gestAge, remainingGestAgeDays, 36, "&nbsp;&nbsp;&nbsp;@36w if on resp supp:"));
  calculatedTexts.push(printText("<b>PNS:</b> mod/sev BPD risk >60% at 14,21,28d"));
  calculatedTexts.push(addDaysToDOB(dob, 14, "&nbsp;&nbsp;&nbsp;(14 days)"));
  calculatedTexts.push(addDaysToDOB(dob, 21, "&nbsp;&nbsp;&nbsp;(21 days)"));
  calculatedTexts.push(addDaysToDOB(dob, 28, "&nbsp;&nbsp;&nbsp;(28 days)"));
  calculatedTexts.push(printText("<b>NIPPV</b>"));
  calculatedTexts.push(calculateTreatmentDate(dob, gestAge, remainingGestAgeDays, 32, "<b>Caffeine</b> til 32w+no apnea off PP:"));
  calculatedTexts.push(addDaysToDOB(dob, 28, "<b>Synagis</b> if O2 at least 28d after birth"));
  calculatedTexts.push(printText("<b>NEST</b> f/u Tier 2"));


  // END OF ROW 3

} else if (weight > 0 && weight <= 1250 && totalGestAgeDays > 216 && totalGestAgeDays <= 223) {
  calculatedTexts.push(calculateTreatmentDate(dob, gestAge, remainingGestAgeDays, 35, "<b>DEBM</b> stop at 1500g+35w:"));
  calculatedTexts.push(calculateTreatmentDate(dob, gestAge, remainingGestAgeDays, 33, "<b>prolacta</b> stop at 1500g+33w:"));
  calculatedTexts.push(addDaysToDOB(dob, 14, "<b>MVI/Fe</b> at full feed and ≥14dol:"));
  calculatedTexts.push(printText("<b>Vit K</b> 0.3-0.5mg/kg IM"));
  calculatedTexts.push(calculatePostMenstrualExamDate(dob, gestAge, remainingGestAgeDays));
  calculatedTexts.push(printText("<b>ECHO:</b>"));
  calculatedTexts.push(calculateTreatmentDate(dob, gestAge, remainingGestAgeDays, 36, "&nbsp;&nbsp;&nbsp;@36w if on resp supp:"));
  calculatedTexts.push(calculateTreatmentDate(dob, gestAge, remainingGestAgeDays, 32, "<b>Caffeine</b> til 32w+no apnea off PP:"));
  calculatedTexts.push(addDaysToDOB(dob, 28, "<b>Synagis</b> if O2 at least 28d after birth"));
  calculatedTexts.push(printText("<b>NEST</b> f/u Tier 2"));
  calculatedTexts.push(addDaysToDOB(dob, 30, "<b>Hep B Vac</b> @30 days"));


} else if (weight > 1250 && weight <= 1500 && totalGestAgeDays > 216 && totalGestAgeDays <= 223) {
  calculatedTexts.push(calculateTreatmentDate(dob, gestAge, remainingGestAgeDays, 35, "<b>DEBM</b> stop at 1500g+35w:"));
  calculatedTexts.push(printText("<b>HMF/PTF</b> until 3.5kg then D/C feeds"));
  calculatedTexts.push(addDaysToDOB(dob, 14, "<b>VitD/Fe</b> at full feed and ≥14dol"));
  calculatedTexts.push(printText("<b>Vit K</b> 0.3-0.5mg/kg IM, 1mg if 1500g"));
  calculatedTexts.push(calculatePostMenstrualExamDate(dob, gestAge, remainingGestAgeDays));
  calculatedTexts.push(printText("<b>ECHO:</b>"));
  calculatedTexts.push(calculateTreatmentDate(dob, gestAge, remainingGestAgeDays, 36, "&nbsp;&nbsp;&nbsp;@36w if on resp supp:"));
  calculatedTexts.push(calculateTreatmentDate(dob, gestAge, remainingGestAgeDays, 32, "<b>Caffeine</b> til 32w+no apnea off PP:"));
  calculatedTexts.push(addDaysToDOB(dob, 28, "<b>Synagis</b> if O2 at least 28d after birth"));
  calculatedTexts.push(printText("<b>NEST</b> f/u Tier 2"));
  calculatedTexts.push(addDaysToDOB(dob, 30, "<b>Hep B Vac</b> @30 days"));  

} else if (weight > 1500 && weight <= 1800 && totalGestAgeDays > 216 && totalGestAgeDays <= 223) {
  calculatedTexts.push(calculateTreatmentDate(dob, gestAge, remainingGestAgeDays, 35, "<b>DEBM</b> stop at 35w:"));
  calculatedTexts.push(printText("<b>HMF/PTF</b> until 3.5kg then D/C feeds"));
  calculatedTexts.push(addDaysToDOB(dob, 14, "<b>VitD/Fe</b> at full feed and ≥14dol"));
  calculatedTexts.push(printText("<b>Vit K</b> 1mg IM"));
  calculatedTexts.push(addDaysToDOB(dob, 28, "<b>ROP Exam</b> IF UNSTABLE @ 4w of age"));
  calculatedTexts.push(printText("<b>ECHO:</b>"));
  calculatedTexts.push(calculateTreatmentDate(dob, gestAge, remainingGestAgeDays, 36, "&nbsp;&nbsp;&nbsp;@36w if on resp supp:"));
  calculatedTexts.push(addDaysToDOB(dob, 28, "<b>Synagis</b> if O2 at least 28d after birth"));
  calculatedTexts.push(printText("<b>NEST</b> f/u Tier 2"));
  calculatedTexts.push(addDaysToDOB(dob, 30, "<b>Hep B Vac</b> @30 days"));
  

} else if (weight > 1800 && weight <= 2000 && totalGestAgeDays > 216 && totalGestAgeDays <= 223) {
  calculatedTexts.push(calculateTreatmentDate(dob, gestAge, remainingGestAgeDays, 35, "<b>DEBM</b> stop at 35w:"));
  calculatedTexts.push(printText("<b>HMF/PTF</b> until 3.5kg then D/C feeds"));
  calculatedTexts.push(addDaysToDOB(dob, 14, "<b>VitD/Fe</b> at full feed and ≥14dol"));
  calculatedTexts.push(printText("<b>Vit K</b> 1mg IM"));
  calculatedTexts.push(addDaysToDOB(dob, 28, "<b>ROP Exam</b> IF UNSTABLE @ 4w of age"));
  calculatedTexts.push(printText("<b>ECHO:</b>"));
  calculatedTexts.push(calculateTreatmentDate(dob, gestAge, remainingGestAgeDays, 36, "&nbsp;&nbsp;&nbsp;@36w if on resp supp:"));
  calculatedTexts.push(addDaysToDOB(dob, 28, "<b>Synagis</b> if O2 at least 28d after birth"));
  calculatedTexts.push(printText("<b>NEST</b> f/u Tier 2"));
  calculatedTexts.push(addDaysToDOB(dob, 30, "<b>Hep B Vac</b> @30 days"));
  

} else if (weight > 2000 && weight <= 9999 && totalGestAgeDays > 216 && totalGestAgeDays <= 223) {
  calculatedTexts.push(calculateTreatmentDate(dob, gestAge, remainingGestAgeDays, 35, "<b>DEBM</b> stop at 35w:"));
  calculatedTexts.push(printText("<b>HMF/PTF</b> until 3.5kg then D/C feeds"));
  calculatedTexts.push(addDaysToDOB(dob, 14, "<b>VitD/Fe</b> at full feed and ≥14dol"));
  calculatedTexts.push(printText("<b>Vit K</b> 1mg IM"));
  calculatedTexts.push(addDaysToDOB(dob, 28, "<b>ROP Exam</b> IF UNSTABLE @ 4w of age"));
  calculatedTexts.push(printText("<b>ECHO:</b>"));
  calculatedTexts.push(calculateTreatmentDate(dob, gestAge, remainingGestAgeDays, 36, "&nbsp;&nbsp;&nbsp;@36w if on resp supp:"));
  calculatedTexts.push(addDaysToDOB(dob, 28, "<b>Synagis</b> if O2 at least 28d after birth"));
  calculatedTexts.push(printText("<b>NEST</b> f/u Tier 2"));
  

  // END OF ROW 4

} else if (weight > 0 && weight <= 1250 && totalGestAgeDays > 223 && totalGestAgeDays <= 230) {
  calculatedTexts.push(calculateTreatmentDate(dob, gestAge, remainingGestAgeDays, 35, "<b>DEBM</b> stop at 1500g+35w:"));
  calculatedTexts.push(calculateTreatmentDate(dob, gestAge, remainingGestAgeDays, 33, "<b>Prolacta</b> stop at 1500g+33w:"));
  calculatedTexts.push(addDaysToDOB(dob, 14, "<b>MVI/Fe</b> at full feed and ≥14dol:"));
  calculatedTexts.push(printText("<b>Vit K</b> 0.3-0.5mg/kg IM"));
  calculatedTexts.push(calculatePostMenstrualExamDate(dob, gestAge, remainingGestAgeDays));
  calculatedTexts.push(printText("<b>ECHO:</b>"));
  calculatedTexts.push(calculateTreatmentDate(dob, gestAge, remainingGestAgeDays, 36, "&nbsp;&nbsp;&nbsp;@36w ONLY IF 32+0w & on resp supp:"));
  calculatedTexts.push(printText("<b>Caffeine</b> til apnea free off PP"));
  calculatedTexts.push(printText("<b>NEST</b> f/u Tier 2"));
  calculatedTexts.push(addDaysToDOB(dob, 30, "<b>Hep B Vac</b> @30 days"));
  

} else if (weight > 1250 && weight <= 1500 && totalGestAgeDays > 223 && totalGestAgeDays <= 230) {
  calculatedTexts.push(calculateTreatmentDate(dob, gestAge, remainingGestAgeDays, 35, "<b>DEBM</b> stop at 1500g+35w:"));
  calculatedTexts.push(printText("<b>HMF/PTF</b> until 3.5kg then D/C feeds"));
  calculatedTexts.push(addDaysToDOB(dob, 14, "<b>VitD/Fe</b> at full feed and ≥14dol:"));
  calculatedTexts.push(printText("<b>Vit K</b> 0.3-0.5mg/kg IM, 1mg if 1500g"));
  calculatedTexts.push(calculatePostMenstrualExamDate(dob, gestAge, remainingGestAgeDays));
  calculatedTexts.push(printText("<b>ECHO:</b>"));
  calculatedTexts.push(calculateTreatmentDate(dob, gestAge, remainingGestAgeDays, 36, "&nbsp;&nbsp;&nbsp;<b>@36w</b> ONLY IF 32+0w & on resp supp:"));
  calculatedTexts.push(printText("<b>Caffeine</b> til apnea free off PP"));
  calculatedTexts.push(printText("<b>NEST</b> f/u Tier 2"));
  calculatedTexts.push(addDaysToDOB(dob, 30, "<b>Hep B Vac</b> @30 days"));
  

} else if (weight > 1500 && weight <= 1800 && totalGestAgeDays > 223 && totalGestAgeDays <= 230) {
  calculatedTexts.push(calculateTreatmentDate(dob, gestAge, remainingGestAgeDays, 35, "<b>DEBM</b> stop at 35w:"));
  calculatedTexts.push(printText("<b>HMF/PTF</b> until 3.5kg then D/C feeds"));
  calculatedTexts.push(addDaysToDOB(dob, 14, "<b>VitD/Fe</b> at full feed and ≥14dol:"));
  calculatedTexts.push(addDaysToDOB(dob, 28, "<b>ROP Exam</b> IF UNSTABLE @ 4w of age"));
  calculatedTexts.push(calculatePostMenstrualExamDate(dob, gestAge, remainingGestAgeDays));
  calculatedTexts.push(printText("<b>ECHO:</b>"));
  calculatedTexts.push(calculateTreatmentDate(dob, gestAge, remainingGestAgeDays, 36, "&nbsp;&nbsp;&nbsp;<b>@36w</b> ONLY IF 32+0w & on resp supp:"));
  calculatedTexts.push(printText("<b>NEST</b> f/u Tier 2"));
  calculatedTexts.push(addDaysToDOB(dob, 30, "<b>Hep B Vac</b> @30 days"));
  

} else if (weight > 1800 && weight <= 2000 && totalGestAgeDays > 223 && totalGestAgeDays <= 230) {
  calculatedTexts.push(calculateTreatmentDate(dob, gestAge, remainingGestAgeDays, 35, "<b>DEBM</b> stop at 35w:"));
  calculatedTexts.push(printText("<b>HMF/PTF</b> until 3.5kg then D/C feeds"));
  calculatedTexts.push(addDaysToDOB(dob, 14, "<b>VitD/Fe</b> at full feed and ≥14dol:"));
  calculatedTexts.push(printText("<b>Vit K</b> 1mg IM"));
  calculatedTexts.push(addDaysToDOB(dob, 28, "<b>ROP Exam</b> IF UNSTABLE @ 4w of age"));
  calculatedTexts.push(printText("<b>ECHO:</b>"));
  calculatedTexts.push(calculateTreatmentDate(dob, gestAge, remainingGestAgeDays, 36, "&nbsp;&nbsp;&nbsp;<b>@36w</b> ONLY IF 32+0w & on resp supp:"));
  calculatedTexts.push(printText("<b>NEST</b> f/u Tier 2"));
  calculatedTexts.push(addDaysToDOB(dob, 30, "<b>Hep B Vac</b> @30 days"));
  

} else if (weight > 2000 && weight <= 9999 && totalGestAgeDays > 223 && totalGestAgeDays <= 230) {
  calculatedTexts.push(calculateTreatmentDate(dob, gestAge, remainingGestAgeDays, 35, "<b>DEBM</b> stop at 35w:"));
  calculatedTexts.push(printText("<b>HMF/PTF</b> until 3.5kg then D/C feeds"));
  calculatedTexts.push(addDaysToDOB(dob, 14, "<b>VitD/Fe</b> at full feed and ≥14dol:"));
  calculatedTexts.push(printText("<b>Vit K</b> 1mg IM"));
  calculatedTexts.push(addDaysToDOB(dob, 28, "<b>ROP Exam</b> IF UNSTABLE @ 4w of age"));
  calculatedTexts.push(printText("<b>ECHO:</b>"));
  calculatedTexts.push(calculateTreatmentDate(dob, gestAge, remainingGestAgeDays, 36, "&nbsp;&nbsp;&nbsp;@36w ONLY IF 32+0w & on resp supp:"));
  calculatedTexts.push(printText("<b>NEST</b> f/u Tier 2"));
  
  
  // END OF ROW 5

} else if (weight > 0 && weight <= 1250 && totalGestAgeDays > 230 && totalGestAgeDays < 245) {
  calculatedTexts.push(calculateTreatmentDate(dob, gestAge, remainingGestAgeDays, 35, "<b>DEBM</b> stop at 1500g+35w:"));
  calculatedTexts.push(printText("<b>Prolacta</b> stop at 1500g"));
  calculatedTexts.push(addDaysToDOB(dob, 14, "<b>MVI/Fe</b> at full feed and ≥14dol:"));
  calculatedTexts.push(printText("<b>Vit K</b> 0.3-0.5mg/kg IM"));
  calculatedTexts.push(calculatePostMenstrualExamDate(dob, gestAge, remainingGestAgeDays));
  calculatedTexts.push(printText("<b>Caffeine</b> til apnea free off PP"));
  calculatedTexts.push(printText("<b>NEST</b> f/u Tier 2"));
  calculatedTexts.push(addDaysToDOB(dob, 30, "<b>Hep B Vac</b> @30 days"));

} else if (weight > 1250 && weight <= 1500 && totalGestAgeDays > 230 && totalGestAgeDays < 245) {
  calculatedTexts.push(calculateTreatmentDate(dob, gestAge, remainingGestAgeDays, 35, "<b>DEBM</b> stop at 1500g+35w:"));
  calculatedTexts.push(printText("<b>HMF/PTF</b> until 3.5kg then D/C feeds"));
  calculatedTexts.push(addDaysToDOB(dob, 14, "<b>VitD/Fe</b> at full feed and ≥14dol:"));
  calculatedTexts.push(printText("<b>Vit K</b> 0.3-0.5mg/kg IM, 1mg if 1500g"));
  calculatedTexts.push(calculatePostMenstrualExamDate(dob, gestAge, remainingGestAgeDays));
  calculatedTexts.push(printText("<b>Caffeine</b> til apnea free off PP"));
  calculatedTexts.push(printText("<b>NEST</b> f/u Tier 2"));
  calculatedTexts.push(addDaysToDOB(dob, 30, "<b>Hep B Vac</b> @30 days"));

} else if (weight > 1500 && weight <= 1800 && totalGestAgeDays > 230 && totalGestAgeDays < 245) {
  calculatedTexts.push(addDaysToDOB(dob, 7, "<b>DEBM</b> stop at 1500g or max 7d:"));
  calculatedTexts.push(printText("<b>HMF/PTF</b> until 3.5kg then D/C feeds"));
  calculatedTexts.push(addDaysToDOB(dob, 14, "<b>VitD/Fe</b> at full feed and ≥14dol:"));
  calculatedTexts.push(printText("<b>Vit K</b> 1mg IM"));
  calculatedTexts.push(addDaysToDOB(dob, 28, "<b>ROP Exam</b> IF UNSTABLE @ 4w of age"));
  calculatedTexts.push(printText("<b>ECI</b>  (Nest if meet criteria)"));
  calculatedTexts.push(addDaysToDOB(dob, 30, "<b>Hep B Vac</b> @30 days"));

} else if (weight > 1800 && weight <= 2000 && totalGestAgeDays > 230 && totalGestAgeDays < 245) {
  calculatedTexts.push(addDaysToDOB(dob, 7, "<b>DEBM</b> stop at 1500g or max 7d:"));
  calculatedTexts.push(printText("<b>HMF/PTF</b> until 3.5kg then D/C feeds"));
  calculatedTexts.push(addDaysToDOB(dob, 14, "<b>VitD/Fe</b> at full feed and ≥14dol:"));
  calculatedTexts.push(printText("<b>Vit K</b> 1mg IM"));
  calculatedTexts.push(addDaysToDOB(dob, 28, "<b>ROP Exam</b> IF UNSTABLE @ 4w of age"));
  calculatedTexts.push(printText("<b>ECI</b> if SGA, (ECI/Nest if meet criteria)"));
  calculatedTexts.push(addDaysToDOB(dob, 30, "<b>Hep B Vac</b> @30 days"));

} else if (weight > 2000 && weight <= 9999 && totalGestAgeDays > 230 && totalGestAgeDays < 245) {
  calculatedTexts.push(addDaysToDOB(dob, 7, "<b>DEBM</b> stop at 1500g or max 7d:"));
  calculatedTexts.push(printText("<b>HMF/PTF</b> until 3.5kg then D/C feeds"));
  calculatedTexts.push(addDaysToDOB(dob, 14, "<b>VitD/Fe</b> at full feed and ≥14dol:"));
  calculatedTexts.push(printText("<b>Vit K</b> 1mg IM"));
  calculatedTexts.push(printText("<b>ECI</b> if SGA, (ECI/Nest if meet criteria)"));

  //END OF ROW 6

} else if (weight > 0 && weight <= 1250 && totalGestAgeDays >= 245 && totalGestAgeDays <= 301) {
  calculatedTexts.push(printText("<b>DEBM</b> stop at 1500g"));
  calculatedTexts.push(printText("<b>Prolacta</b> stop at 1500g"));
  calculatedTexts.push(addDaysToDOB(dob, 14, "<b>MVI/Fe</b> at full feed and ≥14dol:"));
  calculatedTexts.push(printText("<b>Vit K</b> 0.3-0.5mg/kg IM"));
  calculatedTexts.push(calculatePostMenstrualExamDate(dob, gestAge, remainingGestAgeDays));
  calculatedTexts.push(printText("<b>Caffeine</b> til apnea free off PP"));
  calculatedTexts.push(printText("<b>NEST</b> f/u Tier 2"));
  calculatedTexts.push(addDaysToDOB(dob, 30, "<b>Hep B Vac</b> @30 days"));

} else if (weight > 1250 && weight <= 1500 && totalGestAgeDays >= 245 && totalGestAgeDays <= 301) {
  calculatedTexts.push(printText("<b>DEBM</b> stop at 1500g"));
  calculatedTexts.push(printText("<b>HMF/PTF</b> until 3.5kg then D/C feeds"));
  calculatedTexts.push(addDaysToDOB(dob, 14, "<b>VitD/Fe</b> at full feed and ≥14dol:"));
  calculatedTexts.push(printText("<b>Vit K</b> 0.3-0.5mg/kg IM, 1mg if 1500g"));
  calculatedTexts.push(calculatePostMenstrualExamDate(dob, gestAge, remainingGestAgeDays));
  calculatedTexts.push(printText("<b>Caffeine</b> til apnea free off PP"));
  calculatedTexts.push(printText("<b>NEST</b> f/u Tier 2"));
  calculatedTexts.push(addDaysToDOB(dob, 30, "<b>Hep B Vac</b> @30 days"));

} else if (weight > 1500 && weight <= 1800 && totalGestAgeDays >= 245 && totalGestAgeDays <= 301) {
  calculatedTexts.push(addDaysToDOB(dob, 7, "<b>DEBM</b> stop at max 7d:"));
  calculatedTexts.push(printText("<b>HMF/PTF</b> until 3.5kg then D/C feeds"));
  calculatedTexts.push(addDaysToDOB(dob, 14, "<b>VitD/Fe</b> at full feed and ≥14dol:"));
  calculatedTexts.push(printText("<b>Vit K</b> 1mg IM"));
  calculatedTexts.push(addDaysToDOB(dob, 28, "<b>ROP Exam</b> IF UNSTABLE @ 4w of age"));
  calculatedTexts.push(printText("<b>ECI</b>  (Nest if meet criteria)"));
  calculatedTexts.push(addDaysToDOB(dob, 30, "<b>Hep B Vac</b> @30 days"));

} else if (weight > 1800 && weight <= 2000 && totalGestAgeDays >= 245 && totalGestAgeDays <= 301) {
  calculatedTexts.push(addDaysToDOB(dob, 7, "<b>DEBM</b> stop at max 7d:"));
  calculatedTexts.push(printText("<b>HMF/PTF</b> until 3.5kg then D/C feeds"));
  calculatedTexts.push(addDaysToDOB(dob, 14, "<b>VitD/Fe</b> at full feed and ≥14dol:"));
  calculatedTexts.push(printText("<b>Vit K</b> 1mg IM"));
  calculatedTexts.push(addDaysToDOB(dob, 28, "<b>ROP Exam</b> IF UNSTABLE @ 4w of age"));
  calculatedTexts.push(printText("<b>ECI</b> if SGA, (ECI/Nest if meet criteria)"));
  calculatedTexts.push(addDaysToDOB(dob, 30, "<b>Hep B Vac</b> @30 days"));

} else if (weight > 2000 && weight <= 9999 && totalGestAgeDays >= 245 && totalGestAgeDays <= 301) {
  calculatedTexts.push(addDaysToDOB(dob, 7, "<b>DEBM</b> stop at max 7d:"));
  calculatedTexts.push(printText("<b>HMF/PTF</b> until 3.5kg then D/C feeds"));
  calculatedTexts.push(addDaysToDOB(dob, 14, "<b>VitD/Fe</b> at full feed and ≥14dol:"));
  calculatedTexts.push(printText("<b>Vit K</b> 1mg IM"));
  calculatedTexts.push(printText("<b>ECI</b> if SGA, (ECI/Nest if meet criteria)"));

  //END OF ROW 7

} else if (weight > 2200 && weight <= 9999 && totalGestAgeDays > 230 && totalGestAgeDays <= 301) {
  calculatedTexts.push(addDaysToDOB(dob, 7, "<b>DEBM</b> stop at max 7d:"));
  calculatedTexts.push(printText("Term formula"));
  calculatedTexts.push(addDaysToDOB(dob, 14, "<b>VitD/Fe</b> at full feed and ≥14dol:"));
  calculatedTexts.push(printText("<b>Vit K</b> 1mg IM"))

} else if (weight > 9999 || weight < 0) {
  calculatedTexts.push(printText("Invalid weight, please enter a birthweight between 0 and 2200"));


        return; // return early to prevent the remaining code from executing
      }
  
      function removeNIPPVtreatment(totalGestAgeDays, calculatedTexts) {
        // If totalGestAgeDays is less than 210, return the original array
        if (totalGestAgeDays < 210) {
            return calculatedTexts;
        }
    
        const targetText = "<b>NIPPV</b>";
        
        // Filter the array, removing any elements that include the targetText
        const filteredTexts = calculatedTexts.filter(text => !text.includes(targetText));
        
        // Now filteredTexts array does not include any text that includes "<b>NIPPV</b> if under 30w+0d:"
        return filteredTexts;
    }
    
    
    let updatedTexts = removeNIPPVtreatment(totalGestAgeDays, calculatedTexts);

    //Fluconazole Prophylaxis Treatment Insert
    if (totalGestAgeDays <= 174 || weight <= 749){
      updatedTexts.push(addDaysToDOB(dob, 42, "<b>Fluconazole Prophylaxis:</b><br>&nbsp;&nbsp;&nbsp;3mg/kg/dose every 72h until CVL stopped or max of 6w"));
    }
      
    if (totalGestAgeDays <= 174) {

      let dobDate = new Date(dob);
      let TSHDates = [];
    
      // Get the current date without time for comparison
      let currentDate = new Date();
      currentDate.setHours(0, 0, 0, 0);
    
      // Helper function to format dates and apply CSS classes
      const formatAndApplyCssClass = (date, prefixText) => {
          let formattedDate = (date.getUTCMonth() + 1).toString().padStart(2, '0') + '-'
                              + date.getUTCDate().toString().padStart(2, '0') + '-'
                              + date.getUTCFullYear();
    
          // Convert date to a local date (without time) for comparison
          let localDate = new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate());
    
          // Determine the CSS class for the date text
          let cssClass = '';
          if (localDate < currentDate) {
              cssClass = 'past-date';
          } else if (localDate.getTime() === currentDate.getTime()) {
              cssClass = 'current-date';
          }
    
          // Return the date wrapped in HTML with the relevant CSS class.
          return `<span class="${cssClass}">${prefixText} ${formattedDate}</span><br>`;
      }
    
      // First HUS date after 7 days
      let firstHusDate = new Date(dobDate);
      firstHusDate.setUTCDate(dobDate.getUTCDate() + 30);
      TSHDates.push(formatAndApplyCssClass(firstHusDate, '&nbsp;&nbsp;30 days:'));
    
      // Second HUS date after 28 days
      let secondHusDate = new Date(dobDate);
      secondHusDate.setUTCDate(dobDate.getUTCDate() + 60);
      TSHDates.push(formatAndApplyCssClass(secondHusDate, '&nbsp;&nbsp;60 days:'));
    
      // Add a prefix to the array for the bold "HUS"
      TSHDates.unshift('<b>TSH & FreeT4:</b><br>');
    
      updatedTexts.push(TSHDates.join('')); // Join the array to make it a single string
    
    } else if (totalGestAgeDays <= 216) {
      let dobDate = new Date(dob);
      let TSHDates = [];
    
      // Get the current date without time for comparison
      let currentDate = new Date();
      currentDate.setHours(0, 0, 0, 0);
    
      // Helper function to format dates and apply CSS classes
      const formatAndApplyCssClass = (date, prefixText) => {
          let formattedDate = (date.getUTCMonth() + 1).toString().padStart(2, '0') + '-'
                              + date.getUTCDate().toString().padStart(2, '0') + '-'
                              + date.getUTCFullYear();
    
          // Convert date to a local date (without time) for comparison
          let localDate = new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate());
    
          // Determine the CSS class for the date text
          let cssClass = '';
          if (localDate < currentDate) {
              cssClass = 'past-date';
          } else if (localDate.getTime() === currentDate.getTime()) {
              cssClass = 'current-date';
          }
    
          // Return the date wrapped in HTML with the relevant CSS class.
          return `<span class="${cssClass}">${prefixText} ${formattedDate}</span><br>`;
      }
    
      // First HUS date after 30 days
      let firstHusDate = new Date(dobDate);
      firstHusDate.setUTCDate(dobDate.getUTCDate() + 30);
      TSHDates.push(formatAndApplyCssClass(firstHusDate, '&nbsp;&nbsp;30 days:'));
    
      // Add a prefix to the array for the bold "HUS"
      TSHDates.unshift('<b>TSH & FreeT4:</b><br>');
    
      updatedTexts.push(TSHDates.join('')); // Join the array to make it a single string
} else if (weight <= 1500){

  let dobDate = new Date(dob);
  let TSHDates = [];

  // Get the current date without time for comparison
  let currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);

  // Helper function to format dates and apply CSS classes
  const formatAndApplyCssClass = (date, prefixText) => {
      let formattedDate = (date.getUTCMonth() + 1).toString().padStart(2, '0') + '-'
                          + date.getUTCDate().toString().padStart(2, '0') + '-'
                          + date.getUTCFullYear();

      // Convert date to a local date (without time) for comparison
      let localDate = new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate());

      // Determine the CSS class for the date text
      let cssClass = '';
      if (localDate < currentDate) {
          cssClass = 'past-date';
      } else if (localDate.getTime() === currentDate.getTime()) {
          cssClass = 'current-date';
      }

      // Return the date wrapped in HTML with the relevant CSS class.
      return `<span class="${cssClass}">${prefixText} ${formattedDate}</span><br>`;
  }

  // First HUS date after 30 days
  let firstHusDate = new Date(dobDate);
  firstHusDate.setUTCDate(dobDate.getUTCDate() + 30);
  TSHDates.push(formatAndApplyCssClass(firstHusDate, '30 days:'));

  // Add a prefix to the array for the bold "HUS"
  TSHDates.unshift('<b>TSH & FreeT4:</b><br>');

  updatedTexts.push(TSHDates.join('')); // Join the array to make it a single string

}

      // Join all calculated texts into a single string separated by '<br />' and set the treatment text
      let finalTreatmentText = updatedTexts.join('<br />');
      setTreatmentText(finalTreatmentText);
      setShowTreatment(true);

      // Prepare the data to send
      let dataToSend = {
        userInputs: {
          gestAge,
          remainingGestAgeDays,
          dob,
          weight,
        },
        treatmentText: finalTreatmentText,
      };

      // Send the data to your Express server
      fetch('/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data: dataToSend }),
      })
      .then(response => response.json())
      .then(data => console.log(data))
      .catch((error) => {
        console.error('Error:', error);
      });
    } else {
      alert("Please fill out all the fields.");
    }
};

return (
  <div className="container">
    <img src={process.env.PUBLIC_URL + '/IMG_8020.jpg'} alt="Top right decoration" className="top-right-image" />
    <h1 className="header">NICU CARE CALCULATOR</h1>
    <h2 className="sub-header">(PDX Fort Worth)</h2>
    <form>
      <div className="input-group">
        <label>Birth Gestational Age:</label>
        <div className="input-row">
          <div className="input-with-unit">
            <input className="input-small" placeholder="Weeks" type="number" onChange={(e) => setGestAge(e.target.value)} />
            <span className="unit">w</span>
          </div>
          <div className="input-with-unit">
            <input className="input-small" placeholder="Days" type="number" onChange={(e) => setRemainingGestAgeDays(e.target.value)} />
            <span className="unit">d</span>
          </div>
        </div>
      </div>
      <div className="input-group">
        <label>DOB:</label>
        <input className="input-medium" type="date" onChange={(e) => setDob(e.target.value)} />
      </div>
      <div className="input-group">
        <label>Birth weight:</label>
        <div className="input-with-unit">
          <input className="input-medium" placeholder="Grams" type="number" onChange={(e) => setWeight(e.target.value)} />
          <span className="unit">g</span>
        </div>
      </div>
      <button type="button" className="submit-btn" onClick={submitData}>Submit</button>
    </form>
    {showTreatment && (
      <div className="treatment-container">
        <div className="treatment-bubble">
          <p className="treatment-text" dangerouslySetInnerHTML={{ __html: treatmentText }}></p>
        </div>
      </div>
    )}
    <div className="disclaimer">
      <p>
        <strong>Disclaimer:</strong> The information and tools provided on this website are intended to support neonatologists in the management and care of newborns using the Pediatrix Fort Worth protocol. However, I (the developer of this site) am in no way associated with Pediatrix Fort Worth. The calculations and treatment dates generated are based on the data provided and should be used as a guide only. It is imperative to recognize that each newborn is unique, and variations in clinical conditions and response to treatments should be taken into consideration. All healthcare professionals are urged to exercise clinical judgment and refer to the relevant medical literature and guidelines in conjunction with using the information provided here. The creators and contributors of this website shall not be held liable for any inaccuracies, errors, or for any actions taken based on the information contained herein. Patient safety and appropriate care should always be the priority, and consultation with experienced colleagues or specialists is recommended when necessary. For any inquiries about creating a website specific to your practice, or to report an error/bug, please contact me at ca.jobson@yahoo.com or text me at 817-319-8996.
      </p>
    </div>
    <footer className="footer">Project made by Cameron.J</footer>
  </div>
);


  
  
  
  

}

export default NeoTool;
