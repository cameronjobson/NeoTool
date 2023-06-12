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
  
    // Format date as MM-DD-YYYY
    let examDateFormatted = (dobDate.getUTCMonth() + 1).toString().padStart(2, '0') + '-'
                            + dobDate.getUTCDate().toString().padStart(2, '0') + '-'
                            + dobDate.getUTCFullYear();
  
    // Check if the date is today or in the past
    let today = new Date();
    today.setHours(0, 0, 0, 0);
  
    let color;
    if (dobDate < today) {
      color = 'red';
    } else if (dobDate.getTime() === today.getTime()) {
      color = 'green';
    } else {
      color = 'black';
    }
  
    return `<span style="color: ${color};"><b>ROP</b> First Exam Due near week of: ${examDateFormatted}</span>`;
  };
  

  
  const calculateHUSDates = (dob, gestAge, remainingGestAgeDays) => {
    let dobDate = new Date(dob);
    let husDates = [];
  
    let today = new Date();
    today.setHours(0, 0, 0, 0);
  
    // Helper function to format dates and color code them
    const formatAndColorCodeDate = (date) => {
      let formattedDate = (date.getUTCMonth() + 1).toString().padStart(2, '0') + '-'
                        + date.getUTCDate().toString().padStart(2, '0') + '-'
                        + date.getUTCFullYear();
  
      let color;
      if (date < today) {
        color = 'red';
      } else if (date.getTime() === today.getTime()) {
        color = 'green';
      } else {
        color = 'black';
      }
  
      return `<span style="color: ${color};">${formattedDate}</span>`;
    }
  
    // First HUS date after 7 days
    let firstHusDate = new Date(dobDate);
    firstHusDate.setUTCDate(dobDate.getUTCDate() + 7);
    husDates.push(`&nbsp;&nbsp;First HUS date @ 7 days: ${formatAndColorCodeDate(firstHusDate)}`);
  
    // Second HUS date after 28 days
    let secondHusDate = new Date(dobDate);
    secondHusDate.setUTCDate(dobDate.getUTCDate() + 28);
    husDates.push(`&nbsp;&nbsp;Second HUS date @ 28 days: ${formatAndColorCodeDate(secondHusDate)}`);
  
    // Third HUS date after 40 weeks
    let totalGestAgeInDays = gestAge * 7 + parseInt(remainingGestAgeDays);
    let thirdHusDate = new Date(dobDate);
    thirdHusDate.setUTCDate(dobDate.getUTCDate() - totalGestAgeInDays + 40 * 7);
    husDates.push(`&nbsp;&nbsp;Third HUS date @ 40 weeks: ${formatAndColorCodeDate(thirdHusDate)}`);
  
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

    // Determine color
    let color;
    if (dobDate < today) {
      color = 'red';
    } else if (dobDate.getTime() === today.getTime()) {
      color = 'green';
    } else {
      color = 'black';
    }

    return `${prefixText} <span style="color: ${color};">${newDateFormatted}</span>`;
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
        calculatedTexts.push(calculateTreatmentDate(dob, gestAge, remainingGestAgeDays, 35, "<b>Probiotics</b> stop at 1500g+35w:"));
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
        calculatedTexts.push(printText("<b>HMF/PTF</b> until 3.5kg then D/C feeds"));
        calculatedTexts.push(calculateTreatmentDate(dob, gestAge, remainingGestAgeDays, 35, "<b>Probiotics</b> stop at 1500g+35w:"));
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
        calculatedTexts.push(calculateTreatmentDate(dob, gestAge, remainingGestAgeDays, 35, "<b>Probiotics</b> stop at 1500g+35w:"));
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
        calculatedTexts.push(calculateTreatmentDate(dob, gestAge, remainingGestAgeDays, 35, "<b>Probiotics</b> stop at 35w:"));
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
        calculatedTexts.push(calculateTreatmentDate(dob, gestAge, remainingGestAgeDays, 35, "<b>Probiotics</b> stop at 35w:"));
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
        

      } else if (weight > 2000 && weight <= 2200 && totalGestAgeDays > 153 && totalGestAgeDays <= 167) {
        calculatedTexts.push(calculateTreatmentDate(dob, gestAge, remainingGestAgeDays, 35, "<b>DEBM</b> stop at 35w:"));
        calculatedTexts.push(printText("<b>HMF/PTF</b> until 3.5kg then D/C feeds"));
        calculatedTexts.push(calculateTreatmentDate(dob, gestAge, remainingGestAgeDays, 35, "<b>Probiotics</b> stop at 35w:"));
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
        calculatedTexts.push(calculateTreatmentDate(dob, gestAge, remainingGestAgeDays, 35, "<b>Probiotics</b> stop at 1500g+35w:"));
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
        calculatedTexts.push(calculateTreatmentDate(dob, gestAge, remainingGestAgeDays, 35, "<b>Probiotics</b> stop at 35w:"));
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
        calculatedTexts.push(calculateTreatmentDate(dob, gestAge, remainingGestAgeDays, 35, "<b>Probiotics</b> stop at 35w:"));
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
        

      } else if (weight > 2000 && weight <= 2200 && ((totalGestAgeDays > 0 && totalGestAgeDays <= 153) || (totalGestAgeDays > 167 && totalGestAgeDays <= 195))) {
        calculatedTexts.push(calculateTreatmentDate(dob, gestAge, remainingGestAgeDays, 35, "<b>DEBM</b> stop at 35w:"));
        calculatedTexts.push(printText("<b>HMF/PTF</b> until 3.5kg then D/C feeds"));
        calculatedTexts.push(calculateTreatmentDate(dob, gestAge, remainingGestAgeDays, 35, "<b>Probiotics</b> stop at 35w:"));
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
  calculatedTexts.push(calculateTreatmentDate(dob, gestAge, remainingGestAgeDays, 35, "<b>Probiotics</b> stop at 1500g+35w:"));
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
  calculatedTexts.push(calculateTreatmentDate(dob, gestAge, remainingGestAgeDays, 35, "<b>Probiotics</b> stop at 1500g+35w:"));
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
  calculatedTexts.push(calculateTreatmentDate(dob, gestAge, remainingGestAgeDays, 35, "<b>Probiotics</b> stop at 35w:"));
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
  calculatedTexts.push(calculateTreatmentDate(dob, gestAge, remainingGestAgeDays, 35, "<b>Probiotics</b> stop at 35w:"));
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

} else if (weight > 2000 && weight <= 2200 && totalGestAgeDays > 195 && totalGestAgeDays <= 202) {
  calculatedTexts.push(calculateTreatmentDate(dob, gestAge, remainingGestAgeDays, 35, "<b>DEBM</b> stop at 35w:"));
  calculatedTexts.push(printText("<b>HMF/PTF</b> until 3.5kg then D/C feeds"));
  calculatedTexts.push(calculateTreatmentDate(dob, gestAge, remainingGestAgeDays, 35, "<b>Probiotics</b> stop at 35w:"));
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
  calculatedTexts.push(calculateTreatmentDate(dob, gestAge, remainingGestAgeDays, 33, "<b>Prolactin</b> stop at 1500g+33w:"));
  calculatedTexts.push(calculateTreatmentDate(dob, gestAge, remainingGestAgeDays, 35, "<b>Probiotics</b> stop at 1500g+35w:"));
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
  calculatedTexts.push(calculateTreatmentDate(dob, gestAge, remainingGestAgeDays, 30, "<b>NIPPV</b> if under 30w+0d:"));
  calculatedTexts.push(calculateTreatmentDate(dob, gestAge, remainingGestAgeDays, 32, "<b>Caffeine</b> til 32w+no apnea off PP:"));
  calculatedTexts.push(addDaysToDOB(dob, 28, "<b>Synagis</b> if O2 at least 28d after birth"));
  calculatedTexts.push(printText("<b>NEST</b> f/u Tier 2"));
  calculatedTexts.push(addDaysToDOB(dob, 30, "<b>Hep B Vac</b> @30 days"));


} else if (weight > 1250 && weight <= 1500 && totalGestAgeDays > 202 && totalGestAgeDays <= 216) {
  calculatedTexts.push(calculateTreatmentDate(dob, gestAge, remainingGestAgeDays, 35, "<b>DEBM</b> stop at 1500g+35w:"));
  calculatedTexts.push(printText("<b>HMF/PTF</b> until 3.5kg then D/C feeds"));
  calculatedTexts.push(calculateTreatmentDate(dob, gestAge, remainingGestAgeDays, 35, "<b>Probiotics</b> stop at 1500g+35w:"));
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
  calculatedTexts.push(calculateTreatmentDate(dob, gestAge, remainingGestAgeDays, 30, "<b>NIPPV</b> if under 30w+0d:"));
  calculatedTexts.push(calculateTreatmentDate(dob, gestAge, remainingGestAgeDays, 32, "<b>Caffeine</b> til 32w+no apnea off PP:"));
  calculatedTexts.push(addDaysToDOB(dob, 28, "<b>Synagis</b> if O2 at least 28d after birth"));
  calculatedTexts.push(printText("<b>NEST</b> f/u Tier 2"));
  calculatedTexts.push(addDaysToDOB(dob, 30, "<b>Hep B Vac</b> @30 days"));


} else if (weight > 1500 && weight <= 1800 && totalGestAgeDays > 202 && totalGestAgeDays <= 216) {
  calculatedTexts.push(calculateTreatmentDate(dob, gestAge, remainingGestAgeDays, 35, "<b>DEBM</b> stop at 35w:"));
  calculatedTexts.push(printText("<b>HMF/PTF</b> until 3.5kg then D/C feeds"));
  calculatedTexts.push(calculateTreatmentDate(dob, gestAge, remainingGestAgeDays, 35, "<b>Probiotics</b> stop at 35w:"));
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
  calculatedTexts.push(calculateTreatmentDate(dob, gestAge, remainingGestAgeDays, 30, "<b>NIPPV</b> if under 30w+0d:"));
  calculatedTexts.push(calculateTreatmentDate(dob, gestAge, remainingGestAgeDays, 32, "<b>Caffeine</b> til 32w+no apnea off PP:"));
  calculatedTexts.push(addDaysToDOB(dob, 28, "<b>Synagis</b> if O2 at least 28d after birth"));
  calculatedTexts.push(printText("<b>NEST</b> f/u Tier 2"));
  calculatedTexts.push(addDaysToDOB(dob, 30, "<b>Hep B Vac</b> @30 days"));


} else if (weight > 1800 && weight <= 2000 && totalGestAgeDays > 202 && totalGestAgeDays <= 216) {
  calculatedTexts.push(calculateTreatmentDate(dob, gestAge, remainingGestAgeDays, 35, "<b>DEBM</b> stop at 35w:"));
  calculatedTexts.push(printText("<b>HMF/PTF</b> until 3.5kg then D/C feeds"));
  calculatedTexts.push(calculateTreatmentDate(dob, gestAge, remainingGestAgeDays, 35, "<b>Probiotics</b> stop at 35w:"));
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
  calculatedTexts.push(calculateTreatmentDate(dob, gestAge, remainingGestAgeDays, 30, "<b>NIPPV</b> if under 30w+0d:"));
  calculatedTexts.push(calculateTreatmentDate(dob, gestAge, remainingGestAgeDays, 32, "<b>Caffeine</b> til 32w+no apnea off PP:"));
  calculatedTexts.push(addDaysToDOB(dob, 28, "<b>Synagis</b> if O2 at least 28d after birth"));
  calculatedTexts.push(printText("<b>NEST</b> f/u Tier 2"));
  calculatedTexts.push(addDaysToDOB(dob, 30, "<b>Hep B Vac</b> @30 days"));


} else if (weight > 2000 && weight <= 2200 && totalGestAgeDays > 202 && totalGestAgeDays <= 216) {
  calculatedTexts.push(calculateTreatmentDate(dob, gestAge, remainingGestAgeDays, 35, "<b>DEBM</b> stop at 35w:"));
  calculatedTexts.push(printText("<b>HMF/PTF</b> until 3.5kg then D/C feeds"));
  calculatedTexts.push(calculateTreatmentDate(dob, gestAge, remainingGestAgeDays, 35, "<b>Probiotics</b> stop at 35w:"));
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
  calculatedTexts.push(calculateTreatmentDate(dob, gestAge, remainingGestAgeDays, 30, "<b>NIPPV</b> if under 30w+0d:"));
  calculatedTexts.push(calculateTreatmentDate(dob, gestAge, remainingGestAgeDays, 32, "<b>Caffeine</b> til 32w+no apnea off PP:"));
  calculatedTexts.push(addDaysToDOB(dob, 28, "<b>Synagis</b> if O2 at least 28d after birth"));
  calculatedTexts.push(printText("<b>NEST</b> f/u Tier 2"));


  // END OF ROW 3

} else if (weight > 0 && weight <= 1250 && totalGestAgeDays > 216 && totalGestAgeDays <= 223) {
  calculatedTexts.push(calculateTreatmentDate(dob, gestAge, remainingGestAgeDays, 35, "<b>DEBM</b> stop at 1500g+35w:"));
  calculatedTexts.push(calculateTreatmentDate(dob, gestAge, remainingGestAgeDays, 33, "<b>prolactin</b> stop at 1500g+33w:"));
  calculatedTexts.push(calculateTreatmentDate(dob, gestAge, remainingGestAgeDays, 35, "<b>Probiotics</b> stop at 1500g+35w:"));
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
  calculatedTexts.push(calculateTreatmentDate(dob, gestAge, remainingGestAgeDays, 35, "<b>Probiotics</b> stop at 1500g+35w:"));
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
  calculatedTexts.push(calculateTreatmentDate(dob, gestAge, remainingGestAgeDays, 35, "<b>Probiotics</b> stop at 35w:"));
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
  calculatedTexts.push(calculateTreatmentDate(dob, gestAge, remainingGestAgeDays, 35, "<b>Probiotics</b> stop at 35w:"));
  calculatedTexts.push(addDaysToDOB(dob, 14, "<b>VitD/Fe</b> at full feed and ≥14dol"));
  calculatedTexts.push(printText("<b>Vit K</b> 1mg IM"));
  calculatedTexts.push(addDaysToDOB(dob, 28, "<b>ROP Exam</b> IF UNSTABLE @ 4w of age"));
  calculatedTexts.push(printText("<b>ECHO:</b>"));
  calculatedTexts.push(calculateTreatmentDate(dob, gestAge, remainingGestAgeDays, 36, "&nbsp;&nbsp;&nbsp;@36w if on resp supp:"));
  calculatedTexts.push(addDaysToDOB(dob, 28, "<b>Synagis</b> if O2 at least 28d after birth"));
  calculatedTexts.push(printText("<b>NEST</b> f/u Tier 2"));
  calculatedTexts.push(addDaysToDOB(dob, 30, "<b>Hep B Vac</b> @30 days"));
  

} else if (weight > 2000 && weight <= 2200 && totalGestAgeDays > 216 && totalGestAgeDays <= 223) {
  calculatedTexts.push(calculateTreatmentDate(dob, gestAge, remainingGestAgeDays, 35, "<b>DEBM</b> stop at 35w:"));
  calculatedTexts.push(printText("<b>HMF/PTF</b> until 3.5kg then D/C feeds"));
  calculatedTexts.push(calculateTreatmentDate(dob, gestAge, remainingGestAgeDays, 35, "<b>Probiotics</b> stop at 35w:"));
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
  calculatedTexts.push(calculateTreatmentDate(dob, gestAge, remainingGestAgeDays, 35, "<b>Probiotics</b> stop at 1500g+35w:"));
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
  calculatedTexts.push(calculateTreatmentDate(dob, gestAge, remainingGestAgeDays, 35, "<b>Probiotics</b> stop at 1500g+35w:"));
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
  

} else if (weight > 2000 && weight <= 2200 && totalGestAgeDays > 223 && totalGestAgeDays <= 230) {
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
  calculatedTexts.push(calculateTreatmentDate(dob, gestAge, remainingGestAgeDays, 35, "<b>Probiotics</b> stop at 1500g+35w:"));
  calculatedTexts.push(printText("<b>Probiotics</b> stop at 1500g"));
  calculatedTexts.push(addDaysToDOB(dob, 14, "<b>MVI/Fe</b> at full feed and ≥14dol:"));
  calculatedTexts.push(printText("<b>Vit K</b> 0.3-0.5mg/kg IM"));
  calculatedTexts.push(calculatePostMenstrualExamDate(dob, gestAge, remainingGestAgeDays));
  calculatedTexts.push(printText("<b>Caffeine</b> til apnea free off PP"));
  calculatedTexts.push(printText("<b>NEST</b> f/u Tier 2"));
  calculatedTexts.push(addDaysToDOB(dob, 30, "<b>Hep B Vac</b> @30 days"));

} else if (weight > 1250 && weight <= 1500 && totalGestAgeDays > 230 && totalGestAgeDays < 245) {
  calculatedTexts.push(calculateTreatmentDate(dob, gestAge, remainingGestAgeDays, 35, "<b>DEBM</b> stop at 1500g+35w:"));
  calculatedTexts.push(printText("<b>HMF/PTF</b> until 3.5kg then D/C feeds"));
  calculatedTexts.push(calculateTreatmentDate(dob, gestAge, remainingGestAgeDays, 35, "<b>Probiotics</b> stop at 1500g+35w:"));
  calculatedTexts.push(printText("<b>Probiotics</b> stop at 1500g"));
  calculatedTexts.push(addDaysToDOB(dob, 14, "<b>VitD/Fe</b> at full feed and ≥14dol:"));
  calculatedTexts.push(printText("<b>Vit K</b> 0.3-0.5mg/kg IM, 1mg if 1500g"));
  calculatedTexts.push(calculatePostMenstrualExamDate(dob, gestAge, remainingGestAgeDays));
  calculatedTexts.push(printText("<b>Caffeine</b> til apnea free off PP"));
  calculatedTexts.push(printText("<b>NEST</b> f/u Tier 2"));
  calculatedTexts.push(addDaysToDOB(dob, 30, "<b>Hep B Vac</b> @30 days"));

} else if (weight > 1500 && weight <= 18000 && totalGestAgeDays > 230 && totalGestAgeDays < 245) {
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

} else if (weight > 2000 && weight <= 2200 && totalGestAgeDays > 230 && totalGestAgeDays < 245) {
  calculatedTexts.push(addDaysToDOB(dob, 7, "<b>DEBM</b> stop at 1500g or max 7d:"));
  calculatedTexts.push(printText("<b>HMF/PTF</b> until 3.5kg then D/C feeds"));
  calculatedTexts.push(addDaysToDOB(dob, 14, "<b>VitD/Fe</b> at full feed and ≥14dol:"));
  calculatedTexts.push(printText("<b>Vit K</b> 1mg IM"));
  calculatedTexts.push(printText("<b>ECI</b> if SGA, (ECI/Nest if meet criteria)"));

  //END OF ROW 6

} else if (weight > 0 && weight <= 1250 && totalGestAgeDays >= 245 && totalGestAgeDays <= 301) {
  calculatedTexts.push(printText("<b>DEBM</b> stop at 1500g"));
  calculatedTexts.push(printText("<b>Prolacta</b> stop at 1500g"));
  calculatedTexts.push(printText("<b>Probiotics</b> stop at 1500g"));
  calculatedTexts.push(addDaysToDOB(dob, 14, "<b>MVI/Fe</b> at full feed and ≥14dol:"));
  calculatedTexts.push(printText("<b>Vit K</b> 0.3-0.5mg/kg IM"));
  calculatedTexts.push(calculatePostMenstrualExamDate(dob, gestAge, remainingGestAgeDays));
  calculatedTexts.push(printText("<b>Caffeine</b> til apnea free off PP"));
  calculatedTexts.push(printText("<b>NEST</b> f/u Tier 2"));
  calculatedTexts.push(addDaysToDOB(dob, 30, "<b>Hep B Vac</b> @30 days"));

} else if (weight > 1250 && weight <= 1500 && totalGestAgeDays >= 245 && totalGestAgeDays <= 301) {
  calculatedTexts.push(printText("<b>DEBM</b> stop at 1500g"));
  calculatedTexts.push(printText("<b>HMF/PTF</b> until 3.5kg then D/C feeds"));
  calculatedTexts.push(printText("<b>Probiotics</b> stop at 1500g"));
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

} else if (weight > 2000 && weight <= 2200 && totalGestAgeDays >= 245 && totalGestAgeDays <= 301) {
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
  
      // Join all calculated texts into a single string separated by '<br />' and set the treatment text
      setTreatmentText(calculatedTexts.join('<br />'));
    } else {
      alert("Please fill out all the fields.");
    }
  };

  
  return (
    <div className="container">
      <h1>NICU CARE CALCULATOR </h1>
      <h2>(PDX Fort Worth) </h2>
      <form>
        <div>
          <label>Birth Gestational Age:</label>
          <br/>
          <input className="input-small" type="number" onChange={(e) => setGestAge(e.target.value)} />w
          <input className="input-small" type="number" onChange={(e) => setRemainingGestAgeDays(e.target.value)} />d
        </div>
        <div>
          <label>DOB: </label>
          <input type="date" onChange={(e) => setDob(e.target.value)} />
        </div>
        <div>
          <label>Birth weight: </label>
          <input className="input-small" type="number" onChange={(e) => setWeight(e.target.value)} /> g
        </div>
        <button type="button" onClick={submitData}>Submit</button>
      </form>
      <p dangerouslySetInnerHTML={{ __html: treatmentText }}></p>
      <div className="disclaimer">
        <p><strong>Disclaimer:</strong> The information and tools provided on this website are intended to support neonatologists in the management and care of newborns using the Pediatrix Fort Worth protocol. The calculations and treatment dates generated are based on the data provided and should be used as a guide only. It is imperative to recognize that each newborn is unique, and variations in clinical conditions and response to treatments should be taken into consideration. All healthcare professionals are urged to exercise clinical judgment and refer to the relevant medical literature and guidelines in conjunction with using the information provided here. The creators and contributors of this website shall not be held liable for any inaccuracies, errors, or for any actions taken based on the information contained herein. Patient safety and appropriate care should always be the priority, and consultation with experienced colleagues or specialists is recommended when necessary. For any inquiries about creating a website specific to your practice, or to report a error/bug, please contact me at ca.jobson@yahoo.com.</p>
      </div>
    </div>
  );
  
  
  
  

}

export default NeoTool;
