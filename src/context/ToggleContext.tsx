import { useState, createContext } from "react";

// Define the type for the context value
type ToggleContextType = {
  sidebarOpen: boolean;
  handleToggle: () => void; // Include the handleToggle function
};

// Create the context with an initial default value of 'undefined'
export const ToggleContext = createContext<ToggleContextType | undefined>(
  undefined
);

// Create the ToggleProvider component
const ToggleProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Define the handleToggle function
  const handleToggle = () => {
    setSidebarOpen((prev) => !prev);
  };

  // Construct the context value
  const toggleContextValue: ToggleContextType = {
    sidebarOpen,
    handleToggle,
  };

  // Provide the context value to the children
  return (
    <ToggleContext.Provider value={toggleContextValue}>
      {children}
    </ToggleContext.Provider>
  );
};

export default ToggleProvider;
