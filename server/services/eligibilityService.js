const normalize = (value) => String(value || "").trim().toLowerCase();

function includesAny(list = [], value) {
  const normalizedList = list.map(normalize);
  return normalizedList.includes("any") || normalizedList.includes("all") || normalizedList.includes(normalize(value));
}

export function isEligible(profile, scheme) {
  const rule = scheme.eligibility || {};
  const age = Number(profile.age);
  const income = Number(profile.income);

  if (Number.isFinite(rule.minAge) && age < rule.minAge) return false;
  if (Number.isFinite(rule.maxAge) && age > rule.maxAge) return false;
  if (Number.isFinite(rule.minIncome) && income < rule.minIncome) return false;
  if (Number.isFinite(rule.maxIncome) && income > rule.maxIncome) return false;
  if (rule.genders?.length && !includesAny(rule.genders, profile.gender)) return false;
  if (rule.states?.length && !includesAny(rule.states, profile.state)) return false;
  if (rule.categories?.length && !includesAny(rule.categories, profile.category)) return false;
  if (rule.occupations?.length && !includesAny(rule.occupations, profile.occupation)) return false;
  if (rule.anyOf?.length) {
    const hasAnyMatch = rule.anyOf.some((partialRule) => {
      if (partialRule.genders?.length && !includesAny(partialRule.genders, profile.gender)) return false;
      if (partialRule.states?.length && !includesAny(partialRule.states, profile.state)) return false;
      if (partialRule.categories?.length && !includesAny(partialRule.categories, profile.category)) return false;
      if (partialRule.occupations?.length && !includesAny(partialRule.occupations, profile.occupation)) return false;
      return true;
    });
    if (!hasAnyMatch) return false;
  }

  return true;
}

export function filterEligibleSchemes(profile, schemes) {
  return schemes.filter((scheme) => isEligible(profile, scheme));
}

export function searchSchemes(query, schemes) {
  const q = normalize(query);
  if (!q) return schemes;
  const stopWords = new Set(["a", "an", "and", "are", "for", "in", "is", "of", "on", "scheme", "schemes", "the", "what"]);
  const queryTokens = q
    .split(/[^a-z0-9]+/i)
    .map((token) => token.replace(/s$/, ""))
    .filter((token) => token.length > 1 && !stopWords.has(token));

  return schemes.filter((scheme) => {
    const haystack = [
      scheme.name,
      scheme.description,
      ...(scheme.tags || []),
      ...(scheme.benefits || []),
      ...(scheme.eligibilityText || [])
    ]
      .join(" ")
      .toLowerCase();
    if (haystack.includes(q)) return true;
    return queryTokens.some((token) => haystack.includes(token));
  });
}
