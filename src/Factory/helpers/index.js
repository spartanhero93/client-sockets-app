export const generateRandomChildren = (
  numberOfChildren,
  lowerBound,
  upperBound
) => {
  const newArray = []

  if (numberOfChildren === 0) {
    return newArray
  }
  for (let i = 0; i < numberOfChildren; i++) {
    newArray.push(
      Math.round(Math.random() * (upperBound - lowerBound) + lowerBound)
    )
  }

  return newArray
}

export const validateLowerBound = (number, upperBound) => {
  if (number < 0 || number > upperBound) {
    return false
  }
  return true
}
