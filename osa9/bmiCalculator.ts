interface calcValues {
    value1: number;
    value2: number;
  }
  
  const parseArguments = (args: Array<string>): calcValues => {
    if (args.length < 4) throw new Error('Not enough arguments');
    if (args.length > 4) throw new Error('Too many arguments');
    

    
    if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
      return {
        value1: Number(args[2]),
        value2: Number(args[3])
      }
    } else {
      throw new Error('Provided values were not numbers!');
    }
  }


  const calculator = (height: number, mass: number, printText: string) => {
    console.log(printText)
    
  }
  
  try {
    const { value1, value2 } = parseArguments(process.argv);
    const height = value1 * 0.01
    const bmi = value2 / (height * height)

    if (bmi < 15) {
        calculator(value1, value2, `Very severely underweight`);
    } else if (bmi > 15 && bmi < 16) {
        calculator(value1, value2, `Severely underweight`);
    } else if (bmi > 16 && bmi < 18.5 ) {
        calculator(value1, value2, `Underweight`);
    } else if (bmi > 18.5 && bmi < 25 ) {
        calculator(value1, value2, `Normal (healthy weight) `);
    } else if (bmi > 25 && bmi < 30 ) {
        calculator(value1, value2, `Overweight `);
    } else if (bmi > 30 && bmi < 35 ) {
        calculator(value1, value2, `Obese Class I (Moderately obese)  `);
    } else if (bmi > 35 && bmi < 40 ) {
        calculator(value1, value2, `Obese Class II (Severely obese)  `);
    } else if (bmi > 40) {
        calculator(value1, value2, `Obese Class III (Very severely obese)  `);
    }
  } catch (e) {
    console.log('Error, something bad happened, message: ', e.message);
  }