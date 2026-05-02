const SKILLS_CATEGORIES = {
  Languages: ['javascript', 'typescript', 'python', 'java', 'c++', 'c#', 'go', 'ruby', 'php', 'sql'],
  Frontend: ['react', 'next.js', 'vue', 'angular', 'svelte', 'redux', 'html', 'css', 'tailwindcss', 'sass'],
  Backend: ['node.js', 'express', 'nestjs', 'rest api', 'graphql', 'microservices', 'websocket'],
  Databases: ['mongodb', 'mysql', 'postgresql', 'redis', 'firebase'],
  Cloud: ['aws', 'azure', 'gcp'],
  DevOps: ['docker', 'kubernetes', 'terraform', 'jenkins', 'github actions', 'git', 'linux'],
  Testing: ['unit testing', 'jest', 'cypress', 'playwright', 'selenium'],
  'ML/Data': ['machine learning', 'nlp', 'pandas', 'numpy', 'scikit-learn', 'pytorch', 'tensorflow'],
  Methodologies: ['agile', 'scrum', 'jira'],
};

const SKILLS_DICTIONARY = Object.values(SKILLS_CATEGORIES).flat();

module.exports = {
  SKILLS_CATEGORIES,
  SKILLS_DICTIONARY,
};
