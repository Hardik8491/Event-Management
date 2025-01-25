// Define the interface for the session data
interface SessionData {
    name: string;
    email: string;
    image: string;
  }
  
  // Use the interface with useSession
  const { data }: { data: SessionData | null } = useSession();
  
  // Now you can access the properties with proper TypeScript support
  if (data) {
    console.log(data.name);
    console.log(data.email);
    console.log(data.image);
  }
  