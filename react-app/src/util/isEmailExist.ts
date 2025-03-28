export const isEmailExist = (email: string) => {
  try {
    const userEmail = localStorage.getItem(email.toLowerCase());
    if (userEmail) return true;
    return false;
  } catch (error) {
    console.log(error);
  }
};
