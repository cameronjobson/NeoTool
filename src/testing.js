import React, { useState } from 'react';

function MainPage() {
  const [weight, setWeight] = useState('');
  const [weeks, setWeeks] = useState('');
  const [days, setDays] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [output, setOutput] = useState('');
  

// Function to adjust weeks and print the date
const adjustWeeksAndPrint = (date, targetWeeks, gestAgeWeeks, gestAgeDays, message) => {
  let newDate = new Date(date.getTime());
  newDate.setDate(newDate.getDate() - (gestAgeWeeks * 7 + gestAgeDays));
  newDate.setDate(newDate.getDate() + targetWeeks * 7);
  setOutput(prevOutput => prevOutput + `${message}: ${newDate.getMonth()+1}/${newDate.getDate()}/${newDate.getFullYear()}\n`);
}

// Function to add days and print
const addDaysAndPrint = (date, days, message) => {
  let newDate = new Date(date.getTime());
  newDate.setDate(newDate.getDate() + days);
  setOutput(prevOutput => prevOutput + `${message}: ${newDate.getMonth()+1}/${newDate.getDate()}/${newDate.getFullYear()}\n`);
}

function calculateHUDdates(date) {
  let firstDate = new Date(date.getTime());
  let secondDate = new Date(date.getTime());
  let thirdDate = new Date(date.getTime());

  // DOB + 7 days
  firstDate.setDate(date.getDate() + 7);
  setOutput(prevOutput => prevOutput + `First HUS date: ${firstDate.getMonth()+1}/${firstDate.getDate()}/${firstDate.getFullYear()}\n`);

  // DOB + 28 days
  secondDate.setDate(date.getDate() + 28);
  setOutput(prevOutput => prevOutput + `Second HUS date: ${secondDate.getMonth()+1}/${secondDate.getDate()}/${secondDate.getFullYear()}\n`);

  // DOB + 40 weeks
  thirdDate.setDate(date.getDate() + (40 * 7));
  setOutput(prevOutput => prevOutput + `Third HUS date: ${thirdDate.getMonth()+1}/${thirdDate.getDate()}/${thirdDate.getFullYear()}\n`);
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

  setOutput(prevOutput => prevOutput + `First ROP exam at ${postMenseAgeWeeks} weeks: ${examDate.getMonth()+1}/${examDate.getDate()}/${examDate.getFullYear()}\n`);
}


  // Main function to calculate the dates
  const main = () => {
    try {
    const birthDateObj = new Date(birthDate);
    const totalDays = (weeks * 7) + days;

    if (weight >=0 && weight <= 1250 && totalDays >= 0 && totalDays <= 195) {
      // Call necessary functions with the appropriate parameters
      adjustWeeksAndPrint(birthDateObj, 35, weeks, days, "DEBM stop at 1500g+35w");
      adjustWeeksAndPrint(birthDateObj, 33, weeks, days, "Prolacta stop at 1500g+33w");
      adjustWeeksAndPrint(birthDateObj, 35, weeks, days, "Probiotics stop at 1500g+35w");
      setOutput(prevOutput => prevOutput + "MVI/Fe at full feed and ≥14dol\n");
      addDaysAndPrint(birthDateObj, 14, "(14 dol)");
      setOutput(prevOutput => prevOutput + "\nVit K 0.3-0.5mg/kg IM\nROP exam\n");
      postMenseExam(birthDateObj, weeks, days);
      setOutput(prevOutput => prevOutput + "HUS @1w+1m+term or D/C\n");
      calculateHUDdates(birthDateObj);
      adjustWeeksAndPrint(birthDateObj, 32, weeks, days, "ECHO @32w if vent or SGA");
      adjustWeeksAndPrint(birthDateObj, 36, weeks, days, "ECHO @36w if on resp supp");
      setOutput(prevOutput => prevOutput + "PNS:mod/sev BPD risk>60% at 14,21,28d\n");
      addDaysAndPrint(birthDateObj, 14, "(14 days)");
      addDaysAndPrint(birthDateObj, 21, "(21 days)");
      addDaysAndPrint(birthDateObj, 28, "(28 days)");
      setOutput(prevOutput => prevOutput + "\nNIPPV\n");
      adjustWeeksAndPrint(birthDateObj, 32, weeks, days, "caffeine til 32w+no apnea off PP");
      setOutput(prevOutput => prevOutput + "Synagis\nNEST f/u Tier 1b\n");
      //... calculations for this weight and gestational age range ...
    } else if (weight > 1251 && weight <= 1500 && totalDays <= 195) {
      adjustWeeksAndPrint(birthDateObj, 35, weeks, days, "DEBM stop");
      //... calculations for this weight and gestational age range ...
    } else {
      // You can add more conditions here for other weight and gestational age ranges
    }
  } catch (error) {
    console.error(error); // This will print the error to your console
    setOutput(`An error occurred: ${error.message}`); // This will set the error message as your output
  }
  };

// Function to handle form submission
const handleSubmit = (e) => {
  e.preventDefault();
  console.log("Button Clicked!"); // Add this line
  setOutput('');  // Clear previous output before new calculation
  try {
    main();
  } catch (error) {
    console.error(error);
    setOutput(`An error occurred: ${error.message}`);
  }
};


  // Component rendering
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="number" placeholder="Weight" value={weight} onChange={(e) => setWeight(e.target.value)} />
        <input type="number" placeholder="Weeks" value={weeks} onChange={(e) => setWeeks(e.target.value)} />
        <input type="number" placeholder="Days" value={days} onChange={(e) => setDays(e.target.value)} />
        <input type="date" placeholder="Birth Date" value={birthDate} onChange={(e) => setBirthDate(e.target.value)} />
        <button type="submit">Submit</button>
      </form>
      <pre>{output}</pre> {/* Display the output */}
    </div>
  );
}

export default MainPage;
