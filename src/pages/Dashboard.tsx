// Inside Dashboard component, replace the "const user = ..." lines with this:
const [profile, setProfile] = useState({ full_name: "User", institution_name: "Institution" });
const [user, setUser] = useState({ id: "guest" });

useEffect(() => {
  const savedUser = localStorage.getItem("smart_scheduler_user");
  if (savedUser) {
    const parsed = JSON.parse(savedUser);
    setProfile({ full_name: parsed.full_name, institution_name: parsed.institution_name });
    setUser({ id: parsed.id });
  }
}, []);