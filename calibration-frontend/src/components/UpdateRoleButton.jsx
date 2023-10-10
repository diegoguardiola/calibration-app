import { useAuthContext } from "../hooks/useAuthContext";

const UpdateUserRoleButton = ({ userId, newRole }) => {
  const { dispatch } = useAuthContext();

  const updateUserRole = async () => {
    try {
      const response = await fetch(`/api/user/${userId}/role`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          // Include your auth token here if needed
        },
        body: JSON.stringify({ role: newRole })
      });

      if (!response.ok) {
        throw new Error('Failed to update user role');
      }

      const updatedUser = await response.json();

      // Update user in local storage and context
      localStorage.setItem('user', JSON.stringify(updatedUser));
      dispatch({ type: 'LOGIN', payload: updatedUser });
    } catch (error) {
      console.error(error);
      // Handle error, e.g., show a message to the user
    }
  };

  return (
    <button onClick={updateUserRole}>
      Update Role
    </button>
  );
};

export default UpdateUserRoleButton;