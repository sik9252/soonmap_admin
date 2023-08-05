interface HierarchyProps {
  admin: boolean;
  manager: boolean;
  staff: boolean;
}

export const setAuthHierarchy = (data: HierarchyProps) => {
  console.log(data.admin, data.manager, data.staff);
  if (data.admin) {
    localStorage.setItem('auth', 'one');
  } else if (data.manager) {
    localStorage.setItem('auth', 'two');
  } else if (data.staff) {
    localStorage.setItem('auth', 'three');
  }
};
