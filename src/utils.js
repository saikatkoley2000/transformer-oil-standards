export const getSdoClass = (sdo) => {
  const norm = (sdo || '').toLowerCase().trim();
  if (norm.includes('iec')) return 'tag-sdo-iec';
  if (norm.includes('astm')) return 'tag-sdo-astm';
  if (norm.includes('iso')) return 'tag-sdo-iso';
  if (norm.includes('is') && !norm.includes('iso')) return 'tag-sdo-is';
  if (norm.includes('bs')) return 'tag-sdo-bs';
  if (norm.includes('en')) return 'tag-sdo-en';
  if (norm.includes('din')) return 'tag-sdo-din';
  if (norm.includes('ieee')) return 'tag-sdo-ieee';
  if (norm.includes('as') && !norm.includes('astm')) return 'tag-sdo-as';
  if (norm.includes('sotl')) return 'tag-sdo-sotl';
  return 'tag-default';
};

export const getCategoryAccent = (category) => {
  const norm = (category || '').toLowerCase();
  if (norm.includes('maintenance') || norm.includes('sampling')) return 'var(--accent-maintenance)';
  if (norm.includes('test method') || norm.includes('testing')) return 'var(--accent-testing)';
  if (norm.includes('specification')) return 'var(--accent-specification)';
  return 'var(--sdo-iec)'; // default accent
};
