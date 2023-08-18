interface HierarchyProps {
  name?: string;
  admin: boolean;
  manager: boolean;
  staff: boolean;
}

export const setAuthHierarchy = (data: HierarchyProps) => {
  localStorage.setItem('user_name', data.name ? data.name : '');

  if (data.admin) {
    localStorage.setItem('auth', 'one');
  } else if (data.manager) {
    localStorage.setItem('auth', 'two');
  } else if (data.staff) {
    localStorage.setItem('auth', 'three');
  }
};
