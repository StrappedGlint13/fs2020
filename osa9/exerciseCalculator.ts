interface exValues {
    exDays: number[]
}



  const exCalculator = (exDays: Array<number>) => {
    const trainingDays = exDays.filter(x => x > 0)
    let success = true
    let rating = 0;
    let ratingDescripton = ''
    
    if(exDays.includes(0)) {
        success = false
    }

    const sum = trainingDays.reduce((sum, ex) => sum + ex, 0)
    const session = trainingDays.reduce((sum, ex) => sum + 1, 0)
    const average = sum / session

    if (sum  > 7) {
        ratingDescripton = 'excellent!'
        rating = 3
    } else if (sum < 5 && sum > 2) {
        ratingDescripton = 'good, but could have been better'
        rating = 2
    } else {
        ratingDescripton = 'poor'
        rating = 1
    }


    const data = {
        periodLength: exDays.length,
        trainingDays: trainingDays.length,
        success: success,
        rating: rating,
        ratingDescripton: ratingDescripton,
        target: 2,
        average: average

    }

    console.log(data)
  
    
}
    
 try {
      exCalculator([1,2,3,4,5,6,7])
  } catch (e) {
    console.log('Error, something bad happened, message: ', e.message);
  }