export const ROLES = {
    CUSTOMER: 'customer',
    ADMIN: 'admin',
    SUPER_ADMIN: 'super_admin',
};

export const ROLE_LABELS = {
    [ROLES.CUSTOMER]: 'Customer',
    [ROLES.ADMIN]: 'Admin',
    [ROLES.SUPER_ADMIN]: 'Super Admin',
};

export const DASHBOARD_PATHS = {
    [ROLES.CUSTOMER]: '/customer/home',
    [ROLES.ADMIN]: '/admin/dashboard',
    [ROLES.SUPER_ADMIN]: '/super-admin/dashboard',
};

export function getStoredUser() {
    try { 
        return JSON.parse(localStorage.getItem('myUser')); 

    } catch {
         return null; 
        }
}

export function getUserRole() {
    const user = getStoredUser();
    return user?.role || ROLES.CUSTOMER;
}

export function isLoggedIn() {
    return !!localStorage.getItem('myToken') && !!getStoredUser();
}

export function storeLogin(userData, token) {
    localStorage.setItem('myToken', token);
    localStorage.setItem('myUser', JSON.stringify(userData));
}

export function clearAuth() {
    localStorage.removeItem('myToken');
    localStorage.removeItem('myUser');
}

export function hasRole(...roles) {
    return roles.includes(getUserRole());
}

export function getDashboardPath() {
    return DASHBOARD_PATHS[getUserRole()] || '/';
}