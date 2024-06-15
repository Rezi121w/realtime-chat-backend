export function checkUserRoleHierarchy(userRole: string, chatRole: string) {
  const roleHierarchy = {
    admin: ['admin', 'devtutor', 'destutor', 'developer', 'designer', 'user'],
    devtutor: ['tutor', 'developer', 'user'],
    destutor: ['tutor', 'designer', 'user'],
    tutor: ['tutor', 'user'],
    developer: ['developer', 'user'],
    designer: ['designer', 'user'],
  };

  return roleHierarchy[userRole].includes(chatRole);
}