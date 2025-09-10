// In Navbar.jsx - add null check
export default function NavBar() {
  const { user } = useContext(AuthContext);
  
  return (
    <nav>
      {user ? (
        <span>Welcome, {user.name}!</span>
      ) : (
        <span>Please login</span>
      )}
    </nav>
  );
}