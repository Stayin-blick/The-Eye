module.exports = (level) => {
  // Base XP required for level 1
  const baseXP = 100;

  // Exponential growth factor
  const growthFactor = 1.2; // Adjust this value as needed

  // Calculate the XP required for the given level
  const requiredXP = Math.floor(baseXP * (Math.pow(growthFactor, level - 1)));

  return requiredXP;
};
//need to check exponetial levels