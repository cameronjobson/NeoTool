

// Function to adjust the weeks and print the date
function adjustWeeksAndPrint(date, targetWeeks, gestAgeWeeks, gestAgeDays, message) {
    // Subtract the gestational age in days
    date.setDate(date.getDate() - (gestAgeWeeks * 7 + gestAgeDays));
    
    // Add the target weeks
    date.setDate(date.getDate() + targetWeeks * 7);
    
    console.log(`${message}: ${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`);
}

// Example usage:
let date = new Date();
adjustWeeksAndPrint(date, 35, 20, 6, "DEBM stop");

function addDaysAndPrint(date, days, message) {
    // Add the target days to the date of birth
    let newDate = new Date(date.getTime());
    newDate.setDate(date.getDate() + days);

    // Print the new date
    console.log(`${message}: ${newDate.getMonth()+1}/${newDate.getDate()}/${newDate.getFullYear()}`);
}

function calculateHUDdates(date) {
    let firstDate = new Date(date.getTime());
    let secondDate = new Date(date.getTime());
    let thirdDate = new Date(date.getTime());

    // DOB + 7 days
    firstDate.setDate(date.getDate() + 7);
    console.log(`First HUS date: ${firstDate.getMonth()+1}/${firstDate.getDate()}/${firstDate.getFullYear()}`);

    // DOB + 28 days
    secondDate.setDate(date.getDate() + 28);
    console.log(`Second HUS date: ${secondDate.getMonth()+1}/${secondDate.getDate()}/${secondDate.getFullYear()}`);

    // DOB + 40 weeks
    thirdDate.setDate(date.getDate() + (40 * 7));
    console.log(`Third HUS date: ${thirdDate.getMonth()+1}/${thirdDate.getDate()}/${thirdDate.getFullYear()}`);
}

function postMenseExam(date, gestAgeWeeks, gestAgeDays) {
    let postMenseAgeWeeks;

    if(gestAgeWeeks < 28) {
        postMenseAgeWeeks = 31;
    } else if(gestAgeWeeks < 29) {
        postMenseAgeWeeks = 32;
    } else if(gestAgeWeeks < 30) {
        postMenseAgeWeeks = 33;
    } else if(gestAgeWeeks < 31) {
        postMenseAgeWeeks = 34;
    } else if(gestAgeWeeks < 32) {
        postMenseAgeWeeks = 35;
    } else if(gestAgeWeeks < 33) {
        postMenseAgeWeeks = 36;
    } else {
        postMenseAgeWeeks = 36;
    }

    let diffDays = (postMenseAgeWeeks * 7) - (gestAgeWeeks * 7 + gestAgeDays);

    let examDate = new Date(date.getTime());
    examDate.setDate(date.getDate() + diffDays);

    console.log(`First ROP exam at ${postMenseAgeWeeks} weeks: ${examDate.getMonth()+1}/${examDate.getDate()}/${examDate.getFullYear()}`);
}

function main() {
    const weight = Number(prompt("Enter the baby's weight in grams: "));
    const weeks = Number(prompt("Enter the baby's gestational age in weeks: "));
    const days = Number(prompt("Enter the remaining gestational age in days: "));
    const birthDateString = prompt("Enter the baby's date of birth (MM-DD-YYYY): ");
    const birthDate = new Date(birthDateString);

    const totalDays = (weeks * 7) + days; // Convert weeks and days into total days

    if (weight >=0 && weight <= 1250 && totalDays >= 0 && totalDays <= 195) {
        adjustWeeksAndPrint(birthDate, 35, weeks, days, "DEBM stop at 1500g+35w");
        adjustWeeksAndPrint(birthDate, 33, weeks, days, "Prolacta stop at 1500g+33w");
        adjustWeeksAndPrint(birthDate, 35, weeks, days, "Probiotics stop at 1500g+35w");
        console.log("MVI/Fe at full feed and ≥14dol");
        addDaysAndPrint(birthDate, 14, "(14 dol)");
        console.log();
        console.log("Vit K 0.3-0.5mg/kg IM");
        console.log("ROP exam");
        postMenseExam(birthDate, weeks, days);
        console.log("HUS @1w+1m+term or D/C");
        calculateHUDdates(birthDate);
        adjustWeeksAndPrint(birthDate, 32, weeks, days, "ECHO @32w if vent or SGA");
        adjustWeeksAndPrint(birthDate, 36, weeks, days, "ECHO @36w if on resp supp");
        console.log("PNS:mod/sev BPD risk>60% at 14,21,28d");
        addDaysAndPrint(birthDate, 14, "(14 days)");
        addDaysAndPrint(birthDate, 21, "(21 days)");
        addDaysAndPrint(birthDate, 28, "(28 days)");
        console.log();
        console.log("NIPPV");
        adjustWeeksAndPrint(birthDate, 32, weeks, days, "caffeine til 32w+no apnea off PP");
        console.log("Synagis");
        console.log("NEST f/u Tier 1b");
    } else if (weight > 1251 && weight <= 1500 && totalDays <= 195) {
        adjustWeeksAndPrint(birthDate, 35, weeks, days, "DEBM stop");
        // ...repeat for other dates...
    } else {
        // You can add more conditions here for other weight and gestational age ranges
    }
}

main();
