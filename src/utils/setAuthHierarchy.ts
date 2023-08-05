interface HierarchyProps {
  admin: boolean;
  manager: boolean;
  staff: boolean;
}

export const setAuthHierarchy = (data: HierarchyProps) => {
  if (data.admin) {
    localStorage.setItem('auth', 'one');
  } else if (data.manager) {
    localStorage.setItem('auth', 'two');
  } else if (data.staff) {
    localStorage.setItem('auth', 'three');
  }
};
